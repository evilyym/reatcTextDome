<style lang="less" scoped>
.eventDetails {
  position: relative;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;

  .dialog {
    padding: 10px 0;
    border-radius: 12px 12px 0px 0px;

    h4 {
      text-align: center;
      margin: 0;
      height: 40px;
      line-height: 35px;
      border-bottom: 1px solid #aaa;
    }

    button {
      margin: 5px auto;
      box-sizing: border-box;
      width: 340px;
    }
  }

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

  .materialsBox {
    display: flex;
    gap: 10px;
    flex-direction: row;
    flex-wrap: wrap;

    &>div {
      height: 34px;
      padding: 0 15px;
      background: #F5F5F5;
      border-radius: 4px;
      line-height: 34px;
      text-align: center;
      font-size: 16px;
    }
  }

  .btnBox {
    display: flex;
    gap: 10px;
  }
}
</style>
<template>
  <div class="eventDetails">
    <div class="activityState">
      <van-icon name="clock" />审核中
    </div>

    <div class="userInfo">
      <p><span> <van-icon name="user" />{{ activityInfo.name }} </span> <span><van-icon name="phone" />{{
        activityInfo.phone }}
        </span></p>
      <p><van-icon name="friends" /> {{ activityInfo.department }} </p>
    </div>
    <div class="activityInfo">
      <h4>活动信息</h4>
      <van-form input-align="right">
        <van-field v-model="activityInfo.activity.name" name="" label="活动名称" readonly placeholder="活动名称" />
        <van-field v-model="activityInfo.activity.leader_name" name="" label="负责人" placeholder="负责人" readonly />
        <van-field v-model="activityInfo.activity.leader_phone" name="" label="手机号" placeholder="手机号" readonly />
      </van-form>
      <van-form label-align="top">
        <h5>申请材料</h5>
        <van-field readonly>
          <template #input>
            <div class="materialsBox">
              <div v-for="itme in activityInfo.materials">{{ itme.name }}{{ itme.number }}{{ itme.unit }}</div>
            </div>
          </template>
        </van-field>

        <h5>使用信息</h5>
        <van-field readonly v-model="activityInfo.usage_location" name="" label="使用地点" placeholder="请输入地址"
          :rules="[{ required: true, message: '请输入地址' }]" />

        <van-field readonly label="使用时间" placeholder="请选择使用时间" :rules="[{ required: true, message: '请选择使用时间' }]">
          <template #input>
            {{ activityInfo.usage_start_time }} 至 {{ activityInfo.usage_start_time }}
          </template>
        </van-field>

        <van-field readonly autosize type="textarea" rows="2" maxlength="100" show-word-limit
          v-model="activityInfo.usage_reason" name="" label="使用原因" placeholder="请输入使用原因"
          :rules="[{ required: true, message: '请输入使用原因' }]" />

        <van-field readonly name="uploader" label="文件上传" :rules="[{ required: true, message: '必须上传图片' }]">
          <template #input>
            <van-uploader readonly :deletable="false" v-model="activityInfo.attachment" :after-read="afterRead" multiple
              :max-count="3" />
          </template>
        </van-field>
        <van-field readonly v-model="activityInfo.remark" autosize type="textarea" rows="2" maxlength="144"
          show-word-limit label="备注" placeholder="备注" />

        <div style="margin: 16px;" class="btnBox">
          <van-button type="primary" @click="btnClick(2)" round block>通过</van-button>
          <van-button type="primary" @click="btnClick(3)" round block>驳回</van-button>
        </div>
      </van-form>
    </div>
    <van-popup v-model:show="showBottom" round position="bottom" class="dialog" closeable :style="{ height: '40%' }">
      <h4>{{ btnText.label }}</h4>
      <van-form label-align="top" @submit="onSubmit">
        <van-field required v-model="auditInfo.reason" autosize type="textarea" rows="3" maxlength="144" show-word-limit
          :label="btnText.placeholder" :placeholder="btnText.placeholder" />
        <van-button type="primary" round block native-type="submit">确定</van-button>
      </van-form>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getRecordsDetail, setAudit, upload } from "@/api/index"
import { useRouter } from "vue-router";
// import { showSuccessToast, showFailToast } from 'vant';
import { showNotify } from 'vant';

const router = useRouter()
const showBottom = ref(false)

const formData = ref<any>({
})

const onSubmit = async (status) => {
  const query = {
    ...auditInfo.value,
    id: router.currentRoute.value.query.id,
    status: btnText.value.status,
  }

  const data = (await setAudit(query)).data
  showBottom.value = false

  showNotify({ type: 'success', message: data.msg });
  if (data.code == 200) {
    // showSuccessToast(data.msg)
    showNotify({ type: 'success', message: data.msg });
    setTimeout(() => {
      router.go(-1)
    }, 500);
  } else {
    // showFailToast(data.msg);
    showNotify({ type: 'danger', message: data.msg });

  }
}
const btnText = ref({
  label: '',
  status: null,
  placeholder: ''
})
const auditInfo = ref({})

const btnClick = (status) => {
  showBottom.value = true
  // 同意驳回理由
  switch (status) {
    case 2:
      btnText.value = {
        label: '同意',
        status: status,
        placeholder: '同意理由'
      }
      break;

    case 3:
      btnText.value = {
        label: '驳回',
        status: status,
        placeholder: '驳回理由'
      }
      break;
  }

}
const activityInfo = ref<any>({
  activity: {}
})

const afterRead = async (e) => {
  let file = e.file
  let param = new FormData()
  param.append('file', file, file.name)
  param.append('type', '2')
  const data = await upload(param)
  formData.value.usage_images[formData.value.usage_images.length - 1].url = data.data.url;
}

onMounted(async () => {
  const data: any = (await getRecordsDetail({ id: router.currentRoute.value.query.id })).data
  activityInfo.value = data

  activityInfo.value.attachment && activityInfo.value.attachment.forEach((itme, index) => {
    activityInfo.value.attachment[index] = { url: itme }
  })
})

</script>