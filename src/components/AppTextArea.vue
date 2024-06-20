<template>
  <div class="flex flex-col mx-2 grow">
    <label :for="`Textarea-${label}`" class="text-sm">
      {{ label }}
      <span class="text-[#0c7d69]">*</span>
    </label>
    <textarea
      :name="name"
      :id="`Textarea-${label}`"
      :rows="rows"
      :cols="cols"
      :class="computedTextAreaClasses"
      :value="modelValue"
      @input="updateValue($event.target.value)"
    ></textarea>
    <small v-if="computedError" class="text-[#d73c3c] text[12px]">{{
      computedError
    }}</small>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useValidate } from "../composables/validate";

const props = defineProps({
  modelValue: String,
  rows: Number,
  cols: Number,
  name: String,
  label: {
    type: String,
    required: true,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  externalError: String,
});

const { error, validateInput } = useValidate();

const computedTextAreaClasses = computed(() => {
  return `p-3 my-2 border rounded-lg resize-none focus:outline-none focus:border-[#0c7d69] hover:border-[#0c7d69] ${
    computedError.value
      ? "border-[#d73c3c] focus:border-[#d73c3c] hover:border-[#d73c3c]"
      : "border-[#87a3a6]"
  }`;
});

const computedError = computed(() => {
  return props.externalError || error.value;
});

const emits = defineEmits(["update:modelValue", "update:externalError"]);

const updateValue = (value) => {
  emits("update:modelValue", value);
  validateInput(props.rules, value);
};

watch(
  () => props.modelValue,
  (newVal) => {
    validateInput(props.rules, newVal);
    emits("update:externalError", error.value);
  }
);
</script>
