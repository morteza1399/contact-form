import { ref } from "vue";

export function useValidate() {
  const error = ref(null);

  const validateInput = (rules, value) => {
    for (const rule of rules) {
      const validationError = rule(value);
      if (validationError) {
        error.value = validationError;
        return false;
      }
    }
    error.value = null;
    return true;
  };

  const required = (value) => {
    return value ? null : "This field is required";
  };

  const queryType = (value) => {
    return value ? null : "Please select a query type";
  };

  const email = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value)
      ? null
      : "Please enter a valid email address";
  };

  const checked = (value) => {
    return value
      ? null
      : "To submit this form, please consent to being contacted";
  };

  return { error, validateInput, required, queryType, email, checked };
}
