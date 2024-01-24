import {
  Box,
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
  IconButton,
  Stack,
  Typography,
  SvgIcon,
  formLabelClasses,
} from "@mui/joy";
import { useNavigate, useLoaderData, MetaFunction } from "@remix-run/react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { register, type Hanko } from "~/utils/hanko.client";
import { Title } from "~/utils/title";

import styles from "~/shared.css";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: Title("Account") },
    { name: "description", content: "Welcome to Remix!" },
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
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={{
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(19 19 24 / 0.4)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="md">
                <SvgIcon>
                  <svg
                    viewBox="0 0 183 183"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 41.783 142.778 L 41.783 39.109 L 80.659 39.109 C 88.623 39.109 95.305 40.594 100.704 43.563 C 106.138 46.533 110.238 50.616 113.005 55.813 C 115.806 60.977 117.207 66.848 117.207 73.429 C 117.207 80.077 115.806 85.983 113.005 91.146 C 110.205 96.309 106.071 100.376 100.604 103.346 C 95.136 106.281 88.404 107.749 80.406 107.749 L 54.64 107.749 L 54.64 92.31 L 77.875 92.31 C 82.532 92.31 86.345 91.5 89.315 89.881 C 92.285 88.261 94.478 86.033 95.896 83.199 C 97.347 80.364 98.072 77.107 98.072 73.429 C 98.072 69.751 97.347 66.511 95.896 63.71 C 94.478 60.909 92.268 58.732 89.264 57.18 C 86.295 55.594 82.464 54.801 77.774 54.801 L 60.563 54.801 L 60.563 142.778 L 41.783 142.778 Z M 139.125 143.892 C 136.054 143.892 133.422 142.812 131.229 140.652 C 129.035 138.493 127.955 135.86 127.988 132.756 C 127.955 129.719 129.035 127.119 131.229 124.96 C 133.422 122.801 136.054 121.721 139.125 121.721 C 142.095 121.721 144.676 122.801 146.87 124.96 C 149.097 127.119 150.228 129.719 150.261 132.756 C 150.228 134.814 149.687 136.687 148.642 138.374 C 147.629 140.062 146.28 141.412 144.593 142.424 C 142.939 143.403 141.116 143.892 139.125 143.892 Z"
                      fill="white"
                    />
                  </svg>
                </SvgIcon>
              </IconButton>
              <Typography level="title-lg">Pictiv</Typography>
            </Box>
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mt: 2 }}>
              <HankoAuth />
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Pictiv {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: "url(./back.jpg)",
        }}
      />
    </CssVarsProvider>
  );
};

export default Login;
