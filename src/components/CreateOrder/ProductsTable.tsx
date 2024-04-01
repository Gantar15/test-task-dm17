import {
  Button,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";

import { CreateProductFields } from "@/shared/types/createProductFields";
import { CreateProductSchema } from "@/shared/schemas/createProductSchema";
import { addProduct } from "@/store/features/products/productSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface ProductsTableProps {
  orderId: number;
  deliveryPrice: number;
}

export const ProductsTable = ({
  orderId,
  deliveryPrice,
}: ProductsTableProps) => {
  const { register, handleSubmit, formState, reset, watch, setValue } = useForm(
    {
      resolver: yupResolver(CreateProductSchema),
      mode: "onChange",
    }
  );
  const orderProducts = useAppSelector((state) =>
    state.products.products.filter((product) => product.orderId === orderId)
  );
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  const { errors } = formState;
  const totalPrice = orderProducts.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const articleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    setValue("article", value);
  };

  const submitProductHandler = (data: CreateProductFields) => {
    dispatch(
      addProduct({
        id: products.length + 1,
        title: data.title,
        article: data.article,
        quantity: +data.quantity,
        price: +data.price,
        comment: data.comment,
        orderId: orderId,
      })
    );
    reset({});
  };

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>№</Th>
            <Th>Название</Th>
            <Th>Артикул</Th>
            <Th>Количество</Th>
            <Th>Цена (RUB)</Th>
            <Th>Комментарий</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderProducts.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.title}</Td>
              <Td>{product.article}</Td>
              <Td>{product.quantity}</Td>
              <Td>{product.price}</Td>
              <Td>{product.comment}</Td>
              <Td></Td>
            </Tr>
          ))}
          <Tr>
            <Td>{products.length + 1}</Td>
            <Td>
              <Input {...register("title")} isInvalid={!!errors.title} />
            </Td>
            <Td>
              <Input
                {...register("article")}
                isInvalid={!!errors.article}
                value={watch("article")}
                onChange={articleChangeHandler}
              />
            </Td>
            <Td>
              <Input {...register("quantity")} isInvalid={!!errors.quantity} />
            </Td>
            <Td>
              <Input {...register("price")} isInvalid={!!errors.price} />
            </Td>
            <Td>
              <Input {...register("comment")} isInvalid={!!errors.comment} />
            </Td>
            <Td>
              <Button size={"sm"} onClick={handleSubmit(submitProductHandler)}>
                Добавить
              </Button>
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={4} p={0} isNumeric>
              <Stack spacing={"12px"}>
                <Text textAlign={"left"}>Сумма</Text>
                <Text textAlign={"left"}>Сумма с доставкой</Text>
              </Stack>
            </Th>
            <Th colSpan={2} isNumeric>
              <Stack spacing={"12px"}>
                <Text textAlign={"left"} fontWeight={"600"}>
                  {totalPrice}
                </Text>
                <Text textAlign={"left"} fontWeight={"600"}>
                  {totalPrice + deliveryPrice}
                </Text>
              </Stack>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
