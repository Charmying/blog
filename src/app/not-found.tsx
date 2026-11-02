import { RootDocument } from "./root-document";

export default function NotFound() {
  return (
    <RootDocument lang="en">
      <title>404: This page could not be found.</title>
      <div className="not-found">
        <h1 className="not-found__code">404</h1>
        <h2 className="not-found__message">This page could not be found.</h2>
      </div>
    </RootDocument>
  );
}
