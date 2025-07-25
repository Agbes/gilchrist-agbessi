"use client";

import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

interface AuthFormProps {
  onSubmit: (data: FormData) => void;
}

export default function AuthForm({ onSubmit }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Adresse e-mail</span>
        </label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="you@example.com"
          {...register("email", { required: "Email requis" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Mot de passe</span>
        </label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="********"
          {...register("password", { required: "Mot de passe requis" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Connexion
      </button>
    </form>
  );
}
