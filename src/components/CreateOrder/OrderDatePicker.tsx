import { Button, HStack, Input, VStack } from "@chakra-ui/react";

import { CreateOrderFields } from "@/shared/types/createOrderFields";
import { UseFormRegister } from "react-hook-form";
import { useState } from "react";

function prepareDateValue(date: string) {
  const dateObj = new Date(date);
  return (
    dateObj.getFullYear() +
    "-" +
    String(dateObj.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(dateObj.getDate()).padStart(2, "0")
  );
}

function transformDate(date: Date) {
  const [day, month, year] = date.toLocaleDateString("ru-RU").split(".");
  return `${month}.${day}.${year}`;
}

type dateDay = "today" | "tomorrow" | "day-after-tomorrow";
interface OrderDatePicker {
  register: UseFormRegister<CreateOrderFields>;
  error?: string;
}
export const OrderDatePicker = ({ register, error }: OrderDatePicker) => {
  const [date, setDate] = useState<string | null>(null);
  const registerOptions = register("date");

  const changeDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(transformDate(new Date(e.target.value)));
    registerOptions.onChange(e);
  };

  function setDay(day: dateDay) {
    const currentDate = new Date();
    switch (day) {
      case "today":
        setDate(transformDate(currentDate));
        break;
      case "tomorrow":
        currentDate.setDate(currentDate.getDate() + 1);
        setDate(transformDate(currentDate));
        break;
      case "day-after-tomorrow":
        currentDate.setDate(currentDate.getDate() + 2);
        setDate(transformDate(currentDate));
        break;
    }
  }

  function getDay() {
    const currentDate = new Date();
    if (date === transformDate(currentDate)) {
      return "today";
    }
    currentDate.setDate(currentDate.getDate() + 1);
    if (date === transformDate(currentDate)) {
      return "tomorrow";
    }
    currentDate.setDate(currentDate.getDate() + 1);
    if (date === transformDate(currentDate)) {
      return "day-after-tomorrow";
    }
  }

  return (
    <VStack alignItems={"flex-start"} spacing={"16px"}>
      <Input
        {...registerOptions}
        onChange={changeDateHandler}
        type="date"
        value={date ? prepareDateValue(date) : ""}
        isInvalid={!!error}
        placeholder="Введите дату"
      />
      <HStack spacing={"8px"}>
        <Button
          variant={getDay() === "today" ? "solid" : "border"}
          onClick={() => setDay("today")}
        >
          Сегодня
        </Button>
        <Button
          variant={getDay() === "tomorrow" ? "solid" : "border"}
          onClick={() => setDay("tomorrow")}
        >
          Завтра
        </Button>
        <Button
          variant={getDay() === "day-after-tomorrow" ? "solid" : "border"}
          onClick={() => setDay("day-after-tomorrow")}
        >
          Послезавтра
        </Button>
      </HStack>
    </VStack>
  );
};
