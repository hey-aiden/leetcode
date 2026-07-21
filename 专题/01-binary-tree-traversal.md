# 二叉树遍历

> 前序、中序、后序三种深度优先遍历的递归与迭代实现，重点讲解统一风格的迭代写法(null 哨兵标记法 / 标记法)。

---

## 一、三种遍历的定义

二叉树的深度优先遍历按"根节点相对左右子树的处理时机"分为三种:

| 遍历 | 顺序 | 根的处理时机 |
|------|------|-------------|
| 前序 (preorder) | 中 → 左 → 右 | 进入子树前 |
| 中序 (inorder) | 左 → 中 → 右 | 左子树处理完后 |
| 后序 (postorder) | 左 → 右 → 中 | 左右子树都处理完后 |

三者都是 DFS,区别仅在于"输出根节点 val"这一步插在什么位置。

---

## 二、递归实现(基线)

递归写法最直观,调用栈天然记录了回溯路径,改变三行语句的顺序即可在三种遍历间切换:

```js
function traverse(root) {
  const res = [];
  const dfs = (node) => {
    if (node === null) return;
    // res.push(node.val);   // 前序：在此处输出
    dfs(node.left);
    // res.push(node.val);   // 中序：在此处输出
    dfs(node.right);
    // res.push(node.val);   // 后序：在此处输出
  };
  dfs(root);
  return res;
}
```

递归简洁,但有栈深度限制(树极度不平衡时可能栈溢出),且面试常要求手写迭代版。

---

## 三、迭代实现:统一风格的 null 标记法

### 核心矛盾

迭代遍历中,"访问节点"(遍历到它)和"处理节点"(输出 val)的时机不同。以中序为例:要求先处理完左子树再处理当前节点,但第一次把节点 pop 出栈时,它的左子树尚未处理。

若直接用栈模拟,pop 出一个节点时无法区分它是**第一次见(需要展开子树)**还是**第二次见(可以输出了)**。

### 解决思路:解耦"访问"与"处理"

用一个 `null` 作为哨兵标记,把两件事分开:

- **访问时**:不立即输出,而是按"目标顺序的逆序"把子树和自己重新入栈,并紧跟当前节点压入一个 `null` 作为"待处理"标记。
- **遇到 null 时**:说明它前面紧跟的那个节点子树已经排布完毕,此时才弹出并输出该节点。

`null` 标记起到的就是"这个节点是第二次见、可以处理了"的信号。

### 统一框架

三种遍历共用同一套循环骨架,**只有分支 A 里那 4 行 push 的顺序不同**,其余完全一致:

```js
while (stack.length) {
  let node = stack.pop();
  if (node !== null) {
    // 分支 A：待展开 → 按逆序入栈 + 埋 null 标记（4 行 push，顺序决定遍历类型）
    ...
  } else {
    // 分支 B：遇到 null → 输出紧跟其后的那个节点
    node = stack.pop();
    res.push(node.val);
  }
}
```

### 入栈顺序口诀

栈是 LIFO(后进先出),所以**入栈顺序 = 目标输出顺序的逆序**。`null` 紧跟在"中"节点后面入栈:

| 遍历 | 目标顺序 | 入栈顺序(从先到后) |
|------|----------|---------------------|
| 中序 | 左 中 右 | 右 → 中 → null → 左 |
| 前序 | 中 左 右 | 右 → 左 → 中 → null |
| 后序 | 左 右 中 | 中 → null → 右 → 左 |

记忆要点:把"中 + null"看作一个整体,它在入栈序列里的位置,正好是"中"在目标顺序里位置的镜像。

---

## 四、三种遍历完整代码

### 中序遍历(左中右)

```js
function inorder(root) {
  if (root === null) return [];
  const stack = [root];
  const res = [];

  while (stack.length) {
    let node = stack.pop();
    if (node !== null) {
      // 入栈顺序：右 -[中 - null]- 左
      node.right && stack.push(node.right);
      stack.push(node);
      stack.push(null);
      node.left && stack.push(node.left);
    } else {
      // 遇到 null，意味着紧跟其后的节点该处理了
      node = stack.pop();
      res.push(node.val);
    }
  }
  return res;
}
```

### 前序遍历(中左右)

```js
function preorder(root) {
  if (root === null) return [];
  const stack = [root];
  const res = [];

  while (stack.length) {
    let node = stack.pop();
    if (node !== null) {
      node.right && stack.push(node.right);
      node.left && stack.push(node.left);
      stack.push(node);
      stack.push(null);
    } else {
      node = stack.pop();
      res.push(node.val);
    }
  }
  return res;
}
```

