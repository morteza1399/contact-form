<template>
  <div :class="computedParentClass">
    <label :for="computedId" :class="computedLabelClass"
      >{{ label }}
      <span v-show="isRequired" class="text-[#0c7d69]">*</span></label
    >
    <div v-if="type === 'checkbox'" class="cursor-pointer" @click="updateValue">
      <img
        v-if="modelValue"
        src="../assets/images/icon-checkbox-check.svg"
        alt="checked"
      />
      <span v-else class="flex w-4 h-4 border border-[#87a3a6] bg-white"></span>
    </div>
    <textarea
      v-if="isTextArea"
      :name="label"
      :id="computedId"
      :rows="rows"
      :cols="cols"
      :class="computedInputClass"
      :value="modelValue"
      @input="updateValue($event.target.value)"
    ></textarea>
    <input
      v-else
      autocomplete="off"
      :type="type"
      :name="label"
      :id="computedId"
      :checked="modelValue"
      :class="computedInputClass"
      :value="isRequired ? modelValue : 'submit'"
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
    required: true,
  },
  isCheckBox: {
    type: Boolean,
    default: false,
  },
  isTextArea: {
    type: Boolean,
    default: false,
  },
  rows: Number,
  cols: Number,
  modelValue: [String, Boolean],
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
    props.isCheckBox ? "items-center" : "flex-col"
  } grow mr-3 text-[#2b4246]`;
});

const computedLabelClass = computed(() => {
  return `text-sm ${props.isCheckBox ? "order-last ml-3 " : "order-first"}`;
});

const computedInputClass = computed(() => {
  const baseClasses =
    "p-3 my-2 border border-[#87a3a6] rounded-lg resize-none focus:outline-none focus:border-[#0c7d69]";
  const submitClasses =
    props.type === "submit" ? "bg-[#0c7d69] text-white" : "";
  const checkboxClasses = hasCheckBox.value ? "hidden" : "";

  return `${baseClasses} ${submitClasses} ${checkboxClasses}`;
});

const computedId = computed(() => {
  return props.type === "textarea"
    ? `Textarea-${props.label}`
    : `Input-${props.label?.replace(/\s+/g, "-")}`;
});

const updateValue = (value) => {
  emits("update:modelValue", hasCheckBox.value ? !props.modelValue : value);
};
</script>
