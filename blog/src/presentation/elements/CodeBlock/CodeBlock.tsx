import Highlight, { defaultProps, Language, Prism } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/dracula";

interface Props {
  children?: string;
  language?: string;
}

export function CodeBlock({ children = "", language = "" }: Props) {
  if (!isPrismLanguage(language)) {
    return <code>{children}</code>;
  }
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

function isPrismLanguage(language: unknown): language is Language {
  if (typeof language !== "string") {
    return false;
  }
  return Object.keys(Prism.languages).includes(language);
}
