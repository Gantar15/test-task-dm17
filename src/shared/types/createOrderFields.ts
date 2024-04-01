import * as yup from "yup";

import { CreateOrderSchema } from "../schemas/createOrderSchema";

export type CreateOrderFields = yup.InferType<typeof CreateOrderSchema>;
