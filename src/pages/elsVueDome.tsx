/* eslint-disable prefer-const */
import { useEffect, useRef } from 'react';

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

const aps = {
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

const App: React.FC = () => {
  const canRef = useRef(null);
  useEffect(() => {
    let ctx;
    canRef.current.width = 16 * 20;
    canRef.current.height = 22 * 20;
    ctx = canRef.current.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canRef.current.width, canRef.current.height);
    let isRect = true;
    for (let i = 0; i * 20 <= canRef.current.height; i++) {
      for (let j = 0; j * 20 <= canRef.current.width; j++) {
        ctx.fillStyle = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
        // ctx.fillStyle = '#ccc';
        ctx.fillRect((j - 1) * 20, (i - 1) * 20, j * 20, i * 20);
        // isRect && ctx.strokeRect((j - 1) * 20, (i - 1) * 20, j * 20, i * 20);
      }
    }
    for (let i = 0; i <= canRef.current.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canRef.current.height);
      ctx.stroke();
    }
    for (let j = 0; j <= canRef.current.height; j += 20) {
      ctx.moveTo(0, j);
      ctx.lineTo(canRef.current.height, j);
      ctx.stroke();
    }
  }, []);
  return (
    <div style={{ margin: 'auto' }}>
      <canvas ref={canRef} id="myCanvas">
        11
      </canvas>
    </div>
  );
};

export default App;
