# MMH Agent Center Dashboard

A modern SaaS dashboard built with **Vite + React + TypeScript** for managing AI sales agents.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth + Database + Edge Functions)
- **Icons**: Lucide React
- **Payments**: Paddle
- **Forms**: Tally (to be replaced with in-platform forms)

## 📁 Project Structure

```
src/
├── components/
│   ├── layouts/
│   │   └── DashboardLayout.tsx
│   ├── ui/
│   │   └── Image.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── pages/
│   ├── dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── FineTuning.tsx
│   │   ├── DataSources.tsx
│   │   ├── ConnectTools.tsx
│   │   ├── Deployment.tsx
│   │   ├── Analytics.tsx
│   │   ├── Status.tsx
│   │   ├── Plan.tsx
│   │   ├── Billing.tsx
│   │   └── Support.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── UpdatePassword.tsx
│   ├── AuthCallback.tsx
│   └── AuthError.tsx
├── lib/
│   └── supabase/
│       └── client.ts
├── App.tsx
└── main.tsx
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Development Server

```bash
npm run dev
```

The app will run on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## 🔐 Authentication Flow

1. **Login**: `/login` - Email/password authentication
2. **Password Reset**: Email-based reset flow
3. **Update Password**: `/update-password` - Set new password
4. **Protected Routes**: All `/dashboard/*` routes require authentication

## 📋 Key Features

### Current Features
- ✅ User authentication (Supabase Auth)
- ✅ Protected dashboard routes
- ✅ Plan-based access control
- ✅ Integration with Tally forms
- ✅ Paddle payment webhooks
- ✅ Supabase Edge Functions
- ✅ Responsive design (mobile-first)

### Upcoming Features
- 🔄 In-platform fine-tuning forms (replacing Tally)
- 🔄 File upload for data sources
- 🔄 Automated AI fine-tuning pipeline
- 🔄 Real-time training status updates
- 🔄 Vector database integration for RAG
- 🔄 Model deployment automation

## 🎨 Styling

The project uses **Tailwind CSS** with a custom design system:

- Primary color: `#ff4f00` (Orange)
- Background: `#fcfcfc`
- Border: `#e3e3e6`
- Text: `#0a0a10` / `#6f6f7e`

## 🔄 Migration from Next.js

This project was migrated from Next.js 14 (App Router) to Vite + React Router:

### Key Changes:
- ❌ Removed: Next.js App Router, Server Components, API Routes
- ✅ Added: React Router v6, Client-side rendering
- ✅ Updated: Supabase client (from SSR to standard client)
- ✅ Converted: All async server components to useEffect patterns

### Benefits:
- ⚡ **Faster dev server** (Vite HMR is instant)
- 🎯 **Simpler architecture** (no server/client split)
- 💰 **Lovable.dev compatible**
- 🚀 **Better TypeScript support**

## 📦 Deployment

### Recommended Platforms:
1. **Vercel** (easiest)
2. **Netlify**
3. **Cloudflare Pages**

### Build Command:
```bash
npm run build
```

### Output Directory:
```
dist/
```

### Environment Variables:
Make sure to set these in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npx tsc --noEmit
```

## 🤝 Contributing

This is a private project for Modern Marketing House. Contact the development team for access.

## 📄 License

Proprietary - © 2025 Modern Marketing House. All rights reserved.

---

## 🚧 Next Steps

1. **Replace Tally Forms** with in-platform multi-step forms
2. **Add file upload** for data sources (PDFs, DOCs, URLs)
3. **Implement fine-tuning automation** with OpenAI/Hugging Face
4. **Set up vector database** (Pinecone/Weaviate) for RAG
5. **Create training job orchestrator** via Supabase Edge Functions
6. **Add real-time status updates** using Supabase Realtime

For detailed implementation plans, see the project documentation.
