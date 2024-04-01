import * as yup from "yup";

const isNumber = (value: unknown) => {
  if (!value) return true;
  const parsed = Number(value);
  return !isNaN(parsed) && parsed >= 0;
};

export const CreateProductSchema = yup.object().shape({
  title: yup.string().required("Укажите название товара"),
  article: yup.string().required("Укажите артикул товара"),
  quantity: yup
    .string()
    .test("is-number", "Количество должно быть положительным числом", isNumber)
    .required("Укажите количество товаров"),
  price: yup
    .string()
    .test("is-number", "Цена должна быть положительным числом", isNumber)
    .required("Укажите цену"),
  comment: yup.string(),
});
