import { useState } from 'react'
import { supabase } from '../config/supabase'
import type { Database } from '../config/types'

type Tool = Database['public']['Tables']['tools']['Insert']

export default function AddToolForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<Partial<Tool>>({
    name: '',
    description: '',
    url: '',
    is_free: true,
    language: 'multi',
    complexity_level: 1,
    category_ids: [],
    features: []
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // הוספת לוגו אוטומטי מה-URL
      const logo_url = `https://logo.clearbit.com/${new URL(formData.url || '').hostname}`
      
      const { error } = await supabase
        .from('tools')
        .insert([{ ...formData, logo_url }])

      if (error) throw error
      
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'אירעה שגיאה')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(',').map(cat => cat.trim())
    setFormData(prev => ({ ...prev, category_ids: categories }))
  }

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const features = e.target.value.split(',').map(feat => feat.trim())
    setFormData(prev => ({ ...prev, features }))
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">הוספת כלי חדש</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">שם הכלי</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">תיאור</label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">כתובת URL</label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">שפה</label>
              <select
                value={formData.language}
                onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              >
                <option value="multi">רב-לשוני</option>
                <option value="en">אנגלית</option>
                <option value="he">עברית</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">רמת מורכבות</label>
              <select
                value={formData.complexity_level}
                onChange={e => setFormData(prev => ({ ...prev, complexity_level: Number(e.target.value) }))}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              >
                {[1, 2, 3, 4, 5].map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">קטגוריות (מופרדות בפסיקים)</label>
            <input
              type="text"
              required
              placeholder="design, images, content"
              value={formData.category_ids?.join(', ')}
              onChange={handleCategoryChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">תכונות (מופרדות בפסיקים)</label>
            <input
              type="text"
              required
              placeholder="text_to_image, variations, templates"
              value={formData.features?.join(', ')}
              onChange={handleFeaturesChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_free}
              onChange={e => setFormData(prev => ({ ...prev, is_free: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <label className="text-sm font-medium text-gray-700">חינמי</label>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              ביטול
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {isSubmitting ? 'שומר...' : 'הוספה'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 