/**
 * 102. 二叉树的层序遍历
 * 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
 *
 * 输入：root = [3,9,20,null,null,15,7] 输出：[[3],[9,20],[15,7]]
 *
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (root === null) return []
    const stack = [root]
    const result = []

    while (stack.length) {
        let res = []
        let depth = stack.length
        while (depth > 0) {
            const node = stack.shift()
            res.push(node.val)
            node.left && stack.push(node.left)
            node.right && stack.push(node.right)
            depth--
        }
        result.push(res)
    }

    return result
}

/**
 * 107. 二叉树的层序遍历 II
 * 给你二叉树的根节点 root ，返回其节点值 [自底向上]的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
    /** 对比[102.层序遍历],调整为自底向上、从左往右的层序遍历 */

    if (root === null) return []
    const stack = [root]
    const result = []

    while (stack.length) {
        let depth = stack.length
        const depthRes = []
        while (depth > 0) {
            const node = stack.shift()
            depthRes.push(node.val)
            node.left && stack.push(node.left)
            node.right && stack.push(node.right)
            depth--
        }
        result.unshift(depthRes)
    }
    return result
}

/**
 * 226. 翻转二叉树: 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
    /**
     * 翻转二叉树：root.left = root.right  root.right = root.left
     */
    if (root === null) return root
    const stack = [root]
    while (stack.length) {
        let len = stack.length
        for (let i = 0; i < len; i++) {
            const node = stack.pop()
            const tempLeft = node.left
            node.left = node.right
            node.right = tempLeft
            node.left && stack.push(node.left)
            node.right && stack.push(node.right)
        }
    }
    return root

    // 递归实现 - 利用后序遍历左右中，最后处理中间root节点
    if (root == null) return root
    function dfs(root) {
        if (root == null) return null
        const leftNode = dfs(root.left)
        const rightNode = dfs(root.right)
        root.left = rightNode
        root.right = leftNode
        return root
    }
    return dfs(root)
}

/**
 * 101. 对称二叉树
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    /**
     * 要做轴对称；只能用bfs遍历，深度递归没法看到右子树情况
     * 构造一个栈：
     * 左子树倒序插入；右子树正序push，然后对于每个stack的判断，首尾判断即可
     *
     *      1
     *   2     2
     * 3  4  3   4
     *   5  5        # 这种情况，就要考虑遍历的时候，既要匹配值，也需要匹配所处的子树节点
     *
     * 记录一个层序遍历，然后首尾匹配
     */

    // 构造一个后序遍历，同时处理两个子树的比较
    if (root === null) return true
    // 对比两个节点是否构成对称的递归函数；
    // 迭代法的实现也是类似，只不过要注意入栈顺序：left.left,right.right,left.right,right.left; 出栈个数：一轮两次pop()
    function compareTree(leftNode, rightNode) {
        if (leftNode === null && rightNode !== null) return false
        if (leftNode !== null && rightNode === null) return false
        if (leftNode === null && rightNode === null) return true
        if (leftNode.val !== rightNode.val) return false
        let outside = compareTree(leftNode.left, rightNode.right)
        let inside = compareTree(leftNode.right, rightNode.left)
        return outside && inside
    }
    return compareTree(root.left, root.right)

    // 轴对称：左右子树是镜像，就用栈保存，不过取的时候，不用Pop,shift取值
    // if (root === null) return true
    // if (root.left?.val !== root.right?.val) return false
    // const stack = [root.left, root.right]
    // while (stack.length) {
    //     const len = stack.length
    //     let left = 0,
    //         right = len - 1

    //     while (left < right) {
    //         const leftNode = stack[left]
    //         const rightNode = stack[right]
    //         /**
    //          * case盘点：
    //          * 1. 左节点子树为空，右节点子树不为空；
    //          * 2. 左节点子树val !== 右节点子树val
    //          * 3. 左右节点子树入栈，用于下一次比较
    //          */
    //         if (leftNode.left === null && rightNode.right !== right) return false
    //         if (leftNode.left !== null && rightNode.right === null) return false
    //         if (leftNode.left && rightNode.right) {
    //             // 如果左右节点都为null,则直接跳过； 这里基于两边都有节点的情况继续判断; 因为新的节点需要入栈
    //             if (leftNode.left.val !== rightNode.right.val) return false
    //             // 收集下一轮判断

    //         }
    //     }
    // }

    // 类似翻转二叉树，继续后序遍历吗？ 但是看不到另一棵子树的情况； 还是构造一个栈吧
    // if (root === null) return true
    // const stack = [root.left, root.right]
    // while (stack.length) {
    //     const loopLen = stack.length

    //     let res = []
    //     while (loopLen > 0) {
    //         let node = stack.pop()
    //         res.push(node.val)
    //         loopLen--
    //     }
    // }

    // 思路阻塞
    // if (root === null) return true
    // const stack = [root.left, root.right]
    // const result = []
    // while (stack.length) {
    //     const res = []
    //     const depth = stack.length
    //     while (depth > 0) {
    //         // 如何保存空节点呢
    //         let node = stack.pop()
    //         res.push(node.val)
    //         depth--
    //         stack.push(node.left)
    //         stack.push(node.right)

    //         // let leftNode = stack.pop()
    //         // let rightNode = stack.shift()
    //         // // 盘点不匹配的case
    //         // if (leftNode && rightNode && leftNode.val !== rightNode.val) return false
    //         // if ((leftNode === null && rightNode !== null) || (leftNode !== null && rightNode === null)) return false

    //         // // 子节点入栈
    //         // stack.push(leftNode.left)
    //         // stack.push(leftNode.right)
    //     }
    //     result.push(res)
    // }
}

