import Select, { GroupBase, Props, StylesConfig } from "react-select";

import styles from "./Select.module.scss";

const modifyStyles = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  isInvalid: boolean,
  externalStyles?: StylesConfig<Option, IsMulti, Group>
): StylesConfig<Option, IsMulti, Group> => ({
  control: (base, state) => ({
    ...base,
    minWidth: "200px",
    ":hover": {
      ...base[":hover"],
      borderColor: isInvalid
        ? "var(--color-error)"
        : state.isFocused
        ? "var(--color-primary)"
        : "var(--color-border)",
    },
    borderRadius: "4px",
    borderColor: isInvalid
      ? "var(--color-error)"
      : state.isFocused
      ? "var(--color-primary)"
      : "var(--color-border)",
    boxShadow: "none",
    fontSize: "14px",
    fontWeight: "400",
    padding: "1px 0",
  }),
  input: (base, state) => ({
    ...base,
    color: "var(--color-font-dark)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "var(--color-primary)" : "transparent",
    ":hover": {
      backgroundColor: state.isSelected
        ? "var(--color-primary)"
        : "var(--color-primary-light)",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-font-placeholder)",
  }),
  ...externalStyles,
});

export function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  isInvalid = false,
  components,
  ...props
}: Props<Option, IsMulti, Group> & { isInvalid?: boolean }) {
  return (
    <Select
      {...props}
      styles={{ ...modifyStyles(isInvalid, props.styles) }}
      classNames={{
        input: (base) => styles["select__input"],
      }}
      components={{
        ...components,
        IndicatorSeparator: null,
      }}
    />
  );
}
