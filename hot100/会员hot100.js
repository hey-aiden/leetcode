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
/**
 * @param {string[]} sentence1
 * @param {string[]} sentence2
 * @param {string[][]} similarPairs
 * @return {boolean}
 */
var areSentencesSimilar = function (sentence1, sentence2, similarPairs) {
    const lenS1 = sentence1.length
    const lenS2 = sentence2.length
    if (lenS1 !== lenS2) return false
    const sMap = new Map()
    for (const sList of similarPairs) {
        const [word1, word2] = sList

        if (!sMap.has(word1)) {
            sMap.set(word1, [])
        }
        if (!sMap.has(word2)) {
            sMap.set(word2, [])
        }

        sMap.get(word1).push(word2)
        sMap.get(word2).push(word1)
    }
    console.log(sMap)

    for (let i = 0; i < lenS1; i++) {
        const word1 = sentence1[i]
        const word2 = sentence2[i]

        if (word1 !== word2) {
            if (!sMap.size) return false

            if (!((sMap.has(word1) && sMap.get(word1).includes(word2)) || (sMap.has(word2) && sMap.get(word2).includes(word1)))) return false
        }
    }

    return true
}

/**
 * 1474. 删除链表 M 个节点之后的 N 个节点
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var deleteNodes = function (head, m, n) {
    /**
     * 输入: head = [1,2,3,4,5,6,7,8,9,10,11], m = 1, n = 3
     * 输出: [1,5,9] 解析: 返回删除结点之后的链表的头结点.
     *
     * 其实转换题意就是：m-保留的节点； n-删除的节点
     *
     */
    const dummyHead = new ListNode(0, head)

    let node = dummyHead
    let keepStep = m
    let delStep = n

    while (node !== null) {
        while (node !== null && keepStep > 0) {
            node = node.next
            keepStep--
        }
        let nextNode = node
        while (nextNode !== null && delStep > 0) {
            nextNode = nextNode.next
            delStep--
        }
        if (node !== null) {
            node.next = nextNode !== null ? nextNode.next : null
        }
        keepStep = m
        delStep = n
    }
    return dummyHead.next
}

/**
 * 270. 最接近的二叉搜索树值
 *
 * 给你二叉搜索树的根节点 root 和一个目标值 target
 *
 * 请在该二叉搜索树中找到最接近目标值 target 的数值。如果有多个答案，返回最小的那个。
 *
 * 输入：root = [4,2,5,1,3], target = 3.714286 输出：4
 *
 * @param {TreeNode} root
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
    const res = []

    function searchVal(root) {
        if (root === null) return

        /** 命中区间，则 root.val 保存 [root.val, root.right], [root.left, root.val] */

        if (root.val === target) {
            res.push(root.val)
        }

        if (root.val > target) {
            if ((root.left && root.left.val < target) || root.left === null) {
                res.push(root.val)
            }
            return searchVal(root.left)
        }

        if (root.val < target) {
            if ((root.right && root.right.val > target) || root.right === null) {
                res.push(root.val)
            }
            return searchVal(root.right)
        }
    }
    searchVal(root)

    if (res.length == 1) return res[0]

    // 返回最小的那个
    let minNum = [Math.abs(res[0] - target), res[0]]

    for (let i = 1; i < res.length; i++) {
        const dif = Math.abs(res[i] - target)
        if (dif < minNum[0]) {
            minNum[0] = dif
            minNum[1] = res[i]
        }
        if (dif === minNum[0] && res[i] < minNum[1]) {
            minNum[1] = res[i]
        }
    }

    return minNum[1]

    console.log(res)
}

/**
 * 298. 二叉树最长连续序列
 *
 * 给你一棵指定的二叉树的根节点 root ，请你计算其中 最长连续序列路径 的长度
 *
 * 最长连续序列路径 是依次递增 1 的路径。该路径，可以是从某个初始节点到树中任意节点，通过「父 - 子」关系连接而产生的任意路径。且必须从父节点到子节点，反过来是不可以的
 *
 * @param {TreeNode} root
 * @return {number}
 */
var longestConsecutive = function (root) {
    let maxDeep = 1
    function dfs(root, prev, deep) {
        if (root == null) return

        const curDeep = root.val === prev + 1 ? deep + 1 : 1

        maxDeep = Math.max(maxDeep, curDeep)

        root.left && dfs(root.left, root.val, curDeep)
        root.right && dfs(root.right, root.val, curDeep)
    }

    dfs(root, root.val, 1)

    return maxDeep
}

