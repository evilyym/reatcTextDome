/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 2数之和 (采取哈希算法)
const twoSum = (nums, target) => {
  // const prevNums = {};
  // for (let i = 0; i < nums.length; i++) {
  //   const curNum = nums[i];
  //   const targetNum = target - curNum;
  //   const targetNumIndex = prevNums[targetNum];
  //   if (targetNumIndex !== undefined) {
  //     return [targetNumIndex, i];
  //   } else {
  //     prevNums[curNum] = i;
  //   }
  // }
  for (let i = 0; i < nums.length; i++) {
    let tr = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      let jr = nums[j];
      if (target == jr + tr) {
        return [i, j];
      }
    }
  }
};
// twoSum([3, 2, 4], 6);

// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // const len = nums.length;
  // nums = nums.join('').replaceAll('0', '');
  // Number(nums).toFixed(len - nums.length);
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      i--;
      len--;
      nums.push(0);
    }
  }
  return nums;
};
// moveZeroes([1, 0, 0, 2, 3]);
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
const list = {
  head: {
    value: 6,
    next: {
      value: 10,
      next: {
        value: 12,
        next: {
          value: 3,
          next: null,
        },
      },
    },
  },
};
const list2 = {
  head: {
    value: 2,
    next: {
      value: 1,
      next: {
        value: 12,
        next: {
          value: 3,
          next: null,
        },
      },
    },
  },
};
const getIntersectionNode = function (headA, headB) {
  if (headA == null || headB == null) {
    return null;
  }
  let pA = headA,
    pB = headB;
  while (pA !== pB) {
    console.log(pA);
    console.log(pB);
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }
  console.log(pA);
  return pA;
};

// getIntersectionNode(list, list2);

const mergeAlternately = function (word1 = 'ab', word2 = 'pqrs') {
  let i = 0;
  let arr = '';
  const num = Math.max(word1.length, word2.length);
  while (i < num) {
    word1[i] && (arr += word1[i]);
    word2[i] && (arr += word2[i]);
    i++;
  }
  return arr;
};

// mergeAlternately()
