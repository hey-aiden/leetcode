/**
 * 496. 下一个更大元素 I
 *
 * nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素
 *
 * 如果不存在下一个更大元素，那么本次查询的答案是 -1
 *
 * 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
 * 输出：[-1,3,-1]
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
    // 常规解法
    const res = []
    const len = nums2.length
    for (const num of nums1) {
        const index = nums2.indexOf(num)
        let left = index + 1
        let numUse = -1
        while (left < len) {
            if (nums2[left] > num) {
                numUse = nums2[left]
                break
            }
            left++
        }
        res.push(numUse)
    }
    return res

    /**
     * 单调栈解决：利用栈先进后出的原则
     *
     * 栈顶应该是数组尾部，不是头部； 队列才是，因为队列是先进先出
     *
     * 1. 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
     * [1,3,4,2]处理单调栈：
     * 2    empty   -1   2入栈  此时栈内元素： [2]
     * 4>2  [2].shift()  -1    4入栈 此时栈内元素： [4]
     * 3 < 4      4        3入栈  此时栈内元素：[4,3]
     * 1 < 4     4         1入栈， 此时站内元素：[4,3,1]
     */
    const numMap = new Map()
    const stack = []
    const len = nums2.length
    for (let i = len - 1; i >= 0; i--) {
        const num = nums2[i]
        while (stack.length && num >= stack[stack.length - 1]) {
            stack.pop()
        }
        const res = stack.length ? stack[stack.length - 1] : -1
        numMap.set(num, res)
        stack.push(num)
    }

    return nums1.map((item) => numMap.get(item))
}

/**
 * 503. 下一个更大元素 II
 *
 * 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素
 *
 * 输入: nums = [1,2,1] 输出: [2,-1,2]
 * 解释: 第一个 1 的下一个更大的数是 2； 数字 2 找不到下一个更大的数； 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
    const stack = []
    const len = nums.length
    const ans = Array(len).fill(-1)

    for (let i = 0; i < len * 2; i++) {
        while (stack.length && nums[i % len] > nums[stack[stack.length - 1]]) {
            const index = stack.pop()
            ans[index] = nums[i]
        }
        stack.push(i % len)
        if (i > len) break
    }

    return ans
}

/**
 * LCR 038. 每日温度
 *
 * 请根据每日 气温 列表 temperatures ，重新生成一个列表，要求其对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。
 * 如果气温在这之后都不会升高，请在该位置用 0 来代替。
 *
 * 输入：temperatures = [73,74,75,71,69,72,76,73] 输出：[1,1,4,2,1,1,0,0]
 *
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    const res = []

    const stack = []

    const len = temperatures.length

    for (let i = len - 1; i >= 0; i--) {
        const curTemp = temperatures[i]

        while (stack.length && curTemp > temperatures[stack[stack.length - 1]]) {
            stack.pop()
        }
        res[i] = stack.length ? stack[stack.length - 1] - i : 0
        stack.push(i)
    }
    return res
}

/**
 * 20. 有效的括号
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    // 边界调优
    if (s.length % 2 !== 0) return false

    const stack = []
    const semiMap = {
        '(': ')',
        '[': ']',
        '{': '}',
    }
    for (const char of s) {
        if (['(', '[', '{'].includes(char)) {
            stack.push(semiMap[char])
        } else if ([')', ']', '}'].includes(char)) {
            const prev = stack.pop()

            if (prev !== char) return false
        }
    }
    return stack.length === 0
}

/**
 * 678. 有效的括号字符串
 *
 * 给你一个只包含三种字符的字符串，支持的字符类型分别是 '('、')' 和 '*'； 请你检验这个字符串是否为有效字符串，如果是 有效 字符串返回 true 。
 *
 * 有效 字符串符合如下规则：
 * 1. 任何左括号 '(' 必须有相应的右括号 ')'
 * 2. 任何右括号 ')' 必须有相应的左括号 '('
 * 3. 左括号 '(' 必须在对应的右括号之前 ')'
 * 4. '*' 可以被视为单个右括号 ')' ，或单个左括号 '(' ，或一个空字符串 ""
 *
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
    /**
     * 1. 只包含三种字符串；
     * 2. 有效规则：() (*) ((*) (*))  (*(*()  (*()*)
     * 3. *可以作为一个万能符号
     *
     * 入栈：(  ->   )
     *
     * 出栈：
     * 1. ） -> 栈口需要满足为 ')'，或者 *; 如果是), 出栈， 如果是 * ，是不是可以不出栈呢
     * 2.
     */
    const leftStack = []
    const starStack = []
    const len = s.length

    for (let i = 0; i < len; i++) {
        const char = s[i]

        if (char === '(') {
            leftStack.push(i)
        } else if (char === '*') {
            starStack.push(i)
        } else {
            if (leftStack.length) {
                leftStack.pop()
            } else if (starStack.length) {
                starStack.pop()
            } else {
                return false
            }
        }
    }
    // 遍历完之后，如果leftStart，也就是左括号还有值，此时把 * 当做右括号使用，要注意，右括号一定要在左括号右边，所以 starStack的元素的下标，要大于leftStack的
    while (leftStack.length && starStack.length) {
        const leftIndex = leftStack.pop()
        const starIndex = starStack.pop()
        if (leftIndex > starIndex) return false
    }
    return leftStack.length === 0
}

