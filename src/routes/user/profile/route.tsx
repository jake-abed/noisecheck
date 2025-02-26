import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";

export const Route = createFileRoute("/user/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUser();

  return (
    <div className="flex flex-col mx-auto max-w-72 p-8 gap-4">
      <div className="flex justify-between items-center">
        <h2 className="">User Profile</h2>
        <img
          src={user?.imageUrl}
          className="rounded-full"
          height={50}
          width={50}
        />
      </div>
      <p>
        <strong>Username: </strong>
        {user?.username}
      </p>
      <p>
        <strong>Email: </strong> {user?.primaryEmailAddress?.emailAddress}
      </p>
    </div>
  );
}
