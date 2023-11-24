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
        <van-field v-model="activityInfo.name" name="" label="活动名称" readonly placeholder="活动名称" />
        <van-field v-model="activityInfo.leader_name" name="" label="负责人" placeholder="负责人" readonly />
        <van-field v-model="activityInfo.leader_phone" name="" label="手机号" placeholder="手机号" readonly />
      </van-form>
      <van-form @submit="onSubmit" label-align="top">
        <h5>选择申请材料</h5>
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
        <van-field required v-model="formData.usage_location" name="" label="使用地点" placeholder="请输入地址"
          :rules="[{ required: true, message: '请输入地址' }]" />

        <van-field required label="使用时间" v-model="formData.date" @click="showDate = true" placeholder="请选择使用时间"
          :rules="[{ required: true, message: '请选择使用时间' }]" />
        <van-calendar v-model:show="showDate" type="range" @confirm="onConfirm" />

        <van-field required autosize type="textarea" rows="2" maxlength="100" show-word-limit
          v-model="formData.usage_reason" name="" label="使用原因" placeholder="请输入使用原因"
          :rules="[{ required: true, message: '请输入使用原因' }]" />

        <van-field required name="uploader" label="文件上传" :rules="[{ required: true, message: '必须上传图片' }]">
          <template #input>
            <van-uploader v-model="formData.usage_images" :after-read="afterRead" multiple :max-count="3" />
          </template>
        </van-field>
        <van-field v-model="formData.remark" autosize type="textarea" rows="2" maxlength="144" show-word-limit label="备注"
          placeholder="备注" />

        <div style="margin: 16px;">
          <van-button type="primary" round block native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getActivityDetail, addActivity, upload } from "@/api/index"
import { useRouter } from "vue-router";
import { showToast, showConfirmDialog  } from 'vant';

const router = useRouter()

const materialArr = ref([]);
const checkboxRefs = ref([]);
const toggle = (index) => {
  checkboxRefs.value[index].toggle();
};


const showPicker = ref(false)
const formData = ref<any>({
})
const onSubmit = () => {

  showConfirmDialog ({
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
      "number": itme.addNumber
    })
  })
  const usage_imagesArr = ref([])

  formData.value.usage_images && formData.value.usage_images.forEach((itme) => {
    usage_imagesArr.value.push(itme.url)
  })
  const query = {
    ...formData.value,
    id: activityInfo.value.id,
    materials: materialsArr,
    usage_images: usage_imagesArr.value,
  }
  const data = (await addActivity(query))
  if (data.code == 200) {
    setTimeout(() => {
      router.go(-1)
    }, 500);
  }
}

const userInfo = ref<any>({})
const activityInfo = ref<any>({})
const activitiesInfo = ref<any>([])

const showDate = ref(false)

const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? '' : 0}${date.getMonth() + 1}-${date.getDate() > 9 ? '' : 0}${date.getDate()}`;

const onConfirm = (values) => {
  const [start, end] = values;
  showDate.value = false;
  const date = `${formatDate(start)} 至 ${formatDate(end)}`;
  formData.value.date = date
  formData.value.usage_start_time = formatDate(start);
  formData.value.usage_end_time = formatDate(end)
};

const afterRead = async (e) => {
  let file = e.file
  let param = new FormData()
  param.append('file', file, file.name)
  param.append('type', '2')
  const data = await upload(param)
  formData.value.usage_images[formData.value.usage_images.length - 1].url = data.data.url;
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