/**
 * 1047. 删除字符串中的所有相邻重复项
 *
 * 给出由小写字母组成的字符串 s，重复项删除操作会选择两个相邻且相同的字母，并删除它们
 * 在 s 上反复执行重复项删除操作，直到无法继续删除
 *
 * 输入："abbaca"输出："ca"
 * 解释：
 * 例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。
 * 之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
 *
 *
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
    const stack = []
    for (const char of s) {
        if (stack.length && char === stack[stack.length - 1]) {
            while (stack.length && char === stack[stack.length - 1]) {
                stack.pop()
            }
        } else {
            stack.push(char)
        }
    }
    return stack.join('')
}

/**
 * 1209. 删除字符串中的所有相邻重复项 II
 * 给你一个字符串 s，「k 倍重复项删除操作」将会从 s 中选择 k 个相邻且相等的字母，并删除它们，使被删去的字符串的左侧和右侧连在一起。
 * 你需要对 s 重复进行无限次这样的删除操作，直到无法继续为止; 在执行完所有删除操作后，返回最终得到的字符串。
 *
 * 输入：s = "deeedbbcccbdaa", k = 3 输出："aa"
 * 解释： 先删除 "eee" 和 "ccc"，得到 "ddbbbdaa" 再删除 "bbb"，得到 "dddaa" 最后删除 "ddd"，得到 "aa"
 *
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicates = function (s, k) {
    /**
     * 是不是可以遍历的时候，累加当前字符，距离k个的距离，这样判断的时候，只需要Pop之后，如果跟前一个相同，那么累加计数，如果达到了，就直接移除
     * k = 2    caacb   0c1a
     * 分两个栈，一个存字符，一个存统计量
     */
    const countStack = []
    const charStack = []
    for (const char of s) {
        if (charStack.length && char === charStack[charStack.length - 1]) {
            let prev = countStack.pop()

            if (prev + 1 === k) {
                charStack.pop()
            } else {
                countStack.push(prev + 1)
            }
        } else {
            charStack.push(char)
            countStack.push(1)
        }
    }
    // 基于统计栈和字符栈构造新字符
    const len = charStack.length
    let result = ''
    for (let i = 0; i < len; i++) {
        // let str = charStack[i]
        // let count = countStack[i] - 1
        // while (count > 0) {
        //     str += str // 如果直接用str+,就变成倍增了，比如一开始 str = 'a'; str += str => 'aa'; str += str = > 'aaaa'
        //     count--
        // }
        // result = result + str

        let curStr = ''
        let baseStr = charStack[i]
        let count = countStack[i]
        while (count > 0) {
            curStr += baseStr
            count--
        }
        result = result + curStr
    }
    return result
}

