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
     * 找规律：
     * 对于字符串数组：["10", "0001", "111001", "1", "0"]
     * 字符串包含'0'的统计序列是：[1,3,2,0,1]
     * 字符串包含'1'的统计序列是：[1,1,4,1,0]
     *
     * 背包问题？ m x n的背包容量下的最大个数 ❎
     *
     * 选择和状态：对于字符串的选择，影响的是m,n的容量
     * 每个字符串可以选，可以跳过；
     * 选择后：基于当前字符串的m,n的数量增加；
     * 跳过当前字符：基于上一个字符串的m,n数量
     *
     * 可以改为：选择当前字符后，在满足字符串'0'的前提下，满足字符串'1'要求的最大个数 ❎
     *
     * 对于[1,3,2,0,1]，组成<m的最长子集；
     * 对于[1,1,4,1,0]，组成<n的最长子集；
     * 不就是两个背包问题了吗，背包容量为m/n的最大字符串数量； 双重背包？
     *
     *
     *
     * 1. 明确dp数组及其下标的含义
     * dp[i] 可以拿到最多子集的集合； 但是如何满足兼顾n的限制呢？
     *
     *
     *
     * 理解失误：
     * 完整可以理解为是01背包问题，m/n对应的是背包，物品本身还是strs数组的子项
     *
     * 1. 确定dp数组，及其下标的含义
     * dp[i][j]代码有i个0和j个1的字符串，所能包含的最大字符串子项个数
     * 2. 初始化dp数组
     * 数组初始化后，每一项为0
     * 对于每个子项，str -> 包含i个0，j个1,都可以初始化为dp[i][j] = 1
     */

    const strLen = strs.length
    function markStr(str) {
        const len = str.length
        let zeroCount = 0,
            oneCount = 0
        for (let i = 0; i < len; i++) {
            if (str[i] == '0') {
                zeroCount++
            } else {
                oneCount++
            }
        }
        return {
            zero: zeroCount,
            one: oneCount,
        }
    }
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0))
    for (let i = 0; i < strLen; i++) {
        const str = strs[i]
        const { zero, one } = markStr(str)
        for (let i = m; i >= zero; i--) {
            for (let j = n; j >= one; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - zero][j - one] + 1)
            }
        }
    }
    return dp[m][n]

    /**
     * 了解题意：
     * 1. 返回strs的最大子集的长度；
     * 2. strs[i] 是一个由 '0''1'组成的字符；
     * 3. 子集的'0'字符的总数<=m,'1'字符的总数<=n
     *
     * 1. 确定dp数组及其下标含义
     * dp[i]表示区间[0,i]下，在满足[m,n]限制下的对应的子集个数
     *
     * 需要校验 m,n 在当前区间的次数
     *
     * 输入：strs = ["10", "0001", "111001", "1", "0"]
     *
     * dp[0]: 1:1  0:1
     * dp[1]: 1:1  0:3
     * dp[2]: 1:4  0:2
     * dp[3]: 1:1  0:0
     * dp[4]: 1:0  0:1
     *
     * 构造两个数组：记录字符串0的数组：[1,3,2,0,1]； 记录字符串1的数组：[1,1,4,1,0];
     * 基于这两个数组，找出满足[m,n]范围内的最多子集。
     *
     *      1      3       2       0       1
     *
     * 1  (1,1)  (1,4)   (1,6)   (1,6)   (2,6)
     *
     * 1  (2,1)  (2,4)   (2,6)   (2,6)   (2,6)
     *
     * 4  (6,1)  (3,6)   (1,6)   (1,6)   (2,6)
     *
     * 1  (7,1)  (1,3)   (1,6)   (1,6)   (2,6)
     *
     * 0  (7,1)  (1,3)   (1,6)   (1,6)   (2,6)
     *
     * 遍历的过程中，要取小的。
     *
     * ["10", "0001", "111001", "1", "0"]
     * dp[m][n]: 满足m,n的最大子集： m代表0，n代表1
     * m = 5, n = 3
     * 字符串0：[1,3,2,0,1];
     * 字符串1：[1,1,4,1,0];
     * dp[1][1] = 1
     * dp[3][1] = 1
     * dp[2][4] = 1
     * dp[0][1] = 1
     * dp[1][0] = 1
     *
     * dp[i] = 遍历到i时，满足m,n的前提下，能选择的最大子集；
     * 在遍历的过程中， 除了更新最大子集，还要更新最大子集的边界，也就是m,n的余量
     * dp[0] = 1
     * dp[1] = dp[0]
     *
     */
    // 遍历strs,将每一项的m,n信息标记
    // const n = strs.length
    // const strItems = []
    // for (let i = 0; i < n; i++) {
    //     strItems.push(markStr(strs[i]))
    // }
    // function markStr(str) {
    //     let zeroCount = 0,
    //         oneCount = 0
    //     for (let i = 0; i < str.length; i++) {
    //         if (str[i] === '1') {
    //             oneCount++
    //             return
    //         }
    //         zeroCount++
    //     }
    //     return {
    //         zero: zeroCount,
    //         one: oneCount,
    //     }
    // }
    // 遍
    // const zeroList = []
    // const oneList = []
    // const n = strs.length
    // for(let i = 0; i < n; i++) {}
}

