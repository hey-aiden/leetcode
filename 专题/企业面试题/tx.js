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

    /** 对于二叉树的最近公共祖先，还有一种实现方式： */
    const travelTree = function (root) {
        // 2. 确定递归终止条件： 如果头结点包含其中一项，那么头结点就一定也只能是唯一一个公共祖先了
        if (root === null || root === p || root === q) {
            return root
        }
        // 3. 确定递归单层逻辑
        let left = travelTree(root.left)
        let right = travelTree(root.right)
        if (left !== null && right !== null) {
            // 这里是返回最近的公共祖先节点
            return root
        }
        if (left === null) {
            return right
        }
        return left
    }
    return travelTree(root)
}

/**
 * 701. 二叉搜索树中的插入操作
 *
 * 给定二叉搜索树（BST）的根节点 root 和要插入树中的值 value ，将值插入二叉搜索树
 *
 * 返回插入后二叉搜索树的根节点。 输入数据 保证 ，新值和原始二叉搜索树中的任意节点值都不同
 *
 * 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回 任意有效的结果
 *
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
    /**
     * 新插入的节点，可能作为根节点插入，所以题意要求返回根节点
     *
     * 1. 先确定遍历方式，应该是前序遍历，这样就能知道往左子树，还是右子树插入了
     */

    // ************** 永远要考虑 root 为空节点的情况
    if (root === null) return new TreeNode(val)

    function insertNode(root) {
        /**
         *
         *           5
         *     3          8
         *  [1]  [4]
         * case:
         * 1. 比 root 小， 往左子树插入；
         * 2. 比 root 大， 往右子树插入；
         *
         *
         *
         */

        if (root.val > val) {
            if (root.left === null) {
                root.left = new TreeNode(val, null)
                return
            }
            return insertNode(root.left)
        }
        if (root.val < val) {
            if (root.right === null) {
                root.right = new TreeNode(val, null)
                return
            }
            return insertNode(root.right)
        }
    }

    insertNode(root)

    return root
}

