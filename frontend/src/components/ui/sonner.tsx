"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import type { CSSProperties} from "react";

const toasterStyle: CSSProperties = {
  ["--normal-bg" as any]: "var(--popover)",
  ["--normal-text" as any]: "var(--popover-foreground)",
  ["--normal-border" as any]: "var(--border)",
};

function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={toasterStyle}
      {...props}
    />
  );
}

export { Toaster };
