import { config } from "@react-spring/web";

export const itemPosition =
  (
    order: number[],
    itemHeight: number,
    active = false,
    originalIndex = 0,
    currentIndex = 0,
    y = 0
  ) =>
  (index: number) => {
    return active && index === originalIndex
      ? {
          y: currentIndex * itemHeight + y,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === "zIndex",
          config: (key: string) =>
            key === "y" ? config.stiff : config.default,
        }
      : {
          y: order.indexOf(index) * itemHeight,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };
  };