/**
 * 487. 最大连续1的个数 II
 *
 * 给定一个二进制数组 nums ，如果最多可以翻转一个 0 ，则返回数组中连续 1 的最大个数
 *
 * 输入：nums = [1,0,1,1,0] 输出：4
 * 解释：翻转第一个 0 可以得到最长的连续 1。 当翻转以后，最大连续 1 的个数为 4。
 *
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    let zeroSet = new Set()

    const len = nums.length

    let left = 0,
        right = 0

    let res = 0
    let count = 0
    while (right < len) {
        const num = nums[right]

        if (num === 1) {
            count++
        }

        if (num === 0) {
            if (zeroSet.has(0)) {
                res = Math.max(res, count)
            }
            while (zeroSet.has(0)) {
                if (nums[left] === 0) {
                    zeroSet.delete(0)
                }
                count--
                left++
            }
            zeroSet.add(0)
            count++
        }
        right++
    }
    return Math.max(res, count)
}

/**
 * 1100. 长度为 K 的无重复字符子串
 *
 * 给你一个字符串 s，找出所有长度为 k 且不含重复字符的子串，请你返回全部满足要求的子串的 数目
 *
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numKLenSubstrNoRepeats = function (s, k) {
    // 长度为K，且不包含重复字符的 子串

    const strSet = new Set()

    const len = s.length

    let left = 0,
        right = 0,
        count = 0

    while (right < len) {
        const char = s[right]

        while (strSet.has(char)) {
            strSet.delete(s[left])
            left++
        }
        strSet.add(char)

        if (strSet.size === k) {
            count++
            strSet.delete(s[left])
            left++
        }

        right++
    }

    return count
}

/**
 * 1198. 找出所有行中最小公共元素
 *
 * 给你一个 m x n 的矩阵 mat，其中每一行的元素均符合 严格递增
 * 请返回 所有行中的 最小公共元素
 * 如果矩阵中没有这样的公共元素，就请返回 -1
 *
 * 输入：mat = [[1,2,3,4,5],[2,4,5,8,10],[3,5,7,9,11],[1,3,5,7,9]] 输出：5
 * 1 2 3 4 5
 * 2 4 5 8 10
 * 3 5 7 9 11
 * 1 3 5 7 9
 *
 * @param {number[][]} mat
 * @return {number}
 */
var smallestCommonElement = function (mat) {
    // 先找出所有的公共元素
    const rowLen = mat.length
    const numMap = new Map()
    for (const numList of mat) {
        for (const num of numList) {
            numMap.set(num, (numMap.get(num) || 0) + 1)
        }
    }
    let res = Infinity
    for (const num of numMap.keys()) {
        if (numMap.get(num) === rowLen) {
            res = Math.min(res, num)
        }
    }
    return res === Infinity ? -1 : res
}

/**
 * 249. 移位字符串分组
 *
 * 给定一个字符串数组 strings，将属于相同移位序列的所有 strings[i] 进行分组。你可以以 任意顺序 返回答案
 *
 * @param {string[]} strings
 * @return {string[][]}
 */
var groupStrings = function (strings) {}

/**
 * 422. 有效的单词方块
 *
 * 给你一个字符串数组 words，如果它能形成一个有效的 单词方块 ，则返回 true
 *
 * 有效的单词方块是指此由字符串数组组成的文字方块的 第 k 行 和 第 k 列所显示的字符串完全相同，其中 0 <= k < max(numRows, numColumns)
 *
 * 输入: words = ["abcd","bnrt","crmy","dtye"] 输出: true
 * a b c d
 * b n r t
 * c r m y
 * d t y e
 * 解释:
 * 第 1 行和第 1 列都读作 "abcd"。
 * 第 2 行和第 2 列都读作 "bnrt"。
 * 第 3 行和第 3 列都读作 "crmy"。
 * 第 4 行和第 4 列都读作 "dtye"。
 * 因此，它构成了一个有效的单词方块。
 *
 *
 * a b c d
 * b n r t
 * c r m
 * d t
 *
 *
 * b a l l
 * a s e e
 * l e t
 * l e p
 *
 * @param {string[]} words
 * @return {boolean}
 */
