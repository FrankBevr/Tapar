<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps<{
  coin: {
    money: number;
    formatted: string;
    name: string;
  };
}>();

const { coin } = toRefs(props);
</script>

<template>
  <Transition mode="out-in">
    <div class="inner" key="coin.formatted">
      {{ coin.name }}
      <div class="price-info" key="coin.formatted">
        {{ coin.formatted }}
        <!--- arrow-checker -->
      </div>
    </div>
  </Transition>
</template>
<style>
.inner {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  box-shadow: 0 3px 10px rgb(0 0 0 /0.2);
  padding: 10px;
}

.v-enter-active,
.v-leave-acitve {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
