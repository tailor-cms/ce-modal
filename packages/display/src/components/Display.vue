<template>
  <div class="tce-root text-center ma-4">
    <VDialog>
      <template #activator="{ props: activatorProps }">
        <VBtn v-bind="activatorProps">{{ data.title || 'Open Modal' }}</VBtn>
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
import { ElementData } from '@tailor-cms/ce-modal-manifest';
import sortBy from 'lodash/sortBy';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
defineEmits(['interaction']);

const embeds = computed(() => sortBy(props.data.embeds, 'position'));
</script>

<style scoped>
.tce-root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
