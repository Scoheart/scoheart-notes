# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **服务分 2.0 (Service Score 2.0)**, a Vue.js mobile H5 application for driver service scoring and management. The codebase is designed to run within a native app (高德/Amap) and supports multiple business operators (约约出行/力通).

**Key Technologies:**
- Vue 2.7.16 + Vue Router 3.1.3 + Vuex 3.1.3
- Vant 2.12.27 (Mobile UI)
- Node.js v16.20.2
- pnpm v8.15.9 (required)

## Common Commands

### Development
```bash
# Install dependencies
pnpm install

# Start dev server (约约出行 channel)
pnpm dev

# Start dev server (力通 channel)
pnpm dev:litong

# Lint code
pnpm lint
```

### Build
```bash
# Build for production (约约出行)
pnpm build

# Build for 力通 channel
pnpm build:litong

# Build with bundle analyzer
pnpm analyzer
```

### Other
```bash
# Enable husky git hooks
pnpm prepare

# Clear cache (custom robot command)
pnpm clear

# Commit helper (custom robot command)
pnpm commit
```

## Architecture Overview

### Multi-Entry Application

This is a **multi-page application** with two independent SPAs:

1. **index** (`src/main.js`) - Main service score application
2. **pax-subjective-complaint** (`src/pages/pax-subjective-complaint/main.js`) - Passenger complaint micro-app

Each entry has its own router, store, and component tree, configured in `vue.config.js:15-26`.

### Native App Integration

**Critical:** This H5 runs inside a native app container, NOT a standalone web browser.

- **Bridge API:** `window.AmapApp.bridge.send(params, callback)`
- All API calls go through the native bridge, not direct HTTP
- Bridge compatibility: `window.YYApp.bridge` aliased to `window.AmapApp.bridge`
- 10-second timeout enforced on all bridge calls
- See `src/api/index.js` for the bridge wrapper implementation

### Directory Structure

```
src/
├── api/                          # API layer by business domain
│   ├── index.js                  # Main API wrapper (getDriverScore, djRequest)
│   ├── allUrlApi/                # URL endpoint mappings
│   ├── designatedDriving/        # Designated driving APIs
│   └── [other domains]/
├── router/                       # Route definitions
│   ├── index.js                  # Main router (aggregates all routes)
│   └── [domain routers]/         # Domain-specific route modules
├── store/                        # Vuex state management
│   ├── index.js                  # Root store
│   └── designatedDriving.js      # Domain module
├── views/                        # Page-level components
├── components/                   # Reusable components (organized by domain)
│   ├── NewHome/                  # 12+ sub-components for home page
│   └── common/                   # Shared components (buttons, loading, toast, exception)
├── common/                       # Utilities and infrastructure
│   ├── AppBridge.js              # Native bridge helpers
│   ├── bury.js                   # Event tracking
│   ├── Alog.js                   # Analytics (SPMA: a2l2m)
│   ├── getHostApi.js             # Environment/API host configuration
│   ├── fetch.js                  # Fetch wrapper with mock support
│   ├── util.js                   # Helper functions
│   └── monitor.js                # BLM monitoring SDK
├── mock/                         # JSON mock data (auto-loaded in dev)
├── dict.js                       # Constants and enums
└── main.js                       # Primary app entry point
```

### API Request Flow

**DO NOT use axios directly.** All requests must go through the native bridge:

```javascript
// Import the API wrapper
import { getDriverScore, homeApi } from '@/api'

// Make API call
const response = await getDriverScore(homeApi.servicescore_level)
```

**API Path Strategy:**
- Legacy path: `/api/v1/dispose/transfer/data` (wraps multiple endpoints)
- New direct path: `/api/v1/leopard-sc-driver-score/` (direct routing)
- API mappings in `src/api/allUrlApi/index.js`

**Mock Data:**
- Automatically loaded from `src/mock/*.json` in test/dev environments
- Toggle via IP detection or debug flag
- Mock keys prefixed with `servicescore_`

### Multi-Channel/Environment Configuration

**Channels:**
- **约约出行 (Yueyue Chuxing):** Default, domain `yueyuechuxing.cn`
- **力通 (Litong):** Alternative operator, domain `litongcx.com`
- Set via `CHANNEL_ENV` environment variable

**Environments:**
- **Test:** `apitest.yueyuechuxing.cn` or `api.test.litongcx.com`
- **Pre:** `pre-api.litongcx.com` (Litong only)
- **Production:** `api2.yueyuechuxing.cn` or `api.litongcx.com`
- **Dev:** Localhost (defaults to test API)

**Domain Compliance:**
The `sliceOrigin()` function (`src/common/getHostApi.js:13-22`) dynamically replaces API domains to match the current page domain for compliance reasons. Do not hardcode domains.

### State Management Patterns

**Global Store** (`src/store/index.js`):
```javascript
state: {
  rightsList: {},          // User rights/privileges
  showpop: false,          // Popup display flag
  jumpOldPage: false,      // Version switching flag
  isOpenURLByNative: false // Tracks native URL opening
}
```

**Domain Modules:**
- `designatedDriving` - Designated driving state (namespaced)
- Each domain can have its own Vuex module

### Component Communication