/**
 * 104. 二叉树的最大深度 ： 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    if (root === null) return 0

    let depth = 0
    function dfs(root, dep) {
        if (root.left === null && root.right === null) {
            depth = Math.max(depth, dep)
            return
        }
        root.left && dfs(root.left, dep + 1)
        root.right && dfs(root.right, dep + 1)
    }

    dfs(root, 1)

    return depth
}

/**
 * 222. 完全二叉树的节点个数 : 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数
 *
 * 完全二叉树 的定义如下：
 *   在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。
 *   若最底层为第 h 层（从第 0 层开始），则该层包含 1~ 2h 个节点
 *
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
    /**
     * 如果直接用递归或者迭代完全遍历，整个时间复杂度是 O(n),不符合题意，会报错
     * 这个时候就要利用完全二叉树的特性，它一定存在满二叉树，对于满二叉树节点个数的计算：(2 ^ 二叉树深度 ) - 1 ;
     * 为什么2的深度次方 -1 ， 因为每个节点都是有2个子节点；并且根节点只有1个，所以相当于是 1 + 2 + 4 + 8   2^0 + 2^1 + 2^2 + 2^3
     *
     * 如何判断满二叉树：
     * 在基于是完全二叉树的技术上，如果存在最左侧节点深度 = 最右侧节点深度，那么这一定是一颗满二叉树
     */

    function countNum(root) {
        if (root === null) return 0
        let leftNode = root.left,
            rightNode = root.right,
            depthLeft = 1,
            depthRight = 1

        // 满二叉树判断逻辑
        while (leftNode) {
            leftNode = leftNode.left
            depthLeft++
        }
        while (rightNode) {
            rightNode = rightNode.right
            depthRight++
        }
        if (depthLeft === depthRight) {
            // 当前root节点这是一颗满二叉树节点
            return Math.pow(2, depthLeft) - 1
        }

        // 非满二叉树-常规后序遍历
        return countNum(root.left) + countNum(root.right) + 1
    }
    return countNum(root)
}

/**
 *
 * 110. 平衡二叉树 : 给定一个二叉树，判断它是否是 平衡二叉树
 *
 * 一棵高度平衡二叉树定义为：一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    // 只要高度大于1了，就是非平衡二叉树； 每个节点 的左右两个子树的高度差的绝对值不超过1

    let flag = true
    function countDeep(root) {
        if (root === null) return 0
        const leftDep = countDeep(root.left)
        const rightDep = countDeep(root.right)
        if (Math.abs(rightDep - leftDep) > 1) {
            flag = false
        }
        return Math.max(leftDep, rightDep) + 1
    }

    countDeep(root)

    return flag
}

/**
 *  257. 二叉树的所有路径: 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径
 * 输入：root = [1,2,3,null,5] 输出：["1->2->5","1->3"]
 *       1
 *   2      3
 *     5
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
    // 求路径问题，典型的前序遍历; 返回搜索的所有路径

    const result = []
    function dfs(root, ptr) {
        if (root === null) return
        if (root.left === null && root.right === null) {
            // 这里是尾结点
            result.push([...ptr, root.val].join('->'))
            return
        }
        root.left && dfs(root.left, [...ptr, root.val])
        root.right && dfs(root.right, [...ptr, root.val])
    }
    dfs(root, [])
    return result
}

/**
 * 404. 左叶子之和
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function (root) {
    // 左叶子对应的是左子树节点的最左侧节点;
    // 如果判断一个节点是左叶子呢？
    /**
     * 左叶子满足条件：
     * 1. 是左子树路径下的节点；-- 路径标记
     * 2. 它是尾节点； -- 左节点判断
     * 3. 它既没有左节点，也没有右子节点
     */
    let count = 0
    function dfs(root, flag) {
        if (root === null) return 0
        if (root.left === null && root.right === null && flag === 1) {
            // 没有左节点了，就看是不是左子树路径
            count += root.val
        }
        root.left && dfs(root.left, 1)
        root.right && dfs(root.right, 0)
    }
    dfs(root, 0)
    return count
}

