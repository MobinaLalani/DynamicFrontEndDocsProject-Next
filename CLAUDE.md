# CLAUDE.md

## Project Overview

Role-based documentation platform (CMS-like) built with Next.js App Router.
Provides dynamic, API-driven documentation rendering with modular architecture.

Main features:
- Role-Based Access Control (RBAC)
- Dynamic documentation rendering from backend APIs
- Admin panel for content management
- Block-based CMS-style page builder
- Role-based layout system (sidebar + shell)

---

## Tech Stack

- Next.js (App Router) — server components by default
- React + TypeScript (strict mode)
- Tailwind CSS v4 (PostCSS, no tailwind.config.js — theme defined in globals.css)
- Axios (API layer, centralized)
- Formik (forms)
- Ant Design (UI components)
- React Context API (state management)
- Lucide React (icons)

---

## Actual File Structure

```
/app
  (admin)/
    layout.tsx          → requireRole("admin") gate + SidebarProvider
    page.tsx            → admin dashboard
    componentsSetting/  → component settings page
  (user)/
    layout.tsx          → requireAuth gate + SidebarProvider
    pages/[slug]/       → dynamic doc page renderer
  actions/
    auth.ts             → server actions (login, logout)
  globals.css           → Tailwind v4 theme + CSS custom properties
  layout.tsx            → root layout (RTL, Geist fonts, BlockRegistryProvider)

/components
  auth/
    SessionMenu.tsx     → user avatar popover (logout, user info)
    login-form.tsx      → login form
    session-bar.tsx     → session display
    UserInfoModal.tsx   → user info modal
  docs/
    builder/            → block editors, inspector panels, page creator
    page-renderer.tsx   → doc page wrapper
  layout/
    Navbar.tsx          → generic navbar (leftSlot / rightSlot)
    Sidebar.tsx         → collapsible sidebar shell (uses SidebarContext)
    Footer.tsx          → generic footer wrapper
    AdminShell.tsx      → admin area layout (navbar + sidebar + footer)
    UserShell.tsx       → user docs area layout (sidebar only)
    docsSiteBuilderLayout/
      AdminDocsNavbar.tsx     → docs builder navbar
      AdminDocsSidebar.tsx    → docs builder sidebar (page list + actions)
      AdminDocsFooter.tsx     → docs builder footer
    docsSitePreviewLayout/
      DocsSitePreviewNavbar.tsx   → user docs navbar
      DocsSitePreviewSidebar.tsx  → user docs sidebar (menu groups + pages)
      DocsSitePreviewFooter.tsx   → user docs footer
  page-renderer/
    PageRenderer.tsx        → main content container
    renderComponent.tsx     → block dispatcher
    blocks/
      HeadingBlock.tsx
      ParagraphBlock.tsx
      CodeBlock.tsx
      TableBlock.tsx
      FieldGroupBlock.tsx
      EndpointBlock.tsx
      NoteBlock.tsx
  ui/
    Popover.tsx           → floating popover (4 positions)
    CollapsiblePanel.tsx  → collapsible sections
    icons/ArrowIcon.tsx   → RTL-aware arrow icon

/features
  componentsSetting/
    layout/
      componentsSettingNavbar.tsx   → admin panel navbar
      componentsSettingSidebar.tsx  → admin panel sidebar (2 nav items)
      componentsSettingFooter.tsx
  docs-builder/
    model.ts            → BuilderView type

/context
  SidebarContext.tsx    → isOpen / toggle (defaults true — may cause hydration mismatch)
  BlockRegistryContext  → block type registry for builder

/lib
  auth/
    config.ts           → session config (SECRET must be env var in production)
    types.ts            → AuthSession, authRoles ("admin" | "user")
    session.ts          → token sign/verify
    provider.ts         → auth provider (Nest API integration pending)
  docs/
    schema.ts           → DocPage, Block types
    workspace.ts        → DocsWorkspace, MenuGroup types
  services/             → Axios API clients

/hooks
  (custom hooks)

/components/fonts
  YekanBakhFaNum-Regular.ttf
  YekanBakhFaNum-Light.ttf
```

