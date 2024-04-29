<template>
  <div class="applicationResults">
    <van-tabs v-model:active="active" color="#2488FF" style="" background="#fff" title-inactive-color="#333"
      title-active-color="#2488FF">
      <van-tab title="检查提交">
        <br>
        <div class="listBox">
          <van-form input-align="left">
            <van-field v-model="activityInfo.type_name" is-link readonly label="维护类型" placeholder="请选择维护类型"
              @click="(showPicker = true)" />
            <van-popup v-model:show="showPicker" round position="bottom">
              <van-picker :columns="columns" :columns-field-names="{
                text: 'type_name',
                value: 'id',
              }" @cancel="showPicker = false" @confirm="onConfirm" />
            </van-popup>

            <van-field v-model="activityInfo.adrres" is-link readonly label="添加定位" placeholder="点击添加定位"
              @click="showMap = true" />
          </van-form>
        </div>

        <van-form @submit="setCreateMaintenance(true)" @failed="onFailed" :show-error="true" :show-error-message="true"
          v-if="activityInfo.type" style="background-color: #ededed;padding-bottom: 90px;">
          <template v-for="(item, index) in numberOfSteps">
            <p style="padding: 15px 15px 10px 15px; margin: 0; font-size: 16px; line-height: 20px;">{{ item.audit_name
              }}</p>
            <div class="activityState back_white">
              <van-field :disabled="item.boolean" :rules="[{ required: true, message: '此项必填' }]"
                v-if="item.submit_type.includes(1) || item.submit_type.includes('1')" v-model="item.audit_content"
                placeholder="请输入不少于10个字的描述" rows="3" maxlength="144" autosize type="textarea" show-word-limit />
              <div v-if="item.submit_type.includes(2) || item.submit_type.includes('2')"
                style="background-color: aqua;">
                <van-field readonly name="uploader" label="" :rules="[{ required: true, message: '图片必传' }]">
                  <template #input>
                    <van-uploader :disabled="item.boolean" :deletable="false" v-model="item.image_urls"
                      :after-read="(e) => afterFileRead(e, item)" multiple :max-count="5" />
                  </template>
                </van-field>
              </div>
              <van-button style="color: #2488FF;" v-if="index + 1 < numberOfSteps.length" type="default" block
                @click="() => numberOfSteps[index + 1].boolean = false">确定</van-button>
            </div>
          </template>
          <div class="btnBox subBtn">
            <van-button @click="setCreateMaintenance(false)" round block>暂存</van-button>
            <van-button type="primary" native-type="submit" round block>提交</van-button>
          </div>
        </van-form>
      </van-tab>

      <van-tab title="提交记录">
        <van-field v-model="date" is-link readonly label="" placeholder="日期选择" @click="showDate = !showDate" />
        <div style=""></div>
        <van-calendar first-day-of-week="1" :default-date="[new Date(), new Date()]" :allow-same-day="true"
          :min-date="minDate" :max-date="maxDate" v-model:show="showDate" type="range" @confirm="getDate" />
        <br>
        <div class="listBox listBoxBold">
          <div class="listStatus">
            <van-dropdown-menu>
              <van-dropdown-item v-model="dropdownStatus" :options="listDown" />
              <!-- <van-dropdown-item v-model="value2" :options="option2" /> -->
            </van-dropdown-menu>
          </div>
          <template v-for="itme in checkRecordList.results">
            <div class="cirdBox" @click="initiateActivities(itme)">
              <h4>{{ itme.maintenance_type_name }}</h4>
              <p style="display: block;">
                <span>
                  {{ itme.created_at }} </span>
              </p>
              <div class="statusBox" :class="{
                'color-blue': itme.status == 1,
                'color-red': itme.status == 3,
                'color-orange': itme.status == 2,
              }">{{ itme.status_name }}</div>
              <div class="rightArrow"></div>
              <hr>
            </div>
          </template>
          <van-empty v-if="checkRecordList.count < 1" description="暂无数据"></van-empty>
        </div>
      </van-tab>
    </van-tabs>
    <div class="submitMsg" v-if="submitStatue">
      <div>
        <van-icon size="42px" color="#2488FF" name="passed" />
        <p style="margin: 10px 0 0 0;font-size: 18px;">提交成功</p>
        <p style="margin: 0 0 15px 0;font-size: 12px; color: rgba(0, 0, 0, .5);">您已成功提交反馈，感谢您的配合！</p>
      </div>
      <van-button round type="default" @click="() => { submitStatue = false; active = 1 }">查看提交记录</van-button>
    </div>
    <van-popup v-model:show="showMap" :style="{ width: '100%', height: '100%' }">
      <Map @getAddress="(e) => { activityInfo.adrres = e; showMap = false }" />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import Map from './map.vue'
