import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";

import InputMask from "react-input-mask";
import styles from "./PhoneInput.module.scss";

interface PhoneInputProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  isInvalid?: boolean;
  name: Path<T>;
  value?: string;
  onChange?: (value: string) => void;
}

export const PhoneInput = <T extends FieldValues>({
  isInvalid,
  setValue,
  name,
  value,
  onChange,
  ...props
}: PhoneInputProps<T>) => {
  const [number, setNumber] = useState<string>();

  useEffect(() => {
    if (value) {
      setNumber(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setNumber(value);
    setValue(name, value);
    onChange?.(value);
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
