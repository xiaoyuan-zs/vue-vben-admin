<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';

import { Page } from '@vben/common-ui';

defineOptions({
  name: '3DGradientCarouselImage',
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

// const initImages = async () => {
//   const imageUrls = Array.from<string>({ length: 10 })
//     .fill('https://picsum.photos/400/300')
//     .map((url) => {
//       return fetch(url);
//     });

//   const images = await Promise.all(imageUrls);
//   imageList.value = images.map((image) => image.url);
//   console.log(toRaw(imageList.value));
// };

const currIndex = ref(3);
const allNodes = ref<HTMLElement[]>();

const doLayout = () => {
  const count = allNodes.value?.length || 0;
  const xoffsetStep = 100;
  const opacityStep = 0.8;
  const scaleStep = 0.7;
  [...(allNodes.value || [])].forEach((node, i) => {
    const sign = Math.sign(i - currIndex.value);
    const absIndex = Math.abs(i - currIndex.value);

    // 每一张图片的位移量
    let xoffset = xoffsetStep * (i - currIndex.value);
    if (i !== currIndex.value) {
      xoffset += 100 * sign;
    }
    // 每一张图片的缩放量
    const scale = scaleStep ** absIndex;
    // 每一张图片的旋转角度
    const rotateY = i === currIndex.value ? 0 : 45 * -sign;
    // transfrom
    node.style.transform = `translateX(${xoffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
    // opacity
    // 距离当前节点的距离越远，opacity 越低, 超过 2 张图片时，opacity 变为 0
    node.style.opacity = absIndex > 2 ? '0' : `${opacityStep ** absIndex}`;
    // z-index
    // 使用数组的数量 - 绝对值(当前索引 - 当前节点索引) 作为 z-index 的值
    // 当前节点索引越大，z-index 越小，这样可以使得当前节点在所有节点中处于最前面
    node.style.zIndex = `${count - Math.abs(currIndex.value - i)}`;
  });
};

const changeLayout = (index: number) => {
  currIndex.value = index;
  doLayout();
};

onMounted(() => {
  nextTick(() => {
    allNodes.value = imageRef.value?.children! as unknown as HTMLElement[];
    doLayout();
  });
});
</script>

<template>
  <Page title="3D Gradient Carousel Image" description="3D 渐变轮播图">
    <div class="h-[400px] w-full">
      <div
        ref="image"
        class="perspective-1000 relative flex h-full w-full items-center justify-center"
      >
        <div
          v-for="(item, i) in imageList"
          :key="i"
          class="transform-3d absolute cursor-pointer transition-all duration-500"
          @click="changeLayout(i)"
        >
          <img :src="item" alt="image" />
        </div>
      </div>
    </div>
  </Page>
</template>

<style lang="scss" scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-3d {
  transform-style: preserve-3d;
}
</style>