---

## Design System

### Color Palette (globals.css)

```css
--background: #D5E4F7    /* page background — light blue */
--foreground: #0f172a    /* primary text — dark navy */
--darkblue:   #1A3F76    /* sidebar background, hover states */
--lightblue:  #1078F9    /* primary accent, buttons */
--darkgray:   #42648A    /* secondary text, SessionMenu button */
--lightgray:  #6886a8    /* tertiary text */
--lightYellow:#e9c46a    /* highlights (used rarely) */
```

Tailwind theme aliases (use these in className):
- `bg-(--darkBlue)`, `text-(--darkGray)`, `bg-(--lightBlue)`, etc.

### SessionMenu Button Standard
All navbar SessionMenu triggers must use:
```
border-[#42648A] bg-[#42648A] text-white hover:border-[#1A3F76] hover:bg-[#1A3F76]
```

### Navbar Standard (all 3 navbars)
```
bg-white/80 backdrop-blur-sm border-b border-slate-200/60 rounded-3xl m-3 shadow-lg px-5 py-4
```

### Sidebar Standard
```
bg-(--darkBlue) text-white border-l border-white/10 rounded-l-4xl
```
Active item: `bg-white text-slate-950 shadow-sm`
Inactive item: `bg-white/5 text-white hover:bg-white/10`
Active indicator dot: `bg-(--lightBlue)`

### Semantic Colors (block-level)
- `info` → sky
- `success` → emerald
- `warning` → amber
- `danger` → rose
- HTTP GET → emerald, POST → sky, PUT → amber, PATCH → violet, DELETE → rose

### Typography
- Font: `YekanBakh` (Persian) + Geist Sans/Mono (Latin/code)
- Body: `line-height: 1.6`, `-webkit-font-smoothing: antialiased`
- Label pattern: `text-xs font-medium uppercase tracking-[0.24em] text-(--darkGray)`
- Title pattern: `text-lg font-semibold text-slate-950`

### Border Radius
- Buttons/items: `rounded-2xl`
- Navbar/Footer: `rounded-3xl`
- Sidebar: `rounded-l-4xl`
- Avatars: `rounded-full`

---

## Role-Based Access Control (RBAC)

### Spec (target)
- `admin` → full access
- `editor` → create/edit docs
- `viewer` → read-only

### Current Implementation
- `admin` → implemented (route gate + shell)
- `user` → implemented (maps to viewer behavior)
- `editor` → NOT yet implemented (missing from `lib/auth/types.ts`)

**IMPORTANT:** `lib/auth/types.ts` defines `authRoles = ["admin", "user"]`.
Before adding editor role, update this file first.

Rules:
- Route gates: `requireRole("admin")` in `app/(admin)/layout.tsx` (server-side)
- Layout gate: `requireAuth()` in `app/(user)/layout.tsx`
- Never rely on frontend-only role checks
- Unauthorized access redirects to login

---

## Layout Shells

### AdminShell (admin panel)
- Navbar: `ComponentsSettingNavbar` (title prop required)
- Sidebar: `ComponentsSettingSidebar` (2 nav items: dashboard, componentsSetting)
- Sidebar offset: `xl:pr-[360px]` expanded / `xl:pr-[72px]` collapsed

### UserShell (doc viewer)
- Sidebar: `DocsSitePreviewSidebar` (menu groups + pages from workspace)
- No navbar — navbar is rendered per-page
- Sidebar offset: same `xl:pr-[360px]` / `xl:pr-[72px]`

### Docs Builder (admin/page.tsx)
- Navbar: `AdminDocsNavbar`
- Sidebar: `AdminDocsSidebar` (page list + create-page + menus views)

---

## Documentation System (CMS Blocks)

Docs fetched from backend API. Each page identified by `slug`.
Content is block-based — each block has own renderer in `/components/page-renderer/blocks/`.

