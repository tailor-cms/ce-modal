<template>
  <VForm ref="form" validate-on="submit">
    <VToolbarItems class="ga-2">
      <VTextField
        v-model="title"
        class="required ml-2"
        hide-details="auto"
        label="Button label"
        min-width="200"
        prepend-inner-icon="mdi-gesture-tap-button"
        variant="outlined"
      />
    </VToolbarItems>
  </VForm>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import debounce from 'lodash/debounce';
import type { Element } from '@tailor-cms/ce-modal-manifest';

const props = defineProps<{ element: Element }>();

const elementBus: any = inject('$elementBus');

const form = ref<HTMLFormElement>();
const title = ref(props.element.data.title);

watch(
  title,
  debounce(async () => {
    if (!form.value) return;
    const { valid } = await form.value.validate();
    if (valid) return elementBus.emit('title', title.value);
  }, 500),
);
</script>
