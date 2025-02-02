import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}
