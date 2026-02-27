import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About the author of this blog.",
};

export default function AboutPage() {
  return (
    <section>
      <h1>About Title</h1>
      <p>About Content</p>
    </section>
  );
}
