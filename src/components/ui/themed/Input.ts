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
      field: {
        color: "var(--color-font-dark)",
        padding: "11.5px 8px",
        height: "40px",
        borderRadius: "4px",
        _placeholder: {
          color: "var(--color-font-placeholder)",
        },
        ":focus-visible": {
          borderColor: "var(--color-primary)",
          boxShadow: "none",
        },
      },
    },
  },
  defaultProps: {
    variant: "outline",
    size: "sm",
  },
};
