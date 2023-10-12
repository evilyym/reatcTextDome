<template>
  <div class="formbox">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol" layout="Inline">
      <a-form-item label="姓名">
        <a-input />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input />
      </a-form-item>
      <a-form-item label="身份证">
        <a-input />
      </a-form-item>
      <a-form-item label="来访时间">
        <a-date-picker showTime style="width: 100%" />
      </a-form-item>
      <a-form-item label="离开时间">
        <a-date-picker show-time style="width: 100%" />
      </a-form-item>
      <a-form-item label="车牌号">
        <a-input />
      </a-form-item>
      <a-form-item label="车辆照片">
        <a-upload action="/upload.do" list-type="picture-card">
          <div>
            <!-- <PlusOutlined /> -->
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-button>提交表单</a-button>
    </a-form>
  </div>
</template>

<script lang="ts" setup>

const labelCol = { offset:1,span:3};
const wrapperCol = { span: 16};

</script>
<style scoped lang="less">
.formbox{
  border-radius: 10px;
  border: 1px solid #333;
  width: 80vw;
  height: 85vh;
  /* min-width: 750px; */
  a-form-item{
    width: 100%;
  }
}
</style>