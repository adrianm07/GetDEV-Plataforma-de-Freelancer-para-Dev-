"use client";

import * as React from "react";
import * as Recharts from "recharts";

import { cn } from "../utils";

const THEMES = {
  light: "",
  dark: ".dark",
} as const;

type ThemeName = keyof typeof THEMES;

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<ThemeName, string> }
  )
>;

type ChartContextValue = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart(): ChartContextValue {
  const ctx = React.useContext(ChartContext);
  if (!ctx) {
    throw new Error("useChart must be used within <ChartContainer />");
  }
  return ctx;
}

type ChartContainerProps = React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof Recharts.ResponsiveContainer
  >["children"];
};

function ChartContainer({
  id,
  className,
  config,
  children,
  ...props
}: ChartContainerProps) {
  const reactId = React.useId();
  const chartId = `chart-${id ?? reactId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-layer]:outline-none",
          "[&_.recharts-surface]:outline-none",
          "[&_.recharts-sector]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

type ChartStyleProps = {
  id: string;
  config: ChartConfig;
};

function ChartStyle({ id, config }: ChartStyleProps) {
  const colorEntries = Object.entries(config).filter(
    ([, value]) => value.color || value.theme,
  );

  if (!colorEntries.length) return null;

  const css = Object.entries(THEMES)
    .map(([theme, selector]) => {
      const vars = colorEntries
        .map(([key, cfg]) => {
          const color =
            cfg.theme?.[theme as ThemeName] ?? cfg.color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");

      return `
${selector} [data-chart="${id}"] {
${vars}
}`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

const ChartTooltip = Recharts.Tooltip;

type ChartTooltipContentProps =
  React.ComponentProps<typeof Recharts.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "dot" | "line" | "dashed";
      nameKey?: string;
      labelKey?: string;
    };

function ChartTooltipContent({
  active,
  payload,
  className,
  hideLabel = false,
  hideIndicator = false,
  indicator = "dot",
  label,
  labelFormatter,
  labelClassName,
  color,
  nameKey,
  labelKey,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  const renderLabel = () => {
    if (hideLabel) return null;

    const item = payload[0];
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const cfg = getPayloadConfig(config, item, key);

    const text =
      typeof label === "string"
        ? config[label]?.label ?? label
        : cfg?.label;

    if (!text) return null;

    return (
      <div className={cn("font-medium", labelClassName)}>
        {labelFormatter ? labelFormatter(text, payload) : text}
      </div>
    );
  };

  const nested = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "grid min-w-[8rem] gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        "border-border/50 bg-background",
        className,
      )}
    >
      {!nested && renderLabel()}
      <div className="grid gap-1.5">
        {payload.map((item) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const cfg = getPayloadConfig(config, item, key);
          const indicatorColor = color ?? item.color ?? item.payload?.fill;

          return (
            <div
              key={String(item.dataKey)}
              className="flex items-center gap-2"
            >
              {!hideIndicator && (
                <div
                  className={cn(
                    "rounded-sm",
                    indicator === "dot" && "h-2.5 w-2.5",
                    indicator === "line" && "h-2.5 w-1",
                    indicator === "dashed" &&
                      "h-2.5 w-0 border border-dashed",
                  )}
                  style={{ backgroundColor: indicatorColor }}
                />
              )}

              <div className="flex flex-1 justify-between">
                <span className="text-muted-foreground">
                  {cfg?.label ?? item.name}
                </span>
                {item.value != null && (
                  <span className="font-mono font-medium tabular-nums">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = Recharts.Legend;

type ChartLegendContentProps = React.ComponentProps<"div"> &
  Pick<Recharts.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  };

function ChartLegendContent({
  className,
  payload,
  verticalAlign = "bottom",
  hideIcon = false,
  nameKey,
}: ChartLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey ?? item.dataKey ?? "value"}`;
        const cfg = getPayloadConfig(config, item, key);

        return (
          <div
            key={String(item.value)}
            className="flex items-center gap-1.5"
          >
            {cfg?.icon && !hideIcon ? (
              <cfg.icon />
            ) : (
              <div
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
            )}
            {cfg?.label}
          </div>
        );
      })}
    </div>
  );
}

function getPayloadConfig(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) return;

  const data =
    "payload" in payload && typeof payload.payload === "object"
      ? payload.payload
      : payload;

  const labelKey =
    typeof (data as any)[key] === "string"
      ? (data as any)[key]
      : key;

  return config[labelKey] ?? config[key];
}

export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};
