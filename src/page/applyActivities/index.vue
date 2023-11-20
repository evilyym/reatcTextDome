<style lang="less" scoped>
.applyActivities {
  position: relative;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;

  .userInfo {
    margin: auto;
    width: 690px;
    height: 164px;
    background: linear-gradient(161deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%) #1677FF;
    box-shadow: 0px 12 24px 0px rgba(22, 119, 255, 0.3);
    border-radius: 24px 24px 0px 0px;

    color: #fff;
    padding: 10px;
    box-sizing: border-box;
    font-size: 32px;

    p {
      margin: 20px;
      position: relative;

      span {
        &:last-child {
          position: absolute;
          left: 250px;
        }
      }
    }
  }

  .activityInfo {
    background-color: #fff;
    padding: 30px;
    border-radius: 24px 24px 0px 0px;
    flex-grow: 1;

    h4,
    h5 {
      padding: 0 30px 0;
      margin: 0;
      font-size: 36px;
      font-weight: 600;
    }

    h5 {
      padding-top: 30px;
    }
  }
}
</style>
<template>
  <div class="applyActivities">
    <div class="userInfo">
      <p><span> <van-icon name="user" />毕君秋 </span> <span><van-icon name="phone" />14962571994 </span></p>
      <p><van-icon name="friends" />计算机部门/AI技术研究开发组 </p>
    </div>
    <div class="activityInfo">
      <h4>活动信息</h4>
      <van-form input-align="right">
        <van-field v-model="formData" name="" label="活动名称" readonly placeholder="活动名称"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="formData" name="" label="负责人" placeholder="负责人" readonly
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field v-model="formData" name="" label="手机号" placeholder="手机号" readonly
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-form>
      <van-form @submit="onSubmit">
        <h5>选择申请材料</h5>
        <van-field readonly clickable name="picker" :value="value" placeholder="点击选择申请材料" @click="showPicker = true" />
        <van-popup v-model="showPicker" position="bottom">
          <!-- <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" /> -->
        </van-popup>
        <h5>使用信息</h5>
        <van-field required v-model="formData" name="" label="使用地点" placeholder="手机号"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <van-field required readonly clickable name="datetimePicker" :value="value" label="时间选择" placeholder="点击选择时间"
          @click="showPicker = true" />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker type="time" @cancel="showPicker = false" />
        </van-popup>
        <van-field required autosize type="textarea" rows="2" maxlength="100" show-word-limit v-model="formData" name=""
          label="使用原因" placeholder="手机号" :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field name="uploader" label="文件上传">
          <template #input>
            <!-- <van-uploader v-model="uploader" /> -->
          </template>
        </van-field>
        <van-field v-model="formData" autosize type="textarea" rows="2" maxlength="144" show-word-limit label="备注"
          placeholder="备注" />

        <div style="margin: 16px;">
          <van-button round block native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(11)
const showPicker = ref(false)
const formData = ref(1)
const onSubmit = () => { }
</script>