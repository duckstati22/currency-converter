import Vue from "vue";
import VueRouter from "vue-router";
import ConverterView from "../views/ConverterView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "converter",
    component: ConverterView,
  },
  {
    path: "/currency-rates",
    name: "currency-rates",
    component: () => import("../views/CurrencyRatesView.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
