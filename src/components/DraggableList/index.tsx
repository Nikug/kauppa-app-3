import { animated, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { ReactNode, useEffect, useRef } from "react";
import { clamp, move } from "../../utils";
import { itemPosition } from "./util";

interface Props {
  items: ReactNode[];
  itemHeight: number;
}

export const DraggableList = (props: Props) => {
  const { items, itemHeight } = props;

  const order = useRef(items.map((_, i) => i));

  const [springs, api] = useSprings(
    items.length,
    itemPosition(order.current, itemHeight),
    [order.current, items.length]
  );

  useEffect(() => {
    console.log("running use effect");
    order.current = items.map((_, i) => i);
  }, [items]);

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const currentIndex = order.current.indexOf(originalIndex);
    const currentRow = clamp(
      Math.round((currentIndex * itemHeight + y) / itemHeight),
      0,
      items.length - 1
    );

    const newOrder = move(order.current, currentIndex, currentRow);

    api.start(
      itemPosition(newOrder, itemHeight, active, originalIndex, currentIndex, y)
    );

    // Persist the results
    if (!active) {
      console.log("Persisting order", newOrder);
      order.current = newOrder;
    }
  });

  return (
    <div className="relative h-full">
      {springs.map(({ zIndex, shadow, y }, index) => (
        <animated.div
          key={index}
          className="w-full absolute origin-center"
          style={{
            zIndex,
            y,
            height: itemHeight,
          }}
        >
          <div {...bind(index)} className="touch-none">
            {items[index]}
          </div>
        </animated.div>
      ))}
    </div>
  );
};
