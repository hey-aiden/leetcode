/**
 * 动态规划记录：
 * 1. 在爬楼梯算法中，dp数组dp[i]的含义是：到达第 i 阶（起点）的方法数；
 *    其中，初始化声明了dp[0] = 1，表示要到达第0阶的方法有1中 - 也就是什么都不做(也可以试做一种方法。)
 *
 * 在算法里，方案或者方法更准确的意思是：一种满足条件的可能性，而不是一定要做了什么
 *
 * dp[0] = 1 并不是一个生活语义，而是一个数学语义：动态规划追求的是：递推公式能够在所有状态上统一成立。
 *
 * ----为什么对于dp数组的0，也可以理解为一种方案----
 * 在动态规划、组合数学和算法中，空方案（什么都不做）通常被认为是一种合法方案，例如：空集合也是一个集合
 * -------------------------------------------
 *
 * 所以对于初始状态的定义，要结合数学语义来分析，比如空组合、空集，也是一种答案
 *
 *
 *
 */

/**
 * 斐波那契数列
 * 重点：对于结果需要取模：答案需要取模 1e9+7(1000000007)，不然会因为忘记取模导致大数溢出；
 *
 * 为什么不能最后再取模：
 * 如果不在计算过程中取模，随着数据规模增大，中间结果会越来越大，超过 JavaScript / Java / C++ 等语言能够安全表示的范围，导致结果错误
 *
 * 大数溢出： 超过了 Number 能够精确表示整数的范围，导致精度丢失
 * 为什么取模可以避免这个情况：取模并不会让计算更准确，而是主动把数字限制在一个很小的范围内，因此永远不会增长到超过数据类型的表示能力；
 * 要注意：取模之后得到的数，并不等于原来的数，但是，题目根本就不要原来的数，它要的是"原来的数取模后的结果"
 *
 * 为什么中间可以取模：(a+b)%M=((a%M)+(b%M))%M； 虽然中间数字变了，但最后得到的"模 M 的结果"没有变
 *
 * 如果题目要求返回真正的 F(n)，那就绝对不能每一步都取模
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    // 动态规划
    // const dp = []
    // dp[0] = 0
    // dp[1] = 1
    // const mod = 1000000007
    // for (let i = 2; i <= n; i++) {
    //     dp[i] = (dp[i - 1] + dp[i - 2]) % mod
    // }
    // return dp[n]

    // 递归 - 带备忘录优化

    const memo = new Map()
    function recursion(n) {
        if (n === 0) return 0
        if (n === 1) return 1
        if (memo.has(n)) return memo.get(n)
        const res = recursion(n - 1) + recursion(n - 2)
        memo.set(n, res)
        return res % 1000000007
    }
    return recursion(n)
}

/**
 * 70. 爬楼梯:  假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    /**
     * 1. 找到状态和选择
     * 状态：楼梯的层数
     * 选择：1个台阶或者2个台阶
     *
     * 2. DP数组及其下标的含义，确定递推公式
     * · 每次可以爬1或2个台阶，那么当前第i个台阶的
     * dp[i] = x 有x种方法可以走到第i个台阶
     * dp[0] = 1;
     * dp[1] = 1; // 站上1个台阶只有1种方法
     * ----- dp[2] = (dp[1] + 1,  dp[0] + 2) // 可以是dp[1]走1个台阶；也可以是dp[0]走两个台阶
     * 所以：
     * dp[2] = dp[1] + dp[0]
     *
     * dp[3] = dp[2] + dp[1]
     *
     *
     */
    // const dp = []
    // dp[0] = 1
    // dp[1] = 1
    // for (let i = 2; i <= n; i++) {
    //     dp[i] = dp[i - 1] + dp[i - 2]
    // }
    // return dp[n]

    // 也可以跳过对dp[0]的定义，直接从 i = 3 开始遍历；这样可以跳过对dp[0]应该等于1的理解; 要注意的是：当i从3开始，要注意加上边界剪枝操作，if(n===1) return

    /** 状态压缩 */
    if (n === 1) return 1
    let prev1 = 1,
        prev2 = 2
    for (let i = 3; i <= n; i++) {
        const cur = prev1 + prev2
        prev1 = prev2
        prev2 = cur
    }
    return prev2
}

/**
 * 746. 使用最小花费爬楼梯
 * 给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。
 * 你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
 * 请你计算并返回达到楼梯顶部的最低花费。
 *
 * 输入：cost = [10,15,20] 输出：15 解释：你将从下标为 1 的台阶开始。 - 支付 15 ，向上爬两个台阶，到达楼梯顶部。 总花费为 15 。
 *
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
    /**
     * 1. 确定状态和选择
     * 楼梯起点：选择下标为 0 或下标为 1 的台阶开始爬楼梯
     * 每次楼梯面临的选择是：cost[i+1] vs cost[i+2]
     * 状态：花费的成本
     *
     * 2. 确定dp数组及其下标
     * dp[i] = x 选择第i个台阶时，需要支付的费用
     * dp[0] = cost[0]
     * dp[1] = cost[1]
     * dp[2] = Math.min(dp[0], dp[1]) + cost[2]
     * dp[3] = Math.min(dp[2], d[1]) + cost[3]
     *
     * 3. 去顶递推公式
     * dp[i] = Math.min(dp[i-1], dp[i-2]) + cost[i]
     *
     * 4. 边界考虑 到达楼顶，必须保证还有一步可以走
     */
    // const n = cost.length
    // const dp = []
    // dp[0] = cost[0]
    // dp[1] = cost[1]
    // for (let i = 2; i <= n; i++) {
    //     const cur = cost[i] || 0 // 如果已经在n了，那么就不用花钱了。
    //     dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cur
    // }
    // return dp[n]
    /**
     * dp数组定义优化：
     * dp[i]表示到达第i个台阶所需要的花费；
     * 因为可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯，所以dp[0] = dp[1] = 0
     */
    // const n = cost.length
    // const dp = []
    // dp[0] = 0
    // dp[1] = 0
    // for (let i = 2; i <= n; i++) {
    //     dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
    // }
    // return dp[n]

    /** 状态压缩 */
    const n = cost.length
    let prev2 = 0,
        prev1 = 0
    for (let i = 2; i <= n; i++) {
        const cur = Math.min(prev1 + cost[i - 1], prev2 + cost[i - 2])
        prev2 = prev1
        prev1 = cur
    }
    return prev1
}

