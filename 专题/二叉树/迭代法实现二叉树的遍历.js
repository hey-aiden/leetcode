/**
 * 迭代法实现二叉树的前中后序遍历
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 实现前序遍历 中-左-右
function preorderTraversal(root) {
  const result = [];
  const stack = [];
  stack.push(root);

  while (stack.length) {
    // Array.shift：把数组第一个元素移除，那么在入栈时，先入栈右子树
    const node = stack.shift();

    if (node === null) continue;
    result.push(node.val);

    stack.unshift(node.right);
    stack.unshift(node.left);
  }

  return result;
}

// 实现后序遍历 左-右-中
function postorderTraversal(root) {
  const result = [];
  const stack = [];
  stack.push(root);

  while (stack.length) {
    const node = stack.shift();

    if (node === null) continue;
    result.push(node.val);

    /** 与前序遍历不同，这里目的是构造 中-右-左的数组结构，在最后返回时将数组翻转即可获得 左-右-中 */
    stack.unshift(node.left);
    stack.unshift(node.right);
  }

  return result.reverse();
}

//实现中序遍历 左-中-右
function inorderTraversal(root) {
  /**
   *     1
   *  2       3   -> [4,5,2,6,3,1]
   * 4  5   6
   */
  const result = [];
  let stack = [];
  let node = root;
  while (stack.length || node !== null) {
    if (node !== null) {
      stack.push(node);
    }

    let leftNode = node?.left;
    while (leftNode) {
      stack.push(leftNode);
      leftNode = leftNode.left;
    }

    // [1,2,4] -> [1,2] 4
    let cur = stack.pop();
    result.push(cur.val);
    node = cur.right;
  }

  return result;
}
