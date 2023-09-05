<script lang="ts" setup>
import { toRefs } from "vue";
import ArrowChecker from "./arrow-checker.vue";

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
        <ArrowChecker :amount="coin.money" :name="coin.name"></ArrowChecker>
      </div>
    </div>
  </Transition>
</template>
<style></style>
