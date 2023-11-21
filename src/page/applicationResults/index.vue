<style lang="less" scoped>
:deep(.van-dropdown-menu__bar) {
  box-shadow: none;
}

:deep(.van-tab--active) {
  font-size: 16px !important;
  font-weight: 600 !important;
}

.applicationResults {
  background-color: #EDEDED;
  height: 100%;

  hr {
    font-size: 1px;
    border: none;
    height: 1px;
    background-color: #EDEDED;
  }

  .listBox {
    border-radius: 15px 15px 0 0;
    overflow: hidden;
    background-color: #fff;

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

        &:last-child {
          span {
            position: absolute;
            right: 5px;
            font-size: 14px;
          }
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
<template>
  <div class="applicationResults">
    <van-tabs v-model:active="active" color="#EDEDED" style="" background="#EDEDED" title-inactive-color="#666"
      title-active-color="#111">
      <van-tab title="我服务的">
        <div class="listBox">
          <div class="cirdBox" @click="initiateActivities(itme.id)" v-for="itme in ResultsList">
            <h4>{{ itme.name }}</h4>
            <p><span> <van-icon name="user" />{{ itme.leader_name }} </span> <span><van-icon name="phone" />{{
              itme.leader_phone }} </span></p>
            <div class="rightArrow"></div>
            <hr>
          </div>
          <!-- <div class="cirdBox">
            <h4>校园书法大赛 </h4>
            <p><span> <van-icon name="user" />毕君秋 </span> <span><van-icon name="phone" />14962571994 </span></p>
            <div class="rightArrow"></div>
            <hr>
          </div> -->
        </div>
      </van-tab>
      <van-tab title="我审核的">
        <div class="listBox">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
          </van-dropdown-menu>
          <hr>
          <div class="cirdBox" @click="eventCheckDetails" v-for="itme in ResultsList">
            <h4>{{ itme.activity?.name }} <span :class="{
              blue: itme.audit_status == 1, green: itme.audit_status == 2, red: itme.audit_status == 3,
            }">{{ showText(itme.audit_status) }}</span></h4>
            <p><span> <van-icon name="user" />{{ itme.name }} </span> <span><van-icon name="phone" />{{ itme.phone }}
              </span>
            </p>
            <p><van-icon name="friends" />{{ itme.department }} </p>
            <p><van-icon name="underway" />{{ itme.created_at }} </p>
          </div>
          <hr>
        </div>
      </van-tab>
      <van-tab title="我发出的">
        <div class="listBox">
          <van-dropdown-menu active-color="#1677FF">
            <van-dropdown-item v-model="value1" :options="option1" active-color="#1677FF" />
            <van-dropdown-item v-model="value2" :options="option2" active-color="#1677FF" />
          </van-dropdown-menu>
          <hr>
          <div class="cirdBox">
            <h4>校园书法大赛 <span class="blue">未审核</span></h4>
            <p><span> <van-icon name="user" />毕君秋 </span> <span><van-icon name="phone" />14962571994 </span></p>
            <p><van-icon name="friends" />计算机部门/AI技术研究开发组 </p>
            <p><van-icon name="underway" />2023-11-12 12:12:12 </p>
          </div>
          <hr>
          <div class="cirdBox">
            <h4>校园书法大赛 <span class="red">审核驳回</span></h4>
            <p><span> <van-icon name="user" />毕君秋 </span> <span><van-icon name="phone" />14962571994 </span></p>
            <p><van-icon name="friends" />计算机部门/AI技术研究开发组 </p>
            <p><van-icon name="underway" />2023-11-12 12:12:12 <span class="red">未确认</span></p>
          </div>
          <hr>
          <div class="cirdBox">
            <h4>校园书法大赛 <span class="green">审核通过</span></h4>
            <p><span> <van-icon name="user" />毕君秋 </span> <span><van-icon name="phone" />14962571994 </span></p>
            <p><van-icon name="friends" />计算机部门/AI技术研究开发组 </p>
            <p><van-icon name="underway" />2023-11-12 12:12:12 <span class="green">已确认</span></p>
          </div>
          <hr>
        </div>
      </van-tab>
      <van-tab title="我报备的">
        <div class="listBox">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
          </van-dropdown-menu>
          <hr>
          <div class="cirdBox">
            <h4>校园书法大赛 <span class="blue">未审核</span></h4>
            <p><span> <van-icon name="user" />毕君秋 </span> <span><van-icon name="phone" />14962571994 </span></p>
            <p><van-icon name="friends" />计算机部门/AI技术研究开发组 </p>
            <p><van-icon name="underway" />2023-11-12 12:12:12 </p>
          </div>
          <hr>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { getRecordsList, getActivityList } from "@/api/index";

const router = useRouter()

const active = ref(0);

const value1 = ref();
const value2 = ref('a');
const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 },
];
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' },
];
const initiateActivities = (id) => {
  router.push('/applyActivities?id=' + id)
}
const eventCheckDetails = () => {
  router.push('/eventDetails')
}

const ResultsList = ref<any>({})
const getList = async (val = 0) => {
  const query = { type: active.value, perPage: 10, id: value1.value }
  switch (val) {
    case 0:
      ResultsList.value = (await getActivityList({ type: 1, perPage: query.perPage })).data.data
      break;
    default:
      ResultsList.value = (await getRecordsList(query)).data.data
      break;
  }
}

watch(active, (val) => {
  console.log(val);

  getList(val)
})
const showText = (key) => {
  switch (key) {
    case 1:
    return '待审核'
    case 2:

    return '审核通过'

    default:

    return '审核驳回'

  }
}
onMounted(() => {
  getList()
})
</script>