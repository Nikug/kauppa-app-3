import { animated, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { ReactNode, useRef } from "react";
import { clamp, move } from "../../utils";
import { itemPosition } from "./util";

interface Props {
  items: ReactNode[];
  itemHeight: number;
}

export const DraggableList = (props: Props) => {
  const { items, itemHeight } = props;

  const order = useRef(items.map((_, i) => i));
  const [springs, api] = useSprings(items.length, itemPosition(order.current));

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const currentIndex = order.current.indexOf(originalIndex);
    const currentRow = clamp(
      Math.round((currentIndex * itemHeight + y) / itemHeight),
      0,
      items.length - 1
    );

    const newOrder = move(order.current, currentIndex, currentRow);

    api.start(itemPosition(newOrder, active, originalIndex, currentIndex, y));

    // Persist the results
    if (!active) {
      order.current = newOrder;
    }
  });

  return (
    <div className="relative">
      {springs.map(({ zIndex, shadow, y, scale }, index) => (
        <animated.div
          {...bind()}
          className="w-full absolute origin-center"
          style={{
            zIndex,
            y,
            scale,
            height: itemHeight,
          }}
        >
          {items[index]}
        </animated.div>
      ))}
    </div>
  );
};
