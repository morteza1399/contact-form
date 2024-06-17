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
      class="p-3 my-2 border border-[#87a3a6] rounded-lg resize-none focus:outline-none focus:border-[#0c7d69] hover:border-[#0c7d69]"
      :value="modelValue"
      @input="updateValue($event.target.value)"
    ></textarea>
    <small v-if="error" class="text-[#d73c3c]">{{ error }}</small>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useValidate } from "../composables/validate";

const { error, validateInput } = useValidate();

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
});

const emits = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emits("update:modelValue", value);
  validateInput(props.rules, props.modelValue);
};

watch(
  () => props.modelValue,
  () => validateInput(props.rules, props.modelValue)
);
</script>
