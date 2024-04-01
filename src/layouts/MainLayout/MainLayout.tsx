import { Box } from "@chakra-ui/react";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <Box p={10}>{children}</Box>;
};
