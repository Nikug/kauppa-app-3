import { SubmitHandler, useForm } from "react-hook-form";
import { TodoGroup } from "../types/todo";
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
  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data, group);
    reset();
  };

  return (
    <div className="fixed bottom-0 w-content flex items-center h-16 bg-slate-400">
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
