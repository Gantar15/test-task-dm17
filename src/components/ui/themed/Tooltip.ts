import { ComponentStyleConfig } from "@chakra-ui/react";

export const TooltipStyles: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {
    sm: {
      fontSize: "12px",
    },
  },
  variants: {
    filled: {
      fontWeight: "400",
      padding: "8px",
      borderRadius: "4px",
    },
  },
  defaultProps: {
    size: "sm",
    variant: "filled",
  },
};
