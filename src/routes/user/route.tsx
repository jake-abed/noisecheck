import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

export const Route = createFileRoute("/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUser();

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <SignedIn>
          <div>Hi {user?.username}!</div>
          <Link to="/user/profile">Profile</Link>
          <Link to="/user/releases">Releases</Link>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
      <Outlet />
    </>
  );
}
