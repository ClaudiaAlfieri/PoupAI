import {
  CalendarClock,
  Coins,
  Gift,
  Goal,
  PiggyBank,
  ShoppingBag,
} from 'lucide-react'

import type { InsightData } from '@/services/aiService'

import type { FormStepProps } from '../components/features/Simulation/FormStep'

export const simulationFormSteps = [
  {
    id: 'income',
    icon: Coins,
    title: 'Sua grana mensal 💸',
    question:
      'Quanto você recebe por mês ao todo? (mesada, presentes em dinheiro...)',
    inputProps: {
      placeholder: 'ex: 150,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'expenses',
    icon: ShoppingBag,
    title: 'Seus gastos fixos 🛍️',
    question:
      'Quanto você gasta todo mês com coisas que não mudam? (transporte, lanche, assinaturas...)',
    inputProps: {
      placeholder: 'ex: 60,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'debts',
    icon: Gift,
    title: 'Dívidas ou parcelamentos 😅',
    question:
      'Você deve algo pra alguém ou tem alguma parcela pra pagar por mês? (coloca 0 se não tiver)',
    inputProps: {
      placeholder: 'ex: 20,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'goalName',
    icon: Goal,
    title: 'Seu sonho 🌟',
    question: 'O que você quer conquistar? Pode ser qualquer coisa!',
    inputProps: {
      placeholder: 'ex: Tênis novo, show da Taylor Swift, PS5...',
      maxLength: 50,
    },
  },
  {
    id: 'goalAmount',
    icon: PiggyBank,
    title: 'Quanto custa esse sonho? 💰',
    question: 'Pesquisou o preço? Coloca aqui o valor que você precisa juntar.',
    inputProps: {
      placeholder: 'ex: 300,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'goalDeadline',
    icon: CalendarClock,
    title: 'Quando você quer chegar lá? 🗓️',
    question: 'Em quantos meses você quer realizar esse sonho?',
    inputProps: {
      type: 'number',
      placeholder: 'ex: 6',
      suffix: 'meses',
      min: 1,
      max: 120,
    },
    submitButtonProps: {
      label: 'Ver meu plano',
      emojiIcon: '🚀',
    },
  },
] satisfies FormStepProps[]

export type SimulationFormData = Record<
  (typeof simulationFormSteps)[number]['id'],
  string
>

export type SimulationRecord = SimulationFormData & {
  id: string
  insight?: InsightData
}