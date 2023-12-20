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
    width: 345px;
    margin: auto;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin: 15px;
    padding: 15px;
    border-radius: 15px;
    box-sizing: border-box;

    .van-icon {
      margin-right: 10px;
    }

    &.back_blue {
      background-color: #1677FF;
    }

    &.back_green {
      background-color: #24B25F;
    }

    &.back_red {
      background-color: #F95965;
    }

    p {
      margin: 3px 0 0;
      padding-left: 28px;
      font-size: 16px;
      font-weight: 400;
    }
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
    width: 100%;
    box-sizing: border-box;

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
    <div class="activityState" :class="{
      back_blue: activityInfo.audit_status == 1,
      back_green: activityInfo.audit_status == 2,
      back_red: activityInfo.audit_status == 3
    }">
      <van-icon v-if="activityInfo.audit_status == 1" name="clock"></van-icon>
      <van-icon v-if="activityInfo.audit_status == 3" name="clear"></van-icon>
      <van-icon v-if="activityInfo.audit_status == 2" name="checked"></van-icon>
      {{ showText(activityInfo.audit_status) }}{{ activityInfo.report_status == 2 ? "，已确认" : "" }}
      <p>{{ activityInfo.reason }}</p>
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
        <van-field v-model="activityInfo.activity_name" name="" label="活动名称" readonly placeholder="活动名称" />
        <van-field v-model="activityInfo.leader_name" name="" label="负责人" placeholder="负责人" readonly />
        <van-field v-model="activityInfo.leader_phone" name="" label="手机号" placeholder="手机号" readonly />
      </van-form>
      <van-form label-align="top">
        <h5>申请材料</h5>
        <van-field readonly>
          <template #input>
            <div class="materialsBox">
              <div v-for="itme in activityInfo.materials">{{ itme.name }} {{ itme.number }} {{ itme.unit }}</div>
            </div>
          </template>
        </van-field>

        <h5>使用信息</h5>
        <van-field readonly v-model="activityInfo.usage_location" name="" label="使用地点" placeholder="请输入地点"
          :rules="[{ required: true, message: '请输入地点' }]" />

        <van-field readonly label="使用时间" placeholder="请选择使用时间" :rules="[{ required: true, message: '请选择使用时间' }]">
          <template #input>
            {{ activityInfo.usage_start_time }} 至 {{ activityInfo.usage_end_time }}
          </template>
        </van-field>

        <van-field readonly autosize type="textarea" rows="2" maxlength="100" v-model="activityInfo.usage_reason" name=""
          label="使用原因" placeholder="请输入使用原因" :rules="[{ required: true, message: '请输入使用原因' }]" />

        <van-field readonly name="uploader" label="上传图片">
          <template #input>
            <van-uploader readonly :deletable="false" v-model="activityInfo.attachment" :after-read="afterRead" multiple
              :max-count="3" />
          </template>
        </van-field>
        <van-field readonly v-model="activityInfo.remark" autosize type="textarea" maxlength="144" label="备注"
          placeholder="备注" />

        <van-field v-if="activityInfo.audit_status == 2 && activityInfo.report_reason" readonly
          v-model="activityInfo.report_reason" label="报备理由" autosize type="textarea"/>
        <van-field v-if="activityInfo.audit_status == 2 && activityInfo.report_reason" readonly
          v-model="activityInfo.report_amount" label="活动金额" />
        <van-field v-if="activityInfo.audit_status == 2 && activityInfo.report_reason" readonly name="uploader"
          label="报备图片">
          <template #input>
            <van-uploader readonly :deletable="false" v-model="activityInfo.report_image" :after-read="afterRead" multiple
              :max-count="3" />
          </template>
        </van-field>
        <div style="margin: 16px;" class="btnBox">
          <van-button type="primary" v-if="active == 2 && activityInfo.audit_status == 1" @click="btnClick(1)" round
            block>撤销</van-button>
          <van-button type="primary" v-if="active == 1 && activityInfo.audit_status == 1" @click="btnClick(2)" round
            block>通过</van-button>
          <van-button type="primary" v-if="active == 1 && activityInfo.audit_status == 1" @click="btnClick(3)" round
            block>驳回</van-button>
          <van-button type="primary"
            v-if="active == 1 && activityInfo.audit_status == 2 && activityInfo.reporter_phone && !activityInfo.report_reason"
            @click="btnClick(4)" round block>报备</van-button>
          <van-button type="primary"
            v-if="active == 2 && activityInfo.audit_status == 2 && activityInfo.report_status == 1 && activityInfo.report_reason"
            @click="btnConfirm" round block>确认</van-button>
        </div>
      </van-form>
    </div>
    <van-popup v-model:show="showBottom" round position="bottom" class="dialog" closeable
      :style="{ height: btnText.height }">
      <h4>{{ btnText.label }}</h4>
      <van-form label-align="top" @submit="onSubmit">
        <van-field required v-model="auditInfo.reason" v-if="btnText.status != 4" autosize type="textarea" rows="3"
          maxlength="144" show-word-limit :label="btnText.placeholder" :placeholder="btnText.placeholder"
          :rules="[{ required: true, message: '理由必须输入' }]" />

        <van-field required v-model="auditInfo.report_reason" v-if="btnText.status == 4" autosize type="textarea" rows="3"
          maxlength="144" show-word-limit label="报备理由" placeholder="请输入报备理由"
          :rules="[{ required: true, message: '请输入报备理由' }]" />
        <van-field required v-model="auditInfo.report_amount" type="number" v-if="btnText.status == 4" show-word-limit
          label="报备金额" placeholder="请输入报备金额" :rules="[{ required: true, message: '请输入报备金额' }]" />
        <van-field required name="uploader" label="上传图片" v-if="btnText.status == 4"
          :rules="[{ required: true, message: '必须上传图片' }]">
          <template #input>
            <van-uploader v-model="auditInfo.report_image" :after-read="afterRead" multiple :max-count="3" />
          </template>
        </van-field>
        <van-button type="primary" round block native-type="submit">确定</van-button>
      </van-form>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from "vue";
