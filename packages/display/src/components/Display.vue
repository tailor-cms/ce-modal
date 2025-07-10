<template>
  <div class="tce-modal-root text-center ma-4">
    <VDialog max-width="600" scrollable>
      <template #activator="{ props: activatorProps }">
        <VBtn v-bind="activatorProps" color="primary-darken-1" rounded="md">
          {{ element.data.title || 'Open Modal' }}
        </VBtn>
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
import { computed } from 'vue';
import { Element } from '@tailor-cms/ce-modal-manifest';
import { sortBy } from 'lodash-es';

const props = defineProps<{ element: Element; userState: any }>();
defineEmits(['interaction']);

const embeds = computed(() => sortBy(props.element.data.embeds, 'position'));
</script>

<style scoped>
.tce-modal-root {
}
</style>
