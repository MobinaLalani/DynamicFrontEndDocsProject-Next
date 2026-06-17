# CLAUDE.md

## Project Overview

This project is a role-based documentation platform (CMS-like system) built with Next.js.

It provides dynamic, API-driven documentation rendering with a modular and scalable architecture.

Main features:
- Role-Based Access Control (RBAC)
- Dynamic documentation rendering from backend APIs
- Admin panel for content management
- Block-based CMS-style page builder
- Role-based layout system (sidebar + tabs)

---

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Axios (API layer)
- Formik (forms)
- Ant Design (UI components)
- React Context API (state management)

---

## Architecture

The project follows a feature-based architecture:

/app
  dashboard        → role-based main layout
  docs             → dynamic documentation pages
  admin            → CMS/admin panel
  auth             → authentication pages

/components        → shared UI components
/features          → feature modules (auth, docs-builder, layout, etc.)
/lib               → utilities, API clients, types
/hooks             → custom hooks
/context           → global state (tabs, layout, auth)
/services          → API layer

---

## Role-Based Access Control (RBAC)

Roles:
- admin → full access
- editor → can create/edit docs
- viewer → read-only

Rules:
- All routes must validate user role
- Layout and sidebar must be role-driven
- Backend must also enforce permissions (not frontend only)
- Unauthorized access must be blocked or redirected

---

## Layout System

- Layout is role-based and dynamic
- Sidebar items come from role configuration
- Tabs are globally managed via LayoutContext
- Pages must be route-based (NOT component-based rendering)

Rules:
- No hardcoded sidebar items
- Tabs must sync with router
- Tabs must persist on navigation
- Child components can trigger tab creation

---

## Documentation System (CMS-like)

- Docs are fetched from backend API
- Each page is identified by a slug
- Content is block-based (CMS style)

Supported blocks:
- heading
- paragraph
- note
- code
- endpoint
- field-group
- table

Rules:
- No hardcoded documentation content
- All rendering must be dynamic
- Each block has its own renderer

---

## API Layer

- All requests must go through `/lib/services`
- Axios instance must be centralized
- No direct fetch() in components

Standard response:
{
  data,
  status,
  error
}

---

## State Management

Contexts:
- AuthContext → user + role
- LayoutContext → sidebar + tabs
- DocsContext → documentation state

Rules:
- Avoid prop drilling
- Use context for shared/global state only
- Keep local UI state inside components

---

## Tabs System

- Tabs are route-based
- Managed globally via LayoutContext
- Can be opened from any child component
- Must stay synced with router

Rules:
- No duplicate tabs
- Tabs must persist across navigation
- Tabs represent pages, not components

---

## Coding Standards

- Use TypeScript strictly
- Prefer functional components + hooks
- Follow feature-based structure
- Keep components small and reusable
- Avoid mixing UI and business logic

---

## Naming Conventions

Components → PascalCase.tsx  
Hooks → useCamelCase.ts  
Utils → camelCase.ts  
Context → *Context.tsx  

---

## Performance Rules

- Prefer Server Components when possible
- Avoid unnecessary "use client"
- Lazy load heavy modules
- Prevent layout re-renders

---

## Security Rules

- Role checks must exist in frontend + backend
- Never trust frontend-only auth
- Protect sensitive routes at layout level
- Use secure token handling (httpOnly preferred)

---

## AI / Agent Rules

When modifying this project:

- Do NOT break RBAC logic
- Do NOT break layout or tab system
- Keep architecture API-driven
- Avoid hardcoding UI data
- Preserve feature-based structure
- Maintain role-based behavior across changes