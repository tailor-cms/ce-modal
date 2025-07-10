<template>
  <div class="tce-root text-center ma-4">
    <VDialog scrollable>
      <template #activator="{ props: activatorProps }">
        <VBtn v-bind="activatorProps">
          {{ element.data.title || 'Open Modal' }}
        </VBtn>
      </template>
      <template #default="{ isActive }">
        <VCard>
          <VCardActions>
            <VBtn icon="mdi-close" @click="isActive.value = false" />
          </VCardActions>
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
.tce-root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
