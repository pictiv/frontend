import { useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import { type Hanko, register } from "~/utils/hanko.client";

export const loader = () => {
  return { hankoUrl: process.env.HANKO_API_URL };
};

function HankoProfile() {
  const data = useLoaderData<typeof loader>();
  const hankoUrl = data.hankoUrl || "";

  const [, setHanko] = useState<Hanko>();

  useEffect(() => {
    register(hankoUrl)
      .catch((error: Error) => {
        console.error(error.message);
      })
      .then((result) => {
        if (result) {
          setHanko(result.hanko);
        }
      });
  }, [hankoUrl]);

  return (
    <div className="">
      <Suspense fallback={"Loading..."}>
        <hanko-profile />
      </Suspense>
    </div>
  );
}

const Dashboard = () => {
  return (
    <div>
      <HankoProfile />
    </div>
  );
};

export default Dashboard;
