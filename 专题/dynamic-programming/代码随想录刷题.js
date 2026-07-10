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
     * 从1开始遍历j，然后有两种渠道得到dp[i]:
     * dp[3] = 1 * (3 - 1)   2 * (3 - 2)
     * dp[4] = 1 * (4 - 1)  2 * (4 - 2)   3 * ( 4 - 3)
     * 一个是j * (i - j) 直接相乘
     * 一个是j * dp[i - j]，相当于是拆分(i - j)
     *
     *
     */
    const dp = Array.from(n).fill(1)
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        // 由于拆分的对称性， j <= i / 2 即可，减少遍历次数。
        for (let j = 1; j < i; j++) {
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j])
        }
    }

    return dp[n]
}

/**
 * 96. 不同的二叉搜索树
 * 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
 * 输入：n = 3 输出：5
 * 输入：n = 1 输出：1
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
    /**
     * 1. 确定状态和选择
     * 二叉搜索树： 中序遍历是递增序列，左中右 => 找出所有递增序列的组合
     * 选择：当前节点可以作为：root  n-1:root.left; n-1:root.right   n>=1
     *
     * 2. 确定dp数组及其下标的含义
     * dp[1] = 1 : 当节点只有一个的时候，只会有一个节点，所以只有1种排列方式； [1]
     * dp[2] = 2 :  dp[i-1] + root(2)  root.left = 2-1  root.right溢出   ----->   dp[2] = dp[i-1] + 1
     *   1           2
     *     2        1
     * dp[3] = 5
     *  1           2          2                 3             4           1                      3
     *    2       1   3     1    4            2   4          3                   3           1
     *      3          4        3            1              2                 2                 2
     *       4          5                                  1
     *        5
     * dp[4] = 1,234;  12,34, 123,4,
     *
     *
     * dp[i]   left: i-1  right: i+1
     *
     * 2. 递推公式 推导
     *
     * dp[1] = 1
     * 1
     *
     *
     * dp[2] = 2
     *  1      2
     *   2    1
     *
     *
     * dp[3]
     *   1         1            2                 3             3
     *     2          3       1   3          1                2
     *       3      2                          2            1
     *
     * 对于树型结构的组合来看，可以计算成：dp[root] = dp[roo.left] x dp[root.right] -> 左子树节点的组合 x 右子树节点的组合
     *
     * dp[1]: 对于root单节点，也就是单节点root树，此时节点组合方式=1； ------- 只有root单节点
     * dp[2]: 对于root双节点，互为root节点, 此时节点组合方式=2；  ------ 此时左右子树都只有1个节点
     * dp[3]: 当n遍历到3时，此时组合式 = dp[root-1]组合 + dp[root-2]组合 + dp[root-3]组合
     *        当3为root时，左子树右两个节点，右子树0个节点
     *
     * 重新梳理理解，见dp[3]:
     * 1. 当1为头结点时，右子树有两个节点，结构跟n=2时一样；
     * 2. 当2为头结点时，左右子树都只有1个节点；
     * 3. 当3为头结点时，左右子树都只有1个节点
     *
     * root-1: dp[left=0] x dp[right = 2] = dp[0] x dp[2]
     * root-2: dp[left=1] x dp[right = 1] = dp[1] x dp[1]
     * root-3: dp[left=2] x dp[right = 0] = dp[2] x dp[1]
     *
     * dp[i]: 区间[1...n]，到n时得二叉树组合个数
     * j为[1...n]中每个可用作root节点的元素
     * dp[i] += dp[以j为头结点左子树节点数量] * dp[以j为头结点右子树节点数量]
     * dp[i] = dp[j-1] * dp[i-j]: j-1 为j为头结点左子树节点数量;  i-j 为以j为头结点右子树节点数量
     * 由于是二叉搜索树，所以在区间[1...j...i]中，[1...j-1]都是作为左子树的元素；[j+1...i]都是作为右子树的元素 = i-j   [1,2,3,4,5]: j = 2时， i = 4； 此时左子树是
     *
     */
    const dp = Array(n + 1).fill(0)
    dp[0] = 1 //空二叉树也是搜索二叉树
    // dp[1] = 1 // 如果i从1开始计算，那么dp[1]就不需要初始化了，不然dp[1]+=操作后，会变成dp[1] = 2
    for (let i = 1; i <= n; i++) {
        // 定义[j...i]区间; 计算每段[1...i]的涉及的节点数
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j]
        }
    }
    return dp[n]
}

