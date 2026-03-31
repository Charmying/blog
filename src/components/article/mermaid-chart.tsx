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

const MINDMAP_TOKENS = {
  dark: {
    root: { fill: "#f5f5f7", stroke: "rgba(245,245,247,0.15)", text: "#000000" },
    node: { fill: "#1d1d1f", stroke: "rgba(255,255,255,0.08)", text: "#f5f5f7" },
    edge: { stroke: "rgba(255,255,255,0.22)", width: "1.5" },
    bg: "transparent",
  },
  light: {
    root: { fill: "#1d1d1f", stroke: "rgba(29,29,31,0.15)", text: "#ffffff" },
    node: { fill: "#f5f5f7", stroke: "rgba(0,0,0,0.08)", text: "#1d1d1f" },
    edge: { stroke: "rgba(0,0,0,0.18)", width: "1.5" },
    bg: "transparent",
  },
} as const;

function applyMindmapTheme(container: HTMLDivElement, isDark: boolean): void {
  const svg = container.querySelector("svg");
  if (!svg) return;

  const t = isDark ? MINDMAP_TOKENS.dark : MINDMAP_TOKENS.light;

  svg.style.background = t.bg;
  const directBgRect = svg.querySelector<SVGRectElement>(":scope > rect");
  if (directBgRect) {
    directBgRect.style.fill = t.bg;
    directBgRect.style.stroke = "none";
  }

  svg.querySelectorAll("foreignObject").forEach((fo) => {
    fo.setAttribute("overflow", "visible");
  });

  svg.querySelectorAll<SVGElement>(".edgePaths path, .edgePaths line").forEach((el) => {
    el.style.stroke = t.edge.stroke;
    el.style.strokeWidth = t.edge.width;
    el.style.fill = "none";
  });

  const branchSelector = ".mindmap-node:not(.section-root):not(.section--1)";
    svg.querySelectorAll<SVGElement>(`${branchSelector} path.node-bkg, ${branchSelector} rect, ` + `${branchSelector} circle, ${branchSelector} ellipse, ${branchSelector} polygon`).forEach((el) => {
      const attrFill = el.getAttribute("fill");
      if (attrFill === "none" || attrFill?.startsWith("url(")) return;
      el.style.fill = t.node.fill;
      el.style.stroke = t.node.stroke;
      el.style.strokeWidth = "1";
      if (el.tagName.toLowerCase() === "rect") {
        el.setAttribute("rx", "10");
        el.setAttribute("ry", "10");
      }
    });

  svg.querySelectorAll<SVGElement>(`${branchSelector} line.node-line-`).forEach((el) => {
    el.style.stroke = t.node.stroke;
    el.style.strokeWidth = "1";
  });

  svg.querySelectorAll<HTMLElement>(`${branchSelector} foreignObject *`).forEach((el) => {
    el.style.color = t.node.text;
  });

  svg.querySelectorAll<SVGElement>(`${branchSelector} text, ${branchSelector} tspan`).forEach((el) => {
    el.style.fill = t.node.text;
  });

  const rootNode = svg.querySelector<SVGElement>(".section-root") ?? svg.querySelector<SVGElement>(".section--1");

  if (rootNode) {
    rootNode.querySelectorAll<SVGElement>("path.node-bkg, rect, circle, ellipse, polygon").forEach((el) => {
      const attrFill = el.getAttribute("fill");
      if (attrFill?.startsWith("url(")) return;
      el.style.fill = t.root.fill;
      el.style.stroke = t.root.stroke;
      el.style.strokeWidth = "1";
    });
    rootNode.querySelectorAll<HTMLElement>("foreignObject *").forEach((el) => {
      el.style.color = t.root.text;
      el.style.fontWeight = "600";
    });
    rootNode.querySelectorAll<SVGElement>("text, tspan").forEach((el) => {
      el.style.fill = t.root.text;
      el.style.fontWeight = "600";
    });
  }

  svg.querySelectorAll<SVGElement>(".mindmap-node").forEach((nodeG) => {
    nodeG.parentElement?.appendChild(nodeG);
  });
}

export function MermaidChart({ children }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const baseId = "mermaid-" + rawId.replace(/:/g, "");
  const renderCountRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    const isMindmap = children.trim().startsWith("mindmap");

    const render = async () => {
      if (cancelled || !containerRef.current) return;

      const isDark = document.documentElement.dataset.theme === "dark";
      const diagramId = `${baseId}-r${++renderCountRef.current}`;

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
        securityLevel: "loose",
        fontFamily: "inherit",
      });

      const rawDiagram = decodeHtmlEntities(children).trim();

      const diagram = isMindmap ? rawDiagram.replace(/\(\((.+?)\)\)/, "($1)") : rawDiagram;

      try {
        const { svg } = await mermaid.render(diagramId, diagram);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          if (isMindmap) {
            applyMindmapTheme(containerRef.current, isDark);
          }
        }
      } catch (err) {
        console.error("[MermaidChart] render failed:", err);
        if (!cancelled && containerRef.current) {
          const pre = document.createElement("pre");
          pre.className = "mermaid-chart__error";
          pre.textContent = diagram;
          containerRef.current.replaceChildren(pre);
        }
      }
    };

    render();

    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [children, baseId]);

  return <div ref={containerRef} className="mermaid-chart" />;
}
