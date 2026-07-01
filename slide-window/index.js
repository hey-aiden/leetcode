/** 滑动窗口
 * 注意细节：
 * 1. 窗口左右区间的移动，注意边界条件；尤其是对于左边界的移动，不同的模式下，有不同的移动前提：
 *    - 针对最小覆盖子串，左边界的移动，要在不破坏当前窗口满足条件的前提下，进行移动；
 *    - 针对找到所有字母异位词或者字符串的排列，左边界的移动，要满足目前窗口宽度的情况下，也就是需要匹配的字符串的长度，进行移动；
 * 2. 左边界移动过程中，找到结果的处理
 *    - 针对最小覆盖子串，找到结果后，要更新最小覆盖区间；
 *    - 针对找到所有字母异位词或者字符串的排列，找到结果后，要保存结果；
 * 3. 针对无重复字符的最长子串，窗口的移动，要满足当前窗口内没有重复字符的前提下，进行移动；因为每次while循环下，都会对当前字符串命中更新left坐标，所以做需要对每次循环下的right字符串更新后；
 *    对最新的字符串的长度进行控制，更新left坐标，直到right下标的字符串在窗口内没有重复为止；
 */

/**
 * 76. 最小覆盖子串 : 给定两个字符串 s 和 t，长度分别是 m 和 n，返回 s 中的 最短窗口 子串，使得该子串包含 t 中的每一个字符（包括重复字符）。如果没有这样的子串，返回空字符串 ""。
 * 示例 1： 输入：s = "ADOBECODEBANC", t = "ABC" 输出："BANC" 解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    let left = 0,
        right = 0,
        valid = 0,
        limitLen = s.length

    const countMap = new Map()

    for (let i = 0; i < t.length; i++) {
        const prev = countMap.get(t[i]) || 0
        countMap.set(t[i], prev + 1)
    }
    const windowMap = new Map()

    // 可以调整为直接传入1或者-1，不用flag判断
    function updateWindow(char, flag = 'add') {
        const prev = windowMap.get(char) || 0
        const next = flag === 'add' ? prev + 1 : prev - 1
        if (next === 0) {
            windowMap.delete(char)
            return
        }
        windowMap.set(char, next)
    }

    // 记录最小覆盖子串的起始索引及长度
    let start = 0,
        len = Infinity

    while (right < limitLen) {
        const char = s[right]

        if (countMap.has(char)) {
            updateWindow(char, 'add')
            // 最核心的优化：避免双 Map 查询
            if (windowMap.get(char) === countMap.get(char)) {
                valid++
            }
        }
        right++

        // 满足条件，开始收缩左侧窗口 -- countMap.size可以做缓存，避免每次都取
        while (valid === countMap.size) {
            if (right - left < len) {
                // 更新最小覆盖区间
                start = left
                len = right - left
            }
            const delChar = s[left]
            if (countMap.has(delChar)) {
                //  检验左边界窗口移除对整个滑动窗口的影响
                if (windowMap.get(delChar) === countMap.get(delChar)) {
                    valid--
                }
                updateWindow(delChar, 'DELETE')
            }
            left++
        }
    }
    return len === Infinity ? '' : s.substring(start, start + len)
}

/**
 * 438. 找到字符串中所有字母异位词  输入: s = "cbaebabacd", p = "abc" 输出: [0,6]
 * 对于窗口的处理，有两种方式：
 * 1. right先移动[left, right); 也就是在第二个while左窗口的判断前，先right++, 此时边界的处理是：right - left >= p.length   <-- 标准模板
 * 2. right后移动[left, right]; 也就是在第二个wihile左窗口的判断之后，再right++, 此时边界的处理是：right - left + 1 >= p.length
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    // 标准模式：
    let left = 0,
        right = 0,
        loopLen = s.length,
        targetLen = p.length

    const countTarget = {}
    for (let i = 0; i < targetLen; i++) {
        const key = p[i]
        const prev = countTarget[key] || 0
        countTarget[key] = prev + 1
    }

    const needCount = Object.keys(countTarget).length
    const res = []
    const windowGap = {}
    let valid = 0

    while (right < loopLen) {
        // 右窗口处理，直接++
        const char = s[right++]
        if (countTarget[char] !== undefined) {
            const prev = windowGap[char] || 0
            windowGap[char] = prev + 1
            if (windowGap[char] === countTarget[char]) {
                valid++
            }
        }
        while (right - left >= targetLen) {
            if (valid === needCount) {
                // 满足条件，保存结果
                res.push(left)
            }
            // 处理左窗口的移动
            const char = s[left++]
            if (countTarget[char] !== undefined) {
                // 对于windowGap的操作，一定要基于countTarget对象命中的前提下进行。
                if (countTarget[char] === windowGap[char]) {
                    valid--
                }
                windowGap[char]-- // 左窗口的一定是已经保存到windowGap中了，所以这里可以直接--
            }
        }
    }
    return res

    // 方式二
    // let left = 0,
    //     right = 0,
    //     len = s.length
    // const countTarget = {}
    // for (let i = 0; i < p.length; i++) {
    //     const key = p[i]
    //     const prev = countTarget[key] || 0
    //     countTarget[key] = prev + 1
    // }
    // const needCount = Object.keys(countTarget).length
    // const windowGap = {}
    // let valid = 0
    // const res = []
    // const targetNeed = p.length

    // while (right < len) {
    //     const char = s[right]
    //     if (countTarget[char]) {
    //         const prev = windowGap[char] || 0
    //         windowGap[char] = prev + 1
    //         if (windowGap[char] === countTarget[char]) {
    //             valid++
    //         }
    //     }
    //     while (right - left + 1 >= targetNeed) {
    //         if (valid === needCount) {
    //             res.push(left)
    //         }
    //         const delChar = s[left]
    //         if (countTarget[delChar]) {
    //             if (countTarget[delChar] === windowGap[delChar]) {
    //                 valid--
    //             }
    //             windowGap[delChar]--
    //         }
    //         left++
    //     }
    //     right++
    // }
    // return res
}

/**
 * 567. 字符串的排列 : 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。换句话说，第一个字符串的排列之一是第二个字符串的子串。
 * 示例 1： 输入: s1 = "ab" s2 = "eidbaooo" 输出: True 解释: s2 包含 s1 的排列之一 ("ba").
 * 并不需要穷举所有是s1的排列，只需要判断s2中是否存在s1的排列即可；也就是回到之前的判断方式：维护一个对象，是否匹配s1的字符串数量即可。
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    const countLen = s1.length
    const countMap = new Map()
    for (let i = 0; i < countLen; i++) {
        const char = s1[i]
        const prev = countMap.get(char) || 0
        countMap.set(char, prev + 1)
    }
    const countTotal = countMap.size

    const loopLen = s2.length
    const windowMap = new Map()
    let left = 0,
        right = 0,
        valid = 0

    while (right < loopLen) {
        const char = s2[right++]
        const countHit = countMap.get(char) || 0
        if (countHit > 0) {
            const prev = windowMap.get(char) || 0
            windowMap.set(char, prev + 1)
            if (prev + 1 === countHit) {
                valid++
            }
        }
        // 检测左窗口, 此时的right 已经是 ++ 执行后的; 保持窗口宽度的前提下，缩减左边界
        while (right - left >= countLen) {
            // 这里的 right - left === countLen 是冗余的，因为在 while (right - left >= countLen) 中，已经保证在前一轮的循环中，左边界已经被裁剪到合适的宽度了；
            if (right - left === countLen && valid === countTotal) {
                return true
            }
            const char = s2[left++]
            const countHit = countMap.get(char) || 0
            if (countHit > 0) {
                const prev = windowMap.get(char)
                if (prev === countHit) {
                    valid--
                }
                windowMap.set(char, prev - 1)
            }
        }
    }
    return false
}

/**
 * LCR 016. 无重复字符的最长子串 : 给定一个字符串 s ，请你找出其中不含有重复字符的 最长连续子字符串 的长度。
 * 输入: s = "abcabcbb" 输出: 3 解释: 因为无重复字符的最长子字符串是 "abc"，所以其长度为 3。
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const windowGap = new Map()
    let left = 0,
        right = 0
    const loopLen = s.length
    let res = 0
    while (right < loopLen) {
        const char = s[right++]
        const prev = windowGap.get(char) || 0
        windowGap.set(char, prev + 1)
        while (windowGap.get(char) > 1) {
            const char = s[left++]
            const prev = windowGap.get(char)
            windowGap.set(char, prev - 1)
        }
        res = Math.max(res, right - left)
    }
    return res
}
