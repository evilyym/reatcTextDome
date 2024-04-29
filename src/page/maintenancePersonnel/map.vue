<template>
  <div class="map-container">
    <div ref="mapView" class="map-view"></div>
    <div class="address-wrapper">
      <div class="address-list">
        <div class="address-list-item" v-for="(item, index) in addressList?.regeocode?.pois" :key="item.id"
          @click="sureAddress(item, index)">
          <p>{{ item.name }}</p>
          <p>{{ item.address }}</p>
          <van-icon v-if="item.isSelect == isIndex.num" name="success" />
        </div>
      </div>
    </div>
    <van-button @click="getAddress" size="small" style="position: absolute;right: 20px;top: 20px;"
      type="success">确定</van-button>
  </div>
</template>

<script  lang="ts" setup>
//@ignore-ts
import AMapLoader from "@amap/amap-jsapi-loader";
import { getCurrentInstance, onBeforeMount, onUnmounted, ref } from "vue";

const emit = defineEmits(["getAddress"]);
const getAddress = () => {
  emit('getAddress', isIndex.value.adrres);
}

let map;

const mapConfigure = {
  amapKey: "702266fffd36515894ef4ae8528cbe43",
  options: {
    resizeEnable: true,
    // center: [121.553958, 29.869472],
    zoom: 12
  }
};

window._AMapSecurityConfig = {
  securityJsCode: '0df53c7d6d42b1ea77ddadc0c98c65c2'
};

const instance = getCurrentInstance();

const addressList:any = ref();

const isIndex = ref({
  num: 0,
  adrres: ''
});

const sureAddress = (item, index) => {
  isIndex.value.num = index
};

onBeforeMount(() => {
  if (!instance) return;
  let { options } = mapConfigure;

  AMapLoader.load({
    key: mapConfigure.amapKey,
    version: "2.0",
    plugins: [],
    AMapUI: {
      version: "1.1",
      plugins: ["misc/PositionPicker", "misc/PoiPicker"]
    }
  })
    .then(AMap => {
      map = new AMap.Map(instance.refs.mapView, options);

      map.plugin(["AMap.Geolocation"], () => {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          showCircle: false,
          buttonOffset: new AMap.Pixel(10, 20),
          buttonPosition: "RB"
        });

        map.addControl(geolocation);
        geolocation.getCurrentPosition(function (status, result) {
          if (status == "complete") {
            onComplete(result);
          } else {
            onError(result);
          }
        });
      });

      function onComplete(data) {
        map.setCenter(data.position);
      }
      function onError(error) {
        console.log("error", error);
      }

      let positionPicker = new AMapUI.PositionPicker({
        mode: "dragMap",
        pageSize: 5,
        map: map
      });

      positionPicker.on("success", function (positionResult) {
        positionResult.regeocode.pois[0].isSelect = true
        isIndex.value.num = 0
        isIndex.value.adrres = positionResult.regeocode.pois[0].address + ' - ' + positionResult.regeocode.pois[0].name
        positionResult.regeocode.pois.forEach((item, index) => {
          item.isSelect = index
        });
        addressList.value = positionResult;
      });

      positionPicker.on("fail", function (positionResult) {
        console.log("positionResult", positionResult);
      });

      positionPicker.start();

    })
    .catch(() => {
      throw "地图加载失败，请重新加载";
    });
});

onUnmounted(() => {
  if (map) {
    // 销毁地图实例
    map.destroy() && map.clearEvents("click");
  }
});
</script>

<style lang="less" scoped>
.map-container {
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .map-view {
    position: relative;
    width: 100%;
    height: 50%;
    top: 0;
  }

  .address-wrapper {
    flex-grow: 1;
    height: 50%;

    .address-list {
      position: relative;
      height: 100%;
      overflow: auto;

      &-item {
        font-size: 12px;
        padding: 6px 12px;
        border-bottom: 1px solid #e8e8e8;

        p:first-child {
          color: #333;
          font-size: 13px;
        }

        p:last-child {
          color: #666;
        }

        position: relative;

        &>i {
          position: absolute;
          right: 30px;
          top: 30px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
