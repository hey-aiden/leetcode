/**
 * 动态规划：
 * 1. 找出状态转移方程：
 * 2. 找出初始化状态：
 * 3. 找出边界情况：
 * 4. 找出最优解： -- 状态压缩
 *
 * 最优子结构和dp遍历方向
 * 最优子结构：子问题之间必须互相独立 ， 不能有依赖关系;
 * 最优子结构作为动态规划问题的必要条件，一定是让你求最值的;以后碰到最值题，先思考一下暴力穷举的复杂度，如果复杂度爆炸的话，思路往动态规划想就对了，这就是套路。
 *
 * 找最优子结构的过程，其实就是证明状态转移方程正确性的过程，方程符合最优子结构就可以写暴力解，写出 暴力解就可以看出有没有重叠子问题，有则优化；这也是套路。
 *
 * dp遍历方向：
 * 1. 遍历的过程中，所需的状态必须是已经计算出来的；
 * 2. 遍历的终点必须是存储结果的那个位置；
 */

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

/**
 * 53. 最大子数组和: 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组是数组中的一个连续部分。
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4] 输出：6 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    // dp[i]为nums[i]时的最大子数组和；那么dp[i+1] = Math.max(nums[i], dp[i] + nums[i])
    // const dp = []
    // dp[0] = nums[0]
    // const len = nums.length
    // let res = dp[0]
    // for (let i = 1; i < len; i++) {
    //     dp[i] = Math.max(nums[i], nums[i] + dp[i - 1])
    //     res = Math.max(res, dp[i])
    // }
    // return res

    // 状态压缩
    let dp_0 = nums[0]
    let dp_1 = 0
    let res = dp_0
    for (let i = 1; i < nums.length; i++) {
        dp_1 = Math.max(nums[i], nums[i] + dp_0)
        dp_0 = dp_1
        res = Math.max(res, dp_1)
    }
    return res
}

/**
 * 1143. 最长公共子序列: 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
 * 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串
 * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
 * 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
 *
 * 输入：text1 = "abcde", text2 = "ace" 输出：3 解释：最长公共子序列是 "ace" ，它的长度为 3 。
 * 输入：text1 = "abc", text2 = "abc" 输出：3 解释：最长公共子序列是 "abc" ，它的长度为 3 。
 *  text2:    0 a b c d e
 *  text1:  0 0 0 0 0 0 0
 *          a 0 1 1 1 1 1
 *          c 0 1 1 2 2 2
 *          e 0 1 1 2 2 3
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    /**
     * 以下这段是错误解法: 因为对于dp[i-1][j]和dp[i][j-1]而言，是不应该在txt1[i]===txt2[j]时累加的，这样的会导致部分字符被重复使用。
     * 比如在dp[i][j]时用了dp[i][j-1]; 后续遍历到dp[i+1][j]时，同样会读取dp[i][j-1]; 也就是一个字符被重复使用了；
     * 而如果仅在txt1[i]===txt2[j]时，从dp[i-1][j-1]上+1；则是从两个字符公共部分累加，避免了对字符成重复判断。
     * 也就是说，对角线才是递进的值，而dp[i-1][j]和dp[i][j-1]，是作为最佳路线的取舍。
     */
    // let txt1 = ' ' + text1
    // let txt2 = ' ' + text2
    // const rowLen = txt1.length
    // const colLen = txt2.length

    // const dp = []

    // for (let i = 0; i < rowLen; i++) {
    //     dp[i] = []
    //     dp[i][0] = 0
    // }
    // for (let j = 0; j < colLen; j++) {
    //     dp[0][j] = 0
    // }
    // let res = 0
    // for (let i = 1; i < rowLen; i++) {
    //     for (let j = 1; j < colLen; j++) {
    //         const step = txt1[i] === txt2[j] ? 1 : 0
    //         dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
    //         res = Math.max(res, dp[i][j])
    //         res += step
    //     }
    // }
    // return res

    let txt1 = ' ' + text1
    let txt2 = ' ' + text2
    const rowLen = txt1.length
    const colLen = txt2.length

    const dp = []

    for (let i = 0; i < rowLen; i++) {
        dp[i] = []
        dp[i][0] = 0
    }
    for (let j = 0; j < colLen; j++) {
        dp[0][j] = 0
    }
    let res = 0
    for (let i = 1; i < rowLen; i++) {
        for (let j = 1; j < colLen; j++) {
            // 状态转移公式: dp[i][j] 表示 text1 的前 i 个字符 和 text2 的前 j 个字符 的最长公共子序列长度。
            if (txt1[i] === txt2[j]) {
                /**
                 * 为什么字符相等时来自左上角 - dp[i - 1][j - 1] ？
                 * 只能去左上角找（dp[i-1][j-1]），因为左上角对应的是这两个字符之前的所有内容：
                 * 再把当前这一对匹配字符接到末尾，因此得到 dp[i-1][j-1] + 1。这也是 LCS 状态转移的本质 (一个字符只能使用一次)
                 */
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[rowLen - 1][colLen - 1]
}

/* 72. 编辑距离: 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数
 * 输入：word1 = "horse", word2 = "ros" 输出：3
 * 解释： horse -> rorse (将 'h' 替换为 'r') rorse -> rose (删除 'r') rose -> ros (删除 'e')
 *
 * 构造DP-table; dp[row]对应word2的编辑字符； dp[x][col]对应word1的编辑字符；
 * word 2: /  0  r  o  s
 * word 1: 0  0  1  2  3
 *         h  1  1  2  3
 *         o  2  2
 *         r  3
 *         s  4
 *         e  5
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const txt1 = ' ' + word1
    const txt2 = ' ' + word2
    const rowLen = txt1.length
    const colLen = txt2.length
    // 完成DP-table初始值填充; 填充的是路径步骤，而不是对应的字符
    const Dp = []
    for (let i = 0; i < rowLen; i++) {
        Dp[i] = []
        Dp[i][0] = i
    }
    for (let j = 0; j < colLen; j++) {
        Dp[0][j] = j
    }

    for (let r = 1; r < rowLen; r++) {
        for (let col = 1; col < colLen; col++) {
            if (txt1[r] === txt2[col]) {
                // 遇到相同字符串 - 跳过; 此时的编辑距离 = 上一轮的编辑距离
                Dp[r][col] = Dp[r - 1][col - 1]
            } else {
                // 题意是要将word1 转换成word2;
                // 需要增: Dp[r][col-1]，删: Dp[r-1][col] + 1，替换:Dp[r - 1][col - 1] + 1
                /**
                 * 为什么增是： Dp[r][col-1] + 1; 因为 Dp[r][col-1]对应的是同row操作，意味着word1需要更新为Dp[r][col]
                 * 为什么删是： Dp[r-1][col] + 1; 因为 Dp[r-1][col]对应的是对Col操作，意味着word2移除一个匹配word1;
                 */
                Dp[r][col] = Math.min(Dp[r - 1][col] + 1, Dp[r][col - 1] + 1, Dp[r - 1][col - 1] + 1)
            }
        }
    }
    return Dp[rowLen - 1][colLen - 1]
}

