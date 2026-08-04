/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 前序遍历 - 中左右
/**
 * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    /**
     * 递归解法
     */
    // const res = []
    // function dfs(root) {
    //     if (root === null) return
    //     res.push(root.val)
    //     dfs(root.left)
    //     dfs(root.right)
    // }
    // return dfs(root)
    /**
     * 迭代 前序遍历： 中左右
     */
    if (root === null) return []
    let stack = [root]
    const res = []
    while (stack.length) {
        let node = stack.pop()
        if (node !== null) {
            node.right && stack.push(node.right)
            node.left && stack.push(node.left)

            stack.push(node)
            stack.push(null)
        } else {
            // node为null节点，作为标记，说明是已经处理过的节点
            node = stack.pop()
            res.push(node.val)
        }
    }
    return res
}

// 中序遍历 - 左中右
var inorderTraversal = function (root) {
    /** 递归法 */
    // const res = []
    // function dfs(root) {
    //     if (root === null) return
    //     dfs(root.left)
    //     res.push(root.val)
    //     dfs(root.right)
    // }
    // dfs(root)
    // return res

    /** 迭代法 */
    if (root === null) return []
    const stack = [root]
    const res = []
    while (stack.length) {
        let node = stack.pop()
        if (node !== null) {
            node.right && stack.push(node.right)
            stack.push(node)
            stack.push(null)
            node.left && stack.push(node.left)
        } else {
            node = stack.pop()
            res.push(node.val)
        }
    }
    return res
}

/**
 * 后序遍历 - 左右中
 */
var postorderTraversal = function (root) {
    /**
     * 递归法
     */
    // const res = []
    // function dfs(root) {
    //     if (root === null) return
    //     dfs(root.left)
    //     dfs(root.right)
    //     res.push(root.val)
    // }
    // dfs(root)
    // return res

    /** 迭代法： 按中右左入栈，然后输出反转下数据 -> 左右中 */
    // if (root === null) return []
    // const stack = [root]
    // const res = []
    // while (stack.length) {
    //     let node = stack.pop()
    //     if (node !== null) {
    //         node.left && stack.push(node.left)
    //         node.right && stack.push(node.right)
    //         stack.push(node)
    //         stack.push(null)
    //     } else {
    //         node = stack.pop()
    //         res.push(node.val)
    //     }
    // }
    // return res.reverse()

    /** 迭代法： 左右中 */
    if (root === null) return []
    const res = []
    const stack = [root]
    while (stack.length) {
        let node = stack.pop()
        if (node !== null) {
            stack.push(node)
            stack.push(null)
            node.right && stack.push(node.right)
            node.left && stack.push(node.left)
        } else {
            node = stack.pop()
            res.push(node.val)
        }
    }
    return res
}
