import { Divider, HStack, Stack, Text } from "@chakra-ui/react";

import { CreateOrderData } from "@/components/CreateOrder/CreateOrderData";
import { MainLayout } from "@/layouts/MainLayout";

export const CreateOrder = () => {
  return (
    <MainLayout>
      <Stack spacing={"40px"}>
        <Text className="title">Создание заказа</Text>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Stack>
            <CreateOrderData />
          </Stack>
          <Divider orientation="vertical" />
        </HStack>
      </Stack>
    </MainLayout>
  );
};
