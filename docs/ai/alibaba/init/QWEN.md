# 服务分 2.0 (H5 Driver Service Score 2.0)

## Project Overview

This is a Vue.js 2.7 based H5 application named "服务分 2.0" (Service Score 2.0), designed for driver service scoring in the YueYue Chuxing (约车出行) platform. The application provides a comprehensive dashboard for drivers to view and track their service scores across multiple dimensions including behavior, quality, compliance, safety, and additional points.

The project is structured as a monolithic Vue application using Vue Router for navigation, Vuex for state management, and Vant UI components for mobile-first design. It supports multiple build environments including a special "litong" channel and integrates with native app bridges for enhanced functionality.

## Architecture & Technologies

- **Framework**: Vue.js 2.7.16
- **UI Components**: Vant 2.12.27
- **State Management**: Vuex 3.1.3
- **Routing**: Vue Router 3.1.3
- **Styling**: Less, with px-to-rem conversion (remUnit: 30)
- **API Client**: Axios 0.18.0
- **Visualization**: AntV F2 for charts
- **Build Tool**: Vue CLI 4.5.18
- **Package Manager**: pnpm
- **Mobile Debugging**: vConsole for development

## Key Features

1. **Multi-Dimensional Score Display**:
   - Travel Score (出行分)
   - Quality Score (质量分)
   - Compliance Score (合规分)
   - Safety Score (安全分)
   - Behavior Score (出行表现分)
   - Additional Points (附加分)

2. **Detailed Score Breakdowns**:
   - Quality Component Analysis
   - Service Score Parsing
   - Violation and Deduction Details
   - Order Details

3. **Driver Engagement Features**:
   - Task Management
   - Privileges and Benefits
   - Duty-Free Card Usage Records
   - Reporting Management

4. **Native App Integration**:
   - AmapApp/YYApp bridge integration
   - Status bar color management
   - Native URL opening
   - Monitoring and analytics

## Project Structure

```
src/
├── api/                 # API request definitions
├── assets/              # Static assets (fonts, images)
├── common/              # Common utilities, constants, and monitoring
├── components/          # Reusable Vue components
├── composables/         # Vue 3 composables (if exists)
├── config/              # Configuration files
├── mock/                # Mock data and API endpoints
├── pages/               # Page-specific code for multi-entry points
├── router/              # Route definitions by feature modules
├── store/               # Vuex store modules
├── styles/              # Global styles and CSS reset
├── types/               # TypeScript type definitions (if exists)
├── views/               # Main view components (pages)
├── App.vue              # Root application component
├── dict.js              # Dictionary/data mapping constants
└── main.js              # Application entry point
```

## Building and Running

### Prerequisites
- Node.js v16.20.2
- pnpm v8.15.9

### Installation
```bash
pnpm install
```

### Development
```bash
# Standard development server
pnpm dev

# Development server with 'litong' channel
pnpm dev:litong
```

### Production Build
```bash
# Standard production build
pnpm build

# Production build with 'litong' channel
pnpm build:litong

# Build with bundle analyzer
pnpm analyzer
```

### Additional Scripts
- `pnpm lint` - Run ESLint to check code style
- `pnpm ak` - Run code review automation
- `pnpm clear` - Clear project cache
- `pnpm commit` - Run commit utility with validation

## Development Conventions

1. **Code Quality**:
   - ESLint with Vue standard configuration
   - Prettier for code formatting
   - Git hooks via Husky for pre-commit linting

2. **Component Architecture**:
   - Single Responsibility Principle for components
   - Reusable components in `/components` directory
   - Page-specific components in `/views` directory

3. **State Management**:
   - Centralized state in Vuex store
   - Modular organization by feature domain
   - Actions for async operations, Mutations for sync state changes

4. **Styling**:
   - rem-based responsive design (remUnit: 30)
   - BEM methodology for CSS classes
   - Global styles in `styles/` directory
   - Vant UI components for consistent mobile UI

5. **API Integration**:
   - API calls organized in `/api` directory
   - Axios with interceptors for request/response handling
   - Error handling and loading states

6. **Naming Conventions**:
   - JavaScript: camelCase for variables and functions
   - Components: PascalCase for Vue components
   - CSS: kebab-case for class names
   - Routing: Lowercase with hyphens for URL paths

## Environment-Specific Configuration

The project supports multiple environments:
- **Development**: Standard development with local server
- **Litong Channel**: Special build configuration for "litong" environment
- **Daily**: Daily build environment
- **Test**: For testing environments with vConsole enabled
- **Production**: Optimized production builds

Environment configuration is handled through process.env.CHANNEL_ENV variable with different build commands.

## Native Integration

The application integrates with native mobile apps through the AmapApp/YYApp bridge, providing:
- Native navigation controls
- Status bar customization
- Native URL opening
- Monitoring and analytics integration

## Monitoring and Analytics

- Custom Alog analytics system with page tracking
- Monitoring SDK for crash detection
- Bury.js for event tracking
- vConsole for development debugging