/**
 * 624. 数组列表中的最大距离
 *
 * 给定 m 个数组，每个数组都已经按照升序排好序了。
 * 现在你需要从两个不同的数组中选择两个整数（每个数组选一个）并且计算它们的距离。两个整数 a 和 b 之间的距离定义为它们差的绝对值 |a-b|
 * 返回最大距离
 *
 * 输入：[[1,2,3],[4,5],[1,2,3]]
 * 输出：4
 *
 * @param {number[][]} arrays
 * @return {number}
 */
var maxDistance = function (arrays) {
    let res = -Infinity

    const maxLen = arrays[0].length

    let preMin = arrays[0][0]
    let preMax = arrays[0][maxLen - 1]

    const len = arrays.length

    for (let i = 1; i < len; i++) {
        const cur = arrays[i]
        const len = cur.length - 1

        let curUse = Math.max(Math.abs(cur[0] - preMin), Math.abs(cur[len] - preMin), Math.abs(cur[0] - preMax), Math.abs(cur[len] - preMax))

        preMin = Math.min(cur[0], preMin)
        preMax = Math.max(cur[len], preMax)

        res = Math.max(curUse, res)
    }

    return res
}

/**
 * 280. 摆动排序
 * 给你一个的整数数组 nums, 将该数组重新排序后使 nums[0] <= nums[1] >= nums[2] <= nums[3]...
 *
 * 输入：nums = [3,5,2,1,6,4] 输出：[3,5,1,6,2,4] 解释：[1,6,2,5,3,4]也是有效的答案
 *
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function (nums) {
    /**
     * 经排序后的新数组满足：小-大-小-大-...
     * 每两个小的中间插入一个大的
     *
     * 注意大小的比较包括等于
     *
     * 暴力思路：
     * 1. 排序；
     * 2. 分组；按照长度的 2/3，分为小数组； 剩余1/3，归为大数组；
     * 3. 合并
     * 效率太低了
     *
     * 从 i=1 开始，奇数项的第 i 位与 i +1 交换，原理：
     * 基于已排序数组，从第1项开始转换顺序，可以保证交换后得到的数组跟相邻之间的数字大小比较满足：大，小，大 的规律
     *                1,2,3,4,5,6,7 -> 1,3,2,5,4,7,6
     * 3,5,2,1,6,4 -> 1,2,3,4,5,6 -> 1,3,2,5,4,6
     *                1,2,3,4,5 -> 1,3,2,5,4
     *                1,2,3,4 -> 1,3,2,4
     *                1,2,3, -> 1,3,2
     *
     */
    nums.sort((a, b) => a - b)

    const len = nums.length

    for (let i = 1; i < len - 1; i += 2) {
        let temp = nums[i]
        nums[i] = nums[i + 1]
        nums[i + 1] = temp
    }
}

/**
 * 1056. 易混淆数
 * @param {number} n
 * @return {boolean}
 */
var confusingNumber = function (n) {
    const numMap = {
        0: '0',
        1: '1',
        6: '9',
        8: '8',
        9: '6',
    }

    const str = n + ''

    let newStr = ''
    for (const num of str) {
        if (numMap[num] === undefined) return false
        newStr = numMap[num] + newStr // 因为要整个数字都旋转180度，所以旋转之后是倒序合并
    }
    const numStr = Number(newStr)
    return !isNaN(numStr) && numStr !== n
}

/**
 * 1427. 字符串的左右移
 * 给定一个包含小写英文字母的字符串 s 以及一个矩阵 shift，其中 shift[i] = [direction, amount]：
 * direction 可以为 0 （表示左移）或 1 （表示右移）
 *   - 左移 1 位表示移除 s 的第一个字符，并将该字符插入到 s 的结尾
 *   - 类似地，右移 1 位表示移除 s 的最后一个字符，并将该字符插入到 s 的开头
 * amount 表示 s 左右移的位数
 *
 * 对这个字符串进行所有操作后，返回最终结果
 *
 * 输入：s = "abc", shift = [[0,1],[1,2]] 输出："cab"
 * 解释：
 * [0,1] 表示左移 1 位 "abc" -> "bca"
 * [1,2] 表示右移 2 位。 "bca" -> "cab"
 *g
 * @param {string} s
 * @param {number[][]} shift
 * @return {string}
 */
var stringShift = function (s, shift) {
    // 累加所有的操作，计算最终需要进行的移动次数

    let countLeft = 0,
        countRight = 0
    for (const operates of shift) {
        if (operates[0] === 0) {
            countLeft += operates[1]
        } else {
            countRight += operates[1]
        }
    }
    const sLen = s.length
    if (countLeft > countRight) {
        // 最终是左移
        const move = (countLeft - countRight) % sLen // 拿到需要移动的路径长度
        const sLeft = s.slice(0, move)
        s = s.slice(move) + sLeft
    } else if (countLeft < countRight) {
        // 最终需要右移
        const move = (countRight - countLeft) % sLen
        const sRight = s.slice(sLen - 1 - move + 1)
        s = sRight + s.slice(0, sLen - 1 - move + 1)
    }
    return s
}

