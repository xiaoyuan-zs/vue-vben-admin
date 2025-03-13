<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

defineOptions({
  name: 'PhotoWall',
});

const imageOptions = ref<string[]>([
  'https://fastly.picsum.photos/id/388/200/100.jpg?hmac=5RHpMgnEUYRuK1ZUCsT9ArYzmCbFxPzKoeu7zp1CDeQ',
  'https://fastly.picsum.photos/id/853/200/100.jpg?hmac=PucPwjq5nPCH9HZWl5m9RBBxpRpiA0jiQJwMeBvCrfc',
  'https://fastly.picsum.photos/id/672/200/100.jpg?hmac=YKAuwDxxkyqv5-8weod9HdKgkM20T6gbCqmW4K0RWZk',
  'https://fastly.picsum.photos/id/687/200/100.jpg?hmac=myH-TJRqOqAZNKsxgn7nACDutcsdQdtCB9f3S1r0rFQ',
  'https://fastly.picsum.photos/id/313/200/100.jpg?hmac=kTCNKJGtRi-E_-0Z76_oaj3re_RhTmP_NNXoGpBjLPM',
  'https://fastly.picsum.photos/id/129/200/100.jpg?hmac=4hd_Uxj2sYiBU5NUG7xcMLqw8G1mWHe4D1uydLAZNY8',
  'https://fastly.picsum.photos/id/282/200/100.jpg?hmac=bREvKNm3U8MnzG7FkoAr7ZzLuH5XxiSz5tNa5eyTgAI',
  'https://fastly.picsum.photos/id/180/200/100.jpg?hmac=HP1yIeNSs1RqZ_5G12-z1nvnmk3erzdNF11vMD3HIPA',
  'https://fastly.picsum.photos/id/692/200/100.jpg?hmac=dbhoa6O-ULd_2ErCaKOZaIEjpost3YB39ls98qfU2Eg',
  'https://fastly.picsum.photos/id/687/200/100.jpg?hmac=myH-TJRqOqAZNKsxgn7nACDutcsdQdtCB9f3S1r0rFQ',
]);

onMounted(() => {});
</script>

<template>
  <Page title="Photo Wall" description="照片墙">
    <Card class="mb-5" title="旋转照片墙">
      <div class="perspective-2000 flex h-[300px] w-full justify-center">
        <div
          class="rotate-animation rotate-transform-3d relative mt-20 h-[100px] w-[200px]"
        >
          <div
            v-for="(item, i) in imageOptions"
            :key="i"
            class="rotate-photo-item absolute"
          >
            <img :src="item" alt="image" />
          </div>
        </div>
      </div>
    </Card>
    <Card class="mb-5" title="围绕照片墙">
      <div class="perspective-2000 flex h-[300px] w-full justify-center">
        <div
          class="around-animation around-transform-3d relative mt-20 h-[100px] w-[200px]"
        >
          <div
            v-for="(item, i) in imageOptions"
            :key="i"
            class="around-photo-item absolute"
          >
            <img :src="item" alt="image" />
          </div>
        </div>
      </div>
    </Card>
  </Page>
</template>

<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}

.perspective-2000 {
  perspective: 2000px;
}

// 旋转轮播图样式
.rotate-animation {
  animation: rotate 25s linear infinite;

  &:hover {
    cursor: pointer;
    animation-play-state: paused;
  }

  &.rotate-transform-3d {
    transform-style: preserve-3d;
  }

  .rotate-photo-item {
    $r: 350px;
    $n: 10;
    $pDeg: calc(360deg / $n);

    @for $i from 1 through $n {
      &:nth-child(#{$i}) {
        transform: rotateY(calc(($i - 1) * $pDeg)) translate3d(0, 0, -$r);
      }
    }

    // 非标准属性 -webkit-box-reflect 用于设置倒影效果
    // 建议改用 CSS 伪元素 + transform 模拟倒影效果。
    -webkit-box-reflect: below 10px
      linear-gradient(transparent 10%, rgb(255 255 255 / 30%) 90%);
    // 背部不可见
    // backface-visibility: hidden;

    & img {
      transform: rotateY(-180deg);
    }
  }
}

// 围绕轮播图样式
.around-animation {
  animation: rotate 25s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  &.around-transform-3d {
    transform-style: preserve-3d;
  }

  .around-photo-item {
    $r: 350px;
    $n: 10;
    $pDeg: calc(360deg / $n);

    @for $i from 1 through $n {
      &:nth-child(#{$i}) {
        opacity: 0.5;
        transition: opacity 0.5s ease-in-out;
        transform: rotateY(calc(($i - 1) * $pDeg)) translate3d(0, 0, -$r);

        &:hover {
          cursor: pointer;
          opacity: 1;
        }
      }
    }

    -webkit-box-reflect: below 10px
      linear-gradient(transparent 10%, rgb(255 255 255 / 30%) 90%);
    backface-visibility: hidden;
  }
}
</style>