/**
 * 516. 最长回文子序列: 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。
 * 子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。
 * 输入：s = "bbbab" 输出：4 解释：一个可能的最长回文子序列为 "bbbb" ;
 * 输入：s = "cbbd" 输出：2 解释：一个可能的最长回文子序列为 "bb" 。
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
    /**
     * 基于 Dp[i][j]表示子串s[i...j]中，回文子序列的最大长度
     * 构建 Dp-table:
     *         j:
     *         b  b  a  b
     *      b  1  1  1  1
     * i:   b  1  1
     *      a  1  0  1
     *      b  1  0  0  1
     *
     * 这里的dp-table表，其实映射的是dp[i][j]是对应的字符串区间坐标，也就是对应的(i,j)区间内的所有字符串子序列构成
     * 比如对于长度 [i...j] 区间的字符串；可以构建的序列包括 [i, j],[i+1, j+1],....
     * 而最终的状态转移公式 Dp[i][j] ，则表示：子串s[i...j]中，回文子序列的最大长度；所以递归遍历每一个序列下的最大长度；
     * 已知单字符一定是回文子串，所以在Dp初始化的时候，对角线dp[i][i]一定是1；之后基于该模型，基于区间依赖的子区间，确定好遍历方向，从下往上 i--，从左往右 j++
     *
     * 可以参考当前函数下面的递归版本实现 line-299
     */
    const loopLen = s.length
    const dp = Array.from(Array(loopLen), () => Array(loopLen).fill(0))
    for (let i = 0; i < loopLen; i++) {
        dp[i][i] = 1
    }
    // 构造之后的dp数组示例，对应字符串是："bbbab"
    // [
    // 	[ 1, 0, 0, 0, 0 ],
    // 	[ 0, 1, 0, 0, 0 ],
    // 	[ 0, 0, 1, 0, 0 ],
    // 	[ 0, 0, 0, 1, 0 ],
    // 	[ 0, 0, 0, 0, 1 ]
    //   ]
    // 初始的i无论是 loopLen-1 还是 loopLen-2，都是可以的； 不过既然j = i + 1; 那么从 loopLen - 2开始遍历，可以少一次
    for (let i = loopLen - 2; i >= 0; i--) {
        for (let j = i + 1; j < loopLen; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
            }
        }
    }
    // 遍历之后的Dp-table，对应字符串是："bbbab",loopLen = 5
    // [   b  b  b  a  b
    //b  [ 1, 2, 3, 3, 4 ],
    //b  [ 0, 1, 2, 2, 3 ],
    //b	 [ 0, 0, 1, 1, 3 ],
    //a  [ 0, 0, 0, 1, 1 ],
    //b  [ 0, 0, 0, 0, 1 ]
    //   ]

    // dp[0][loopLen-1]意味着是从字符串0 ~ loopLen-1的区间，也就是整个字符串
    return dp[0][loopLen - 1]
}
/** 最长回文子序列的递归版本: 跑 leetcode 会超时，递归次数太多了 */
var longestPalindromeSubseq = function (s) {
    const n = s.length

    // i,j 对应的字符串区间，左闭右闭 - [i, j]
    function dfs(i, j) {
        if (i > j) return 0
        if (i === j) return 1

        if (s[i] === s[j]) {
            return dfs(i + 1, j - 1) + 2
        }

        return Math.max(dfs(i + 1, j), dfs(i, j - 1))
    }

    return dfs(0, n - 1)
}
/** 最长回文子序列状态压缩 */
var optimize = function (s) {
    const loopLen = s.length
    const dp = Array.from(Array(loopLen), () => Array(loopLen).fill(0))
    for (let i = 0; i < loopLen; i++) {
        dp[i] = 1
    }
    for (let i = loopLen - 2; i >= 0; i--) {
        let pre = 0
        for (let j = i + 1; j < loopLen; j++) {
            const temp = dp[j]
            if (s[i] === s[j]) {
                dp[j] = pre + 2
            } else {
                dp[j] = Math.max(dp[j], dp[j - 1])
            }
            pre = temp
        }
    }
    return dp[loopLen - 1]
}

/**
 * 1312. 让字符串成为回文串的最少插入次数: 给你一个字符串 s ，每一次操作你都可以在字符串的任意位置插入任意字符。请你返回让 s 成为回文串的 最少操作次数 。
 * 输入：s = "zzazz" 输出：0 解释：字符串 "zzazz" 已经是回文串了，所以不需要做任何插入操作。
 * 输入：s = "mbadm" 输出：2 解释：字符串可变为 "mbdadbm" 或者 "mdbabdm" 。
 *      0  m  b  a  d  m
 *   0  0
 *   m     0
 *   b     1  0  2
 *   a           0
 *   d              0
 *   m                 0
 *
 * 1. 每个单字符都是回文字符串，所以单字符的回文串插入次数最少为0；
 * 2. 在字符串s[i...j]中，dp[i][j]字符串的回文串构建次数：
 *    base-case: i = 0, s[i...j]就是单字符，dp[i][j] = 0
 *    对于 s[i] !== s[j]: 插入两次是肯定可以将s[i...j]变成回文串，但不一定是插入次数最少的，需要拆分两个步骤：
 *    1）：将s[i+1][j]或者s[i][j-1]变成回文串，选择步骤最少的一个 dp[i][j] = Math.min(dp[i+1][j], dp[i][j-1]) + 1
 *    2）：根据步骤一的选择，将s[i...j]变成回文。
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
    const len = s.length
    const dp = Array.from(Array(len), () => Array(len).fill(0))
    for (let i = 0; i < len; i++) {
        dp[i][i] = 0
    }
    for (let i = len - 2; i >= 0; i--) {
        for (let j = i + 1; j < len; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1]
            } else {
                // 在s[i...j]中，s[i+1, j] 和 s[i...j-1]两个子串任意一个成为回文串，只需要再插入一次，即可将dp[i][j]变成回文串
                dp[i][j] = Math.min(dp[i + 1][j], dp[i][j - 1]) + 1
            }
        }
    }
    return dp[0][len - 1]
}

/**
 * 10. 正则表达式匹配: 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 * 返回一个布尔值，表示匹配是否覆盖整个输入字符串（而非部分）。
 * 输入：s = "aa", p = "a" 输出：false 解释："a" 无法匹配 "aa" 整个字符串。
 * 输入：s = "ab", p = ".*" 输出：true 解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    // 只考虑 . 匹配符的计算实现
    // const sLen = s.length
    // const pLen = p.length
    // let i = 0,
    //     j = 0
    // while (i < sLen && j < pLen) {
    //     if (s[i] === p[i] || p[i] === '.') {
    //         i++
    //         j++
    //     } else {
    //         return false
    //     }
    //     return i === j
    // }

    const sLen = s.length
    const pLen = p.length
    function dp(s, i, p, j) {
        /**
         * base case:
         * 1. 如果j匹配完了，对比看看i是否匹配完；
         * 2. 如果i匹配完了，就看字符规律字符p是否能够匹配空串，如果支持匹配空串，那么也能说明s和p字符匹配。
         */
        if (j === pLen) return i === sLen
        if (i === sLen) {
            // 如果要满足p的剩余字符满足空串，那么字符和匹配符*一定是成对出现。
            if ((pLen - j) % 2 === 1) {
                return false
            }
            for (; j < pLen - 1; j += 2) {
                if (p[j + 1] != '*') return false
            }
            return true
        }
        // 当前字符匹配&递归处理
        if (s[i] === p[j] || p[j] === '.') {
            // 不是最后一个字符，并且下一个字符是通配符*
            if (j < pLen - 1 && p[j + 1] === '*') {
                // 匹配0次(j+2跳过当前通配符)或者 多次(j的下标不变)
                return dp(s, i, p, j + 2) || dp(s, i + 1, p, j)
            } else {
                // 常规匹配
                return dp(s, i + 1, p, j + 1)
            }
        } else {
            // 当前字符不匹配
            if (j < pLen - 1 && p[j + 1] == '*') {
                // 通配符匹配0次，因为当前字符并不相等
                return dp(s, i, p, j + 2)
            } else {
                // 匹配失败
                return false
            }
        }
    }
    return dp(s, 0, p, 0)
    // 增加memo：备忘录优化
    const memo = new Map()
    function dpOptimize(s, i, p, j) {
        /**
         * base case:
         * 1. 如果j匹配完了，对比看看i是否匹配完；
         * 2. 如果i匹配完了，就看字符规律字符p是否能够匹配空串，如果支持匹配空串，那么也能说明s和p字符匹配。
         */
        if (j === pLen) return i === sLen
        if (i === sLen) {
            // 如果要满足p的剩余字符满足空串，那么字符和匹配符*一定是成对出现。
            if ((pLen - j) % 2 === 1) {
                return false
            }
            for (; j < pLen - 1; j += 2) {
                if (p[j + 1] != '*') return false
            }
            return true
        }
        // 当前字符匹配&递归处理
        const key = i + ',' + j
        const getVal = memo.get(key)
        if (getVal !== undefined) return getVal
        let res = false
        if (s[i] === p[j] || p[j] === '.') {
            // 不是最后一个字符，并且下一个字符是通配符*
            if (j < pLen - 1 && p[j + 1] === '*') {
                // 匹配0次(j+2跳过当前通配符)或者 多次(j的下标不变)
                res = dp(s, i, p, j + 2) || dp(s, i + 1, p, j)
            } else {
                // 常规匹配
                res = dp(s, i + 1, p, j + 1)
            }
        } else {
            // 当前字符不匹配
            if (j < pLen - 1 && p[j + 1] == '*') {
                // 通配符匹配0次，因为当前字符并不相等
                res = dp(s, i, p, j + 2)
            } else {
                // 匹配失败
                res = false
            }
        }
        memo.set(key, res)
        return res
    }
    return dpOptimize(s, 0, p, 0)
}

/**
 * 651. 四个键的键盘: 假设你有一个特殊的键盘包含下面的按键：
 * A：在屏幕上打印一个 'A'。
 * Ctrl-A：选中整个屏幕。
 * Ctrl-C：复制选中区域到缓冲区。
 * Ctrl-V：将缓冲区内容输出到上次输入的结束位置，并显示在屏幕上。
 * 现在，你可以 最多 按键 n 次（使用上述四种按键），返回屏幕上最多可以显示 'A' 的个数 。
 *
 * 输入: n = 3 输出: 3 解释: 我们最多可以在屏幕上显示三个'A'通过如下顺序按键： A, A, A
 * 输入: n = 7 输出: 9 解释: 我们最多可以在屏幕上显示九个'A'通过如下顺序按键： A, A, A, Ctrl A, Ctrl C, Ctrl V, Ctrl V
 * @param {number} n
 * @return {number}
 */
var maxA = function (n) {
    /**
     * 1. 要么输出A，要么就要保留三次操作用于复制粘贴
     * 2. 每次选择前，要判断当前的操作次数是否剩余>=3次
     *       A
     *   ctrl-A  A
     *  ctrl-c
     * ctrl-V
     * 哪些变量可以记录：
     * A的屏幕数量-[cur-num]：点击按键A，输出1个A
     * A的复制区域数量[copy-num]： 将屏幕区域写入复制区域，消耗操作数：2
     * 操作次数：总次数n,
     */

    // 会超时
    // function dp(n, cur_num, copy_num) {
    //     if (n <= 0) return cur_num
    //     return Math.max(dp(n - 1, cur_num + 1, copy_num), dp(n - 1, cur_num + copy_num, copy_num), dp(n - 2, cur_num, cur_num))
    // }

    // 增加备忘录优化 - 消除重叠子问题 : 当n>=39时，还是会提交后运行超时,且算法过程无法优化
    // const memo = {}
    // function dp(n, cur_num, copy_num) {
    //     if (n <= 0) return cur_num
    //     const key = n + ':' + cur_num + ':' + copy_num
    //     if (memo[key] !== undefined) return memo[key]
    //     memo[key] = Math.max(dp(n - 1, cur_num + 1, copy_num), dp(n - 1, cur_num + copy_num, copy_num), dp(n - 2, cur_num, cur_num))
    //     return memo[key]
    // }
    // return dp(n, 0, 0)

    // 新的实现思路
    const dp = []
    dp[0] = 0
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] + 1 // 每次输出A，对于dp[i-1]来说，就是下一次操作使用按键A
        for (let j = 2; j < i; j++) {
            // 这里的对ctrl按键按操作的分支处理, 因为选中+赋值需要消耗两次操作，也就是复制基于dp[j-2]操作时A的数量，当前第i次操作使用粘贴
            // 那么此时复制的操作数 =  (i - j)； 复制得到的A的数量 =  dp[j-2] * (i - j) + 1   --- 复制1次，那么就是 dp[j-2] * (1+1),至少是2倍，所以要+1
            dp[i] = Math.max(dp[i], dp[j - 2] * (i - j + 1))
        }
    }
    return dp[n]
}

