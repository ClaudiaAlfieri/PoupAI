import LogoLight from '@/assets/images/logo2_PoupAI.png'
import LogoDark from '@/assets/images/logo3_PoupAI.png'
import { useTheme } from '@/hooks/useTheme'

export function SimulationHero() {
  const { theme } = useTheme()

  return (
    <div className="mb-4 text-center">
      <div className="mb-2 flex justify-center">
        <img
          src={theme === 'light' ? LogoLight : LogoDark}
          alt="PoupAI"
          className="h-60 w-auto"
        />
      </div>
      <h1 className="text-foreground mb-2 text-3xl font-semibold sm:text-4xl">
        Bora realizar seus sonhos?
      </h1>
      <p className="text-muted-foreground text-m">
        Responde algumas perguntas e a gente monta um plano pra você juntar a
        grana!
      </p>
    </div>
  )
}