import { ref, onMounted, inject, watch } from "vue";
import {
  getTypeSubmitSet, getMaintenanceType, getCheckRecordDetail,
  getCheckRecordList, upload, getTemporaryStorage, updateCheckRecord,
  createMaintenanceType, createTemporaryStorage
} from "@/api/index";
// import { showToast } from 'vant';
import { showToast } from '@nutui/nutui';

const submitStatue = ref(false);
const showMap = ref(false);
const usertype: any = inject('$aType')

const minDate = new Date(new Date().getFullYear() - 5, 0, 1);
const maxDate = new Date(new Date().getFullYear() + 3, 0, 1);
const activityInfo = ref({
  adrres: '',
  type: '',
  type_name: '',
  id: '',
})

const listDown = ref([
  { text: '审核状态', value: '' },
  { text: '已通过', value: 1 },
  { text: '待审核', value: 2 },
  { text: '已退回', value: 3 },
])
const date = ref('');
const showDate = ref(false);
const showPicker = ref(false);
const columns = ref([])

const numberOfSteps = ref([])

const initiateActivities = (item) => {
  router.push('/checkDetails?id=' + item.id)
}

const onConfirm = async ({ selectedOptions }) => {
  numberOfSteps.value = []
  showPicker.value = false;
  activityInfo.value.type_name = selectedOptions[0].type_name;
  activityInfo.value.type = selectedOptions[0].id;
  activityInfo.value.id = '';
  (await getTypeSubmitSet({ maintenance_type_id: selectedOptions[0].id })).data.forEach((item, index) => {
    numberOfSteps.value.push({
      boolean: index == 0 ? false : true,
      "audit_name": item.audit_name,
      "audit_content": item.audit_content,
      "image_urls": item.image_urls || [],
      "level": item.level,
      "submit_type": item.submit_type,
    },)
  })
};

const router = useRouter()
// 获取地理位置
if (navigator.geolocation && 0) {
  navigator.geolocation.getCurrentPosition((res) => {
    console.log(res);//这里会返回经纬度，然后还要通过经纬度转换地区名称
    fetch(`https://restapi.amap.com/v3/geocode/regeo?key=bf9a6cb247abb72dbf6a8525ccb9aade&location=${res.coords.longitude.toFixed(6)},${res.coords.latitude.toFixed(6)}`).then((response) => {
      return response.json();
    }).then((data) => {
      // console.log(data.regeocode.formatted_address);
      activityInfo.value.adrres = data.regeocode.formatted_address;
    })
  });
}

//图片上传处理
const afterFileRead: Function = async (e, item) => {
  if (e instanceof Array) {
    for (let index = 0; index < e.length; index++) {
      let file = e[index].file
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('real_address', '皇城之内')
      const data = await upload(param)
      if (data.code == 200) {
        item.image_urls[item.image_urls.length - 1] = { url: data.data.url }
      } else {
        item.image_urls.splice(item.image_urls.length - 1, 1)
      }
    }
  } else {
    let file = e.file
    let param = new FormData()
    param.append('file', file, file.name)
    param.append('real_address', '紫禁之巅')
    const data = await upload(param)
    if (data.code == 200) {
      item.image_urls[item.image_urls.length - 1] = { url: data.data.url }
    } else {
      item.image_urls.splice(item.image_urls.length - 1, 1)
    }
  }
}

const active: any = inject("$active");

const loading = ref(false);
const finished = ref(false);

const dropdownStatus = ref('');

const ResultsList = ref<any>([])
// const ResultsDetailList = ref<any>([])
// let option: any[] = []
const toPage = ref(0);

