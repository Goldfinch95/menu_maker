//
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validations } from "../utils/validate_form";
import { handleLoginSubmit } from "./handlers";
import { formState } from "../types/form_state";

export const loginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validations),
    defaultValues: { email: "", password: "" },
  });
  const onSubmit = async (form: formState) => {
    await handleLoginSubmit(form);
  };
  return { register, handleSubmit, errors, onSubmit, isSubmitting };
};
