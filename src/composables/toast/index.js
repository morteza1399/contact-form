import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function useToast() {
  const createToast = (toastTitle, toastOption) => {
    toast(toastTitle, toastOption);
  };

  return { createToast };
}