const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const getDate = (value) => {
  const [start, end] = value;
  showDate.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
}
const checkRecordList = ref<any>([])

watch(dropdownStatus, () => {
  getList(active.value, false)
})

watch(usertype.value, () => {
  getTemporaryStorage(null).then(res => {
    getTemporaryStorage(null).then(res => {
      numberOfSteps.value = []
      activityInfo.value.type = res.data.maintenance_type_id
      res.data.audit_project.forEach(item => {
        numberOfSteps.value.push({
          "audit_name": item.audit_name,
          "audit_content": item.audit_content,
          "image_urls": (item.image_urls.length && item.image_urls.map(item => ({ url: item }))) || [],
          "level": item.level,
          "submit_type": item.submit_type || [],
        })
      })
      activityInfo.value.type = res.data.maintenance_type_id;
      activityInfo.value.type_name = res.data.maintenance_type_name;
      activityInfo.value.adrres = res.data.local_name;
    })
  })
})

const getList = async (_val = 0, _blue = true) => {
  checkRecordList.value = (await getCheckRecordList({
    "status": dropdownStatus.value,
    "start_time": date.value.split(' - ')[0],
    "end_time": date.value.split(' - ')[1],
    "page": 1,
    "page_size": 999
  })).data;


  ResultsList.value = [1, 2];
}

const onFailed = (errorInfo: any) => {
  showToast.warn(errorInfo.errors[0].message)
}

// 提交接口
const setCreateMaintenance = async (_boolean) => {
  const data = numberOfSteps.value.map(item => {
    return {
      "audit_name": item.audit_name,
      submit_type: item.submit_type,
      "audit_content": item.audit_content,
      "image_urls": item.image_urls.map(item => item.url),
      "level": item.level
    }
  })

  if (_boolean) {
    if (activityInfo.value.id) {
      await updateCheckRecord({
        id: activityInfo.value.id,
        maintenance_type_id: activityInfo.value.type,
        local_name: '青橄榄3楼',
        audit_project: data
      })
    }
    await createMaintenanceType({
      maintenance_type_id: activityInfo.value.type,
      local_name: '青橄榄3楼',
      audit_project: data
    })
  } else {
    // 暂存
    await createTemporaryStorage({
      id: activityInfo.value.id,
      maintenance_type_id: activityInfo.value.type,
      maintenance_type_name: activityInfo.value.type_name,
      local_name: '青橄榄3楼',
      audit_project: data
    })
  }

  submitStatue.value = true;
  activityInfo.value.type_name = '';
  activityInfo.value.type = '';

}

onMounted(async () => {
  toPage.value = 0;
  loading.value = false;
  finished.value = false;
  getList(active.value, false)

  const data = (await getMaintenanceType(null)).data;
  columns.value = data;
  if (router.currentRoute.value.query.id) {
    getCheckRecordDetail({ id: router.currentRoute.value.query.id }).then(res => {
      numberOfSteps.value = []
      activityInfo.value.type = res.data.maintenance_type_id
      res.data.audit_project.forEach(item => {
        let arr = [];
        item.audit_content && arr.push(1)
        item.image_urls.length && arr.push(2)
        numberOfSteps.value.push({
          "audit_name": item.audit_name,
          "audit_content": item.audit_content,
          "image_urls": (item.image_urls.length && item.image_urls.map(item => ({ url: item }))) || [],
          "level": item.level,
          "submit_type": arr,
        })
      })
      activityInfo.value.type = res.data.maintenance_type;
      activityInfo.value.type_name = res.data.maintenance_type_name;
      activityInfo.value.adrres = res.data.local_name;
      activityInfo.value.id = res.data.id;
    })
  } else if (usertype.value.storage == 1) {
    getTemporaryStorage(null).then(res => {
      numberOfSteps.value = []
      activityInfo.value.type = res.data.maintenance_type_id
      res.data.audit_project.forEach(item => {
        numberOfSteps.value.push({
          "audit_name": item.audit_name,
          "audit_content": item.audit_content,
          "image_urls": (item.image_urls.length && item.image_urls.map(item => ({ url: item }))) || [],
          "level": item.level,
          "submit_type": item.submit_type || [],
        })
      })
      activityInfo.value.type = res.data.maintenance_type_id;
      activityInfo.value.type_name = res.data.maintenance_type_name;
      activityInfo.value.adrres = res.data.local_name;
    })
  }
})
</script>

