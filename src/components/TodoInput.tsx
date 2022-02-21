import { SubmitHandler, useForm } from "react-hook-form";
import { Api, TodoItem } from "../types/todo";
import { SubmitButton } from "./inputs/SubmitButton";
import { TextInput } from "./inputs/TextInput";
import { addTodo } from "../firebase/api";

interface FormInputs {
  content: string;
}

interface Props {
  groupId: string;
}

export const TodoInput = (props: Props) => {
  const { groupId } = props;
  const { register, handleSubmit, reset, setFocus } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newTodo: Api<TodoItem> = {
      done: false,
      content: data.content,
    };
    addTodo(groupId, newTodo);
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
