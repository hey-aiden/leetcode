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