/**
 * 887. 鸡蛋掉落
 * 给你 k 枚相同的鸡蛋，并可以使用一栋从第 1 层到第 n 层共有 n 层楼的建筑。
 * 已知存在楼层 f ，满足 0 <= f <= n ，任何从 高于 f 的楼层落下的鸡蛋都会碎，从 f 楼层或比它低的楼层落下的鸡蛋都不会破。
 * 每次操作，你可以取一枚没有碎的鸡蛋并把它从任一楼层 x 扔下（满足 1 <= x <= n）
 * 如果鸡蛋碎了，你就不能再次使用它。如果某枚鸡蛋扔下后没有摔碎，则可以在之后的操作中 重复使用 这枚鸡蛋
 * 请你计算并返回要确定 f 确切的值 的 最小操作次数 是多少？
 *
 * 输入：k = 1, n = 2 输出：2
 * 解释： 鸡蛋从 1 楼掉落。如果它碎了，肯定能得出 f = 0 。 否则，鸡蛋从 2 楼掉落。如果它碎了，肯定能得出 f = 1 。
 * 如果它没碎，那么肯定能得出 f = 2 。 因此，在最坏的情况下我们需要移动 2 次以确定 f 是多少。
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function (k, n) {
    /**
     * 目标：找出楼层 f 的最小操作次数
     * 1. > f 的楼层落下的鸡蛋都会碎；
     * 2. <= f 的楼层落下的鸡蛋不会碎，该鸡蛋可以重复使用；
     *
     * 哪些变量需要维护：
     * 1. 当前楼层；
     * 2. 鸡蛋剩余数量；
     * 3. 已经尝试过的楼层的鸡蛋情况
     *
     * 以下实现哪怕是基于备忘录做了优化，但是仍然性能不理想。
     */
    const memo = {}
    function dp(k, n) {
        if (n === 0) return 0
        if (k === 1) return n
        const key = k + ':' + n
        if (memo[key] !== undefined) return memo[key]
        let res = Infinity
        // 线性搜索实现，一个for循环
        // for (let i = 1; i <= n; i++) {
        //     // 找到状态转移方程
        //     // 在第 i 楼扔的鸡蛋的结果： dp(k-1, i-1):鸡蛋碎了，k-1,楼层往下找i-1;  dp(k, N-i):鸡蛋没碎，楼层往上找N-i，对应剩余楼层高度
        //     // 为什么内部取max: 因为要判断最坏情况；
        //     // 为什么+1： 因为当前已经扔了一次
        //     res = Math.min(res, Math.max(dp(k - 1, i - 1), dp(k, n - i)) + 1)
        // }

        // 二分搜索优化
        let lo = 1,
            high = n
        while (lo <= high) {
            let mid = Math.floor((lo + high) / 2)
            let broken = dp(k - 1, mid - 1) // # 碎
            let not_broken = dp(k, n - mid) // # 没碎
            if (broken > not_broken) {
                high = mid - 1
                res = Math.min(res, broken + 1)
            } else {
                lo = mid + 1
                res = Math.min(res, not_broken + 1)
            }
        }

        memo[key] = res
        return res
    }
    return dp(k, n)
}

