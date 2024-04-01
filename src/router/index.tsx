import { CreateOrder } from "@/pages/CreateOrder";
import { Orders } from "@/pages/Orders";
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Orders />,
  },
  {
    path: routes.create,
    element: <CreateOrder />,
  },
]);
