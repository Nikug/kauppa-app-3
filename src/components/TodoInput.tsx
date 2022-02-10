import { SubmitHandler, useForm } from "react-hook-form";
import { addTodo } from "../redux/appSlice";
import { useAppDispatch } from "../redux/hooks";
import { TodoGroup, TodoItem } from "../types/todo";
import { SubmitButton } from "./inputs/SubmitButton";
import { TextInput } from "./inputs/TextInput";

interface FormInputs {
  content: string;
}

interface Props {
  group: TodoGroup;
}

export const TodoInput = (props: Props) => {
  const { group } = props;
  const { register, handleSubmit, reset, setFocus } = useForm<FormInputs>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newTodo: TodoItem = {
      id: data.content,
      content: data.content,
    };
    dispatch(addTodo({ groupId: group.id, todo: newTodo }));
    reset();
    setFocus("content");
  };

  return (
    <div className="fixed bottom-0 w-full max-w-content flex items-center h-16 bg-slate-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-x-4 w-full px-4"
      >
        <TextInput
          {...register("content")}
          className="w-full"
          placeholder="Lisää..."
        />
        <SubmitButton value="Add" />
      </form>
    </div>
  );
};
