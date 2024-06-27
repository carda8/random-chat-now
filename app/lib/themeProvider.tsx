"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "./landing-page/getLPTheme";

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const LPtheme = createTheme(getLPTheme("light"));
  return <ThemeProvider theme={LPtheme}>{children}</ThemeProvider>;
}
