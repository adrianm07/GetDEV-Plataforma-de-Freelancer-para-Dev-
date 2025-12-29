"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "../utils";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselRef = UseEmblaCarouselType[0];

type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1];

export type CarouselOrientation = "horizontal" | "vertical";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugins;
  orientation?: CarouselOrientation;
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextValue {
  carouselRef: CarouselRef;
  api: CarouselApi | undefined;
  orientation: CarouselOrientation;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext =
  React.createContext<CarouselContextValue | null>(null);

function useCarousel(): CarouselContextValue {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  plugins,
  setApi,
  className,
  children,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((embla: CarouselApi) => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  React.useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  React.useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

interface CarouselContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function CarouselContent({
  className,
  ...props
}: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        data-slot="carousel-content"
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

interface CarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

interface CarouselControlProps
  extends React.ComponentProps<typeof Button> {}

function CarouselPrevious({
  className,
  ...props
}: CarouselControlProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      size="icon"
      variant="outline"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({ className, ...props }: CarouselControlProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      size="icon"
      variant="outline"
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
