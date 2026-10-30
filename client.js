window.__ModuleLoader__.load({
  id: 'dsh-main-file-tabs',
  factory(require) {
    const React = require('react')

    const h = React.createElement
    const NS = 'dshMainFileTabs'
    const MAIN_KEY = 'dsh-main-file-tabs'
    const VIEWER_ID = 'dsh-main-file-tabs:bridge'

    const ZH = {
      openInMain: '在主工作区打开',
      openInMainShort: '主工作区打开',
      backToChat: '对话',
      save: '保存',
      saved: '已保存',
      reload: '从磁盘重新加载',
      close: '关闭',
      split: '分屏',
      single: '单栏',
      edit: '编辑',
      preview: '预览',
      emptyTitle: '主工作区还没有打开文件',
      emptyBody: '在右侧边栏打开一个文件，然后点它的工具栏里的「在主工作区打开」。',
      loading: '正在读取文件…',
      readFailed: '无法读取这个文件',
      tooLarge: '文件太大，无法在主工作区里编辑。',
      binary: '这个文件在主工作区里没有可用的编辑器。',
      download: '打开/下载',
      discard: '这个页签有未保存的修改，仍要关闭吗？',
      reloadDiscard: '重新加载会丢弃这个页签里未保存的修改，继续吗？',
      tabList: '已打开的文件',
      viewLabel: '文件',
      syncUnavailable: '这个文件无法与侧边栏实时同步；修改只保留在主工作区页签里。',
    }
    const EN = {
      openInMain: 'Open in main workspace',
      openInMainShort: 'Open in main',
      backToChat: 'Chat',
      save: 'Save',
      saved: 'Saved',
      reload: 'Reload from disk',
      close: 'Close',
      split: 'Split',
      single: 'Single pane',
      edit: 'Edit',
      preview: 'Preview',
      emptyTitle: 'No file open here yet',
      emptyBody: 'Open a file in the right Sidebar, then click “Open in main workspace” in its toolbar.',
      loading: 'Reading file…',
      readFailed: 'Could not read this file',
      tooLarge: 'This file is too large to edit in the main workspace.',
      binary: 'This file has no editor in the main workspace.',
      download: 'Open/download',
      discard: 'This tab has unsaved changes. Close it anyway?',
      reloadDiscard: 'Reloading drops unsaved changes in this tab. Continue?',
      tabList: 'Open files',
      viewLabel: 'Files',
      syncUnavailable: 'Live sync with the Sidebar is unavailable for this file; edits stay inside the main tab.',
    }

    const TEXT_EXTS = [
      'md', 'markdown', 'txt', 'text', 'log', 'json', 'jsonl', 'ndjson',
      'js', 'mjs', 'cjs', 'jsx', 'ts', 'mts', 'cts', 'tsx', 'py', 'pyi',
      'rb', 'php', 'java', 'kt', 'kts', 'scala', 'go', 'rs', 'c', 'h',
      'cc', 'cpp', 'cxx', 'hpp', 'cs', 'swift', 'm', 'mm', 'lua', 'r',
      'sql', 'sh', 'bash', 'zsh', 'fish', 'ps1', 'psm1', 'bat', 'cmd',
      'yaml', 'yml', 'toml', 'ini', 'cfg', 'conf', 'properties', 'env',
      'css', 'scss', 'sass', 'less', 'styl', 'vue', 'svelte', 'astro',
      'xml', 'xsl', 'xslt', 'html', 'htm', 'tex', 'bib', 'rst', 'adoc',
      'asciidoc', 'graphql', 'gql', 'proto', 'thrift', 'gradle', 'cmake',
      'mk', 'makefile', 'dockerfile', 'gitignore', 'gitattributes', 'editorconfig',
    ]

    const CSS = `
.dsh-mft-root{height:100%;min-height:0;display:flex;flex-direction:column;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:13px;line-height:1.45}
.dsh-mft-tabs{display:flex;align-items:stretch;height:38px;min-height:38px;box-sizing:border-box;position:sticky;top:0;z-index:20;flex:0 0 auto;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-specific-sidebar-fill);overflow-x:auto;overflow-y:hidden;scrollbar-width:thin}
.dsh-mft-tab{display:flex;align-items:center;gap:6px;min-width:0;max-width:240px;padding:0 8px 0 10px;border-right:1px solid var(--dsw-alias-border-l1);cursor:default;color:var(--dsw-alias-label-secondary);white-space:nowrap;position:relative}
.dsh-mft-tab:hover{background:var(--dsw-alias-bg-layer-2)}
.dsh-mft-tab[data-active="true"]{background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}
.dsh-mft-tab[data-active="true"]:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--dsw-alias-brand-primary)}
.dsh-mft-tabicon{display:inline-flex;flex:none;align-items:center;justify-content:center;width:16px;height:16px;color:var(--dsw-alias-label-secondary)}
.dsh-mft-tabname{min-width:0;overflow:hidden;text-overflow:ellipsis}
.dsh-mft-dot{flex:none;width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-brand-primary);margin-left:1px}
.dsh-mft-close{flex:none;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border:0;border-radius:5px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;padding:0;margin-left:2px}
.dsh-mft-close:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.dsh-mft-tabspacer{flex:1 1 auto;min-width:8px}
.dsh-mft-chatbtn{flex:none;display:inline-flex;align-items:center;gap:5px;align-self:center;margin:0 8px;padding:4px 9px;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;cursor:pointer}
.dsh-mft-chatbtn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.dsh-mft-body{flex:1 1 auto;min-height:0;position:relative;display:flex;flex-direction:column}
.dsh-mft-empty{flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:32px;text-align:center;color:var(--dsw-alias-label-secondary)}
.dsh-mft-empty h2{margin:8px 0 0;font-size:16px;font-weight:600;color:var(--dsw-alias-label-primary)}
.dsh-mft-empty p{margin:0;max-width:480px;font-size:13px}
.dsh-mft-toolbar{display:flex;align-items:center;gap:6px;min-height:34px;box-sizing:border-box;position:sticky;top:38px;z-index:19;flex:0 0 auto;padding:3px 8px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary);font-size:12px}
.dsh-mft-path{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:auto;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.dsh-mft-tool{display:inline-flex;align-items:center;gap:4px;height:24px;padding:0 7px;border:1px solid transparent;border-radius:5px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;cursor:pointer;white-space:nowrap}
.dsh-mft-tool:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.dsh-mft-tool[data-active="true"]{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l1)}
.dsh-mft-tool:disabled{opacity:.45;cursor:default}
.dsh-mft-primary{border-color:var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
.dsh-mft-panes{flex:1 1 auto;min-height:0;display:flex;overflow:hidden}
.dsh-mft-pane{flex:1 1 0;min-width:0;min-height:0;display:flex;flex-direction:column;position:relative;overflow:hidden}
.dsh-mft-pane + .dsh-mft-pane{border-left:1px solid var(--dsw-alias-border-l1)}
.dsh-mft-pane > div{min-height:0}
.dsh-mft-pane-loading,.dsh-mft-pane-error{flex:1 1 auto;display:flex;align-items:center;justify-content:center;padding:24px;color:var(--dsw-alias-label-secondary);font-size:13px;text-align:center}
.dsh-mft-media{flex:1 1 auto;min-height:0;display:flex;align-items:center;justify-content:center;overflow:auto;background:var(--dsw-alias-bg-layer-1);padding:12px}
.dsh-mft-media img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px}
.dsh-mft-media iframe{width:100%;height:100%;border:0;background:var(--dsw-alias-bg-base)}
.dsh-mft-sidewrap{height:100%;min-height:0;display:flex;flex-direction:column;position:relative}
.dsh-mft-sideoverlay{position:absolute;top:4px;right:6px;z-index:6;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.dsh-mft-sideoverlay:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-overlay)}
.dsh-mft-nativebtn{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.dsh-mft-nativebtn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.dsh-mft-menuitem{display:flex;align-items:center;gap:8px;width:100%;padding:6px 10px;border:0;border-radius:5px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;text-align:left;cursor:pointer}
.dsh-mft-menuitem:hover{background:var(--dsw-alias-bg-layer-2)}
.dsh-mft-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.dsh-mft-reload{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:1px solid transparent;border-radius:5px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.dsh-mft-reload:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
`

    const hIcon = (paths, size = 16) => h('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.7,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
    }, ...paths.map((d, i) => h('path', { key: i, d })))

    const ICONS = {
      open: ['M14 4h6v6', 'M20 4 10 14', 'M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4'],
      close: ['M6 6l12 12', 'M18 6 6 18'],
      save: ['M5 4h11l3 3v13H5z', 'M8 4v6h8V4', 'M8 20v-6h8v6'],
      reload: ['M20 11a8 8 0 1 1-2.3-5.7', 'M20 4v7h-7'],
      split: ['M4 5h16v14H4z', 'M12 5v14'],
      single: ['M4 5h16v14H4z'],
      chat: ['M21 12a8 8 0 0 1-8 8H6l-3 3v-6a8 8 0 0 1 8-8h2a8 8 0 0 1 8 3z'],
      edit: ['M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z', 'M13.5 6.5 17.5 10.5'],
      preview: ['M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
      doc: ['M6 3h8l4 4v14H6z', 'M14 3v5h5'],
      back: ['M15 18l-6-6 6-6'],
    }

    function basename(path) {
      if (!path) return ''
      const clean = String(path).replace(/[\\/]+$/, '')
      const parts = clean.split(/[\\/]+/)
      return parts[parts.length - 1] || clean
    }

    function extOf(path) {
      const name = basename(path)
      const m = /\.([A-Za-z0-9]+)$/.exec(name)
      return m ? m[1].toLowerCase() : ''
    }

    function normalizePath(path) {
      return String(path || '').replace(/\\/g, '/').replace(/\/+/g, '/')
    }

    function resolvePath(cwd, path) {
      const p = String(path || '')
      if (!p) return ''
      if (/^[A-Za-z]:[\\/]/.test(p) || p.startsWith('/') || p.startsWith('\\\\')) return normalizePath(p)
      if (!cwd) return normalizePath(p)
      return normalizePath(cwd).replace(/\/$/, '') + '/' + normalizePath(p).replace(/^\/+/, '')
    }

    function keyOf(sessionId, absPath) {
      return String(sessionId) + '::' + normalizePath(absPath)
    }

    function parseFileRecord(tab) {
      let raw = tab && typeof tab.path === 'string' ? tab.path : ''
      if (!raw && tab && typeof tab.contentId === 'string') raw = tab.contentId
      if (!raw) return ''
      if (raw.startsWith('dsh-resource://file/')) {
        try {
          return decodeURIComponent(raw.slice('dsh-resource://file/'.length))
        } catch {
          return raw.slice('dsh-resource://file/'.length)
        }
      }
      if (/^https?:\/\//i.test(raw)) return ''
      return raw
    }

    function viewerIdForPath(path) {
      const ext = extOf(path)
      if (ext === 'md' || ext === 'markdown') return 'markdown'
      if (ext === 'html' || ext === 'htm') return 'html'
      if (ext === 'jsonl' || ext === 'ndjson') return 'jsonl'
      return 'code'
    }

    function isPreviewable(viewerId) {
      return viewerId === 'markdown' || viewerId === 'html' || viewerId === 'jsonl'
    }

    function isTransaction(value) {
      return !!value && typeof value === 'object' && value.startState && value.state && value.changes && typeof value.docChanged === 'boolean'
    }

    function isEditorView(value) {
      return !!value && typeof value === 'object'
        && typeof value.dispatch === 'function'
        && value.state && value.state.doc && typeof value.state.doc.toString === 'function'
        && value.dom && typeof value.dom.querySelector === 'function'
    }

    function findEditorViewInfo(root) {
      if (!root || typeof root.querySelector !== 'function') return null
      let node = root.querySelector('.cm-editor')
      while (node) {
        const key = Object.keys(node).find((k) => k.startsWith('__reactFiber$'))
        if (key) {
          let fiber = node[key]
          for (let depth = 0; fiber && depth < 40; depth += 1, fiber = fiber.return) {
            let hook = fiber.memoizedState
            let view = null
            const setters = []
            for (let i = 0; hook && i < 200; i += 1, hook = hook.next) {
              const value = hook.memoizedState
              if (value && typeof value === 'object' && value.current && isEditorView(value.current)) view = value.current
              if (hook.queue && typeof hook.queue.dispatch === 'function') {
                setters.push({ dispatch: hook.queue.dispatch, value })
              }
            }
            if (view) {
              const mode = setters[0] ? setters[0].value : undefined
              const setDraft = (mode === 'preview' || mode === 'edit') && setters[1] ? setters[1].dispatch : null
              return {
                view,
                mode,
                setDraft,
              }
            }
          }
        }
        node = node.parentElement
      }
      return null
    }

    function findEditorView(root) {
      const info = findEditorViewInfo(root)
      return info ? info.view : null
    }

    function findToolbar(root) {
      if (!root || typeof root.querySelector !== 'function') return null
      const button = root.querySelector('button[title*="Ctrl/Cmd+S"], button[title*="Ctrl+S"]')
      return button && button.parentElement ? button.parentElement : null
    }

    function hostRouteHref(service, path) {
      const resolved = service.hostRouteUrl(path)
      if (typeof resolved === 'string') return resolved
      if (resolved && typeof resolved.href === 'string') return resolved.href
      return String(resolved)
    }

    function fileRoute(ctx, method, payload, signal) {
      const service = (pluginCtx && pluginCtx.get('betterSidebar')) || ctx.get('betterSidebar')
      if (!service || typeof service.hostRouteUrl !== 'function') return Promise.reject(new Error('betterSidebar host routes unavailable'))
      const url = hostRouteHref(service, 'sidebar/api/' + method)
      return fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
        signal,
      }).then((response) => response.json().catch(() => null).then((body) => {
        if (!response.ok || !body || body.ok !== true) {
          throw new Error(body && body.error && body.error.message ? body.error.message : ('HTTP ' + response.status))
        }
        return body.value
      }))
    }

    function readFile(ctx, tab) {
      return fileRoute(ctx, 'fs.read', {
        sessionId: tab.sessionId,
        ...(tab.cwd ? { cwd: tab.cwd } : {}),
        path: tab.absPath,
      })
    }

    function fileUrl(ctx, tab, download) {
      const service = (pluginCtx && pluginCtx.get('betterSidebar')) || ctx.get('betterSidebar')
      if (!service || typeof service.hostRouteUrl !== 'function') return ''
      const params = new URLSearchParams({ sessionId: tab.sessionId, path: tab.absPath })
      if (tab.cwd) params.set('cwd', tab.cwd)
      if (download) params.set('download', '1')
      return hostRouteHref(service, 'sidebar/file?' + params.toString())
    }

    function htmlUrl(ctx, tab) {
      const service = (pluginCtx && pluginCtx.get('betterSidebar')) || ctx.get('betterSidebar')
      if (!service || typeof service.hostRouteUrl !== 'function') return ''
      const unc = /^[\\/]{2}[^\\/]/.test(tab.absPath)
      const segments = tab.absPath.split(/[\\/]+/).filter(Boolean)
      const route = '/sidebar/html/' + encodeURIComponent(tab.sessionId) + '/' + (unc ? '/' : '') + segments.map(encodeURIComponent).join('/')
      return hostRouteHref(service, route)
    }

    // ---------------------------------------------------------------------
    // Locale
    // ---------------------------------------------------------------------

    const bound = new WeakMap()
    function localeDicts(ctx) {
      if (bound.has(ctx)) return bound.get(ctx)
      try { ctx.locale.register(NS, 'zh', ZH) } catch (error) { console.error('[dsh-main-file-tabs] zh locale registration failed', error) }
      try { ctx.locale.register(NS, 'en', EN) } catch (error) { console.error('[dsh-main-file-tabs] en locale registration failed', error) }
      const fallback = (key) => {
        try {
          if (ctx.locale && typeof ctx.locale.bind === 'function') {
            const value = ctx.locale.bind(NS)(key)
            if (value !== undefined && value !== null && value !== key) return value
          }
        } catch {}
        return ZH[key] || EN[key] || key
      }
      bound.set(ctx, fallback)
      return fallback
    }

    function useT(ctx) {
      const [, force] = React.useReducer((value) => value + 1, 0)
      React.useEffect(() => {
        if (!ctx.locale || typeof ctx.locale.subscribe !== 'function') return undefined
        return ctx.locale.subscribe(() => force())
      }, [ctx])
      return React.useCallback((key) => localeDicts(ctx)(key), [ctx])
    }

    // ---------------------------------------------------------------------
    // Workspace/tab store
    // ---------------------------------------------------------------------

    const store = {
      version: 0,
      listeners: new Set(),
      workspaces: new Map(),
      currentSessionId: undefined,
    }

    const changeListeners = new Set()
    const openListeners = new Set()
    const closeListeners = new Set()

    function addListener(set, listener) {
      if (typeof listener !== 'function') throw new TypeError('mainFileTabs listener must be a function')
      set.add(listener)
      return () => set.delete(listener)
    }

    function emit(set, payload) {
      for (const listener of [...set]) {
        try {
          listener(payload)
        } catch (error) {
          console.error('[dsh-main-file-tabs] API listener failed', error)
        }
      }
    }

    function emitChange(tab, text, source) {
      if (!tab) return
      emit(changeListeners, {
        sessionId: tab.sessionId,
        path: tab.absPath,
        tabId: tab.id,
        title: tab.title,
        text,
        source: source || 'main',
      })
    }

    function emitOpen(tab) {
      if (!tab) return
      emit(openListeners, {
        sessionId: tab.sessionId,
        path: tab.absPath,
        tabId: tab.id,
        title: tab.title,
        viewerId: tab.viewerId,
        kind: tab.kind,
        text: tab.kind === 'text' ? tab.text : undefined,
      })
    }

    function emitClose(tab) {
      if (!tab) return
      emit(closeListeners, {
        sessionId: tab.sessionId,
        path: tab.absPath,
        tabId: tab.id,
        title: tab.title,
      })
    }

    function subscribeStore(listener) {
      store.listeners.add(listener)
      return () => store.listeners.delete(listener)
    }

    function getStoreVersion() {
      return store.version
    }

    let notifyQueued = false
    function notifyNow() {
      store.version += 1
      for (const listener of [...store.listeners]) {
        try { listener() } catch (error) { console.error('[dsh-main-file-tabs] store listener failed', error) }
      }
    }

    function notify() {
      if (notifyQueued) return
      notifyQueued = true
      queueMicrotask(() => {
        notifyQueued = false
        notifyNow()
      })
    }

    function workspaceOf(sessionId) {
      let workspace = store.workspaces.get(sessionId)
      if (!workspace) {
        workspace = { sessionId, cwd: undefined, tabs: [], activeId: null }
        store.workspaces.set(sessionId, workspace)
      }
      return workspace
    }

    function activeTabOf(sessionId) {
      if (!sessionId) return undefined
      const workspace = workspaceOf(sessionId)
      return workspace.tabs.find((tab) => tab.id === workspace.activeId)
    }

    function tabDirty(tab) {
      return !!tab && typeof tab.text === 'string' && tab.text !== tab.savedText
    }

    function prepareTabReady(tab) {
      if (!tab.ready) {
        tab.ready = new Promise((resolve) => {
          tab.resolveReady = resolve
        })
      }
      return tab.ready
    }

    function resolveTabReady(tab) {
      if (!tab || typeof tab.resolveReady !== 'function') return
      const resolve = tab.resolveReady
      tab.resolveReady = null
      try {
        resolve(tab)
      } catch {}
    }

    function updateTabText(tab, text) {
      if (!tab || tab.text === text) return
      tab.text = text
      notify()
    }

    function markTabSaved(tab, text) {
      if (!tab) return
      if (typeof text === 'string') {
        tab.text = text
        tab.savedText = text
      } else {
        tab.savedText = tab.text
      }
      notify()
    }

    function tabTitle(path) {
      return basename(path) || path
    }

    let lastOpenError = ''
    let previousViewLabel = ''

    function conversationTabButtons() {
      if (typeof document === 'undefined' || typeof document.querySelectorAll !== 'function') return []
      return [...document.querySelectorAll('[data-conversation-tabs] button')]
    }

    function activateMainView() {
      const label = localeDicts(pluginCtx)('viewLabel')
      const labels = new Set([label, '文件', 'Files', MAIN_KEY])
      const tabs = conversationTabButtons()
      const active = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true')
      if (active && !labels.has((active.textContent || '').trim())) previousViewLabel = (active.textContent || '').trim()
      const target = tabs.find((tab) => labels.has((tab.textContent || '').trim()))
      if (!target) return false
      target.click()
      return true
    }

    function showConversationView() {
      const tabs = conversationTabButtons()
      const target = tabs.find((tab) => (tab.textContent || '').trim() === previousViewLabel) || tabs[0]
      if (target) {
        target.click()
        return true
      }
      try {
        const layout = pluginCtx && (pluginCtx.layout || pluginCtx.get('layout'))
        if (layout && typeof layout.selectPanel === 'function') {
          layout.selectPanel('conversation')
          return true
        }
      } catch (error) {
        console.error('[dsh-main-file-tabs] could not return to the conversation', error)
      }
      return false
    }

    function activateMainViewWithRetry() {
      if (activateMainView()) return
      let attempts = 0
      const retry = () => {
        if (activateMainView()) return
        attempts += 1
        if (attempts < 120) {
          requestAnimationFrame(retry)
          return
        }
        console.warn('[dsh-main-file-tabs] conversation view tab was not found; open the “Files” tab in the session header to show the workspace')
      }
      requestAnimationFrame(retry)
    }

    function openInMain(ctx, info) {
      const sessionId = info && info.sessionId
      if (!sessionId) {
        lastOpenError = 'no session id'
        console.error('[dsh-main-file-tabs] open requested without a session id', info)
        return false
      }
      const absPath = resolvePath(info.cwd, info.path)
      if (!absPath) {
        lastOpenError = 'no path'
        console.error('[dsh-main-file-tabs] open requested without a path', info)
        return false
      }
      const key = keyOf(sessionId, absPath)
      const workspace = workspaceOf(sessionId)
      workspace.cwd = workspace.cwd || info.cwd
      store.currentSessionId = sessionId
      let tab = workspace.tabs.find((item) => item.key === key)
      if (!tab) {
        const existingLink = links.get(key)
        let hasSeed = typeof info.text === 'string'
        let seed = typeof info.text === 'string' ? info.text : ''
        if (!hasSeed) {
          const views = sidebarViews.get(key)
          const live = views && [...views].find((entry) => entry.view && !entry.view.destroyed)
          if (live) {
            seed = live.view.state.doc.toString()
            hasSeed = true
          }
        }
        if (!hasSeed && existingLink) {
          seed = existingLink.text
          hasSeed = true
        }
        tab = {
          id: 'mft-' + Math.random().toString(36).slice(2),
          key,
          path: info.path,
          absPath,
          title: tabTitle(absPath),
          sessionId,
          cwd: info.cwd,
          viewerId: info.viewerId || viewerIdForPath(absPath),
          kind: hasSeed ? 'text' : 'loading',
          text: seed,
          savedText: hasSeed ? seed : '',
          mtimeMs: info.mtimeMs,
          size: info.size,
          line: info.line,
          revision: 0,
          error: undefined,
        }
        prepareTabReady(tab)
        workspace.tabs.push(tab)
        if (hasSeed) {
          ensureLink(key, seed, tab)
          resolveTabReady(tab)
          emitOpenSoon(tab)
        } else {
          void loadTab(ctx, tab)
        }
      } else {
        tab.viewerId = info.viewerId || tab.viewerId || viewerIdForPath(absPath)
        if (info.cwd && !tab.cwd) tab.cwd = info.cwd
        if (info.line !== undefined) tab.line = info.line
      }
      workspace.activeId = tab.id
      notify()
      if (info.focus !== false) activateMainViewWithRetry()
      return tab
    }

    async function loadTab(ctx, tab) {
      try {
        const result = await readFile(ctx, tab)
        if (!result) throw new Error('empty read')
        tab.mtimeMs = result.mtimeMs
        tab.size = result.size
        if (result.kind === 'text') {
          tab.kind = 'text'
          tab.text = result.content
          tab.savedText = result.content
          tab.viewerId = tab.viewerId || viewerIdForPath(tab.absPath)
          ensureLink(tab.key, tab.text, tab)
        } else if (result.kind === 'too-large') {
          tab.kind = 'too-large'
        } else {
          tab.kind = 'binary'
        }
        tab.error = undefined
      } catch (error) {
        tab.kind = 'error'
        tab.error = error && error.message ? error.message : String(error)
      }
      resolveTabReady(tab)
      emitOpenSoon(tab)
      notify()
    }

    async function reloadTab(ctx, tab) {
      if (tabDirty(tab)) {
        const message = localeDicts(ctx)('reloadDiscard')
        if (typeof window.confirm === 'function' && !window.confirm(message)) return
      }
      destroyLink(tab.key)
      tab.kind = 'loading'
      tab.revision += 1
      notify()
      await loadTab(ctx, tab)
    }

    function activateTab(sessionId, tabId) {
      const workspace = workspaceOf(sessionId)
      if (!workspace.tabs.some((tab) => tab.id === tabId)) return
      workspace.activeId = tabId
      notify()
    }

    function closeTab(ctx, sessionId, tabId) {
      const workspace = workspaceOf(sessionId)
      const index = workspace.tabs.findIndex((tab) => tab.id === tabId)
      if (index < 0) return
      const tab = workspace.tabs[index]
      if (tabDirty(tab)) {
        const message = localeDicts(ctx)('discard')
        if (typeof window.confirm === 'function' && !window.confirm(message)) return
      }
      destroyLink(tab.key)
      emitClose(tab)
      workspace.tabs.splice(index, 1)
      if (workspace.activeId === tabId) {
        const next = workspace.tabs[index] || workspace.tabs[index - 1]
        workspace.activeId = next ? next.id : null
      }
      notify()
    }

    // ---------------------------------------------------------------------
    // Live document bus + CodeMirror bridge
    // ---------------------------------------------------------------------

    const links = new Map()
    const sidebarViews = new Map()

    function entriesFor(key) {
      let set = sidebarViews.get(key)
      if (!set) {
        set = new Set()
        sidebarViews.set(key, set)
      }
      return set
    }

    function ensureLink(key, seedText, tab) {
      let link = links.get(key)
      if (!link) {
        link = {
          key,
          text: typeof seedText === 'string' ? seedText : '',
          entries: new Set(),
          timer: null,
          tab,
        }
        links.set(key, link)
        queueMicrotask(() => {
          const current = links.get(key)
          if (current !== link) return
          for (const entry of entriesFor(key)) attachEntry(link, entry)
        })
      } else if (tab) {
        link.tab = tab
        if (typeof seedText === 'string' && link.text === '' && seedText !== '') link.text = seedText
      }
      return link
    }

    function destroyLink(key) {
      const link = links.get(key)
      if (!link) return
      for (const entry of [...link.entries]) detachEntry(link, entry)
      if (link.timer) clearTimeout(link.timer)
      links.delete(key)
    }

    function scheduleBroadcast(link, entry) {
      entry.lastChangedAt = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now()
      if (link.timer) return
      link.timer = setTimeout(() => {
        link.timer = null
        let source = null
        for (const candidate of [...link.entries]) {
          if (!candidate.view || candidate.view.destroyed) continue
          const text = candidate.view.state.doc.toString()
          if (text === link.text) continue
          if (source === null || (candidate.lastChangedAt || 0) > (source.entry.lastChangedAt || 0)) {
            source = { entry: candidate, text }
          }
        }
        if (source === null) return
        link.text = source.text
        for (const other of [...link.entries]) {
          if (other === source.entry || other.applying) continue
          applyRemoteText(link, other, source.text)
        }
        if (link.tab) updateTabText(link.tab, source.text)
        if (link.tab) emitChange(link.tab, source.text, source.entry.main ? 'main' : 'sidebar')
      }, 45)
    }

    function syncPreviewDraft(entry, text) {
      if (!entry || typeof entry.draftDispatch !== 'function') return
      try {
        entry.draftDispatch(text)
      } catch (error) {
        console.error('[dsh-main-file-tabs] preview draft sync failed', error)
      }
    }

    function applyRemoteText(link, entry, text) {
      const view = entry.view
      if (!view || view.destroyed) return
      const current = view.state.doc.toString()
      if (current === text) {
        syncPreviewDraft(entry, text)
        return
      }
      let prefix = 0
      const min = Math.min(current.length, text.length)
      while (prefix < min && current.charCodeAt(prefix) === text.charCodeAt(prefix)) prefix += 1
      let suffix = 0
      const maxSuffix = min - prefix
      while (suffix < maxSuffix && current.charCodeAt(current.length - 1 - suffix) === text.charCodeAt(text.length - 1 - suffix)) suffix += 1
      const change = {
        from: prefix,
        to: Math.max(prefix, current.length - suffix),
        insert: text.slice(prefix, text.length - suffix),
      }
      entry.applying = true
      try {
        view.dispatch({ changes: change })
      } catch (error) {
        console.error('[dsh-main-file-tabs] remote apply failed', error)
      } finally {
        entry.applying = false
        syncPreviewDraft(entry, text)
      }
    }

    function attachEntry(link, entry) {
      if (!entry || !entry.view || entry.wrapper) return
      const view = entry.view
      const original = view.dispatch
      const wrapper = function (...input) {
        let state = view.state
        const transactions = []
        for (const spec of input) {
          if (isTransaction(spec)) {
            transactions.push(spec)
            state = spec.state
          } else {
            const transaction = state.update(spec)
            transactions.push(transaction)
            state = transaction.state
          }
        }
        const changed = transactions.some((transaction) => transaction.docChanged)
        const result = original.apply(view, transactions)
        if (changed && !entry.applying) scheduleBroadcast(link, entry)
        return result
      }
      entry.original = original
      entry.wrapper = wrapper
      entry.link = link
      view.dispatch = wrapper
      link.entries.add(entry)
      const current = view.state.doc.toString()
      if (current !== link.text) {
        if (entry.main) {
          if (link.text !== '') applyRemoteText(link, entry, link.text)
        } else {
          const tab = link.tab
          const mainDirty = !!tab && typeof tab.text === 'string' && tab.text !== tab.savedText
          if (mainDirty) {
            applyRemoteText(link, entry, link.text)
          } else {
            link.text = current
            for (const other of [...link.entries]) {
              if (other === entry || other.applying) continue
              applyRemoteText(link, other, current)
            }
            if (tab) updateTabText(tab, current)
          }
        }
      }
    }

    function detachEntry(link, entry) {
      if (!entry || !entry.view) return
      if (entry.wrapper && entry.view.dispatch === entry.wrapper) {
        entry.view.dispatch = entry.original
      }
      entry.wrapper = null
      entry.original = null
      entry.link = null
      link.entries.delete(entry)
    }

    function registerSidebarView(entry) {
      entriesFor(entry.key).add(entry)
      const link = links.get(entry.key)
      if (link) attachEntry(link, entry)
    }

    function unregisterSidebarView(entry) {
      const set = sidebarViews.get(entry.key)
      if (set) {
        set.delete(entry)
        if (set.size === 0) sidebarViews.delete(entry.key)
      }
      const link = links.get(entry.key)
      if (link) detachEntry(link, entry)
    }

    function registerMainView(link, view, entry) {
      const item = entry || {}
      item.view = view
      item.main = true
      attachEntry(link, item)
      return () => detachEntry(link, item)
    }

    function seedTextOf(tab) {
      const link = links.get(tab.key)
      if (link && typeof link.text === 'string' && link.text !== '') return link.text
      return tab.text
    }

    function linkTextNow(link) {
      if (!link) return ''
      let text = link.text
      for (const entry of link.entries) {
        if (!entry.main || !entry.view || entry.view.destroyed) continue
        try { text = entry.view.state.doc.toString() } catch {}
        break
      }
      return text
    }

    // ---------------------------------------------------------------------
    // Buttons
    // ---------------------------------------------------------------------

    function OpenInMainButton(props) {
      const ctx = pluginCtx || props.ctx
      const t = useT(ctx)
      const label = t('openInMain')
      const onClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const info = props.getInfo ? props.getInfo() : props.info
        console.info('[dsh-main-file-tabs] open in main requested', info)
        if (!info || !info.path) {
          console.error('[dsh-main-file-tabs] open button has no file info', info)
          return
        }
        const result = openInMain(ctx, info)
        if (result === false && typeof window !== 'undefined' && typeof window.alert === 'function') {
          window.alert('[dsh-main-file-tabs] 无法打开主工作区：' + (lastOpenError || '未知错误'))
        }
      }
      return h('button', {
        type: 'button',
        className: props.variant === 'native' ? 'dsh-mft-nativebtn' : 'dsh-mft-sideoverlay',
        title: label,
        'aria-label': label,
        onMouseDown: (event) => event.preventDefault(),
        onClick,
      }, hIcon(ICONS.open, props.variant === 'native' ? 15 : 14))
    }

    function openInfoFromView(ctx, props, root, view) {
      const text = view && !view.destroyed && view.state && view.state.doc ? view.state.doc.toString() : props.content
      return {
        sessionId: props.scope && props.scope.sessionId,
        cwd: props.scope && props.scope.cwd,
        path: props.path,
        text: typeof text === 'string' ? text : undefined,
        mtimeMs: props.mtimeMs,
        size: props.size,
        viewerId: props.originalViewerId || props.viewerId,
      }
    }

    function BridgeViewer(props) {
      const ctx = props.ctx
      const rootRef = React.useRef(null)
      const viewRef = React.useRef(null)
      const path = props.path || ''
      const ext = extOf(path).toLowerCase()
      const original = originalByExt.get(ext) || editorDescriptor
      const originalId = original ? original.id : 'code'
      const key = keyOf(props.scope && props.scope.sessionId, resolvePath(props.scope && props.scope.cwd, path))
      const childProps = { ...props, viewerId: originalId }

      React.useEffect(() => {
        const root = rootRef.current
        if (!root) return undefined
        let cancelled = false
        let attempts = 0
        let entry = null
        const register = (info) => {
          if (cancelled || !info || !info.view) return
          viewRef.current = info.view
          entry = {
            key,
            view: info.view,
            path,
            textMode: info.mode,
            draftDispatch: info.setDraft,
            info: openInfoFromView(ctx, { ...props, originalViewerId: originalId }, root, info.view),
          }
          registerSidebarView(entry)
        }
        const find = () => {
          if (cancelled) return
          const info = findEditorViewInfo(root)
          if (info) {
            register(info)
            return
          }
          attempts += 1
          if (attempts < 120) requestAnimationFrame(find)
        }
        const frame = requestAnimationFrame(find)
        return () => {
          cancelled = true
          cancelAnimationFrame(frame)
          if (entry) unregisterSidebarView(entry)
          viewRef.current = null
        }
      }, [key, path, originalId, props.content, props.mtimeMs])

      React.useEffect(() => {
        const root = rootRef.current
        if (!root) return undefined
        const bar = findToolbar(root)
        if (!bar) return undefined
        const previous = bar.style.paddingRight
        bar.style.paddingRight = '36px'
        return () => {
          bar.style.paddingRight = previous
        }
      }, [path, key, originalId, props.content])

      const info = () => openInfoFromView(ctx, { ...props, originalViewerId: originalId }, rootRef.current, viewRef.current)
      return h('div', { className: 'dsh-mft-sidewrap', ref: rootRef },
        original
          ? h(original.component, childProps)
          : h('div', { className: 'dsh-mft-pane-error' }, 'No editor viewer is available for this file.'),
        h(OpenInMainButton, {
          ctx,
          variant: 'sidebar',
          getInfo: info,
        }),
      )
    }

    function NativeActionsButton(props) {
      const ctx = props.ctx
      const t = useT(ctx)
      const sessionId = props.sessionId
      const useSessions = props.useSessions
      const cwd = useSessions((state) => sessionId && state.byId && state.byId[sessionId] ? state.byId[sessionId].cwd : undefined)
      const path = props.absolutePath
      if (!path) return null
      return h(OpenInMainButton, {
        ctx,
        variant: 'native',
        info: {
          sessionId,
          cwd,
          path,
          viewerId: viewerIdForPath(path),
        },
      })
    }

    function TabMenuItem(props) {
      const ctx = props.ctx
      const t = useT(ctx)
      const sessionId = props.sessionId
      const useSessions = props.useSessions
      const cwd = useSessions((state) => sessionId && state.byId && state.byId[sessionId] ? state.byId[sessionId].cwd : undefined)
      const rawPath = parseFileRecord(props.tab)
      if (!rawPath) return null
      const open = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (typeof props.dismiss === 'function') props.dismiss()
        openInMain(ctx, {
          sessionId,
          cwd,
          path: rawPath,
          viewerId: viewerIdForPath(rawPath),
        })
      }
      return h('button', {
        type: 'button',
        role: 'menuitem',
        className: 'dsh-mft-menuitem',
        onClick: open,
      }, hIcon(ICONS.open, 15), h('span', null, t('openInMainShort')))
    }

    // ---------------------------------------------------------------------
    // Main workspace
    // ---------------------------------------------------------------------

    function TextEditorPane(props) {
      const { ctx, tab, link, forceMode, cwd, onControls, onState } = props
      const hostRef = React.useRef(null)
      const cleanupRef = React.useRef(null)
      const lastKeyRef = React.useRef('')
      const controlsRef = React.useRef(null)
      const callbacksRef = React.useRef({ onControls, onState })
      callbacksRef.current = { onControls, onState }

      const reportState = React.useCallback((state) => {
        const key = JSON.stringify(state)
        if (key === lastKeyRef.current) return
        lastKeyRef.current = key
        queueMicrotask(() => {
          if (callbacksRef.current.onState) callbacksRef.current.onState(state)
        })
      }, [])

      const reportControls = React.useCallback((controls) => {
        controlsRef.current = controls
        if (callbacksRef.current.onControls) callbacksRef.current.onControls(controls)
        if (controls && forceMode) {
          controls.setMode(forceMode)
        }
      }, [forceMode])

      React.useEffect(() => {
        let cancelled = false
        let attempts = 0
        let detach = null
        const find = () => {
          if (cancelled) return
          const info = findEditorViewInfo(hostRef.current)
          if (info) {
            detach = registerMainView(link, info.view, {
              draftDispatch: info.setDraft,
              textMode: info.mode,
            })
            return
          }
          attempts += 1
          if (attempts < 120) requestAnimationFrame(find)
        }
        const frame = requestAnimationFrame(find)
        return () => {
          cancelled = true
          cancelAnimationFrame(frame)
          if (detach) detach()
          if (controlsRef.current && callbacksRef.current.onControls) callbacksRef.current.onControls(null)
        }
      }, [link, tab.key, tab.revision, forceMode])

      const seed = React.useRef(null)
      if (seed.current === null) seed.current = seedTextOf(tab)
      const storeAdapter = React.useMemo(() => makeStoreAdapter(ctx), [ctx])
      const editor = editorDescriptor
      if (!editor) return h('div', { className: 'dsh-mft-pane-error' }, 'The Sidebar editor is unavailable.')
      const editorProps = {
        ctx,
        store: storeAdapter,
        scope: { sessionId: tab.sessionId, cwd: cwd || tab.cwd || '' },
        path: tab.absPath,
        title: tab.title,
        viewerId: tab.viewerId,
        content: seed.current,
        mtimeMs: tab.mtimeMs,
        size: tab.size,
        line: forceMode === 'preview' ? undefined : tab.line,
        toolbar: 'host',
        visible: true,
        onToolbarState: reportState,
        onToolbarControls: reportControls,
      }
      return h('div', { className: 'dsh-mft-pane' }, h('div', { ref: hostRef, style: { display: 'flex', flexDirection: 'column', flex: '1 1 auto', minHeight: 0 } }, h(editor.component, editorProps)))
    }

    function makeStoreAdapter(ctx) {
      const service = ctx.get('betterSidebar')
      return {
        subscribe: (listener) => service.subscribeState(listener),
        getSnapshot: () => service.getSnapshot(),
        getPrefs: () => service.getSnapshot().prefs,
      }
    }

    function BinaryPreview(props) {
      const { ctx, tab } = props
      const t = useT(ctx)
      if (tab.kind === 'loading') return h('div', { className: 'dsh-mft-pane-loading' }, t('loading'))
      if (tab.kind === 'error') return h('div', { className: 'dsh-mft-pane-error' }, t('readFailed') + (tab.error ? ': ' + tab.error : ''))
      if (tab.kind === 'too-large') {
        return h('div', { className: 'dsh-mft-pane-error' },
          h('div', null,
            h('div', null, t('tooLarge')),
            h('a', { href: fileUrl(ctx, tab), target: '_blank', rel: 'noreferrer' }, t('download')),
          ),
        )
      }
      const ext = extOf(tab.absPath)
      const image = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'avif'].includes(ext)
      if (image) {
        return h('div', { className: 'dsh-mft-media' }, h('img', { src: fileUrl(ctx, tab), alt: tab.title }))
      }
      if (ext === 'pdf') {
        return h('div', { className: 'dsh-mft-media' }, h('iframe', { src: fileUrl(ctx, tab), title: tab.title }))
      }
      if (ext === 'html' || ext === 'htm') {
        return h('div', { className: 'dsh-mft-media' },
          h('iframe', { src: htmlUrl(ctx, tab), title: tab.title, sandbox: 'allow-scripts allow-forms allow-popups' }),
        )
      }
      return h('div', { className: 'dsh-mft-pane-error' },
        h('div', null,
          h('div', null, t('binary')),
          h('div', { style: { marginTop: 8 } },
            h('a', { href: fileUrl(ctx, tab), target: '_blank', rel: 'noreferrer' }, t('download')),
          ),
        ),
      )
    }

    function EditorPane(props) {
      const { ctx, tab, cwd } = props
      const t = useT(ctx)
      const [layout, setLayout] = React.useState('single')
      const [editorState, setEditorState] = React.useState(null)
      const [controls, setControls] = React.useState(null)
      const link = React.useRef(null)
      if (!link.current) link.current = ensureLink(tab.key, tab.text, tab)
      link.current.tab = tab

      React.useEffect(() => {
        setLayout('single')
        setEditorState(null)
        setControls(null)
      }, [tab.id])

      const handleEditorState = React.useCallback((next) => {
        setEditorState(next)
        if (next && next.saveState === 'saved') {
          const text = linkTextNow(link.current)
          link.current.text = text
          markTabSaved(tab, text)
        }
      }, [tab])

      React.useEffect(() => {
        let cancelled = false
        let busy = false
        const timer = setInterval(async () => {
          if (cancelled || busy || !tabDirty(tab)) return
          if (typeof tab.size === 'number' && tab.size > 512 * 1024) return
          busy = true
          try {
            const result = await readFile(ctx, tab)
            if (!cancelled && result && result.kind === 'text') {
              tab.mtimeMs = result.mtimeMs
              if (result.content === tab.text) markTabSaved(tab, result.content)
            }
          } catch {
          } finally {
            busy = false
          }
        }, 1400)
        return () => {
          cancelled = true
          clearInterval(timer)
        }
      }, [tab.key, ctx])

      if (tab.kind === 'loading' || tab.kind === 'error' || tab.kind === 'binary' || tab.kind === 'too-large') {
        return h(BinaryPreview, { ctx, tab })
      }
      if (!editorDescriptor) {
        return h('div', { className: 'dsh-mft-pane-error' }, 'The Sidebar editor is unavailable.')
      }
      const canSplit = isPreviewable(tab.viewerId)
      const showSplit = canSplit && layout === 'split'
      const editable = !(editorState && editorState.editable === false)
      const dirty = tabDirty(tab)
      const saveState = editorState && editorState.saveState
      const editorMode = editorState && editorState.mode
      const saveLabel = saveState === 'saving' ? t('save') : (saveState === 'saved' ? t('saved') : t('save'))
      const pathLabel = tab.absPath
      const toggleLayout = () => setLayout(showSplit ? 'single' : 'split')
      const setMode = (mode) => {
        if (controls && typeof controls.setMode === 'function') controls.setMode(mode)
      }
      const doSave = () => {
        if (controls && typeof controls.save === 'function') controls.save()
      }
      const doReload = () => { void reloadTab(ctx, tab) }
      const doClose = () => closeTab(ctx, tab.sessionId, tab.id)

      return h('div', { className: 'dsh-mft-body' },
        h('div', { className: 'dsh-mft-toolbar' },
          h('span', { className: 'dsh-mft-path', title: pathLabel }, pathLabel),
          canSplit && !showSplit && h('button', {
            type: 'button',
            className: 'dsh-mft-tool',
            'data-active': editorMode === 'edit' ? 'true' : 'false',
            title: t('edit'),
            onClick: () => setMode('edit'),
          }, hIcon(ICONS.edit, 14), h('span', null, t('edit'))),
          canSplit && !showSplit && h('button', {
            type: 'button',
            className: 'dsh-mft-tool',
            'data-active': editorMode === 'preview' ? 'true' : 'false',
            title: t('preview'),
            onClick: () => setMode('preview'),
          }, hIcon(ICONS.preview, 14), h('span', null, t('preview'))),
          canSplit && h('button', {
            type: 'button',
            className: 'dsh-mft-tool',
            'data-active': showSplit ? 'true' : 'false',
            title: showSplit ? t('single') : t('split'),
            onClick: toggleLayout,
          }, hIcon(showSplit ? ICONS.single : ICONS.split, 14), h('span', null, showSplit ? t('single') : t('split'))),
          h('button', {
            type: 'button',
            className: 'dsh-mft-tool' + (dirty ? ' dsh-mft-primary' : ''),
            disabled: !editable || !dirty || saveState === 'saving',
            title: t('save'),
            onClick: doSave,
          }, hIcon(ICONS.save, 14), h('span', null, saveLabel)),
          h('button', { type: 'button', className: 'dsh-mft-reload', title: t('reload'), onClick: doReload }, hIcon(ICONS.reload, 14)),
          h('button', { type: 'button', className: 'dsh-mft-reload', title: t('close'), onClick: doClose }, hIcon(ICONS.close, 14)),
        ),
        h('div', { className: 'dsh-mft-panes' },
          showSplit
            ? [
              h(TextEditorPane, {
                key: 'edit',
                ctx,
                tab,
                cwd,
                link: link.current,
                forceMode: 'edit',
                onControls: setControls,
                onState: handleEditorState,
              }),
              h(TextEditorPane, {
                key: 'preview',
                ctx,
                tab,
                cwd,
                link: link.current,
                forceMode: 'preview',
                onState: () => {},
              }),
            ]
            : h(TextEditorPane, {
              key: 'single',
              ctx,
              tab,
              cwd,
              link: link.current,
              onControls: setControls,
              onState: handleEditorState,
            }),
        ),
      )
    }

    function tabIcon(service, path) {
      if (!service || typeof service.fileIcon !== 'function') return hIcon(ICONS.doc, 14)
      try {
        return service.fileIcon(path, 14)
      } catch {
        return hIcon(ICONS.doc, 14)
      }
    }

    function TabStrip(props) {
      const { ctx, workspace, service } = props
      const t = useT(ctx)
      return h('div', { className: 'dsh-mft-tabs', role: 'tablist', 'aria-label': t('tabList') },
        workspace.tabs.map((tab) => {
          const active = workspace.activeId === tab.id
          return h('div', {
            key: tab.id,
            className: 'dsh-mft-tab',
            'data-active': active ? 'true' : 'false',
            role: 'tab',
            'aria-selected': active ? 'true' : 'false',
            title: tab.absPath,
            onClick: () => activateTab(workspace.sessionId, tab.id),
            onAuxClick: (event) => {
              if (event.button === 1) {
                event.preventDefault()
                closeTab(ctx, workspace.sessionId, tab.id)
              }
            },
          },
            h('span', { className: 'dsh-mft-tabicon' }, tabIcon(service, tab.absPath)),
            h('span', { className: 'dsh-mft-tabname' }, tab.title),
            tabDirty(tab) && h('span', { className: 'dsh-mft-dot', 'aria-hidden': 'true' }),
            h('button', {
              type: 'button',
              className: 'dsh-mft-close',
              title: t('close'),
              'aria-label': t('close'),
              onClick: (event) => {
                event.stopPropagation()
                closeTab(ctx, workspace.sessionId, tab.id)
              },
            }, hIcon(ICONS.close, 12)),
          )
        }),
        h('span', { className: 'dsh-mft-tabspacer' }),
        h('button', {
          type: 'button',
          className: 'dsh-mft-chatbtn',
          onClick: () => {
            showConversationView()
          },
        }, hIcon(ICONS.back, 14), h('span', null, t('backToChat'))),
      )
    }

    function MainWorkspace(props) {
      const ctx = pluginCtx
      const t = useT(ctx)
      React.useSyncExternalStore(subscribeStore, getStoreVersion, getStoreVersion)
      const sessionId = props.sessionId || store.currentSessionId
      const workspace = sessionId ? workspaceOf(sessionId) : undefined
      const active = workspace ? workspace.tabs.find((tab) => tab.id === workspace.activeId) : undefined
      const service = ctx.get('betterSidebar')
      const activeCwd = (active && active.cwd) || (workspace && workspace.cwd)

      if (!workspace || workspace.tabs.length === 0) {
        return h('div', { className: 'dsh-mft-root' },
          h('div', { className: 'dsh-mft-empty' },
            h('div', { className: 'dsh-mft-tabicon' }, hIcon(ICONS.open, 28)),
            h('h2', null, t('emptyTitle')),
            h('p', null, t('emptyBody')),
            h('button', {
              type: 'button',
              className: 'dsh-mft-chatbtn',
              onClick: () => { showConversationView() },
            }, hIcon(ICONS.back, 14), h('span', null, t('backToChat'))),
          ),
        )
      }

      return h('div', { className: 'dsh-mft-root' },
        h(TabStrip, { ctx, workspace, service }),
        active
          ? h(EditorPane, { key: active.id + ':' + active.revision, ctx, tab: active, cwd: activeCwd })
          : h('div', { className: 'dsh-mft-empty' }, h('p', null, t('emptyTitle'))),
      )
    }

    let pluginCtx
    let editorDescriptor
    let originalByExt = new Map()

    // ---------------------------------------------------------------------
    // Plugin activation
    // ---------------------------------------------------------------------

    function registerSlot(ctx, name, options, component) {
      return ctx.effect(() => ctx.slots.inject(name, () => ctx.slots.register({ name, ...options }, component)))
    }

    function activeSessionIdForApi(ctx) {
      try {
        const right = ctx.get('sidebarRight')
        let mounted = right && right.mounted
        if (mounted && typeof mounted.getSnapshot === 'function') mounted = mounted.getSnapshot()
        if (mounted && mounted.sessionId) return mounted.sessionId
        if (mounted && mounted.binding && mounted.binding.sessionId) return mounted.binding.sessionId
      } catch {}
      return store.currentSessionId
    }

    function sessionCwdForApi(ctx, sessionId) {
      try {
        const sessions = ctx.get('sessions')
        const list = sessions && sessions.list
        const snapshot = list && typeof list.getSnapshot === 'function' ? list.getSnapshot() : undefined
        const cwd = snapshot && snapshot.byId && snapshot.byId[sessionId] ? snapshot.byId[sessionId].cwd : undefined
        if (cwd) return cwd
      } catch {}
      const workspace = store.workspaces.get(sessionId)
      return workspace ? workspace.cwd : undefined
    }

    function normalizeOpenInput(ctx, input) {
      const raw = typeof input === 'string' ? { path: input } : (input || {})
      if (!raw || typeof raw.path !== 'string' || raw.path.trim() === '') {
        throw new TypeError('mainFileTabs.openFile requires a non-empty path')
      }
      const sessionId = raw.sessionId || activeSessionIdForApi(ctx)
      if (!sessionId) throw new Error('mainFileTabs.openFile could not resolve a session; pass sessionId')
      const cwd = raw.cwd || sessionCwdForApi(ctx, sessionId)
      return {
        sessionId,
        cwd,
        path: raw.path,
        line: typeof raw.line === 'number' && Number.isFinite(raw.line) ? Math.max(1, Math.floor(raw.line)) : undefined,
        viewerId: typeof raw.viewerId === 'string' ? raw.viewerId : undefined,
        text: typeof raw.text === 'string' ? raw.text : undefined,
        mtimeMs: typeof raw.mtimeMs === 'number' ? raw.mtimeMs : undefined,
        size: typeof raw.size === 'number' ? raw.size : undefined,
      }
    }

    function createMainFileTabsApi(ctx) {
      return {
        version: '1.0.0',
        features: ['openFile', 'onDidChange', 'onDidOpen', 'onDidClose', 'getOpenFiles', 'getText'],
        /**
         * Open a file in the main workspace view.
         * @param input - path string, or { sessionId?, cwd?, path, line?, viewerId?, text?, mtimeMs?, size? }
         * @returns { sessionId, path, tabId, title, viewerId, ready: Promise<handle> }
         */
        openFile(input) {
          const info = normalizeOpenInput(ctx, input)
          const active = activeSessionIdForApi(ctx)
          info.focus = active === info.sessionId
          const tab = openInMain(ctx, info)
          if (!tab) throw new Error(lastOpenError || 'mainFileTabs.openFile failed')
          prepareTabReady(tab)
          if (tab.kind !== 'loading') resolveTabReady(tab)
          const handle = {
            sessionId: tab.sessionId,
            path: tab.absPath,
            tabId: tab.id,
            title: tab.title,
            viewerId: tab.viewerId,
            line: tab.line,
          }
          return { ...handle, ready: tab.ready ? tab.ready.then(() => handle) : Promise.resolve(handle) }
        },
        /** Listen for document text changes. Returns a disposer. */
        onDidChange(listener) {
          return addListener(changeListeners, listener)
        },
        /** Listen for a main workspace tab becoming ready. Returns a disposer. */
        onDidOpen(listener) {
          return addListener(openListeners, listener)
        },
        /** Listen for a main workspace tab closing. Returns a disposer. */
        onDidClose(listener) {
          return addListener(closeListeners, listener)
        },
        /** List open main-workspace files, optionally for one session. */
        getOpenFiles(sessionId) {
          const ids = sessionId ? [sessionId] : [...store.workspaces.keys()]
          const result = []
          for (const id of ids) {
            const workspace = store.workspaces.get(id)
            if (!workspace) continue
            for (const tab of workspace.tabs) {
              result.push({
                sessionId: tab.sessionId,
                path: tab.absPath,
                tabId: tab.id,
                title: tab.title,
                viewerId: tab.viewerId,
                kind: tab.kind,
                line: tab.line,
                mtimeMs: tab.mtimeMs,
                dirty: tabDirty(tab),
                text: tab.kind === 'text' ? tab.text : undefined,
              })
            }
          }
          return result
        },
        /** Read the current in-memory text of an open main-workspace file. */
        getText(input) {
          const raw = typeof input === 'string' ? { path: input } : (input || {})
          if (!raw || typeof raw.path !== 'string') return undefined
          const sessionId = raw.sessionId || activeSessionIdForApi(ctx)
          if (!sessionId) return undefined
          const cwd = raw.cwd || sessionCwdForApi(ctx, sessionId)
          const key = keyOf(sessionId, resolvePath(cwd, raw.path))
          const workspace = store.workspaces.get(sessionId)
          const tab = workspace && workspace.tabs.find((item) => item.key === key)
          return tab && tab.kind === 'text' ? tab.text : undefined
        },
      }
    }

    function emitOpenSoon(tab) {
      if (!tab) return
      queueMicrotask(() => {
        const workspace = store.workspaces.get(tab.sessionId)
        if (!workspace || !workspace.tabs.some((item) => item.id === tab.id)) return
        emitOpen(tab)
      })
    }

    function apply(ctx) {
      pluginCtx = ctx
      localeDicts(ctx)
      ctx.effect(() => {
        if (typeof document === 'undefined') return undefined
        const element = document.createElement('style')
        element.id = 'dsh-main-file-tabs-styles'
        element.textContent = CSS
        document.head.append(element)
        return () => element.remove()
      })

      const service = ctx.get('betterSidebar')
      if (!service) {
        console.warn('[dsh-main-file-tabs] dsh-better-sidebar is not available; the main file workspace is disabled.')
        return
      }
      const viewers = service.getFileViewers()
      editorDescriptor = viewers.find((viewer) => viewer.id === 'code')
        || viewers.find((viewer) => viewer.id === 'markdown')
      if (!editorDescriptor) {
        console.warn('[dsh-main-file-tabs] no Sidebar text viewer is available; the main file workspace is disabled.')
        return
      }
      originalByExt = new Map()
      for (const ext of TEXT_EXTS) {
        const viewer = service.matchFileViewer('probe.' + ext)
        if (viewer && viewer.fetchStrategy === 'fsRead' && viewer.id !== VIEWER_ID) {
          originalByExt.set(ext, viewer)
        }
      }
      if (originalByExt.size === 0) {
        console.warn('[dsh-main-file-tabs] no fsRead text viewer found')
        return
      }

      ctx.effect(() => {
        try {
          return service.registerFileViewer({            id: VIEWER_ID,
            title: () => 'Main workspace file bridge',
            exts: [...originalByExt.keys()],
            priority: 50,
            fetchStrategy: 'fsRead',
            component: BridgeViewer,
          })
        } catch (error) {
          console.error('[dsh-main-file-tabs] could not register the Sidebar viewer bridge', error)
          return () => {}
        }
      })

      registerSlot(ctx, 'conversation.view', {
        id: MAIN_KEY,
        order: 25,
        label: () => localeDicts(ctx)('viewLabel'),
      }, MainWorkspace)

      registerSlot(ctx, 'sidebar.right.tab.document.actions', {
        id: 'open-in-main-workspace',
        order: 40,
      }, function DocumentActionsSlot(props) {
        return h(NativeActionsButton, { ...props, ctx })
      })

      registerSlot(ctx, 'sidebar.right.tab.menu.item', {
        id: 'open-in-main-workspace',
        order: 30,
      }, function TabMenuSlot(props) {
        return h(TabMenuItem, { ...props, ctx })
      })

      ctx.effect(() => {
        if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') return undefined
        const onBeforeUnload = (event) => {
          for (const workspace of store.workspaces.values()) {
            if (workspace.tabs.some((tab) => tabDirty(tab))) {
              event.preventDefault()
              event.returnValue = ''
              return
            }
          }
        }
        window.addEventListener('beforeunload', onBeforeUnload)
        return () => window.removeEventListener('beforeunload', onBeforeUnload)
      })

      ctx.effect(() => () => {
        for (const link of [...links.values()]) destroyLink(link.key)
        sidebarViews.clear()
        changeListeners.clear()
        openListeners.clear()
        closeListeners.clear()
      })

      try {
        ctx.provide('mainFileTabs', createMainFileTabsApi(ctx))
      } catch (error) {
        console.error('[dsh-main-file-tabs] could not provide the mainFileTabs API', error)
      }

      console.info('[dsh-main-file-tabs] active', {
        textExtensions: originalByExt.size,
        viewer: VIEWER_ID,
        api: 'mainFileTabs@1.0.0',
      })
    }

    return {
      inject: ['slots', 'betterSidebar', 'layout', 'locale'],
      apply,
    }
  },
})
