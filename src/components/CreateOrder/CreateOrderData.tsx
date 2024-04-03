import { AddressOption, OrderAddressSelect } from "./OrderAddressSelect";
import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { useEffect, useState } from "react";

import { Client } from "@/shared/models/client";
import CopyIcon from "@/assets/icons/copy.svg?react";
import { CreateOrderFields } from "@/shared/types/createOrderFields";
import { CustomSelect } from "@/components/ui/Select";
import { FieldBlock } from "../ui/FieldBlock";
import { OrderDatePicker } from "./OrderDatePicker";
import { PhoneInput } from "../ui/PhoneInput";
import { SingleValue } from "react-select";
import clients from "@/data/clients.json";

const preparedClients = clients.map((client) => ({
  value: client,
  label: client.name,
}));

interface CreateOrderDataProps {
  register: UseFormRegister<CreateOrderFields>;
  setValue: UseFormSetValue<CreateOrderFields>;
  watch: UseFormWatch<CreateOrderFields>;
  trigger: UseFormTrigger<CreateOrderFields>;
  errors: FieldErrors<CreateOrderFields>;
}

export const CreateOrderData = ({
  register,
  setValue,
  watch,
  trigger,
  errors,
}: CreateOrderDataProps) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const clientChangeHandler = (option: SingleValue<{ value: Client }>) => {
    setSelectedClient(option?.value || null);
  };

  const copyAddressHandler = () => {
    navigator.clipboard.writeText(watch("address"));
  };

  const onAddressChangeHandler = (newValue: SingleValue<AddressOption>) => {
    setValue("address", newValue?.value || "");
    trigger("address");
  };

  const onAddressInputChangeHandler = (newValue: string) => {
    setValue("address", newValue || "");
    trigger("address");
  };

  useEffect(() => {
    if (!selectedClient) return;
    setValue("client", selectedClient.name);
    setValue("phoneNumber", selectedClient.phone);
    setValue("address", selectedClient.address);
    trigger("client");
    trigger("phoneNumber");
    trigger("address");
  }, [selectedClient]);

  return (
    <FormControl isInvalid={Object.keys(errors).length > 0}>
      <Stack spacing={"40px"}>
        <Stack spacing={"16px"}>
          <Text className="subtitle">Данные заказа</Text>
          <FieldBlock title="Постоянный клиент" error={errors.client?.message}>
            <CustomSelect
              placeholder="Выберите клиента"
              options={preparedClients}
              onChange={clientChangeHandler}
              isSearchable
              isInvalid={!!errors.client}
            />
          </FieldBlock>

          <FieldBlock
            title="Номер телефона"
            error={errors.phoneNumber?.message}
          >
            <PhoneInput
              name="phoneNumber"
              value={watch("phoneNumber")}
              setValue={setValue}
              isInvalid={!!errors.phoneNumber}
              onChange={() => trigger("phoneNumber")}
            />
          </FieldBlock>

          <FieldBlock title="Комментарий" error={errors.comment?.message}>
            <Textarea
              {...register("comment")}
              isInvalid={!!errors.comment}
              placeholder="Введите комментарий"
              fontSize={"14px"}
              px={"8px"}
              py={"10px"}
              _placeholder={{ color: "var(--color-font-placeholder)" }}
              _focusVisible={{
                borderColor: "var(--color-primary)",
                boxShadow: "none",
              }}
              color={"var(--color-font-dark)"}
            />
          </FieldBlock>
        </Stack>

        <Stack spacing={"16px"}>
          <Text className="subtitle">Доставка</Text>
          <FieldBlock title="Адрес" error={errors.address?.message}>
            <Flex columnGap={"8px"} width={"100%"}>
              <OrderAddressSelect
                onChange={onAddressChangeHandler}
                onInputChange={onAddressInputChangeHandler}
                isInvalid={!!errors.address}
                value={{ value: watch("address"), label: watch("address") }}
              />
              <Tooltip label="Скопировать адрес">
                <Button
                  variant={"translate"}
                  px={"9px"}
                  py={"9px"}
                  onClick={copyAddressHandler}
                >
                  <CopyIcon />
                </Button>
              </Tooltip>
            </Flex>
          </FieldBlock>

          <FieldBlock title="Стоимость" error={errors.deliveryPrice?.message}>
            <InputGroup size="sm">
              <Input
                {...register("deliveryPrice")}
                isInvalid={!!errors.deliveryPrice}
                placeholder="Стоимость"
                fontSize={"14px"}
                px={"8px"}
                py={"10px"}
                _placeholder={{ color: "var(--color-font-placeholder)" }}
              />
              <InputRightAddon
                children="RUB"
                px={"16px"}
                py={"11.5px"}
                height={"40px"}
                backgroundColor={"#D8DBF3"}
                color={"var(--color-font-dark)"}
                borderRadius={"0px 4px 4px 0px"}
              />
            </InputGroup>
          </FieldBlock>

          <FieldBlock title="Дата" error={errors.date?.message}>
            <OrderDatePicker
              register={register}
              setValue={(date) => {
                setValue("date", date);
                trigger("date");
              }}
              error={errors.date?.message}
            />
          </FieldBlock>
        </Stack>
      </Stack>
    </FormControl>
  );
};
