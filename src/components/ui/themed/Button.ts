import { ComponentStyleConfig } from "@chakra-ui/react";

export const ButtonStyles: ComponentStyleConfig = {
  baseStyle: {
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "4px",
    color: "white",
    padding: "10px",
  },
  sizes: {
    sm: {
      fontSize: "16px",
    },
  },
  variants: {
    solid: {
      bg: "var(--color-button-main)",
      color: "white",
      _hover: {
        bg: "var(--color-button-dark)",
        color: "white",
      },
      _active: {
        bg: "var(--color-button-darkest)",
        color: "white",
      },
    },
    outline: {
      fontWeight: "600",
      bg: "transparent",
      color: "var(--color-button-main)",
    },
    translate: {
      fontWeight: "600",
      bg: "transparent",
      border: "1px solid var(--color-border)",
      color: "white",
      _hover: {
        bg: "var(--color-button-main)",
        color: "white",
        path: {
          stroke: "white",
        },
      },
      _active: {
        bg: "var(--color-button-darkest)",
        color: "white",
        path: {
          stroke: "white",
        },
      },
    },
    border: {
      fontWeight: "400",
      bg: "transparent",
      border: "1px solid var(--color-button-main)",
      color: "var(--color-button-main)",
    },
  },
  defaultProps: {
    variant: "solid",
  },
};
