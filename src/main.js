import Vue from "vue";
import VueAnalytics from "vue-analytics";
import { BootstrapVue } from "bootstrap-vue";
import App from "./App.vue";
import routes from "./routes";
import config from "../config/config";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  title: "Learned",
  routes,
});

Vue.use(VueAnalytics, {
  id: config.googleAnalytics.id,
  router,
  checkDuplicatedScript: true,
  debug: {
    enabled: false,
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Learned";
  next();
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
