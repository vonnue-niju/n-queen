"use client";

import { inputFormSchema } from "@/schema/input-form";
import { InputFormType } from "@/types/input-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface InputFormProps {
  handleModal: () => void;
  setNumberOfRows: Dispatch<SetStateAction<number | null>>;
}

export const InputForm = ({ handleModal, setNumberOfRows }: InputFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormType>({
    defaultValues: {
      rows: 0,
    },
    resolver: zodResolver(inputFormSchema),
  });

  const onSubmit = (data: InputFormType) => {
    console.log(data);
    setNumberOfRows(data.rows);
    handleModal();
  };

  return (
    <div>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <label
          className="mb-6 text-2xl font-semibold text-center text-white/90"
          htmlFor="rows"
        >
          Enter the number of Rows
        </label>
        <input
          type="number"
          min={0}
          className="text-white py-2 px-4 rounded-lg bg-gray-700  active:text-white border-2 outline-none focus:outline-none border-white"
          {...register("rows", { valueAsNumber: true })}
        />
        {errors.rows ? (
          <span className="text-base text-red-500 mt-2">
            {errors.rows.message}
          </span>
        ) : null}
        <button
          className="bg-white text-gray-900 py-2 rounded-lg mt-6 font-semibold"
          type="submit"
        >
          play
        </button>
      </form>
    </div>
  );
};
