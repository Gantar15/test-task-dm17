import { CreateOrderFields } from "@/shared/types/createOrderFields";
import { Input } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface OrderDatePicker {
  register: UseFormRegister<CreateOrderFields>;
  error?: string;
}
export const OrderDatePicker = ({ register, error }: OrderDatePicker) => {
  return (
    <Input
      {...register("date")}
      type="date"
      isInvalid={!!error}
      placeholder="Введите дату"
    />
  );
};
