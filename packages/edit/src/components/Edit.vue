<!-- eslint-disable vue/no-undef-components -->
<template>
  <div class="tce-modal">
    <VAlert
      v-if="!hasElements"
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
      class="text-center"
      @delete="deleteEmbed($event)"
      @save="saveEmbed($event.embeds)"
    />
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep, isEmpty } from 'lodash-es';
import { computed, inject } from 'vue';
import { Element } from '@tailor-cms/ce-modal-manifest';

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
  text-align: left;
}
</style>
