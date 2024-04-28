<style lang="less" scoped>
// :deep(.van-field__label){
//   color: #B4B4B4;
// }

.eventDetails {
  background-color: #EDEDED;
  position: relative;
  // padding-top: 5px;
  // display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  overflow: auto;

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
    color: #000;
    font-size: 18px;
    font-weight: 600;
    margin: 0 15px;
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

    &.back_white {
      background-color: white;
    }

    p {
      margin: 3px 0 0;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .userInfo {
    margin: auto;
    width: 345px;
    height: 82px;
    background: white;
    border-radius: 12px;

    color: #000;
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
    margin: 15px;
    padding: 15px 5px;
    border-radius: 12px;
    flex-grow: 1;
    box-sizing: content-box;
    height: 80px;
    // padding-bottom: 65px;

    h4,
    h5 {
      padding: 0 15px 0;
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .activityStateInfo {
    background-color: #fff;
    margin: 15px;
    padding: 15px 20px;
    border-radius: 12px;
    flex-grow: 1;
    box-sizing: content-box;
    // height: 80px;

    &>div {
      // display: flex;
      color: #B4B4B4;

      &>p {
        display: flex;
        justify-content: space-between;
      }

      &>p:first-child {
        color: #000;
        display: block;

        &::before {
          display: inline-block;
          content: " ";
          width: 12px;
          height: 12px;
          margin-right: 15px;
          background: #2488FF;
          border-radius: 12px;
        }
      }
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
    background-color: #fff;
    display: flex;
    gap: 10px;
  }

  .subBtn {
    position: fixed;
    bottom: 0;
    height: 60px;
    left: 0;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    align-items: center;
  }
}
</style>
<template>
  <div class="eventDetails">
    <template v-for="(item, index) in activityInfo.audit_project">
      <p style="margin: 15px 15px 10px 15px; font-size: 16px; line-height: 20px;">{{ index + 1 }}、{{ item.audit_name }}
      </p>
      <div class="activityState back_white">
        <p>{{ item.audit_content }}</p>
        <div style="background-color: aqua;">
          <van-field readonly name="uploader" label="">
            <template #input>
              <van-uploader readonly :deletable="false" v-model="item.image_urls" :after-read="afterRead" multiple
                :max-count="item.image_urls.length" />
            </template>
          </van-field>
        </div>
        <p style="color: #666;"><van-icon name="location-o" />{{ activityInfo.local_name }}</p>
      </div>
    </template>
    <div class="activityInfo">
      <van-form input-align="right">
        <van-field v-model="activityInfo.local_name" name="" label="区域位置" readonly placeholder="当前地址" />
        <van-field v-model="activityInfo.submit_time" name="" label="提交时间" placeholder="17点06分" readonly />
      </van-form>
    </div>
    <p v-if="activityInfo.audit_result && activityInfo.audit_result.length"
      style="margin: 15px 15px 10px 15px; font-size: 16px; line-height: 20px;">审核内容
    </p>
    <div class="activityStateInfo" v-if="activityInfo.audit_result && activityInfo.audit_result.length">
      <div v-for="item in activityInfo.audit_result">
        <p>{{ item.created_at }}</p>
        <p>审核结果 <span :style="{ color: item.audit_record_status_name == '退回' ? 'red' : '#2488FF' }">{{
          item.audit_record_status_name }}</span></p>
        <p>审核人 <span style="color: #000;">{{ item.audit_user }}</span></p>
        <p>审核原因 <span style="color: #000;">{{ item.audit_content }}</span></p>
      </div>
    </div>

    <div class="btnBox subBtn">
      <van-button @click="$router.go(-1)" round block>返回</van-button>
      <van-button type="primary" native-type="submit" round block>去修改</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from "vue";
import { getCheckRecordDetail, upload, } from "@/api/index"
import { useRouter } from "vue-router";
import { showToast, showConfirmDialog } from 'vant';

const router = useRouter()
const imgArr = [{ url: 'https://img.yzcdn.cn/vant/cat.jpeg' }, { url: 'https://img.yzcdn.cn/vant/cat.jpeg' }, { url: 'https://img.yzcdn.cn/vant/cat.jpeg' }, { url: 'https://img.yzcdn.cn/vant/cat.jpeg' }]

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
        file: reportFileArr.value.length > 0 ? reportFileArr.value[0] : null,
      }

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

}

const btnCancel = () => {

  showConfirmDialog({
    message: '确定要撤销申请?',
  }).then(() => {
    cancel()
  }).catch(() => {
  });
}

const reportFileArr = ref([])

const cancel = async () => {
  const query = {
    id: router.currentRoute.value.query.id,
  }

}

const btnText = ref({
  label: '',
  status: null,
  placeholder: '',
  height: '260px',
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
        placeholder: '同意理由:',
        height: '260px',
      }
      break;

    case 3:
      btnText.value = {
        label: '驳回',
        status: status,
        placeholder: '驳回理由:',
        height: '260px',
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
  activity: {},
  file: [],
})

const beforeFilrRead = (file) => {
  const fileType = ['pdf', 'docx', 'doc', 'txt', 'xlsx', 'xls']
  if (file instanceof Array) {
    for (let index = 0; index < file.length; index++) {
      if (fileType.indexOf(file[index].name.split('.').reverse()[0]) == -1) {
        showToast('只能上传' + fileType.join() + '文件')
        return false;
      }
    }
  } else {
    if (fileType.indexOf(file.name.split('.').reverse()[0]) == -1) {
      showToast('只能上传' + fileType.join() + '文件')
      return false;
    }
    return true;
  }
};

const afterRead = async (e) => {
  if (e instanceof Array) {
    for (let index = 0; index < e.length; index++) {
      let file = e[index].file
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('type', '2')
    }
  } else {
    let file = e.file
    let param = new FormData()
    param.append('file', file, file.name)
    param.append('type', '2')
  }
}

const afterFileRead = async (e) => {
  if (e instanceof Array) {
    for (let index = 0; index < e.length; index++) {
      let file = e[index].file
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('type', '1')
      // reportFileArr.value[reportFileArr.value.length - 1].url = data.data.url;
      // reportFileArr.value[reportFileArr.value.length - 1].name = file.name;
      // reportFileArr.value[reportFileArr.value.length - 1].file_tpye = file.type;
      // delete reportFileArr.value[reportFileArr.value.length - 1].objectUrl
      // delete reportFileArr.value[reportFileArr.value.length - 1].content
    }
  } else {
    let file = e.file
    let param = new FormData()
    param.append('file', file, file.name)
    param.append('type', '1')
    // const data = await upload(param)
    // reportFileArr.value[reportFileArr.value.length - 1].url = data.data.url;
    // reportFileArr.value[reportFileArr.value.length - 1].name = file.name;
    // reportFileArr.value[reportFileArr.value.length - 1].file_tpye = file.type;
    // delete reportFileArr.value[reportFileArr.value.length - 1].objectUrl
    // delete reportFileArr.value[reportFileArr.value.length - 1].content
  }
}


onMounted(async () => {
  const data: any = (await getCheckRecordDetail({ id: router.currentRoute.value.query.id })).data
  data.file = data.file ? [data.file] : []
  data.report_file = data.report_file ? [data.report_file] : []
  data.audit_project.forEach(item => {
    item.image_urls = item.image_urls ? item.image_urls.map(img => ({ url: img })) : []
  })
  activityInfo.value = data

  // activityInfo.value.attachment ? activityInfo.value.attachment.forEach((itme, index) => {
  //   activityInfo.value.attachment[index] = { url: itme }
  // }) : activityInfo.value.attachment = []

  // activityInfo.value.report_image ? activityInfo.value.report_image.forEach((itme, index) => {
  //   itme && (activityInfo.value.report_image[index] = { url: itme })
  // }) : activityInfo.value.report_image = []
})

</script>