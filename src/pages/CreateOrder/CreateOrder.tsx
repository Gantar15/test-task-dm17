import { Button, Divider, HStack, Stack, Text } from "@chakra-ui/react";

import { CreateOrderData } from "@/components/CreateOrder/CreateOrderData";
import { CreateOrderSchema } from "../../shared/schemas/createOrderSchema";
import { MainLayout } from "@/layouts/MainLayout";
import { routes } from "@/shared/router/routes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

export const CreateOrder = () => {
  const navigate = useNavigate();
  const { register, setValue, watch, handleSubmit, formState, trigger } =
    useForm({
      resolver: yupResolver(CreateOrderSchema),
      mode: "onChange",
    });

  const { errors } = formState;

  const cancelHandler = () => {
    navigate(routes.home);
  };

  const submitHandler = (data: any) => {
    navigate(routes.home);
  };

  return (
    <MainLayout>
      <Stack spacing={"40px"}>
        <Text className="title">Создание заказа</Text>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <CreateOrderData
            register={register}
            setValue={setValue}
            watch={watch}
            trigger={trigger}
            errors={errors}
          />
          <Divider orientation="vertical" />
          <Stack>
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
              <Button size={"sm"} onClick={handleSubmit(submitHandler)}>
                Создать
              </Button>
            </HStack>
          </Stack>
        </HStack>
      </Stack>
    </MainLayout>
  );
};
