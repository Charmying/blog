/* eslint-disable @typescript-eslint/no-explicit-any */

import { CodeBlock } from "./code-block";

export const mdxComponents = {
  pre: ({ children }: { children: React.ReactNode }) => {
    const child = (children as any)?.props;
    const language = child?.className?.replace("language-", "") || "text";
    const code = child?.children;
    return <CodeBlock language={language}>{code}</CodeBlock>;
  },
};