/**
 * 513. 找树左下角的值:
 *   -- 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值
 *
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function (root) {
    /**
     * 思路： 最底层，最左边的节点
     * 1. 先找最底层；
     * 2. 再找最左边
     */
    const stack = [root]
    let result
    while (stack.length) {
        result = stack[0].val
        let len = stack.length
        while (len > 0) {
            node = stack.shift()
            node.left && stack.push(node.left)
            node.right && stack.push(node.right)
            len--
        }
    }
    return result
}

/**
 * 112. 路径总和
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum
 *
 * 判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false
 *
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    // 叶子节点 是指没有子节点的节点

    if (root === null) return false

    // 中左右 - 前序遍历
    let flag = false
    function trackSum(root, sum) {
        let sumCount = sum + root.val
        if (root.left === null && root.right === null) {
            flag = sumCount === targetSum || flag
            return
        }
        root.left && trackSum(root.left, sumCount)
        root.right && trackSum(root.right, sumCount)
    }
    trackSum(root, 0)
    return flag
}

/**
 * 106. 从中序与后序遍历序列构造二叉树
 * 给定两个整数数组 inorder 和 postorder : 其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历
 * 请你构造并返回这颗 二叉树
 *
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
    /**
     *
     *    1
     *  2   3
     * 4 6   5   -> 中序遍历： [4,2,6,1,3,5];  后序遍历：[4,6,2,5,3,1]
     * 思路：
     * 1. 已知：
     *   -- 中序遍历 和 后续遍历 数据流
     *   -- 中序遍历：左中右 对中序遍历进行分割，[left... root ...right]; root节点左边的都是左子树节点； root节点右边的都是右子树节点
     *   -- 后续遍历：左右中 [left... ...right... root] 最后一个元素是 root 节点
     * 2. 过程：
     *   -- 找到root节点
     *   -- 构造root节点的左子树
     *   -- 构造root节点的右子树
     * 3. 所以在中序遍历中，可以设定这几个起点：
     *   -- 假设 root 下标为 r； 那么对于区间[0,r-1]为左子树； 区间[r+1, len-1]为右子树
     *   -- leftStart
     *   -- rightStart
     */

    /**
     * 中序： 左中右
     * 后序： 左右中
     *
     * 优化： 用下标代替数组的传递，节约空间
     */

    function buildTree(inList, postList) {
        const postLen = postList.length

        if (postLen === 0) {
            // 因为后续遍历的最后一个元素是左右中，也就是root节点；
            // 所以 postList 数组用于确定当前递归周期内，所要构建的 root 节点；
            // 当前后续遍历的长度为0，说明此时没有元素需要处理，即：不存在 root 节点；
            return null
        }

        const rootVal = postList[postLen - 1]
        // 先构造 root 节点
        const root = new TreeNode(rootVal)

        if (postLen === 1) {
            // 当前周期内的root节点的长度只有1，那么就不需要构造它的左右子树了，直接返回。
            return root
        }

        // 从 inList,也就是中序遍历数组里面找到root所在的下标，用于切割左右节点树
        const midIndex = inList.indexOf(rootVal)

        // 构建左子树 - 切割 inList； postList，也就是剩余的后续遍历如何切割呢
        // 后续遍历的逻辑是：左右中，也就是说遍历完所有的左子树，才会进入遍历右子树节点，那么由已经通过中序遍历切出来的leftInList的长度，可以知道左子树在postList的个数
        // 既然知道左子树的数量，那么 postList 中的 前 leftInList.length 个，都是属于 左子树的后序遍历 节点
        const leftInList = inList.slice(0, midIndex)
        // 后序遍历的前 midIndex 项都是属于基于root节点分割后的中序遍历的前 midIndex 长度
        // 分割模型： 中序遍历： 左 ··· 中 ··· 右
        //          后序遍历： 左 ··· 右 ··· 中
        // 所以构建 左子树的后序遍历区间 = 切割后的左子树的中序遍历区间； 前 n 项都是属于左子树
        // 构建 右子树的后续遍历区间 = [midIndex, postLen - 1]
        const leftPostList = postList.slice(0, midIndex)
        root.left = buildTree(leftInList, leftPostList)

        // 构建右子树 - 切割 inList的剩余右半区间；postList切割逻辑同左子树
        const rightInList = inList.slice(midIndex + 1)
        const rightPostList = postList.slice(midIndex, postLen - 1)
        root.right = buildTree(rightInList, rightPostList)

        return root
    }
    return buildTree(inorder, postorder)
}

