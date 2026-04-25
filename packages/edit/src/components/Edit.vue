<!-- eslint-disable vue/no-undef-components -->
<template>
  <VCard class="tce-modal my-2" color="grey-lighten-5">
    <VToolbar class="px-4" color="primary-darken-2" height="36">
      <VIcon
        :icon="manifest.ui.icon"
        color="secondary-lighten-2"
        size="18"
        start
      />
      <span class="text-title-small">{{ manifest.name }}</span>
    </VToolbar>
    <div class="pa-6 text-center">
      <VAlert
        v-if="!hasElements"
        color="primary-darken-1"
        icon="mdi-information-outline"
        variant="tonal"
        prominent
      >
        Click the button below to add content element.
      </VAlert>
      <TailorEmbeddedContainer
        :allowed-element-config="embedElementConfig"
        :container="element.data"
        :is-readonly="isReadonly"
        @delete="deleteEmbed($event)"
        @save="saveEmbed($event.embeds)"
      />
    </div>
  </VCard>
</template>

<script lang="ts" setup>
import { cloneDeep, isEmpty } from 'lodash-es';
import { computed, inject } from 'vue';
import manifest, { Element } from '@tailor-cms/ce-modal-manifest';

const emit = defineEmits<{
  save: [data: Element['data']];
}>();
const props = defineProps<{
  element: Element;
  embedElementConfig: any[];
  isDragged: boolean;
  isFocused: boolean;
  isReadonly: boolean;
}>();

const elementBus: any = inject('$elementBus');

const saveEmbed = (embeds: any) => {
  const data = cloneDeep(props.element.data);
  data.embeds = embeds;
  emit('save', data);
};

const deleteEmbed = (embed: { id: string }) => {
  const data = cloneDeep(props.element.data);
  delete data.embeds[embed.id];
  emit('save', data);
};

const hasElements = computed(() => !isEmpty(props.element.data.embeds));

elementBus.on('title', (title: string) => {
  emit('save', { ...props.element.data, title });
});
</script>

<style scoped>
.tce-modal {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
