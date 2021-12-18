---
title: TDD in a React frontend
slug: tdd-in-a-react-frontend
publishedAt: 2021-01-19T22:32:26.000Z
updatedAt: 2021-01-19T22:40:10.000Z
tags:
- React
- tdd
excerpt: Only few professional developers seriously doubt the value of tdd. But in reality, tdd is often limited to the backend. Part of it is due to missing skills on how to tdd in the frontend.
---

Nowadays, only a few professional developers are left that seriously doubt the value of test-driven-development and test-driven-design (tdd). But the reality of many codebases I have seen is that tdd is often limited to the backend, where the "business logic" lives.

Part of this is due to a stigma that frontend development is not "real software development", even though in most cases a fully functional backend is completely unusable without the matching frontend. But part of it is due to missing skills on how to tdd in the frontend. This is what this article is about.

I'm taking React as an example because it is the framework I am most familiar with and the declarative style makes it easier to some of the tests than when using pure JavaScript, HTML, and CSS. But most of the ideas from this article hold also in other contexts.

If you are interested in more articles and news about web product development and entrepreneurship, please feel free to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton).

## Why is frontend testing harder than backend?

It is not always laziness that drives frontend engineers away from tdd. This becomes especially obvious when watching full-stack engineers, who religiously practice tdd for their backend code, not write a single test in the frontend.

In my experience, the differences boil down to three points:

1. In the frontend, features usually have significantly bigger interfaces. While a backend API in its simplest version might be defined by a simple JSON structure, even the simplest frontend feature will be defined not only by functionality but also by often thousands of pixels rendered to the screen.
2. Even worse, we don't yet have a good way to explain to a machine which of these pixels matter. For some, changing the pixels doesn't really make any difference, but change the wrong ones, and the feature becomes completely unusable.
3. For a long time, tooling did not allow for integration tests that run in seconds. Instead, tests either had to be limited to pure business logic or run in the browser with often minutes of setup time.

So how do we fix this?

## Writing testable frontend code

Similar to how you often need to split backend code and introduce dependency injection to be able to test it, frontend code also should be split to make it easier to test. There are roughly three categories of frontend code, each of them with a different way to test them.

Let's take a [classical React todo app](https://startup-cto.github.io/todos) as an example. I recommend to open [the repository](https://github.com/startup-cto/todos) on a second screen and follow along. I have added code excerpts to this article for those who might read on the mobile phone or otherwise don't have access to the repository while reading.

### Glue code

