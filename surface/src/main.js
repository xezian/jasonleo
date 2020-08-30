import Vue from "vue"
import Amplify from "aws-amplify"
import App from "./App.vue"
import router from "./router"
import storage from "./utils/storage"

Amplify.configure({
  Auth: {
    region: process.env.VUE_APP_COGNITO_REGION,
    userPoolWebClientId: process.env.VUE_APP_COGNITO_CLIENT_ID,
    userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
    identityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
    oauth: {
      domain: process.env.VUE_APP_COGNITO_DOMAIN,
      scope: ["openid", "email"],
      redirectSignIn: process.env.VUE_APP_COGNITO_SIGN_IN_URL,
      redirectSignOut: process.env.VUE_APP_COGNITO_SIGN_OUT_URL,
      responseType: "code",
    },
  },
  Storage: {
    AWSS3: {
      bucket: "jason-leo",
      region: process.env.VUE_APP_COGNITO_REGION,
    },
  },
})

Vue.prototype.$auth = Vue.observable(Amplify.Auth)

Vue.config.productionTip = false
Vue.prototype.$storage = storage

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
