import Select, { GroupBase, Props, StylesConfig } from "react-select";

const modifyStyles = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  externalStyles?: StylesConfig<Option, IsMulti, Group>
): StylesConfig<Option, IsMulti, Group> => ({
  ...externalStyles,
  control: (base, state) => ({
    ...base,
    ":hover": {
      ...base[":hover"],
      borderColor: state.isFocused
        ? "var(--color-primary)"
        : "var(--color-border)",
    },
    borderRadius: "4px",
    borderColor: state.isFocused
      ? "var(--color-primary)"
      : "var(--color-border)",
    boxShadow: "none",
    fontSize: "14px",
    fontWeight: "400",
    padding: "1px 0",
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
});

export function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({ components, ...props }: Props<Option, IsMulti, Group>) {
  return (
    <Select
      {...props}
      styles={{ ...modifyStyles(props.styles) }}
      components={{
        ...components,
        IndicatorSeparator: null,
      }}
    />
  );
}
