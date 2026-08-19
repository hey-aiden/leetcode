/**
 * 456. 132 模式
 *
 * 给你一个整数数组 nums ，数组中共有 n 个整数。
 * 132 模式的子序列 由三个整数 nums[i]、nums[j] 和 nums[k] 组成，并同时满足：i < j < k 和 nums[i] < nums[k] < nums[j]
 *
 * 如果 nums 中存在 132 模式的子序列 ，返回 true ；否则，返回 false
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
    /**
     * 下标满足：i < j < k
     * 数值满足：nums[i] < nums[k] < nums[j]
     *
     * 从 j 的视角看，就是找到 前面存在比它 小 的数，后面存在比它小的数，同时后面的数又要大于前面的数
     *
     * 1. 暴力解法，遍历
     * 会超时
     */
    const len = nums.length
    let preMin = nums[0] // 这里的问题在于，preMin虽然是最小的，但是存在子条件需要满足：nums[right] > preMin； 所以不能 preMin = Math.min(preMin, nums[i])

    for (let i = 1; i < len; i++) {
        if (nums[i] > preMin) {
            let right = i + 1
            while (right < len) {
                if (nums[right] < nums[i] && nums[right] > preMin) return true
                right++
            }
        } else {
            preMin = Math.min(preMin, nums[i])
        }
    }
    return false

    /**
     * 单调栈：从右往左遍历，维护一个单调递减的栈; 核心思路就是找到最大的j和k,这样能保证找到i的机会最大
     */

    const len = nums.length
    const stack = [nums[len - 1]]
    let maxK = -Infinity
    for (let i = len - 2; i >= 0; i--) {
        const num = nums[i]
        if (num < maxK) return true
        while (stack.length && num > stack[stack.length - 1]) {
            maxK = Math.max(stack.pop(), maxK)
        }
        stack.push(num)
    }
    return false
}
