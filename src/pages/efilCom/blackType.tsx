import { FC, useEffect } from 'react';

const i = { blocks: [0x0f00, 0x2222, 0x00f0, 0x4444], color: 'cyan' };
const j = { blocks: [0x44c0, 0x8e00, 0x6440, 0x0e20], color: 'blue' };
const l = { blocks: [0x4460, 0x0e80, 0xc440, 0x2e00], color: 'orange' };
const o = { blocks: [0xcc00, 0xcc00, 0xcc00, 0xcc00], color: 'yellow' };
const s = { blocks: [0x06c0, 0x8c40, 0x6c00, 0x4620], color: 'green' };
const t = { blocks: [0x0e40, 0x4c40, 0x4e00, 0x4640], color: 'purple' };
const z = { blocks: [0x0c60, 0x4c80, 0xc600, 0x2640], color: 'red' };

import styled from 'styled-components';

// 根据16进制渲染
const renderingBlock = (b) => {
  const data = {
    x: 0,
    y: 0,
  };
  for (let i = 0; i < 16; i++, b <<= 1) {
    if (b & 0x8000) {
      data.x = i;
      data.y = i;
      // if (y < HIG)
      console.log(data);
      // DrawUnit(x, y, Blocks[block.id].color);
    }
  }
};
renderingBlock(z.blocks[1]);

const Wrapper = styled.div`
  #box {
    width: 252px;
    font: 25px/25px 宋体;
    background: #000;
    color: #9f9;
    border: #999 20px ridge;
    text-shadow: 2px 3px 1px #0f0;
  }
`;

const App: FC = () => {
  // useEffect(() => {
  //   document.onkeydown = function (e: any) {
  //     eval(keycom[(e ? e : event).keyCode]);
  //   };
  //   start();

  //   const map = eval('[' + Array(23).join('0x801,') + '0xfff]');
  //   const tatris = [
  //     [0x6600],
  //     [0x2222, 0xf00],
  //     [0xc600, 0x2640],
  //     [0x6c00, 0x4620],
  //     [0x4460, 0x2e0, 0x6220, 0x740],
  //     [0x2260, 0xe20, 0x6440, 0x4700],
  //     [0x2620, 0x720, 0x2320, 0x2700],
  //   ];
  //   const keycom = { '38': 'rotate(1)', '40': 'down()', '37': 'move(2,1)', '39': 'move(0.5,-1)' };
  //   let dia, pos, bak;
  //   const run: any = setInterval('down()', 500);

  //   function start() {
  //     dia = tatris[~~(Math.random() * 7)];
  //     bak = pos = { fk: [], y: 0, x: 4, s: ~~(Math.random() * 4) };
  //     rotate(0);
  //   }
  //   function over() {
  //     document.onkeydown = null;
  //     clearInterval(run);
  //     alert('GAME OVER');
  //   }
  //   function update(t) {
  //     bak = { fk: pos.fk.slice(0), y: pos.y, x: pos.x, s: pos.s };
  //     let a2 = '';
  //     if (t) return;
  //     for (let i = 0; i < 22; i++) a2 += map[i].toString(2).slice(1, -1) + '<br/>';
  //     for (let i = 0, n; i < 4; i++)
  //       if (/([^0]+)/.test(bak.fk[i].toString(2).replace(/1/g, '\u25a1')))
  //         a2 =
  //           a2.substr(0, (n = (bak.y + i + 1) * 15 - RegExp.$_.length - 4)) +
  //           RegExp.$1 +
  //           a2.slice(n + RegExp.$1.length);
  //     document.getElementById('box').innerHTML = a2.replace(/1/g, '\u25a0').replace(/0/g, '\u3000');
  //   }
  //   function is() {
  //     for (let i = 0; i < 4; i++) if ((pos.fk[i] & map[pos.y + i]) != 0) return (pos = bak);
  //   }
  //   function rotate(r) {
  //     const f = dia[(pos.s = (pos.s + r) % dia.length)];
  //     for (let i = 0; i < 4; i++) pos.fk[i] = ((f >> (12 - i * 4)) & 15) << pos.x;
  //     update(is());
  //   }
  //   function down() {
  //     ++pos.y;
  //     if (is()) {
  //       for (let i = 0; i < 4 && pos.y + i < 22; i++)
  //         if ((map[pos.y + i] |= pos.fk[i]) == 0xfff) map.splice(pos.y + i, 1), map.unshift(0x801);
  //       if (map[1] != 0x801) return over();
  //       start();
  //     }
  //     update(false);
  //   }
  //   function move(t, k) {
  //     pos.x += k;
  //     for (let i = 0; i < 4; i++) pos.fk[i] *= t;
  //     update(is());
  //   }
  // }, []);
  return (
    <Wrapper>
      <div id="box"></div>
    </Wrapper>
  );
};

export default App;
// <!doctype html><html><head></head><body>
// <div id="box" style="width:252px;font:25px/25px 宋体;background:#000;color:#9f9;border:#999 20px ridge;text-shadow:2px 3px 1px #0f0;"></div>
// <script>

// </script></body></html>
