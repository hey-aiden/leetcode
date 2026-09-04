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
var bulbSwitch = function (n) {
    return Math.floor(Math.sqrt(n))
}

/**
 * 3345. 最小可整除数位乘积 I
 * 给你两个整数 n 和 t 。请你返回大于等于 n 的 最小 整数，且该整数的 各数位之积 能被 t 整除
 */
var smallestNumber = function (n, t) {
    // 输入：n = 10, t = 2 输出：10
    // 解释： 10 的数位乘积为 0 ，可以被 2 整除，所以它是大于等于 10 且满足题目要求的最小整数。

    // 先计算位积, 能被整除，需要 % t === 0
    function calc(num) {
        let s = num + ''
        let res = 1
        for (const c of s) {
            res = res * c
        }
        return res
    }

    let start = n
    while (calc(start) % t !== 0) {
        start++
    }

    return start
}

/**
 * 1365. 有多少小于当前数字的数字
 * 给你一个数组 nums，对于其中每个元素 nums[i]，请你统计数组中比它小的所有数字的数目
 * 对于每个 nums[i] 你必须计算出有效的 j 的数量，其中 j 满足 j != i 且 nums[j] < nums[i]
 */
var smallerNumbersThanCurrent = function (nums) {
    const len = nums.length
    const res = Array(len).fill(0)
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (i === j) continue

            if (nums[j] < nums[i]) {
                res[i]++
            }
        }
    }
    return res

    // 计数排序
    const cnt = new Array(101).fill(0) // 因为 num[i]最大为100
    const len = nums.length
    for (let i = 0; i < len; i++) {
        cnt[nums[i]]++ // 将nums[i]纳入 cnt 数组对应位置统计
    }
    for (let i = 1; i <= 100; i++) {
        cnt[i] += cnt[i - 1] // 合并统计每一个比自身小的数
    }

    const res = []
    for (let i = 0; i < len; i++) {
        res.push(nums[i] ? cnt[nums[i] - 1] : 0) // 如果nums[i]==0，那么下标就不能取 nums[i] - 1; 所以要处理下边界
    }
    return res
}

/**
 * 922. 按奇偶排序数组 II
 * 给定一个非负整数数组 nums，  nums 中一半整数是 奇数 ，一半整数是 偶数
 *
 * 对数组进行排序，以便当 nums[i] 为奇数时，i 也是 奇数 ；当 nums[i] 为偶数时， i 也是 偶数
 *
 * 输入：nums = [4,2,5,7] 输出：[4,5,2,7] 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParityII = function (nums) {
    // 也就是奇数下标放的是奇数，偶数下标放的是偶数
    // const oddTemp = []
    // const evenTemp = []

    // for (const num of nums) {
    //     if (num % 2 !== 0) {
    //         oddTemp.push(num)
    //     } else {
    //         evenTemp.push(num)
    //     }
    // }
    // const len = nums.length
    // const res = []
    // let evenFlag = true
    // for (let i = 0; i < len; i++) {
    //     res.push(evenFlag ? evenTemp.pop() : oddTemp.pop())
    //     evenFlag = !evenFlag
    // }
    // return res

    // let oddIdx = 1,
    //     evenIdx = 0
    // const res = []
    // for (const num of nums) {
    //     if (num % 2 === 0) {
    //         res[evenIdx] = num
    //         evenIdx += 2
    //     } else {
    //         res[oddIdx] = num
    //         oddIdx += 2
    //     }
    // }
    // return res

    const len = nums.length
    let oddIdx = 1
    for (let i = 0; i < len; i += 2) {
        if (nums[i] & 1) {
            while (nums[oddIdx] & 1) {
                oddIdx += 1
            }
            swap(i, oddIdx)
        }
    }
    function swap(i, j) {
        ;[nums[i], nums[j]] = [nums[j], nums[i]]
    }
    return nums
}

/**
 * 2996. 大于等于顺序前缀和的最小缺失整数
 *
 * 如果一个前缀 nums[0..i] 满足对于 1 <= j <= i 的所有元素都有 nums[j] = nums[j - 1] + 1 ，那么我们称这个前缀是一个 顺序前缀
 * 特殊情况是，只包含 nums[0] 的前缀也是一个 顺序前缀 。
 * 返回 nums 中没有出现过的 最小 整数 x ，满足 x 大于等于 最长 顺序前缀的和
 *
 * 输入：nums = [3,4,5,1,12,14,13] 输出：15
 * 解释：nums 的最长顺序前缀是 [3,4,5] ，和为 12 ，12、13 和 14 都在数组中，但 15 不在，所以 15 是大于等于最长顺序前缀和的最小整数。
 */
var missingInteger = function (nums) {
    /**
     * 1. 找到最长顺序前缀，得到和
     * 2. 匹配当前数组中，符合没有出现过的大于该和的最小整数
     * 3. 下标必须是从0开始
     */
    // let maxLen = 1
    // let sum = nums[0]
    // let count = nums[0]
    // let len = 1
    // const n = nums.length
    // for (let i = 1; i < n; i++) {
    //     if (nums[i] === nums[i - 1] + 1) {
    //         count += nums[i]
    //         len++
    //         if (i === len - 1 && len > maxLen) {
    //             maxLen = len
    //             sum = count
    //         }
    //     } else {
    //         if (len > maxLen) {
    //             maxLen = len
    //             sum = count
    //         }
    //         count = nums[i]
    //         len = 1
    //     }
    // }
    // let overFlag = false
    // for (const num of nums) {
    //     if (num >= sum) {
    //         sum = num
    //         overFlag = true
    //     }
    // }
    // return overFlag ? sum + 1 : sum

    let total = nums[0]
    let numSet = new Set(nums)

    const len = nums.length
    for (let i = 1; i < len; i++) {
        if (nums[i] === nums[i - 1] + 1) {
            total += nums[i]
        } else {
            break
        }
    }
    while (numSet.has(total)) {
        total += 1
    }
    return total
}

/**
 * 1768. 交替合并字符串
 * 给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串
 * 如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾
 * 返回 合并后的字符串
 *
 */
var mergeAlternately = function (word1, word2) {
    let newStr = ''
    const len1 = word1.length,
        len2 = word2.length
    let i = 0,
        j = 0
    while (i < len1 || j < len2) {
        if (i < len1) {
            newStr = newStr + word1[i]
            i++
        }
        if (j < len2) {
            newStr = newStr + word2[j]
            j++
        }
    }
    return newStr
}
