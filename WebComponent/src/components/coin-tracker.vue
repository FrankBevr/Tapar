<script lang="ts" setup>
import { reactive, ref } from "vue";
import CoinCheck from "./coin-check.vue";
const props = defineProps<{ pair?: string; background?: string }>();
const url = "https://api.coinbase.com/v2/prices";

const btcPair = "BTC-USD";
const ethPair = "ETH-USD";

interface moneyFormat {
  formatted: string;
  money: number;
  name: string;
}
const btc = reactive({} as moneyFormat);
const eth = reactive({} as moneyFormat);
const pass = reactive({} as moneyFormat);
const date = ref("");

async function grabPrices(pair: string): Promise<moneyFormat> {
  const btcInfo = await fetch(`${url}/${pair}/buy`);
  const money = await btcInfo.json();
  return {
    money: parseFloat(money.data.amount),
    formatted: new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(money.data.amount),
    name: pair.split("-")[0],
  };
}

const grab = grabPrices("BTC-USD");

async function setValues(): Promise<void> {
  const btcValue = await grabPrices(btcPair);
  const ethValue = await grabPrices(ethPair);
  btc.formatted = btcValue.formatted;
  btc.name = btcValue.name;
  btc.money = btcValue.money;
  eth.formatted = ethValue.formatted;
  eth.name = ethValue.name;
  eth.money = ethValue.money;
  if (props.pair) {
    const pairValue = await grabPrices(props.pair);
    pass.formatted = pairValue.formatted;
    pass.money = pairValue.money;
    pass.name = pairValue.name;
  }
  date.value = new Date().toString();
}
setInterval(setValues, 5000);
</script>

<template>
  <section>
    <CoinCheck :coin="btc"></CoinCheck>
    <CoinCheck :coin="eth"></CoinCheck>
    <CoinCheck v-if="pair" :coin="pass"></CoinCheck>
  </section>
  <div class="sub">
    Last Update:
    <br />
    <span>{{ date }}</span>
  </div>
</template>
<style>
.sub {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 2.5rem;
  margin: 0 auto;
  gap: 1rem;
}

.inner {
  background-color: v-bind(background);
}
</style>
