import {
  CheckIcon,
  PencilIcon,
  RewindIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { animated, useTransition } from "@react-spring/web";
import classNames from "classnames";
import { ANIMATION_DURATION } from "../constants";

const backgroundClasses = classNames(
  "px-4",
  "h-full",
  "w-full",
  "flex",
  "justify-between",
  "items-center",
  "absolute"
);

const iconClasses = "h-8 w-8 text-primary-dark";

interface Props {
  done: boolean;
}

export const Background = (props: Props) => {
  const { done } = props;

  const transitions = useTransition(done, {
    initial: { opacity: 1, scale: 1 },
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    delay: ANIMATION_DURATION,
    trail: ANIMATION_DURATION,
  });

  return (
    <div className="h-full w-full absolute">
      {transitions((styles, isDone) =>
        isDone ? (
          <animated.div className={backgroundClasses}>
            <animated.div style={styles}>
              <TrashIcon className={iconClasses} />
            </animated.div>
            <animated.div style={styles}>
              <RewindIcon className={iconClasses} />
            </animated.div>
          </animated.div>
        ) : (
          <animated.div className={backgroundClasses}>
            <animated.div style={styles}>
              <CheckIcon className={iconClasses} />
            </animated.div>
            <animated.div style={styles}>
              <PencilIcon className={iconClasses} />
            </animated.div>
          </animated.div>
        )
      )}
    </div>
  );
};
