/**
 * 456. 132 模式
 *
 * 给你一个整数数组 nums ，数组中共有 n 个整数。
 * 132 模式的子序列 由三个整数 nums[i]、nums[j] 和 nums[k] 组成，并同时满足：i < j < k 和 nums[i] < nums[k] < nums[j]
 *
 * 如果 nums 中存在 132 模式的子序列 ，返回 true ；否则，返回 false
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
    /**
     * 下标满足：i < j < k
     * 数值满足：nums[i] < nums[k] < nums[j]
     *
     * 从 j 的视角看，就是找到 前面存在比它 小 的数，后面存在比它小的数，同时后面的数又要大于前面的数
     *
     * 1. 暴力解法，遍历
     * 会超时
     */
    const len = nums.length
    let preMin = nums[0] // 这里的问题在于，preMin虽然是最小的，但是存在子条件需要满足：nums[right] > preMin； 所以不能 preMin = Math.min(preMin, nums[i])

    for (let i = 1; i < len; i++) {
        if (nums[i] > preMin) {
            let right = i + 1
            while (right < len) {
                if (nums[right] < nums[i] && nums[right] > preMin) return true
                right++
            }
        } else {
            preMin = Math.min(preMin, nums[i])
        }
    }
    return false

    /**
     * 单调栈：从右往左遍历，维护一个单调递减的栈; 核心思路就是找到最大的j和k,这样能保证找到i的机会最大
     */

    const len = nums.length
    const stack = [nums[len - 1]]
    let maxK = -Infinity
    for (let i = len - 2; i >= 0; i--) {
        const num = nums[i]
        if (num < maxK) return true
        while (stack.length && num > stack[stack.length - 1]) {
            maxK = Math.max(stack.pop(), maxK)
        }
        stack.push(num)
    }
    return false
}

/**
 * 92. 反转链表 II
 *
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表
 *
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
    if (left === right) return head
    let dummyHead = new ListNode(1000, head)
    let prevHead = dummyHead
    let node = head
    let start = 1
    while (node !== null && start < left) {
        node = node.next
        prevHead = prevHead.next
        start++
    }
    let nextNode
    function reverse(node, start) {
        if (node === null || node.next === null || start === right) {
            nextNode = node.next
            return [node, null]
        }
        let last = reverse(node.next, start + 1)
        node.next.next = node
        node.next = null
        last[1] = node
        return last
    }

    const [headNode, tailNode] = reverse(node, start)

    tailNode.next = nextNode

    console.log(headNode, tailNode, prevHead)

    if (prevHead.val !== 1000) {
        prevHead.next = headNode
        return head
    }
    return headNode
}

/**
 * 435. 无重叠区间
 *
 * 给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。返回 需要移除区间的最小数量，使剩余区间互不重叠
 *
 * 注意 只在一点上接触的区间是 不重叠的。例如 [1, 2] 和 [2, 3] 是不重叠的
 *
 * 输入: intervals = [[1,2],[2,3],[3,4],[1,3]] 输出: 1 解释: 移除 [1,3] 后，剩下的区间没有重叠
 *
 * 1 2
 *   2 3
 *     3  4
 * 1
 *
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
    const len = intervals.length
    function getGoodInterval() {
        let count = 1
        intervals.sort((a, b) => a[1] - b[1])
        let rLine = intervals[0][1]
        for (let i = 1; i < len; i++) {
            const [start, end] = intervals[i]
            if (start >= rLine) {
                count++
                rLine = end
            }
        }
        return count
    }
    return len - getGoodInterval()
}

/**
 * 452. 用最少数量的箭引爆气球
 *
 * 有一些球形气球贴在一堵用 XY 平面表示的墙面上。墙面上的气球记录在整数数组 points ，
 * 其中points[i] = [xstart, xend] 表示水平直径在 xstart 和 xend之间的气球。你不知道气球的确切 y 坐标
 *
 * 一支弓箭可以沿着 x 轴从不同点 完全垂直 地射出。
 * 在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend，
 * 且满足  xstart ≤ x ≤ xend，则该气球会被 引爆 。可以射出的弓箭的数量 没有限制 。 弓箭一旦被射出之后，可以无限地前进
 *
 * 给你一个数组 points ，返回引爆所有气球所必须射出的 最小 弓箭数
 *
 * 输入：points = [[10,16],[2,8],[1,6],[7,12]] 输出：2
 * 解释：气球可以用2支箭来爆破:
 * -在x = 6处射出箭，击破气球[2,8]和[1,6]。
 * -在x = 11处发射箭，击破气球[10,16]和[7,12]。
 *
 * 1   6
 *   2     8
 *       7     12
 *           10   16
 *
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
    // 有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足  xstart ≤ x ≤ xend，则该气球会被 引爆; 气球直径范围内

    const len = points.length

    points.sort((a, b) => a[1] - b[1])

    let count = 1
    let rDistance = points[0][1]
    for (let i = 1; i < len; i++) {
        const [l, r] = points[i]
        if (l > rDistance) {
            count++
            rDistance = r
        }
    }
    return count
}

/**
 * 319. 灯泡开关
 *
 * 初始时有 n 个灯泡处于关闭状态。第一轮，你将会打开所有灯泡。接下来的第二轮，你将会每两个灯泡关闭第二个
 *
 * 第三轮，你每三个灯泡就切换第三个灯泡的开关（即，打开变关闭，关闭变打开）。
 * 第 i 轮，你每 i 个灯泡就切换第 i 个灯泡的开关。直到第 n 轮，你只需要切换最后一个灯泡的开关
 * 找出并返回 n 轮后有多少个亮着的灯泡
 *
 * @param {number} n
 * @return {number}
 */
var bulbSwitch = function (n) {}
