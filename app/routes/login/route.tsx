import { MetaFunction, useLoaderData, useNavigate } from "@remix-run/react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { register, type Hanko } from "~/utils/hanko.client";
import { TitleName } from "~/utils/title";

import { LinksFunction } from "@remix-run/node";
import styles1 from "~/shared.css";
import {
  Paper,
  Text,
  Anchor,
  BackgroundImage,
  Center,
  Card,
} from "@mantine/core";

import styles2 from "~/routes/login/login.module.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles1 },
];

export const meta: MetaFunction = () => {
  return [
    { title: TitleName("Account") },
    { name: "description", content: "Welcome to Pictiv!" },
  ];
};

export const loader = () => {
  return { hankoUrl: process.env.HANKO_API_URL };
};

const HankoAuth = () => {
  const [hanko, setHanko] = useState<Hanko>();
  const navigate = useNavigate();

  const data = useLoaderData<typeof loader>();
  const hankoUrl = data.hankoUrl || "";

  const redirectAfterLogin = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  useEffect(() => {
    if (hanko) {
      hanko.onAuthFlowCompleted(() => {
        redirectAfterLogin();
      });
    }
  }, [hanko, redirectAfterLogin]);

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
        <hanko-auth />
      </Suspense>
    </div>
  );
};

const Login = () => {
  return (
    <>
      <BackgroundImage style={{ height: "full" }} src="./backdrop.jpg">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Paper
            style={{
              borderLeft:
                "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-7))",
            }}
            className={styles2.paper}
            radius={0}
            px={20}
          >
            <Center style={{ height: "100vh" }}>
              <Card
                style={{
                  backgroundColor: "var(--mantine-color-body)",
                  borderRadius: "12px",
                  padding: "0",
                }}
              >
                <HankoAuth />

                <Text size="xs" ta="center" mb={25}>
                  By creating an account, <br /> you agree to our{" "}
                  <Anchor<"a">
                    href="#"
                    fw={700}
                    onClick={(event) => event.preventDefault()}
                  >
                    terms
                  </Anchor>{" "}
                  and{" "}
                  <Anchor<"a">
                    href="#"
                    fw={700}
                    onClick={(event) => event.preventDefault()}
                  >
                    privacy policy
                  </Anchor>
                  .
                </Text>
              </Card>
            </Center>
          </Paper>
        </div>
      </BackgroundImage>
    </>
  );
};

export default Login;
