import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const CreateOrderSchema = yup.object().shape({
  client: yup.string().required(),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Неправильный номер телефона")
    .required(),
  date: yup.date().required(),
  address: yup.string().required(),
  deliveryPrice: yup.number().required(),
  comment: yup.string(),
});