/**
 * 518. 零钱兑换 II
 * 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额
 * 请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0
 * 假设每一种面额的硬币有无限个。
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
    /**
     *
     * 要返回的是组合数
     *
     * 1. 确定dp公式及其含义
     * dp[amount] 表示凑成金额 amount 的组合
     *
     * 2. 确定递推公式
     *
     * dp[coins[i]] = Math.max(dp[coins[i]], dp[amount-coins[i]])
     *
     * 3. dp数组初始化：
     * 对于每一个硬币的coins[i],对应的组合数都是1,dp[coin]初始值都是1
     *
     * dp[i] = dp[amount-i] + dp[i], dp[i]
     *
     *
     * [1,2,5]  amount = 5
     *
     * 1 1
     *
     */

    /**
     * 1. 先定义2维dp
     * dp[i][amount]: 在第i个硬币下，能凑成总额为amount的组合数
     *
     * 2. 递推公式
     * 对于目标金额为j的组合，前i个硬币的组合数 = 前一个组合满足金额为j的组合，以及当前已有的金额为j-coins[i]的组合，意味着再补一个coins[i]即可，因为是完全背包，可以重复使用
     * dp[i][j] = dp[i-1][j] + dp[i][j-coins[i]]
     *
     * 3. 初始化
     * 对于每一个金额来说：dp[0][coins[i]] = 1
     * 对于每一个目标金额0来说，dp[i][0] = 1
     *   0  1  2  3  4
     * 0
     * 1
     * 2
     * 5
     *
     */
    // const n = coins.length

    // const dp = Array.from(Array(n), () => Array(amount + 1).fill(0))

    // for (let i = 0; i < n; i++) {
    //     dp[i][0] = 1
    // }

    // for (let j = 0; j <= amount; j++) {
    //     if (j % coins[0] === 0) {
    //         dp[0][j] = 1
    //     }
    // }

    // for (let i = 1; i < n; i++) {
    //     for (let j = 0; j <= amount; j++) {
    //         if (coins[i] > j) {
    //             dp[i][j] = dp[i - 1][j]
    //         } else {
    //             dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i]]
    //         }
    //     }
    // }

    // return dp[n - 1][amount]

    /**
     * 一维dp
     * dp[j]: 凑成总金额为j的组合数为dp[j]
     * dp[j]的组合数 = dp[j - coins[i]]的组合数之和
     *
     * [1,2,5]  5
     *
     * i = 0, coins[i] = 1
     * j = 1  j <= 5  dp[1] = dp[1] + dp[0] = 0 + 1 = 1
     * j = 2  j <= 5  dp[2] = dp[2] + dp[1] = 0 + 1 = 1
     * j = 3  j <= 5  dp[3] = dp[3] + dp[2] = 0 + 1 = 1
     * j = 4  j <= 5  dp[4] = dp[4] + dp[3] = 0 + 1 = 1
     * j = 5  j <= 5  dp[5] = dp[5] + dp[4] = 0 + 1 = 1
     *
     *
     * i = 1, coins[i] = 2
     * j = 2  2 <= 5  dp[2] = dp[2] + dp[0] = 1 + 1 = 2
     * j = 3  3 <= 5  dp[3] = dp[3] + dp[1] = 1 + 1 = 2
     * j = 4  4 <= 5  dp[4] = dp[4] + dp[2] = 1 + 2 = 3
     * j = 5  5 <= 5  dp[5] = dp[5] + dp[3] = 1 + 2 = 3
     *
     * i = 2, coins[i] = 5
     * j = 5  5 <= 5  dp[5] = dp[5] + dp[0] = 3 + 1 = 4
     *
     *
     *
     *
     */
    const n = coins.length
    const dp = Array(amount + 1).fill(0)
    dp[0] = 1 // 理解为此时金额为0，消耗到金额为0时，说明需要消耗当前硬币，所以遇到dp[0],需要+1，初始为 dp[0] = 1
    for (let i = 0; i < n; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] += dp[j - coins[i]]
        }
    }
    return dp[amount]
}