/**
 * 150. 逆波兰表达式求值
 *
 * 给你一个字符串数组 tokens ，表示一个根据 逆波兰表示法 表示的算术表达式; 请你计算该表达式。返回一个表示表达式值的整数
 *
 * 有效的算符为 '+'、'-'、'*' 和 '/'
 * 每个操作数（运算对象）都可以是一个整数或者另一个表达式。
 * 两个整数之间的除法总是 向零截断
 * 表达式中不含除零运算
 * 输入是一个根据逆波兰表示法表示的算术表达式。
 *
 * 输入：tokens = ["2","1","+","3","*"] 输出：9 解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
 * 逆波兰表达式：
逆波兰表达式是一种后缀表达式，所谓后缀就是指算符写在后面。
平常使用的算式则是一种中缀表达式，如 ( 1 + 2 ) * ( 3 + 4 ) 。
该算式的逆波兰表达式写法为 ( ( 1 2 + ) ( 3 4 + ) * ) 。
逆波兰表达式主要有以下两个优点：
去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + * 也可以依据次序计算出正确结果。
适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中
 *
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    // 核心： 适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中

    if (tokens.length === 1) return Number(tokens[0])

    const stack = []

    for (const char of tokens) {
        if (['+', '-', '*', '/'].includes(char)) {
            // 遇到运算符处理
            const num1 = Number(stack.pop())
            const num2 = Number(stack.pop())
            let res
            switch (char) {
                case '+':
                    res = num2 + num1
                    break
                case '-':
                    res = num2 - num1
                    break
                case '*':
                    res = num2 * num1
                    break
                default:
                    res = parseInt(num2 / num1)
            }
            stack.push(res)
        } else {
            stack.push(char)
        }
    }
    return stack[0]
}

/**
 * 239. 滑动窗口最大值
 *
 * 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧
 * 你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位
 * 返回 滑动窗口中的最大值 。
 *
 * 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3 输出：[3,3,5,5,6,7]
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    /**
     * 大小为K的滑动窗口内的最大值
     * 维护一个单调递减栈？
     *
     * 移除的元素为：right-k-1 === stack.pop(); 如果相等，那么stack还需要再pop()一次; 如果没有值了呢，找不到第二大的了呀，重新排序？
     *
     * 换一个思路：维护一个单调递增栈呢
     *
     * 栈不行的话，队列呢
     *
     * 队列：先进先出
     *
     * 维护一个单调队列：
     * 加入队列的时候，从后往前，比他小的数都删除，然后追加到队列尾部；
     * 窗口移动，如果队列头部的值 = 移动的值，那么弹出队列
     *
     */
    class MonoQueue {
        constructor() {
            this.queue = []
        }
        // 加入元素
        enqueue(value) {
            // 队列中比它小的数，都移除
            while (this.queue.length && value > this.queue[this.queue.length - 1]) {
                this.queue.pop()
            }
            this.queue.push(value)
        }
        // 元素出栈
        dequeue(value) {
            if (this.front() === value) {
                this.queue.shift()
            }
        }
        // 队列头
        front() {
            return this.queue[0]
        }
    }
    const helperQueue = new MonoQueue()
    const res = []

    let left = 0,
        right = 0
    while (right < k) {
        helperQueue.enqueue(nums[right])
        right++
    }
    res.push(helperQueue.front())

    const len = nums.length
    while (right < len) {
        helperQueue.enqueue(nums[right])
        helperQueue.dequeue(nums[left])
        res.push(helperQueue.front())
        left++
        right++
    }
    return res
}

