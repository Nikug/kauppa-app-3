import { useForm } from "react-hook-form";
import { LoginInformation } from "../types/react";
import { Button } from "./inputs/Button";
import { SubmitButton } from "./inputs/SubmitButton";
import { TextInput } from "./inputs/TextInput";

interface Props {
  onSubmit(login: LoginInformation): void;
  isRegister?: boolean;
}

export const Login = (props: Props) => {
  const { onSubmit, isRegister } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInformation>();

  return (
    <div className="paper-hover p-4 text-center w-full">
      <h2 className="mb-4">{isRegister ? "Register" : "Login"}</h2>
      <form
        className="flex flex-col text-left"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email">Email</label>
        <TextInput
          className="mb-4"
          type="email"
          id="email"
          error={errors.email?.message}
          {...register("email", { required: "required" })}
        />
        <label htmlFor="password">Password</label>
        <TextInput
          className="mb-8"
          id="password"
          type="password"
          error={errors.password?.message}
          {...register("password", { required: "required" })}
        />
        <SubmitButton
          value={isRegister ? "Register" : "Login"}
          className="primary mb-4"
        />
        <Button className="secondary">Login with Google</Button>
      </form>
    </div>
  );
};
