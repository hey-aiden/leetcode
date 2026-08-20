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
 * 输入：heights = [2,1,5,6,2,3] 输出：10 解释：最大的矩形为图中红色区域，面积为 10
 *
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    const stack = []
    heights.push(0) // 给一个边界
    const len = heights.length
    let maxArea = 0
    /**
     * 核心思想是找到 柱子[i]中，左边比它小的以及右边比它小的元素，然后计算面积
     */
    for (let i = 0; i < len; i++) {
        // 因为每当遍历的元素高度>=栈顶的元素时，都是直接入栈；当遇到小的元素时， 挨个从栈里面拉出比当前遍历元素大的元素，然后计算对应的矩形面积
        while (stack.length && heights[i] < height[stack[stack.length - 1]]) {
            const height = heights[stack.pop()]
            const left = stack.length ? stack[stack.length - 1] : -1
            const width = i - left - 1 // 多-1是因为当前i并不参与面积计算
            maxArea = Math.max(maxArea, width * height)
        }
        // i 比 栈口元素大的话， 直接入栈； 维护的是一个单调递增区间
        stack.push(i)
    }
    return maxArea

    /**
     * 手写实现： 要维护的是单调递增的栈，这样循环对象才能使用自己的高度
     */
    const stack = []
    let maxArea = 0
    heights.unshift(0)
    heights.push(0)
    const len = heights.length

    for (let i = 0; i < len; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            const h = heights[stack.pop()]
            const left = stack[stack.length - 1]
            const w = i - left - 1
            maxArea = Math.max(maxArea, w * h)
        }
        stack.push(i)
    }
    return maxArea
}

/**
 * 42. 接雨水
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 *
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1] 输出：6
 * 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
 *
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    /**
     * 直觉反应就是：能接雨水的容量 = 找到数组中比它左右两边高的值，代表当前柱子的容量能被计算
     * 那维护一个单调递减栈，如果遇到一个高的，那么将栈里面比他小的出战，但是这样的话，后面又有高的，新增的面积如何计算？矩形面积相加即可。
     *
     * 简单理解就是：遇到了更高的右边界，那么就计算左边栈内柱子的储水量
     *
     * 相加不行，相减是可以的； 先计算栈口元素的面积，然后出栈，再用下一个栈口的面积 - 当前出栈栈口的面积，就能获取到出栈柱子的容量?
     * 不能直接用栈口来计算面积，会导致面积计算不准
     */

    const stack = []
    let capacity = 0

    const len = height.length

    for (let i = 0; i < len; i++) {
        let emptyCount = 0
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            const prev = stack.pop() // 用掉的柱子出栈
            if (stack.length) {
                const h = Math.min(height[stack[stack.length - 1]], height[i]) - height[prev]
                const w = i - stack[stack.length - 1] - 1
                capacity += w * h
            }
        }
        stack.push(i)
    }
    return capacity
}

/**
 * 3925. 连接逆序数组
 *
 * 给你一个长度为 n 的整数数组 nums,构造一个新的长度为 2 * n 的数组 ans，其中前 n 个元素与 nums 相同，后 n 个元素为 nums 的逆序
 * 具体而言，对于 0 <= i <= n - 1：
 * ans[i] = nums[i]
 * ans[i + n] = nums[n - i - 1]
 * 返回整数数组 ans
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var concatWithReverse = function (nums) {
    if (nums.length === 0) return []

    /**
     * 纯 API 解法
     */
    const len = nums.length
    const ans = nums.slice()
    ans.reverse()
    return [...nums, ...ans]

    /**
     * 一次遍历
     */
    const len = nums.length
    const ans = Array(2 * len)
    for (let i = 0; i < len; i++) {
        ans[i] = nums[i]
        ans[i + len] = nums[len - i - 1]
    }
    return ans
}

/**
 * 967. 连续差相同的数字
 *
 * 返回所有长度为 n 且满足其每两个连续位上的数字之间的差的绝对值为 k 的 非负整数
 *
 * 请注意，除了 数字 0 本身之外，答案中的每个数字都 不能 有前导零。例如，01 有一个前导零，所以是无效的；但 0 是有效的
 *
 * 输入：n = 3, k = 7  输出：[181,292,707,818,929]
 * 差值k是进位差，比如： 1 8 1  -》  1 + 7  = 8   8 - 7 = 1； 所以要满足的是：每两个连续位上的数字之间的差的绝对值为 k
 * 解释：注意，070 不是一个有效的数字，因为它有前导零。
 *
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var numsSameConsecDiff = function (n, k) {
    let res = new Set()
    /**
     *
     * @param {*} str 当前已使用的字符位数，如果 = n，则可以使用
     * @param {*} num 当前轮使用的数字
     * @returns
     */
    function dfs(str, num) {
        if (num < 0 || num > 9) return
        if (str.length === n) {
            // 收货的季节
            res.add(Number(str))
            return
        }
        str = str + num
        // 它的下一位： 2  + 4    2 - 4     5 + 5   5 - 4
        dfs(str, num + k)
        dfs(str, num - k)
    }

    for (let i = 1; i <= 9; i++) {
        // 从 1 开始累加 进位, 因为是绝对值，所以也可以是降位
        dfs('', i)
    }

    return Array.from(res)
}

