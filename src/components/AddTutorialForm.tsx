import { useState } from 'react'
import { supabase } from '../config/supabase'
import type { Database } from '../config/types'

type Tutorial = Database['public']['Tables']['tutorials']['Insert']

const formatOptions = [
  'מדריך כתוב',
  'סרטון',
  'מצגת',
  'וובינר',
  'תרגול אינטראקטיבי'
]

export default function AddTutorialForm({ toolId, onClose }: { toolId: string; onClose: () => void }) {
  const [formData, setFormData] = useState<Partial<Tutorial>>({
    tool_id: toolId,
    title: '',
    format: 'מדריך כתוב',
    url: '',
    additional_info: '',
    creator: '',
    contributor: '',
    rating: 5
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const { error } = await supabase
        .from('tutorials')
        .insert([formData])

      if (error) throw error
      
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'אירעה שגיאה')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">הוספת הדרכה חדשה</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">כותרת ההדרכה</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">פורמט</label>
            <select
              value={formData.format}
              onChange={e => setFormData(prev => ({ ...prev, format: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              {formatOptions.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">קישור להדרכה</label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">מידע נוסף</label>
            <textarea
              value={formData.additional_info}
              onChange={e => setFormData(prev => ({ ...prev, additional_info: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">קרדיט - מי היוצר?</label>
            <input
              type="text"
              required
              value={formData.creator}
              onChange={e => setFormData(prev => ({ ...prev, creator: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">מי תרם למאגר?</label>
            <input
              type="text"
              required
              value={formData.contributor}
              onChange={e => setFormData(prev => ({ ...prev, contributor: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">דירוג (1-5)</label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.rating}
              onChange={e => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
              className="mt-1 block w-full"
            />
            <div className="text-center">{formData.rating}</div>
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