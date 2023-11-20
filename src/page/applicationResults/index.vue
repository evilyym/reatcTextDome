<style lang="less" scoped>
:deep(.van-dropdown-menu__bar) {
  box-shadow: none;
}

:deep(.van-tab--active) {
  font-size: 0.4rem !important;
  font-weight: 600 !important;
}

.applicationResults {
  background-color: #EDEDED;

  hr {
    font-size: 1px;
    border: none;
    height: 2px;
    background-color: #EDEDED;
  }

  .listBox {
    border-radius: 30px 30px 0 0;
    overflow: hidden;
    background-color: #fff;

    .cirdBox {
      padding: 30px;
      position: relative;

      p,
      h4 {
        margin: 0;
        line-height: 40px;
      }

      h4 {
        line-height: 40px;
        font-weight: 600;
        font-size: 36px;
        position: relative;

        span {
          position: absolute;
          right: 10px;
          font-size: 28px;
        }
      }

      p {
        margin-top: 15px;
        color: #666666;
        font-weight: 400;
        font-size: 28px;
        position: relative;

        &:last-child {
          span {
            position: absolute;
            right: 10px;
            font-size: 28px;
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
        width: 20px;
        height: 20px;
        border-top: 4px solid #333;
        border-right: 4px solid #333;
        transform: rotate(45deg);
        right: 30px;
        top: 60px;
      }
    }
  }
}
</style>
<template>
  <div class="applicationResults">
    <van-form ></van-form>
    <van-tabs v-model="active" color="#EDEDED" background="#EDEDED" swipeable title-inactive-color="#666"
      title-active-color="#111">
      <van-tab title="我服务的">
        <div class="listBox">
          <div class="cirdBox" @click="initiateActivities">
            <h4>校园书法大赛</h4>
            <p><span> <van-icon name="user" />毕君秋 </span> <span><van-icon name="phone" />14962571994 </span></p>
            <div class="rightArrow"></div>
          </div>
          <hr>
          <div class="cirdBox">
            <h4>校园书法大赛 </h4>
            <p><span> <van-icon name="user" />毕君秋 </span> <span><van-icon name="phone" />14962571994 </span></p>
            <div class="rightArrow"></div>
          </div>
          <hr>
        </div>
      </van-tab>
      <van-tab title="我审核的">
        <div class="listBox" @click="eventCheckDetails">
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
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()

const active = 2,
  value1 = '',
  value2 = '',
  option1 = [
    { text: '全部活动', value: '' },
    { text: 'A活动', value: 1 },
    { text: 'B活动', value: 2 },
  ],
  option2 = [
    { text: '审核状态', value: '' },
    { text: '未审核', value: 'b' },
    { text: '审核驳回', value: 'c' },
    { text: '审核通过', value: 'd' },
  ],
  initiateActivities = () => {
    router.push('/applyActivities')
  },
  eventCheckDetails = () => {
    router.push('/eventDetails')
  }
</script>