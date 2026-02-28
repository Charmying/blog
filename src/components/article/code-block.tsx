"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import plaintext from "highlight.js/lib/languages/plaintext";
import python from "highlight.js/lib/languages/python";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("console", shell);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("python", python);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("text", plaintext);
hljs.registerLanguage("txt", plaintext);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("tsx", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("yaml", yaml);

const LANGUAGE_DISPLAY: Record<string, string> = {
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  jsx: "JSX",
  tsx: "TSX",
  python: "Python",
  css: "CSS",
  html: "HTML",
  json: "JSON",
  xml: "XML",
  yaml: "YAML",
  sql: "SQL",
  bash: "Bash",
  shell: "Shell",
  console: "Console",
  plaintext: "Plain Text",
  text: "Text",
  txt: "Text",
};

interface CodeBlockProps {
  children: string;
  language?: string;
}

export function CodeBlock({ children, language = "text" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("CodeBlock");

  const normalizedCode = useMemo(() => {
    const decoded = children
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&");

    const lines = decoded.split("\n");
    const nonEmpty = lines.filter((l) => l.trim());
    if (nonEmpty.length === 0) return "";

    const minIndent = Math.min(
      ...nonEmpty.map((l) => l.match(/^\s*/)?.[0].length ?? 0),
    );

    return lines
      .map((l) => l.slice(minIndent))
      .join("\n")
      .trim();
  }, [children]);

  const highlightedCode = useMemo(() => {
    if (!normalizedCode) return "";
    try {
      const lang = hljs.getLanguage(language) ? language : "plaintext";
      return hljs.highlight(normalizedCode, {
        language: lang,
        ignoreIllegals: true,
      }).value;
    } catch {
      return normalizedCode;
    }
  }, [normalizedCode, language]);

  const copy = () => {
    navigator.clipboard.writeText(normalizedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__lang">
          {LANGUAGE_DISPLAY[language] || language}
        </span>
        <button onClick={copy} className="code-block__copy">
          {copied ? `✓ ${t("copied")}` : t("copy")}
        </button>
      </div>
      <pre className="code-block__pre">
        <code className={`language-${language} code-block__code`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
}
