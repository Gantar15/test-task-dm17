import "@fontsource/inter";
import "@fontsource/inter/500.css";

import { ButtonStyles } from "@/components/ui/themed/Button";
import { InputStyles } from "@/components/ui/themed/Input";
import { TooltipStyles } from "@/components/ui/themed/Tooltip";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    Button: ButtonStyles,
    Input: InputStyles,
    Tooltip: TooltipStyles,
  },
});

export default theme;
