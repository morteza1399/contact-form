<template>
  <div>
    <Teleport v-if="message" :to="`#${to}`">
      <small class="ml-2 text-[#d73c3c] text-[12px]">{{ message }}</small>
    </Teleport>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
});
</script>