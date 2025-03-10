<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';

import { Page } from '@vben/common-ui';

defineOptions({
  name: '3DGradientCarouselImage',
});

const imageRef = useTemplateRef<HTMLDivElement>('imageRef');
onMounted(() => {
  console.log(imageRef.value?.childNodes);
});
</script>

<template>
  <Page title="3D Gradient Carousel Image" description="3D 渐变轮播图">
    <div class="relative h-[300px] w-full bg-slate-500">
      <div ref="imageRef"></div>
    </div>
  </Page>
</template>
