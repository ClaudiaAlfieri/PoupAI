import { parseCurrency } from '@/utils/currency'
import { calcMonthlySavings } from '@/utils/simulation'

import type { SimulationRecord } from './simulation'

const RESPONSE_SCHEMA = `{
  "feasibility": {
    "status": "viable" | "needs_adjustment" | "unfeasible",
    "content": "<Análise se o sonho é realizável no prazo. Use linguagem jovem e motivadora. Cite os valores calculados.>"
  },
  "diagnosis": {
    "content": "<Diagnóstico do orçamento do adolescente: quanto % da grana está comprometida e o que isso significa para o dia a dia dele.>"
  },
  "suggestions": {
    "items": ["<Dica prática e real para adolescente economizar mais no dia a dia>"]
  },
  "extraIncome": {
    "items": ["<Ideia concreta para adolescente ganhar uma graninha extra, como bicos, freelas simples, vender algo, etc.>"]
  },
  "investment": {
    "items": ["<Sugestão simples de como fazer o dinheiro render: cofrinho digital, poupança, CDB de fácil acesso, etc.>"]
  },
  "motivation": {
    "content": "<Mensagem final animada e personalizada, citando o sonho pelo nome, com linguagem de amigo/mentor jovem.>"
  }
}`

export function buildAIPrompt(simulation: SimulationRecord) {
  const { income, expenses, debts, goalName, goalAmount, goalDeadline } =
    simulation

  const monthlySavings = calcMonthlySavings(simulation)
  const monthlySavingsNeeded =
    parseCurrency(goalAmount) / parseInt(goalDeadline)

  return `Você é um educador financeiro jovem e descolado, especializado em finanças para adolescentes brasileiros entre 12 e 18 anos.
    Seu tom é de um amigo mais velho que entende de dinheiro: leve, motivador, sem julgamentos e com linguagem jovem (mas sem gírias exageradas).
    Analise os dados abaixo e gere um diagnóstico financeiro personalizado, divertido e prático.
    O diagnóstico será exibido diretamente ao adolescente no app, fale sempre em segunda pessoa ("você tem...", "seu sonho...").
    Evite vocabulário técnico. Prefira "grana" a "renda", "gastinhos" a "despesas fixas", "dívida" a "passivo", etc.
    Não use markdown. Não julgue os hábitos do usuário.

    Dados da simulação:
    - Grana mensal total: ${income}
    - Gastos fixos por mês: ${expenses}
    - Dívidas/parcelas mensais: ${debts}
    - Valor disponível por mês: ${monthlySavings} reais
    - Sonho: ${goalName}
    - Quanto custa: ${goalAmount}
    - Prazo desejado: ${goalDeadline} meses
    - Quanto precisa guardar por mês para chegar lá: ${monthlySavingsNeeded} reais
    - Sobra depois de guardar para o sonho: ${monthlySavings - monthlySavingsNeeded} reais

    Retorne APENAS um JSON válido, sem texto adicional, sem blocos de código, neste formato exato:

    ${RESPONSE_SCHEMA}

    Regras:
    - Todos os textos em português do Brasil
    - Máximo de 4 itens por lista
    - Seja específico ao citar valores calculados
    - Não repita informações entre seções
    - Nunca use markdown dentro dos valores do JSON
    - Use emojis com moderação nos textos (1 ou 2 por campo)
    - Para o campo "feasibility.status", use os seguintes critérios:
      - "viable": saldo após reserva para a meta é maior ou igual a 0
      - "needs_adjustment": saldo negativo de até 20% do valor da economia mensal necessária
      - "unfeasible": saldo negativo superior a 20% do valor da economia mensal necessária`
}