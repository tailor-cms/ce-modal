<!-- eslint-disable vue/no-undef-components -->
<template>
  <div class="tce-modal-root text-center ma-4">
    <VDialog v-model="isOpen" max-width="600" scrollable>
      <template #activator="{ props: activatorProps }">
        <VBtn
          v-bind="activatorProps"
          :append-icon="viewed ? 'mdi-check' : undefined"
          :text="element.data.title || 'Open Modal'"
          :variant="viewed ? 'tonal' : 'flat'"
          color="primary-darken-1"
          rounded="md"
        />
      </template>
      <template #default="{ isActive }">
        <VCard>
          <VCardTitle class="d-flex justify-space-between align-center">
            {{ element.data.title || 'Modal Content' }}
            <VBtn
              icon="mdi-close"
              variant="text"
              @click="isActive.value = false"
            />
          </VCardTitle>
          <VDivider />
          <VCardText>
            <VAlert v-if="!embeds.length" type="info" variant="tonal">
              No content elements added to this item.
            </VAlert>
            <TailorEmbeddedContainer v-else :elements="embeds" />
          </VCardText>
        </VCard>
      </template>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Element } from '@tailor-cms/ce-modal-manifest';
import { sortBy } from 'lodash-es';

const props = defineProps<{ element: Element; userState: any }>();
const emit = defineEmits<{ interaction: [data: { openedAt: number }] }>();

const isOpen = ref(false);
const viewed = computed(() => Boolean(props.userState?.openedAt));
const embeds = computed(() => sortBy(props.element.data.embeds, 'position'));

watch(isOpen, (open) => {
  if (open) emit('interaction', { openedAt: Date.now() });
});
</script>

<style scoped>
.tce-modal-root {
}
</style>
