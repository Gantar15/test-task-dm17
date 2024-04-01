import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";

import { CreateOrderData } from "@/components/CreateOrder/CreateOrderData";
import { CreateOrderProducts } from "@/components/CreateOrder/CreateOrderProducts";
import { CreateOrderSchema } from "../../shared/schemas/createOrderSchema";
import { MainLayout } from "@/layouts/MainLayout";
import { addOrder } from "@/store/features/orders/orderSlice";
import { routes } from "@/shared/router/routes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

export const CreateOrder = () => {
  const orders = useAppSelector((state) => state.orders.orders);
  const orderId = orders.length + 1;
  const orderProducts = useAppSelector((state) =>
    state.products.products.filter((product) => product.orderId === orderId)
  );
  const [isSmallerThan1200] = useMediaQuery("(max-width: 1200px)");
  const navigate = useNavigate();
  const { register, setValue, watch, handleSubmit, formState, trigger } =
    useForm({
      resolver: yupResolver(CreateOrderSchema),
      mode: "onChange",
    });
  const dispatch = useAppDispatch();

  const { errors } = formState;

  const cancelHandler = () => {
    navigate(routes.home);
  };

  const submitHandler = (data: any) => {
    const productsPrice = orderProducts.reduce(
      (acc, product) => acc + product.price,
      0
    );
    const productsCount = orderProducts.reduce(
      (acc, product) => acc + +product.quantity,
      0
    );

    dispatch(
      addOrder({
        ...data,
        id: orderId,
        status: "Created",
        productsPrice: productsPrice,
        totalPrice: productsPrice + +data.deliveryPrice,
        quantity: productsCount,
      })
    );
    navigate(routes.home);
  };

  return (
    <MainLayout>
      <Stack spacing={"40px"}>
        <Text className="title">Создание заказа</Text>
        <Flex
          flexDirection={isSmallerThan1200 ? "column" : "row"}
          rowGap={isSmallerThan1200 ? "60px" : "0px"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <Flex flexGrow={1}>
            <CreateOrderData
              register={register}
              setValue={setValue}
              watch={watch}
              trigger={trigger}
              errors={errors}
            />
          </Flex>
          {isSmallerThan1200 ? null : (
            <Box
              border={"1px solid #CBD5E0"}
              height={"max-content"}
              mx={"40px"}
            />
          )}
          <Stack flexGrow={1} spacing={"40px"}>
            <CreateOrderProducts
              orderId={orderId}
              deliveryPrice={+watch("deliveryPrice") || 0}
            />
            <HStack justifyContent={"flex-end"} spacing={"16px"}>
              <Text
                size={"sm"}
                color={"var(--color-button-main)"}
                fontWeight={"500"}
                fontSize={"16px"}
                cursor={"pointer"}
                onClick={cancelHandler}
              >
                Отменить
              </Text>
              <Button
                size={"sm"}
                px={"37px"}
                height={"42px"}
                onClick={handleSubmit(submitHandler)}
              >
                Создать
              </Button>
            </HStack>
          </Stack>
        </Flex>
      </Stack>
    </MainLayout>
  );
};
