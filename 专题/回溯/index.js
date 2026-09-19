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

/**
 * LCR 086. 分割回文串
 * 给定一个字符串 s ，请将 s 分割成一些子串，使每个子串都是 回文串 ，返回 s 所有可能的分割方案
 *
 * 输入：s = "google" 输出：[["g","o","o","g","l","e"],["g","oo","g","l","e"],["goog","l","e"]]
 */
var partition = function (s) {
    const len = s.length

    const res = []
    let temp = []

    function checkStr(start, end) {
        while (start <= end) {
            if (s[start] !== s[end]) return false
            start++
            end--
        }
        return true
    }
    function trackingBack(index) {
        // 要的是分割方案，所以要index到最后才能收集一次，且要保证内部每一项都是回文子串
        if (index >= len) {
            res.push([...temp]) // 结束一轮收集一次
            return
        }

        for (let i = index; i < len; i++) {
            if (checkStr(index, i)) {
                const str = s.substring(index, i + 1)
                temp.push(str)
            } else {
                continue
            }
            trackingBack(i + 1)
            temp.pop()
        }
    }

    trackingBack(0)

    return res
}

/**
 * 93. 复原 IP 地址
 */
var restoreIpAddresses = function (s) {
    const len = s.length
    if (len > 16) return []
    function checkIp(start, end) {
        if (end > start && Number(s[start]) === 0) return false

        const splitNum = s.substring(start, end + 1)
        if (Number(splitNum) > 255) return false

        return true
    }

    const minLen = Math.floor(len / 4)
    const res = []
    const temp = []
    function trackingBack(start, count) {
        if (count > 4) return

        if (start >= len && count === 4) {
            // 遍历到最后一位，且刚好分割4组
            res.push(temp.join('.'))
            return
        }

        for (let i = start; i < len; i += minLen) {
            if (checkIp(start, i)) {
                temp.push(s.substring(start, i + 1))
            } else {
                continue
            }
            trackingBack(i + 1, count + 1)
            temp.pop()
        }
    }
    trackingBack(0, 0)
    return res
}

/**
 * LCR 087. 复原 IP 地址
 * 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能从 s 获得的 有效 IP 地址
 *
 * 有效 IP 地址 :  正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔
 *
 * 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址
 *
 * 输入：s = "25525511135" 输出：["255.255.11.135","255.255.111.35"]
 * 输入：s = "0000" 输出：["0.0.0.0"]
 */
var restoreIpAddresses = function (s) {
    const len = s.length

    if (len > 16) return []

    const res = []
    const temp = []

    function checkIp(start, end) {
        const prefixNum = Number(s[start])

        // 说明是前导0，排除
        if (end > start && prefixNum === 0) return false

        const extraNum = s.substring(start, end + 1)
        if (Number(extraNum) > 255) return false
        return true
    }

    const minStep = Math.floor(len / 4)

    function trackingBack(start, count) {
        if (count > 4) return
        if (start >= len && count === 4) {
            res.push(temp.join('.'))
            return
        }

        for (let i = start; i < len; i++) {
            if (checkIp(start, i)) {
                const char = s.substring(start, i + 1)
                temp.push(char)
            } else {
                continue
            }
            trackingBack(i + 1, count + 1)
            temp.pop()
        }
    }
    trackingBack(0, 0)
    return res
}

/**
 * 78. 子集
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集
 */
var subsets = function (nums) {}

/**
 * 90. 子集 II
 * 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的 子集（幂集）
 *
 * 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
 *
 * 输入：nums = [1,2,2] 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
 */
var subsetsWithDup = function (nums) {
    const len = nums.length

    const res = []
    const temp = []

    function trackingBack(start) {
        res.push([...temp])
        for (let i = start; i < len; i++) {
            temp.push(nums[i])
            trackingBack(i + 1)
            temp.pop()
        }
    }
    trackingBack(0)

    return res
}
