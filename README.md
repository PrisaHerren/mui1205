# My Blog

React + TypeScript + Vite + MUI，文章以 Markdown 撰寫，部署到 Cloudflare Workers。

## 新增文章

在 `content/posts/` 新增 `.md`：

```md
---
title: 文章標題
date: "2026-06-10"        # 請加引號
tags: [life, Office]
updated: "2026-07-14"     # 選填，顯示「最後更新於」
cover: trip/cover.jpg     # 選填，檔案放在 content/images/
coverCaption: "2026年6月10日上午7:40\n| 日月潭 | 28°C"   # 選填，封面左下角疊字
coverIcon: weather/clear.svg                              # 選填，疊字右邊的圖示
gallery: [trip/1.jpg, trip/2.jpg]                         # 選填，文章結尾的相簿（也可用 https 網址）
summary: 選填摘要         # 沒填：有 <!--more--> 就取它之前的內容，否則取前 120 字
---

第一段（列表摘要）

<!--more-->

其餘內文……  圖片：![說明](trip/1.jpg)
```

## 常用指令

```bash
npm install
npm run dev
npm run deploy   # build + wrangler deploy
```

## 自訂

- 主色與字型：`src/theme.ts`
- 標籤顏色：`src/lib/tagColors.ts`
