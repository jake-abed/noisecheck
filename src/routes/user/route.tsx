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
      <SignedIn>
        <div>
          Hello {user?.firstName} {user?.lastName}!
        </div>
        <Link to="/user/profile">Profile</Link>
        <Link to="/user/releases">Releases</Link>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <Outlet />
    </>
  );
}
