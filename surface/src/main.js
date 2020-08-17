import Vue from "vue";
import App from "./App.vue";
import api from "./utils/api";
import router from "./router";
import Auth from "@aws-amplify/auth";

const config = {
  region: process.env.VUE_APP_COGNITO_REGION,
  userPoolWebClientId: process.env.VUE_APP_COGNITO_CLIENT_ID,
  userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
  oauth: {
    domain: process.env.VUE_APP_COGNITO_DOMAIN,
    scope: ["openid", "email"],
    redirectSignIn: process.env.VUE_APP_COGNITO_SIGN_IN_URL,
    redirectSignOut: process.env.VUE_APP_COGNITO_SIGN_OUT_URL,
    responseType: "code",
  },
};

Auth.configure(config);
Vue.prototype.$auth = Vue.observable(Auth);

Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
