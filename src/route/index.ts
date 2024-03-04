import { createRouter, createWebHistory } from "vue-router";
import { getInfoApi } from "../api/index.ts";
import configURL from "../request/http";
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
const routerQuery = { code: "", id: "", user_type: "" };
router.beforeEach(async (to: any, from, next) => {

  console.log(from);
  // alert(JSON.stringify(to))

  if (to.query.code) {

  routerQuery.code = to.query.code;
    const point_url = to.query.point_url || configURL.saasURL;
    // alert(
    //   `${point_url}analysis?redirect_url=${
    //     location.origin + location.pathname
    //   }?activitysupporCode=${to.query.code}&time=${new Date().getTime()}`
    // );

    location.replace(
      `${point_url}analysis?redirect_url=${
        location.origin + location.pathname
      }?activitysupporCode=${to.query.code}&time=${new Date().getTime()}`
    );
  }

  if (to.query.user_type) {
    // https://dev-zjtie.goliveplus.cn/saas_wap/analysis?
    // redirect_url=http://127.0.0.1:5173/activitysupport_wap/eventDetails?id=3user_type=1&
    // point_url=https://dev-zjtie.goliveplus.cn/saas_wap/
    const point_url = to.query.point_url || configURL.saasURL;
    routerQuery.user_type = to.query.user_type;
    routerQuery.id = to.query.id;

    location.replace(
      `${point_url}analysis?redirect_url=${
        location.origin + location.pathname
      }?id=${to.query.id}&userType=${
        to.query.user_type
      }&time=${new Date().getTime()}`
    );
  }
  if (to.query.tenantCode) {
    localStorage.setItem("tenantCode", to.query.tenantCode);
    sessionStorage.setItem("tenantCode", to.query.tenantCode);
  }
  // if (
  //   to.query.point_url &&
  //   localStorage.getItem("point_url") &&
  //   localStorage.getItem("point_url") !== to.query.point_url
  // ) {
  //   //判断缓存的租户信息和当前访问的租户信息是否一致
  //   localStorage.removeItem("userCode");
  //   localStorage.removeItem("tenantCode");
  // }
  to.query.point_url
    ? localStorage.setItem("point_url", to.query.point_url)
    : localStorage.setItem("point_url", configURL.saasURL);

  var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象

  if (to.query.saas_wap_token && !sessionStorage.getItem("go")) {
    let params = {
      tenantCode: to.query.tenantCode || localStorage.getItem("tenantCode"),
      saasWapToken: to.query.saas_wap_token,
    };
    await getInfoApi(params).then((res) => {
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

  if (
    location.hostname.indexOf("localhost") > -1 ||
    location.hostname.indexOf("127.0.0") > -1
  ) {
    to.path == "/" && next("/applicationResults");
    localStorage.setItem(
      "userCode",
      `
      bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6MTExMjlcL2FwaVwvd2FwXC9nZXQtdXNlciIsImlhdCI6MTcwNDE3NzU4OCwiZXhwIjoxNzA0MTk1NTg4LCJuYmYiOjE3MDQxNzc1ODgsImp0aSI6IkRiQ0J3dFJFajBYVGU0V0EiLCJzdWIiOiIxMiIsInBydiI6IjQxZGY4ODM0ZjFiOThmNzBlZmE2MGFhZWRlZjQyMzQxMzcwMDY5MGMifQ.s7EmgGlZLIxBFof5SvnJ3fBz5n40Hik_gVek6NwQ75s
      `
    );
    localStorage.setItem("tenantCode", "S10296");
  }

  next();
});
export { routerQuery };

export default router;
