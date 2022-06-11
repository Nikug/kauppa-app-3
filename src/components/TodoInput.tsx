import { SubmitHandler, useForm } from "react-hook-form";
import { Api, TodoItem } from "../types/todo";
import { SubmitButton } from "./inputs/SubmitButton";
import { TextInput } from "./inputs/TextInput";
import { addTodo } from "../firebase/api";
import { useTranslation } from "react-i18next";

interface FormInputs {
  content: string;
}

interface Props {
  groupId: string;
  collectionId: string;
}

export const TodoInput = (props: Props) => {
  const { t } = useTranslation();
  const { groupId, collectionId } = props;
  const { register, handleSubmit, setFocus, setValue } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (!data.content) return;
    const newTodo: Api<TodoItem> = {
      done: false,
      content: data.content,
    };
    addTodo(collectionId, groupId, newTodo);
    setValue("content", "");
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
          placeholder={t("todo.new")}
          large
        />
        <SubmitButton className="secondary" value={t("todo.add")} />
      </form>
    </div>
  );
};
