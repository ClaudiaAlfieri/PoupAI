import { CalendarClock, PiggyBank, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import LogoLight from '@/assets/images/logo2_PoupAI.png'
import LogoDark from '@/assets/images/logo3_PoupAI.png'
import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { useTheme } from '@/hooks/useTheme'

export function HistoryPage() {
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  const { theme } = useTheme()
  const navigate = useNavigate()

  const simulations = getAllSimulations()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <div className="text-center">
        <img
            src={theme === 'light' ? LogoLight : LogoDark}
            alt="PoupAI"
            className="h-60 w-auto mx-auto "
          />
        <PageHero
          title="Seu histórico 📋"
          subtitle="Todas as simulações que você já fez. Clica em uma pra ver o plano completo!"
        />
      </div>

      {simulations.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          
          <p className="text-muted-foreground text-lg font-medium">
            Você ainda não fez nenhuma simulação.
          </p>
          <p className="text-muted-foreground text-sm">
            Que tal criar a sua primeira agora?
          </p>
          <Button variant="primary" onClick={() => void navigate('/')}>
            Criar simulação
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {simulations
            .slice()
            .reverse()
            .map((sim) => (
              <div
                key={sim.id}
                className="bg-card flex cursor-pointer items-center justify-between rounded-2xl border border-(--border) p-5 shadow-sm transition-all hover:shadow-md"
                onClick={() => void navigate(`/resultado/${sim.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void navigate(`/resultado/${sim.id}`)
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <PiggyBank className="text-primary" size={22} />
                  </div>
                  <div>
                    <p className="font-semibold">{sim.goalName}</p>
                    <div className="text-muted-foreground mt-1 flex items-center gap-3 text-sm">
                      <span>R$ {sim.goalAmount}</span>
                      <span className="flex items-center gap-1">
                        <CalendarClock size={13} />
                        {sim.goalDeadline} meses
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="text-muted-foreground hover:text-destructive ml-4 shrink-0 rounded-lg p-2 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteSimulation(sim.id)
                  }}
                  aria-label="Apagar simulação"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
        </div>
      )}
    </main>
  )
}
