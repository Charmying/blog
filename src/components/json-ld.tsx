import type { SchemaNode } from "@/lib/schema";

export function JsonLd({ graph }: { graph: SchemaNode[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
