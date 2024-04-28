<template>
  <div class="applicationResults">
    <van-tabs v-model:active="active" color="#2488FF" style="" background="#fff" title-inactive-color="#333"
      title-active-color="#2488FF">
      <van-tab v-if="aType == 2" title="检查情况通知">
        <van-field v-model="date" is-link readonly label="" placeholder="日期选择" @click="show = !show" />
        <div style=""></div>
        <van-calendar first-day-of-week="1" :default-date="[new Date(), new Date()]" :allow-same-day="true"
          :min-date="minDate" :max-date="maxDate" v-model:show="show" type="range" @confirm="onConfirm" />
        <br>
        <div class="listBox">
          <template v-for="itme in ResultsList">
            <div class="cirdBox" @click="initiateActivities(itme)" v-if="itme.leader_phone">
              <h4>{{ itme.name }}</h4>
              <p style="display: flex;">
                <span>
                  {{ itme.leader_phone.split('/')[0] }} </span>
              </p>
              <div class="rightArrow"></div>
              <hr>
            </div>
          </template>
          <van-empty v-if="ResultsList.length == 1" description="暂无数据"></van-empty>
        </div>
      </van-tab>
      <van-tab v-if="aType == 2" title="资质证书查看">
        <van-dropdown-menu>
          <van-dropdown-item style="width: 50%;" v-model="value1" :options="option1" />
        </van-dropdown-menu><br>
        <div class="listBox">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" height="100px" alt="">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" height="100px" alt="">
          <div class="bookshelf"></div>
          <van-list v-model:loading="loading" offset="15" :finished="finished"
            :finished-text="ResultsDetailList.length > 0 ? '没有更多了' : ''" @load="onLoad">
            <div class="cirdBox" @click="eventCheckDetails(itme.id)" v-for="itme in ResultsDetailList">
              <h4>{{ itme.activity_name }} <span :class="{
                blue: itme.audit_status == 1, green: itme.audit_status == 2, red: itme.audit_status == 3,
              }">{{ showText(itme.audit_status) }}</span></h4>
              <p>
                <span> <van-icon name="user" />{{ itme.name }} </span>
                <span class="auditStatus"><van-icon name="phone" /> <span @click="goPhone(j)"
                    v-for="(j, i) in itme.leader_phone.split('/')" :key="j">{{ i ? '/' : '' }}{{ j }} </span> </span>
              </p>
              <p><van-icon name="friends" />{{ itme.department }} </p>
              <p>
                <van-icon name="underway" />{{ itme.created_at }}
                <span class="reportStatus" v-if="itme.audit_status == 2" :class="{
                  green: itme.report_status == 2, red: itme.report_status == 1
                }">{{ itme.report_status == 2 ? '已确认' : '未确认' }}</span>
              </p>
              <hr>
            </div>
            <van-empty v-if="ResultsDetailList.length == 0" description="暂无数据"></van-empty>
          </van-list>
        </div>
      </van-tab>
      <van-tab v-if="aType == 1" title="检查提交">
        <div class="listBox">
          <van-dropdown-menu active-color="#1677FF">
            <van-dropdown-item v-model="value1" :options="option1" active-color="#1677FF" />
            <van-dropdown-item v-model="value2" :options="option2" active-color="#1677FF" />
          </van-dropdown-menu>
          <hr>
          <van-list v-model:loading="loading" offset="15" :finished="finished"
            :finished-text="ResultsDetailList.length > 0 ? '没有更多了' : ''" @load="onLoad">
            <div class="cirdBox" @click="eventCheckDetails(itme.id)" v-for="itme in ResultsDetailList">
              <h4>{{ itme.activity_name }} <span :class="{
                blue: itme.audit_status == 1, green: itme.audit_status == 2, red: itme.audit_status == 3,
              }">{{ showText(itme.audit_status) }}</span></h4>
              <p>
                <span> <van-icon name="user" />{{ itme.name }} </span>
                <span class="auditStatus"><van-icon name="phone" /> <span @click="goPhone(j)"
                    v-for="(j, i) in itme.leader_phone.split('/')" :key="j">{{ i ? '/' : '' }}{{ j }} </span> </span>
              </p>
              <p><van-icon name="friends" />{{ itme.department }} </p>
              <p>
                <van-icon name="underway" />{{ itme.created_at }}
                <span class="reportStatus" v-if="itme.audit_status == 2" :class="{
                  green: itme.report_status == 2, red: itme.report_status == 1
                }">{{ itme.report_status == 2 ? '已确认' : '未确认' }}</span>
              </p>
              <hr>
            </div>
            <van-empty v-if="ResultsDetailList.length == 0" description="暂无数据"></van-empty>
          </van-list>
        </div>
      </van-tab>
      <van-tab v-if="aType == 1" title="提交记录">
        <div class="listBox">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value3" :options="option3" />
          </van-dropdown-menu>
          <hr>
          <van-list v-model:loading="loading" offset="15" :finished="finished"
            :finished-text="ResultsDetailList.length > 0 ? '没有更多了' : ''" @load="onLoad">
            <div class="cirdBox" @click="eventCheckDetails(itme.id)" v-for="itme in ResultsDetailList">
              <h4>{{ itme.activity_name }} <span :class="{
                blue: itme.audit_status == 1, green: itme.audit_status == 2, red: itme.audit_status == 3,
              }">{{ showText(itme.audit_status) }}</span></h4>
              <p>
                <span> <van-icon name="user" />{{ itme.name }} </span>
                <span class="auditStatus"><van-icon name="phone" /> <span @click="goPhone(j)"
                    v-for="(j, i) in itme.leader_phone.split('/')" :key="j">{{ i ? '/' : '' }}{{ i ? '/' : '' }}{{ j
                    }}</span>
                </span>
              </p>
              <p><van-icon name="friends" />{{ itme.department }} </p>
              <p>
                <van-icon name="underway" />{{ itme.created_at }}
                <span class="reportStatus" v-if="itme.audit_status == 2" :class="{
                  green: itme.report_status == 2, red: itme.report_status == 1
                }">{{ itme.report_status == 2 ? '已确认' : '未确认' }}</span>
              </p>
              <hr>
            </div>
            <van-empty v-if="ResultsDetailList.length == 0" description="暂无数据"></van-empty>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, onMounted, watch, inject } from "vue";
