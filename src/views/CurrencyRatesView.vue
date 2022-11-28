<template>
  <v-container tag="section">
    <v-row dense>
      <v-spacer></v-spacer>
      <v-col align="center" class="text-caption" cols="6">
        <p class="text-uppercase">Currency Rates</p>
      </v-col>
      <v-col align="center" cols="12">
        <currency-rates :currenciesData="currenciesData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CurrencyRates from "../components/CurrencyRates.vue";

export default {
  name: "CurrencyRateView",
  components: { CurrencyRates },
  props: {
    currenciesData: {
      type: Array,
      required: true,
    },
  },
};
</script>
