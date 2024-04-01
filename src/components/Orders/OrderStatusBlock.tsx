import { Box } from "@chakra-ui/react";
import { OrderStatus } from "@/shared/models/order";

const colors = {
  Created: ["var(--color-primary)", "var(--color-primary-light)"],
  Completed: ["var(--color-success)", "var(--color-success-light)"],
  Cancelled: ["var(--color-error)", "var(--color-error-light)"],
};

export const OrderStatusBlock = ({ status }: { status: OrderStatus }) => {
  const renderStatus = () => {
    switch (status) {
      case "Created":
        return "Создан";
      case "Completed":
        return "Выполнен";
      case "Cancelled":
        return "Отменен";
    }
  };

  return (
    <Box
      px={"10px"}
      py={"4px"}
      borderRadius={"4px"}
      bg={colors[status][1]}
      border={`1px solid ${colors[status][0]}`}
      color={colors[status][0]}
    >
      {renderStatus()}
    </Box>
  );
};
