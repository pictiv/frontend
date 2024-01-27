import { Autocomplete, Burger, Button, Center, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { IconSearch } from "@tabler/icons-react";
// import { useState } from "react";

import classes from "~/header.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Pictiv" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// const links = [
//   { link: "/", label: "Illustrations" },
//   { link: "/pricing", label: "Pricing" },
//   { link: "/learn", label: "Learn" },
//   { link: "/community", label: "Community" },
// ];

export default function Index() {
  const [opened, { toggle }] = useDisclosure(false);
  // const [active, setActive] = useState(links[0].link);

  // const items = links.map((link) => (
  //   <a
  //     key={link.label}
  //     href={link.link}
  //     className={classes.link}
  //     data-active={active === link.link || undefined}
  //     onClick={(event) => {
  //       event.preventDefault();
  //       setActive(link.link);
  //     }}
  //   >
  //     {link.label}
  //   </a>
  // ));

  return (
    <>
      <header className={classes.header}>
        <Container fluid size="xl" className={classes.inner}>
          <Center inline>
            <svg
              className={classes.logo}
              viewBox="0 0 183 183"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="183" height="183" fill="#1E1E1E" />
              <path
                d="M 41.783 142.778 L 41.783 39.109 L 80.659 39.109 C 88.623 39.109 95.305 40.594 100.704 43.563 C 106.138 46.533 110.238 50.616 113.005 55.813 C 115.806 60.977 117.207 66.848 117.207 73.429 C 117.207 80.077 115.806 85.983 113.005 91.146 C 110.205 96.309 106.071 100.376 100.604 103.346 C 95.136 106.281 88.404 107.749 80.406 107.749 L 54.64 107.749 L 54.64 92.31 L 77.875 92.31 C 82.532 92.31 86.345 91.5 89.315 89.881 C 92.285 88.261 94.478 86.033 95.896 83.199 C 97.347 80.364 98.072 77.107 98.072 73.429 C 98.072 69.751 97.347 66.511 95.896 63.71 C 94.478 60.909 92.268 58.732 89.264 57.18 C 86.295 55.594 82.464 54.801 77.774 54.801 L 60.563 54.801 L 60.563 142.778 L 41.783 142.778 Z M 139.125 143.892 C 136.054 143.892 133.422 142.812 131.229 140.652 C 129.035 138.493 127.955 135.86 127.988 132.756 C 127.955 129.719 129.035 127.119 131.229 124.96 C 133.422 122.801 136.054 121.721 139.125 121.721 C 142.095 121.721 144.676 122.801 146.87 124.96 C 149.097 127.119 150.228 129.719 150.261 132.756 C 150.228 134.814 149.687 136.687 148.642 138.374 C 147.629 140.062 146.28 141.412 144.593 142.424 C 142.939 143.403 141.116 143.892 139.125 143.892 Z"
                fill="white"
              />
            </svg>
            {/* <Title order={3} fw={400} visibleFrom="md">
              Pictiv
            </Title> */}
          </Center>
          {/* <Group gap={5} visibleFrom="xs">
            {items}
          </Group> */}
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={
              <IconSearch
                style={{ width: "rem(16)", height: "rem(16)" }}
                stroke={1.5}
              />
            }
            data={["1", "2"]}
            visibleFrom="xs"
          />
          <Button />

          <Burger
            mr={15}
            opened={opened}
            onClick={toggle}
            hiddenFrom="xs"
            size="md"
          />
        </Container>
      </header>
      <Outlet />
    </>
  );
}
