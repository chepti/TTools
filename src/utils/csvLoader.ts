import { Database } from '../config/types'

type Tool = Database['public']['Tables']['tools']['Insert']

const csvData = `name,description,url,is_free,language,complexity_level,category_ids,features
ChatGPT,צ'אט AI חינמי שיכול לעזור בהכנת מערכי שיעור, יצירת תרגילים, והסברים מותאמים אישית,https://chat.openai.com,true,multi,2,"lesson_planning,content_creation,explanation","lesson_customization,question_generation,differentiation"
Claude,עוזר AI מתקדם שמצטיין בניתוח טקסטים, כתיבה יצירתית והסברים מעמיקים,https://claude.ai,true,multi,2,"writing,analysis,research","detailed_explanations,creative_writing,research_assistance"
Bard,כלי AI של Google שמשלב יכולות חיפוש וניתוח. מצוין למחקר ואיסוף מידע,https://bard.google.com,true,multi,2,"research,content,visualization","search_integration,code_generation,visual_analysis"
Canva AI,כלי עיצוב עם יכולות AI ליצירת מצגות, כרזות ותמונות לשיעורים,https://www.canva.com,true,multi,2,"design,presentation,images","magic_design,text_to_image,presentation_generation"
Microsoft Designer,כלי AI ליצירת עיצובים ותמונות מטקסט. חינמי למורים עם חשבון Office 365,https://designer.microsoft.com,true,multi,1,"design,images,content","text_to_image,variations,templates"
Synthesia,יצירת סרטוני הדרכה עם מורה וירטואלי בעברית ושפות נוספות,https://www.synthesia.io,freemium,multi,2,"video,instruction,presentation","avatar_creation,text_to_speech,multiple_languages"
Quillbot,שכתוב וניסוח מחדש של טקסטים, מצוין להתאמת חומרים לרמות שונות,https://quillbot.com,freemium,en,1,"writing,adaptation,language","paraphrasing,simplification,grammar_check"
Beautiful.ai,מצגות מונפשות באמצעות AI עם עיצוב אוטומטי,https://www.beautiful.ai,freemium,en,2,"presentation,design,automation","smart_templates,auto_design,animations"
Wordtune,שיפור וניסוח טקסטים בעברית ואנגלית. מצוין להתאמת רמת שפה,https://www.wordtune.com,freemium,multi,1,"writing,language,adaptation","hebrew_support,tone_adjustment,rewriting"
DALL-E,יצירת תמונות מטקסט לשימוש בחומרי למידה דרך ChatGPT,https://chat.openai.com,freemium,multi,2,"images,creativity,visualization","custom_images,variations,style_control"
Teachermade,המרת דפי עבודה לטפסים דיגיטליים עם בדיקה אוטומטית,https://teachermade.com,freemium,en,2,"assessment,automation,digitization","auto_grading,pdf_conversion,analytics"
Merrill AI,יצירת תוכן לימודי ותרגילים מותאמים אישית,https://www.merrillchatai.com,freemium,en,1,"content_creation,assessment,personalization","custom_exercises,differentiation,lesson_plans"
Gradescope,בדיקת מבחנים ועבודות באמצעות AI,https://www.gradescope.com,freemium,en,2,"assessment,grading,feedback","auto_grading,feedback_generation,rubrics"
Leonardo.ai,יצירת תמונות לחומרי למידה עם שליטה מדויקת בסגנון,https://leonardo.ai,freemium,multi,2,"images,art,visualization","style_control,variations,prompting"
Read.ai,המרת טקסט לדיבור בקולות טבעיים, כולל בעברית,https://read.ai,freemium,multi,1,"accessibility,audio,language","text_to_speech,voice_selection,natural_speech"`

export const parseCSV = (): Tool[] => {
  const lines = csvData.split('\n')
  const headers = lines[0].split(',')
  
  return lines.slice(1).map(line => {
    const values = line.split(',')
    const tool: Tool = {
      name: values[0],
      description: values[1],
      url: values[2],
      is_free: values[3] === 'true',
      language: values[4],
      complexity_level: parseInt(values[5]),
      category_ids: values[6].replace(/"/g, '').split(','),
      features: values[7].replace(/"/g, '').split(','),
      logo_url: `https://logo.clearbit.com/${new URL(values[2]).hostname}`
    }
    return tool
  })
} 