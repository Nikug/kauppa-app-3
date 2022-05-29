import { animated, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { ReactNode } from "react";
import { clamp, move } from "../../utils";
import { itemPosition } from "./util";

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
    itemPosition(order, itemHeight)
  );

  const bind = useDrag(({ args: [url], active, movement: [, y] }) => {
    const currentIndex = order.indexOf(url);
    const currentRow = clamp(
      Math.round((currentIndex * itemHeight + y) / itemHeight),
      0,
      items.length - 1
    );

    const newOrder = move(order, currentIndex, currentRow);

    api.start(itemPosition(newOrder, itemHeight, active, url, currentIndex, y));

    // Persist the results
    if (!active) {
      console.log("Persisting order", newOrder);
      updateOrder(newOrder);
    }
  });

  return (
    <div className="relative h-full">
      {springs.map(({ zIndex, y }, index) => {
        return (
          <animated.div
            key={order[index]}
            className="w-full absolute origin-center"
            style={{
              zIndex,
              y,
              height: itemHeight,
            }}
          >
            <div {...bind(order[index])} className="touch-none">
              {items[index]}
            </div>
          </animated.div>
        );
      })}
    </div>
  );
};
