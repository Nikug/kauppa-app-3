import { config } from "@react-spring/web";

export const itemPosition =
  (
    order: number[],
    active = false,
    originalIndex = 0,
    currentIndex = 0,
    y = 0
  ) =>
  (index: number) =>
    active && index === originalIndex
      ? {
          y: currentIndex * 62 + y,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === "zIndex",
          config: (key: string) =>
            key === "y" ? config.stiff : config.default,
        }
      : {
          y: order.indexOf(index) * 62,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };
