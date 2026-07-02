/**
 * 300. 最长递增子序列: 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 * 输入：nums = [10,9,2,5,3,7,101,18] 输出：4 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    const len = nums.length
    const dp = new Array(len).fill(1)
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                // dp[i]: 以nums[i]这个数结尾的最长递增子序列的长度；
                // 当nums[i] > nums[j]; 那么 dp[j] + 1; 就是接上dp[j]的递增子序列的长度 + nums[i] 构建的新的递增子序列
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    return Math.max(...dp)
}

/**
 * 354. 俄罗斯套娃信封问题:
 * 给你一个二维整数数组 envelopes ，其中 envelopes[i] = [wi, hi] ，表示第 i 个信封的宽度和高度。
 * 当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。
 * 请计算 最多能有多少个 信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
    envelopes.sort((a, b) => {
        // 这里的排序要处理的是：当宽度相同时，高度要降序排序,这是因为要求同一个宽度下，只能放置一个，所以要按照高度倒序排列，就可以避免最终的信封序列中，出现W相同的情况。
        return a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]
    })
    console.log(envelopes)
    const len = envelopes.length

    const heightList = []
    for (let i = 0; i < len; i++) {
        heightList[i] = envelopes[i][1]
    }

    console.log(heightList)

    const dp = new Array(len).fill(1)
    for (let j = 0; j < len; j++) {
        for (let k = 0; k < j; k++) {
            if (heightList[j] > heightList[k]) {
                dp[j] = Math.max(dp[j], dp[k] + 1)
            }
        }
    }
    return Math.max(...dp)
}
