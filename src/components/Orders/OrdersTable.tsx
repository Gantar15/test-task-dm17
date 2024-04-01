import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { OrderStatusBlock } from "./OrderStatusBlock";
import { updateOrderStatus } from "@/store/features/orders/orderSlice";

export const OrdersTable = () => {
  const { orders } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  const cancelOrderHandler = (id: string) => {
    dispatch(updateOrderStatus({ id, status: "Cancelled" }));
  };

  const completeOrderHandler = (id: string) => {
    dispatch(updateOrderStatus({ id, status: "Completed" }));
  };

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>№</Th>
            <Th>Клиент</Th>
            <Th>Номер телефона</Th>
            <Th>Статус</Th>
            <Th>Дата доставки</Th>
            <Th>Адрес доставки</Th>
            <Th>кол-во</Th>
            <Th>Стоимость товаров (RUB)</Th>
            <Th>Стоимость доставки (RUB)</Th>
            <Th>Стоимость итого (RUB)</Th>
            <Th>Комментарий</Th>
            <Th>Действия</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr>
              <Td>{order.id}</Td>
              <Td>{order.client}</Td>
              <Td>{order.phoneNumber}</Td>
              <Td>
                <OrderStatusBlock status={order.status} />
              </Td>
              <Td>{order.date}</Td>
              <Td>{order.address}</Td>
              <Td>{order.quantity}</Td>
              <Td>{order.productsPrice}</Td>
              <Td>{order.deliveryPrice}</Td>
              <Td>{order.totalPrice}</Td>
              <Td>{order.comment || "-"}</Td>
              <Td display={"flex"} alignItems={"center"} gap={"20px"}>
                <Text
                  size={"sm"}
                  color={"var(--color-button-main)"}
                  fontWeight={"500"}
                  fontSize={"16px"}
                  cursor={"pointer"}
                  onClick={() => cancelOrderHandler(order.id)}
                >
                  Отменить
                </Text>
                <Button
                  size={"sm"}
                  onClick={() => completeOrderHandler(order.id)}
                >
                  Завершить
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
