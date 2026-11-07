---
title: 部署到 Cloudflare Workers
date: "2026-10-03"
summary: 用 wrangler 的 Static Assets 部署 Vite 專案。
tags: [cloudflare, deploy]
---

## 步驟

1. `npx wrangler login`
2. `npm run deploy`

> 設定 `not_found_handling` 為 `single-page-application`，重新整理文章頁才不會 404。
