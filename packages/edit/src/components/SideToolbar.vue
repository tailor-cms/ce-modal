<template>
  <VTextField
    v-model="title"
    hide-details="auto"
    label="Button label"
    prepend-inner-icon="mdi-gesture-tap-button"
    variant="outlined"
    @update:focused="onFocusChange"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Element } from '@tailor-cms/ce-modal-manifest';

const props = defineProps<{ element: Element }>();
const emit = defineEmits<{ save: [data: Element['data']] }>();

const title = ref(props.element.data.title ?? '');

watch(
  () => props.element.data.title,
  (value) => {
    if ((value ?? '') === title.value) return;
    title.value = value ?? '';
  },
);

const onFocusChange = (focused: boolean) => {
  if (focused) return;
  emit('save', { ...props.element.data, title: title.value.trim() });
};
</script>
