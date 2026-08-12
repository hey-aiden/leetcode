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
     */

    function cost(len) {
        if (len <= k) return 0

        let left = 0,
            right = len
        let minCost = -Infinity
        while (left < right) {
            const mid = left + Math.ceil((right - left) / 2)
        }
    }

    return cost(n) + cost(m)
}
