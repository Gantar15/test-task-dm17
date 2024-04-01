import { Stack, Text } from "@chakra-ui/react";

import { ProductsTable } from "./ProductsTable";

interface CreateOrderProductsProps {
  orderId: number;
  deliveryPrice: number;
}

export const CreateOrderProducts = ({
  orderId,
  deliveryPrice,
}: CreateOrderProductsProps) => {
  return (
    <Stack spacing={"16px"}>
      <Text className="subtitle">Товары к заказу</Text>
      <ProductsTable orderId={orderId} deliveryPrice={deliveryPrice} />
    </Stack>
  );
};
