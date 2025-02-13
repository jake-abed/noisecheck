import { createFileRoute } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

export const Route = createFileRoute("/user/")({
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
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}