/**
 * 377. 组合总和 Ⅳ --- 有点像完全背包
 * 给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target
 * 请你从 nums 中找出并返回总和为 target 的元素组合的个数。
 * 输入：nums = [1,2,3], target = 4 输出：7
 * 解释： 所有可能的组合为：
 * (1, 1, 1, 1)
 * (1, 1, 2)
 * (1, 2, 1)
 * (1, 3)
 * (2, 1, 1)
 * (2, 2)
 * (3, 1)
 * 请注意，顺序不同的序列被视作不同的组合。 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
    /**
     * 找出所有总和为target的元素组合个数；
     * 1. 确定dp数组及其下标的含义
     * dp[i][target] = x; 第i个元素下，符合总和为target的组合个数为 x
     *
     * 最终返回：dp[len-1][target]
     *
     * 2. 递推公式
     * dp[i][target] = dp[i-1][target] + dp[i][target - nums[i]]
     *
     * nums: [1,2,3]  target: 4
     *    0  1  2  3  4
     * 1  1  1
     * 2  1
     * 3  1
     *
     * dp[0][0] = 1
     * dp[0][1] = 1
     * dp[1][1] = dp[0][1] + dp[1][0] = 1
     * dp[1][2] = dp[i-1][j] + dp[i][j-nums[i]] = dp[0][2] + dp[1][1]
     *
     *
     *
     * 重新设计：
     * 1. dp数组定义
     * dp[i]: 凑成目标为正整数i的排列个数为dp[i]；
     *
     * 2. 递推公式
     * dp[i] = dp[i] += dp[i-nums[j]]
     * 
     * 以 nums:[1,2,3]; target:4 为例：
     * dp[0] = 1
     * 
     * i = 1:
     * j = 0  1>=1  dp[1]+=dp[0]  dp[1] = 1
     * j = 1  1<2
     * 
     * i = 2:
     * j = 0  2>=1 dp[2] += dp[1]  dp[2] = 1
     * j = 1  2>=2 dp[2] += dp[0]  dp[2] = 2
     * j = 2  2<3 
     * 
     * i = 3:
     * j = 0  3>=1 dp[3] += dp[2]   dp[3] = 2
     * j = 1  3>=2 dp[3] += dp[1]   dp[3] = 3
     * j = 2  3>=3 dp[3] += dp[0]   dp[3] = 4
     * 
     * i = 4:
     * j = 0  4>=1 dp[4] += dp[3]  dp[4] = 4
     * j = 1  4>=2 dp[4] += dp[2]  dp[4] = 6
     * j = 2  4>=3 dp[4] += dp[1]  dp[4] = 7
     * 
     * 
     * 
     * 1 >= nums[0]
     * dp[1] += dp[0] : dp[1] = 1;
  
     *
     */

    const n = nums.length
    const dp = Array(target + 1).fill(0)
    dp[0] = 1
    for (let i = 1; i <= target; i++) {
        for (let j = 0; j < n; j++) {
            if (i >= nums[j]) {
                // 因为是要计算所有的排列，所以先遍历target，在每个target下，获取nums[i]的可能性
                dp[i] += dp[i - nums[j]]
            }
        }
    }
    return dp[target]

    // 二维dp - 不好实现
    // const n = nums.length
    // const dp = Array.from(Array(n), () => Array(target + 1).fill(0))

    // for (let i = 0; i < n; i++) {
    //     dp[i][0] = 1
    // }
    // for (let j = 1; j <= target; j++) {
    //     // 先遍历背包
    //     for (let i = 0; i < n; i++) {
    //         if (j < nums[i]) {
    //             dp[i][j] = dp[i - 1][j]
    //         } else {
    //             dp[i][j] = dp[i - 1][j] + dp[i][j - nums[i]]
    //         }
    //     }
    // }
    // return dp[n - 1][target]

    // gpt版本：
    var combinationSum4 = function (nums, target) {
        const n = nums.length

        const dp = Array.from({ length: target + 1 }, () => Array(n).fill(0))

        for (let i = 1; i <= target; i++) {
            for (let j = 0; j < n; j++) {
                const num = nums[j]

                if (i < num) continue

                const remain = i - num

                // 最后一位就是num
                if (remain === 0) {
                    dp[i][j] = 1
                } else {
                    // 枚举之前组成remain的所有情况
                    for (let k = 0; k < n; k++) {
                        dp[i][j] += dp[remain][k]
                    }
                }
            }
        }

        let result = 0

        for (let j = 0; j < n; j++) {
            result += dp[target][j]
        }

        return result
    }
}

