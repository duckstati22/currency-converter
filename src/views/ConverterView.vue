<template>
  <v-container tag="section">
    <v-row dense>
      <v-col align="center" class="text-caption" cols="6">
        <p class="text-uppercase">Currency Converter</p>
      </v-col>
      <v-col align="center" cols="12">
        <converter-form :currenciesData="currenciesData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConverterForm from "../components/ConverterForm.vue";

export default {
  name: "ConverterView",
  components: { ConverterForm },
  props: {
    currenciesData: {
      type: Array,
      required: true,
    },
  },
};
</script>
