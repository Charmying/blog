/* eslint-disable @typescript-eslint/no-explicit-any */

import { CodeBlock } from "./code-block";
import { MermaidChart } from "./mermaid-chart";

export const mdxComponents = {
  pre: ({ children }: { children: React.ReactNode }) => {
    const child = (children as any)?.props;
    const language = child?.className?.replace("language-", "") || "text";
    const code = child?.children;

    if (language === "mermaid") {
      return <MermaidChart>{code}</MermaidChart>;
    }

    return <CodeBlock language={language}>{code}</CodeBlock>;
  },
};
