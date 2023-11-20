<style lang="less" scoped>
.eventDetails {
  position: relative;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;

  .activityState {
    background-color: #1677FF;
    width: 345px;
    margin: auto;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin: 15px;
    padding: 15px;
    border-radius: 15px;
    box-sizing: border-box;
  }

  .userInfo {
    margin: auto;
    width: 345px;
    height: 82px;
    background: #1677FF;
    border-radius: 12px 12px 0px 0px;

    color: #fff;
    padding: 5px;
    box-sizing: border-box;
    font-size: 16px;

    p {
      margin: 10px;
      position: relative;

      span {
        &:last-child {
          position: absolute;
          left: 125px;
        }
      }
    }
  }

  .activityInfo {
    background-color: #fff;
    padding: 15px;
    border-radius: 12px 12px 0px 0px;
    flex-grow: 1;

    h4,
    h5 {
      padding: 0 15px 0;
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    h5 {
      padding-top: 15px;
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
          <van-picker :columns="columns"  @cancel="showPicker = false" />
        </van-popup>

        <h5>使用信息</h5>
        <van-field v-model="formData" name="" label="使用地点" placeholder="手机号"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <van-field v-model="result" is-link readonly name="picker" label="选择器" placeholder="点击选择城市"
          @click="showPicker = true" />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker :columns="columns"  @cancel="showPicker = false" />
        </van-popup>
        <van-field v-model="formData" name="" label="使用原因" placeholder="手机号"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader />
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
const result=ref(1)
const showPicker = ref(false), formData = ref(1), columns = ref(['1', '2', '3', '4']), onSubmit = () => { }

</script>