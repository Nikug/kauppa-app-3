import { config } from "@react-spring/web";
import { SpringMapping } from ".";

export const itemPosition =
  (
    order: string[],
    springMapping: SpringMapping[],
    itemHeight: number,
    immediate = false,
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
      return {
        y: currentIndex * itemHeight + y,
        zIndex: 1,
        immediate: true,
        config: config.stiff,
      };

      // Other items, including initial positions
    } else {
      const position = order.indexOf(url);
      return {
        y: position * itemHeight,
        zIndex: 0,
        immediate,
      };
    }
  };
