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

/**
 * 633. 平方数之和
 *
 * 给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a^2 + b^2 = c 。(a+b)^2 = a^2 + b^2 + 2ab
 *
 * 输入：c = 5 输出：true 解释：1 * 1 + 2 * 2 = 5
 *
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
    /**
     * 1. 首先最大的数不会超出 c / 2;
     * 2. a^2+b^2 > c  b--
     * 3. a^2+b^2 < c  a++
     * 4. 并没有说 left 与 right 不能相等
     * 5. 0也是整数
     *
     * 双指针会超时，差距太大
     */
    let left = 0,
        right = Math.ceil(c / 2)

    while (left <= right) {
        const sum = left * left + right * right

        if (sum === c) return true

        if (sum < c) {
            left++
        }

        if (sum > c) {
            right--
        }
    }

    // 双指针 + 二分法： 如何快速约束边界呢？ 如何二分？
    // 9  -》 0, 4    -》  0，4
    // let left = 0,
    //     right = c
    // while (left < right) {
    //     const mid = left + Math.floor((right - left) / 2)
    //     let sum = left * left + mid * mid

    //     if (sum === c) return true

    //     if (sum < c) {
    //         right = mid
    //     }

    //     if (sum > c) {
    //         left = mid + 1
    //     }
    // }
    // return false

    /**
     * 1. 利用开平方函数
     */
    for (let i = 0; i * i < c; i++) {
        const j = Math.sqrt(c - i * i)
        if (j === parseInt(j)) {
            return true
        }
    }
    return false

    /**
     * 2. 利用开方函数，确定右边界
     */
    let left = 0,
        right = Math.floor(Math.sqrt(c))
    while (left <= right) {
        const sum = left * left + right * right
        if (sum > c) {
            right--
        } else if (sum < c) {
            left++
        } else {
            return true
        }
    }
    return false
}

/**
 * 443. 压缩字符串
 * 给你一个字符数组 chars ，请使用下述算法压缩：
 *
 * 从一个空字符串 s 开始。对于 chars 中的每组 连续重复字符
 * 如果这一组长度为 1 ，则将字符追加到 s 中。
 * 否则，需要向 s 追加字符，后跟这一组的长度
 *
 * 压缩后得到的字符串 s 不应该直接返回 ，需要转储到字符数组 chars 中。需要注意的是，如果组长度为 10 或 10 以上，则在 chars 数组中会被拆分为多个字符
 *
 * 请在 修改完输入数组后 ，返回该数组的新长度
 *
 * 输入：chars = ["a","a","b","b","c","c","c"] 输出：6
 * 解释：分组是 "aa"、"bb" 和 "ccc"，压缩为 "a2b2c3"。
 * 在原地修改输入数组之后，chars 的前 6 个字符应为 ["a","2","b","2","c","3"]。
 *
 * 注意：数组中超出返回长度的字符无关紧要，应予忽略。
 *
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
    /**
     * 1. 修改完输入数组后 - 修改原数组
     * 2. 什么情况需要追加数量： > 1
     * 3. 如果组长度为 10 或 10 以上，则在 chars 数组中会被拆分为多个字符
     */
    const len = chars.length
    let left = 1,
        count = 1,
        prev = chars[0]
    for (let i = 1; i < len; i++) {
        if (chars[i] !== prev) {
            if (count > 1) {
                if (count >= 10) {
                    const countStr = count + ''
                    for (const num of countStr) {
                        chars[left++] = num
                    }
                } else {
                    chars[left++] = count + ''
                }
            }
            prev = chars[i]
            chars[left++] = prev
            count = 1
        } else {
            count++
            if (i === len - 1) {
                if (count > 10) {
                    const countStr = count + ''
                    for (const num of countStr) {
                        chars[left++] = num
                    }
                } else {
                    chars[left++] = count + ''
                }
            }
        }
    }

    return left
}

/**
 * 84. 柱状图中最大的矩形
 *
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1
 *
 * 求在该柱状图中，能够勾勒出来的矩形的最大面积
 *
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {}
