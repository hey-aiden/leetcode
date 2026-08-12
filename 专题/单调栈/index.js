/**
 * 496. 下一个更大元素 I
 *
 * nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素
 *
 * 如果不存在下一个更大元素，那么本次查询的答案是 -1
 *
 * 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
 * 输出：[-1,3,-1]
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
    // 常规解法
    const res = []
    const len = nums2.length
    for (const num of nums1) {
        const index = nums2.indexOf(num)
        let left = index + 1
        let numUse = -1
        while (left < len) {
            if (nums2[left] > num) {
                numUse = nums2[left]
                break
            }
            left++
        }
        res.push(numUse)
    }
    return res

    /**
     * 单调栈解决：利用栈先进后出的原则
     *
     * 栈顶应该是数组尾部，不是头部； 队列才是，因为队列是先进先出
     *
     * 1. 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
     * [1,3,4,2]处理单调栈：
     * 2    empty   -1   2入栈  此时栈内元素： [2]
     * 4>2  [2].shift()  -1    4入栈 此时栈内元素： [4]
     * 3 < 4      4        3入栈  此时栈内元素：[4,3]
     * 1 < 4     4         1入栈， 此时站内元素：[4,3,1]
     */
    const numMap = new Map()
    const stack = []
    const len = nums2.length
    for (let i = len - 1; i >= 0; i--) {
        const num = nums2[i]
        while (stack.length && num >= stack[stack.length - 1]) {
            stack.pop()
        }
        const res = stack.length ? stack[stack.length - 1] : -1
        numMap.set(num, res)
        stack.push(num)
    }

    return nums1.map((item) => numMap.get(item))
}

/**
 * 503. 下一个更大元素 II
 *
 * 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素
 *
 * 输入: nums = [1,2,1] 输出: [2,-1,2]
 * 解释: 第一个 1 的下一个更大的数是 2； 数字 2 找不到下一个更大的数； 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {

	
}

/**
 * LCR 038. 每日温度
 *
 * 请根据每日 气温 列表 temperatures ，重新生成一个列表，要求其对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。
 * 如果气温在这之后都不会升高，请在该位置用 0 来代替。
 *
 * 输入：temperatures = [73,74,75,71,69,72,76,73] 输出：[1,1,4,2,1,1,0,0]
 *
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    const res = []

    const stack = []

    const len = temperatures.length

    for (let i = len - 1; i >= 0; i--) {
        const curTemp = temperatures[i]

        while (stack.length && curTemp > temperatures[stack[stack.length - 1]]) {
            stack.pop()
        }
        res[i] = stack.length ? stack[stack.length - 1] - i : 0
        stack.push(i)
    }
    return res
}
