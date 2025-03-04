import { Link } from "@tanstack/react-router";
import type { TRelease } from "../types/releases";

export function Release({ id, name, imageUrl }: TRelease) {
  return (
    <div key={id} className="flex max-w-96">
      <Link
        className="w-full"
        to="/releases/$releaseId/view"
        params={{ releaseId: id.toString() }}
      >
        <div className="min-w-72 flex justify-between items-center gap-8 bg-zinc-800 rounded-lg p-4">
          <p className="text-lg font-medium text-white">{name}</p>
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
