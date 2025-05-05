import { Link } from "@tanstack/react-router";
import type { TRelease } from "../types/releases";

export function Release({ id, name, imageUrl, username, userId }: TRelease) {
  return (
    <div key={id} className="flex max-w-96">
      <Link
        className="w-full"
        to="/releases/$releaseId/view"
        params={{ releaseId: id.toString() }}
      >
        <div className="min-w-72 flex justify-between items-center gap-8 bg-zinc-700 drop-shadow-lg rounded-lg p-4">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium text-white">{name}</p>
            {userId ? (
              <Link to="/user/$userId" params={{ userId: userId }}>
                <p className="text-md font-medium text-white">{username}</p>
              </Link>
            ) : (
              <p className="text-md font-medium text-white">{username}</p>
            )}
          </div>
          <img
            src={imageUrl}
            width={100}
            height={100}
            alt={name}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>
      </Link>
    </div>
  );
}
