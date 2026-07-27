# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **LeetCode practice repository** — personal notes and solutions for algorithm problems, written in plain JavaScript. There is no build system, package manager, test framework, or CI pipeline. Every solution lives in a standalone `.js` file that can be run directly in Node.js or a browser console.

## Code Organization

```
leetcode/
├── hot100/                  # Hot 100 problem set, organized by topic
│   ├── hot100.js            # Hash map / sliding window / two pointers
│   ├── hot100-tree.js       # Binary tree problems
│   ├── hot100-linknode.js   # Linked list problems
│   ├── hot100-dp.js         # Dynamic programming
│   └── hot100-trackingBack.js # Backtracking
├── 专题/                     # Topic-based exercises (primary work area)
│   ├── array/               # Array & binary search problems
│   ├── link-链表/           # Linked list problems
│   ├── dynamic-programming/ # Dynamic planning problems
│   ├── slide-window/        # Sliding window patterns
│   ├── 拓扑/                # Topological sort
│   └── *.js                 # Flat-topic files (回溯, 动态规划, etc.)
├── source/                  # Study notes and explanations (.md)
│   ├── 二叉树遍历.md
│   ├── 理解回溯.md
│   └── ...
├── history-repository/      # Archived/snapshot versions
├── daily-code/              # Daily coding challenges
├── easy/                    # Easy-level problems
├── interview/               # Interview prep (e.g., 富途)
├── 图论/                    # Graph theory
├── tree.js, link.js, dynamic.js, functional.js # Legacy flat files
└── readme.md                # Personal note: "keep pratice ~"
```

## Code Style Conventions

- **Problem description block**: Each solution starts with a multi-line comment containing:
  - LeetCode problem number + title (e.g., `/** 704. 二分查找 */`)
  - Problem statement in Chinese
  - Input/Output examples
  - `@param` and `@return` JSDoc annotations with constraints
- **Variable naming**: Mix of English (`left`, `right`, `prev`, `cur`) and Chinese comments. Uses `var` in older files, `const`/`let` in newer ones.
- **Pattern tags**: Comments often reference known patterns like `/** 滑动窗口： */`, `/** 动态规划 */`, `/** 回溯算法呢 */`
- **Top-of-file summary blocks**: Files like `hot100/hot100.js` begin with algorithmic strategy notes (hash maps, sliding window mechanics, edge-case tips)

## Common Tasks

### Run a solution
```bash
node <file-path>
```
Solutions are usually exported as `var functionName = function(...) {...}` with no I/O boilerplate — they define functions meant to be tested interactively or called externally.

### Add a new solution
1. Locate the appropriate directory by topic (e.g., `专题/link-链表/`)
2. Create or append to an existing `.js` file
3. Follow the convention: problem header comment → `@param`/`@return` JSDoc → example → solution function
4. Use `git add .` then `git commit -m "feat: <problem-number>. <title>" && git push origin master` (permissions pre-approved in settings.local.json)

### Update study notes
Notes live in `source/*.md`. These contain conceptual explanations, traversal algorithms, and pattern comparisons — not code submissions.

## Key Notes

- No dependencies, no `package.json`, no linting — pure algorithm implementations
- Bilingual comments (Chinese problem statements + English variable names) are the norm
- Multiple directories may contain overlapping problem sets (`专题/` vs `hot100/`); prefer `专题/` for active work
- The `历史仓库/history-repository/` contains archived snapshots; do not modify
