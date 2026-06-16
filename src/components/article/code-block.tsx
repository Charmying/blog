"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const LANGUAGE_DISPLAY: Record<string, string> = {
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  jsx: "JSX",
  tsx: "TSX",
  python: "Python",
  java: "Java",
  cpp: "C++",
  c: "C",
  csharp: "C#",
  cs: "C#",
  go: "Go",
  rust: "Rust",
  php: "PHP",
  ruby: "Ruby",
  kotlin: "Kotlin",
  swift: "Swift",
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

function normalizeCode(raw: string): string {
  const decoded = raw
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
}

interface CodeBlockProps {
  children: string;
  language?: string;
}

export function CodeBlock({ children, language = "text" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("CodeBlock");

  const plain = normalizeCode(children);

  const [highlightedCode, setHighlightedCode] = useState(plain);

  useEffect(() => {
    if (!plain) {
      setHighlightedCode("");
      return;
    }
    let cancelled = false;
    import("highlight.js/lib/core").then(async ({ default: hljs }) => {
      if (cancelled) return;
      const [
        { default: bash },
        { default: c },
        { default: cpp },
        { default: csharp },
        { default: css },
        { default: go },
        { default: java },
        { default: javascript },
        { default: json },
        { default: kotlin },
        { default: php },
        { default: plaintext },
        { default: python },
        { default: ruby },
        { default: rust },
        { default: shell },
        { default: sql },
        { default: swift },
        { default: typescript },
        { default: xml },
        { default: yaml },
      ] = await Promise.all([
        import("highlight.js/lib/languages/bash"),
        import("highlight.js/lib/languages/c"),
        import("highlight.js/lib/languages/cpp"),
        import("highlight.js/lib/languages/csharp"),
        import("highlight.js/lib/languages/css"),
        import("highlight.js/lib/languages/go"),
        import("highlight.js/lib/languages/java"),
        import("highlight.js/lib/languages/javascript"),
        import("highlight.js/lib/languages/json"),
        import("highlight.js/lib/languages/kotlin"),
        import("highlight.js/lib/languages/php"),
        import("highlight.js/lib/languages/plaintext"),
        import("highlight.js/lib/languages/python"),
        import("highlight.js/lib/languages/ruby"),
        import("highlight.js/lib/languages/rust"),
        import("highlight.js/lib/languages/shell"),
        import("highlight.js/lib/languages/sql"),
        import("highlight.js/lib/languages/swift"),
        import("highlight.js/lib/languages/typescript"),
        import("highlight.js/lib/languages/xml"),
        import("highlight.js/lib/languages/yaml"),
      ]);
      if (cancelled) return;

      if (!hljs.getLanguage("bash")) hljs.registerLanguage("bash", bash);
      if (!hljs.getLanguage("c")) hljs.registerLanguage("c", c);
      if (!hljs.getLanguage("console")) hljs.registerLanguage("console", shell);
      if (!hljs.getLanguage("cpp")) hljs.registerLanguage("cpp", cpp);
      if (!hljs.getLanguage("csharp")) hljs.registerLanguage("csharp", csharp);
      if (!hljs.getLanguage("cs")) hljs.registerLanguage("cs", csharp);
      if (!hljs.getLanguage("css")) hljs.registerLanguage("css", css);
      if (!hljs.getLanguage("go")) hljs.registerLanguage("go", go);
      if (!hljs.getLanguage("html")) hljs.registerLanguage("html", xml);
      if (!hljs.getLanguage("java")) hljs.registerLanguage("java", java);
      if (!hljs.getLanguage("javascript")) hljs.registerLanguage("javascript", javascript);
      if (!hljs.getLanguage("js")) hljs.registerLanguage("js", javascript);
      if (!hljs.getLanguage("json")) hljs.registerLanguage("json", json);
      if (!hljs.getLanguage("jsx")) hljs.registerLanguage("jsx", javascript);
      if (!hljs.getLanguage("kotlin")) hljs.registerLanguage("kotlin", kotlin);
      if (!hljs.getLanguage("php")) hljs.registerLanguage("php", php);
      if (!hljs.getLanguage("plaintext")) hljs.registerLanguage("plaintext", plaintext);
      if (!hljs.getLanguage("python")) hljs.registerLanguage("python", python);
      if (!hljs.getLanguage("ruby")) hljs.registerLanguage("ruby", ruby);
      if (!hljs.getLanguage("rust")) hljs.registerLanguage("rust", rust);
      if (!hljs.getLanguage("shell")) hljs.registerLanguage("shell", shell);
      if (!hljs.getLanguage("sql")) hljs.registerLanguage("sql", sql);
      if (!hljs.getLanguage("swift")) hljs.registerLanguage("swift", swift);
      if (!hljs.getLanguage("text")) hljs.registerLanguage("text", plaintext);
      if (!hljs.getLanguage("txt")) hljs.registerLanguage("txt", plaintext);
      if (!hljs.getLanguage("ts")) hljs.registerLanguage("ts", typescript);
      if (!hljs.getLanguage("tsx")) hljs.registerLanguage("tsx", javascript);
      if (!hljs.getLanguage("typescript")) hljs.registerLanguage("typescript", typescript);
      if (!hljs.getLanguage("xml")) hljs.registerLanguage("xml", xml);
      if (!hljs.getLanguage("yaml")) hljs.registerLanguage("yaml", yaml);

      try {
        const lang = hljs.getLanguage(language) ? language : "plaintext";
        const result = hljs.highlight(plain, { language: lang, ignoreIllegals: true }).value;
        if (!cancelled) setHighlightedCode(result);
      } catch {
        if (!cancelled) setHighlightedCode(plain);
      }
    });
    return () => { cancelled = true; };
  }, [plain, language]);

  const copy = () => {
    navigator.clipboard.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayLang = LANGUAGE_DISPLAY[language] || language;

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__lang" aria-label={`${t("language")}: ${displayLang}`}>
          {displayLang}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? t("copied") : t("copyCode")}
          aria-live="polite"
          className="code-block__copy"
        >
          {copied ? `✓ ${t("copied")}` : t("copy")}
        </button>
      </div>
      <pre className="code-block__pre">
        <code
          className={`language-${language} code-block__code`}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
