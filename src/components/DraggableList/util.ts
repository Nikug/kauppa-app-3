import { config } from "@react-spring/web";
import { SpringMapping } from ".";

export const itemPosition =
  (
    order: string[],
    springMapping: SpringMapping[],
    itemHeight: number,
    active = false,
    originalUrl = "",
    currentIndex = 0,
    y = 0
  ) =>
  (index: number) => {
    const url =
      springMapping.find((spring) => spring.springIndex === index)?.itemId ??
      order[index];

    // Moving the selected item
    if (active && url === originalUrl) {
      // console.log(url, currentIndex * itemHeight + y);
      return {
        y: currentIndex * itemHeight + y,
        zIndex: 1,
        immediate: true,
        config: (key: string) => (key === "y" ? config.stiff : config.default),
      };

      // Other items, including initial positions
    } else {
      const position = order.indexOf(url);
      // console.log(url, position * itemHeight);
      return {
        y: position * itemHeight,
        zIndex: 0,
        immediate: false,
      };
    }
  };
