/*
 * @Author: yym
 * @Date: 2024-02-23 15:09:20
 * @LastEditTime: 2024-02-23 15:26:45
 */
import Replicate from 'replicate';

const Ai = () => {
  const replicate = new Replicate();
  const output = replicate.run(
    'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
    {
      input: {
        prompt: 'an astronaut riding a horse on mars, hd, dramatic lighting',
      },
    },
  );
  console.log(output);
  return <div>AI: {JSON.stringify(output)}</div>;
};

export default Ai;
