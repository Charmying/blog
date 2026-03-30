"use client";

import { useEffect, useId, useRef } from "react";
import mermaid from "mermaid";

interface MermaidChartProps {
  children: string;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

export function MermaidChart({ children }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const diagramId = "mermaid-" + rawId.replace(/:/g, "");

  useEffect(() => {
    if (!containerRef.current) return;

    const render = async () => {
      if (!containerRef.current) return;

      const isDark = document.documentElement.dataset.theme === "dark";

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
        securityLevel: "loose",
        fontFamily: "inherit",
      });

      const diagram = decodeHtmlEntities(children).trim();

      try {
        const { svg } = await mermaid.render(diagramId, diagram);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error("[MermaidChart] render failed:", err);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre class="mermaid-chart__error">${diagram}</pre>`;
        }
      }
    };

    render();

    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [children, diagramId]);

  return <div ref={containerRef} className="mermaid-chart" />;
}