### 后序遍历(左右中)

```js
function postorder(root) {
  if (root === null) return [];
  const stack = [root];
  const res = [];

  while (stack.length) {
    let node = stack.pop();
    if (node !== null) {
      stack.push(node);
      stack.push(null);
      node.right && stack.push(node.right);
      node.left && stack.push(node.left);
    } else {
      node = stack.pop();
      res.push(node.val);
    }
  }
  return res;
}
```

---

## 五、复杂度与对比

| 维度 | 递归 | 迭代(null 标记法) |
|------|------|---------------------|
| 时间复杂度 | O(n) | O(n),每个节点恰好入栈/出栈两次 |
| 空间复杂度 | O(h),h 为树高(调用栈) | O(n),最坏情况栈中含哨兵 |
| 可读性 | 高 | 中,但三种遍历高度统一 |
| 适用场景 | 一般场景首选 | 需手写迭代、规避栈溢出、统一模板时 |

> 标记法的优势在于**模板统一**:记住一套骨架 + 三句入栈口诀,就能稳定写出三种迭代遍历,不用为每种遍历单独设计指针逻辑(对比经典的"指针 + 栈"中序写法,后者三种遍历差异很大、难以迁移)。

---

## 六、附:指针 + 栈写法对照

除了 null 标记法,另一条主流迭代路线是经典的**"指针 + 栈"**:显式维护一个 `node` 指针,沿左链一路下行入栈,回退时再处理。它空间常数略小,但三种遍历的逻辑各不相同、难以套用同一模板——这正是标记法的取舍对立面。

### 与标记法的本质区别

| 维度 | null 标记法(第三节) | 指针 + 栈法(本节) |
|------|----------------------|---------------------|
| 区分"展开/处理"的手段 | 压一个 `null` 哨兵当标记 | 显式 `node` 指针 + 沿左链下行 |
| 三种遍历的骨架 | 完全一致,只改 4 行 push 顺序 | 各写各的,逻辑差异大 |
| 后序的额外代价 | 无,改 push 顺序即可 | 需额外 `prev` 指针 |
| 空间常数 | 略大(栈中含哨兵) | 略小 |
| 心智负担 | 记一套模板 + 口诀 | 每种遍历单独理解 |

### 前序 / 中序

前序和中序较直观:沿左链下行时不断入栈,区别只在"输出 val"放在下行阶段(前序)还是回退阶段(中序):

```js
// 前序：下行时输出
function preorderPtr(root) {
  if (root === null) return [];
  const res = [], stack = [];
  let node = root;
  while (stack.length || node !== null) {
    while (node !== null) {
      res.push(node.val);   // 进入即输出
      stack.push(node);
      node = node.left;
    }
    node = stack.pop().right; // 回退后转右
  }
  return res;
}

// 中序：回退时输出
function inorderPtr(root) {
  if (root === null) return [];
  const res = [], stack = [];
  let node = root;
  while (stack.length || node !== null) {
    while (node !== null) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    res.push(node.val);       // 弹出时才输出
    node = node.right;
  }
  return res;
}
```

### 后序:需要 prev 指针

后序最麻烦。一个节点第一次 pop 出来时,右子树可能还没访问,不能直接输出,得先压回去转向右子树。问题是:**从右子树回来再次 pop 到它时,怎么知道右子树已经处理过了?** 用 `prev` 记住"上一个刚输出的节点",若它正好等于当前节点的右孩子,说明右子树刚处理完,这次才能输出:

```js
function postorderPtr(root) {
  if (root === null) return [];
  const res = [], stack = [];
  let node = root, prev = null;
  while (stack.length || node !== null) {
    if (node !== null) stack.push(node);
    while (node !== null && node.left) {
      node = node.left;
      stack.push(node);
    }
    node = stack.pop();
    if (node.right === null || node.right === prev) {
      // 右子树为空，或右子树刚处理完(在上一轮) → 现在才能处理当前节点
      res.push(node.val);
      prev = node;
      node = null;         // 置空，跳过下一轮 if/while，直接再 pop
    } else {
      stack.push(node);    // 右子树还没处理 → 把自己压回去
      node = node.right;   // 先转向右子树
    }
  }
  return res;
}
```

对比之下,标记法做后序无需 `prev`,因为哨兵本身就携带了"第二次见、可以处理"的信号。两种思路各有取舍:**追求模板统一选标记法,追求空间常数选指针法**。

---

## 七、关联主题

- 层序遍历(BFS)使用队列而非栈,见广度优先搜索相关文档
- 二叉搜索树(BST)的中序遍历结果天然有序,常用于验证 BST、查找第 K 小等问题
