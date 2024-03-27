<template>
  <div class="applicationResults">
    <van-tabs v-model:active="active" color="#EDEDED" style="" background="#EDEDED" title-inactive-color="#666"
      title-active-color="#111">
      <van-tab title="我服务的">
        <div class="listBox">
          <template v-for="itme in ResultsList">
            <div class="cirdBox" @click="initiateActivities(itme)" v-if="itme.leader_phone">
              <h4>{{ itme.name }}</h4>
              <p style="display: flex;">
                <span><van-icon name="user" />{{ itme.leader_name }} </span>
                <span class="auditStatus"><van-icon name="phone" /> <span  @click="goPhone(j)" v-for="j in itme.leader_phone.split('/')" :key="j">{{i?'/':''}}{{ j }} </span></span>
              </p>
              <div class="rightArrow"></div>
              <hr>
            </div>
          </template>
          <van-empty v-if="ResultsList.length == 1" description="暂无数据"></van-empty>
        </div>
      </van-tab>
      <van-tab title="我审核的">
        <div class="listBox">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
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
                <span class="auditStatus"><van-icon name="phone" /> <span  @click="goPhone(j)" v-for="j in itme.leader_phone.split('/')" :key="j">{{i?'/':''}}{{ j }} </span> </span>
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
      <van-tab title="我发出的">
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
                <span class="auditStatus"><van-icon name="phone" /> <span  @click="goPhone(j)" v-for="j in itme.leader_phone.split('/')" :key="j">{{i?'/':''}}{{ j }} </span> </span>
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
      <van-tab title="报备我的">
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
                <span class="auditStatus"><van-icon name="phone" /> <span  @click="goPhone(j)" v-for="(j,i) in itme.leader_phone.split('/')" :key="j">{{i?'/':''}}{{i?'/':''}}{{ j }}</span> </span>
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
import { getRecordsList, getActivityList } from "@/api/index";
import { showToast } from 'vant';

const router = useRouter()

const goPhone = (phone) => {
  window.location.href = `tel:${phone}`
}

const codeType = router.currentRoute.value.query.activitysupporCode

const active: any = inject("$active");

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
  if (item.type==1) {
  router.push('/applyActivities?id=' + item.id)
  }else{
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
  const activityQuery = { type: 1, perPage: 999, code: codeType }
  if (ResultsList.value.length == 0 || val == 0) {
    option = (await getActivityList(activityQuery)).data.data
    option.forEach((itme) => {
      itme.text = itme.name
      itme.value = itme.id
    })
    option.unshift({ text: '全部活动', value: '' })
  } else {
    option = ResultsList.value
  }
  option1.value = option;
  ResultsList.value = option;
  if (blue) {
    (active.value > 0) && (ResultsDetailList.value = (await getRecordsList(query)).data.data)
  }
}

watch(active, (val: any) => {
  toPage.value = 0;
  loading.value = false;
  finished.value = false;
  getList(val)
})
watch(value1, async () => {
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
  ResultsDetailList.value = (await getRecordsList(query)).data.data
})
watch(value2, async () => {
  const query = { type: active.value, perPage: 5, id: value1.value, status: value2.value }
  ResultsDetailList.value = (await getRecordsList(query)).data.data
})
watch(value3, async () => {
  const query = { type: active.value, perPage: 5, id: value1.value, report: value3.value }
  ResultsDetailList.value = (await getRecordsList(query)).data.data
})

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
const loading = ref(false);
const finished = ref(false);

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
  const data = (await getRecordsList(query)).data;
  console.log(ResultsDetailList.value);
  if (toPage.value > 1) {
    ResultsDetailList.value = ResultsDetailList.value.concat(data.data)
  } else {
    ResultsDetailList.value = (data.data)
  }
  loading.value = false;
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
    height: 100%;

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
        span{
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