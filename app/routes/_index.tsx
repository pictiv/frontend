import type { MetaFunction } from "@remix-run/node";
import { Button } from "@mui/joy";

export const meta: MetaFunction = () => {
  return [
    { title: "Pictiv" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <Button variant="solid">Hello world</Button>;
}
