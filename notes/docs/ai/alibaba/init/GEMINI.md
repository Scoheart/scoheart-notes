# Gemini Code Assistant Documentation

This document provides an overview of the **服务分 2.0 (Service Score 2.0)** project, a Vue.js mobile H5 application for driver service scoring and management.

## Project Overview

This is a Vue.js 2.7 mobile H5 application designed to run within a native app container (like Amap/高德). It provides drivers with a dashboard to view their service scores, including breakdowns for safety, quality, and other metrics. It also manages driver tasks, privileges, and violations. The application supports multiple business operators (channels), such as "约约出行" and "力通".

**Key Technologies:**

*   **Framework:** Vue.js 2.7.16
*   **Routing:** Vue Router 3.1.3
*   **State Management:** Vuex 3.1.3
*   **UI Library:** Vant 2.12.27
*   **Package Manager:** pnpm 8.15.9
*   **Node.js:** v16.20.2

## Building and Running

### Prerequisites

- Node.js v16.20.2
- pnpm v8.15.9

### Commands

-   **Install Dependencies:**
    ```bash
    pnpm install
    ```

-   **Run Development Server:**
    ```bash
    # Default channel (约约出行)
    pnpm dev

    # "litong" channel
    pnpm dev:litong
    ```

-   **Build for Production:**
    ```bash
    # Default channel
    pnpm build

    # "litong" channel
    pnpm build:litong
    ```

-   **Lint Files:**
    ```bash
    pnpm lint
    ```

-   **Run with Bundle Analyzer:**
    ```bash
    pnpm analyzer
    ```

## Development Conventions

### Code Style

-   **Formatting:** The project uses Prettier with the following configuration:
    -   Single quotes
    -   No semicolons
    -   Trailing commas: none
-   **Linting:** ESLint with the `@vue/standard` configuration is used to enforce code quality.

### Project Structure

The project is organized into the following key directories:

-   `src/api`: Handles API requests, which are primarily made through a native bridge.
-   `src/assets`: Static assets like images and fonts.
-   `src/common`: Shared utilities, components, and bridge-related logic.
-   `src/components`: Reusable Vue components, organized by feature.
-   `src/pages`: Entry points for different application modules.
-   `src/router`: Vue Router configuration, with routes split by feature.
-   `src/store`: Vuex store modules.
-   `src/views`: Page-level Vue components.
-   `src/mock`: Mock JSON data for development.

### Native App Integration

A critical aspect of this project is its integration with a native mobile application.

-   **Communication:** Communication with the native app is handled via a JavaScript bridge: `window.AmapApp.bridge.send()`.
-   **API Calls:** All network requests are wrapped by this bridge and not made directly via HTTP (e.g., with `axios`). The main API wrapper is in `src/api/index.js`.

### Multi-Page Application

This project is configured as a multi-page application, with entry points defined in `vue.config.js`. The main application entry is `src/main.js`.

### Responsive Design

The project uses `postcss-px2rem` to automatically convert `px` units to `rem` for responsive scaling on different mobile devices. The base `remUnit` is `30`.
