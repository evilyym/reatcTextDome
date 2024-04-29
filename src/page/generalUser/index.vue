<template>
  <div class="applicationResults">
    <van-tabs v-model:active="active" color="#2488FF" style="" background="#fff" title-inactive-color="#333"
      title-active-color="#2488FF">
      <van-tab title="检查情况通知">
        <van-field v-model="date" is-link readonly label="" placeholder="日期选择" @click="showDate = !showDate" />
        <div style=""></div>
        <van-calendar first-day-of-week="1" :default-date="[new Date(), new Date()]" :allow-same-day="true"
          :min-date="minDate" :max-date="maxDate" v-model:show="showDate" type="range" @confirm="getDate" />
        <br>
        <div class="listBox listBoxBold">
          <template v-for="itme in checkRecordList.results">
            <div class="cirdBox" @click="initiateActivities(itme)">
              <h4>{{ itme.maintenance_type_name }}</h4>
              <p style="display: block;">
                <span>
                  {{ itme.created_at }} </span>
              </p>
              <div class="rightArrow"></div>
              <hr>
            </div>
          </template>
          <van-empty v-if="checkRecordList.count < 1" description="暂无数据"></van-empty>
        </div>
      </van-tab>
      <van-tab title="资质证书查看">
        <van-field v-model="certification" is-link readonly label="" placeholder="请选择证书类型" @click="certiShow = true" />
        <van-popup v-model:show="certiShow" round position="bottom">
          <van-cascader v-model="certificationType" title="请选择证书类型" :options="certificationTypeOpt"
            :field-names="fieldNames" @close="certiShow = false" @finish="onFinish" />
        </van-popup>
        <div class="certificationImagelist">
          <template v-for="(item, index) in certificationImage" :key="index" class="certificationImage">
            <van-image @click="showImagePreview([item.url])" width="100" height="100" lazy-load :src="item.url" />
            <div class="bookBox" v-if="(index + 1) % 3 == 0"></div>
          </template>
          <div class="bookBox" v-if="certificationImage.length % 3"></div>
        </div>
        <van-empty v-if="certificationImage.length < 1" description="暂无数据"></van-empty>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, onMounted, inject, watch } from "vue";
import { getCheckRecordPassList, getCertification, getCertificateImage } from "@/api/index";
import { showImagePreview } from 'vant';

const minDate = new Date(new Date().getFullYear() - 5, 0, 1);
const maxDate = new Date(new Date().getFullYear() + 3, 0, 1);

const date = ref('');
const certification = ref('');
const certificationType = ref('');
const certiShow = ref(false);
const showDate = ref(false);
const certificationTypeOpt = ref([]);
const certificationImage = ref([])
const fieldNames = {
  text: 'name',
  value: 'id',
};

const onFinish = ({ selectedOptions }) => {
  certiShow.value = false;
  certification.value = selectedOptions.map((option) => option.name).join('/');
};

const initiateActivities = (item) => {
  router.push('/checkDetails?id=' + item.id)
}

const router = useRouter()

const active: any = inject("$active");

const loading = ref(false);
const finished = ref(false);

const dropdownStatus = ref('');

const ResultsList = ref<any>([])

const toPage = ref(0);

const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const getDate = (value) => {
  const [start, end] = value;
  showDate.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
}
const checkRecordList = ref<any>([])

watch(date, () => {
  getList(active.value, false)
})

const getList = async (_val = 0, _blue = true) => {
  checkRecordList.value = (await getCheckRecordPassList({
    "status": dropdownStatus.value,
    "start_time": date.value.split(' - ')[0],
    "end_time": date.value.split(' - ')[1],
    "page": 1,
    "page_size": 999
  })).data;


  ResultsList.value = [1, 2];
}
const pagination = ref({
  "page": 1,
  "page_size": 10
})
watch(certification, () => {
  pagination.value.page = 1;
  getCertificateImage({ certification_type_id: certificationType.value, ...pagination.value }).then(res => {
    certificationImage.value = res.data.results;
  })
})
onMounted(async () => {
  toPage.value = 0;
  loading.value = false;
  finished.value = false;
  getList(active.value, false)
  getCertification(null).then(res => {
    certificationTypeOpt.value = res.data;
  })
  getCertificateImage(pagination.value).then(res => {
    certificationImage.value = res.data.results;
  })
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
  background-color: #F5F5F5;
  ;
  height: 100%;

  .submitMsg {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
    top: 0;
    left: 0;
    background-color: #F5F5F5;
    ;

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

      &.van-tabs__content--animated {
        height: auto;
      }

      .van-tab__panel {
        height: 100%;
      }
    }
  }

  hr {
    font-size: 1px;
    border: none;
    height: 1px;
    background-color: #F5F5F5;
    ;
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
      height: calc(100% - 80px);
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

  .certificationImagelist {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0 20px;
    overflow: auto;
    max-height: calc(100% - 80px);
    padding: 15px 0;

    .bookBox {
      background-image: url(@/assets/book.png);
      background-size: cover;
      height: 30px;
      width: 100%;
    }
  }
}
</style>