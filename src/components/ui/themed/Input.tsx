import { ComponentStyleConfig } from "@chakra-ui/react";

export const InputStyles: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {
    sm: {
      fontSize: "14px",
    },
  },
  variants: {
    outline: {
      fontWeight: "400",
      color: "var(--color-font)",
      field: {
        padding: "11.5px 8px",
        height: "40px",
        borderRadius: "4px",
        _placeholder: {
          color: "var(--color-font-placeholder)",
        },
      },
    },
  },
  defaultProps: {
    variant: "outline",
    size: "sm",
  },
};