var validWordSquare = function (words) {
    const row = words.length
    const col = words[0].length

    for (let i = 0; i < row; i++) {
        const rowStr = words[i]

        let colStr = ''
        for (const rWord of words) {
            const c = rWord[i] || ''
            colStr = colStr + c
        }

        if (colStr !== rowStr) return false
    }
    return true
}

/**
 * 531. 孤独像素 I
 *
 * 给你一个大小为 m x n 的图像 picture ，图像由黑白像素组成，'B' 表示黑色像素，'W' 表示白色像素，请你统计并返回图像中 黑色 孤独像素的数量
 *
 * 黑色孤独像素 的定义为：如果黑色像素 'B' 所在的同一行和同一列不存在其他黑色像素，那么这个黑色像素就是黑色孤独像素
 *
 * @param {character[][]} picture
 * @return {number}
 */
var findLonelyPixel = function (picture) {
    const rowLen = picture.length
    const colLen = picture[0].length

    const colSet = new Set()

    let count = 0

    for (let r = 0; r < rowLen; r++) {
        if (!picture[r].includes('B')) continue
        for (let c = 0; c < colLen; c++) {
            if (colSet.has(c)) continue
            const char = picture[r][c]
            if (char === 'B') {
                // 命中黑块
                const res = checkBlack(r, c)
                if (res) {
                    count++
                }
            }
        }
    }

    function checkBlack(r, c) {
        let countCol = 0
        for (const pic of picture) {
            if (pic[c] === 'B') {
                colSet.add(c)
                countCol++
            }
        }
        for (const rChat of picture[r]) {
            if (rChat === 'B') {
                countCol++
            }
        }

        return countCol === 2
    }

    return count
}

/**
 * 272. 最接近的二叉搜索树值 II
 * 给定二叉搜索树的根 root 、一个目标值 target 和一个整数 k ，返回BST中最接近目标的 k 个值。你可以按 任意顺序 返回答案
 * @param {TreeNode} root
 * @param {number} target
 * @param {number} k
 * @return {number[]}
 */
var closestKValues = function (root, target, k) {
    let res = []

    function searchVal(root) {
        if (root == null) return

        if (root.val === target) {
            res.push(root.val)
        }

        if (root.val < target) {
            res.push(root.val)
            return searchVal(root.right)
        }

        if (root.val > target) {
            res.push(root.val)
            return searchVal(root.left)
        }
    }

    searchVal(root)

    res.sort((a, b) => Math.abs(a - target) - Math.abs(b - target))
    return res.slice(0, k)
}

/**
 * 1228. 等差数列中缺失的数字
 *
 * 在某个数组 arr 中，值符合等差数列的数值规律：在 0 <= i < arr.length - 1 的前提下，arr[i+1] - arr[i] 的值都相等
 *
 * 我们会从该数组中删除一个 既不是第一个 也 不是最后一个的值，得到一个新的数组  arr
 *
 * 给你这个缺值的数组 arr，返回 被删除的那个数
 *
 * 输入：arr = [5,7,11,13] 输出：9 解释：原来的数组是 [5,7,9,11,13]。
 * [null,2,4,2]
 *
 * 输入：arr = [15,13,12]  输出：14   解释：原来的数组是 [15,14,13,12]。
 * [-2, -1, null]
 *
 * @param {number[]} arr
 * @return {number}
 */
var missingNumber = function (arr) {
    // 1. 找到正确的等差值； 2. 返回缺失的数

    // 自己构造等差数列计算
    const n = arr.length
    const dif = (arr[n - 1] - arr[0]) / n
    let basicNum = arr[0]
    for (const num of arr) {
        if (num !== basicNum) {
            return basicNum
        }
        basicNum += dif
    }
    return basicNum

    // 二分查找
    const n = arr.length
    const dif = (arr[n - 1] - arr[0]) / n

    let left = 0,
        right = n - 1

    while (left < right) {
        const mid = Math.floor((right + left) / 2)

        if (arr[mid] === arr[0] + mid * dif) {
            left = mid + 1
        } else {
            // `mid` 前 - [left, mid]缺少一个数字，包括 `mid` 本身。
            right = mid
        }
    }

    return arr[0] + left * dif
}
