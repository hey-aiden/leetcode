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
     * 找到一个root节点，它的子树中，既包含节点p, 又包含节点q
     *
     * 假设某个节点为true，意味着拥有p||q其中的某一个节点  root.val == p.val || root.left.val === p.val || root.right.val == p.val
     * 当节点同时满足子树下的值包含拥有 q/p 的这两种情况，那么我们就定义该节点为一个公共祖先节点
     */

    function dfs(root) {
        if (root === null) return false
        if (root.val === p.val || root.val === q.val) return true

		
    }
}
