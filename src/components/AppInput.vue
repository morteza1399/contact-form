<template>
  <div :class="computedParentClass">
    <label :for="computedId" :class="computedLabelClass">
      {{ label }}
      <span v-show="isRequired && type !== 'radio'" class="text-[#0c7d69]">*</span>
    </label>
    <input
      autocomplete="off"
      :type="type"
      :name="name"
      :id="computedId"
      :class="computedInputClass"
      :value="isRequired ? (type === 'radio' ? value : modelValue) : 'submit'"
      @input="updateValue($event.target.value)"
    />
    <slot name="radio"></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: String,
  type: {
    type: String,
    required: true
  },
  isCheckBox: {
    type: Boolean,
    default: false
  },
  modelValue: [String, Boolean],
  value: [String, Boolean],
  name: String
});

const emits = defineEmits(["update:modelValue"]);

const isRequired = computed(() => {
  return props.type !== "submit";
});

const hasCheckBox = computed(() => {
  return props.type === "checkbox";
});

const computedParentClass = computed(() => {
  return `flex ${
    props.isCheckBox || props.type === "radio" ? "items-center" : "flex-col"
  } grow mr-3 text-[#2b4246]`;
});

const computedLabelClass = computed(() => {
  return `text-sm ${
    props.isCheckBox || props.type === "radio"
      ? "order-last ml-3 "
      : "order-first"
  }`;
});

const computedInputClass = computed(() => {
  const baseClasses =
    "p-2 my-2 border border-[#87a3a6] rounded-lg resize-none focus:outline-none focus:border-[#0c7d69]";
  const submitClasses =
    props.type === "submit" ? "bg-[#0c7d69] text-white cursor-pointer" : "";
  const checkboxClasses = hasCheckBox.value
    ? `appearance-none rounded-none cursor-pointer border ${
        props.modelValue
          ? 'border-[#0c7d69] bg-[url("./assets/images/icon-checkbox-check.svg")] bg-center bg-no-repeat'
          : "border-[#87a3a6] bg-white w-4 h-4 "
      }`
    : "";
  const radioClass =
    "mr-2 focus:outline-none appearance-none bg-white w-5 h-5 rounded-full border border-[#87a3a6] cursor-pointer hidden";
  if (props.type === "radio") {
    return `${radioClass}`;
  }

  return `${baseClasses} ${submitClasses} ${checkboxClasses}`;
});

const computedId = computed(() => {
  return props.type !== "radio"
    ? `Input-${props.label?.replace(/\s+/g, "-")}`
    : `${props.label}`;
});

const updateValue = value => {
  emits("update:modelValue", hasCheckBox.value ? !props.modelValue : value);
};
</script>
