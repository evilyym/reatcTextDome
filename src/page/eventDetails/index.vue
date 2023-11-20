<style lang="less" scoped>
.eventDetails {
  position: relative;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;

  .activityState {
    background-color: #1677FF;
    width: 690px;
    margin: auto;
    color: #fff;
    font-size: 36px;
    font-weight: 600;
    margin: 30px;
    padding: 30px;
    border-radius: 30px;
    box-sizing: border-box;
  }

  .userInfo {
    margin: auto;
    width: 690px;
    height: 164px;
    background: #1677FF;
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
  <div class="eventDetails">
    <div class="activityState">
      <van-icon name="clock" />审核中
    </div>

    <div class="userInfo">
      <p><span> <van-icon name="user" />毕君秋 </span> <span><van-icon name="phone" />14962571994 </span></p>
      <p><van-icon name="friends" />计算机部门/AI技术研究开发组 </p>
    </div>
    <div class="activityInfo">
      <van-form @submit="onSubmit">
        <van-field v-model="formData" name="" label="活动名称" placeholder="活动名称"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="formData" name="" label="负责人" placeholder="负责人"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field v-model="formData" name="" label="手机号" placeholder="手机号"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <h5>选择申请材料</h5>
        <van-field v-model="result" is-link readonly name="picker" label="选择器" placeholder="点击选择城市"
          @click="showPicker = true" />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>

        <h5>使用信息</h5>
        <van-field v-model="formData" name="" label="使用地点" placeholder="手机号"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <van-field v-model="result" is-link readonly name="picker" label="选择器" placeholder="点击选择城市"
          @click="showPicker = true" />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
        <van-field v-model="formData" name="" label="使用原因" placeholder="手机号"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader v-model="value" />
          </template>
        </van-field>
        <van-field v-model="formData" name="" label="备注" placeholder="手机号"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <div style="margin: 16px;">
          <van-button round block native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showPicker = ref(false), uploader = ref(1), formData = ref(1), columns = ref(['1', '2', '3', '4']), onSubmit = () => { }

</script>