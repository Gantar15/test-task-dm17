import {
  Button,
  FormControl,
  FormErrorMessage,
  Grid,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";

import { Client } from "@/shared/models/client";
import CopyIcon from "@/assets/icons/copy.svg";
import { CreateOrderFields } from "@/shared/types/createOrderFields";
import { CustomSelect } from "@/components/ui/Select";
import { SingleValue } from "react-select";
import clients from "@/data/clients.json";

const preparedClients = clients.map((client) => ({
  value: client,
  label: client.name,
}));

interface CreateOrderDataProps {
  register: UseFormRegister<CreateOrderFields>;
  setValue: UseFormSetValue<CreateOrderFields>;
  errors: FieldErrors<CreateOrderFields>;
}

export const CreateOrderData = ({
  register,
  setValue,
  errors,
}: CreateOrderDataProps) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const clientChangeHandler = (option: SingleValue<{ value: Client }>) => {
    setSelectedClient(option?.value || null);
  };

  useEffect(() => {
    if (!selectedClient) return;
    setValue("phoneNumber", selectedClient.phone);
  }, [selectedClient]);

  return (
    <Stack spacing={"40px"}>
      <Stack spacing={"16px"}>
        <Text className="subtitle">Данные заказа</Text>
        <Grid rowGap={"5px"}>
          <Text className="label">Постоянный клиент</Text>
          <CustomSelect
            placeholder="Выберите клиента"
            options={preparedClients}
            onChange={clientChangeHandler}
            isSearchable
          />
        </Grid>
        <Grid rowGap={"5px"}>
          <Text className="label">Номер телефона</Text>
          <FormControl isInvalid={!!errors.phoneNumber}>
            <Input
              {...register("phoneNumber")}
              placeholder="Введите номер телефона"
            />
            {errors.phoneNumber ? (
              <FormErrorMessage>{errors.phoneNumber.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        </Grid>
        <Grid rowGap={"5px"}>
          <Text className="label">Комментарий</Text>
          <FormControl isInvalid={!!errors.comment}>
            <Textarea
              {...register("comment")}
              placeholder="Введите комментарий"
              fontSize={"14px"}
              px={"8px"}
              py={"10px"}
              _placeholder={{ color: "var(--color-font-placeholder)" }}
            />
            {errors.comment ? (
              <FormErrorMessage>{errors.comment.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        </Grid>
      </Stack>
      <Stack spacing={"16px"}>
        <Text className="subtitle">Доставка</Text>
        <Grid rowGap={"5px"}>
          <Text className="label">Адрес</Text>
          <HStack spacing={"8px"}>
            <CustomSelect
              placeholder="Выберите клиента"
              options={preparedClients}
              onChange={clientChangeHandler}
              isSearchable
            />
            <Button variant={"outline"} px={"9px"} py={"9px"}>
              <img src={CopyIcon} />
            </Button>
          </HStack>
        </Grid>
      </Stack>
    </Stack>
  );
};
