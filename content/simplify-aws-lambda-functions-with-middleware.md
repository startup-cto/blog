---
title: Simplify AWS lambda TypeScript functions with middleware
slug: simplify-aws-lambda-functions-with-middleware
publishedAt: 2020-08-17T23:11:55.000Z
updatedAt: 2020-08-18T15:37:47.000Z
tags:
- AWS
- TypeScript
- Lambda
excerpt: Writing server code can be messy. For servers this is usually solved with the pattern of middlewares. For AWS lambdas we have multiple ways to handle it.
---

Writing server code can be messy: In addition to the actual business logic, we need to take care of headers, cors, security, validation, and much more. Moving to a serverless world with AWS lambda does not take away this responsibility.

For servers this is usually solved with the pattern of middlewares. For AWS lambdas we have multiple ways to handle it:

- Writing lambda middleware manually
- Using lambda-middleware
- Using middy middleware
- Using an API Gateway

## Writing lambda middleware manually

Let's use a simple example for all our cases: An endpoint that returns the sum of two numbers:

```tsx
import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";

export async function add(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
  const { a, b } = JSON.parse(event.body ?? "{}");
  const sum = a + b;
  return {
    statusCode: 200,
    body: JSON.stringify({ result: sum })
  }
}
```

Even though we haven't even taken care of headers or validation, there is already two middlewares we can extract:

```tsx
import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";

type Summands = {
  a: number;
  b: number;
};

async function sum({ a, b }: Summands): Promise<{ result: number }> {
  return { result: a + b };
}

function inputParser<Result>(
  handler: ({ a, b }: Summands) => Promise<Result>
): (event: APIGatewayEvent) => Promise<Result> {
  return (event: APIGatewayEvent) => {
    const { a, b } = JSON.parse(event.body ?? "{}");
    return handler({ a, b });
  };
}

function jsonSerializer<Event>(
  handler: (event: Event) => Promise<object>
): (event: Event) => Promise<APIGatewayProxyResult> {
  return async (event: Event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(await handler(event)),
    };
  };
}

export const add: (
  event: APIGatewayEvent,
  context: Context
) => Promise<APIGatewayProxyResult> = jsonSerializer(inputParser(sum));
```

With this example in front of us: What actually is a middleware in our case? In its simplest form, it is a higher-order-function that takes a handler function and returns an augmented handler function. E. g. wrapApiResponse takes a handler that returns an `object` and transforms it into a handler that returns an `ApiGatewayProxyResult`.

### Pro

- You have full control on what the middleware does
- No bloat code that you don't need

### Contra

- You need more time to write the middleware
- Your custom solution might not be secure

## Using lambda-middleware

How would our example above look like with [lambda-middleware](https://dbartholomae.github.io/lambda-middleware/)?

```tsx
import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import { IsNumber } from "class-validator";
import { compose } from "@lambda-middleware/compose";
import { classValidator } from "@lambda-middleware/class-validator";
import { errorHandler } from "@lambda-middleware/http-error-handler";
import { jsonSerializer } from "@lambda-middleware/json-serializer";

class Summands {
  @IsNumber()
  a!: number;

  @IsNumber()
  b!: number;
}

async function sum({
  body: { a, b },
}: {
  body: Summands;
}): Promise<{ result: number }> {
  return { result: a + b };
}

export const add: (
  event: APIGatewayEvent,
  context: Context
) => Promise<APIGatewayProxyResult> = compose(
  errorHandler(),
  jsonSerializer(),
  classValidator({ bodyType: Summands })
)(sum);
```

`jsonSerializer` does more or less what our custom-made solution above does, but it also adds a `Content-Type` header with value `application/json`.

`classValiador` is a more elaborate version of the `inputParser` from above. It relies on the `class-validator` library and the `Summands` class we define to also validate the input and make sure it actually has `a` and `b` set to numbers. Other than `JSON.parse`, which just lazily returns an `any` type, the middleware will ensure that we only rely on validated data by typing `event.body` correctly.

`errorHandler` is needed to convert the validation errors that will be thrown from `classValidator` if the validation fails into http responses.

### Pro

- Less code to write
- Added functionality for free
- High type safety

### Contra

- May force you to include code you don't need (in this case validation and error handling)
- You may have to understand code that someone else wrote

## Using middy middleware

Another middleware framework for AWS lambdas is [middy](https://github.com/middyjs/middy). The same function would look like this:

```tsx
import { APIGatewayEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda'
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import responseSerializer from "@middy/http-response-serializer";
import validator from "@middy/validator";

interface Summands {
  a: number;
  b: number;
}

const summandsSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        a: { type: "number" },
        b: { type: "number" },
      },
      required: ["a", "b"],
    },
  },
};

async function sum({
  body: { a, b },
}: {
  body: Summands;
}): Promise<{ result: number }> {
  return { result: a + b };
}

export const add: (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => Promise<APIGatewayProxyResult> | void = middy(
  (sum as unknown) as (event: APIGatewayEvent) => Promise<APIGatewayProxyResult>
)
  .use(jsonBodyParser())
  .use(validator({ inputSchema: summandsSchema }))
  .use(responseSerializer({
    serializers: [{
      regex: /^application\/json$/,
      serializer: ({ body }) => JSON.stringify(body)
    }],
    default: 'application/json'
  }))
  .use(httpErrorHandler());
```

For middy the middleware is defined in a custom format that is added via `.use`. This unfortunately means that we need to force the typing of the handler as TypeScript cannot infer it from the middlewares.

The validation with a JSON schema is limited a bit, e. g. you cannot use any asynchronous validation. It is way more performant, though.

### Pro

- Less code to write
- Added functionality for free
- Many existing middlewares to choose from

### Contra

- No good typing support
- May force you to include code you don't need (in this case validation and error handling)
- You may have to understand code that someone else wrote

## Using an API Gateway

Most of the features seen so far can also be solved by using the AWS API Gateway. Let's look at the handler:

```tsx
interface Summands {
  a: number;
  b: number;
}

export async function sum({
  a,b
}: Summands): Promise<{ result: number }> {
  return { result: a + b };
}
```

And the related serverless configuration

```yaml
functions:
  create:
    handler: handlers.add
    events:
      - http:
          path: /
          method: post
          request:
            schema:
              application/json:
                definitions: {}
                $schema: http://json-schema.org/draft-04/schema#
                type: object
                title: Summands
                required: ["a", "b"],
                properties:
                  a:
                    type: "number"
                  b:
                    type: "number"
            template:
              application/json: '#set($body = $util.parseJson($input.body)) {"a": $body.a, "b": $body.b}'
```

With [Lambda version 2](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html) we can directly return the JSON object and, as long as it does not have a `statusCode` defined, it will be stringified by the ApiGateway.

[Validation](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#request-schema-validators) happens in the API Gateway based on the schema in the definition, and then the [template](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html) is used to extract the relevant information.

### Pro

- Less code to write
- Requests get stopped at the API Gateway, saving cost for Lambda invocations
- Business logic is strongly separated from middleware

### Contra

- Functionality is limited compared to a code-based solution
- Does not give strong typing
- You have to understand infrastructure-as-code in addition to coding

## Which middleware to use?

As seen, middleware can simplify lambda code and make the actual business logic more visible. The different middlewares are helpful in different situations. Personally I prefer to either use an API Gateway configuration to take advantage of AWS to its fullest, or function-based middleware for functionality that is not supported by AWS.
