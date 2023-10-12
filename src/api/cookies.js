let cookies = {
  delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },

  getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
      return str1 * 1000;
    } else if (str2 == "h") {
      return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
      return str1 * 24 * 60 * 60 * 1000;
    }
  },

  getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  // var username = document.cookie.split(";")[0].split("=")[1];
  //JS操作cookies方法!
  //写cookies
  setCookie(name, value, timer) {
    var mint = timer;
    var exp = new Date();
    exp.setTime(exp.getTime() + parseInt(mint * 1000));
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
  }

}
module.exports = cookies
