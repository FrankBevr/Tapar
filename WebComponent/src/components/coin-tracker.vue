<script lang="ts" setup>
import { reactive } from "vue";
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

async function grabPrices(pair: string): Promise<moneyFormat> {
  const btcInfo = await fetch(`${url}/${pair}/spot`);
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
}
setValues();
// setinterval(setValues, 10000)
</script>

<template>
  <h1>Hello</h1>
  <section>
    <span>{{ eth.formatted }}</span>
    <span>{{ eth.name }}</span>
    <span>{{ eth.money }}</span>
    <br />
    <span>{{ btc.formatted }}</span>
    <span>{{ btc.name }}</span>
    <span>{{ btc.money }}</span>

    <!--CoinChecK :coin="btc"-->
  </section>
  <div class="sub">
    Last Update:
    <span>{{
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds()
    }}</span>
  </div>
</template>