/**
 * 95. 不同的二叉搜索树 II
 * 生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。可以按 任意顺序 返回答案。
 *
 * 输入：n = 3 输出：[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
 *
 *  * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 *
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
    if (n === 0) return null

    function generateTree(start, end) {
        if (start > end) return [null] // 该节点值溢出，用null填充

        /**
         *  res 保存的是区间 [start, end] 能构成的所有 BST(Binary Search Tree二叉树) 的根节点（root）
         *  每个 root 都代表一棵完整的 BST。
         */
        const res = []

        for (let i = start; i <= end; i++) {
            // 递归生成左区间和右区间的所有 BST
            const leftTrees = generateTree(start, i - 1)
            const rightTrees = generateTree(i + 1, end)

            // 将所有左子树与所有右子树进行组合
            for (const left of leftTrees) {
                for (const right of rightTrees) {
                    // 收集所有的可能性： [left] x [right]
                    const node = new TreeNode(i)
                    node.left = left
                    node.right = right
                    res.push(node)
                }
            }
        }
        return res
    }
    return generateTree(1, n)
}

/**
 * 分割等和子集： 给定一个非空的正整数数组 nums ，请判断能否将这些数字分成元素和相等的两部分。
 *
 * 输入：nums = [1,5,11,5] 输出：true 解释：nums 可以分割成 [1, 5, 5] 和 [11] 。
 * 输入：nums = [1,2,3,5] 输出：false 解释：nums 不可以分为和相等的两部分
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    /**
     *
     * 从数组nums中，找到和为sum/2的子集，或者说从 数组 nums中，找到是否存在子集之和为 sum/2
     *
     * 1. 确定dp数组下标及其含义
     * 找到在数组[0...i]中，满足和为j的子集
     * 对于dp[i][j]; 当j=0时，意味着背包装满了，此时初始值为true
     *       0        1         2          3         4
     * 1   true     true      false      false       false
     * 2   true
     * 5   true
     *
     * 2. 递推公式
     * 对于每个nums[i],都存在两种情况：
     * 1. 加上当前nums[i]  dp[i][j] = dp[i-1][sum - nums[i-1]]
     *    为什么是：dp[i-1][sum-nums[i-1]]:
     *    首先： dp[i][j]的含义是： 对于区间[0,i],是否满足存在子集之和为j，这个和可以包含当前nums[i],也可以不包含nums[i]
     *    1）：不取当前元素，即前一个元素中，是否已经存在该子集，满足[0,i-1]存在和为[j]的值，即：dp[i-1][j]的状态；
     *    2)；如果要取当前元素nums[i],那么如果要满足dp[i][j]为true，则依赖 i-1是否存在和为 sum-nums[i]的子集，使得 dp[j-1][sum-nums[i]]的基础上，+nums[i] = sum；
     *
     * 边界： 对于当前nums[i]是否使用，还取决于j跟nums[i]大小对比；如果j<nums[i]，背包已经放不下了，那么就取决于上一个i-1的情况
     *
     * 2. dp数组初始化
     * sum是从0开始，所以遍历每个nums是，对应的dp[i][0]应该是true，也就是当需要计算的子集之和是0时，存在的方案就是拿一个空集出来，也是一种方案，所以值为true;
     *
     */

    let sum = nums.reduce((total, item) => (total += item), 0)

    if (sum % 2 !== 0) return false // 奇数无法分割

    sum = sum / 2 // 问题变成在nums数组中，能否找到和为sum的子集  0-1背包问题

    const n = nums.length
    const dp = Array.from(Array(n), () => Array(sum + 1).fill(false))

    // 因为循环是从dp[1][0]开始的，所以dp[0][0]是需要初始化的
    dp[0][0] = true

    for (let i = 1; i < n; i++) {
        dp[i][0] = true
        for (let j = 1; j <= sum; j++) {
            if (j < nums[i]) {
                dp[i][j] = dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]]
            }
        }
    }
    return dp[n - 1][sum]
}

