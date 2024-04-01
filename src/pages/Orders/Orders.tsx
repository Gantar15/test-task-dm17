import { Button, HStack, Stack, Text } from "@chakra-ui/react";

import { MainLayout } from "../../layouts/MainLayout";
import { OrdersTable } from "../../components/Orders/OrdersTable";
import PlusIcon from "@/assets/icons/plus.svg?react";
import { routes } from "@/shared/router/routes";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Stack spacing={"20px"}>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Text className="title">Заказы</Text>
          <Button
            leftIcon={<PlusIcon />}
            onClick={() => navigate(routes.create)}
          >
            Добавить заказ
          </Button>
        </HStack>
        <OrdersTable />
      </Stack>
    </MainLayout>
  );
};
