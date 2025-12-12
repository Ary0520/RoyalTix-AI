# 📁 Project Structure

This document outlines the structure and organization of RoyalTix AI.

## 🏗️ Root Directory

```
royaltix-ai/
├── 📁 app/                     # Next.js 14 App Router
├── 📁 components/              # Reusable React components
├── 📁 lib/                     # Utility libraries and configurations
├── 📁 data/                    # Static data and content
├── 📄 package.json             # Project dependencies and scripts
├── 📄 next.config.js           # Next.js configuration
├── 📄 tailwind.config.js       # TailwindCSS configuration
├── 📄 tsconfig.json            # TypeScript configuration
└── 📄 README.md                # Project documentation
```

## 📱 App Directory (`/app`)

Next.js 14 App Router structure with file-based routing.

```
app/
├── 📄 layout.tsx               # Root layout with navigation
├── 📄 page.tsx                 # Homepage with hero and features
├── 📄 globals.css              # Global styles
├── 📁 create/                  # Content creation page
│   └── 📄 page.tsx
├── 📁 marketplace/             # Marketplace pages
│   ├── 📄 page.tsx             # Marketplace listing
│   └── 📁 [id]/               # Dynamic asset detail pages
│       └── 📄 page.tsx
├── 📁 dashboard/               # Creator dashboard
│   └── 📄 page.tsx
├── 📁 about/                   # About page
│   └── 📄 page.tsx
├── 📁 technology/              # Technology page
│   └── 📄 page.tsx
├── 📁 features/                # Features page
│   └── 📄 page.tsx
└── 📁 api/                     # API routes
    └── 📁 create-and-register/ # Content creation API
        └── 📄 route.ts
```

## 🧩 Components Directory (`/components`)

Reusable React components organized by functionality.

```
components/
├── 📄 hero-section.tsx         # Landing page hero
├── 📄 features-cards.tsx       # Feature showcase cards
├── 📄 three-d-section.tsx      # 3D animated section
├── 📄 beginner-guide.tsx       # Web3 beginner guide modal
├── 📄 wallet-connect.tsx       # Wallet connection component
└── 📁 ui/                      # UI primitives
    ├── 📄 button.tsx           # Button component
    ├── 📄 glowing-effect.tsx   # Glowing border effect
    └── 📄 infinite-slider.tsx  # Technology slider
```

## 📚 Lib Directory (`/lib`)

Core utilities, configurations, and integrations.

```
lib/
├── 📄 utils.ts                 # Utility functions
├── 📄 database.ts              # In-memory database
├── 📄 ipfs-upload.ts           # IPFS upload utilities
├── 📄 web3-provider.tsx        # Web3 context provider
└── 📁 story-client/            # Story Protocol integration
    ├── 📄 client.ts            # Story Protocol client
    └── 📄 types.ts             # TypeScript types
```

## 🎨 Styling Architecture

### TailwindCSS Configuration
- **Dark theme**: Primary design system
- **Custom colors**: Purple/blue gradient palette
- **Responsive breakpoints**: Mobile-first approach
- **Custom animations**: Glowing effects and transitions

### Component Styling Patterns
- **Utility-first**: TailwindCSS classes
- **Responsive design**: Mobile, tablet, desktop breakpoints
- **Dark mode**: Consistent dark theme throughout
- **Animations**: Framer Motion for complex animations

## 🔧 Configuration Files

### Next.js (`next.config.js`)
- **App Router**: Enabled experimental app directory
- **Image optimization**: Configured for production
- **Webpack**: Custom fallbacks for Node.js modules
- **Security headers**: XSS protection and content security

### TypeScript (`tsconfig.json`)
- **Strict mode**: Enabled for type safety
- **Path mapping**: Absolute imports with `@/` prefix
- **Target**: ES2022 for modern JavaScript features

### TailwindCSS (`tailwind.config.js`)
- **Custom theme**: Extended with brand colors
- **Typography**: Custom font configurations
- **Animations**: Custom keyframes and transitions

## 🗄️ Data Management

### Database (`lib/database.ts`)
- **In-memory storage**: JSON-based for development
- **Persistent storage**: File-based for production
- **CRUD operations**: Create, read, update, delete content

### State Management
- **React Context**: Web3 provider for wallet state
- **Local state**: Component-level state with hooks
- **Server state**: API routes for blockchain interactions

## 🔗 API Architecture

### RESTful Endpoints
- **POST /api/create-and-register**: Create and register IP assets
- **GET /api/create-and-register**: Retrieve all content items

### External Integrations
- **Story Protocol**: Blockchain IP registration
- **Hugging Face**: AI image generation
- **Groq**: AI text generation
- **Pinata**: IPFS storage

## 🚀 Build & Deployment

### Development
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Production
```bash
npm run build        # Build for production
npm run start        # Start production server
```

### Docker
```bash
docker build -t royaltix-ai .
docker run -p 3000:3000 royaltix-ai
```

## 🔒 Security Considerations

### Environment Variables
- **Sensitive data**: Stored in `.env.local`
- **Public variables**: Prefixed with `NEXT_PUBLIC_`
- **Production**: Encrypted in deployment platform

### API Security
- **Rate limiting**: Implemented for external API calls
- **Input validation**: Server-side validation for all inputs
- **Error handling**: Secure error messages without sensitive data

## 📊 Performance Optimizations

### Next.js Features
- **Static generation**: Pre-rendered pages where possible
- **Image optimization**: Automatic image optimization
- **Code splitting**: Automatic bundle splitting
- **Caching**: Built-in caching strategies

### Custom Optimizations
- **Lazy loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Bundle analysis**: Webpack bundle analyzer integration

---

This structure ensures maintainability, scalability, and developer experience while following Next.js and React best practices.