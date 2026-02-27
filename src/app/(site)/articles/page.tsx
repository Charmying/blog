import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "A list of blog articles.",
};

export default function ArticlesPage() {
  return (
    <section>
      <h1>Articles Title</h1>
      <p>Articles Content</p>
    </section>
  );
}
