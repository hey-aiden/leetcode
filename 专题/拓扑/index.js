/**
 *
 * 拓扑排序就是：找到一种满足所有依赖关系的顺序。
 *
 * 207. 课程表
 *
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    /**
     * 维护一个节点信息对象，记录了每个节点的以下信息：
     * 1. 入度统计，遍历prerequisites子项时，统计子项[0]的出口项，子项[1]的入度+1
     *    比如针对课程 numCourses = 2, prerequisites = [[0,1]]
     *    0的入度就是1(需要先完成课程1)； 1的入口就是0； 对应的向量是： 1 -> 0
     *    节点的数据结构是： { pre: 0, next: [1] }
     * 2. 有了所有的入度信息数据之后，将pre为0的节点塞进队列中；然后依次清理队列中的节点：
     *    将pre节点相关的next队列中的每一项的 pre-1；
     *    -1之后，如果节点Pre=0，推入队列中；
     *    每个节点处理之后，count + 1 (维护一个count变量)
     * 3. 当所有的pre=0的节点都处理之后，如果count = 课程数，说明可以完成目标
     *
     * [[1, 0], [2, 0], [3, 1], [4, 1], [4, 3]]
     *
     *
     * 0 -> 1 -> 3
     *           ↓
     *        -> 4
     *   -> 2
     *
     * 0: { pre: 0, next: [1,2]}
     * 1: { pre: 1, next: [3,4]}
     */

    /** 初始化所有课程数据 */
    const courseInfo = {}
    for (let i = 0; i < numCourses; i++) {
        courseInfo[i] = {
            pre: 0,
            next: [],
        }
    }

    for (let course of prerequisites) {
        const [next, pre] = course

        courseInfo[pre].next.push(next)
        courseInfo[next].pre++
    }

    // 统计所有入度为0的节点
    const preStack = []
    for (const key in courseInfo) {
        if (courseInfo[key].pre === 0) {
            preStack.push(key)
        }
    }

    let count = 0
    let step = 0

    while (step < preStack.length) {
        const preKey = preStack[step++]
        const nextList = courseInfo[preKey].next
        for (const nextKey of nextList) {
            courseInfo[nextKey].pre--
            if (courseInfo[nextKey].pre === 0) {
                preStack.push(nextKey)
            }
        }
        count++
    }
    return count === numCourses
}
