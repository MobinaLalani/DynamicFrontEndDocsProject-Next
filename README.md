# 🚀 API Documentation Builder

A modern visual documentation management platform built with Next.js and TypeScript.

This project helps teams create, manage, and publish API documentation faster by importing OpenAPI/Swagger definitions and transforming them into customizable documentation pages.

---

## ✨ Overview

API Documentation Builder provides a flexible workspace for developers and technical teams to:

- Import Swagger/OpenAPI specifications
- Automatically generate API documentation structures
- Create and customize documentation pages visually
- Organize endpoints into groups and menus
- Preview documentation in real-time

The goal of this project is to simplify the process of maintaining developer-friendly API documentation.

---


# 🎯 Features

## 📌 OpenAPI / Swagger Integration

- Import Swagger JSON files
- Parse controllers and API endpoints
- Generate documentation blocks automatically
- Support request parameters and response schemas

---

## 🧩 Visual Documentation Builder

- Create documentation pages dynamically
- Build pages using reusable components
- Manage menus and documentation sections
- Real-time preview while editing

---

## 📚 Documentation Components

Supported content blocks:

- Swagger Endpoint Viewer
- Request Parameters Table
- Response Schema Viewer
- Text Documentation
- Code Examples
- Custom Content Sections

---

## 🔄 Version Management *(Roadmap)*

Planned features:

- Draft and published versions
- Documentation history
- Change comparison
- Rollback support

---

## 🤖 AI Documentation Assistant *(Roadmap)*

Future improvements:

- Generate API descriptions automatically
- Create examples from API schemas
- Improve technical documentation quality

---


# ⚙️ Installation

Follow these steps to run the project locally.

## 📋 Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm / yarn / pnpm

---

## 📥 Clone the Repository

```bash
git clone <https://github.com/MobinaLalani/DynamicFrontEndDocsProject-Next.git>

cd api-documentation-builder
# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- TanStack React Query
- Framer Motion

<!-- ## Backend

- .NET Web API
- Swagger / OpenAPI
- SQL Server -->

---

# 📂 Project Architecture
<pre>
src/
│
├── app/
│   └── # Next.js App Router structure, layouts and application routes
│
├── components/
│   │
│   ├── auth/
│   │   └── # Authentication section
│   │
│   ├── ui/
│   │   └── # Components responsible for rendering documentation preview
│   │
│   ├── hooks/
│   │   └── # Navigation and documentation menu components
│   │
│   ├──page-rende
│   │
│   └── layout/
│       └── # Reusable UI components shared across the application
│
├── context/
│       └── # BlockRegistry and sidebar context
│
├── data/
│    └── # file that stores data for created pages.
│
├── features/
│   │
│   ├── docs-builder/
│   │   │
│   │   ├── components/
│   │   │   └── # Feature-specific React components
│   │   │
│   │   ├── hooks/
│   │   │   └── # Custom React hooks for docs builder logic
│   │   │
│   │   ├── models/
│   │   └── # TypeScript interfaces, types and domain models
│   │   │
│   │   └── services/
│   │       └── # API communication and business logic services
│   │
│   │
│   │
│   ├── docs-preview/
│   │   │
│   │   ├── model/ 
│   │   │    └── # TypeScript interfaces, types and domain models 
│   │   │
│   │   └──components/
│   │        └── ui/ 
│   │             └── # preview ui components
│   │
│   │
│   └── swagger-import/ 
│   
│   
│
│
├── lib/
│  
└── assets/
    └── # fonts,....
</pre>