/**
 * 161. 相隔为 1 的编辑距离
 *
 * 给定两个字符串 s 和 t ，如果它们的编辑距离为 1 ，则返回 true ，否则返回 false
 *
 * 字符串 s 和字符串 t 之间满足编辑距离等于 1 有三种可能的情形：
 * 往 s 中插入 恰好一个 字符得到 t
 * 从 s 中删除 恰好一个 字符得到 t
 * 在 s 中用 一个不同的字符 替换 恰好一个 字符得到 t
 *
 * 输入: s = "ab", t = "acb" 输出: true 解释: 可以将 'c' 插入字符串 s 来得到 t。
 *     ''  a  c  b
 * ''  0   1  2  3
 * a   1   0
 * b   2
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isOneEditDistance = function (s, t) {
    // 动态规划暴力求解
    const sLen = s.length
    const tLen = t.length
    // 求出编辑距离
    // dp[i][j]表示 对于区间字符串s(0...i]和t(0...j]，满足操作相等的编辑此时为 dp[i][j]; 也就是前i/j个字符串的编辑次数
    const dp = Array.from(Array(sLen + 1), () => Array(tLen + 1).fill(0))
    dp[0][0] = 0

    for (let i = 1; i <= sLen; i++) {
        dp[i][0] = i
    }
    for (let j = 1; j <= tLen; j++) {
        dp[0][j] = j
    }

    for (let i = 1; i <= sLen; i++) {
        for (let j = 1; j <= tLen; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
            }
        }
    }
    return dp[sLen][tLen] === 1

    /**
     * 有没有更简单的方式呢
     * 1. 编辑距离如果要满足1，则满足如果当前字符串不相等,对应下列操作，判断后序字符是否相等：
     *  - 删除： [i+1,sLen] [j, tLen];  [i,sLen] [j+1, tLen]
     */
    const sLen = s.length
    const tLen = t.length
    const loopLen = Math.max(sLen, tLen)
    for (let i = 0; i < loopLen; i++) {
        if (s[i] !== t[i]) {
            return s.slice(i) === t.slice(i + 1) || s.slice(i + 1) === t.slice(i) || s.slice(i + 1) === t.slice(i + 1)
        }
    }
    return false
}

/**
 * 186. 反转字符串中的单词 II
 * 给你一个字符数组 s ，反转其中 单词 的顺序
 * 单词 的定义为：单词是一个由非空格字符组成的序列。s 中的单词将会由单个空格分隔。
 *
 * 必须设计并实现 原地 解法来解决此问题，即不分配额外的空间。
 *
 * 输入：s = ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
 * 输出：["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
 *
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseWords = function (s) {
    /**
     * 1. 遇到空格说明开始新的单词了
     *
     * 拆解成小问题：如何反转一个单词
     */

    const len = s.length
    s.reverse()

    // 分段反转每一个子串
    let pre = 0
    for (let i = 0; i < len; i++) {
        if (s[i] === ' ') {
            reverseWord(pre, i - 1)
            pre = i + 1
        }
    }
    reverseWord(pre, len - 1) // 反转最后一个词

    function reverseWord(start, end) {
        while (start < end) {
            const temp = s[start]
            s[start] = s[end]
            s[end] = temp
            start++
            end--
        }
    }
}

/**
 * 1055. 形成字符串的最短路径
 * 对于任何字符串，我们可以通过删除其中一些字符（也可能不删除）来构造该字符串的 子序列
 *
 * 给定源字符串 source 和目标字符串 target，返回 源字符串 source 中能通过串联形成目标字符串 target 的 子序列 的最小数量
 * 如果无法通过串联源字符串中的子序列来构造目标字符串，则返回 -1。
 *
 * 输入：source = "abc", target = "abcbc" 输出：2
 * 解释：目标字符串 "abcbc" 可以由 "abc" 和 "bc" 形成，它们都是源字符串 "abc" 的子序列。
 *
 * @param {string} source
 * @param {string} target
 * @return {number}
 */
var shortestWay = function (source, target) {
    const indexMap = new Map()
    const len = source.length
    for (let i = 0; i < len; i++) {
        const char = source[i]
        if (!indexMap.has(char)) {
            indexMap.set(char, [])
        }
        indexMap.get(char).push(i)
    }

    let count = 1
    let pre = 0
    for (const char of target) {
        if (!indexMap.has(char)) return -1

        const positions = indexMap.get(char)
        const posLen = positions.length

        // 找到匹配pre位置的下标 -  >= pre
        let left = 0,
            right = posLen - 1
        // 二分查找，快速找到下标
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2)
            if (positions[mid] < pre) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }

        // 找不到，说明已经用尽所有的可用char，要重新构建子序列
        if (left === positions.length) {
            // 没有找到满足条件的下标: 要从头开始计算子序列
            count++
            pre = 0
            left = 0
            right = posLen - 1
            // 二分查找，快速找到下标
            while (left <= right) {
                const mid = left + Math.floor((right - left) / 2)
                if (positions[mid] < pre) {
                    left = mid + 1
                } else {
                    right = mid - 1
                }
            }
        }

        // 更新下一次匹配的起点
        pre = positions[left] + 1
    }
    return count
}

