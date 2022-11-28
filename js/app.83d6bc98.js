(function(){"use strict";var t={2014:function(t,e,r){var n=r(144),o=r(3726),a=r(7956),s=r(7828),i=r(7024),c=r(1819),u=r(9088),l=r(3066),v=r(7894),d=function(){var t=this,e=t._self._c;return e(o.Z,[e(l.Z,[e(c.Z,[e(v.Z,[e(i.Z,{staticClass:"pb-0",attrs:{cols:"12"}},[e(s.Z,{staticClass:"d-flex",attrs:{"active-class":"",borderless:"",tile:""}},[e(a.Z,{staticClass:"rounded-tl-lg",staticStyle:{width:"50%"},attrs:{to:"/",color:"indigo darken-3",large:""}},[e(u.Z,{attrs:{color:"white"}},[t._v("mdi-currency-usd")])],1),e(a.Z,{staticClass:"rounded-tr-lg",staticStyle:{width:"50%"},attrs:{to:"/currency-rates",color:"indigo darken-3",large:""}},[e(u.Z,{attrs:{color:"white"}},[t._v("mdi-chart-line-variant")])],1)],1)],1)],1),e(v.Z,{attrs:{dense:""}},[e(i.Z,[e("router-view",{staticClass:"blue-grey lighten-5 elevation-24 rounded-b-lg",attrs:{currenciesData:t.currenciesData}})],1)],1)],1)],1)],1)},m=[],f={name:"App",data(){return{currenciesData:[]}},created(){this.loadCurrenciesData()},computed:{xSmallScreenSize(){return"xs"===this.$vuetify.breakpoint.name?"align-center":""}},methods:{loadCurrenciesData(){fetch("https://api.exchangerate.host/symbols").then((t=>t.json())).then((t=>{const e=Object.values(t.symbols).map((t=>({text:`${t.code} — ${t.description}`,value:t.code})));this.currenciesData=e}))}}},h=f,g=r(1001),p=(0,g.Z)(h,d,m,!1,null,null,null),y=p.exports,b=r(8345),Z=function(){var t=this,e=t._self._c;return e(c.Z,{attrs:{tag:"section"}},[e(v.Z,{attrs:{dense:""}},[e(i.Z,{staticClass:"text-caption",attrs:{align:"center",cols:"6"}},[e("p",{staticClass:"text-uppercase"},[t._v("Currency Converter")])]),e(i.Z,{attrs:{align:"center",cols:"12"}},[e("converter-form",{attrs:{currenciesData:t.currenciesData}})],1)],1)],1)},C=[],D=r(6574),w=r(6930),k=r(2095),x=function(){var t=this,e=t._self._c;return e(c.Z,[e(v.Z,[e(i.Z,{attrs:{cols:"12",sm:"3"}},[e(k.Z,{attrs:{type:"number",label:"Amount","hide-details":"auto","hide-spin-buttons":"",outlined:""},on:{focus:t.inputFocus,blur:t.inputBlur,input:t.convertImmediately},model:{value:t.convertingData.amount,callback:function(e){t.$set(t.convertingData,"amount",e)},expression:"convertingData.amount"}})],1),e(i.Z,{attrs:{cols:"12",sm:"9"}},[e(v.Z,{attrs:{align:"center"}},[e(i.Z,{attrs:{cols:"12",sm:"5"}},[e(D.Z,{attrs:{label:"From",items:t.currenciesData,"hide-details":"auto",outlined:""},on:{change:function(e){t.resultIsEmpty||t.convertCurrencies()}},model:{value:t.convertingData.fromCurrency,callback:function(e){t.$set(t.convertingData,"fromCurrency",e)},expression:"convertingData.fromCurrency"}})],1),e(i.Z,{attrs:{sm:"0.5"}},[e(a.Z,{attrs:{color:"indigo darken-4",icon:"",elevation:"2"},on:{click:t.swapCurrencies}},[e(u.Z,[t._v("mdi-swap-horizontal")])],1)],1),e(i.Z,{attrs:{cols:"12",sm:"5"}},[e(D.Z,{attrs:{items:t.currenciesData,label:"To","hide-details":"auto",outlined:""},on:{change:function(e){t.resultIsEmpty||t.convertCurrencies()}},model:{value:t.convertingData.toCurrency,callback:function(e){t.$set(t.convertingData,"toCurrency",e)},expression:"convertingData.toCurrency"}})],1)],1)],1)],1),e(v.Z,[e(i.Z,{attrs:{cols:"12"}},[e(a.Z,{staticClass:"white--text",attrs:{disabled:t.amountIsZero,elevation:"2",color:"indigo darken-3",large:""},on:{click:t.convertCurrencies}},[t._v(" Convert ")])],1),e(w.Fx,[t.resultIsEmpty?t._e():e(i.Z,{staticClass:"text-md-h2 text-h5",attrs:{cols:"12"}},[t._v(" "+t._s(t.resultString)+" ")])],1)],1)],1)},S=[],O={name:"ConverterForm",props:{currenciesData:{type:Array,required:!0}},data(){return{convertingData:{amount:"1.00",fromCurrency:"USD",toCurrency:"RUB"},convertingResult:{}}},created(){this.getResultFromStorage()},computed:{amountIsZero(){return 0==this.convertingData.amount},resultIsEmpty(){return 0===Object.keys(this.convertingResult).length},resultString(){return this.resultIsEmpty?"No Data":`${this.convertingResult.amount} ${this.convertingResult.from} =\n          ${this.convertingResult.result.toFixed(2)} ${this.convertingResult.to}`}},methods:{convertImmediately(){this.resultIsEmpty||this.amountIsZero||this.convertCurrencies()},inputFocus(t){"1.00"===t.target.value&&(this.convertingData.amount="")},inputBlur(t){""===t.target.value&&(this.convertingData.amount="1.00")},swapCurrencies(){[this.convertingData.fromCurrency,this.convertingData.toCurrency]=[this.convertingData.toCurrency,this.convertingData.fromCurrency],this.convertImmediately()},convertCurrencies(){const{fromCurrency:t,toCurrency:e,amount:r}=this.convertingData;fetch(`https://api.exchangerate.host/convert?from=${t}&to=${e}&amount=${r}`).then((t=>t.json())).then((t=>{this.convertingResult={...t.query,result:t.result},this.setResultToStorage()}))},setResultToStorage(){sessionStorage.setItem("convertingResult",JSON.stringify(this.convertingResult))},getResultFromStorage(){const t=sessionStorage.getItem("convertingResult");t&&(this.convertingResult=JSON.parse(t),this.convertingData.amount=this.convertingResult.amount)}}},_=O,R=(0,g.Z)(_,x,S,!1,null,null,null),j=R.exports,E={name:"ConverterView",components:{ConverterForm:j},props:{currenciesData:{type:Array,required:!0}}},I=E,$=(0,g.Z)(I,Z,C,!1,null,null,null),P=$.exports;n.ZP.use(b.ZP);const F=[{path:"/",name:"converter",component:P},{path:"/currency-rates",name:"currency-rates",component:()=>r.e(861).then(r.bind(r,1861))}],T=new b.ZP({mode:"hash",base:"/currency-converter/",routes:F});var A=T,N=r(8986);n.ZP.use(N.Z);var q=new N.Z({theme:{themes:{light:{primary:"#1A237E",error:"#E53935"}}}});n.ZP.config.productionTip=!1,new n.ZP({router:A,vuetify:q,render:t=>t(y)}).$mount("#app")}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,r),a.exports}r.m=t,function(){var t=[];r.O=function(e,n,o,a){if(!n){var s=1/0;for(l=0;l<t.length;l++){n=t[l][0],o=t[l][1],a=t[l][2];for(var i=!0,c=0;c<n.length;c++)(!1&a||s>=a)&&Object.keys(r.O).every((function(t){return r.O[t](n[c])}))?n.splice(c--,1):(i=!1,a<s&&(s=a));if(i){t.splice(l--,1);var u=o();void 0!==u&&(e=u)}}return e}a=a||0;for(var l=t.length;l>0&&t[l-1][2]>a;l--)t[l]=t[l-1];t[l]=[n,o,a]}}(),function(){r.d=function(t,e){for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){r.f={},r.e=function(t){return Promise.all(Object.keys(r.f).reduce((function(e,n){return r.f[n](t,e),e}),[]))}}(),function(){r.u=function(t){return"js/"+t+".8bcec3bb.js"}}(),function(){r.miniCssF=function(t){}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="currency-converter:";r.l=function(n,o,a,s){if(t[n])t[n].push(o);else{var i,c;if(void 0!==a)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var v=u[l];if(v.getAttribute("src")==n||v.getAttribute("data-webpack")==e+a){i=v;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.setAttribute("data-webpack",e+a),i.src=n),t[n]=[o];var d=function(e,r){i.onerror=i.onload=null,clearTimeout(m);var o=t[n];if(delete t[n],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(t){return t(r)})),e)return e(r)},m=setTimeout(d.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=d.bind(null,i.onerror),i.onload=d.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){r.p="/currency-converter/"}(),function(){var t={143:0};r.f.j=function(e,n){var o=r.o(t,e)?t[e]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise((function(r,n){o=t[e]=[r,n]}));n.push(o[2]=a);var s=r.p+r.u(e),i=new Error,c=function(n){if(r.o(t,e)&&(o=t[e],0!==o&&(t[e]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;i.message="Loading chunk "+e+" failed.\n("+a+": "+s+")",i.name="ChunkLoadError",i.type=a,i.request=s,o[1](i)}};r.l(s,c,"chunk-"+e,e)}},r.O.j=function(e){return 0===t[e]};var e=function(e,n){var o,a,s=n[0],i=n[1],c=n[2],u=0;if(s.some((function(e){return 0!==t[e]}))){for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(c)var l=c(r)}for(e&&e(n);u<s.length;u++)a=s[u],r.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return r.O(l)},n=self["webpackChunkcurrency_converter"]=self["webpackChunkcurrency_converter"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(2014)}));n=r.O(n)})();
//# sourceMappingURL=app.83d6bc98.js.map