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
 * 72. 编辑距离: 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数
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
