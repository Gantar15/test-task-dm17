import * as yup from "yup";

const phoneRegExp = /^7[0-9]{3}[0-9]{7}$/;
export const CreateOrderSchema = yup.object().shape({
  client: yup.string(),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Неправильный номер телефона")
    .required("Укажите номер телефона"),
  date: yup
    .string()
    .test(
      "is-date",
      "Неправильный формат даты",
      (value) => !!value && !isNaN(Date.parse(value))
    )
    .required("Укажите дату"),
  address: yup.string().required("Укажите адрес"),
  deliveryPrice: yup
    .string()
    .test(
      "is-number",
      "Стоимость доставки должна быть положительным числом",
      (value) => {
        if (!value) return true;
        const parsed = Number(value);
        return !isNaN(parsed) && parsed >= 0;
      }
    ),
  comment: yup.string(),
});
