/**
 * 203. 移除链表元素
 * 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点
 *
 * 输入：head = [1,2,6,3,4,5,6], val = 6 输出：[1,2,3,4,5]
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
    // 更新头节点
    // while (head && head.val === val) {
    //     head = head.next
    // }

    // if (head === null) return null // 如果清完了，return null

    // // 清除前置节点后，更新后续节点
    // let prev = head

    // while (prev && prev.next) {
    //     if (prev.next.val === val) {
    //         prev.next = prev.next.next
    //     } else {
    // 		// 这里为什么不能放外面
    //         prev = prev.next
    //     }
    // }
    // return head

    // 使用虚拟头结节点
    const dummyHead = new ListNode()
    dummyHead.next = head
    let cur = dummyHead
    while (cur.next) {
        if (cur.next.val === val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return dummyHead.next
}

/**
 * 707. 设计链表
 * 你可以选择使用单链表或者双链表，设计并实现自己的链表。
 * 假设链表中的所有节点下标从 0 开始
 */

function designLink() {
    /**
     * 实现 MyLinkedList 类：
     * MyLinkedList() 初始化 MyLinkedList 对象;
     * int get(int index) 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1
     * void addAtHead(int val) 将一个值为 val 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点
     * void addAtTail(int val) 将一个值为 val 的节点追加到链表中作为链表的最后一个元素
     * void addAtIndex(int index, int val) 将一个值为 val 的节点插入到链表中下标为 index 的节点之前。如果 index 等于链表的长度，那么该节点会被追加到链表的末尾。如果 index 比长度更大，该节点将 不会插入 到链表中
     * void deleteAtIndex(int index) 如果下标有效，则删除链表中下标为 index 的节点
     *
     * 输入 ["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
     * [[], [1], [3], [1, 2], [1], [1], [1]]
     * 输出 [null, null, null, null, 2, null, 3]
     * 解释
     * MyLinkedList myLinkedList = new MyLinkedList();
     * myLinkedList.addAtHead(1);
     * myLinkedList.addAtTail(3);
     * myLinkedList.addAtIndex(1, 2);    // 链表变为 1->2->3
     * myLinkedList.get(1);              // 返回 2
     * myLinkedList.deleteAtIndex(1);    // 现在，链表变为 1->3
     * myLinkedList.get(1);              // 返回 3
     *
     */

    function ListNode(val, next) {
        this.val = val === undefined ? null : val
        this.next = next === undefined ? null : next
    }

    var MyLinkedList = function () {
        this.size = 0
        this.head = new ListNode(0)
    }

    /**
     * @param {number} index
     * @return {number}
     */
    MyLinkedList.prototype.get = function (index) {
        if (index < 0 || index >= this.size) return -1
        let cur = this.head
        for (let i = 0; i <= index; i++) {
            cur = cur.next
        }
        return cur.val
    }

    /**
     * @param {number} val
     * @return {void}
     */
    MyLinkedList.prototype.addAtHead = function (val) {
        this.addAtIndex(0, val)
    }

    /**
     * @param {number} val
     * @return {void}
     */
    MyLinkedList.prototype.addAtTail = function (val) {
        this.addAtIndex(this.size, val)
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    MyLinkedList.prototype.addAtIndex = function (index, val) {
        // 插入到链表中下标为 index 的节点之前
        if (index < 0 || index > this.size) return
        let cur = this.head
        for (let i = 0; i < index; i++) {
            cur = cur.next
        }
        let newNode = new ListNode(val)
        newNode.next = cur.next
        cur.next = newNode
        this.size++
    }

    /**
     * @param {number} index
     * @return {void}
     */
    MyLinkedList.prototype.deleteAtIndex = function (index) {
        if (index >= 0 && index < this.size) {
            let cur = this.head
            for (let i = 0; i < index; i++) {
                cur = cur.next
            }
            cur.next = cur.next.next
        }
    }

    /**
     * Your MyLinkedList object will be instantiated and called as such:
     * var obj = new MyLinkedList()
     * var param_1 = obj.get(index)
     * obj.addAtHead(val)
     * obj.addAtTail(val)
     * obj.addAtIndex(index,val)
     * obj.deleteAtIndex(index)
     */
}

/**
 * 206. 反转链表
 *
 * @param {ListNode} head
 * @return {ListNode}
 *
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表
 *
 */
var reverseList = function (head) {
    /**
     * 在反转的过程中，需要记录：prev节点，当前节点
     *
     * 输入：head = [1,2,3,4,5] 输出：[5,4,3,2,1]
     *
     */
    // let prev = null
    // let cur = head
    // let temp
    // while (cur) {
    //     temp = cur.next
    //     cur.next = prev
    //     prev = cur
    //     cur = temp
    // }
    // return prev

    // 递归实现
    if (head === null) return head
    function recursion(tail, head) {
        if (head === null) return tail
        let temp = head.next
        head.next = tail
        return recursion(head, temp)
    }
    return recursion(null, head)
}

/**
 * 删除链表的倒数第 N 个结点
 *
 * 输入：head = [1,2,3,4,5], n = 2  输出：[1,2,3,5]
 *
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    /**
     * 1 2 3 4 5
     * dummyHead -> 1 -> 2 -> 3 -> 4 -> 5
     * 假如要删除倒数第2个，也就是节点4； 
     * 在双指针-快慢指针的设计中，最终的目的是快指针走到null， 此时慢指针走到3：
     *      slow.next = slow.next.next
     * 也就是最后一次循环是： 2 -> 3;   5 -> null
     * 对应的步数是3步
     */
    const dummyHead = new ListNode()
    dummyHead.next = head
    let fast = dummyHead
    let slow = dummyHead
    for (let i = 0; i <= n; i++) {
        fast = fast.next
    }
    while (fast) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return dummyHead.next
	
}