/**
 * 312. 戳气球
 * 有 n 个气球，编号为0 到 n - 1，每个气球上都标有一个数字，这些数字存在数组 nums 中。
 * 现在要求你戳破所有的气球：戳破第 i 个气球，你可以获得 nums[i - 1] * nums[i] * nums[i + 1] 枚硬币
 * 这里的 i - 1 和 i + 1 代表和 i 相邻的两个气球的序号；
 * 如果 i - 1或 i + 1 超出了数组的边界，那么就当它是一个数字为 1 的气球；
 * 求所能获得硬币的最大数量。
 *
 * 输入：nums = [3,1,5,8] 输出：167
 * 解释： nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> [] coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
 *
 * 输入：nums = [1,5] 输出：10
 *
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
    const len = nums.length
    const points = []
    points[0] = 1
    points[len + 1] = 1
    for (let i = 1; i <= len; i++) {
        points[i] = nums[i - 1]
    }
    const dp = Array.from(Array(len + 2), () => Array(len + 2).fill(0))

    // k是区间 (i, j)范围内的最后一个戳破的气球，然后在计算dp[i][j]能拿到的最高分
    // dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + points[i] * points[j] * points[k])

    for (let i = len; i >= 0; i--) {
        for (let j = i + 1; j < len + 2; j++) {
            for (let k = i + 1; k < j; k++) {
                dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + points[i] * points[j] * points[k])
            }
        }
    }
    // 因为对于定义的dp[i][j]来说，对应的区间是(i, j),i,j是不戳破的，但是在题意中，nums内的气球是需要戳破的，所以返回的是len - 1,这样就包含了[0, n]的所有气球
    return dp[0][len + 1]
}

/**
 * 416. 分割等和子集:  给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 * 输入：nums = [1,5,11,5] 输出：true 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
 * 输入：nums = [1,2,3,5] 输出：false 解释：数组不能分割成两个元素和相等的子集。
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    /**
     * 可以转换为：pick一部分元素，与非pick的元素进行比较和
     *
     * 1. 明确状态和选择： 子集元素之和，可选择的元素
     * 2. 明确dp数组的定义：dp[i][sum] = x : 对于前i个元素，当前背包的容量为sum时，若x为true,则说明可以将背包装满，若x为false，则说明不能恰好将背包装满；
     */

    const sum = nums.reduce((total, item) => (total += item), 0)
    if (sum % 2 !== 0) return false

    const len = nums.length

    const need = sum / 2
    // const dp = Array.from(Array(len + 1), () => Array(need + 1).fill(false))
    // for (let i = 0; i <= len; i++) {
    //     // 初始化每个元素，都是可以装入背包的
    //     dp[i][0] = true
    // }
    // for (let i = 1; i <= len; i++) {
    //     for (let j = 1; j <= need; j++) {
    //         if (j - nums[i - 1] < 0) {
    //             // 背包容量不足
    //             dp[i][j] = dp[i - 1][j]
    //         } else {
    //             dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
    //         }
    //     }
    // }
    // return dp[len][need]

    // 状态压缩
    const dp = Array.from(need + 1).fill(false)
    dp[0] = true // 不选任何数，一定可以凑出 0
    for (let i = 0; i < len; i++) {
        for (let j = need; j >= 0; j--) {
            if (j - nums[i] >= 0) {
                // 用 dp[j] 表示“是否能凑出 j”，每次遍历一个数，就更新所有可能的 j（必须倒序，避免重复使用当前数）。
                dp[j] = dp[j] || dp[j - nums[i]]
            }
        }
    }
    return dp[need]
}