/**
 * 159. 至多包含两个不同字符的最长子串
 *
 * 给你一个字符串 s ，请你找出 至多 包含 两个不同字符 的最长子串，并返回该子串的长度
 *
 * 输入：s = "ccaabbb" 输出：5 解释：满足题目要求的子串是 "aabbb" ，长度为 5 。
 *
 * 输入：s = "eceba" 输出：3
 * 解释：满足题目要求的子串是 "ece" ，长度为 3 。
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function (s) {
    const sLen = s.length

    if (sLen <= 2) return sLen

    const charMap = new Map()

    let left = 0,
        right = 0,
        res = 1
    while (right < sLen) {
        const char = s[right]

        if (!charMap.has(char)) {
            charMap.set(char, 1)
        } else {
            const prev = charMap.get(char)
            charMap.set(char, prev + 1)
        }

        if (charMap.size <= 2) {
            // 符合要求，更新长度
            let count = 0
            for (const c of charMap.values()) {
                count += c
            }
            res = Math.max(res, count)
        }

        // 滑动左窗口
        while (charMap.size > 2) {
            const charLeft = s[left]
            let prev = charMap.get(charLeft)
            prev--
            charMap.set(charLeft, prev)
            if (prev === 0) {
                charMap.delete(charLeft)
            }
            left++
        }

        right++
    }
    return res
}

/**
 * 340. 至多包含 K 个不同字符的最长子串
 *
 * 给你一个字符串 s 和一个整数 k ，请你找出 至多 包含 k 个 不同 字符的最长子串，并返回该子串的长度。
 *
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
    const sLen = s.length

    if (sLen <= k) return sLen

    const charMap = new Map()
    let left = 0,
        right = 0,
        res = 0

    while (right < sLen) {
        const char = s[right]

        if (!charMap.has(char)) {
            if (charMap.size === k) {
                // 替换前再更新res
                let count = 0
                for (const c of charMap.values()) {
                    count += c
                }
                res = Math.max(res, count)
            }

            charMap.set(char, 1)
        } else {
            const prev = charMap.get(char)
            charMap.set(char, prev + 1)
        }

        while (charMap.size > k) {
            const charLeft = s[left]
            const cur = charMap.get(charLeft)
            charMap.set(charLeft, cur - 1)
            if (cur - 1 === 0) {
                charMap.delete(charLeft)
            }
            left++
        }

        right++
    }

    // 更新最后的数据

    if (charMap.size <= k) {
        // 替换前更新res
        let count = 0
        for (const c of charMap.values()) {
            count += c
        }
        res = Math.max(res, count)
    }

    return res
}

/**
 * 760. 找出变位映射
 *
 * 给你两个整数数组 nums1 和 nums2，其中 nums2 是 nums1 的一个 变位词 。两个数组都可能包含重复元素
 *
 * 返回一个下标映射数组 mapping，它将 nums1 映射到 nums2，
 * 其中 mapping[i] = j 表示 nums1 中的第 i 个元素出现在 nums2 的第 j 个下标上。如果有多个答案，返回 任意一个
 *
 * 输入：nums1 = [12,28,46,32,50], nums2 = [50,12,32,46,28] 输出：[1,4,3,2,0]
 * 解释：因为 nums1 中的第 0 个元素出现在 nums2[1] 上，所以 mapping[0] = 1，而 nums1 中的第 1 个元素出现在 nums2[4] 上，所以 mapping[1] = 4，以此类推。
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var anagramMappings = function (nums1, nums2) {
    const numMap = new Map()

    for (let i = 0; i < nums2.length; i++) {
        numMap.set(nums2[i], i)
    }
    const res = []

    for (const num of nums1) {
        res.push(numMap.get(num))
    }
    return res
}

/**
 * 266. 回文排列
 * 给你一个字符串 s ，如果该字符串的某个排列是 回文串 ，则返回 true ；否则，返回 false
 *
 * 输入：s = "code" 输出：false
 * 输入：s = "carerac" 输出：true
 *
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function (s) {
    // 求的是排列，不是串，也不是子序列
    const strMap = new Map()

    for (const str of s) {
        if (!strMap.has(str)) {
            strMap.set(str, 0)
        }
        const prev = strMap.get(str)
        strMap.set(str, prev + 1)
    }

    let countOdd = 0

    for (const count of strMap.values()) {
        if (count % 2 === 1) {
            countOdd++
        }
        if (countOdd > 1) return false
    }
    return true
}

/**
 * 734. 句子相似性
 *
 *
 * @param {string[]} sentence1
 * @param {string[]} sentence2
 * @param {string[][]} similarPairs
 * @return {boolean}
 */
var areSentencesSimilar = function (sentence1, sentence2, similarPairs) {}
