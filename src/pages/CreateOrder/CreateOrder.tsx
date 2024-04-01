import { Button, Divider, HStack, Stack, Text } from "@chakra-ui/react";

import { CreateOrderData } from "@/components/CreateOrder/CreateOrderData";
import { CreateOrderSchema } from "../../shared/schemas/createOrderSchema";
import { MainLayout } from "@/layouts/MainLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const CreateOrder = () => {
  const { register, setValue, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateOrderSchema),
    mode: "onChange",
  });

  const { errors } = formState;

  const submitHandler = (data: any) => {};

  return (
    <MainLayout>
      <Stack spacing={"40px"}>
        <Text className="title">Создание заказа</Text>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <CreateOrderData
            register={register}
            setValue={setValue}
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
