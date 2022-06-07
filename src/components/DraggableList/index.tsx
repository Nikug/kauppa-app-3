import { animated, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { ReactNode, useEffect, useMemo } from "react";
import { clamp, move } from "../../utils";
import { itemPosition } from "./util";

export interface SpringMapping {
  springIndex: number;
  itemId: string;
}

interface Props {
  items: ReactNode[];
  order: string[];
  itemHeight: number;
  updateOrder: (newOrder: string[]) => void;
}

export const DraggableList = (props: Props) => {
  const { items, itemHeight, order, updateOrder } = props;

  const [springs, api] = useSprings(
    items.length,
    itemPosition(order, [], itemHeight)
  );
  const springMapping: SpringMapping[] = useMemo(() => {
    return springs.map((_, index) => ({
      springIndex: index,
      itemId: order[index],
    }));
  }, [springs, order]);

  useEffect(() => {
    api.start(itemPosition(order, springMapping, itemHeight, true));
  }, [order, api, itemHeight, springMapping]);

  const bind = useDrag(({ args: [url], active, movement: [, y] }) => {
    // Calculate new positions
    const currentIndex = order.indexOf(url);
    const currentRow = clamp(
      Math.round((currentIndex * itemHeight + y) / itemHeight),
      0,
      items.length - 1
    );

    // Create new order of items
    const newOrder = move(order, currentIndex, currentRow);

    // Animate the transition
    api.start(
      itemPosition(
        newOrder,
        springMapping,
        itemHeight,
        false,
        active,
        url,
        currentIndex,
        y
      )
    );

    // Persist the results
    if (!active) {
      updateOrder(newOrder);
    }
  });

  return (
    <div className="relative h-full">
      {springs.map((styles, index) => {
        const springIndex = springMapping.find(
          (spring) => spring.springIndex === index
        );
        if (!springIndex) return null;

        const itemIndex = order.indexOf(springIndex.itemId);

        return (
          <animated.div
            key={springIndex.itemId}
            className="w-full absolute origin-center"
            style={{
              ...styles,
              height: itemHeight,
            }}
          >
            <div {...bind(springIndex.itemId)} className="touch-none">
              {items[itemIndex]}
            </div>
          </animated.div>
        );
      })}
    </div>
  );
};