The [App component](https://github.com/startup-cto/todos/blob/main/src/App/App.tsx) and the [useTodos hook](https://github.com/startup-cto/todos/blob/main/src/App/useTodos.ts) are what I like to call glue code. It "glues" together the rest of the code to bring the functionality to life:

```tsx
const TodoApp: FunctionComponent = () => {
  const { todos, addTodo, completeTodo, deleteTodo } = useTodos([]);

  return (
    <>
      <TodoList
        todos={todos}
        onCompleteTodo={completeTodo}
        onDeleteTodo={deleteTodo}
      />
      <AddTodo onAdd={addTodo} />
    </>
  );
};


export function useTodos(initialTodos: Todo[]) {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  return {
    todos,
    addTodo: (description: string) =>
      dispatch(createAddTodoAction(description)),
    completeTodo: (id: Todo["id"]) => dispatch(createCompleteTodoAction(id)),
    deleteTodo: (id: Todo["id"]) => dispatch(createDeleteTodoAction(id)),
  };
}
```

Similar to a controller in the backend, this is best tested with [integration tests](https://github.com/startup-cto/todos/blob/main/src/App/App.test.tsx):

```tsx
describe("TodoApp", () => {
  it("shows an added todo", async () => {
    render(<App />);

    const todoInput = screen.getByLabelText("New todo");
    const todoDescription = "My new todo";
    userEvent.type(todoInput, todoDescription);
    const addTodoButton = screen.getByText("Add todo");
    userEvent.click(addTodoButton);

    expect(await screen.findByText(todoDescription)).toBeInTheDocument();
  });
});
```

The reason why I am talking about these tests first is that this is usually the first kind of test that I write. The difference between a web app and a landing page is that the web app, without any of its functionality and just with its looks, has no value. These tests describe the behavior and allow me to keep focused so that I only implement what is needed.

These kinds of integration tests should be as independent of the technology used as possible. The test examples above are dependent on React (if I were to rewrite the app without React, I would have to change the tests as well), but that's about it. The same tests would work irrespective of whether I am using functional components, class components, Redux state management, an external form library, or whether I use 3 or 300 components to build the todo app. This is very important, as it means that I can safely refactor the code without touching the tests.

The reason for this is that the tests are written from a user perspective: Find something labeled "New todo", type the new todo into it, press the "Add todo" button and check that the todo I just wrote now shows up on the screen.

### Business logic

These are the tests that folks coming from backend testing are most familiar with. The [business logic of our todo app](https://github.com/startup-cto/todos/tree/main/src/model) takes care of creating, removing, and marking todos as done. The exact same could also be used in the backend.

```tsx
export function todosReducer(todos: Todo[], action: TodoAction) {
  switch (action.type) {
    case TodoActionType.AddTodo:
      return [...todos, action.payload];
    case TodoActionType.CompleteTodo:
      return todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: true } : todo
      );
    case TodoActionType.DeleteTodo:
      return todos.filter((todo) => todo.id !== action.payload.id);
  }
}
```

[Tests for this kind of code](https://github.com/startup-cto/todos/blob/main/src/model/reducer.test.ts) are deceivingly simple:

```tsx
describe("todo reducer", () => {
  describe("addTodoAction", () => {
    it("adds a new todo to the list", () => {
      const description = "This is a todo";
      expect(todosReducer([], createAddTodoAction(description))).toContainEqual(
        expect.objectContaining({ description })
      );
    });

    it("does not remove an existing todo", () => {
      const existingTodo = new TodoMock();
      expect(
        todosReducer([existingTodo], createAddTodoAction("This is a todo"))
      ).toContainEqual(existingTodo);
    });
  });
});
```

The hard part about testing business logic is not to write the tests, but to separate the business logic from the rest of the code. Let's have a look at [useTodos](https://github.com/startup-cto/todos/blob/main/src/App/useTodos.ts), which is the glue code bringing this reducer into React:

```tsx
export function useTodos(initialTodos: Todo[]) {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  return {
    todos,
    addTodo: (description: string) =>
      dispatch(createAddTodoAction(description)),
    completeTodo: (id: Todo["id"]) => dispatch(createCompleteTodoAction(id)),
    deleteTodo: (id: Todo["id"]) => dispatch(createDeleteTodoAction(id)),
  };
}
```

The danger here would be to write the business logic so that it can only be tested by testing the full hook. Using the hook just to glue together the reducer and action creators with React logic saves us from all that pain.

### Presentational components

Last, but not least, let's look at [the presentational code](https://github.com/startup-cto/todos/tree/main/src/components). These components define the interface to the user, but do not contain any business logic on their own. This is where most of the problems I mentioned at the beginning of the article come to pass. And, to be quite honest, I haven't found a perfect solution to all of them. But there is a concept that gets close:

A **story** is the visual equivalent of a unit test. The main remaining shortcoming is that the step of asserting whether or not the test was successful has to be done manually.

Here's a [story for a button](https://github.com/startup-cto/todos/blob/main/src/components/shared/Button.stories.tsx):

```tsx
const Template: Story<Props> = (args) => <Button {...args} />;

const actionArgs = {
  onClick: action("onClick"),
};

export const Default = Template.bind({});

Default.args = {
  ...actionArgs,
  children: "Click me!",
  color: ButtonColor.Success,
};
```

and here is [the button itself](https://github.com/startup-cto/todos/blob/main/src/components/shared/Button.tsx):

```tsx
export enum ButtonColor {
  Alert = "Alert",
  Success = "Success",
}

export enum ButtonType {
  Submit = "submit",
  Reset = "reset",
  Button = "button",
}

export interface Props {
  children: ReactNode;
  color: ButtonColor;
  onClick?: () => void;
  type?: ButtonType;
}

export const Button: FunctionComponent<Props> = ({
  children,
  color,
  onClick,
  type,
}) => {
  const colorStyles = {
    [ButtonColor.Alert]: {
      border: "#b33 solid 1px",
      borderRadius: "4px",
      boxShadow: "2px 2px 2px rgba(100,0,0,0.8)",
      color: "white",
      backgroundColor: "#a00",
    },
    [ButtonColor.Success]: {
      border: "#3b3 solid 1px",
      borderRadius: "4px",
      boxShadow: "2px 2px 2px rgba(0,100,0,0.8)",
      color: "white",
      backgroundColor: "#0a0",
    },
  };
  return (
    <button
      style={{
        ...colorStyles[color],
        padding: "0.2rem 0.5rem",
      }}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
```

The story renders the button in isolation. I can first write the story, which allows me to think about the intended interface for this component, and only implement the component itself afterward. If any implementation details change, then as long as the interface stays the same, I won't have to change the story. And I can look at the rendered story in isolation whenever I want to verify that it still looks as intended (this is the "manual" part I mentioned above). As soon as I have a version I am happy with, I can even set up automated regression testing with help of a visual regression tool.

![storybook](/images/storybook.png)

## The All Together

What would it look like in practice, developing this todo app tdd-style?

1. Write an integration test that the text "No todos" should be visible if there are no todos
2. Fulfill the test by implementing the App component so that it just returns "No todos"
3. Extract "No todos" into its own component
4. Add a story for it
5. Use the story to drive visual changes until the "No todos" part looks like it should
6. Add an integration test about adding a todo
7. Start implementing the test and realize that I will need some kind of state management
8. Comment out the integration test
9. Write a unit test for the state reducer
10. Fulfill the test by writing a simple first version of the reducer
11. Write a story for displaying the list of todos
12. Use the story to drive the implementation of a TodoList component
13. Comment the integration test back in
14. Fulfill the integration test by gluing together the reducer and the component
15. ...

Obviously, there are many other ways to go about this. But hopefully, this shows one potential workflow to use tdd in the frontend.

If you are interested in more articles and news about web product development and entrepreneurship, please feel free to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton). And please send me a tweet about your experiences with tdd in the frontend!
