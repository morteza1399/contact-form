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
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  rows: Number,
  cols: Number,
  name: String,
  label: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emits("update:modelValue", value);
};
</script>