/**
 * 322. 零钱兑换:  给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。 你可以认为每种硬币的数量是无限的
 * 输入：coins = [1, 2, 5], amount = 11 输出：3 解释：11 = 5 + 5 + 1
 * 输入：coins = [2], amount = 3 输出：-1
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    /**
     * 凑成总金额所需的 最少的硬币个数； 如果没有任何一种硬币组合能组成总金额，返回 -1
     *          1
     *    1     2     5
     * 1  2 5
     *
     * 1. 确定状态和选择
     * 会变化的状态：金额总数，硬币数量
     * 可选择的变量：当前金币   使用 || 不使用
     * 定量：金币金额 coins[i]
     * 找到满足总金额的最小硬币个数
     *
     * 2. 确定dp数组的定义，与递归公式
     * dp[amount] = x : 对于金额amount，所需要的硬币数
     *
     * 3. 如何初始化，与遍历顺序
     * dp[0] = 0 : 对于金额0，不需要任何一枚硬币
     *
     *
     * 4. 确定遍历方向
     *
     */

    // 先遍历物品
    // 先遍历硬币时，金额循环从 coin 开始，已经隐含保证了 i - coin >= 0
    // const n = coins.length
    // const dp = Array(amount + 1).fill(Infinity)
    // dp[0] = 0

    // for (let i = 0; i < n; i++) {
    //     for (let j = coins[i]; j <= amount; j++) {
    //         if (dp[j - coins[i]] !== Infinity) {
    //             dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
    //         }
    //     }
    // }
    // return dp[amount] === Infinity ? -1 : dp[amount]

    // 先遍历背包; 要注意边界控制： i - coins[j] >=0
    // 先遍历金额时，金额从 0 开始遍历，每个硬币都有可能超过当前金额，所以必须显式判断 i - coin >= 0
    const n = coins.length
    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 0; i <= amount; i++) {
        for (let j = 0; j < n; j++) {
            if (i - coins[j] >= 0 && dp[i - coins[j]] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
}

/**
 * 494. 目标和: 给你一个非负整数数组 nums 和一个整数 target
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1"
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目
 * 
 * 题解：
 * 1. 在每个整数前添加+或者-,其实就是+=nums[i]和-=nums[i]
 * 
 * 输入：nums = [1,1,1,1,1], target = 3 输出：5
解释：一共有 5 种方法让最终目标和为 3 。
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3

输入：nums = [1], target = 1 输出：1
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    // 回溯
    // const len = nums.length
    // let res = 0
    // function trackBack(i, sum) {
    //     if (i === len) {
    //         if (sum === target) {
    //             res++
    //         }
    //         return
    //     }
    //     trackBack(i + 1, sum + nums[i])
    //     trackBack(i + 1, sum - nums[i])
    // }
    // trackBack(0, 0)
    // return res

    /**
     * 为什么最终转换成了背包问题：
     * 对于nums数组，要构成target,假设将nums数组分成了正数部分之和P,负数部分之和N
     * 满足： P + (-N) = target
     * 同时： P + N = sum(nums)
     * 两个公式相加：
     *  P + (-N) +  P + N = target + sum(nums)
     * 2P = target + sum(nums)
     * P = (target + sum(nums)) / 2 -----> 从 nums 中选择一些数字，使它们的和等于 P，有多少种方法？  -------> 0/1 背包求方案数问题
     *
     *
     * dp[sum] = dp[sum-nums[i]] + dp[nums[i]]
     * dp[sum] = dp[sum+nums[i]] - dp[nums[i]]
     */
    const sum = nums.reduce((a, b) => a + b, 0)

    if (sum < Math.abs(target) || (sum + target) % 2 == 1) return 0

    function subsets(nums, sum) {
        const n = nums.length
        const dp = Array.from(Array(n + 1), () => Array(sum + 1).fill(0))
        for (let i = 0; i <= n; i++) {
            dp[i][0] = 1
        }
        /**
         * 1. 为什么初始化dp，用的长度是 n + 1，是为了增加一个空集合状态，对应dp[i][0] = 1; 回顾dp[i][j]的定义是：前 i 个元素中，组成 j 的方案数。
         * 2. 基于i下标的定义，所以在比较中，需要用 i-1 来对遍历中的元素进行取值
         */
        for (let i = 1; i <= n; i++) {
            for (let j = 0; j <= sum; j++) {
                if (j >= nums[i - 1]) {
                    dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i - 1]]
                } else {
                    dp[i][j] = dp[i - 1][j]
                }
            }
        }
        return dp[n][sum]
    }

    return subsets(nums, (sum + target) / 2)
}