/**
 * LCR 103. 零钱兑换
 * 给定不同面额的硬币 coins 和一个总金额 amount
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 *
 * 输入：coins = [1, 2, 5], amount = 11 输出：3
 * 解释：11 = 5 + 5 + 1
 *
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    /**
     * dp[i][j]：在硬币[0...i]中凑成金额为j的最小数量为dp[i][j]
     *
     * [j - coins[i]]，那么只需要加上一个钱币coins[i]即dp[j - coins[i]] + 1就是dp[j]（考虑coins[i]）
     * 所以dp[j] 要取所有 dp[j - coins[i]] + 1 中最小的。
     *
     * 递推公式：dp[j] = min(dp[j - coins[i]] + 1, dp[j]);
     *
     * dp[i][j] = dp[i-1][j], dp[i][j-nums[i]] + 1
     */

    const n = coins.length
    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 0; i < n; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            if (dp[j - coins[i]] !== Infinity) {
                dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
}

/**
 * 279. 完全平方数  给你一个整数 n ，
 * 返回 和为 n 的完全平方数的最少数量
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
 *
 * 输入：n = 12 输出：3
 * 解释：12 = 4 + 4 + 4
 *
 * 输入：n = 13 输出：2
 * 解释：13 = 4 + 9
 *
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    /**
     * 返回 和为 n 的完全平方数的最少数量
     *
     * 1. [0...n]之间所有的完全平方数；
     * 2. 找出这些完全平方数中，和为n的子集
     */
    let num1 = 1
    const nums = [1]

    while (num1 <= n) {
        nums.push(num1 * num1)
        num1++
    }

    /** 背包问题？ 完全背包
     * 返回最少数量
     * 在数组中找到和为n的最小子集
     *
     * [1,4,9,16] n=12
     *
     * 1. 确定dp数组：
     * dp[i][sum]: 在[1...i]中组成和为sum的最小数量
     *
     * dp[0][0] = 0
     * dp[1][1] = 1
     *
     *
     *
     * // Math.min 改为 Math.max 试试
     * dp[i][sum] = Math.min(dp[i-1][sum], dp[i-1][sum-nums[i]] + 1)
     * dp[1][1] = Math.min(dp[0][1], dp[0][0] + 1) = 1
     * dp[1][2] = Math.min(dp[0][2], dp[0][1] + 1) = ?
     *         12
     *    1        4        9
     * 1  4  9
     *
     * dp[i][sum] = Math.min(dp[i-1][sum], dp[i-1][sum-nums[i]] + 1)
     * dp[1][1] = Math.min(dp[0][1], dp[0][0] + 1) = 1
     * dp[1][4] = Math.min(dp[0][2], dp[0][1] + 1) = ?
     *
     * dp[1] = 1
     * dp[4] = 1
     * dp[9] = 1
     *
     *
     * 最少子集 -> 走倒序试试
     *
     * dp[0] = 0
     * dp[1] = 1
     * dp[2] = dp[1] + dp[1] = 2
     * dp[3]
     *
     * 先遍历背包：
     * if(nums[i] > j) {
     * }
     *
     * dp[i] += dp[sum - nums[i]]
     *
     * dp[2] += dp[2-1]
     *
     *    0  1  2  3  4
     * 0  0  0  0  0  0  0
     * 1  0  1  2  3  1
     * 4  0
     * 9  0
     *
     *
     *
     *
     * 1,2,3,4,5,
     * dp[j]: 和为j的最小完全平方数的最少数量
     *
     * 1. 使用当前遍历
     *
     * dp[j - i*i] + 1； 其实就是 dp[j] 由 i*i 组成
     *
     * dp[j] = dp[j - i*i] + 1
     *
     *
     *
     */
    const dp = Array(n + 1).fill(Infinity)

    dp[0] = 0
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            /**
             *  i = 1; j=1:  dp[1] = dp[0]+1 = 1
             *  i = 2:
             *  j = 1 dp[2] = Math.min(dp[2], dp[1] + 1) = 2
             *  j = 2  j*j > i; 跳过
             *
             *  i = 3:
             *  j = 1: dp[3] = Math.min(dp[3], dp[2] + 1) = 3
             *  j = 2: j*j > i; 跳过
             *
             *
             */
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1)
        }
    }

    return dp[n]
}

