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
  collectionId: string;
}

export const TodoInput = (props: Props) => {
  const { groupId, collectionId } = props;
  const { register, handleSubmit, reset, setFocus } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newTodo: Api<TodoItem> = {
      done: false,
      content: data.content,
    };
    addTodo(collectionId, groupId, newTodo);
    reset();
    setFocus("content");
  };

  return (
    <div className="fixed bottom-0 w-full max-w-content flex items-center h-16 bg-primary">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-x-4 w-full px-4 items-center"
      >
        <TextInput
          {...register("content")}
          className="w-full h-full"
          placeholder="New..."
          large
        />
        <SubmitButton className="bg-secondary" value="Add" />
      </form>
    </div>
  );
};
