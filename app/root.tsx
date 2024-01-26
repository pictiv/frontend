import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/form";
import "@mantine/hooks";
import "@mantine/modals";
import "@mantine/notifications/styles.css";

import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import {
  ColorSchemeScript,
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from "@mantine/core";

const main: MantineColorsTuple = [
  "#fff8e1",
  "#ffefcc",
  "#ffdd9b",
  "#ffca64",
  "#ffba38",
  "#ffb01b",
  "#ffab09",
  "#e39500",
  "#ca8500",
  "#af7100",
];

const theme = createTheme({
  colors: {
    main,
  },
});

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}
