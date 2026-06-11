import { Clock, MessageCircle, Moon, Sun, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import MiniLogoLight from '@/assets/images/mini_logo.png'
import MiniLogoDark from '@/assets/images/mini_logo_dark.png'
import { useTheme } from '@/hooks/useTheme'

import { Button } from './Button'
import { Divider } from './Divider'

export function Header() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-(--border) bg-card px-6 py-3">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => void navigate('/')}
          className="flex items-center gap-2"
          aria-label="Ir para início"
        >
          <img
            src={theme === 'light' ? MiniLogoLight : MiniLogoDark}
            alt="PoupAI"
            className="h-10 w-auto"
          />
          <h1 className="text-2xl font-medium leading-none text-primary">
            Poup<strong className="font-extrabold">AI</strong>
          </h1>
        </button>

        {/* Actions Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            icon={TrendingUp}
            onClick={() => void navigate('/')}
          >
            <span className="hidden sm:inline">Nova Simulação</span>
          </Button>
          <Button
            variant="ghost"
            icon={Clock}
            onClick={() => void navigate('/historico')}
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Button
            variant="ghost"
            icon={MessageCircle}
            onClick={() => void navigate('/chat')}
          >
            <span className="hidden sm:inline">Tirar dúvidas</span>
          </Button>
          <Divider orientation="vertical" />
          <Button
            aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            variant="ghost"
            icon={theme === 'light' ? Moon : Sun}
            onClick={toggleTheme}
          />
        </div>
      </nav>
    </header>
  )
}
