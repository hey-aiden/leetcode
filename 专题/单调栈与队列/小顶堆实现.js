/**
 * 小顶堆 - 是一种满足下面条件的完全二叉树：
 * 1. 每个父节点的值都小于等于它的子节点；
 * 2. 小顶堆不是完全排序，所以：不要求同层节点之间有顺序，它只要求：父节点 <= 子节点；
 * 3. 节点必须从上到下、从左到右填充，所以是完全二叉树
 */
class Heap {
    constructor(compareFn) {
        this.compareFn = compareFn
        this.queue = []
    }
    size() {
        return this.queue.length
    }
    // 元素比较
    compare(index1, index2) {
        // 考虑越界
        if (index1 >= this.size()) return 1 // 因为是找更小的那个，所以这里返回1，就会使用index2
        if (index2 >= this.size()) return -1
        return this.compareFn(this.queue[index1], this.queue[index2])
    }
    // 写入元素
    push(item) {
        this.queue.push(item)

        /**
         * 上浮该元素，找到对应的位置;
         *
         * 为什么通过 Math.floor((index-1)/2)来找到父节点:
         *
         *     8
         *   9   10
         * 11
         *
         * 首先约定，当前push的数据结构是一个合法的小顶堆，所以一定有 parent < parent.left || parent.right;
         * 如果符合： parent < index; 那么 index 上移； 结合小顶堆的特性，它只需要跟它的父节点比较，不需要跟父节点的同层级节点比较
         *
         * 然后，对于 Math.floor((index - 1) / 2)；
         *
         *     1           index = 0
         *  2     3        index = 1      index = 2
         * 4 5  6  7       index = 3 4    index = 5 6  left = parentIndex * 2 + 1  right = parentIndex * 2 + 2
         *
         * 如果从当前 index 推导它的父节点下标就是：                                      // 向下取整以后，左右孩子都会得到同一个父节点,毕竟这两个节点也就是相邻关系，相差也就是1
         * left - 1 = 2 * parentIndex      ->   (left - 1)/2 = parentIndex    -> parentIndex = (left - 1) / 2 = left / 2 - 1 / 2
         * right = parentIndex * 2 + 2     ->   right - 2 = 2 * parent        -> parentIndex = (right - 2) / 2 = right / 2 - 1
         *
         *
         */
        let index = this.size() - 1
        let parent = Math.floor((index - 1) / 2)
        while (parent >= 0 && this.compare(parent, index) > 0) {
            // 维护小顶堆，如果父节点 > index，交换位置； 为什么不用考虑当前 index 的 兄弟节点； 因为这里的前提是当前结构符合 小顶堆，所以必然 parent > index的另一个兄弟节点
            ;[this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]]
            index = parent
            parent = Math.floor((index - 1) / 2) // 继续向上比较 - 上浮
        }
    }
    // 弹出元素
    pop() {
        if (this.size() <= 1) {
            return this.queue.pop()
        }
        const out = this.queue[0] // 队列先出顺序
        this.queue[0] = this.queue.pop() // 队尾元素移动到队前

        /**
         * 加入元素后，移动到了队列头结点，需要通过比较，找到真正应该放置的位置 - 下沉寻址
         *
         * 跟 上浮不同，上浮只需要比较 父节点就行，不需要考虑 节点本身的兄弟节点；
         *
         * 下沉的话，为了保证小顶堆的结构，要跟它的两个左右子节点中更小的交换
         *
         * 同时，因为有判断下标取值逻辑，所以回到 compare 函数，需要有边界处理
         */
        let index = 0,
            left = 1
        let searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left
        while (this.compare(index, searchChild) > 0) {
            ;[this.queue[searchChild], this.queue[index]] = [this.queue[index], this.queue[searchChild]]
            index = searchChild
            left = 2 * index + 1 // 拿到左子节点的下标
            searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left // 比较左子树和右子树后，得到更小的节点，以便下一轮和index比较
        }
        return out
    }
}
