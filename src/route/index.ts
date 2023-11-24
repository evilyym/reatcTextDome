import { createRouter, createWebHistory } from "vue-router";
import { getInfoApi } from "../api/index.ts";

const routes = [
  {
    path: "/",
    // redirect: '/applicationResults',
    component: () => import("@/page/applicationResults/index.vue"),
  },
  {
    path: "/applicationResults",
    name: "applicationResults",
    component: () => import("@/page/applicationResults/index.vue"),
  },
  {
    path: "/applyActivities",
    name: "applyActivities",
    component: () => import("@/page/applyActivities/index.vue"),
  },
  {
    path: "/eventDetails",
    name: "eventDetails",
    component: () => import("@/page/eventDetails/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/activitysupport_wap/"),
  routes,
});

router.beforeEach(async (to: any, from, next) => {
  // https://dev-zjtie.goliveplus.cn/activitysupport_wap/?
  // saas_wap_token=S102964ES1MMGwAaMEVWSlgMk-0
  // tenantCode=S10296
  // point_url=https://dev-zjtie.goliveplus.cn/saas_wap
  // https://dev-zjtie.goliveplus.cn/activitysupport_wap/?code=1vD1bw5q

  console.log(from);

  if (to.query.code) {
    // if (!localStorage.getItem("tenantCode")) {
    //   let point_url = localStorage.getItem('point_url');
    //   point_url = point_url.replace(/%3A%2F%2F/, '://')
    //   location.replace(`${point_url}/?redirect_url=${location.origin+location.pathname}${location.search.indexOf('name=')>-1?'?name='+location.search.split('name=')[1].split('&')[0]:''}`)
    // }
  }
  if (to.query.user_type) {
    console.log(to);

    // https://dev-zjtie.goliveplus.cn/saas_wap/analysis?
    // redirect_url=http://127.0.0.1:5173/activitysupport_wap/eventDetails?id=3user_type=1&
    // point_url=https://dev-zjtie.goliveplus.cn/saas_wap/
    location.replace(
      `${to.query.point_url}analysis?redirect_url=${location.pathname}&id=${to.query.id}&userType=${to.query.user_type}`
    );

  }

  if (to.query.tenantCode) {
    localStorage.setItem("tenantCode", to.query.tenantCode);
    sessionStorage.setItem("tenantCode", to.query.tenantCode);
  }
  if (
    to.query.point_url &&
    localStorage.getItem("point_url") &&
    localStorage.getItem("point_url") !== to.query.point_url
  ) {
    //判断缓存的租户信息和当前访问的租户信息是否一致
    localStorage.removeItem("userCode");
    localStorage.removeItem("tenantCode");
  }
  if (to.query.point_url) localStorage.setItem("point_url", to.query.point_url);

  var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象

  if (to.query.saas_wap_token && !sessionStorage.getItem("go")) {
    let params = {
      tenantCode: to.query.tenantCode || localStorage.getItem("tenantCode"),
      saasWapToken: to.query.saas_wap_token,
    };
    await getInfoApi(params).then((res) => {
      // next('/applicationResults?1')
      if (res.code == 200) {
        localStorage.setItem("userCode", res.data.token);
        sessionStorage.setItem("go", "1");
        next();
      }
    });
  }
  // /*

  if (ua.match(/MicroMessenger/i)) {
    if (!localStorage.getItem("tenantCode")) {
      let point_url = localStorage.getItem("point_url");
      point_url = point_url.replace(/%3A%2F%2F/, "://");
      location.replace(
        `${point_url}/?redirect_url=${location.origin + location.pathname}${
          location.search.indexOf("name=") > -1
            ? "?name=" + location.search.split("name=")[1].split("&")[0]
            : ""
        }`
      );
    }
  }
  // */

  // if (location.hostname.indexOf('localhost') > -1||location.hostname.indexOf('127.0.0') > -1) {
  //   to.path=='/' && next({path:'/applicationResults',query:''})
  //   localStorage.setItem("userCode", 'ougEN0r1ShXEYLgmHnNKzxflgD48')
  //   localStorage.setItem("tenantCode", 'S10296')
  // }
  next();
});
export default router;
