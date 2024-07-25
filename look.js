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
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }
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

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  // nums1 = nums1
  //   .concat(nums2)
  //   .sort((a, b) => a - b)
  //   .splice(m, m + n);
  nums1.splice(m, nums1.length - m, ...nums2);
  nums1.sort((a, b) => a - b);
};

// merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let ans = nums.length;
  for (let i = 0; i < ans; ) {
    if (nums[i] == val) {
      nums[i] = nums[ans - 1];
      ans--;
    } else {
      i++;
    }
  }
  return ans;
};

// removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);

var removeDuplicates = function (nums) {
  let arr = Array.from(new Set(nums));
  nums = arr;
};

// removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);

const lengthOfLIS = function (nums = []) {
  // let num = 0;
  // // nums.forEach((i, index) => {
  // for (let index = 0; index < nums.length; index++) {
  //   const i = nums[index];
  //   if (index && i > num) {
  //     num = i;
  //   } else {
  //     nums[index] = null;
  //   }
  // }
  // // });
  // console.log(nums);
  // return nums.length;
  // 每堆的堆顶
  const top = [];
  // 牌堆数初始化为0
  let piles = 0;
  for (let i = 0; i < nums.length; i++) {
    // 要处理的扑克牌
    let poker = nums[i];
    // 左堆和最右堆进行二分搜索，因为堆顶是有序排的，最终找到该牌要插入的堆
    let left = 0,
      right = piles;
    //搜索区间是左闭右开
    while (left < right) {
      let mid = left + ((right - left) >> 1);
      if (top[mid] > poker) {
        right = mid;
      } else if (top[mid] < poker) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    //  没找到合适的牌堆，新建一堆
    if (left == piles) piles++;
    // 把这张牌放到堆顶
    top[left] = poker;
  }
  return piles; //*/
};

// lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]);

var generateParenthesis = function (n) {
  const res = [];

  const dfs = (lRemain, rRemain, str) => {
    // 左右括号所剩的数量，str是当前构建的字符串
    if (str.length == 2 * n) {
      // 字符串构建完成
      res.push(str); // 加入解集
      return; // 结束当前递归分支
    }
    if (lRemain > 0) {
      // 只要左括号有剩，就可以选它，然后继续做选择（递归）
      dfs(lRemain - 1, rRemain, str + '(');
    }
    if (lRemain < rRemain) {
      // 右括号比左括号剩的多，才能选右括号
      dfs(lRemain, rRemain - 1, str + ')'); // 然后继续做选择（递归）
    }
  };

  dfs(n, n, ''); // 递归的入口，剩余数量都是n，初始字符串是空串
  return res;
};

var isPalindrome = function (x) {
  // if (x < 0) return false;
  // const str = x + '';
  // for (let index = 0; index < str.length / 2; index++) {
  //   if (str[index] !== str[str.length - 1 - index]) return false;
  // }
  // return true;

  if (x < 0) return false;
  if (x > 0 && x % 10 == 0) return false;
  let y = x;
  let num = 0;
  while (x !== 0) {
    num = (x % 10) + num * 10;
    x = Math.floor(x / 10);
  }
  return y === num;
};
// isPalindrome(121);

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (p === q) return true;
  if (!p || !q) return false;
  if (p.val != q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  let arr = [];
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    if (arr.indexOf(element) == -1) {
      arr.push(element);
    } else {
      return true;
    }
    if (arr.length > k) {
      arr.shift();
    }
  }
  return false;
};

/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums = [0, 2, 3, 4, 6, 8, 9]) {
  if (nums.length == 0) return [];
  let arr = [[nums[0]]];
  let j = 0;
  for (let index = 1; index < nums.length; index++) {
    if (nums[index] == nums[index - 1] + 1) {
      arr[j].push(nums[index]);
    } else {
      j++;
      arr[j] = [nums[index]];
    }
  }
  // console.log(arr);
  arr = arr.map((itme) => {
    if (itme.length > 1) {
      let str = '';
      str = itme[0] + '->' + itme[itme.length - 1];
      return str;
    } else {
      return itme[0] + '';
    }
  });
  // ["0","2->4","6","8->9"]
  // console.log(arr);
  return arr;
};

// summaryRanges();

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge1 = function (
  intervals = [
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ],
) {
  let res = [];
  intervals.sort((a, b) => a[0] - b[0]);

  let prev = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    let cur = intervals[i];
    if (prev[1] >= cur[0]) {
      prev[1] = Math.max(cur[1], prev[1]);
    } else {
      // 不重合，prev推入res数组
      res.push(prev);
      prev = cur; // 更新 prev
    }
  }

  res.push(prev);
  return res;
};

// merge1();
