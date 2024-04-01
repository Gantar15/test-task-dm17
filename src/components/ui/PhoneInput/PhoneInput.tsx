import { FieldValues, Path, UseFormSetValue } from "react-hook-form";

import InputMask from "react-input-mask";
import styles from "./PhoneInput.module.scss";
import { useState } from "react";

interface PhoneInputProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  isInvalid?: boolean;
  name: Path<T>;
  onChange?: (value: string) => void;
}

export const PhoneInput = <T extends FieldValues>({
  isInvalid,
  setValue,
  name,
  onChange,
  ...props
}: PhoneInputProps<T>) => {
  const [number, setNumber] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setNumber(value);
    onChange?.(value);
    setValue(name, value);
  };

  return (
    <InputMask
      {...props}
      onChange={handleChange}
      value={number}
      className={
        styles["phone-input"] +
        " " +
        (isInvalid ? styles["phone-input_invalid"] : "")
      }
      mask="+7 (999) 999-99-99"
      placeholder="+7 (___) ___-__-__"
    />
  );
};
