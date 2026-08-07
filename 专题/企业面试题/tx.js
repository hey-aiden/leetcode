/**
 * 236. 二叉树的最近公共祖先
 *
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * 百度百科中最近公共祖先的定义为：
 * “对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
 *
 * 所有 Node.val 互不相同
 *
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    /**
     * 1. 确定子问题及边界情况：
     *  - 当前节点是p,并且q是p的子节点； root.val === p && root.child has q
     *  - 当前节点是q,并且p是q的子节点； root.val === q && root.child has p
     *  - p、q分别是节点n的子节点；     root.child has q && root.child has p
     *
     * 2. 确定遍历方式：前中后序遍历？
     *  - 对于root节点，要先知道它的子节点是否包含p||q；所以这里用后续遍历
     */

    let res = null
    function dfs(root) {
        if (root === null) return false

        let left = dfs(root.left)
        let right = dfs(root.right)

        if ((left && right) || ((root.val === p.val || root.val === q.val) && (left || right))) {
            res = root
        }

        // 对于一个node，存在的情况包括：它是节点p，并且它的子树存在节点q; 它是节点p,并且它的子树存在节点q； 它只包含节点p或者q； 普通节点
        return left || right || root.val === q.val || root.val === p.val
    }
    dfs(root)
    return res

    /** 对于二叉树的最近公共祖先，还有一种实现方式：
     * 
     * 基于p/q是一定存在于该二叉树中； 所以最终一定会存在一个节点，满足：left !== null && right !== null
     * 
     * 核心思路：
     *  -- 利用前序位置提前发现 p/q 节点并向上传递，利用后序位置收集左右子树返回结果，当左右同时存在有效节点时确定当前 root 是最近公共祖先
     * 
     */
    const travelTree = function (root) {
        // 2. 确定递归终止条件： 如果头结点包含其中一项，那么头结点就一定也只能是唯一一个公共祖先了
        if (root === null || root === p || root === q) {
            return root
        }
        // 3. 确定递归单层逻辑
        let left = travelTree(root.left)
        let right = travelTree(root.right)
        if (left !== null && right !== null) {
            // 这里是返回最近的公共祖先节点; 兜底root作为根节点公共祖先
            return root
        }
        // 这里是基于左子树和右子树存在p/q的节点； 也可以用 return left || right
        if (left === null) {
            return right
        }
        return left
    }
    return travelTree(root)
}

