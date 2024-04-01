import * as yup from "yup";

import { CreateProductSchema } from "../schemas/createProductSchema";

export type CreateProductFields = yup.InferType<typeof CreateProductSchema>;
