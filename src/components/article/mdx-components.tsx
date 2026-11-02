/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ComponentPropsWithoutRef } from "react";
import { Link } from "@/i18n/navigation";
import { CodeBlock } from "./code-block";
import { MermaidChart } from "./mermaid-chart";

export const mdxComponents = {
  h1: () => null,
  a: ({ href, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href?.startsWith("/") && !href.startsWith("//")) return <Link href={href} {...props} />;
    return <a href={href} {...props} />;
  },
  pre: ({ children }: { children: React.ReactNode }) => {
    const child = (children as any)?.props;
    const language = child?.className?.replace("language-", "") || "text";
    const code = child?.children;

    if (language === "mermaid") {
      if (!code) return null;
      return <MermaidChart>{code}</MermaidChart>;
    }

    return <CodeBlock language={language}>{code}</CodeBlock>;
  },
};
