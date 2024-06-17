<template>
  <div :class="computedParentClass">
    <label :for="computedId" :class="computedLabelClass">
      {{ label }}
      <span v-show="isRequired && isNotRadioButton" class="text-[#0c7d69]"
        >*</span
      >
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
    <div>
      <small
        v-show="error && !props.isCheckBox"
        class="text-[#d73c3c] text-[12px]"
        >{{ error }}</small
      >
    </div>
  </div>
  <div v-show="error && props.isCheckBox" class="ml-2 text-[#d73c3c] text-base">
    <small>{{ error }}</small>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useValidate } from "../composables/validate";

const { error, validateInput } = useValidate();

const props = defineProps({
  label: String,
  type: {
    type: String,
    required: true,
  },
  isCheckBox: {
    type: Boolean,
    default: false,
  },
  modelValue: [String, Boolean],
  value: [String, Boolean],
  name: String,
  rules: {
    type: Array,
    default: () => [],
  },
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
  } grow mx-2`;
});

const computedLabelClass = computed(() => {
  return `text-sm ${
    checkboxOrRadio.value ? "order-last ml-3 hover:text-black" : "order-first"
  }`;
});

const BASE_CLASSES =
  "p-2 my-2 border rounded resize-none focus:outline-none focus:border-[#0c7d69] hover:border-[#0c7d69]";
const SUBMIT_CLASSES =
  "bg-[#0c7d69] border-none text-white cursor-pointer hover:bg-[#2b4246]";
const CHECKBOX_UNCHECKED_CLASSES = "border-[#87a3a6] bg-white w-4 h-4";
const CHECKBOX_CHECKED_CLASSES =
  'border-[#0c7d69] bg-[url("./assets/images/icon-checkbox-check.svg")] bg-center bg-no-repeat';

const ERROR_CLASSES =
  "border-[#d73c3c] focus:border-[#d73c3c] hover:border-[#d73c3c]";

const computedInputClass = computed(() => {
  let classes = BASE_CLASSES;

  if (props.type === "submit") {
    classes += ` ${SUBMIT_CLASSES}`;
  }

  if (props.isCheckBox) {
    classes += ` appearance-none rounded-none cursor-pointer border ${
      props.modelValue ? CHECKBOX_CHECKED_CLASSES : CHECKBOX_UNCHECKED_CLASSES
    }`;
  }

  if (error.value && !props.isCheckBox) {
    classes += ` ${ERROR_CLASSES}`;
  } else {
    classes += " border-[#87a3a6]";
  }

  return classes;
});

const BASE_RADIO_CLASSES =
  "appearance-none w-5 h-5 bg-white border border-[#87a3a6] rounded-full m-0 cursor-pointer";
const SELECTED_RADIO_CLASSES =
  'bg-[url("./assets/images/icon-radio-selected.svg")] bg-center bg-no-repeat';

const computedRadioClass = computed(() => {
  const isSelected = props.modelValue === props.value;
  return `${BASE_RADIO_CLASSES} ${isSelected ? SELECTED_RADIO_CLASSES : ""}`;
});

const computedId = computed(() => {
  return isNotRadioButton.value
    ? `Input-${props.label?.replace(/\s+/g, "-")}`
    : `${props.label}`;
});

const updateValue = (value) => {
  emits("update:modelValue", props.isCheckBox ? !props.modelValue : value);
  validateInput(props.rules, props.modelValue);
};

watch(
  () => props.modelValue,
  () => validateInput(props.rules, props.modelValue)
);
</script>
