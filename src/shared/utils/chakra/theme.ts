import "@fontsource/inter";
import "@fontsource/inter/500.css";

import { ButtonStyles } from "@/components/ui/themed/Button";
import { InputStyles } from "@/components/ui/themed/Input";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    Button: ButtonStyles,
    Input: InputStyles,
  },
});

export default theme;
