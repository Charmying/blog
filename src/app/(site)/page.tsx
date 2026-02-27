import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Main landing page of the blog.",
};

export default function HomePage() {
  return (
    <section>
      <h1>Home Title</h1>
      <p>Home Content</p>
    </section>
  );
}
