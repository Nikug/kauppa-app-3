import { config } from "@react-spring/web";

export const itemPosition =
  (
    order: string[],
    itemHeight: number,
    active = false,
    originalUrl = "",
    currentIndex = 0,
    y = 0
  ) =>
  (index: number) => {
    const url = order[index];
    // console.log(order, index, url, originalUrl, currentIndex);

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
      const position = order.findIndex((u) => u === url);
      return {
        y: position * itemHeight,
        zIndex: 0,
        immediate: false,
      };
    }
  };