/**
 * 347. 前 K 个高频元素
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
 *
 * 输入：nums = [1,1,1,2,2,3], k = 2 输出：[1,2]
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    /**
     * 借助API操作
     */

    const countMap = new Map()
    for (const num of nums) {
        if (!countMap.has(num)) {
            countMap.set(num, { value: num, count: 0 })
        }
        countMap.get(num).count++
    }

    const numList = Array.from(countMap.values())

    numList.sort((a, b) => b.count - a.count)

    return numList.slice(0, k - 1).map((item) => item.value)

    /**
     * 手写实现优先级队列
     */
    class Heap {
        constructor(compareFn) {
            this.queue = []
            this.compareFn = compareFn
        }
        // 比较两个位置的元素对应的统计值大小
        compare(index1, index2) {
            if (this.queue[index1] === undefined) return 1
            if (this.queue[index2] === undefined) return -1
            return this.compareFn(this.queue[index1], this.queue[index2])
        }
        size() {
            return this.queue.length
        }
        /**
         * 加入元素：
         * push：新来的元素不知道自己应该待在哪里，所以要比较
         *
         * push → 新元素放到末尾 → 不断和父节点比较 → 上浮
         *
         * @param {*} item
         */
        push(item) {
            this.queue.push(item)
            let index = this.size() - 1 // 记录推入元素后的新下标
            /**
             * 1. 找到数组对应的二叉树堆的父节点位置； 为什么是 (index -1 ) / 2;
             * 因为对于二叉树来说，root节点只有一个, 所以对于当前节点来说，它的父节点就是(root-1) / index; 并且向下取整。
             * 2. 开始循环对比当前节点在整个二叉树的位置，如果 parent 节点的值 > index 节点的值， 那么交换两个节点的位置； 【因为维护的是小顶堆】，更小的在上面
             */
            let parent = Math.floor((index - 1) / 2)
            while (parent >= 0 && this.compare(parent, index) > 0) {
                // 当父节点在数组中>=0，并且比较后，当前节点-index 小于 父节点； 那么当前节点要上浮
                ;[this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]]
                index = parent
                parent = Math.floor((index - 1) / 2)
            }
        }
        /**
         * 获取并弹出栈顶元素
         * 为什么pop()弹出之后也需要排序：
         *   - 为了继续保持完全二叉树结构，我们不能随便找一个元素放进去； 通常做法是：把最后一个元素搬到堆顶
         * @param {*} item
         */
        pop(item) {
            if (this.size() <= 1) {
                return this.queue.pop()
            }
            const out = this.queue[0]
            // 将最后一个元素移动到前面 - 根节点空了，通常的做法，就是把最后一个元素搬到堆顶，然后再一次比较每一层的左右子树节点，具体是左还是右，通过compare(left, left+1)比较出来了
            this.queue[0] = this.queue.pop()
            let index = 0,
                left = 1,
                searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left // 如果 compare(left, left+1) > 0; 说明 left 节点的值 大于 left + 1 的值； 按照小顶堆的设计，更新 left + 1
            // 这里的循环，是不停地把当前大的index-也就是之前替换上来的最后一个元素this.queue[0] = this.queue.pop(),进行下沉，直到放到合适的位置
            // 不断把这个元素向下移动，直到它满足堆序，或者到达叶子节点
            while (this.compare(index, searchChild) > 0) {
                ;[this.queue[index], this.queue[searchChild]] = [this.queue[searchChild], this.queue[index]]
                index = searchChild
                left = 2 * index + 1 // 继续下沉下一层二叉树节点
                searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left
            }
            return out
        }
    }
    // 有了小顶堆之后，开始处理数据
    const heap = new Heap((a, b) => a[1] - b[1]) // 传入排序规则
    const numMap = new Map()
    for (const num of nums) {
        numMap.set(num, (numMap.get(num) || 0) + 1)
    }

    for (const mapItem of numMap.entries()) {
        heap.push(mapItem)
        if (heap.size() > k) {
            heap.pop()
        }
    }
    const res = []
    // 注意，如果动态获取heap.size()来进行取值，由于每次heap.pop后，heap.size其实都是减少了，会导致随着循环增加，取到值的上限一直被减少
    // for (let i = 0; i < heap.size(); i++) {
    //     res.push(heap.pop()[0])
    // }
    while (heap.size()) {
        res.push(heap.pop()[0])
    }
    return res
}

/**
 * 数组中的第K个最大元素
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    // 小顶堆

    class Heap {
        constructor(compareFn) {
            this.compareFn = compareFn
            this.queue = []
        }
        size() {
            return this.queue.length
        }
        compare(index1, index2) {
            if (index1 >= this.size()) return 1
            if (index2 >= this.size()) return -1
            return this.compareFn(this.queue[index1], this.queue[index2])
        }
        push(item) {
            this.queue.push(item)
            let index = this.size() - 1
            let parent = Math.floor((index - 1) / 2)
            while (parent >= 0 && this.compare(parent, index) > 0) {
                ;[this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]]
                index = parent
                parent = Math.floor((index - 1) / 2)
            }
        }
        pop() {
            if (this.size() <= 1) {
                return this.queue.pop()
            }
            const out = this.queue[0]
            this.queue[0] = this.queue.pop()

            let index = 0
            let left = 1
            let minChild = this.compare(left, left + 1) > 0 ? left + 1 : left
            while (this.compare(index, minChild) > 0) {
                ;[this.queue[minChild], this.queue[index]] = [this.queue[index], this.queue[minChild]]
                index = minChild
                left = index * 2 + 1
                minChild = this.compare(left, left + 1) > 0 ? left + 1 : left
            }
            return out
        }
    }
    const heap = new Heap((a, b) => a - b)
    for (const num of nums) {
        heap.push(num)
        if (heap.size() > k) {
            heap.pop()
        }
    }
    return heap.pop()
}