/**
 * 450. 删除二叉搜索树中的节点
 *
 * 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。
 * 返回二叉搜索树（有可能被更新）的根节点的引用。
 *
 * key就是对应的root.val的值
 *
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
    /**
     * 1. 是二叉搜索树； 中序遍历是递增序列；
     * 2. 删除节点后，要保持二叉搜索树
     *
     *
     *       7
     *    3      9
     *  1   5   8 10
     *     4  6
     *
     * 如果要删除3：
     *
     *      7
     *    5     8
     *  4   6
     * 1
     *
     * 如果要删除root7
     *        8
     *     3
     * 1       5
     *       4   6
     *
     *
     * 1. 确定遍历顺序：应该还是前序，删除后要考虑左右子树的情况
     * 2. 找到规律，以二叉搜索树： [7,5,null,4,6,1] 为例，要删除节点3：
     *    - 3的右子树,5作为 root7的新的左子树；
     *    - 原有3的左子树节点，插入到5的最左侧子树的叶节点上
     *
     * **************
     *    - 其实更准确的规律是，对于要删除的节点root: 1. 左子树更新到它的右子树的最左叶子节点上；  2. 更新root前置子树的索引，即 root+1.left -> root.right
     *
     *    - 其实存在多种解法，只需要保证最后的序列，会是二叉搜索树就行
     * **************
     *
     * 3. 特殊case:如果删的是root节点呢：
     *    - root节点的左子树作为新的root节点：
     *    - root节点的右子树，作为新的右子树节点， 插入到新的root节点的最右侧叶子节点上
     *
     * 核心：保证删除后的数 - 原来的比它大的还是要比它的左子树大 - 加入到它的右侧子树
     *                  - 原来的比它小的数还是
     *
     *
     */
    // 比较粗糙的实现了
    let newRoot = root
    function delNode(root, prev, flag) {
        if (root === null) return
        if (root.val === key) {
            /**
             * 1. root.left === null;
             * 2. root.right === null;
             * 3. root.left === null && root.right === null 叶子结点
             */
            let rightNode = root.right
            if (rightNode === null) {
                if (prev === null) {
                    // 删除的是根节点
                    newRoot = root.left // 更新s新节点为左子树
                    root = null
                    return
                }
                // 删除的节点右子树为空，如果左子树有值，那么将当前节点的所有左子树，更新到父节点的左子树上; 为什么是往左子树挂，因为父节点一定大于当前节点的所有节点值；
                // 所以当前左子树节点，可以全往父节点的左子树上面挂
                if (flag === 0) {
                    prev.left = root.left
                } else {
                    prev.right = root.left
                }
                // 如果当前节点是父子树的右节点呢
                // prev.right = null
            } else {
                // 右节点有值，更新当前节点的左子树到右子节点的最左侧
                let leftNode = root.left
                if (leftNode === null) {
                    if (prev === null) {
                        newRoot = rightNode
                        root = null
                        return
                    }
                }
                // 将当前root的左子树，挂到root的右子树的左叶子节点上
                let lastRightNode = rightNode
                while (lastRightNode.left) {
                    lastRightNode = lastRightNode.left
                }
                lastRightNode.left = leftNode
                if (prev === null) {
                    // 以右节点为新的root节点
                    newRoot = root.right
                    root = null
                    return
                } else {
                    //  更新prev引用
                    if (flag === 0) {
                        prev.left = rightNode
                    } else {
                        prev.right = rightNode
                    }
                }
            }
        }
        delNode(root.left, root, 0)
        delNode(root.right, root, 1)
    }
    delNode(root, null)
    return newRoot

    /**
     * 重新整理下逻辑
     * 1. 定义好新root节点，后续在需要更新的节点更新；
     * 2. 先更新父子节点索引，再处理左右子树挂载
     */
    let newRoot = root

    function updateNode(root, prev, flag) {
        if (root.val === key) {
            const leftTree = root.left
            const rightTree = root.right

            if (rightTree === null) {
                if (prev === null) {
                    newRoot = leftTree
                    return
                }

                prev[flag] = leftTree
            } else {
                if (leftTree === null) {
                    if (prev === null) {
                        newRoot = rightTree
                        return
                    }
                }

                // 有右子树，无论如何，都可以更新右子树节点
                if (prev === null) {
                    newRoot = rightTree
                } else {
                    prev[flag] = rightTree
                }

                let rightNode = rightTree

                while (rightNode.left) {
                    rightNode = rightNode.left
                }

                rightNode.left = leftTree
            }
        }

        root.left && updateNode(root.left, root, 'left')
        root.right && updateNode(root.right, root, 'right')
    }

    updateNode(root, null, 0)

    return newRoot
}

/**
 * 669. 修剪二叉搜索树
 *
 * 给你二叉搜索树的根节点 root ，同时给定最小边界low 和最大边界 high
 *
 * 通过修剪二叉搜索树，使得所有节点的值在[low, high]中。
 * 修剪树 不应该 改变保留在树中的元素的相对结构 (即，如果没有被移除，原有的父代子代关系都应当保留)。 可以证明，存在 唯一的答案
 *
 * 所以结果应当返回修剪好的二叉搜索树的新的根节点。注意，根节点可能会根据给定的边界发生改变。
 *
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function (root, low, high) {
    /**
     * 要满足二叉搜索树的所有值在[low, high]区间
     *
     * 1. 如果当前节点node < low; 那么 node.left = null; 处理 node.right；
     * 2. 如果当前节点node > high; 那么 node.right = null; 处理 node.left;
     *
     * 是否存在对于节点 n, 它的
     *
     * 当root节点也不在区间内时，
     *
     * 确定遍历方式：前序遍历，通过 root 节点，来判断 左右子树的走向。
     *
     * 什么情况下更新根节点：
     */

    let newRoot = null

    function updateTree(root, prev) {
        if (root === null) return

        if (root.val >= low && root.val <= high && prev !== null && newRoot === null) {
            newRoot = root
        }

        if (root.val < low) {
            root.left = null
        }
        if (root.val > high) {
            root.right = null
        }

        updateTree(root.right, root)
        updateTree(root.left, root)

        // 正好在区间内的处理
    }

    updateTree(root, null)

    return newRoot || root
}
