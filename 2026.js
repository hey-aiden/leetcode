/**
 * 1124. 表现良好的最长时间段
 * 给你一份工作时间表 hours，上面记录着某一位员工每天的工作小时数
 *
 * 我们认为当员工一天中的工作小时数大于 8 小时的时候，那么这一天就是「劳累的一天」。
 * 所谓「表现良好的时间段」，意味在这段时间内，「劳累的天数」是严格 大于「不劳累的天数」
 * 请你返回「表现良好时间段」的最大长度。
 *
 * 输入：hours = [9,9,6,0,6,6,9] 输出：3
 * 解释：最长的表现良好时间段是 [9,9,6]。
 *
 *
 *
 * @param {number[]} hours
 * @return {number}
 */
var longestWPI = function (hours) {
    /**
     * 计算 「劳累的天数」是严格 大于「不劳累的天数」 的最大长度
     *
     * hours = [9,9,6,0,6,6,9]
     * 将数组中>8的设为1，小于8的设为-1
     * [1, 1, -1, -1, -1, -1, 1]
     * 找出前缀和：
     * [0, 1, 2, 1, 0, -1, -2, -1]
     *
     *
     */

    // const n = hours.length
    // const preSum = Array(n + 1).fill(0)

    // const stk = [0]

    // for (let i = 0; i <= n; i++) {
    //     preSum[i + 1] = (hours[i] > 8 ? 1 : -1) + preSum[i]
    //     const len = stk.length
    //     if (i > 0 && preSum[stk[len - 1]] > preSum[i]) {
    //         // 维护一个单调递减栈
    //         stk.push(i)
    //     }
    // }

    // let res = 0
    // for (let r = n; r >= 1; r--) {
    //     // 前缀和 > 0：  preSum[r] > preSum[l], 就可以保证： 前缀和是>0的， 也就是符合题意：「劳累的天数」是严格 大于「不劳累的天数」
    //     // 所以前面要取找基于前缀和下标0的递减区间，然后挨个去和右区间 做 匹配
    //     while (stk.length && preSum[stk[stk.length - 1]] < preSum[r]) {
    //         res = Math.max(res, r - stk.pop())
    //     }
    // }
    // return res

    /**
     * 前缀和 + 单调栈
     */
    const n = hours.length

    const preSum = Array(n + 1).fill(0)

    const stack = [0] // 维护一个单调栈 - 单调递减； 作为左边界的比较项

    for (let i = 0; i <= n; i++) {
        preSum[i + 1] = (hours[i] > 8 ? 1 : -1) + preSum[i]
        if (preSum[stack[stack.length - 1]] > preSum[i]) {
            // 存入更小的边界
            stack.push(i)
        }
    }

    let res = 0

    for (let r = n; r >= 0; r--) {
        // 缩小右边界，用每一个比 stack 大的前缀和，满足： preSum[r] - preSum[stack.pop()] > 0
        while (stack.length && preSum[r] > preSum[stack[stack.length - 1]]) {
            res = Math.max(res, r - stack.pop())
        }
    }
    return res
}

/**
 * 354. 俄罗斯套娃信封问题
 *
 * 输入：envelopes = [[5,4],[6,4],[6,7],[2,3]] 输出：3
 * 解释：最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
 *
 * [[5,4],[6,4],[6,7],[2,3]]
 *
 *
 * [[2,3], [5,4], [6,7], [6,4]]
 *
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
    /**
     * 1. 先对数组进行排序;
     * 2. 问题转换：找到两个递增子序列
     *
     * 因为已经进行过排序了，所以只需要比较第二位数了
     * 对于每一项，能累加的前提是： envelopes[0][1] > envelopes[1][1]
     *
     * 以下题解会超时，但是思路是对的
     */
    const n = envelopes.length
    if (n === 0) return 0
    envelopes.sort((a, b) => {
        if (a[0] === b[0]) {
            // 宽度一样，需要按照高度倒序
            return b[1] - a[1]
        } else {
            return a[0] - b[0]
        }
    })

    const f = new Array(n).fill(1)
    let ans = 1
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (envelopes[j][1] < envelopes[i][1]) {
                f[i] = Math.max(f[i], f[j] + 1)
            }
        }
        ans = Math.max(ans, f[i])
    }
    return ans
}

/**
 * 29. 两数相除
 * 给你两个整数，被除数 dividend 和除数 divisor。将两数相除，要求 不使用 乘法、除法和取余运算
 * 整数除法应该向零截断，也就是截去（truncate）其小数部分。例如，8.345 将被截断为 8 ，-2.7335 将被截断至 -2
 * 返回被除数 dividend 除以除数 divisor 得到的 商
 *
 * 输入: dividend = 10, divisor = 3 输出: 3 解释: 10/3 = 3.33333.. ，向零截断后得到 3
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    /**
     * 会超时
     */
    let count = 0
    let resetNum = Math.abs(dividend)
    const flag = (divisor > 0 && dividend > 0) || (divisor < 0 && dividend < 0)

    const cutStep = Math.abs(divisor)
    while (resetNum >= cutStep) {
        resetNum -= cutStep
        count++
    }
    if (count >= Math.pow(2, 31)) {
        count = Math.pow(2, 31) - 1
    }
    return flag ? count : -count
}

/**
 * 45. 跳跃游戏 II
 *
 * 给定一个长度为 n 的 0 索引整数数组 nums。初始位置在下标 0。
 * 每个元素 nums[i] 表示从索引 i 向后跳转的最大长度。换句话说，如果你在索引 i 处，你可以跳转到任意 (i + j) 处：
 *
 * 0 <= j <= nums[i] 且 i + j < n
 *
 * 返回到达 n - 1 的最小跳跃次数。测试用例保证可以到达 n - 1。
 *
 * 输入: nums = [2,3,1,1,4] 输出: 2
 * 解释: 跳到最后一个位置的最小跳跃数是 2。 从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 *
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    /**
     * 在索引 i 处，你可以跳转到任意 (i + j) 处
     * 
     * 1. 返回到达 n-1 的最小跳跃数
     * [2,3,1,1,4]  ->  [2, 4, 3, 4, 8]
     * 
     * 对于nums[i]: 可以选择踩上去，也可以选择跳过去
     * dp[i][0]: 不踩= 
     *
     *    0  1  2  3  4  5  6   
     * 0  0  1  1  2  
     * 2  
     * 3  
     * 1
     * 1
     * 4
     * 
     * nums[i] 
     * 
     */
    const stepMap = new Map()
    const n = nums.length
    for (let i = 0; i < n; i++) {
        const step = nums[i] + i
    }
}
