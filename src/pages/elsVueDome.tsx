{
  /* <template>
  <div>
    <canvas id="myCanvas">11</canvas>
  </div>
</template> */
}

// import autofit from 'autofit.js'
// import imgSrc from "../../images/map.png"

const winW = window.outerWidth;
const winH = window.outerHeight;

export default {
  data() {
    return {
      ctx: null,
      canvas: null,
    };
  },
  mounted() {
    this.initCancas();
    // autofit.init({
    //   designHeight: winH,
    //   designWidth: winW,
    //   el: '#app',
    //   resize: true,
    // });
  },
  beforeDestroy() {
    // autofit.off();
  },
  methods: {
    initCancas() {
      this.canvas = document.getElementById('myCanvas');
      this.canvas.width = winW;
      this.canvas.height = winH;

      this.ctx = this.canvas.getContext('2d');
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      const img = new Image();
      // img.src = imgSrc;
      // const _this = this;
      for (let i = 0; i * 21 < winH; i++) {
        for (let j = 0; j * 21 < winW; j++) {
          this.ctx.fillStyle = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
          this.ctx.fillRect((j - 1) * 21, (i - 1) * 21, j * 21, i * 21);
        }
      }

      img.onload = function () {
        // _this.draw(img);
      };
    },
    draw(img) {
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      // var pattern = this.ctx.createPattern(img, "no-repeat")
      // this.ctx.fillStyle = pattern;
      // this.ctx.fillRect(0, 0, winW, winH)
    },
  },
};
