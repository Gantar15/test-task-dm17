import { FormErrorMessage, Grid, Text } from "@chakra-ui/react";

import { PropsWithChildren } from "react";

interface FieldBlockProps {
  title: string;
  error?: string;
}

export const FieldBlock = ({
  title,
  error,
  children,
}: PropsWithChildren<FieldBlockProps>) => {
  return (
    <Grid rowGap={"5px"}>
      <Text className="label">{title}</Text>
      {children}
      {error ? <FormErrorMessage mt={0}>{error}</FormErrorMessage> : null}
    </Grid>
  );
};
