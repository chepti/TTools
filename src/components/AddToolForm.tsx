import { useState } from 'react'
import { supabase } from '../config/supabase'
import type { Database } from '../config/types'

type Tool = Database['public']['Tables']['tools']['Insert']

const outputTypeOptions = [
  'טקסט',
  'תרשים',
  'אפליקציה',
  'טבלה',
  'תמונה',
  'סרטון',
  'קול'
]

const pedagogicalContextOptions = [
  'הוראה',
  'למידה',
  'הערכה',
  'תכנון',
  'ארגון',
  'תקשורת'
]

const communicationFormatOptions = [
  'צ\'אט',
  'טופס',
  'עורך',
  'מחולל',
  'מנתח'
]

export default function AddToolForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<Partial<Tool>>({
    name: '',
    description: '',
    url: '',
    hebrew_support: 3,
    free_tier: 3,
    fun_factor: 3,
    pedagogical_value: 3,
    output_types: [],
    pedagogical_contexts: [],
    communication_format: 'צ\'אט',
    complexity_level: 3
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

  const handleArrayChange = (field: keyof Tool, value: string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">תמיכה בעברית (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.hebrew_support}
                onChange={e => setFormData(prev => ({ ...prev, hebrew_support: Number(e.target.value) }))}
                className="mt-1 block w-full"
              />
              <div className="text-center">{formData.hebrew_support}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">רמת חינמיות (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.free_tier}
                onChange={e => setFormData(prev => ({ ...prev, free_tier: Number(e.target.value) }))}
                className="mt-1 block w-full"
              />
              <div className="text-center">{formData.free_tier}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">רמת חוויתיות (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.fun_factor}
                onChange={e => setFormData(prev => ({ ...prev, fun_factor: Number(e.target.value) }))}
                className="mt-1 block w-full"
              />
              <div className="text-center">{formData.fun_factor}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ערך פדגוגי (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.pedagogical_value}
                onChange={e => setFormData(prev => ({ ...prev, pedagogical_value: Number(e.target.value) }))}
                className="mt-1 block w-full"
              />
              <div className="text-center">{formData.pedagogical_value}</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">סוגי תוצרים</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {outputTypeOptions.map(type => (
                <label key={type} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.output_types?.includes(type)}
                    onChange={e => {
                      const newTypes = e.target.checked
                        ? [...(formData.output_types || []), type]
                        : (formData.output_types || []).filter(t => t !== type)
                      handleArrayChange('output_types', newTypes)
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="mr-2">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">הקשרים פדגוגיים</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {pedagogicalContextOptions.map(context => (
                <label key={context} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.pedagogical_contexts?.includes(context)}
                    onChange={e => {
                      const newContexts = e.target.checked
                        ? [...(formData.pedagogical_contexts || []), context]
                        : (formData.pedagogical_contexts || []).filter(c => c !== context)
                      handleArrayChange('pedagogical_contexts', newContexts)
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="mr-2">{context}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">פורמט תקשורת</label>
            <select
              value={formData.communication_format}
              onChange={e => setFormData(prev => ({ ...prev, communication_format: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              {communicationFormatOptions.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">רמת מורכבות (1-5)</label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.complexity_level}
              onChange={e => setFormData(prev => ({ ...prev, complexity_level: Number(e.target.value) }))}
              className="mt-1 block w-full"
            />
            <div className="text-center">{formData.complexity_level}</div>
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