/**
 * 518. 零钱兑换 II : 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额
 * 请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0
 * 输入：amount = 5, coins = [1, 2, 5] 输出：4 解释：有四种方式可以凑成总金额： 5=5 5=2+2+1 5=2+1+1+1 5=1+1+1+1+1
 * 输入：amount = 3, coins = [2] 输出：0 解释：只用面额 2 的硬币不能凑成总金额 3 。
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
    /**
     * 1. 确定状态和选择
     * 选择：硬币
     * 状态：金额  硬币组合
     * 返回可以凑成总金额的所有硬币组合数
     *
     * 2. 确定dp数组的定义，初始化
     * dp[i][j] = x  用i个硬币组成金额j的组合有x个
     * dp[0][0] = 0
     * dp[1][1] = 1
     * dp[2][1] = 1 < 2 ... dp[i-1][j] = dp[1][1] = 1
     * dp[5][1] = 1 < 2 ... dp[i-1][j] = dp[1][1] = 1
     *
     *    0  1  2  3  4  5
     * 0  0  0  0  0  0  0
     * 1  1  1  1  1
     * 2  1  1
     * 5  1
     * dp[1][5] = 1
     * dp[2][5] = dp[]
     * 对于coin[i]:
     * 如果使用它，对应的组合就是：dp[i][j-coin[i]] -> 也就是对应的由当前coin[i] + (j - coin[i])的组合数 组成一个新的硬币组合
     * 如果不使用，对应的组合就是：dp[i-1][j] -> 也就是使用上一个硬币的组合
     *
     * 初始化：
     * dp[0][i] = 0; 硬币为0值时，没有组合
     * dp[i][0] = 1; 金额为0时，什么都不选
     *
     * 3. 递推公式推导：找到所有满足的硬币组合
     * 如果选择当前硬币： dp[i][j] = dp[i-1][j] + dp[i][j-coin[i]]
     * 如果不选当前硬币： dp[i][j] = dp[i-1][j]
     * 
     * [
     0  1  2  3  4  
0  [ 0, 0, 0, 0, 0, 0 ],
1  [ 1, 1, 1, 1, 1, 1 ],
2  [ 1, 1, 2, 2, 3, 3 ],
5  [ 1, 1, 2, 2, 3, 4 ]
]
     *
     * 4. 遍历顺序确定
     */
    const n = coins.length
    const dp = Array.from(Array(n + 1), () => Array(amount + 1))

    for (let i = 0; i <= n; i++) {
        dp[i][0] = 1
    }
    for (let i = 0; i <= amount; i++) {
        dp[0][i] = 0
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= amount; j++) {
            if (j - coins[i - 1] >= 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]]
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    return dp[n][amount]
}

/**
 * 打家劫舍
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    const n = nums.length
    const dp = Array(n + 1).fill(0)
    dp[0] = nums[0]
    for (let i = 1; i < n; i++) {
        const pre = dp[i - 2] || 0
        dp[i] = Math.max(nums[i] + pre, dp[i - 1])
    }
    return dp[n - 1]
}

/**
 * 打家劫舍2
 * 输入：nums = [2,3,2] 输出：3 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    // 因为是环形结构，所以意味着在[i...j]之中，只能选择[i...j-1]或者[i+1...j]
    const n = nums.length
    if (n < 2) return nums[0]
    const nums1 = nums.slice(0, n - 1)
    const nums2 = nums.slice(1, n)
    const dp1 = Array(n).fill(0)
    dp1[0] = nums1[0]
    for (let i = 1; i < n - 1; i++) {
        const pre = dp1[i - 2] || 0
        dp1[i] = Math.max(dp1[i - 1], nums1[i] + pre)
    }
    const dp2 = Array(n).fill(0)
    dp2[0] = nums2[0]
    for (let i = 1; i < n - 1; i++) {
        const pre = dp2[i - 2] || 0
        dp2[i] = Math.max(dp2[i - 1], nums2[i] + pre)
    }
    return Math.max(dp1[n - 1], dp2[n - 1])

    const n = nums.length
    if (n === 1) return nums[0]
    if (n === 2) return Math.max(nums[0], nums[1])
    function dp(numTemp) {
        const n = numTemp.length
        const dpList = Array(n).fill(0)
        dpList[0] = numTemp[0]
        for (let i = 1; i < n; i++) {
            const pre = dpList[i - 2] || 0
            dpList[i] = Math.max(numTemp[i] + pre, dpList[i - 1])
        }
        return dpList[n - 1]
    }
    const pre = dp(nums.slice(0, n - 1))
    const tail = dp(nums.slice(1, n))
    return Math.max(pre, tail)
}

/**
 * 337. 打家劫舍 III
 * 除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。
 * 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警
 * 给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
    // root root.left root.right

    const memo = new Map()

    function dp(root) {
        if (root === null) return 0

        if (memo.get(root) !== undefined) {
            return memo.get(root)
        }

        // 选择当前节点
        const pick = root.val + (root.left === null ? 0 : dp(root.left.left) + dp(root.left.right)) + (root.right === null ? 0 : dp(root.right.left) + dp(root.right.right))
        const skipPick = dp(root.left) + dp(root.right)

        const res = Math.max(pick, skipPick)

        memo.set(root, res)

        return res
    }
    return dp(root)
}
