/**
 * 704. 二分查找
 *
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target
 *
 * 写一个函数搜索 nums 中的 target，如果 target 存在返回下标，否则返回 -1。
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    /**
     * 输入: nums = [-1,0,3,5,9,12], target = 9 输出: 4 解释: 9 出现在 nums 中并且下标为 4
     *
     * 数组有序，所以可以二分
     */

    const n = nums.length

    if (n === 1) return nums[0] === target ? 0 : -1

    // 定义查找区间： [left, right]
    let left = 0,
        right = n - 1
    while (left <= right) {
        // 0 1 2 3   3/2=1
        const mid = left + Math.floor((right - left) / 2)
        const count = nums[mid]
        if (count === target) {
            return mid
        } else if (count > target) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return -1
}

/**
 * 27. 移除元素
 * 给你一个数组 nums 和一个值 val，
 * 你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    /**
     * 输入：nums = [3,2,2,3], val = 3 输出：2, nums = [2,2,_,_]
     * 解释：你的函数应该返回 k = 2, 并且 nums 中的前两个元素均为 2。 你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
     */

    let newIndex = 0
    const n = nums.length
    for (let i = 0; i < n; i++) {
        if (nums[i] !== val) {
            nums[newIndex] = nums[i]
            newIndex++
        }
    }
    return newIndex
}

/**
 * 977. 有序数组的平方
 * 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
 *
 * 输入：nums = [-4,-1,0,3,10] 输出：[0,1,9,16,100]
 * 解释：平方后，数组变为 [16,1,0,9,100] 排序后，数组变为 [0,1,9,16,100]
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    // const arrayNew = nums.map((item) => {
    //     return item * item
    // })
    // return arrayNew.sort((a, b) => a - b)

    // 不使用API - 双指针
    const n = nums.length
    let split = -1
    for (let i = 0; i < n; i++) {
        if (nums[i] < 0) {
            split = i
        } else {
            break
        }
    }
    const newArray = []

    let left = split,
        right = split + 1

    while (left >= 0 || right < n) {
        if (left < 0) {
            // 追加右侧节点
            newArray.push(nums[right] * nums[right])
            right++
        } else if (right === n) {
            newArray.push(nums[left] * nums[left])
            left--
        } else if (nums[left] * nums[left] > nums[right] * nums[right]) {
            newArray.push(nums[right] * nums[right])
            right++
        } else {
            newArray.push(nums[left] * nums[left])
            left--
        }
    }

    return newArray
}

/**
 * 209. 长度最小的子数组
 *
 * 给定一个含有 n 个正整数的数组和一个正整数 target
 *
 * 找出该数组中满足其总和大于等于 target 的长度最小的 子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，
 * 并返回其长度。如果不存在符合条件的子数组，返回 0
 *
 * 输入：target = 7, nums = [2,3,1,2,4,3] 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 *
 * 滑动窗口
 *
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    const n = nums.length

    let res = n + 1

    let sum = 0
    let subLen = 0
    let start = 0

    for (let i = 0; i < n; i++) {
        sum += nums[i]

        while (sum >= target) {
            subLen = i - start + 1
            res = Math.min(subLen, res)
            sum -= nums[start++]
        }
    }

    return res === n + 1 ? 0 : res
}

/**
 * 54. 螺旋矩阵
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 *
 * 在螺旋矩阵的遍历过程中，只有从左往右，和从上往下是安全入口； 再完成从左往右，从上往下遍历后，需要重新判断边界
 *
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]] 输出：[1,2,3,6,9,8,7,4,5]
 * 1  2  3
 * 4  5  6
 * 7  8  9
 *
 * [[2,3,4],[5,6,7],[8,9,10],[11,12,13],[14,15,16]]
 *
 * 2  3  4
 * 5  6  7
 * 8  9  10
 * 11  12  13
 * 14  15  16
 *
 * 7
 * 9
 * 6
 *
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    /**
     * 1. 定义好遍历方向；
     * 2. 维护好遍历边界；
     *
     * nextRow = [top, bottom]
     * nextCol = [left, right]
     */
    const row = matrix.length
    const col = matrix[0].length

    const res = []

    let top = 0,
        right = col - 1,
        bottom = row - 1,
        left = 0
    while (top <= bottom && left <= right) {
        // 从左往右
        for (let i = left; i <= right; i++) {
            res.push(matrix[top][i])
        }
        top++
        // 从上往下
        for (let i = top; i <= bottom; i++) {
            res.push(matrix[i][right])
        }
        right--
        // 从右往左
        if (top <= bottom) {
            // 要确认还有剩余行，所以需要额外判断
            for (let i = right; i >= left; i--) {
                res.push(matrix[bottom][i])
            }
        }
        bottom--
        // 从下往上
        if (left <= right) {
            // 确认是否还有剩余列
            for (let i = bottom; i >= top; i--) {
                res.push(matrix[i][left])
            }
            left++
        }
    }
    return res
}

/**
 * 59. 螺旋矩阵 II
 * 给你一个正整数 n ，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix
 *
 * 输入：n = 3 输出：[[1,2,3],[8,9,4],[7,6,5]]
 * 1  2  3
 * 8  9  4
 * 7  6  5
 *
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
    // n x n: row = [0, n-1]; col = [0, n-1]
    const res = Array.from(Array(n), () => Array(n).fill(0))

    let left = 0,
        right = n - 1,
        top = 0,
        bottom = n - 1,
        count = 1
    while (count <= n * n) {
        // 从左往右
        for (let i = left; i <= right; i++) {
            res[top][i] = count++
        }
        top++
        // 从上往下
        for (let i = top; i <= bottom; i++) {
            res[i][right] = count++
        }
        right--
        // 从右往左
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                res[bottom][i] = count++
            }
            bottom--
        }
        // 从下往上
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                res[i][left] = count++
            }
            left++
        }
    }
    return res
}