<style lang="less" scoped>
:deep(.van-dropdown-menu__bar) {
  box-shadow: none;
}

:deep(.van-tab--active) {
  font-size: 16px;
  font-weight: 600;
}

:deep(.van-tabs__line) {
  width: 50vw;
}

:deep(.van-button--default) {
  border-bottom: none;
  border-right: none;
  border-left: none;
}

.applicationResults {
  background-color: #EDEDED;
  height: 100%;

  .submitMsg {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
    top: 0;
    left: 0;
    background-color: #EDEDED;

    div {
      position: absolute;
      width: 345px;
      height: 241px;
      background: #FFFFFF;
      border-radius: 15px;
      margin: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-bottom: 30px;
    }

    .van-button {
      width: 285px;
      height: 49px;
      background: #FFFFFF;
      border-radius: 24px;
      border: 1px solid #E5E5E5;
      position: absolute;
      top: 210px;
      left: 45px;
    }
  }

  .van-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;

    :deep(.van-tabs__content) {
      flex-grow: 1;
      height: 0;

      .van-tab__panel {
        height: 100%;
      }
    }
  }

  hr {
    font-size: 1px;
    border: none;
    height: 1px;
    background-color: #EDEDED;
  }

  .activityState {
    border-radius: 15px;
    overflow: hidden;
    margin: 0 15px;
  }

  .btnBox {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 15px;
    background: #fff;
    display: flex;
    justify-self: start;
    gap: 10px;
  }

  .listBox {
    border-radius: 15px;
    overflow: auto;
    background-color: #fff;
    margin: 0 15px;
    overflow: auto;
    position: relative;

    &.listBoxBold {
      height: calc(100% - 140px);
      padding-top: 60px;
    }

    .listStatus {
      border-bottom: 1px solid #eee;
      position: fixed;
      // border-radius: 15px 15px 0 0;
      top: 103px;
      left: 30px;
      background: #fff;
      width: calc(100% - 60px);
      z-index: 99;

      .van-dropdown-menu {
        // :deel(.van-dropdown-menu__bar){
        width: 50%;
        // }
      }
    }


    .bookshelf {
      height: 30px;
      background-image: url(@/assets/book.png);
      background-repeat: no-repeat;
      background-size: contain;
    }

    .van-dropdown-menu {
      border-radius: 15px 15px 0 0;
      overflow: hidden;
    }

    .cirdBox {
      padding: 15px 15px 0;
      position: relative;

      hr {
        margin-top: 15px;
      }

      p,
      h4 {
        margin: 0;
        line-height: 20px;
      }

      h4 {
        line-height: 20px;
        font-weight: 600;
        font-size: 18px;
        position: relative;

        span {
          position: absolute;
          right: 5px;
          font-size: 14px;
        }
      }

      p {
        margin-top: 8px;
        color: #666666;
        font-weight: 400;
        font-size: 14px;
        position: relative;
        display: flex;
        width: 100%;
        gap: 20px;

        span {
          width: 35%;
        }

        & span.auditStatus {
          left: 125px;
          flex-grow: 1;
          font-size: 14px;
        }

        & span.reportStatus {
          position: absolute;
          right: 5px;
          font-size: 14px;
          font-weight: 600;
          text-align: right;
        }
      }

      .van-icon-department::before {
        content: "\e678";
      }

      .van-icon {
        color: #1677FF;
      }

      position: relative;

      .statusBox {
        position: absolute;
        top: 35%;
        right: 30px;
        width: 45px;
        height: 15px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 15px;

        &.color-blue {
          color: #2488FF;
        }

        &.color-orange {
          color: #F06B00;
        }

        &.color-red {
          color: #F24848;
        }

        line-height: 15px;
        text-align: center;
        font-style: normal;
      }

      .rightArrow {
        position: absolute;
        width: 10px;
        height: 10px;
        border-top: 2px solid #333;
        border-right: 2px solid #333;
        transform: rotate(45deg);
        right: 18px;
        top: 30px;
      }
    }
  }
}
</style>