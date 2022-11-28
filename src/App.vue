<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" class="pb-0">
            <v-btn-toggle active-class="" class="d-flex" borderless tile>
              <v-btn
                to="/"
                color="indigo darken-3"
                class="rounded-tl-lg"
                style="width: 50%"
                large
              >
                <v-icon color="white">mdi-currency-usd</v-icon>
              </v-btn>

              <v-btn
                to="/currency-rates"
                color="indigo darken-3"
                class="rounded-tr-lg"
                style="width: 50%"
                large
              >
                <v-icon color="white">mdi-chart-line-variant</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <router-view
              :currenciesData="currenciesData"
              class="blue-grey lighten-5 elevation-24 rounded-b-lg"
            >
            </router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      currenciesData: [],
    };
  },

  created() {
    this.loadCurrenciesData();
  },

  computed: {
    xSmallScreenSize() {
      if (this.$vuetify.breakpoint.name === "xs") {
        return "align-center";
      } else {
        return "";
      }
    },
  },

  methods: {
    loadCurrenciesData() {
      fetch("https://api.exchangerate.host/symbols")
        .then((response) => response.json())
        .then((data) => {
          const formattedData = Object.values(data.symbols).map((item) => ({
            text: `${item.code} — ${item.description}`,
            value: item.code,
          }));
          this.currenciesData = formattedData;
        });
    },
  },
};
</script>
