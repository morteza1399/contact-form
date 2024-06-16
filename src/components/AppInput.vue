<template>
  <div :class="computedParentClass">
    <label :for="computedId" :class="computedLabelClass">
      {{ label }}
      <span v-show="isRequired && isNotRadioButton" class="text-[#0c7d69]">*</span>
    </label>
    <input
      autocomplete="off"
      :type="type"
      :name="name"
      :id="computedId"
      :class="isRadioButton ? computedRadioClass : computedInputClass"
      :value="isRequired ? (isRadioButton ? value : modelValue) : 'submit'"
      @input="updateValue($event.target.value)"
    />
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

const isRadioButton = computed(() => {
  return props.type === "radio";
});

const isNotRadioButton = computed(() => {
  return props.type !== "radio";
});

const checkboxOrRadio = computed(() => {
  return props.isCheckBox || isRadioButton.value;
});

const computedParentClass = computed(() => {
  return `flex ${
    checkboxOrRadio.value ? "items-center" : "flex-col"
  } grow mr-3 text-[#2b4246]`;
});

const computedLabelClass = computed(() => {
  return `text-sm ${
    checkboxOrRadio.value ? "order-last ml-3 " : "order-first"
  }`;
});

const computedInputClass = computed(() => {
  const baseClasses =
    "p-2 my-2 border border-[#87a3a6] rounded-lg resize-none focus:outline-none focus:border-[#0c7d69]";
  const submitClasses =
    props.type === "submit" ? "bg-[#0c7d69] text-white cursor-pointer" : "";
  const checkboxClasses = props.isCheckBox
    ? `appearance-none rounded-none cursor-pointer border ${
        props.modelValue
          ? 'border-[#0c7d69] bg-[url("./assets/images/icon-checkbox-check.svg")] bg-center bg-no-repeat'
          : "border-[#87a3a6] bg-white w-4 h-4 "
      }`
    : "";

  return `${baseClasses} ${submitClasses} ${checkboxClasses}`;
});

const computedRadioClass = computed(() => {
  return `appearance-none w-5 h-5 bg-white border border-[#87a3a6] rounded-full m-0 cursor-pointer ${
    props.modelValue === props.value
      ? 'bg-[url("./assets/images/icon-radio-selected.svg")] bg-center bg-no-repeat'
      : ""
  }`;
});

const computedId = computed(() => {
  return isNotRadioButton.value
    ? `Input-${props.label?.replace(/\s+/g, "-")}`
    : `${props.label}`;
});

const updateValue = value => {
  emits("update:modelValue", props.isCheckBox ? !props.modelValue : value);
};
</script>
