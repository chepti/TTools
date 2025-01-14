# הוראות התקנה מפורטות

## הכנת סביבת העבודה

1. התקינו את הכלים הבאים:
   - [Node.js](https://nodejs.org/) (גרסה 18 ומעלה)
   - [Git](https://git-scm.com/)
   - עורך קוד (מומלץ: VS Code)

2. התקינו את התוספים הבאים ל-VS Code:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - GitLens

## יצירת פרויקט חדש

1. צרו פרויקט React חדש עם Vite:
```bash
npm create vite@latest teacher-tools -- --template react-ts
cd teacher-tools
```

2. התקינו את החבילות הנדרשות:
```bash
npm install @supabase/supabase-js @headlessui/react @heroicons/react react-icons
npm install -D tailwindcss postcss autoprefixer
```

3. אתחלו את Tailwind:
```bash
npx tailwindcss init -p
```

4. הגדירו את קובץ `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
    },
  },
  plugins: [],
}
```

## הגדרת Supabase

1. צרו חשבון ב-[Supabase](https://supabase.com/)

2. צרו פרויקט חדש

3. העתיקו את הקובץ `schema.sql` לתוך SQL Editor בסופאבייס והריצו אותו

4. צרו קובץ `.env` בתיקיית הפרויקט:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## מבנה התיקיות

צרו את מבנה התיקיות הבא:
```
src/
├── components/
├── config/
├── styles/
└── types/
```

## הגדרת סגנונות בסיסיים

צרו קובץ `src/styles/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .chat-container {
    @apply max-w-4xl mx-auto p-4 relative min-h-[calc(100vh-4rem)];
  }

  .chat-message {
    @apply p-4 rounded-lg max-w-3xl mx-auto;
  }

  .user-message {
    @apply bg-primary-100 mr-auto;
  }

  .system-message {
    @apply bg-gray-100 ml-auto;
  }

  .input-container {
    @apply fixed bottom-0 left-0 right-0 p-4 bg-white border-t;
  }

  .chat-input {
    @apply w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500;
  }
}
```

## הגדרת TypeScript

צרו קובץ `src/vite-env.d.ts`:
```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## הגדרת ESLint

1. צרו קובץ `.eslintrc.json`:
```json
{
  "root": true,
  "env": { "browser": true, "es2020": true },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  "ignorePatterns": ["dist", ".eslintrc.json"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["react-refresh"],
  "rules": {
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ]
  }
}
```

## הגדרת Git

1. צרו קובץ `.gitignore`:
```
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production
dist
build

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

## הגדרת Vercel

1. צרו חשבון ב-[Vercel](https://vercel.com/)
2. התחברו לחשבון GitHub שלכם
3. יבאו את הפרויקט
4. הגדירו את משתני הסביבה ב-Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## בדיקת ההתקנה

1. הריצו את הפרויקט:
```bash
npm run dev
```

2. פתחו את הדפדפן בכתובת `http://localhost:5173`

3. ודאו שאין שגיאות בקונסול

4. בדקו שהחיבור לסופאבייס עובד על ידי ניסיון להוסיף כלי חדש 