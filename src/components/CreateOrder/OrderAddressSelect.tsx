import {
  ActionMeta,
  InputActionMeta,
  OnChangeValue,
  Props,
} from "react-select";
import { useEffect, useState } from "react";

import { CustomSelect } from "../ui/Select";
import { DadataService } from "@/shared/utils/services/DadataService";
import useThrottle from "@/shared/hooks/useThrottle";

export type AddressOption = {
  value: string;
  label: string;
};

export const OrderAddressSelect = ({
  maxSuggestionsCount = 5,
  onChange,
  onInputChange,
  isInvalid = false,
  value: optionValueProp,
  ...props
}: Props<AddressOption, false> & {
  maxSuggestionsCount?: number;
  isInvalid?: boolean;
  value?: AddressOption;
}) => {
  const [options, setOptions] = useState<AddressOption[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const deferredValue = useThrottle(value, 300);
  const [selectedOption, setSelectedOption] = useState<AddressOption | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!deferredValue) {
      setOptions([]);
      return;
    }
    setIsLoading(true);
    DadataService.getSuggestions(deferredValue)
      .then((data) => {
        if (!data) return;
        const suggestionOptions = data.suggestions
          .slice(0, maxSuggestionsCount)
          .map((suggestion) => ({
            value: suggestion.value,
            label: suggestion.value,
          }));
        setOptions(suggestionOptions);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [deferredValue]);

  useEffect(() => {
    if (optionValueProp?.value) {
      setValue(optionValueProp.value);
      setSelectedOption(optionValueProp);
    }
  }, [optionValueProp]);

  const addressChangeHandler = (
    newValue: string,
    actionMeta: InputActionMeta
  ) => {
    setSelectedOption({ value: newValue, label: newValue });
    setValue(newValue);
    onInputChange?.(newValue, actionMeta);
  };

  const addressOptionChangeHandler = (
    newValue: OnChangeValue<AddressOption, false>,
    actionMeta: ActionMeta<AddressOption>
  ) => {
    setSelectedOption(newValue || null);
    setValue(newValue?.value || null);
    onChange?.(newValue, actionMeta);
  };

  const menuCloseHandler = () => {
    if (!value) {
      setSelectedOption(null);
      return;
    }
    const option = { value, label: value };
    setSelectedOption(option);
    setValue(value);
    onChange?.(option, { action: "select-option", option });
    onInputChange?.(value, {
      action: "set-value",
      prevInputValue: "",
    });
  };

  return (
    <CustomSelect
      {...props}
      isInvalid={isInvalid}
      placeholder="Выберите клиента"
      isSearchable
      isLoading={isLoading}
      options={options}
      onInputChange={addressChangeHandler}
      inputValue={value || ""}
      onChange={addressOptionChangeHandler}
      value={selectedOption}
      onMenuClose={menuCloseHandler}
    />
  );
};
