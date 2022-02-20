import { SubmitHandler, useForm } from "react-hook-form";
import { TodoGroup, TodoItem } from "../types/todo";
import { SubmitButton } from "./inputs/SubmitButton";
import { TextInput } from "./inputs/TextInput";
import { v1 as uuid } from "uuid";
import { addTodo } from "../firebase/api";

interface FormInputs {
  content: string;
}

interface Props {
  group: TodoGroup;
}

export const TodoInput = (props: Props) => {
  const { group } = props;
  const { register, handleSubmit, reset, setFocus } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newTodo: TodoItem = {
      id: uuid(),
      done: false,
      content: data.content,
    };
    addTodo(group.id, newTodo);
    reset();
    setFocus("content");
  };

  return (
    <div className="fixed bottom-0 w-full max-w-content flex items-center h-16 bg-secondary-light">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-x-4 w-full px-4"
      >
        <TextInput
          {...register("content")}
          className="w-full"
          placeholder="New..."
        />
        <SubmitButton value="Add" />
      </form>
    </div>
  );
};
