<style lang="less" scoped>
.applyActivities {
  position: relative;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;

  .userInfo {
    margin: auto;
    width: 345px;
    height: 82px;
    background: #1677FF;
    // box-shadow: 0px 12 24px 0px rgba(22, 119, 255, 0.3);
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
}

.dialog {
  padding: 10px 0;
  border-radius: 12px 12px 0px 0px;

  h4 {
    text-align: center;
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


.van-swipe-cell__right {
  top: 5px;
  width: 60px;
  height: 32px;
  background: #FF3141;
  font-size: 15px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 33px;
  text-align: center;
  border-radius: 5px;
}
</style>
<template>
  <div class="applyActivities">
    <div class="userInfo">
      <p><span> <van-icon name="user" />{{ userInfo.name }} </span> <span><van-icon name="phone" />{{ userInfo.phone }}
        </span></p>
      <p><van-icon name="friends" /> {{ userInfo.dep_name }} </p>
    </div>
    <div class="activityInfo">
      <h4>活动信息</h4>
      <van-form input-align="right">
        <van-field v-model="activityInfo.name" name="" label="服务内容:" readonly placeholder="服务内容" />
        <van-field v-model="activityInfo.leader_name" name="" label="负责人:" placeholder="负责人" readonly />
        <van-field v-model="activityInfo.leader_phone" name="" label="手机号:" placeholder="手机号" readonly />
      </van-form>
      <van-form @submit="onSubmit" label-align="top">
        <h5>申请材料</h5>
        <van-swipe-cell right-width="60" v-for="(item) in materialArr">
          <van-field :label="item.name" label-align="left" input-align="right">
            <template #input>
              <van-stepper v-model="item.addNumber" />
            </template>
          </van-field>
          <view slot="right" class="van-swipe-cell__right" @click="delMateria(item.index)">删除</view>
        </van-swipe-cell>

        <van-field is-link readonly name="picker" label="" placeholder="点击新增材料"
          @click="(activitiesInfo.length > 0) ? (showPicker = true) : (showToast('没有可用材料'))" />

        <van-popup v-model:show="showPicker" closeable position="bottom" class="dialog">
          <h4>材料选择</h4>
          <van-checkbox-group v-model="materialArr">
            <van-cell-group inset>
              <van-cell v-for="(item, index) in activitiesInfo" clickable :key="item" :title="`${item.name}`"
                :dataSet="item.index = index" @click="toggle(index)">
                <template #right-icon>
                  <van-checkbox :name="item" :ref="el => checkboxRefs[index] = el" @click.stop />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
          <van-button type="primary" round block @click="showPicker = false">确定</van-button>
        </van-popup>
        <h5>使用信息</h5>
        <van-field required v-model="formData.usage_location" name="" label="地点:" placeholder="请输入地点"
          :rules="[{ required: true, message: '请输入地点' }]" />

        <van-field required is-link readonly label="开始时间:" v-model="formData.usage_start_time" @click="showDate = true"
          placeholder="请选择使用开始时间" :rules="[{ required: true, message: '请选择使用开始时间' }]" />
        <van-field required is-link readonly label="完成时间:" v-model="formData.usage_end_time" @click="showEndDate = true"
          placeholder="请选择使用完成时间" :rules="[{ required: true, message: '请选择使用完成时间' }]" />

        <van-field required autosize type="textarea" rows="2" maxlength="100" show-word-limit
          v-model="formData.usage_reason" name="" label="原因:" placeholder="请输入使用原因"
          :rules="[{ required: true, message: '请输入使用原因' }]" />

        <van-field name="uploader" label="上传图片:" :rules="[{ message: '只能上传图片' }]">
          <template #input>
            <!-- :max-size="30 * 1024* 1024"  @oversize="onOversize" -->
            <van-uploader v-model="formData.usage_images" accept="image/*" :after-read="afterRead" multiple
              :max-count="3" />
          </template>
        </van-field>
        <van-field name="uploader" label="上传附件:" :rules="[{ message: '只能上传PDF,TXT,XLS,DOC文件' }]">
          <template #input>
            <van-uploader :max-count="1" v-model="formData.file" :after-read="afterFileRead" :before-read="beforeFilrRead"
              accept="text/plain, application/vnd.ms-excel, application/vnd.ms-works, application/msword, application/pdf">
              <van-button icon="plus" style="width: 100px" size="small" type="primary">上传附件</van-button>
            </van-uploader>
          </template>
        </van-field>
        <van-field v-model="formData.remark" autosize type="textarea" rows="2" maxlength="144" show-word-limit label="备注:"
          placeholder="备注" />

        <div style="margin: 16px;">
          <van-button type="primary" round block native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
    <!-- <van-calendar v-model:show="showDate" type="range" @confirm="" /> -->
    <van-popup v-model:show="showDate" position="bottom">
      <nut-date-picker v-model="startDate" is-show-chinese title="开始日期时间选择" type="datetime" :min-date="minDate"
        :max-date="formData.usage_end_time ? endDate : maxDate" @cancel="showDate = false"
        @confirm="onConfirm"></nut-date-picker>
    </van-popup>
    <van-popup v-model:show="showEndDate" position="bottom">
      <nut-date-picker v-model="endDate" is-show-chinese title="完成日期时间选择" type="datetime" :min-date="startDate || minDate"
        :max-date="maxEndDate" @cancel="showEndDate = false" @confirm="confirm"></nut-date-picker>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getActivityDetail, addActivity, upload } from "@/api/index"
import { useRouter } from "vue-router";
import { showToast, showConfirmDialog } from 'vant';
import '@nutui/nutui/dist/packages/toast/style';


const router = useRouter()

const materialArr = ref([]);
const checkboxRefs = ref([]);
const toggle = (index) => {
  checkboxRefs.value[index].toggle();
};

// const onOversize = () => {
//   showToast('文件大小不能超过 30 MB');
// };

const showPicker = ref(false)
const formData = ref<any>({
  file: []
})
const onSubmit = () => {

  showConfirmDialog({
    message: '确定要提交申请?',
  }).then(() => {
    submit()
  }).catch(() => {
  });
}

const submit = async () => {
  let materialsArr = []
  materialArr.value.forEach(itme => {
    materialsArr.push({
      "id": itme.id,
      "number": itme.addNumber,
      "unit": itme.unit,
      "name": itme.name,
    })
  })
  const usage_imagesArr = ref([])
  const usage_fileArr = ref([])

  formData.value.usage_images && formData.value.usage_images.forEach((itme) => {
    usage_imagesArr.value.push(itme.url)
  })
  formData.value.file && formData.value.file.forEach((itme) => {
    usage_fileArr.value.push({ url: itme.url, type: itme.type, name: itme.name })
  })
  const query = {
    ...formData.value,
    id: activityInfo.value.id,
    materials: materialsArr,
    usage_images: usage_imagesArr.value,
    file: usage_fileArr.value.length > 0 ? usage_fileArr.value[0] : null,
  }
  const data = (await addActivity(query))
  if (data.code == 200) {
    setTimeout(() => {
      router.go(-1)
    }, 500);
  } else {
    showToast(data.msg)
  }
}

const userInfo = ref<any>({})
const activityInfo = ref<any>({})
const activitiesInfo = ref<any>([])

const showDate = ref(false)
const showEndDate = ref(false)

// const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? '' : 0}${date.getMonth() + 1}-${date.getDate() > 9 ? '' : 0}${date.getDate()}`;

const onConfirm = ({ selectedValue }: { selectedValue: any }) => {
  // const [start, end] = values;
  showDate.value = false;
  // const date = `${formatDate(start)} 至 ${formatDate(end)}`;
  // formData.value.date = date
  // formData.value.usage_start_time = formatDate(start);
  // formData.value.usage_end_time = formatDate(end)

  const date = selectedValue.slice(0, 3).join("-");
  const time = selectedValue.slice(3).join(":");
  formData.value.usage_start_time = date + " " + time;
  showDate.value = false;
};

const minDate = new Date();
const maxDate = new Date(minDate.getFullYear() + 2, minDate.getMonth(), minDate.getDay());
const maxEndDate = new Date(minDate.getFullYear() + 3, minDate.getMonth(), minDate.getDay());
const startDate = new Date();
const endDate = new Date();

const confirm = ({ selectedValue }: { selectedValue: any }) => {
  const date = selectedValue.slice(0, 3).join("-");
  const time = selectedValue.slice(3).join(":");
  formData.value.usage_end_time = date + " " + time;
  showEndDate.value = false;
};

const beforeFilrRead = (file) => {
  const fileType = ['pdf', 'docx', 'doc', 'txt', 'xlsx', 'xls']
  if (fileType.indexOf(file.name.split('.').reverse()[0]) == -1) {
    showToast('只能上传' + fileType.join() + '文件')
    return false;
  }
  return true;
};

const afterRead = async (e) => {
  if (e instanceof Array) {
    for (let index = 0; index < e.length; index++) {
      let file = e[index].file
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('type', '2')
      const data = await upload(param)
      formData.value.usage_images[index].url = data.data.url;
      delete formData.value[formData.value.length - 1].objectUrl

    }
  } else {
    let file = e.file
    let param = new FormData()
    param.append('file', file, file.name)
    param.append('type', '2')
    const data = await upload(param)
    formData.value.usage_images[formData.value.usage_images.length - 1].url = data.data.url;
  }
}

const afterFileRead = async (e) => {
  if (e instanceof Array) {
    for (let index = 0; index < e.length; index++) {
      let file = e[index].file
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('type', '1')
      const data = await upload(param)
      formData.value.file[formData.value.file.length - 1].url = data.data.url;
      formData.value.file[formData.value.file.length - 1].name = file.name;
      formData.value.file[formData.value.file.length - 1].file_tpye = file.type;
      delete formData.value.file[formData.value.length - 1].objectUrl
    }
  } else {
    let file = e.file
    let param = new FormData()
    param.append('file', file, file.name)
    param.append('type', '1')
    const data = await upload(param)
    formData.value.file[formData.value.file.length - 1].url = data.data.url;
    formData.value.file[formData.value.file.length - 1].name = file.name;
    formData.value.file[formData.value.file.length - 1].file_tpye = file.type;
    delete formData.value.file[formData.value.length - 1].objectUrl
  }
}
const delMateria = (index) => {
  checkboxRefs.value[index].toggle();
}

onMounted(async () => {
  const data = (await getActivityDetail({ id: router.currentRoute.value.query.id })).data
  userInfo.value = data.user_info
  activityInfo.value = data.activity
  activitiesInfo.value = data.materials
})

</script>