/**
 * 105. 从前序与中序遍历序列构造二叉树
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点
 *
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    /**
     *    1
     *  2     3    pre: [1,2,4,3]; in: [2,4,1,3]
     *    4
     *
     * 1. 前序： 中左右； 确定  root 节点
     * 2. 中序： 左中右； 确定子树区间
     */

    function generateTree(preList, inList) {
        const preLen = preList.length

        if (preLen === 0) return null

        const rootVal = preList[0]

        // 基于前序序列构造root
        const root = new TreeNode(rootVal)

        if (preLen === 1) return root

        // 找到左右子树分割区间
        const midIndex = inList.indexOf(rootVal)

        const leftInList = inList.slice(0, midIndex)
        const leftPreList = preList.slice(1, midIndex + 1)
        root.left = generateTree(leftPreList, leftInList)

        const rightInList = inList.slice(midIndex + 1)
        const rightPreList = preList.slice(midIndex + 1)
        root.right = generateTree(rightPreList, rightInList)

        return root
    }
    return generateTree(preorder, inorder)
}

/**
 * 889. 从前序与后序遍历序列构造二叉树
 * 给定两个整数数组，preorder 和 postorder
 * 其中 preorder 是一个具有 无重复 值的二叉树的前序遍历，postorder 是同一棵树的后序遍历，重构并返回二叉树
 * 如果存在多个答案，您可以返回其中 任何 一个
 *
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function (preorder, postorder) {
    /**
     * 1. 前序遍历： 中左右
     * 2. 后续遍历： 左右中
     *
     * 由于没有中序遍历来确定左右子树的分割方式，所以需要手动进行分割处理，如何处理呢：
     *
     *       1
     *   2      3       前序遍历： [1,2,4,5,3];  后续遍历： [4,5,2,3,1]
     * 4   5
     *
     * 以前序遍历为例，对于[1,2,4,5,3],能确定的就是 root 节点为 1；
     * 同时基于前序遍历的特性，以 节点2 作为左子树的root节点，从后续遍历里面找到节点 2 的位置；
     *
     * 基于后续遍历的特性，左右中，以2为分割，以左为左子树的节点，得到：[4,5,2]; 数量为3；去掉末尾节点为root节点，得到右子树为：[3]
     *
     * 回到前序遍历，下标为0是root起点，左子树的数量为3，那么就能知道右子树的数量了，此时得到：root:1, leftPre:[2,4,5], rightPre:[3]
     *
     * 为什么要从左节点开始：
     *   -- 因为不论是前序还是后续还是中序，左节点都在右节点前面
     *
     */

    function generateTree(preList, postList) {
        const preLen = preList.length

        if (preLen === 0) return null

        // 确认 root 节点
        const rootVal = preList[0]
        const root = new TreeNode(rootVal)

        if (preLen === 1) return root

        // 找到下一轮的left节点，通过left节点分割
        const leftVal = preList[1]
        const leftCount = postList.indexOf(leftVal) + 1 // 找到下标 - 因为左子树在后续遍历里面就是前n个，所以这里的下标，对应的就是 左子树的长度+1
        const leftPostList = postList.slice(0, leftCount)
        const leftPreList = preList.slice(1, 1 + leftCount)

        root.left = generateTree(leftPreList, leftPostList)

        const postLen = postList.length
        const rightPostList = postList.slice(leftCount, postLen - 1)
        const rightPreList = preList.slice(1 + leftCount)

        root.right = generateTree(rightPreList, rightPostList)

        return root
    }
    return generateTree(preorder, postorder)
}

