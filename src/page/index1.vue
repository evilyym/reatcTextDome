<template>
    <van-form @submit="onSubmit" class="formBox" :show-error="true" :show-error-message="false" error-message-align="right"
        label-align="right">
        <van-cell-group inset>
            <van-field v-model="username" name="姓名" label="姓名" placeholder="姓名" required
                :rules="[{ pattern, message: '请填写姓名' }]" />
            <van-field v-model="password" name="手机号" label="手机号" placeholder="请填写手机号" required
                :rules="[{ required: true, message: '请填写手机号' }]" />
            <van-field v-model="password" name="身份证" label="身份证" placeholder="请填写密码" required
                :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field v-model="password" readonly name="密码" label="来访时间" placeholder="请填写密码" required
                :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field label="离开时间" required v-model="result" is-link readonly name="datePicker" placeholder="点击选择时间"
                @click="showPicker = true" :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field v-model="password" name="密码" label="车牌号" placeholder="请填写密码" required
                :rules="[{ required: true, message: '请填写密码' }]" /><van-field v-model="password" name="密码" label="密码"
                placeholder="请填写密码" required :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field name="uploader" required label="车辆照片">
                <template #input>
                    <van-uploader v-model="fiel" multiple max-count="1" />
                </template>
            </van-field>
        </van-cell-group>
        <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
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

// export default {
// setup() {
const username = ref("");
const password = ref("");
const pattern = /^(?:[\u4e00-\u9fa5·]{2,16})$/;
const fiel = ref([
    // { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
]);

const result = ref("");
const showPicker = ref(false);

const minDate = new Date();
const maxDate = new Date(2025, 10, 1);
const currentDate = new Date();
const confirm = ({ selectedValue }: { selectedValue: any }) => {
    const date = selectedValue.slice(0, 3).join("-");
    const time = selectedValue.slice(3).join(":");
    console.log(date + " " + time);
    showPicker.value = false
};

const onSubmit = (values: any) => {
    axios
        .get("/user?ID=" + values)
        .then(function (response: any) {
            // 处理成功情况
            console.log(response);
        })
        .catch(function (error: any) {
            // 处理错误情况
            console.log(error);
        })
        .then(function () {
            // 总是会执行
        });
};
</script>
<style>
.formBox {
    padding: 20px 10px;
    border: 2px solid #eee;
    border-radius: 10px;
}
</style>
