/**
 * 875. 爱吃香蕉的珂珂
 *
 * 珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。
 *
 * 珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。
 * 每个小时，她将会选择一堆香蕉，从中吃掉 k 根。
 * 如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉
 *
 * 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
 * 返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）
 *
 * 输入：piles = [3,6,7,11], h = 8 输出：4
 *
 * 输入：piles = [30,11,23,4,20], h = 6 输出：23
 *
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
    // 如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉; 求最小 K；
    // k的有效区间为：[1, piles-max:她将吃掉这堆的所有香蕉]
    // 如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉； 也就是说 sum(当前堆下的香蕉)/k + sum % k > 0 ? 1 : 0
    // 如果 sum % k > 0; 说明还要多一个小时才能吃完当前堆内的香蕉

    const max = Math.max(...piles)

    let left = 1,
        right = max + 1
    // [left, right) 左闭右开区间
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2)

        if (canFinish(mid)) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    function canFinish(speed) {
        let timeCount = 0
        for (const pile of piles) {
            timeCount += Math.ceil(pile / speed)
        }
        return timeCount <= h
    }
    return left
}