/**
 * 654. 最大二叉树
 * 给定一个不重复的整数数组 nums 。 最大二叉树 可以用下面的算法从 nums 递归地构建:
 *
 * 创建一个根节点，其值为 nums 中的最大值。
 * 递归地在最大值 左边 的 子数组前缀上 构建左子树。
 * 递归地在最大值 右边 的 子数组后缀上 构建右子树。
 * 返回 nums 构建的 最大二叉树 。
 *
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
    function buildTree(nodeList) {
        // 找到最大值
        let maxNum = [nodeList[0], 0]
        const len = nodeList.length

        for (let i = 1; i < len; i++) {
            if (nodeList[i] > maxNum[0]) {
                maxNum[0] = nodeList[i]
                maxNum[1] = i
            }
        }

        // 先构建root节点
        const root = new TreeNode(maxNum[0])

        if (len === 1) return root

        // 左子树区间 - 边界判断
        if (maxNum[1] === 0) {
            // 最大数是最左边的，那么不用构建左子树了
            root.left = null
        } else {
            const leftNodes = nodeList.slice(0, maxNum[1])
            root.left = generateTree(leftNodes)
        }

        // 右子树区间 - 边界判断
        if (maxNum[1] === len - 1) {
            root.right = null
        } else {
            const rightNodes = nodeList.slice(maxNum[1] + 1)
            root.right = generateTree(rightNodes)
        }

        return root
    }
    return buildTree(nums)
}

/**
 * 617. 合并二叉树: 给你两棵二叉树： root1 和 root2
 *
 * 想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。
 * 你需要将这两棵树合并成一棵新二叉树。
 *
 * 合并的规则是：
 *  -- 如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。
 *
 * 返回合并后的二叉树。 注意: 合并过程必须从两个树的根节点开始。
 *
 *
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
    // 前序遍历

    function dfs(root1, root2) {
        if (root1 === null || root2 === null) return root1 || root2

        // root 节点值合并
        let rootVal
        if (root1 === null || root2 === null) {
            rootVal = root1.val || root2.val
        } else {
            rootVal = root1.val + root2.val
        }
        const root = new TreeNode(rootVal)

        // 子树处理 - 其实不用第一行 || 判断了，因为dfs一开始就对null的边界做了处理了ƒ
        if (root1.left === null || root2.left === null) {
            root.left = root1.left || root2.left
        } else {
            root.left = dfs(root1.left, root2.left)
        }

        if (root1.right === null || root2.right === null) {
            root.right = root1.right || root2.right
        } else {
            root.right = dfs(root1.right, root2.right)
        }

        return root
    }

    // 精简优化
    function dfs(root1, root2) {
        if (root1 === null || root2 === null) return root1 || root2
        // root 节点值合并
        const rootVal = root1.val + root2.val
        const root = new TreeNode(rootVal)
        root.left = dfs(root1.left, root2.left)
        root.right = dfs(root1.right, root2.right)
        return root
    }
    return dfs(root1, root2)
}

/**
 * 700. 二叉搜索树中的搜索
 * 给定二叉搜索树（BST）的根节点 root 和一个整数值 val;
 * 你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null
 *
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
    /**
     * 二叉搜索树的特性： 左子树一定比root节点小； 右子树一定比root节点大
     */

    let node
    function searchNode(root) {
        if (root === null) return
        if (root.val > val) {
            return searchNode(root.left)
        } else if (root.val === val) {
            node = root
        } else {
            return searchNode(root.right)
        }
    }
    searchNode(root)
    return node || null
}

/**
 * LCR 193. 二叉搜索树的最近公共祖先
 * 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先
 *
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    /**
     * 结合p/q的值，确定搜索范围
     */

    let minVal = Math.min(p.val, q.val)
    let maxVal = Math.max(p.val, q.val)

    let node = null

    function searchNode(root) {
        if (root === null) return false

        // 基于二叉搜索树的剪枝优化：
        if (root.val > maxVal) {
            // 当前节点比p/q最大值还大，那么往左边搜索确定
            return searchNode(root.left)
        }
        if (root.val < minVal) {
            return searchNode(root.right)
        }

        // 在正常区间范围内，正常搜索左右区间即可
        let leftFlag = searchNode(root.left)
        let rightFlag = searchNode(root.right)

        // 判断每一个root节点； 到这里差不多左右子树往上回的阶段了

        if ((leftFlag && rightFlag) || ((root.val === q.val || root.val === p.val) && (leftFlag || rightFlag))) {
            node = root
        }

        return root.val === q.val || root.val === p.val || leftFlag || rightFlag
    }

    searchNode(root)
    return node
}
