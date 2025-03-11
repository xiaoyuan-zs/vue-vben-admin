<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';

import { Page } from '@vben/common-ui';

defineOptions({
  name: 'PhotoWall',
});

const imageRef = useTemplateRef<HTMLDivElement>('image');

const imageList = ref<string[]>([
  'https://fastly.picsum.photos/id/848/400/300.jpg?hmac=mG-uf7YDQEwO82Xj5fhefIh-w3guMMWczQuFe2pkPmg',
  'https://fastly.picsum.photos/id/730/400/300.jpg?hmac=VqQ5v1Equ7_Rse5_1LBMorKD5TDwLYqglXi6OYiM4iw',
  'https://fastly.picsum.photos/id/549/400/300.jpg?hmac=FNY52ReiLVnPOtIEEgcTC8iCCk39Iynw51HoLGTEoeA',
  'https://fastly.picsum.photos/id/55/400/300.jpg?hmac=6T8pgXR5llvY6WariKAHbWIelF2kWo8YLI3VQA1VKKs',
  'https://fastly.picsum.photos/id/807/400/300.jpg?hmac=NEYs7ynsTXAQfb-aBGs_w0qsZKLabhUdXOSZNNu-xe4',
  'https://fastly.picsum.photos/id/0/400/300.jpg?hmac=3GLjdyFCa4J9IRTNBFrRvKPVypLY3mEKGKNQjlBfEm8',
  'https://fastly.picsum.photos/id/935/400/300.jpg?hmac=LftEg2ViqqSFEov5aIdXpS9TO3sZcG_nlxO3J4U0Y7A',
  'https://fastly.picsum.photos/id/183/400/300.jpg?hmac=jNcG8FmErIoJmKIhs8Cg_ReK89nhNX03MbSnxVAjfU0',
  'https://fastly.picsum.photos/id/160/400/300.jpg?hmac=VxN2GZ31vusv0eqx8tAFK7_GhONbWhTg_O3gOzRVhr8',
  'https://fastly.picsum.photos/id/941/400/300.jpg?hmac=DkEhVmulG4vO6-JlT2fdfd_RkQ66O4FRMiiFg83EB2s',
]);

const allNodes = ref<HTMLElement[]>();

const doLayout = () => {};

onMounted(() => {
  nextTick(() => {
    allNodes.value = imageRef.value?.children! as unknown as HTMLElement[];
    doLayout();
  });
});
</script>

<template>
  <Page title="Photo Wall" description="照片墙">
    <div class="h-[400px] w-full">
      <div
        ref="image"
        class="relative flex h-full w-full items-center justify-center overflow-hidden"
      >
        <div v-for="(item, i) in imageList" :key="i" class="absolute">
          <img :src="item" alt="image" />
        </div>
      </div>
    </div>
  </Page>
</template>