Supported blocks: `heading`, `paragraph`, `note`, `code`, `endpoint`, `field-group`, `table`

Rules:
- No hardcoded documentation content
- All rendering must be dynamic via `renderComponent.tsx` dispatcher
- Each block has its own renderer component

---

## Sidebar System

- Managed via `SidebarContext` (isOpen / toggle)
- `SidebarProvider` wraps each route group layout
- Default: `isOpen = true` (⚠️ may cause hydration mismatch — fix: init from localStorage)
- Collapsed width: `w-[72px]`, Expanded: `w-full sm:w-[360px]`
- Toggle button inside `Sidebar.tsx` base component
- All sidebars use same `Sidebar` wrapper with `className` prop for colors

---

## API Layer

- All requests through `/lib/services`
- Axios instance centralized
- No direct `fetch()` in components
- Standard response: `{ data, status, error }`
- Auth provider in `lib/auth/provider.ts` (Nest.js backend — integration pending)

---

## State Management

- `SidebarContext` → sidebar open/close state
- `BlockRegistryContext` → block type registry for builder
- `AuthContext` → planned (currently auth via server session)
- Rule: no prop drilling, context for shared state only, local UI state inside component

---

## Known Issues / Tech Debt

| Severity | Location | Issue |
|----------|----------|-------|
| CRITICAL | `lib/auth/config.ts` | Default secret in code — must throw in production if env var missing |
| HIGH | `lib/auth/types.ts` | `editor` role missing — spec vs implementation mismatch |
| HIGH | `UserShell.tsx:42` | `onToggle={() => {}}` is empty stub — sidebar toggle broken |
| HIGH | `UserShell.tsx:16` | `session` prop received but never used |
| HIGH | `AdminDocsSidebar.tsx:85` | `window.location.href` — use Next.js router instead |
| HIGH | `DocsSitePreviewSidebar.tsx:134` | button vs Link renders near-identical JSX twice |
| MEDIUM | `SidebarContext.tsx` | `isOpen` defaults `true` — potential hydration mismatch |
| MEDIUM | `AdminDocsSidebar.tsx` | 220-line component, 4-level JSX nesting — needs modularization |
| MEDIUM | Both sidebars | 60+ lines duplicated between AdminDocsSidebar and DocsSitePreviewSidebar |

---

## Coding Standards

- TypeScript strict mode — no `any`, no implicit types
- Functional components + hooks only
- Feature-based structure — new features go in `/features`
- Keep components under ~100 lines; extract if larger
- No mixing UI and business logic in same file
- No `window.location.href` — use Next.js `Link` or `router.push`

---

## Naming Conventions

```
Components    → PascalCase.tsx
Hooks         → useCamelCase.ts
Utils         → camelCase.ts
Context       → *Context.tsx
Server action → camelCase in /app/actions/
```

---

## Performance Rules

- Prefer Server Components — add `"use client"` only when needed
- Lazy load heavy modules
- Sidebar transition: `transition-[padding] duration-300` on shell div
- `overflow-hidden` on sidebar content prevents layout bleed during collapse

---

## Security Rules

- Auth secret: must come from `process.env.AUTH_SESSION_SECRET`
- Add production guard in `lib/auth/config.ts`
- Role checks must exist server-side (layout.tsx gate) AND UI-level
- Never trust frontend-only auth
- Use httpOnly cookies for session tokens

---

## AI / Agent Rules

When modifying this project:

- Do NOT break RBAC logic or server-side route gates
- Do NOT break sidebar collapse/expand behavior
- Keep all navbars consistent: `bg-white/80 backdrop-blur-sm` pattern
- Keep all SessionMenu buttons: `bg-[#42648A]` color
- Keep sidebar active/inactive item pattern consistent
- Keep architecture API-driven — no hardcoded doc content
- Preserve feature-based structure — new features → `/features`
- Maintain role-based behavior across changes
- Fix `editor` role in `lib/auth/types.ts` before implementing editor features
