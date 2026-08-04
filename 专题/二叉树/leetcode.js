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
     */
    if (root === null) return true
	const stack = [root]
	
}
