/**
 * 两数之和：
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let diffMap = new Map()

    const len = nums.length

    for (let i = 0; i < len; i++) {
        if (diffMap.has(nums[i])) {
            const getCache = diffMap.get(nums[i])
            return [getCache, i]
        }
        diffMap.set(target - nums[i], i)
    }
}

/**
 * 两数之和 II - 输入有序数组:
 * 给定一个已按照 升序排列  的整数数组 numbers ，请你从数组中找出两个数满足相加之和等于目标数 target
 *
 * 假设数组中存在且只存在一对符合条件的数字，同时一个数字不能使用两次。
 *
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    /**
     * hash解法：
     * 输入：numbers = [1,2,4,6,10], target = 8 输出：[1,3]
     * 解释：2 与 6 之和等于目标数 8 。因此 index1 = 1, index2 = 3 。
     */
    // const len = numbers.length
    // const diffMap = new Map()

    // for(let i = 0; i < len; i++) {
    // 	if(diffMap.has(numbers[i])) {
    // 		const lastIdx = diffMap.get(numbers[i])
    // 		return [lastIdx, i]
    // 	}
    // 	const diff = target - numbers[i]
    // 	diffMap.set(diff, i)
    // }

    // 双指针
    const len = numbers.length
    let left = 0,
        right = len - 1
    while (left < right) {
        const sum = numbers[left] + numbers[right]
        if (sum === target) return [left, right]
        if (sum < target) left++
        if (sum > target) right--
    }
}

/**
 * 三数之和：
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，使得 a + b + c = 0 ？请找出所有和为 0 且 不重复 的三元组
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    // 两数之和 = 遍历nums，找到两数之和为当前下标的组合
    // 去除重复定义元素，遇到重复的就++
    // 求得是构成的数，而不是对应的下标，所以，在处理sum问题时，遇到相同的节点，是需要跳过的。
    // const len = nums.length
    // nums.sort((a, b) => a - b)
    // const res = []
    // for (let i = 0; i < len - 2; i++) {
    //     if (i > 0 && nums[i] === nums[i - 1]) continue
    //     const target = -nums[i]
    //     const numMap = new Map()
    //     let left = i + 1,
    //         right = len - 1
    //     while (left < right) {
    //         const sum = nums[left] + nums[right]
    //         if (sum > target) {
    //             right--
    //             while (nums[right] === nums[right + 1]) {
    //                 right--
    //             }
    //         } else if (sum < target) {
    //             left++
    //             while (nums[left] === nums[left - 1]) {
    //                 left++
    //             }
    //         } else {
    //             res.push([nums[i], nums[left], nums[right]])
    //             while (nums[left] === nums[left + 1]) {
    //                 left++
    //             }
    //             left++
    //             while (nums[right] === nums[right - 1]) {
    //                 right--
    //             }
    //             right--
    //         }
    //     }
    // }
    // return res

    // 使用公共函数
    const len = nums.length
    nums.sort((a, b) => a - b)
    const res = []
    for (let i = 0; i < len - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue
        const result = resolveTwoSum(nums, i + 1, -nums[i])
        if (result.length) {
            const list = result.map((item) => [...item, nums[i]])
            res.push(...list)
        }
    }
    return res
}

/**
 *
 * 18. 四数之和
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    nums.sort((a, b) => a - b)
    const len = nums.length

    const result = []
    for (let i = 0; i < len - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue
        for (let j = i + 1; j < len - 2; j++) {
            // j也要去重啊
            if (j > i + 1 && nums[j] === nums[j - 1]) continue
            const targetCount = target - nums[i] - nums[j]
            const res = resolveTwoSum(nums, j + 1, targetCount)
            if (res.length) {
                const resSum = res.map((item) => [nums[i], nums[j], ...item])
                result.push(...resSum)
            }
        }
    }
    return result
}

function resolveTwoSum(nums, start, target) {
    // 前提是：nums必须保证是正序
    const res = []
    const len = nums.length
    let left = start,
        right = len - 1
    while (left < right) {
        const sum = nums[left] + nums[right]
        if (sum < target) {
            while (nums[left] === nums[left + 1]) {
                left++
            }
            left++
        } else if (sum > target) {
            while (nums[right] === nums[right - 1]) {
                right--
            }
            right--
        } else {
            const sumRes = [nums[left], nums[right]]
            res.push(sumRes)
            while (nums[left] === nums[left + 1]) {
                left++
            }
            while (nums[right] === nums[right - 1]) {
                right--
            }
            left++
            right--
        }
    }
    return res
}
