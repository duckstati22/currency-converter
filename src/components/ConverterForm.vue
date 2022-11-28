<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-text-field
          @focus="inputFocus"
          @blur="inputBlur"
          @input="convertImmediately"
          v-model="convertingData.amount"
          type="number"
          label="Amount"
          hide-details="auto"
          hide-spin-buttons
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row align="center">
          <v-col cols="12" sm="5">
            <v-autocomplete
              @change="
                if (!resultIsEmpty) {
                  convertCurrencies();
                }
              "
              v-model="convertingData.fromCurrency"
              label="From"
              :items="currenciesData"
              hide-details="auto"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col sm="0.5">
            <v-btn
              @click="swapCurrencies"
              color="indigo darken-4"
              icon
              elevation="2"
            >
              <v-icon>mdi-swap-horizontal</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="5">
            <v-autocomplete
              @change="
                if (!resultIsEmpty) {
                  convertCurrencies();
                }
              "
              v-model="convertingData.toCurrency"
              :items="currenciesData"
              label="To"
              hide-details="auto"
              outlined
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          @click="convertCurrencies"
          :disabled="amountIsZero"
          elevation="2"
          color="indigo darken-3"
          class="white--text"
          large
        >
          Convert
        </v-btn>
      </v-col>
      <v-expand-transition>
        <v-col v-if="!resultIsEmpty" class="text-md-h2 text-h5" cols="12">
          {{ resultString }}
        </v-col>
      </v-expand-transition>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ConverterForm",
  props: {
    currenciesData: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      convertingData: {
        amount: "1.00",
        fromCurrency: "USD",
        toCurrency: "RUB",
      },
      convertingResult: {},
    };
  },

  created() {
    this.getResultFromStorage();
  },

  computed: {
    amountIsZero() {
      return this.convertingData.amount == 0;
    },
    resultIsEmpty() {
      return Object.keys(this.convertingResult).length === 0;
    },
    resultString() {
      if (!this.resultIsEmpty) {
        return `${this.convertingResult.amount} ${this.convertingResult.from} =
          ${this.convertingResult.result.toFixed(2)} ${
          this.convertingResult.to
        }`;
      } else {
        return "No Data";
      }
    },
  },

  methods: {
    convertImmediately() {
      if (!this.resultIsEmpty && !this.amountIsZero) {
        this.convertCurrencies();
      }
    },

    inputFocus(event) {
      if (event.target.value === "1.00") {
        this.convertingData.amount = "";
      }
    },
    inputBlur(event) {
      if (event.target.value === "") {
        this.convertingData.amount = "1.00";
      }
    },

    swapCurrencies() {
      //swapping convertingData object values
      [this.convertingData.fromCurrency, this.convertingData.toCurrency] = [
        this.convertingData.toCurrency,
        this.convertingData.fromCurrency,
      ];

      this.convertImmediately();
    },

    convertCurrencies() {
      const { fromCurrency, toCurrency, amount } = this.convertingData;

      fetch(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.convertingResult = { ...data.query, result: data.result };
          this.setResultToStorage();
        });
    },

    setResultToStorage() {
      sessionStorage.setItem(
        "convertingResult",
        JSON.stringify(this.convertingResult)
      );
    },
    getResultFromStorage() {
      const resultInStorage = sessionStorage.getItem("convertingResult");
      if (resultInStorage) {
        this.convertingResult = JSON.parse(resultInStorage);
        this.convertingData.amount = this.convertingResult.amount;
      }
    },
  },
};
</script>