/**
 * 139. 单词拆分
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典
 * 如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
 * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
 *
 * 输入: s = "leetcode", wordDict = ["leet", "code"] 输出: true
 * 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
 *
 * 输入: s = "applepenapple", wordDict = ["apple", "pen"] 输出: true
 * 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。 注意，你可以重复使用字典中的单词。
 *
 * 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"] 输出: false
 *
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    /**
     * 判断是否可以利用字典中出现的一个或者多个单词拼接出s,可以的话，返回true
     * s = "leetcode"  wordDict = ["leet", "code"]
     *
     * 穷举所有的排列组合，看能否匹配到字符串 s
     *
     * leetcode: len = 8
     *
     * wordDict: leet: 4   code: 4
     *
     *        leet               code
     *    leet   code      leet       code
     * leet code       let code    leet  code
     *
     *
     * 完全背包+字符串匹配
     * 对于s: leetcode
     * 遍历整个s，获取遍历长度：[1, s.length]
     * 在字符串长度 [1...i]上，遍历过程中，看是否能找到匹配字典内的值的元素，如果找到，那么dp[i] = true
     * 设置一个滑动窗口[i...j],
     *
     * dp[i]: 在长度(0,i]上，是否能找到在字典中的单词ƒ
     *
     */
    const n = s.length

    const wordSet = new Set()
    for (let word of wordDict) {
        wordSet.add(word)
    }

    const dp = Array(n + 1).fill(false)
    dp[0] = true

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            const subWord = s.substring(j, i)
            if (wordSet.has(subWord) && dp[j] === true) {
                dp[i] = true
            }
        }
    }
    return dp[n]
}

