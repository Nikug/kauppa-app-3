import { Todo } from "../todo";
import { TodoInput } from "../components/TodoInput";
import { TODO_ITEM_HEIGHT_PX } from "../constants";
import { TodoGroup } from "../types/todo";
import { DraggableList } from "../components/DraggableList";
import { updateTodoOrder } from "../firebase/api";
import { ReactNode } from "react";

interface Props {
  group: TodoGroup;
  collectionId: string;
}

export const GroupView = (props: Props) => {
  const { group, collectionId } = props;

  const updateOrder = (newOrder: string[]) => {
    updateTodoOrder(newOrder, collectionId, group.id);
  };

  const getItems = () => {
    const newItems: ReactNode[] = [];
    group.todoOrder?.forEach((id) => {
      const todo = group.todos?.[id];
      if (todo) {
        newItems.push(
          <Todo
            key={id}
            todo={{ id, ...group.todos![id] }}
            groupId={group.id}
            collectionId={collectionId}
          />
        );
      }
    });

    return newItems;
  };

  const getOrder = () => {
    if (!group.todoOrder) return [];
    return group.todoOrder.filter((order) => order);
  };

  return (
    <div className="w-full max-w-content">
      <div className="fixed top-20 bottom-16 w-full max-w-content overflow-y-auto overflow-x-hidden">
        <DraggableList
          itemHeight={TODO_ITEM_HEIGHT_PX}
          updateOrder={updateOrder}
          order={getOrder()}
          items={getItems()}
          lockAxis
        />
      </div>
      <TodoInput groupId={group.id} collectionId={collectionId} />
    </div>
  );
};
