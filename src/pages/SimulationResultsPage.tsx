import {
  CalendarClock,
  Coins,
  Goal,
  PiggyBank,
  ShoppingBag,
  TrendingDown,
} from 'lucide-react'
import { useParams } from 'react-router-dom'

import { AIInsightsCard } from '@/components/features/SimulationResults/AIInsightCardProps'
import { Card } from '@/components/features/SimulationResults/Card'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'

export function SimulationResultsPage() {
  const { id } = useParams<{ id: string }>()
  const { getFormData } = useSimulationStorage()

  const data = id ? getFormData(id) : null

  if (!data) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-muted-foreground text-lg">
          😕 Simulação não encontrada. Que tal criar uma nova?
        </p>
      </main>
    )
  }

  const monthlySavings = calcMonthlySavings(data)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Seu plano tá pronto! 🎉"
        subtitle="Com base na sua grana e no seu sonho, a gente montou isso pra você."
      />
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          icon={Goal}
          label="Seu sonho"
          value={data.goalAmount}
          subtitle={data.goalName}
        />
        <Card
          icon={CalendarClock}
          label="Seu prazo"
          value={`${data.goalDeadline} meses`}
          subtitle="Tempo que você definiu pra chegar lá"
        />
        <Card
          variant="primary"
          icon={PiggyBank}
          label="Guardar por mês"
          value={`R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="O que você precisa separar todo mês"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <AIInsightsCard simulationId={data.id} />
        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <Card
            icon={Coins}
            label="Sua grana mensal"
            value={data.income}
            subtitle="Tudo que entra por mês"
          />
          <Card
            icon={ShoppingBag}
            label="Gastos fixos"
            value={data.expenses}
            subtitle="O que você gasta todo mês"
          />
          <Card
            icon={TrendingDown}
            label="Dívidas / parcelas"
            value={data.debts}
            subtitle="O que você ainda precisa pagar"
          />
        </div>
      </div>
    </main>
  )
}
