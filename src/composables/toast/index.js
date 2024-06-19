import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function useToast() {
  const createToast = (message, options) => {
    toast(message, options);
  };

  return { createToast };
}
