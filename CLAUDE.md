# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本仓库中工作时提供指导。

## 仓库概述

这是一个 **LeetCode 练习仓库** — 个人算法题笔记和解法，使用纯 JavaScript 编写。没有构建系统、包管理器、测试框架或 CI 流程。每个解法都在独立的 `.js` 文件中，可以直接在 Node.js 或浏览器控制台运行。

## 代码组织

```
leetcode/
├── hot100/                  # 热题 100 题集，按主题组织
│   ├── hot100.js            # 哈希表 / 滑动窗口 / 双指针
│   ├── hot100-tree.js       # 二叉树题目
│   ├── hot100-linknode.js   # 链表题目
│   ├── hot100-dp.js         # 动态规划
│   └── hot100-trackingBack.js # 回溯
├── 专题/                     # 专题练习（主要工作区）
│   ├── array/               # 数组与二分查找
│   ├── link-链表/           # 链表题目
│   ├── dynamic-programming/ # 动态规划题目
│   ├── slide-window/        # 滑动窗口模式
│   ├── 拓扑/                # 拓扑排序
│   └── *.js                 # 扁平化主题文件（回溯、动态规划等）
├── source/                  # 学习笔记和解释 (.md)
│   ├── 二叉树遍历.md
│   ├── 理解回溯.md
│   └── ...
├── history-repository/      # 存档/快照版本
├── daily-code/              # 每日编程挑战
├── easy/                    # 简单难度题目
├── interview/               # 面试准备（如富途）
├── 图论/                    # 图论
├── tree.js, link.js, dynamic.js, functional.js # 旧版扁平化文件
└── readme.md                # 个人笔记："keep pratice ~"
```

## 代码风格约定

- **题目描述块**: 每个解法以多行注释开头，包含：
  - LeetCode 题号 + 标题（如 `/** 704. 二分查找 */`）
  - 中文题目描述
  - 输入/输出示例
  - 带约束条件的 `@param` 和 `@return` JSDoc 注释
- **变量命名**: 混合使用英文（`left`, `right`, `prev`, `cur`）和中文注释。旧文件使用 `var`，新文件使用 `const`/`let`。
- **模式标签**: 注释经常引用已知模式，如 `/** 滑动窗口： */`、`/** 动态规划 */`、`/** 回溯算法呢 */`
- **文件头部总结块**: 像 `hot100/hot100.js` 这样的文件以算法策略笔记开头（哈希表、滑动窗口机制、边界情况提示）

## 常见任务

### 运行解法
```bash
node <文件路径>
```
解法通常导出为 `var functionName = function(...) {...}`，没有 I/O 样板代码 — 它们定义函数用于交互式测试或外部调用。

### 添加新解法
1. 按主题定位到合适的目录（如 `专题/link-链表/`）
2. 创建新的 `.js` 文件或追加到现有文件
3. 遵循约定：题目标头注释 → `@param`/`@return` JSDoc → 示例 → 解法函数
4. 使用 `git add .` 然后 `git commit -m "feat: <题号>. <标题>" && git push origin master`（权限已在 settings.local.json 中预批准）

### 更新学习笔记
笔记位于 `source/*.md`。这些包含概念解释、遍历算法和模式比较 — 不是代码提交。

## 重要说明

- 无依赖、无 `package.json`、无 linting — 纯算法实现
- 双语注释（中文题目描述 + 英文变量名）是常态
- 多个目录可能包含重叠的题目集（`专题/` vs `hot100/`）；活跃工作优先使用 `专题/`
- `历史仓库/history-repository/` 包含存档快照；请勿修改
