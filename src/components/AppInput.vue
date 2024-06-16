<template>
  <div :class="computedParentClass">
    <label :for="computedId" :class="computedLabelClass">
      {{ label }}
      <span v-show="isRequired && type !== 'radio'" class="text-[#0c7d69]">*</span>
    </label>
    <slot v-if="isCheckBox" name="checkbox"></slot>
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

    <!-- <textarea
      v-if="isTextArea"
      :name="name"
      :id="computedId"
      :rows="rows"
      :cols="cols"
      :class="computedInputClass"
      :value="modelValue"
      @input="updateValue($event.target.value)"
    ></textarea>-->
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
  isTextArea: {
    type: Boolean,
    default: false
  },
  rows: Number,
  cols: Number,
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
    "p-3 my-2 border border-[#87a3a6] rounded-lg resize-none focus:outline-none focus:border-[#0c7d69]";
  const submitClasses =
    props.type === "submit" ? "bg-[#0c7d69] text-white cursor-pointer" : "";
  const checkboxClasses = hasCheckBox.value ? "hidden" : "";
  const radioClass =
    "mr-2 focus:outline-none appearance-none bg-white w-5 h-5 rounded-full border border-[#87a3a6] cursor-pointer hidden";
  if (props.type === "radio") {
    return `${radioClass}`;
  }

  return `${baseClasses} ${submitClasses} ${checkboxClasses}`;
});

const computedId = computed(() => {
  return props.type === "textarea"
    ? `Textarea-${props.label}`
    : props.type !== "radio"
    ? `Input-${props.label?.replace(/\s+/g, "-")}`
    : `${props.label}`;
});

const updateValue = value => {
  emits("update:modelValue", hasCheckBox.value ? !props.modelValue : value);
};
</script>
