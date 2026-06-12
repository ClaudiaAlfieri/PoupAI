import { Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import MiniLogoLight from '@/assets/images/mini_logo.png'
import MiniLogoDark from '@/assets/images/mini_logo_dark.png'
import { PageHero } from '@/components/shared/PageHero'
import { useTheme } from '@/hooks/useTheme'

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
const MODEL_NAME = 'gemini-2.5-flash'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

const SYSTEM_PROMPT = `Você é o PoupBot, um educador financeiro jovem e descolado especializado em finanças para adolescentes brasileiros entre 12 e 18 anos.
Seu tom é de um amigo mais velho que entende de dinheiro: leve, motivador, sem julgamentos e com linguagem jovem (mas sem gírias exageradas).
Responda SEMPRE em português do Brasil. Não use markdown (sem asteriscos, sem #, sem listas com traço).
Use emojis com moderação. Seja direto e prático. Máximo 3 parágrafos por resposta.
Foque em temas como: mesada, como economizar, metas de compra, pequenos bicos, poupança simples, hábitos financeiros saudáveis.
Nunca julgue os hábitos do adolescente. Se a pergunta não for sobre finanças, redirecione gentilmente para o tema.`

interface Message {
  role: 'user' | 'bot'
  text: string
}

const SUGGESTIONS = [
  'Como guardar dinheiro da mesada? 💰',
  'Qual a diferença entre poupar e investir? 📈',
  'Como ganhar uma graninha extra? 💼',
  'Como criar uma meta de economia? 🎯',
]

export function ChatPage() {
  const { theme } = useTheme()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Oi! 👋 Eu sou o PoupBot, seu parceiro de educação financeira! Pode me perguntar qualquer coisa sobre mesada, economia, metas... estou aqui pra te ajudar!',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMessage: Message = { role: 'user', text: text.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Build conversation history for context
      const history = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }))

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            ...history,
            { role: 'user', parts: [{ text: text.trim() }] },
          ],
        }),
      })

      if (!response.ok) throw new Error('Erro na API')

      const data = (await response.json()) as {
        candidates: { content: { parts: { text: string }[] } }[]
      }
      const botText = data.candidates[0].content.parts[0].text

      setMessages((prev) => [...prev, { role: 'bot', text: botText }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Ih, deu um erro aqui 😅 Tenta de novo daqui a pouco!',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => void sendMessage(input)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage(input)
    }
  }

  return (
    <main className="mx-auto flex max-w-2xl flex-col px-4 py-10 sm:py-14">
      <div className="text-center">
        <PageHero
          title="Tire suas dúvidas 💬"
          subtitle="Pergunte qualquer coisa sobre mesada, economia e metas pra o PoupBot!"
        />
      </div>

      {/* Chat window */}
      <div className="bg-card flex min-h-[400px] flex-col rounded-2xl border border-(--border) shadow-sm">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'bot' && (
                  <img
                    src={theme === 'light' ? MiniLogoLight : MiniLogoDark}
                    alt="PoupBot"
                    className="mr-2 h-8 w-8 shrink-0 rounded-full object-contain"
                  />
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <img
                  src={theme === 'light' ? MiniLogoLight : MiniLogoDark}
                  alt="PoupBot"
                  className="mr-2 h-8 w-8 shrink-0 rounded-full object-contain"
                />
                <div className="bg-muted flex items-center gap-1 rounded-2xl rounded-bl-sm px-4 py-3">
                  <span className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:0ms]" />
                  <span className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:150ms]" />
                  <span className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Suggestions — show only at the start */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 border-t border-(--border) px-4 py-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => void sendMessage(s)}
                className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full border border-(--border) px-3 py-1.5 text-xs transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 border-t border-(--border) p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunta pro PoupBot..."
            disabled={loading}
            className="bg-background flex-1 rounded-xl border border-(--border) px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-(--primary) disabled:opacity-50"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || loading}
            className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-opacity disabled:opacity-40"
            aria-label="Enviar mensagem"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </main>
  )
}
