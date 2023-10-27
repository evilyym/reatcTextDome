<template>
  <div class="head_div">
    <img src="../assets/bg2.png" v-if="status == 1" class="header_title" alt="" />
    <div class="head_inf" v-if="status == 2">
      <div class="head_title">
        提交成功
      </div>
      <div class="head_msg">
        请向警卫出示此页
      </div>
    </div>
    <img src="../assets/1.png" v-if="status == 1" class="img1" alt="" />
    <img src="../assets/3.png" v-if="status == 2" class="img1" alt="" />
  </div>
  <van-form @submit="onSubmit" @failed="onFailed" class="formBox" :show-error="true" :show-error-message="false"
    error-message-align="right" label-align="top">
    <!-- right -->
    <van-field v-model="fromInf.user_name" label="姓名" :readonly="status !== 1" placeholder="请填写姓名" required
      :rules="[{ pattern: verify.user_name, message: fromInf.user_name ? '姓名字数2位以上' : '请填写姓名' }]" />
    <van-field v-model="fromInf.phone" label="手机号" :readonly="status !== 1" placeholder="请填写手机号" required
      :rules="[{ pattern: verify.phone, message: fromInf.phone ? '手机号格式不正确' : '请填写手机号' }]" />
    <van-field v-model="fromInf.id_card" label="身份证" :readonly="status !== 1" placeholder="请填写身份证" required
      :rules="[{ pattern: verify.id_card, message: fromInf.id_card ? '身份号格式不正确' : '请填写身份证' }]" />
    <van-field v-model="fromInf.visit_time" readonly label="来访时间" required :rules="[{ message: '请填写来访时间' }]" />
    <van-field label="离开时间" required v-model="fromInf.departure_time" :is-link="status === 1" readonly
      placeholder="点击选择离开时间" @click="status == 1 ? showPicker = true : ''"
      :rules="[{ pattern: verify.departure_time, message: '请填写离开时间' }]" />
    <van-field v-model="fromInf.car_plate" label="车牌号" :readonly="status !== 1" placeholder="请填写车牌号"
      :rules="[{ required:false, pattern: verify.car_plate, message: fromInf.car_plate ? '车牌号格式不正确' : '请填写车牌号' }]" />
    <van-field name="uploader" label="车辆照片" v-if="status == 1 || car_image.length > 0">
      <template #input>
        <van-uploader :deletable="status === 1" :after-read="afterRead" v-model="car_image" multiple max-count="1" />
      </template>
    </van-field>
    <div style="margin: 16px">
      <van-button round block type="primary" v-if="status == 1" native-type="submit">
        提交表单
      </van-button>
    </div>
  </van-form>
  <van-popup v-model:show="showPicker" position="bottom">
    <nut-date-picker v-model="currentDate" title="日期时间选择" type="datetime" :min-date="minDate" :max-date="maxDate"
      @confirm="confirm"></nut-date-picker>
  </van-popup>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
// import { showToast } from "vant";
import { showToast } from '@nutui/nutui';
import '@nutui/nutui/dist/packages/toast/style';


var nowDate = new Date()
  .toLocaleString("zh", {
    hour12: false,
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
  .replace(/\//g, "-");

const verify = {
  user_name: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
  phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
  id_card: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
  car_plate: /(^$)|(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$)/,
  departure_time: /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/,
};
const car_image = ref([]);
const status = ref(1);
const showPicker = ref(false);

const minDate = new Date();
const maxDate = new Date(minDate.getFullYear() + 2, minDate.getMonth(), 1);
const currentDate = new Date();

const fromInf = ref({
  user_name: "",
  phone: "",
  id_card: "",
  car_plate: "",
  visit_time: nowDate,
  departure_time: nowDate.split(" ")[0] + " 23:59",
  car_image: null,

  //   car_plate: "浙A111156",
  // departure_time: "2023-10-13 16:52",
  // id_card: "14223019960120271X",
  // phone: "13122221111",
  // user_name: "杨哟",
  // visit_time: "2023-10-12 16:52",
});
const confirm = ({ selectedValue }: { selectedValue: any }) => {
  const date = selectedValue.slice(0, 3).join("-");
  const time = selectedValue.slice(3).join(":");
  fromInf.value.departure_time = date + " " + time;
  showPicker.value = false;
};

// let car_img = null;

const afterRead = (file: any) => {
  const files = new FormData()
  files.append("img", file.file)
  fromInf.value.car_image = file.file
  // car_img = file.file
};
const requestState = ref(false)

const onSubmit = () => {
  let query = {
    // car_image: car_img,
    ...fromInf.value
  }
  // 
  if (requestState.value) return
  requestState.value = true
  const hostname = location.hostname;
  let bastUrl
  if (hostname.indexOf('dev') > -1 || hostname.indexOf('localhost') > -1){
    bastUrl="https://dev-zjnu-vvr.goliveplus.cn/"
  }else{
    
    bastUrl="https://doorctlapi.zjnu.edu.cn/vvr_api/"
  }
  axios
    // .post("api/visit/create_visit_record/", query, {
    .post(bastUrl+'visit/create_visit_record/', query, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response: any) {
      if (response.data.code != 200) {
        showToast.fail(response.data.msg)
      } else {
        status.value = 2
      }
    })
    .catch(function (err: any) {
      showToast.fail('网络错误')
      console.log(err)
    })
    .then(function () {
      requestState.value = false
    });
};

const onFailed = (errorInfo: any) => {
  showToast.warn(errorInfo.errors[0].message)
  // status.value = 2
}
</script>
<style lang="less">
.formBox {
  border-radius: 10px 10px 0 0;
  position: absolute;
  top: 90px;
  width: 100%;
  overflow-x: hidden;
}

.head_div {
  height: 100px;
  background: url(../assets/bg.png) no-repeat;
  background-size: 100%;
  display: flex;
  padding: 0 37px;
  align-items: center;
  position: relative;

  .head_title {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 6px;
  }

  .head_msg {
    font-size: 14px;
    font-weight: bold;
    color: #faddfa;
  }

  .img1 {
    position: absolute;
    top: 18px;
    right: 32px;
    z-index: 12;
    height: 115px;
  }

  .header_title {
    height: 25px;
  }
}
</style>
