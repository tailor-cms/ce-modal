<template>
  <VForm ref="form" validate-on="submit">
    <VTextField
      v-model="title"
      :rules="[(v: string) => !!v?.trim() || 'Button label is required']"
      class="required"
      hide-details="auto"
      label="Button label"
      prepend-inner-icon="mdi-gesture-tap-button"
      variant="outlined"
    />
  </VForm>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from 'lodash-es';
import type { Element } from '@tailor-cms/ce-modal-manifest';

const props = defineProps<{ element: Element }>();
const emit = defineEmits<{ save: [data: Element['data']] }>();

const form = ref();
const title = ref(props.element.data.title ?? '');

watch(
  () => props.element.data.title,
  (value) => {
    if ((value ?? '') === title.value) return;
    title.value = value ?? '';
  },
);

watch(
  title,
  debounce(async () => {
    if (!form.value) return;
    const { valid } = await form.value.validate();
    if (!valid) return;
    emit('save', { ...props.element.data, title: title.value.trim() });
  }, 500),
);
</script>