1. **Props down / Events up** - Standard Vue pattern
2. **Vuex** - For cross-component shared state
3. **Event Bus** - `window.bury.log()` for analytics events
4. **Bridge Interception** - `Function.prototype.after` pattern intercepts bridge calls (see `src/main.js:97-109`)

### Routing

**Route Configuration:**
- Main router aggregates domain-specific route modules
- Lazy loading with webpack chunks: `component: () => import('../views/Component.vue')`
- Route meta fields:
  - `title` - Page title
  - `pageId` - SPMA analytics page ID

**Navigation:**
- Use `this.$router.push()` for in-app navigation
- Use bridge for native navigation: `AmapApp.bridge.send({ action: 'openAppUrl', ... })`

## Business Domain Concepts

### Score System

**Main Categories:**
1. **Service Score (服务分)** - Overall driver service quality
   - Components: Safety (安全分), Quality (质量分), Travel (出行分), Task (任务分)
2. **Designated Driving Score (代驾分)** - Separate scoring for designated driver services
3. **Compliance/Violations (违规)** - Bad review rate, violation history

### Rights/Privileges System (权益)

**Types** (see `src/dict.js`):
- `PRIORITY_ORDER_CARD` - Priority order dispatch (优先派单)
- `SERVICE_CARD` - Service card (服务卡)
- `IDLE_RUN_CARD` - Idle run compensation (空驶补偿)
- `ADVANCE_PAY_CARD` - Advance payment (垫付卡)
- `DUTY_FREE_CARD` - Duty-free card (免责卡)

Privileges are unlocked based on driver score level and displayed on the home page.

### Task System

**Task States** (see `src/dict.js`):
- `200` - NOT_STARTED
- `300` - IN_PROCESS
- `400` - COMPLETED
- `401` - UNCONFIRMED (T+1 settlement gap)
- `430` - UNCOMPLETED

Tasks provide temporary score boosts and are integrated into the home screen.

## Development Patterns

### Responsive Design

**px2rem Conversion:**
- Base: 30px = 1rem (configured in `vue.config.js:34`)
- Write styles in px, automatically converted to rem
- Design mockups typically at 750px width

### Debugging

**VConsole:**
- Enabled by default in dev (see `src/main.js:81`)
- Visible on test/pre environments
- Hidden in production

**Debug Features:**
- `debugEgg.js` - Hidden debugging interface
- `coloredEgg` component - Runtime environment override via localStorage (`set_erver-env`)
- Check browser info: `this.$getBrowerInfo()` (iOS, Android, WeChat, DingTalk detection)

### Analytics & Monitoring

**Three-layer system:**

1. **Alog (SPMA Tracking)** - Product analytics
   ```javascript
   this.$Alog.setSPMB(pageId) // Set page ID
   ```

2. **Bury Event Logging** - Custom events
   ```javascript
   window.bury.log('eventName', 'buryId', { custom: 'params' })
   ```

3. **BLM Monitor** - Performance & error monitoring
   - Imported at top of `main.js` to catch early errors
   - Disabled for Litong channel

### Style Patterns

**All components use scoped styles:**
```vue
<style lang="less" scoped>
/* Styles only apply to this component */
</style>
```

**Global styles:**
- Reset: `src/styles/reset.css`
- Vant UI: Auto-imported

### Error Handling

**Common Exception Component:**
```javascript
this.$commonException({
  type: 'empty' | 'abnormal' | 'network',
  refresh: () => { /* callback */ }
})
```

**Bridge Error Handling:**
- All bridge calls wrapped in Promise with timeout
- JSON parsing errors caught and rejected
- See `src/api/index.js:42-68` for implementation

## Key Files Reference

- `vue.config.js` - Multi-entry build configuration, px2rem, bundle analyzer
- `src/main.js` - App initialization, VConsole, bridge interception, global plugins
- `src/api/index.js` - Bridge API wrapper (`getDriverScore`, `djRequest`)
- `src/api/allUrlApi/index.js` - API endpoint mappings
- `src/common/getHostApi.js` - Environment detection and API host configuration
- `src/common/util.js` - Browser detection, app info extraction
- `src/dict.js` - Business constants (task states, privilege types, etc.)
- `src/router/index.js` - Route aggregation and configuration
- `src/store/index.js` - Global Vuex store

## Important Notes

1. **Always use pnpm** - The project requires pnpm v8.15.9, not npm or yarn
2. **Native bridge required** - This app cannot run standalone; it needs the native container
3. **Domain compliance** - Never hardcode API domains; use `getApiHost()` from `src/common/getHostApi.js`
4. **Channel awareness** - Check `process.env.CHANNEL_ENV` for channel-specific logic (约约出行 vs 力通)
5. **Mock data** - Available in test/dev via `src/mock/*.json`, automatically loaded
6. **VConsole** - Remember it's always running; check console for debug info
7. **Analytics required** - All new pages need `pageId` in route meta and SPMA tracking
8. **Scoped styles** - Always use `<style scoped>` to avoid style conflicts
9. **Function.prototype.after** - Bridge send is intercepted; see `main.js:97-109` before modifying
10. **Babel polyfills** - Core-js 3 included for old browser support; modern JS syntax is safe to use
