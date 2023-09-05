import { defineCustomElement } from "vue";
import VueCointTracker from "./components/coin-tracker.ce.vue";

export const CoinTracker = defineCustomElement(VueCointTracker);

export function register(tagName = "coin-tracker") {
  customElements.define(tagName, CoinTracker);
}
