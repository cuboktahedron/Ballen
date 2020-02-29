type NumberValidatorOptionProps = {
  required?: boolean;
  min?: number;
  max?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateNumber = (value: any, option: NumberValidatorOptionProps): boolean => {
  value = value || "";

  if (option.required && value.trim() === "") {
    return false;
  }

  if (!value.match(/^[0-9]+$/)) {
    return false;
  }

  const numValue = value as number;
  if (option.min !== undefined && numValue < option.min) {
    return false;
  }

  if (option.max !== undefined && numValue > option.max) {
    return false;
  }

  return true;
};
