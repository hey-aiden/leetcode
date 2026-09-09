/**
 * 2900. 最长相邻不相等子序列 I
 * 给定一个字符串数组 words ，和一个 二进制 数组 groups ，两个数组长度都是 n
 * 如果 words 的一个 子序列 是交替的，那么对于序列中的任意两个连续字符串，它们在 groups 中相同索引的对应元素是 不同 的（也就是说，不能有连续的 0 或 1）
 * 你需要从 words 中选出 最长交替子序列。
 * 返回选出的子序列。如果有多个答案，返回 任意 一个
 * 注意：words 中的元素是不同的
 *
 * 输入：words = ["e","a","b"], groups = [0,0,1] 输出：["e","b"]
 * 解释：一个可行的子序列是 [0,2] ，
 * 因为 groups[0] != groups[2] 。
 * 所以一个可行的答案是 [words[0],words[2]] = ["e","b"] 。
 *
 * 另一个可行的子序列是 [1,2] ，因为 groups[1] != groups[2] 。
 * 得到答案为 [words[1],words[2]] = ["a","b"] 。 这也是一个可行的答案。 符合题意的最长子序列的长度为 2
 *
 */
var getLongestSubsequence = function (words, groups) {
    const res = []
    let flag = groups[0]
    res.push(words[0])
    let start = 1
    const len = words.length
    while (start < len) {
        if (groups[start] !== flag) {
            flag = groups[start]
            res.push(words[start])
        }
        start++
    }
    return res
}
