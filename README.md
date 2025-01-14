# כלי AI לחינוך - מאגר כלים והדרכות

פרויקט זה מהווה פלטפורמה אינטראקטיבית לאיתור והמלצה על כלי AI המתאימים לצרכים חינוכיים. המערכת כוללת צ'אטבוט חכם המסייע למורים למצוא את הכלים המתאימים ביותר עבורם, וכן מאפשרת לקהילת המורים לשתף הדרכות ודוגמאות שימוש.

## תכונות עיקריות

- 🤖 צ'אטבוט אינטראקטיבי המתאים כלים לפי צרכי המשתמש
- 📚 מאגר כלי AI מקוטלג
- 📝 הדרכות ומדריכים לשימוש בכלים
- 💡 דוגמאות שימוש מהשטח
- 🌐 תמיכה בעברית
- 👥 אפשרות לתרומת תוכן מהקהילה

## טכנולוגיות

- **Frontend**: React + TypeScript
- **UI**: Tailwind CSS
- **Backend**: Supabase
- **Hosting**: Vercel

## מבנה הפרויקט

```
src/
├── components/          # קומפוננטות React
│   ├── AddToolForm     # טופס הוספת כלי חדש
│   ├── AddTutorialForm # טופס הוספת הדרכה
│   ├── AddExampleForm  # טופס הוספת דוגמה
│   └── ChatInterface   # ממשק הצ'אט
├── config/             # קבצי קונפיגורציה
│   ├── supabase.ts    # התחברות לסופאבייס
│   └── types.ts       # טיפוסי TypeScript
├── styles/            # קבצי CSS
└── types/             # הגדרות טיפוסים

supabase/             # הגדרות מסד הנתונים
└── schema.sql        # סכמת בסיס הנתונים
```

## התקנה והרצה

1. התקנת תלויות:
```bash
npm install
```

2. הגדרת משתני סביבה:
יש ליצור קובץ `.env` עם המשתנים הבאים:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. הרצת הפרויקט:
```bash
npm run dev
```

## מבנה בסיס הנתונים

### טבלת tools
- id: UUID (מזהה ייחודי)
- name: שם הכלי
- description: תיאור
- url: כתובת האתר
- logo_url: לוגו (נוצר אוטומטית)
- hebrew_support: רמת תמיכה בעברית (1-5)
- free_tier: רמת חינמיות (1-5)
- fun_factor: רמת חוויתיות (1-5)
- pedagogical_value: ערך פדגוגי (1-5)
- output_types: סוגי תוצרים
- pedagogical_contexts: הקשרים פדגוגיים
- communication_format: פורמט תקשורת
- complexity_level: רמת מורכבות (1-5)

### טבלת tutorials
- id: UUID
- tool_id: מזהה הכלי
- title: כותרת
- format: פורמט
- url: קישור
- additional_info: מידע נוסף
- creator: יוצר
- contributor: תורם
- rating: דירוג (1-5)

### טבלת examples
- id: UUID
- tool_id: מזהה הכלי
- url: קישור
- title: כותרת
- description: תיאור/פרומפט
- creator: יוצר
- contributor: תורם
- rating: דירוג (1-5)

## תרומה לפרויקט

1. עשו fork לפרויקט
2. צרו branch חדש לתכונה שלכם
3. בצעו commit לשינויים
4. דחפו ל-branch
5. פתחו Pull Request 