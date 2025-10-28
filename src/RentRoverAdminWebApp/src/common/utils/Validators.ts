export const requiredValidator = (value: string): string | null => {
  if (value.trim() === "") {
    return "This field is required.";
  }
  return null;
};

export const requiredValidatorForNumber = (
  value: number | null
): string | null => {
  if (value === null || isNaN(value)) {
    return "This field is required.";
  }
  return null;
};