/**
 *
 * 394. 字符串解码  给定一个经过编码的字符串，返回它解码后的字符串
 *
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数
 *
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的
 *
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入
 *
 * 输入：s = "3[a]2[bc]" 输出："aaabcbc"
 * 输入：s = "3[a2[c]]" 输出："accaccacc"  3 ]a  2] c   ] ]
 * 输入：s = "abc3[cd]xyz" 输出："abccdcdcdxyz" a b c 3 ] c d ] x y z
 *
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
    /**
     * 栈处理：
     * 3[a]2[bc]
     *
     * char === num  入栈
     * char === '['  入栈 ]
     * char === [a-z]  保存
     *
     */
    const strStack = []
    const countStack = []
    let res = ''
    let handleSemi = false

    function generateStr() {
        let str = ''
        while (strStack[strStack.length - 1] !== ']') {
            str = strStack.pop() + str
        }
        strStack.pop() // 将 ] 出栈
        let count = countStack.pop()
        let newStr = ''
        while (count > 0) {
            newStr = newStr + str
            count--
        }
        return newStr
    }

    let right = 0
    const len = s.length
    while (right < len) {
        const char = s[right]
        if (char === '[') {
            strStack.push(']')
        } else if (char === ']') {
            // 处理栈内数据
            str = generateStr()
            if (countStack.length) {
                strStack.push(str)
            } else {
                res += str
            }
        } else if (!isNaN(Number(char))) {
            // 这里要看前一个str是否也是number
            let numStr = char
            while (!isNaN(Number(s[right + 1]))) {
                numStr = numStr + s[right + 1]
                right++
            }
            countStack.push(Number(numStr))
        } else {
            // 纯字母
            if (countStack.length) {
                strStack.push(char)
            } else {
                res = res + char
            }
        }
        right++
    }

    return res
}

/**
 * 1048. 最长字符串链
 *
 * 给出一个单词数组 words ，其中每个单词都由小写英文字母组成
 *
 * 如果我们可以 不改变其他字符的顺序 ，在 wordA 的任何地方添加 恰好一个 字母使其变成 wordB ，那么我们认为 wordA 是 wordB 的 前身
 * 例如，"abc" 是 "abac" 的 前身 ，而 "cba" 不是 "bcad" 的 前身
 *
 * 从给定单词列表 words 中选择单词组成词链，返回 词链的 最长可能长度
 *
 * 输入：words = ["a","b","ba","bca","bda","bdca"] 输出：4
 * 解释：最长单词链之一为 ["a","ba","bda","bdca"]
 *
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words) {
    words.sort((a, b) => a.length - b.length)
    const wordMap = new Map()

    let res = -Infinity

    for (const word of words) {
        wordMap.set(word, 1)

        const len = word.length
        for (let i = 0; i < len; i++) {
            const prev = word.substring(0, i) + word.substring(i + 1)
            if (wordMap.has(prev)) {
                wordMap.set(word, Math.max(wordMap.get(word), wordMap.get(prev) + 1))
            }
        }

        res = Math.max(res, wordMap.get(word))
    }

    return res
}

/**
 * 80. 删除有序数组中的重复项 II
 * 
 * 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度
 * 
 * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 * 
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    const len = nums.length

    if (len <= 2) return len

    let left = 1,
        right = 2
    while (right < len) {
        if (nums[right] === nums[left] && nums[left] === nums[left - 1]) {
            right++
            while (nums[right] === nums[left]) {
                right++
            }
            if (right >= len) break
        }
        left++
        nums[left] = nums[right]
        right++
    }
    return left + 1
}

/**
 * 2625. 扁平化嵌套数组
 *
 * 数组 扁平化 是对数组的一种操作，定义是将原数组部分或全部子数组删除，并替换为该子数组中的实际元素。
 * 只有当嵌套的数组深度小于 n 时，才应该执行扁平化操作。
 *
 * 第一层数组中元素的深度被认为是 0
 *
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    let res = []

    function openArr(list, deep) {
        for (const item of list) {
            if (Array.isArray(item) && deep < n) {
                openArr(item, deep + 1)
            } else {
                res.push(item)
            }
        }
    }

    openArr(arr, 0)

    return res
}
