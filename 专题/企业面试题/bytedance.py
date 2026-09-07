"""
2769. 找出最大的可达成数字
给你两个整数 num 和 t 。如果整数 x 可以在执行下述操作 不超过 t 次的情况下变为与 num 相等，则称其为 可达成数字
每次操作将 x 的值增加或减少 1 ，同时可以选择将 num 的值增加或减少 1
返回所有可达成数字中的最大值 x
"""


def theMaximumAchievableX(num: int, t: int) -> int:
    print("hello world")
    return num + t * 2


"""
1929. 数组串联
给你一个长度为 n 的整数数组 nums 。请你构建一个长度为 2n 的答案数组 ans 
从 0 开始计数 ，对于所有 0 <= i < n 的 i ，满足下述所有要求：
ans[i] == nums[i]
ans[i + n] == nums[i]
具体而言，ans 由两个 nums 数组 串联 形成
返回数组 ans
"""


def getConcatenation(nums: list[int]) -> list[int]:
    nums_concat = nums + nums
    return nums_concat


"""
2614. 对角线上的质数
给你一个下标从 0 开始的二维整数数组 nums 
返回位于 nums 至少一条 对角线 上的最大 质数 :如果某个整数大于 1 ，且不存在除 1 和自身之外的正整数因子，则认为该整数是一个质数
如果存在整数 i ，使得 nums[i][i] = val 或者 nums[i][nums.length - i - 1]= val ，则认为整数 val 位于 nums 的一条对角线上

"""


class Solution:
    def diagonalPrime(self, nums: list[list[int]]) -> int:
        max_prime = 0
        end_index = len(nums) - 1
        for i in range(len(nums)):
            if self.isPrime(nums[i][i]):
                max_prime = max(max_prime, nums[i][i])
            if self.isPrime(nums[i][end_index - i]):
                max_prime = max(max_prime, nums[i][end_index - i])
        return max_prime

    def isPrime(self, n: int) -> bool:
        if n < 2:
            return False
        start = 2
        while start * start <= n:
            if n % start == 0:
                return False
            start += 1
        return True


"""
2176. 统计数组中相等且可以被整除的数对
给你一个下标从 0 开始长度为 n 的整数数组 nums 和一个整数 k 
请你返回满足 
0 <= i < j < n ，
nums[i] == nums[j] 
且 (i * j) 能被 k 整除的数对 (i, j) 的 数目 

输入：nums = [3,1,2,2,2,1,3], k = 2
输出：4
解释：
总共有 4 对数符合所有要求：
- nums[0] == nums[6] 且 0 * 6 == 0 ，能被 2 整除。
- nums[2] == nums[3] 且 2 * 3 == 6 ，能被 2 整除。
- nums[2] == nums[4] 且 2 * 4 == 8 ，能被 2 整除。
- nums[3] == nums[4] 且 3 * 4 == 12 ，能被 2 整除。
"""


class Solution:
    def countPairs(self, nums: list[int], k: int) -> int:
        count = 0
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] == nums[j] and (i * j) % k == 0:
                    count += 1
        return count


"""
2660. 保龄球游戏的获胜者
"""


class Solution:
    def isWinner(self, player1: list[int], player2: list[int]) -> int:
        count_1 = self.countScore(player1)
        count_2 = self.countScore(player2)
        if count_1 == count_2:
            return 0
        return 1 if count_1 > count_2 else 2

    def countScore(self, player: list[int]) -> int:
        count = 0
        last_ten = None
        for i in range(len(player)):
            if last_ten is not None and last_ten <= 2:
                count += player[i] * 2
            else:
                count += player[i]
            if player[i] == 10:
                last_ten = i
        return count


"""
1672. 最富有客户的资产总量
"""


class Solution:
    def maximumWealth(self, accounts: list[list[int]]) -> int:
        max_wealth = 0
        for i in range(len(accounts)):
            sum = 0
            account = accounts[i]
            for j in range(len(account)):
                sum += account[j]
            max_wealth = max(max_wealth, sum)
        return max_wealth
