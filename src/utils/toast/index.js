import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function createToast(toastTitle, toastOption) {
  toast(toastTitle, toastOption);
}
