import { useAuth, useClerk } from "@clerk/clerk-react";
import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";

function useClerkQuery(url: string) {
  const { getToken } = useAuth();

  return useQuery({
    queryFn: async () => {
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (!res.ok) {
        throw new Error("Network response error");
      }

      return res.json();
    },
    queryKey: [url],
  });
}

//"http://localhost:3000/releases"

export default function PostRelease() {
  const { data } = useClerkQuery("http://localhost:3000/api/releases");

  function onPostRelease() {
    console.log("HEY THERE");
    console.log(data);
  }

  return (
    <div>
      <button onClick={onPostRelease}>Post Release</button>
    </div>
  );
}
