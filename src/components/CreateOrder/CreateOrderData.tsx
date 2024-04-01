import { Grid, Input, Stack, Text, Textarea } from "@chakra-ui/react";

import { Client } from "@/types/models/client";
import { CustomSelect } from "@/components/ui/Select";
import { SingleValue } from "react-select";
import clients from "@/data/clients.json";
import { useState } from "react";

const preparedClients = clients.map((client) => ({
  value: client,
  label: client.name,
}));

export const CreateOrderData = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const clientChangeHandler = (option: SingleValue<{ value: Client }>) => {
    setSelectedClient(option?.value || null);
  };

  return (
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
        <Input />
      </Grid>
      <Grid rowGap={"5px"}>
        <Text className="label">Комментарий</Text>
        <Textarea fontSize={"14px"} px={"8px"} py={"10px"} />
      </Grid>
    </Stack>
  );
};
