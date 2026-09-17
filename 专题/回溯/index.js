/**
 * 78. 子集
 *
 * 给定一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集） 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集
 *
 * 输入：nums = [1,2,3] 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    const len = nums.length

    const res = []
    function trackingBack(start, ans) {
        res.push([...ans])
        for (let i = start; i < len; i++) {
            ans.push(nums[i])
            trackingBack(i + 1, ans)
            ans.pop()
        }
    }
    trackingBack(0, [])

    return res
}

/**
 * LCR 080. 组合
 *
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合
 *
 * 输入: n = 4, k = 2 输出:
 * [ [2,4], [3,4], [2,3], [1,2], [1,3], [1,4], ]
 *
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    const res = []

    function trackingBack(start, ans) {
        if (ans.length === k) {
            res.push([...ans])
            return
        }

        for (let i = start; i <= n; i++) {
            ans.push(i)
            trackingBack(i + 1, ans)
            ans.pop()
        }
    }

    trackingBack(1, [])

    return res
}

/**
 * LCR 083. 全排列
 *
 * 给定一个不含重复数字的整数数组 nums ，返回其 所有可能的全排列
 *
 * [1,2,3,1,2,3]
 *
 * 输入：nums = [1,2,3] 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const len = nums.length
    const res = []

    function trackingBack(ans) {
        if (ans.length === len) {
            res.push([...ans])
            return
        }
        for (let i = 0; i < len; i++) {
            if (ans.includes(nums[i])) continue
            ans.push(nums[i])
            trackingBack(ans)
            ans.pop()
        }
    }
    trackingBack([])
    return res
}

/**
 * LCR 085. 括号生成
 *
 * 正整数 n 代表生成括号的对数，请设计一个函数，用于能够生成所有可能的并且 有效的 括号组合
 *
 * 输入：n = 3 输出：["((()))","(()())","(())()","()(())","()()()"]
 *
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const res = []
    const ans = []

    function trackingBack(left, right) {
        if (left < 0 || right < 0) return

        if (right < left) return

        if (left === 0 && right === 0) {
            res.push(ans.join(''))
            return
        }

        ans.push('(')
        trackingBack(left - 1, right)
        ans.pop()

        ans.push(')')
        trackingBack(left, right - 1)
        ans.pop()
    }
    trackingBack(n, n, [])
    return res
}

/**
 * LCR 082. 组合总和 II
 * 给定一个可能有重复数字的整数数组 candidates 和一个目标数 target
 * 找出 candidates 中所有可以使数字和为 target 的组合
 *
 * 输入：candidates = [10,1,2,7,6,1,5] -> [1,1,2,5,6,7,10], target = 8
 * 输出： [ [1,1,6], [1,2,5], [1,7], [2,6] ]
 *
 * candidates 中的每个数字在每个组合中只能使用一次，解集不能包含重复的组合 **
 *
 */
var combinationSum2 = function (candidates, target) {
    const len = candidates.length
    const res = []
    const sumList = []
    candidates.sort((a, b) => a - b)

    function trackingBack(index, sum) {
        if (sum === target) {
            res.push([...sumList])
            return
        }
        if (sum > target) return
        for (let i = index; i < len; i++) {
            const num = candidates[i]
            // 同层去重，所以要 i > index; 保证当前的i是基于本次循环中的i遍历，
            // 比如[1,1,2],第一次for循环遍历1，在下一次回溯到1时，i = index = 1, 此时虽然i=i-1的值，但是i同样等于当前Index，所以第二个1可以继续用；
            // 当外层for循环遍历到第二个1时，满足 i > index && i = i-1；跳出遍历，保证第二个1不会继续使用
            //   第一层：
            //     []
            //    / \
            //   1   1   ← 第二个 1 要跳过
            //  /
            // 1          ← 下一层可以使用第二个 1
            if (i > index && candidates[i] == candidates[i - 1]) continue
            if (num > target) return
            sumList.push(num)
            trackingBack(i + 1, sum + num)
            sumList.pop()
        }
    }

    trackingBack(0, 0)
    return res
}