import { getRecordsDetail, setAudit, upload, setReport, setConfirm, setCancel } from "@/api/index"
import { useRouter } from "vue-router";
import { showConfirmDialog } from "vant";
const router = useRouter()


const active: any = router.currentRoute.value.query.userType || inject("$active");

const showBottom = ref(false)

const onSubmit = async () => {
  let data, query;
  switch (btnText.value.status) {
    case 2:
    case 3:
      query = {
        ...auditInfo.value,
        id: router.currentRoute.value.query.id,
        status: btnText.value.status,
      }
      data = await setAudit(query)
      break;

    case 4:
      const report_imageArr = ref([])

      auditInfo.value.report_image && auditInfo.value.report_image.forEach((itme) => {
        report_imageArr.value.push(itme.url)
      })
      query = {
        ...auditInfo.value,
        id: router.currentRoute.value.query.id,
        report_image: report_imageArr.value,
      }
      data = await setReport(query)

      break;
  }
  showBottom.value = false
  if (data.code == 200) {
    setTimeout(() => {
      router.go(router.currentRoute.value.query.userType ? 0 : -1)
    }, 500);
  }
}

const btnConfirm = async () => {
  const query = {
    id: router.currentRoute.value.query.id,
  }

  const data = (await setConfirm(query))

  if (data.code == 200) {
    setTimeout(() => {
      router.go(router.currentRoute.value.query.userType ? 0 : -1)
    }, 500);
  }
}

const btnCancel = () => {

  showConfirmDialog({
    message: '确定要撤销申请?',
  }).then(() => {
    cancel()
  }).catch(() => {
  });
}

const cancel = async () => {
  const query = {
    id: router.currentRoute.value.query.id,
  }

  const data = (await setCancel(query))

  if (data.code == 200) {
    setTimeout(() => {
      router.go(-1)
    }, 300);
  }
}

const btnText = ref({
  label: '',
  status: null,
  placeholder: '',
  height: '40%',
})
const auditInfo: { [name: string]: any } = ref({
  report_image: []
})

const btnClick = (status) => {
  showBottom.value = true
  // 同意驳回理由
  switch (status) {
    case 1:
      showBottom.value = false
      btnCancel()
      break;

    case 2:
      btnText.value = {
        label: '同意',
        status: status,
        placeholder: '同意理由',
        height: '40%',
      }
      break;

    case 3:
      btnText.value = {
        label: '驳回',
        status: status,
        placeholder: '驳回理由',
        height: '40%',
      }
      break;
    case 4:
      btnText.value = {
        label: '报备',
        status: status,
        placeholder: '',
        height: '70%',
      }
      break;
  }

}
const activityInfo = ref<any>({
  activity: {}
})

const afterRead = async (e) => {
  if (e instanceof Array) {
    for (let index = 0; index < e.length; index++) {
      let file = e[index].file
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('type', '2')
      const data = await upload(param)
      auditInfo.value.report_image[index].url = data.data.url;
    }
  } else {
    let file = e.file
    let param = new FormData()
    param.append('file', file, file.name)
    param.append('type', '2')
    const data = await upload(param)
    auditInfo.value.report_image[auditInfo.value.report_image.length - 1].url = data.data.url;
  }
}

const showText = (key) => {
  switch (key) {
    case 1:
      return '待审核'
    case 2:
      return '审核通过'
    case 3:
      return '审核驳回'

  }
}

onMounted(async () => {
  const data: any = (await getRecordsDetail({ id: router.currentRoute.value.query.id })).data
  activityInfo.value = data

  activityInfo.value.attachment ? activityInfo.value.attachment.forEach((itme, index) => {
    activityInfo.value.attachment[index] = { url: itme }
  }) : activityInfo.value.attachment = []

  activityInfo.value.report_image ? activityInfo.value.report_image.forEach((itme, index) => {
    itme && (activityInfo.value.report_image[index] = { url: itme })
  }) : activityInfo.value.report_image = []
})

</script>