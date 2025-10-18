# Overview

This is a personal portfolio website for Prashanth, a Full Stack Developer and Cybersecurity Enthusiast. The application showcases projects, skills, professional background, and provides contact functionality. Built with modern web technologies, it features a responsive design with animated components and a dark theme aesthetic.

The project uses a full-stack TypeScript architecture with React for the frontend, Express.js for the backend, and PostgreSQL (via Neon) for data persistence. The application manages three primary data entities: projects, contacts, and sponsors.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build Tool**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- SWC plugin for faster React compilation

**UI Component System**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Framer Motion for animations and transitions throughout the portfolio

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management
- Custom query client with configured defaults (5-minute stale time, no refetch on window focus)
- Form handling via React Hook Form with Zod schema validation

**Routing**
- Wouter for lightweight client-side routing
- Single-page application with 404 handling

**Design System**
- HSL-based color system defined in CSS variables for consistent theming
- Dark theme with purple/blue gradient accents
- Custom CSS properties for gradients, glows, and transitions
- Poppins font family loaded from Google Fonts

## Backend Architecture

**Server Framework**
- Express.js with TypeScript for the HTTP server
- Custom middleware for request logging and JSON response capturing
- Routes organized in a functional registration pattern

**Database & ORM**
- Drizzle ORM for type-safe database operations
- Neon serverless PostgreSQL as the database provider
- WebSocket support configured for Neon's serverless architecture
- Database schema defined in a shared directory for type sharing between client and server

**API Design**
- RESTful API endpoints under `/api` prefix
- Zod schema validation on all POST requests
- Consistent error handling with appropriate HTTP status codes
- JSON-based request/response format

**Data Layer Abstraction**
- Storage interface pattern (IStorage) for potential future database swaps
- DbStorage implementation using Drizzle ORM
- Separation of concerns between routes, storage layer, and database

**Development Experience**
- TSX watch mode for hot-reloading server code
- Vite middleware integration in development for seamless full-stack DX
- Separate TypeScript configurations for client, server, and Node.js tooling

## Database Schema

**Tables & Relationships**
- `projects`: Portfolio projects with metadata (title, description, images, URLs, tech stack array)
- `contacts`: Contact form submissions from visitors
- `sponsors`: Donation/sponsorship records with optional amounts and messages

**Schema Characteristics**
- UUID primary keys for all tables
- Timestamp tracking with automatic `createdAt` defaults
- PostgreSQL-specific features like array columns for tech stacks
- Numeric type with precision for monetary amounts
- Shared schema definitions between client and server via `@shared` alias

**Type Safety**
- Drizzle-Zod integration for runtime validation
- Inferred TypeScript types from schema definitions
- Separate insert schemas that omit auto-generated fields

## External Dependencies

**Database Service**
- Neon Serverless PostgreSQL - Cloud-native PostgreSQL with serverless scaling
- WebSocket connection support for real-time capabilities
- Environment-based configuration via `DATABASE_URL`

**UI Component Libraries**
- Radix UI - Unstyled, accessible component primitives (accordion, dialog, dropdown, etc.)
- Embla Carousel - Touch-friendly carousel implementation
- Lucide React - Icon library for consistent iconography
- CMDK - Command palette component
- React Day Picker - Date selection components

**Build & Development Tools**
- Vite - Frontend build tool and dev server
- Drizzle Kit - Database migration and schema management tool
- TSX - TypeScript execution for development
- ESLint with TypeScript support for code quality
- PostCSS with Tailwind CSS and Autoprefixer

**Utilities & Helpers**
- date-fns - Date manipulation and formatting
- clsx & tailwind-merge - Conditional class name utilities
- Sonner - Toast notification library
- Vaul - Drawer component implementation

**Project Management**
- Lovable.dev integration - Low-code development platform
- Component tagging system for tracking
- Git-based deployment workflow