/**
 * 不同路径
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。问总共有多少条不同的路径？
 * 输入：m = 3, n = 2 输出：3
 * x x
 * x x
 * x x
 * 解释： 从左上角开始，总共有 3 条路径可以到达右下角。
 * 1. 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右
 * 3. 向下 -> 向右 -> 向下
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    /**
     * 1. 确定状态和选择
     * m是横坐标、n是纵坐标
     * 每一步可以向下移动，也可以向右移动
     * 所以要到达当前路径，来自于两条路径，分别是：左边的那个路径n-1，往后走一格子；或者上面的那个路径m-1，往下走一格子。
     *
     * 2. 确定dp数组及其下标含义
     * dp[i][j] = n  从[0,0]出发，到达坐标[i,j]的路径有n条
     *
     * 3. 确定递推公式
     *
     * dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
     *
     * 4. dp数组初始化，以及遍历顺序
     * dp[i][0] = 1
     * dp[0][j] = 1
     * 对于直线上的所有格子来说，都只有一条路径
     */

    const dp = Array.from(Array(m), () => Array(n).fill())
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1
    }
    for (let i = 0; i < n; i++) {
        dp[0][i] = 1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
}

/**
 * 63. 不同路径 II
 * 给定一个 m x n 的整数数组 grid。一个机器人初始位于 左上角（即 grid[0][0]）。
 * 机器人尝试移动到 右下角（即 grid[m - 1][n - 1]）。机器人每次只能向下或者向右移动一步。
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。机器人的移动路径中不能包含 任何 有障碍物的方格。
 * 返回机器人能够到达右下角的不同路径数量
 *
 * 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]] 输出：2
 * 0 0 0
 * 0 1 0
 * 0 0 0
 * 解释：3x3 网格的正中间有一个障碍物。 从左上角到右下角一共有 2 条不同的路径：
 * 1. 向右 -> 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右 -> 向右
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
    /**
     * dp[m][n] = dp[m-1][n] + dp[m][n-1]
     */

    // 边界检测：
    if (obstacleGrid[0][0] === 1) return 0

    const m = obstacleGrid.length
    const n = obstacleGrid[0].length

    const dp = Array.from(Array(m), () => Array(n).fill(0))

    let stopPass = false
    for (let i = 0; i < m; i++) {
        if (obstacleGrid[i][0] === 1) stopPass = true
        dp[i][0] = stopPass ? 0 : 1
    }
    stopPass = false
    for (let i = 0; i < n; i++) {
        if (obstacleGrid[0][i] === 1) stopPass = true
        dp[0][i] = stopPass ? 0 : 1
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[i][j] = 0
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
        }
    }
    return dp[m - 1][n - 1]
}

/**
 * 343. 整数拆分
 * 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。 返回 你可以获得的最大乘积 。
 * 输入: n = 2 输出: 1
 * 解释: 2 = 1 + 1, 1 × 1 = 1。
 *
 * 输入: n = 10 输出: 36
 * 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
 *
 * @param {number} n  2 <= n <= 58
 * @return {number}
 */
var integerBreak = function (n) {
    /**
     * 1. 确定状态和选择
     * 拆分一个正整数，返回拆分后的所有数的最大乘积之和。
     *
     * 2. 确定dp数组及其下标的含义
     * dp[n] = x 表示对于正整数n，最大乘机为 x; n >= 2
     * dp[1] = 1
     * dp[2] = 1   1+1 = 1
     * dp[3] = 2;  1+2; 那么dp[3] 可以是 1 * 2； 也可以是 1 * (1 * 1 -- 来自dp[2]的乘积)   dp[1] * dp[2] = 1
     * dp[4] = 4;  1+3; 2+2;
     * dp[5] = 6;  1+4; 2+3;
     * dp[6] = 9;  1+5; 2+4; 3+3
     * dp[7] = 12; 1+6; 2+5; 3+4
     * dp[8] = 16; 1+7; 2+6; 3+5; 4 + 4  dp[4]*dp[4]
     * dp[9] = 27; 1+8;2+7; 2+3+4; 3+6; 4+5;   1*dp[8] 2*dp[7] 3*dp[6] 4*dp[5] 5*dp[4]
     * dp[10] = 36;   1+9; 2+8; 3+7; 4+6; 5+5;
     *
     *
     *
     * 3. 找到递归公式
     * dp[n] = Math.max(  (n-1)*dp[n-1], (n-2)*dp[n-2], (n-3)*dp[n-3], ... )
     *
     * 从1遍历j，然后有两种渠道得到dp[i].
     * 一个是j * (i - j) 直接相乘
     * 一个是j * dp[i - j]，相当于是拆分(i - j)
     *
     *
     */
    const dp = Array.from(n).fill(0)
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        for (let j = 1; j < i; j++) {
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j])
        }
    }

    return dp[n]
}
