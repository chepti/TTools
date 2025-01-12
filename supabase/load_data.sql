INSERT INTO tools (name, description, url, is_free, language, complexity_level, category_ids, features, logo_url)
VALUES
  ('ChatGPT', 'צ''אט AI חינמי שיכול לעזור בהכנת מערכי שיעור, יצירת תרגילים, והסברים מותאמים אישית', 'https://chat.openai.com', true, 'multi', 2, ARRAY['lesson_planning', 'content_creation', 'explanation'], ARRAY['lesson_customization', 'question_generation', 'differentiation'], 'https://logo.clearbit.com/openai.com'),
  
  ('Claude', 'עוזר AI מתקדם שמצטיין בניתוח טקסטים, כתיבה יצירתית והסברים מעמיקים', 'https://claude.ai', true, 'multi', 2, ARRAY['writing', 'analysis', 'research'], ARRAY['detailed_explanations', 'creative_writing', 'research_assistance'], 'https://logo.clearbit.com/claude.ai'),
  
  ('Bard', 'כלי AI של Google שמשלב יכולות חיפוש וניתוח. מצוין למחקר ואיסוף מידע', 'https://bard.google.com', true, 'multi', 2, ARRAY['research', 'content', 'visualization'], ARRAY['search_integration', 'code_generation', 'visual_analysis'], 'https://logo.clearbit.com/google.com'),
  
  ('Canva AI', 'כלי עיצוב עם יכולות AI ליצירת מצגות, כרזות ותמונות לשיעורים', 'https://www.canva.com', true, 'multi', 2, ARRAY['design', 'presentation', 'images'], ARRAY['magic_design', 'text_to_image', 'presentation_generation'], 'https://logo.clearbit.com/canva.com'),
  
  ('Microsoft Designer', 'כלי AI ליצירת עיצובים ותמונות מטקסט. חינמי למורים עם חשבון Office 365', 'https://designer.microsoft.com', true, 'multi', 1, ARRAY['design', 'images', 'content'], ARRAY['text_to_image', 'variations', 'templates'], 'https://logo.clearbit.com/microsoft.com'),
  
  ('Synthesia', 'יצירת סרטוני הדרכה עם מורה וירטואלי בעברית ושפות נוספות', 'https://www.synthesia.io', false, 'multi', 2, ARRAY['video', 'instruction', 'presentation'], ARRAY['avatar_creation', 'text_to_speech', 'multiple_languages'], 'https://logo.clearbit.com/synthesia.io'),
  
  ('Quillbot', 'שכתוב וניסוח מחדש של טקסטים, מצוין להתאמת חומרים לרמות שונות', 'https://quillbot.com', false, 'en', 1, ARRAY['writing', 'adaptation', 'language'], ARRAY['paraphrasing', 'simplification', 'grammar_check'], 'https://logo.clearbit.com/quillbot.com'),
  
  ('Beautiful.ai', 'מצגות מונפשות באמצעות AI עם עיצוב אוטומטי', 'https://www.beautiful.ai', false, 'en', 2, ARRAY['presentation', 'design', 'automation'], ARRAY['smart_templates', 'auto_design', 'animations'], 'https://logo.clearbit.com/beautiful.ai'),
  
  ('Wordtune', 'שיפור וניסוח טקסטים בעברית ואנגלית. מצוין להתאמת רמת שפה', 'https://www.wordtune.com', false, 'multi', 1, ARRAY['writing', 'language', 'adaptation'], ARRAY['hebrew_support', 'tone_adjustment', 'rewriting'], 'https://logo.clearbit.com/wordtune.com'),
  
  ('DALL-E', 'יצירת תמונות מטקסט לשימוש בחומרי למידה דרך ChatGPT', 'https://chat.openai.com', false, 'multi', 2, ARRAY['images', 'creativity', 'visualization'], ARRAY['custom_images', 'variations', 'style_control'], 'https://logo.clearbit.com/openai.com'),
  
  ('Teachermade', 'המרת דפי עבודה לטפסים דיגיטליים עם בדיקה אוטומטית', 'https://teachermade.com', false, 'en', 2, ARRAY['assessment', 'automation', 'digitization'], ARRAY['auto_grading', 'pdf_conversion', 'analytics'], 'https://logo.clearbit.com/teachermade.com'),
  
  ('Merrill AI', 'יצירת תוכן לימודי ותרגילים מותאמים אישית', 'https://www.merrillchatai.com', false, 'en', 1, ARRAY['content_creation', 'assessment', 'personalization'], ARRAY['custom_exercises', 'differentiation', 'lesson_plans'], 'https://logo.clearbit.com/merrillchatai.com'),
  
  ('Gradescope', 'בדיקת מבחנים ועבודות באמצעות AI', 'https://www.gradescope.com', false, 'en', 2, ARRAY['assessment', 'grading', 'feedback'], ARRAY['auto_grading', 'feedback_generation', 'rubrics'], 'https://logo.clearbit.com/gradescope.com'),
  
  ('Leonardo.ai', 'יצירת תמונות לחומרי למידה עם שליטה מדויקת בסגנון', 'https://leonardo.ai', false, 'multi', 2, ARRAY['images', 'art', 'visualization'], ARRAY['style_control', 'variations', 'prompting'], 'https://logo.clearbit.com/leonardo.ai'),
  
  ('Read.ai', 'המרת טקסט לדיבור בקולות טבעיים, כולל בעברית', 'https://read.ai', false, 'multi', 1, ARRAY['accessibility', 'audio', 'language'], ARRAY['text_to_speech', 'voice_selection', 'natural_speech'], 'https://logo.clearbit.com/read.ai'); 