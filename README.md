# 主工作区文件页签 · Main File Tabs

把右侧边栏里已经打开/预览的文件，一键以**页签**形式打开到主工作区，并与侧边栏的编辑器、预览实时同步。

## 用法

1. 在右侧边栏打开一个文本文件（`.md` / `.txt` / 代码文件等）。
2. 文件工具栏右上角会出现一个“在主工作区打开”的按钮（也可在页签的“…”菜单里找到“主工作区打开”）。
3. 点击后，主工作区切换到文件页签：
   - 页签栏可切换、关闭、中键关闭；
   - 与侧边栏共享同一份文档，任一侧输入都会在约 45ms 内同步到另一侧；
   - 对 Markdown / HTML / JSONL，工具栏提供“编辑 / 预览 / 分屏”，分屏时左侧编辑、右侧预览；
   - 图片、PDF、HTML 在侧边栏原生预览的工具栏里也有“在主工作区打开”，主工作区提供只读预览；
   - 点右上角“对话”返回会话。

## 同步方式

插件不复制侧边栏的编辑器实现，而是复用 `dsh-better-sidebar` 注册的同一个 `TextEditor` 组件和同一份预览渲染器，因此语法高亮、Markdown 预览、Mermaid、图片解析等与侧边栏一致。

主工作区与侧边栏各挂载一个 CodeMirror 视图，插件通过 CodeMirror 的 `view.dispatch` 在两者之间转发文本变化（按前缀/后缀最小差异应用，保留光标映射）。所以：

- 侧边栏输入 → 主工作区在下一帧更新；
- 主工作区输入 → 侧边栏同步更新；
- 分屏时编辑侧与预览侧也共享同一份文本。

## 插件 API（`mainFileTabs`）

插件在 Client 端提供 `mainFileTabs` 服务，其他插件可以通过 `ctx.get('mainFileTabs')` 取用，或在模块里声明 `inject: ['mainFileTabs']`。

```js
// 打开文件（sessionId 省略时尝试取当前右栏会话）
const handle = ctx.get('mainFileTabs').openFile({
  sessionId: 'session-id',
  cwd: '/workspace',
  path: 'docs/design.md',
  line: 12,              // 可选，1-based
  viewerId: 'markdown',  // 可选；默认按扩展名
})
await handle.ready        // 等文件读取/页签就绪

// 监听编辑（返回 disposer）
const off = ctx.get('mainFileTabs').onDidChange(({ sessionId, path, tabId, text, source }) => {
  // source: 'main' | 'sidebar'
  console.log(path, text)
})
// 用完 off()

// 其他
api.onDidOpen(({ sessionId, path, text }) => {})
api.onDidClose(({ sessionId, path }) => {})
api.getOpenFiles(sessionId)
api.getText({ sessionId, cwd, path })
```

`openFile` 参数也可以直接是路径字符串。可选字段：

| 字段 | 说明 |
|---|---|
| `sessionId` | 目标会话；省略时尝试取当前右栏挂载的会话。指定非当前会话时文件页签存入该会话的工作区，但不会自动切换会话 |
| `cwd` | 相对路径的基准目录；省略时从会话列表读取 |
| `path` | 文件路径（绝对或相对 `cwd`） |
| `line` | 打开后定位到的 1-based 行号 |
| `viewerId` | 强制使用某个 viewer id；默认按扩展名 |
| `text` | 直接提供初始文本（不再从磁盘读） |
| `mtimeMs` / `size` | 与 `text` 配套的保存基线与大小 |

服务版本 `1.0.0`，`features` 字段列出可探测的能力名。

## 边界与已知限制

- 侧边栏文件视图由 `dsh-better-sidebar` 提供；没有安装它时插件不启用。
- 主工作区只对 `fsRead` 文本格式提供可编辑页签。二进制格式（图片/PDF/HTML/Office）用主工作区的只读查看器；Office 请在侧边栏预览。
- 保存仍走侧边栏编辑器自己的保存。主工作区保存按钮调用同一个 `TextEditor` 的保存逻辑；**如果先在主工作区保存、再在侧边栏保存同一文件**，侧边栏的 mtime 基线会过期并提示保存冲突。遇到冲突时在侧边栏点“重新加载”即可。
- 实时同步依赖 CodeMirror 视图对象；如果侧边栏插件改版、TextEditor 内部结构变化，插件会退化为“只在主工作区打开”，不会影响侧边栏原有功能。
- 侧边栏里已经打开的旧页签，如果是在插件加载前创建的，可能不会出现工具栏按钮；用页签菜单里的“主工作区打开”即可。
- 未保存内容只保存在浏览器内存中；刷新页面会丢失主工作区里未保存的草稿（侧边栏自己的草稿保护仍生效）。

## 安装

本目录是本地 bundle：

```sh
dsh plugin --profile desktop add <this-directory>
```

安装后需要重启 DSH 并刷新页面。若在开发环境，修改 `client.js` 后刷新页面即可（宿主半端为空，无需重启 Host 逻辑）。

## 实现结构

- `index.js`：Host 半端，空实现。
- `client.js`：全部 UI：主工作区页签、侧边栏桥接 viewer、工具栏按钮、页签菜单、CodeMirror 双视图同步、文件读取/图片/PDF/HTML 预览。
- `cordis.patch.yml`：插入 `main-file-tabs` 插件行。
- `locale/*.json`：插件元数据与语言。
