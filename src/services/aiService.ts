interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
    finishReason?: string
  }[]
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: {
    content: string
  }
  suggestions: {
    items: string[]
  }
  extraIncome: {
    items: string[]
  }
  investment: {
    items: string[]
  }
  motivation: {
    content: string
  }
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
const MODEL_NAME = 'gemini-2.5-flash'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

const callGeminiAPI = async (prompt: string) => {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 4096,
      },
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('Gemini API error:', response.status, data)
    throw new Error(
      `Erro na requisição: ${response.status} - ${JSON.stringify(data)}`,
    )
  }

  console.log('Gemini raw response:', JSON.stringify(data, null, 2))

  return data as GeminiResponse
}

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt)
  const candidate = response.candidates?.[0]

  if (!candidate?.content?.parts?.[0]?.text) {
    console.error('finishReason:', candidate?.finishReason, 'full:', response)
    throw new Error(`Sem conteúdo. finishReason=${candidate?.finishReason}`)
  }

  const json = candidate.content.parts[0].text
  return JSON.parse(json) as InsightData
}