/**
 * 1049. 最后一块石头的重量 II
 * 有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。
 * 每一回合，从中选出任意两块石头，然后将它们一起粉碎。
 * 假设石头的重量分别为 x 和 y，且 x <= y。
 * 那么粉碎的可能结果如下：
 * 如果 x == y，那么两块石头都会被完全粉碎；
 * 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
 * 最后，最多只会剩下一块 石头。返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
    /**
     * 理解题意：
     * 每一回合，从中选出任意两块石头，然后将它们一起粉碎;
     * 粉碎的状态取决于两块石头的重量
     * 返回剩下的石头的最小可能重量
     *
     * 输入：stones = [2,7,4,1,8,1] 输出：1
     * 解释： 组合 2 和 4，得到 2，所以数组转化为 [2,7,1,8,1]，
     * 组合 7 和 8，得到 1，所以数组转化为 [2,1,1,1]，
     * 组合 2 和 1，得到 1，所以数组转化为 [1,1,1]，
     * 组合 1 和 1，得到 0，所以数组转化为 [1]，这就是最优值。
     *
     *    2  7  4  1  8  1
     *
     *
     *    0  1  2  3  4  5  6
     * 2  0  0  0  0  0  0  0
     * 7 0
     * 4 0
     * 1 0
     * 8 0
     * 1 0
     *
     * 如果要使得最终粉碎后的重量最小，那么要使得拿出来的石头重量越接近sum/2
     *
     * dp[i][j] = x 表示在区间[0...i]中，得到组合之和为j的最大重量值为 x
     *
     * 递推公式：
     * dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-stones[i]] + stones[i] )
     *
     * 初始化：
     * dp[0][0] = 0
     *
     */
    let sum = stones.reduce((total, item) => (total += item), 0)

    const target = Math.floor(sum / 2) // 对target向下取整； 这里确保了 sum - target > target 的

    const n = stones.length

    const dp = Array.from(Array(n), () => Array(target + 1).fill(0))

    for (let i = stones[0]; i <= target; i++) {
        dp[0][i] = stones[0]
    }

    // dp[0] 已经初始化过了，所以直接从 dp[0] 开始遍历
    for (let i = 1; i < n; i++) {
        dp[i][0] = 0
        for (let j = 0; j <= target; j++) {
            if (j >= stones[i]) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - stones[i]] + stones[i])
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    return sum - dp[n - 1][target] - dp[n - 1][target]
}

/**
 * 目标和:
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 :
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1"
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 *
 * 输入：nums = [1,1,1,1,1], target = 3 输出：5
 * 解释：一共有 5 种方法让最终目标和为 3 。
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    /**
     * 目标和为target,
     * 通过+,-符号，将数组划分为正数和负数；
     * 满足：
     * 构造出来的正数和 + 构造出来的负数和 = sum
     * 构造出来的正数和 - 负数和 = target
     * 2 * 构造出来的正数和 = sum + target
     * 构造出来的正数和 = (sum + target) / 2
     */

    // 从 nums 数组中，找到和为 count 的子集组合数
    /**
     *
     * 输入：nums = [1,1,1,1,1], target = 3
     *
     * 要得到 count = 4 的组合数; (sum(nums) + target) / 2
     *
     * nums[i]  count-nums[i]
     *
     * dp[i][j]: 在区间[0，i]中，找到组成和为j的子集个数
     *
     *
     *    0  1  2  3
     * 1  1  1  0  0
     * 1  1  2
     * 1  1
     * 1  1
     * 1  1
     *
     * dp[0][0] = 0
     * dp[0][1] = 1  dp[0][2] = 0  dp[0][3]
     *
     * dp[i][j] = x：表示在区间[0...i]中，组成和为j的方案有 x 种
     * dp[i][j] += (dp[i-1][j] + dp[i-1][j-i])
     *
     */
    const sum = nums.reduce((total, item) => (total += item), 0)

    let count = sum + target
    if (sum < target || count % 2 !== 0) return 0
    count = count / 2

    const n = nums.length

    const dp = Array.from(Array(n), () => Array(count + 1).fill(0))

    // 什么都不选，组成0
    dp[0][0] = 1

    // 只使用第一个元素
    if (nums[0] <= count) {
        dp[0][nums[0]] += 1
    }

    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= count; j++) {
            if (j < nums[i]) {
                dp[i][j] = dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i]]
            }
        }
    }
    // 这个是 [0...i] 的dp递归图表：
    // [
    //     [ 1, 1, 0, 0, 0 ],
    //     [ 1, 2, 1, 0, 0 ],
    //     [ 1, 3, 3, 1, 0 ],
    //     [ 1, 4, 6, 4, 1 ],
    //     [ 1, 5, 10, 10, 5 ]
    //   ]

    // 这个是 [0...i) 的dp递归图表； 所以会多一层
    // [
    //     [ 1, 0, 0, 0, 0 ],
    //     [ 1, 1, 0, 0, 0 ],
    //     [ 1, 2, 1, 0, 0 ],
    //     [ 1, 3, 3, 1, 0 ],
    //     [ 1, 4, 6, 4, 1 ],
    //     [ 1, 5, 10, 10, 5 ]
    //   ]
    return dp[n - 1][count]
}

/**
 * 474. 一和零
 * 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
 * 请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1 。
 * 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
 *
 * 输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3 输出：4
 * 解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
 * 其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1 ，大于 n 的值 3 。
 * 
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
    /**
     * 了解题意：
     * 1. 返回strs的最大子集的长度；
     * 2. strs[i] 是一个由 '0''1'组成的字符；
     * 3. 子集的'0'字符的总数<=m,'1'字符的总数<=n
     * 
     * 1. 确定dp数组及其下标含义
     * dp[i]表示区间[0,i]下，在满足[m,n]限制下的对应的最大子集个数
     */
}
