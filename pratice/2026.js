/**
 * 3560. 木材运输的最小成本
 *
 * 给你三个整数 n、m 和 k。
 *
 * 有两根长度分别为 n 和 m 单位的木材，需要通过三辆卡车运输。每辆卡车最多只能装载一根长度 不超过 k 单位的木材
 *
 * 你可以将木材切成更小的段，其中将长度为 x 的木材切割成长度为 len1 和 len2 的段的成本为 cost = len1 * len2，并且满足 len1 + len2 = x
 *
 * 返回将木材分配到卡车上的 最小总成本 。如果木材不需要切割，总成本为 0
 *
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var minCuttingCost = function (n, m, k) {
    /**
     * 1. 如果 n, m  <=  k； 那么不需要额外成本
     * 2. 如果 n,m > k; 那么成本 = (n-k)*k
     * 3. 分别计算两根木头的最小成本
     * 4. 1 <= n, m <= 2 * k
     *
     * 输入： n = 6, m = 5, k = 5 输出： 5
     * 解释： 将长度为 6 的木材切割成长度为 1 和 5 的两段，成本为 1 * 5 == 5。现在三段长度分别为 1、5 和 5 的木材可以分别装载到每辆卡车。
     *
     */

    function cost(len) {
        if (len <= k) return 0
        let left = len - k,
            right = k
        let minCost = (len - k) * k
        while (left <= right) {
            const sum = left * right

            minCost = Math.min(sum, minCost)

            left++
            right--
        }
        return minCost
    }

    return cost(n) + cost(m)
}

/**
 * 86. 分隔链表
 * 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
 *
 * 输入：head = [1,4,3,2,5,2], x = 3 输出：[1,2,2,4,3,5]
 */
var partition = function (head, x) {
    if (head === null) return head
    let cur = head
    let minHead = new ListNode()
    let maxHead = new ListNode()
    let res = minHead
    let maxTail = maxHead
    while (cur !== null) {
        let next = cur.next
        cur.next = null
        if (cur.val < x) {
            // 站队左侧
            minHead.next = cur
            minHead = minHead.next
        } else {
            maxHead.next = cur
            maxHead = maxHead.next
        }
        cur = next
    }
    minHead.next = maxTail.next

    return res.next

    // 标准结构 - 优化变量名
    const leftDummy = new ListNode()
    const rightDummy = new ListNode()
    let leftTail = leftDummy
    let rightTail = rightDummy
    let cur = head
    while (cur) {
        const nextNode = cur.next
        cur.next = null
        if (cur.val < x) {
            leftTail.next = cur
            leftTail = leftTail.next
        } else {
            rightTail.next = cur
            rightTail = rightTail.next
        }
        cur = nextNode
    }

    leftTail.next = rightDummy.next

    return leftDummy.next
}

/**
 * 109. 有序链表转换二叉搜索树
 * 给定一个单链表的头节点  head ，其中的元素 按升序排序 ，将其转换为 平衡 二叉搜索树
 * 二叉搜索树：中序遍历是递增序列；
 * 平衡二叉树：高度差小于1 - |左子树高度 - 右子树高度| <= 1
 */
var sortedListToBST = function (head) {
    /**
     * 转成平衡二叉树：二分法取root节点
     * 1. 先遍历链表，这样才知道元素长度；
     * 2. 基于遍历后的元素数组，构建平衡二叉搜索树
     */

    const numList = []
    while (head !== null) {
        numList.push(head.val)
        head = head.next
    }

    function buildTree(list) {
        if (list.length === 0) return null
        const mid = Math.floor(list.length / 2)

        const root = new TreeNode(list[mid])

        root.left = buildTree(list.slice(0, mid))
        root.right = buildTree(list.slice(mid + 1, list.length))

        return root
    }

    return buildTree(numList)
}

/**
 * 117. 填充每个节点的下一个右侧节点指针 II
 */
var connect = function (root) {}
