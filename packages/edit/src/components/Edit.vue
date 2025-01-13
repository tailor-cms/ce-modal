<template>
  <VCard class="tce-modal my-2" color="grey-lighten-5">
    <VToolbar class="px-4" color="primary-darken-3" height="36">
      <VIcon
        :icon="manifest.ui.icon"
        color="secondary-lighten-2"
        size="18"
        start
      />
      <span class="text-subtitle-2">{{ manifest.name }}</span>
    </VToolbar>
    <div class="pa-6 text-center">
      <VAlert
        v-if="!hasElements"
        color="primary-darken-2"
        icon="mdi-information-variant"
        variant="tonal"
        prominent
      >
        Click the button below to add content element.
      </VAlert>
      <TailorEmbeddedContainer
        :allowed-element-config="embedElementConfig"
        :container="element.data"
        :is-disabled="isDisabled"
        @delete="deleteEmbed($event)"
        @save="saveEmbed($event.embeds)"
      />
    </div>
  </VCard>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, inject, reactive } from 'vue';
import manifest, { Element, ElementData } from '@tailor-cms/ce-modal-manifest';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

const emit = defineEmits(['save']);
const props = defineProps<{
  element: Element;
  embedElementConfig: any[];
  isFocused: boolean;
  isDisabled: boolean;
}>();

const elementBus: any = inject('$elementBus');

const elementData = reactive<ElementData>(cloneDeep(props.element.data));

const saveEmbed = (embeds: any) => {
  elementData.embeds = embeds;
  emit('save', elementData);
};

const deleteEmbed = (embed: { id: string }) => {
  delete elementData.embeds[embed.id];
  emit('save', elementData);
};

const hasElements = computed(() => !isEmpty(props.element.data.embeds));

elementBus.on('title', (title: string) => {
  elementData.title = title;
  emit('save', elementData);
});
</script>

<style scoped>
.tce-modal {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