/**
 * 打家劫舍
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    // 要求最大金额： dp[i] = 偷到的前i个房间时，所能获得的最大金额为 dp[i]
    const n = nums.length

    const dp = Array(n + 1).fill(0)

    dp[0] = 0
    dp[1] = nums[0]

    for (let i = 2; i <= n; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1])
    }

    return dp[n]
}

/**
 * 213. 打家劫舍 II
 * 这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
 *
 * 输入：nums = [1,2,3,1] 输出：4
 * 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。 偷窃到的最高金额 = 1 + 3 = 4 。
 *
 * 子问题分割，对于房屋排列：[1,2,3,1]
 * 取[1,2,3]和 [2，3，1] 中更大的数即可
 *
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    const n = nums.length
    if (n == 1) return nums[0]

    const nums1 = nums.slice(0, n - 1)
    const nums2 = nums.slice(1, n)

    function getMax(list) {
        const n = list.length
        const dp = Array(n + 1).fill(0)
        dp[0] = 0
        dp[1] = list[0]
        for (let i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 2] + list[i - 1], dp[i - 1])
        }
        return dp[n]
    }

    const profit1 = getMax(nums1)
    const profit2 = getMax(nums2)
    return Math.max(profit1, profit2)
}

/**
 * 337. 打家劫舍 III
 * 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警
 * 给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。
 *
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
    /**
     * 不能打劫两个直接相连的房子，也就是对于一个节点来说，要么跳过当前节点，偷取左右子树节点；要么跳过左右子树节点，偷取两边子子树
     *
     * 对于金额来说，最高金额有以下情况：
     * 1. 偷取root节点
     * root.val +  root.left.left && root.left.left.val + root.left.right
     * 2. 不偷root节点
     * root.left + root.right
     */

    const memo = new Map()

    function countProfit(root) {
        if (root === null) return 0

        if (root.left == null && root.right === null) return root.val

        if (memo.has(root)) {
            return memo.get(root)
        }

        let useRoot = root.val
        if (root.left) {
            useRoot += countProfit(root.left.left) + countProfit(root.left.right)
        }
        if (root.right) {
            useRoot += countProfit(root.right.left) + countProfit(root.right.right)
        }

        const skipRoot = countProfit(root.left) + countProfit(root.right)

        const maxProfit = Math.max(useRoot, skipRoot)

        memo.set(root, maxProfit)

        return maxProfit
    }
    return countProfit(root)
}

/**
 * 121. 买卖股票的最佳时机
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    /**
     *
     * 输入：[7,1,5,3,6,4] 输出：5
     * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     * 注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
     *
     * 买入和卖出只有一次操作，并且要先买入，才能卖出
     *
     * 寻找递增区间
     *
     * 1.dp数组及其下标的含义
     *
     */
    // 1. 贪心算法，对于股票区间[i...j],用左侧最小的与右侧最大的相减，得到的就是最大利润
    // const n = prices.length
    // let low = prices[0]
    // let profit = 0
    // for (let i = 1; i < n; i++) {
    //     low = Math.min(low, prices[i])
    //     profit = Math.max(profit, prices[i] - low)
    // }
    // return profit
    /**
     * 2. 动态规划
     * 对于一只股票，存在两种状态，一个是卖出，一个是持有
     * dp[i][0] 卖出股票的利润
     * dp[i][1] 持有股票的成本
     *
     * dp[0][0] = 0
     * dp[0][1] = prices[0]
     *
     * dp[i][0] = Math.max(prices[i] - dp[i-1][1], dp[i-1][0])
     * dp[i][1] = Math.min(prices[i-1][1], prices[i])
     */
    const n = prices.length
    const dp = Array.from(Array(n), () => [])

    dp[0][0] = 0
    dp[0][1] = prices[0]

    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(prices[i] - dp[i - 1][1], dp[i - 1][0])
        dp[i][1] = Math.min(dp[i - 1][1], prices[i])
    }

    return dp[n - 1][0]
}

/**
 * 714. 买卖股票的最佳时机含手续费
 * 给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。
 * 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了
 * 返回获得利润的最大值。
 * 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
 *
 * 输入：prices = [1, 3, 2, 8, 4, 9], fee = 2 输出：8
 * 解释：能够达到的最大利润:
 * 在此处买入 prices[0] = 1
 * 在此处卖出 prices[3] = 8
 * 在此处买入 prices[4] = 4
 * 在此处卖出 prices[5] = 9
 * 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
    /**
     * 每次交易要去掉2元利润，按卖出动作算； 允许多次交易
     *
     * 1. 确定Dp数组
     * dp[i][0]: 当前所得的利润, 清仓，没有股票的状态
     * dp[i][1]: 当前持有的股票成本，持股，买一手的状态
     */

    const n = prices.length

    const dp = Array.from(Array(n + 1), () => [])

    dp[0][0] = 0
    dp[0][1] = -prices[0]

    for (let i = 1; i < n; i++) {
        // dp[i][0]: 当前i不持有，接着i-1的空仓； dp[i][1]: 卖掉股票后的收益，去掉手续费 --- dp[i][0]：第 i 天结束时不持股的最大利润
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee)

        // dp[i][1]: 持有当前股票, 用 dp[i-1][0]去入手   --- dp[i][1]：第 i 天结束时持股的最大利润
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    }
    return dp[n-1][0]
}
