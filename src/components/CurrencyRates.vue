<template>
  <v-container>
    <v-row>
      <v-col sm="7">
        <v-autocomplete
          :items="currenciesData"
          v-model="mainCurrency"
          label="Select Main Currency"
          hide-details="auto"
          outlined
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-slide-x-transition hide-on-leave group>
      <v-row
        v-for="currency in comparedCurrencies"
        :key="currency.value"
        align="center"
      >
        <v-col
          cols="12"
          sm="7"
          :class="xSmallScreenSize"
          class="overflow-hidden"
        >
          <v-btn
            @click="selectAsMainCurrency"
            :data-currency="currency.value"
            color="indigo darken-3"
            class="white--text px-0"
            block
          >
            {{ currency.text }}
          </v-btn>
        </v-col>
        <v-col class="text-h6" cols="10" sm="3">{{
          hasCurrencyRates
            ? `${(1 / currencyRates[currency.value]).toFixed(
                5
              )} ${mainCurrency} for 1 ${currency.value}`
            : "No data"
        }}</v-col>
        <v-col cols="1" sm="1">
          <v-btn @click="deleteCurrency(currency)" color="red darken-1" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-slide-x-transition>
    <v-row>
      <v-col sm="7">
        <v-btn
          v-if="!addingNewRate"
          @click="changeAddingRateStatus"
          color="indigo darken-4"
          elevation="2"
          icon
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-autocomplete
          v-else
          :items="currenciesData"
          :error="autocompleteError.active"
          id="addCurAutoComplete"
          @blur="changeAddingRateStatus"
          @change="addComparedCurrency"
          autofocus
          return-object
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CurrencyRates",
  props: {
    currenciesData: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      mainCurrency: "RUB",
      currencyRates: {},
      comparedCurrencies: [
        { text: "EUR - Euro", value: "EUR" },
        { text: "USD - United States Dollar", value: "USD" },
      ],
      addingNewRate: false,
      autocompleteError: {
        active: false,
        message:
          "This currency is already on the list, please select another one.",
      },
    };
  },

  created() {
    this.loadRates();
    this.getCurrencyFromStorage();
    this.getComparedFromStorage();
  },

  computed: {
    xSmallScreenSize() {
      if (this.$vuetify.breakpoint.name === "xs") {
        return "px-0";
      } else {
        return "";
      }
    },
    hasCurrencyRates() {
      return Object.keys(this.currencyRates).length > 0;
    },
  },

  methods: {
    loadRates() {
      fetch(`https://api.exchangerate.host/latest?base=${this.mainCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          this.currencyRates = data.rates;
        });
    },

    changeAddingRateStatus() {
      this.autocompleteError.active = false;
      this.addingNewRate = !this.addingNewRate;
    },

    addComparedCurrency(currency) {
      const autocomplete = document.getElementById("addCurAutoComplete");

      const isInTheList = this.comparedCurrencies.find(
        (item) => item.value === currency.value
      );

      if (isInTheList) {
        this.autocompleteError.active = true;
        return;
      }

      this.comparedCurrencies.push(currency);
      localStorage.setItem(
        "comparedCurrencies",
        JSON.stringify(this.comparedCurrencies)
      );
      autocomplete.blur();
    },

    deleteCurrency(currency) {
      const index = this.comparedCurrencies.findIndex(
        (item) => item.value === currency.value
      );
      this.comparedCurrencies.splice(index, 1);
      localStorage.setItem(
        "comparedCurrencies",
        JSON.stringify(this.comparedCurrencies)
      );
    },

    selectAsMainCurrency(event) {
      const currencyVal = event.currentTarget.dataset.currency;
      this.mainCurrency = currencyVal;
      this.deleteCurrency(event);
    },

    getCurrencyFromStorage() {
      const mainCurrency = localStorage.getItem("mainCurrency");
      if (mainCurrency) {
        this.mainCurrency = localStorage.getItem("mainCurrency");
      }
    },
    getComparedFromStorage() {
      const comparedCurrencies = localStorage.getItem("comparedCurrencies");
      if (comparedCurrencies) {
        this.comparedCurrencies = JSON.parse(
          localStorage.getItem("comparedCurrencies")
        );
      }
    },
  },

  watch: {
    mainCurrency() {
      this.loadRates();
      localStorage.setItem("mainCurrency", this.mainCurrency);
    },
  },
};
</script>