import { getCheckRecordList, getMaintenanceType } from "@/api/index";
import { showToast } from 'vant';

const minDate = new Date(new Date().getFullYear() - 5, 0, 1);
const maxDate = new Date(new Date().getFullYear() + 3, 0, 1);

const date = ref('');
const show = ref(false);
const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (values) => {
  const [start, end] = values;
  show.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
};
const page = ref({
  "page": 1,
  "page_size": 10
})

const router = useRouter()
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition((res) => {
//     console.log(res);//这里会返回经纬度，然后还要通过经纬度转换地区名称
//     fetch(`https://restapi.amap.com/v3/geocode/regeo?key=bf9a6cb247abb72dbf6a8525ccb9aade&location=${res.coords.longitude.toFixed(6)},${res.coords.latitude.toFixed(6)}`).then((response) => {
//       return response.json();
//     }).then((data) => {
//       console.log(data.regeocode.formatted_address);
//     })
//   });
// }

const goPhone = (phone) => {
  window.location.href = `tel:${phone}`
}

const codeType = router.currentRoute.value.query.activitysupporCode

const active: any = inject("$active");
const aType: any = inject("$aType");

const loading = ref(false);
const finished = ref(false);

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const option1 = ref([
  { text: '全部活动', value: '' },
]);
const option2 = [
  { text: '审核状态', value: '' },
  { text: '待审核', value: 1 },
  { text: '审核通过', value: 2 },
  { text: '审核驳回', value: 3 },
];
const option3 = [
  { text: '报备状态', value: '' },
  { text: '未报备', value: 1 },
  { text: '已报备', value: 2 },
];
const initiateActivities = (item) => {
  if (item.type == 1) {
    router.push('/checkDetails?id=' + item.id)
  } else {
    showToast(item.clue);
  }
}
const eventCheckDetails = (id) => {
  router.push('/eventDetails?id=' + id)
}

const ResultsList = ref<any>([])
const ResultsDetailList = ref<any>([])
let option: any[] = []
const toPage = ref(0);

const getList = async (val = 0, blue = true) => {
  const query = { type: active.value, perPage: 5, page: 1, id: value1.value, status: '', report: '' }
  switch (active.value) {
    case 1:
    case 2:
      query.status = value2.value
      break;

    case 3:
      query.report = value3.value
      break;
  }
  const activityQuery = { type: 1, perPage: 999, code: codeType, ...page.value }
  if (ResultsList.value.length == 0 || val == 0) {
    // option = await (await getCheckRecordList(activityQuery)).data
    // option.forEach((itme) => {
    //   itme.text = itme.name
    //   itme.value = itme.id
    // })
    option.unshift({ text: '全部活动', value: '' })
  } else {
    option = ResultsList.value
  }
  option1.value = option;
  ResultsList.value = option;
  // if (blue) {
  //   (active.value > 0) && (ResultsDetailList.value = (await getMaintenanceType(query)).data.data)
  // }
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

const onLoad = async () => {
  toPage.value++
  const query = {
    type: active.value, perPage: 5, page: toPage.value, id: value1.value, status: '', report: ''
  };
  switch (active.value) {
    case 1:
    case 2:
      query.status = value2.value
      break;

    case 3:
      query.report = value3.value
      break;
  }
  const data = (await getMaintenanceType(query)).data;
  if (toPage.value > 1) {
    ResultsDetailList.value = ResultsDetailList.value.concat(data.data)
  } else {
    ResultsDetailList.value = data
  }
  loading.value = false;
  finished.value = true;
  if (data.last_page <= toPage.value) {
    finished.value = true;
  }
};

onMounted(() => {
  toPage.value = 0;
  loading.value = false;
  finished.value = false;
  getList(active.value, false)
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

.applicationResults {
  background-color: #EDEDED;
  height: 100%;

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

  .listBox {
    border-radius: 15px 15px 0 0;
    // overflow: auto;
    background-color: #fff;
    height: calc(100% - 60px);
    margin: 0 15px;
    overflow: auto;

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

      .rightArrow {
        position: absolute;
        width: 10px;
        height: 10px;
        border-top: 2px solid #333;
        border-right: 2px solid #333;
        transform: rotate(45deg);
        right: 15px;
        top: 30px;
      }
    }
  }
}
</style>