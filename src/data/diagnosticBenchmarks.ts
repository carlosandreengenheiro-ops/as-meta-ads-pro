import { CampaignMetricsInput, DiagnosticReport, MetricAnalysisResult, NivelConfiancaType, StatusType } from '../types';

export const INDUSTRY_PRESETS = [
  {
    id: 'ecommerce',
    label: 'E-commerce & Produtos Físicos',
    description: 'Exemplo: Vendas diretas no site ou loja virtual.',
    sample: {
      investimento: 1500,
      impressoes: 75000,
      alcance: 50000,
      cliquesLink: 1125,
      compras: 30,
      faturamento: 4500,
    }
  },
  {
    id: 'whatsapp_leads',
    label: 'Geração de Leads & WhatsApp',
    description: 'Exemplo: Mensagens, cadastros e vendas diretas no atendimento.',
    sample: {
      investimento: 800,
      impressoes: 40000,
      alcance: 25000,
      cliquesLink: 600,
      compras: 40,
      faturamento: 3200,
    }
  },
  {
    id: 'infoproduto',
    label: 'Infoprodutos & Serviços High Ticket',
    description: 'Exemplo: Lançamentos, e-books, serviços e mentorias.',
    sample: {
      investimento: 2500,
      impressoes: 100000,
      alcance: 62500,
      cliquesLink: 1500,
      compras: 25,
      faturamento: 7500,
    }
  }
];

// Mathematical formatting helpers (strictly Portuguese decimal standard)
const formatMoney = (val: number): string => `R$ ${val.toFixed(2).replace('.', ',')}`;
const formatPercent = (val: number): string => `${val.toFixed(2).replace('.', ',')}%`;
const formatMultiplier = (val: number): string => `${val.toFixed(2).replace('.', ',')}x`;

export function runDiagnosticEngine(input: CampaignMetricsInput): DiagnosticReport {
  const inv = typeof input.investimento === 'number' ? input.investimento : 0;
  const imp = typeof input.impressoes === 'number' ? input.impressoes : 0;
  const alc = typeof input.alcance === 'number' ? input.alcance : 0;
  const clk = typeof input.cliquesLink === 'number' ? input.cliquesLink : 0;
  const cmp = typeof input.compras === 'number' ? input.compras : 0;
  const fat = typeof input.faturamento === 'number' ? input.faturamento : 0;
  const custeio = typeof input.custeioExtra === 'number' ? input.custeioExtra : 0;

  // Strict mathematical calculations without artificial rounding
  const cpm = imp > 0 ? (inv / imp) * 1000 : null;
  const ctr = imp > 0 ? (clk / imp) * 100 : null;
  const cpc = clk > 0 ? inv / clk : null;
  const frequencia = alc > 0 ? imp / alc : null;
  const cpa = cmp > 0 ? inv / cmp : null;
  const roas = inv > 0 ? fat / inv : null;
  const taxaConversao = clk > 0 ? (cmp / clk) * 100 : null;
  const lucroLiquido = fat - inv - custeio;
  const roi = inv > 0 ? (lucroLiquido / inv) * 100 : null;

  const metrics: MetricAnalysisResult[] = [];

  // 1. CPM Analysis (Custo por Mil Impressões)
  if (cpm !== null) {
    let status: StatusType = 'BOM';
    let explanation = '';
    let recommendation = '';

    if (cpm <= 20) {
      status = 'BOM';
      explanation = `Seu CPM de ${formatMoney(cpm)} indica entrega com custo favorável no leilão do MetaAds.`;
      recommendation = 'O custo por impressão está competitivo. Monitore a retenção e a relevância do anúncio para manter este patamar.';
    } else if (cpm <= 38) {
      status = 'ATENÇÃO';
      explanation = `Seu CPM de ${formatMoney(cpm)} situa-se na média de referência do mercado, indicando concorrência moderada no leilão.`;
      recommendation = 'Para buscar redução no CPM, experimente segmentações de público mais amplas ou melhore a taxa de engajamento dos criativos.';
    } else {
      status = 'CRÍTICO';
      explanation = `Seu CPM de ${formatMoney(cpm)} está elevado em relação aos parâmetros de referência do mercado.`;
      recommendation = 'Revise a segmentação (públicos muito restritos ou sobrepostos elevam o custo) e certifique-se da relevância do anúncio para o público.';
    }

    metrics.push({
      id: 'cpm',
      label: 'CPM (Custo por 1.000 Impressões)',
      valueFormatted: formatMoney(cpm),
      unit: 'R$',
      status,
      explanation,
      recommendation,
      benchmark: 'Referência de mercado (não absoluta): BOM ≤ R$ 20,00 | ATENÇÃO R$ 20 - R$ 38 | CRÍTICO > R$ 38,00'
    });
  }

  // 2. CTR Analysis (Taxa de Cliques no Link)
  if (ctr !== null) {
    let status: StatusType = 'BOM';
    let explanation = '';
    let recommendation = '';
    
    if (ctr >= 1.5) {
      status = 'BOM';
      explanation = `Seu CTR de ${formatPercent(ctr)} indica que o criativo possui bom poder de atração e desperta interesse no feed.`;
      recommendation = 'Mantenha a linha conceitual deste criativo e teste variações preservando o gancho (hook) inicial.';
    } else if (ctr >= 0.8) {
      status = 'ATENÇÃO';
      explanation = `Seu CTR de ${formatPercent(ctr)} está em nível aceitável, mas indica que parte relevante do público ignora a peça visual.`;
      recommendation = 'Aprimore o gancho visual nos primeiros 3 segundos ou teste novos títulos e chamadas para ação (CTA).';
    } else {
      status = 'CRÍTICO';
      explanation = `Seu CTR de ${formatPercent(ctr)} está abaixo dos níveis de referência de mercado.`;
      recommendation = 'O anúncio não está retendo a atenção necessária. Teste novos formatos visuais, abordagens de copy ou alinhamento com a audiência.';
    }

    metrics.push({
      id: 'ctr',
      label: 'CTR (Taxa de Cliques no Link)',
      valueFormatted: formatPercent(ctr),
      unit: '%',
      status,
      explanation,
      recommendation,
      benchmark: 'Referência de mercado (não absoluta): BOM ≥ 1,50% | ATENÇÃO 0,80% - 1,50% | CRÍTICO < 0,80%'
    });
  }

  // 3. CPC Analysis (Custo por Clique no Link)
  if (cpc !== null) {
    let status: StatusType = 'BOM';
    let explanation = '';
    let recommendation = '';

    if (cpc <= 1.80) {
      status = 'BOM';
      explanation = `Seu CPC de ${formatMoney(cpc)} é eficiente, gerando tráfego ao destino com baixo custo por visitante.`;
      recommendation = 'Assegure que a página de destino seja veloz e otimizada para dispositivos móveis.';
    } else if (cpc <= 3.50) {
      status = 'ATENÇÃO';
      explanation = `Seu CPC de ${formatMoney(cpc)} situa-se em um patamar intermediário de investimento por clique.`;
      recommendation = 'Busque elevar o CTR do anúncio, o que reduzirá naturalmente o custo individual por clique.';
    } else {
      status = 'CRÍTICO';
      explanation = `Seu CPC de ${formatMoney(cpc)} está elevado segundo os parâmetros de referência.`;
      recommendation = 'O anúncio está atraindo poucos cliques para a verba investida. Avalie se a promessa do anúncio conversa com a real dor do público.';
    }

    metrics.push({
      id: 'cpc',
      label: 'CPC (Custo por Clique no Link)',
      valueFormatted: formatMoney(cpc),
      unit: 'R$',
      status,
      explanation,
      recommendation,
      benchmark: 'Referência de mercado (não absoluta): BOM ≤ R$ 1,80 | ATENÇÃO R$ 1,80 - R$ 3,50 | CRÍTICO > R$ 3,50'
    });
  }

  // 4. Frequency Analysis (Frequência)
  if (frequencia !== null) {
    let status: StatusType = 'BOM';
    let explanation = '';
    let recommendation = '';

    if (frequencia <= 2.2) {
      status = 'BOM';
      explanation = `Sua Frequência de ${formatMultiplier(frequencia)} indica distribuição equilibrada sem saturação do público.`;
      recommendation = 'Não há indício de desgaste ou fadiga de anúncios no momento.';
    } else if (frequencia <= 3.2) {
      status = 'ATENÇÃO';
      explanation = `Sua Frequência de ${formatMultiplier(frequencia)} indica repetição moderada dos anúncios para as mesmas pessoas.`;
      recommendation = 'Monitore eventual queda no CTR. Prepare novos criativos ou considere ampliar o tamanho do público.';
    } else {
      status = 'CRÍTICO';
      explanation = `Sua Frequência de ${formatMultiplier(frequencia)} está alta, apontando risco de saturação da audiência.`;
      recommendation = 'Renove os criativos ou expanda o público-alvo para evitar perda de eficiência por repetição excessiva.';
    }

    metrics.push({
      id: 'frequencia',
      label: 'Frequência de Exibição',
      valueFormatted: formatMultiplier(frequencia),
      unit: 'x',
      status,
      explanation,
      recommendation,
      benchmark: 'Referência de mercado (não absoluta): BOM 1,00 - 2,20x | ATENÇÃO 2,20 - 3,20x | CRÍTICO > 3,20x'
    });
  }

  // 5. CPA Analysis (Custo por Aquisição / Conversão)
  if (cpa !== null) {
    let status: StatusType = 'BOM';
    let explanation = '';
    let recommendation = '';

    const percentOfRevenue = fat > 0 && cmp > 0 ? (cpa / (fat / cmp)) * 100 : null;

    if (percentOfRevenue !== null) {
      if (percentOfRevenue <= 25) {
        status = 'BOM';
        explanation = `Seu CPA de ${formatMoney(cpa)} consome ${percentOfRevenue.toFixed(1).replace('.', ',')}% do ticket médio. Margem de contribuição saudável.`;
        recommendation = 'Custo de aquisição dentro da margem planejada. Avalie possibilidades de otimização contínua.';
      } else if (percentOfRevenue <= 45) {
        status = 'ATENÇÃO';
        explanation = `Seu CPA de ${formatMoney(cpa)} representa ${percentOfRevenue.toFixed(1).replace('.', ',')}% do valor médio de venda.`;
        recommendation = 'Acompanhe a margem líquida da operação e considere estratégias para elevar o ticket médio (como ofertas combinadas).';
      } else {
        status = 'CRÍTICO';
        explanation = `Seu CPA de ${formatMoney(cpa)} consome ${percentOfRevenue.toFixed(1).replace('.', ',')}% do valor de venda, pressionando a margem.`;
        recommendation = 'Investigue toda a jornada de conversão para reduzir o custo de aquisição ou reestruturar a oferta comercial.';
      }
    } else {
      status = 'ATENÇÃO';
      explanation = `Seu CPA atual é de ${formatMoney(cpa)} por conversão/venda registrada.`;
      recommendation = 'Compare este valor com o seu CPA Máximo aceitável para assegurar lucratividade no negócio.';
    }

    metrics.push({
      id: 'cpa',
      label: 'CPA (Custo por Aquisição / Conversão)',
      valueFormatted: formatMoney(cpa),
      unit: 'R$',
      status,
      explanation,
      recommendation,
      benchmark: 'Referência de mercado (não absoluta): Alvo médio < 30% do ticket médio obtido'
    });
  }

  // 6. ROAS Analysis (Retorno sobre Investimento em Anúncios)
  if (roas !== null) {
    let status: StatusType = 'BOM';
    let explanation = '';
    let recommendation = '';

    if (roas >= 3.0) {
      status = 'BOM';
      explanation = `Seu ROAS de ${formatMultiplier(roas)} é positivo. Para cada R$ 1,00 investido, a campanha retornou ${formatMoney(roas)} em faturamento bruto.`;
      recommendation = 'Campanha lucrativa em receita bruta. Avalie o volume de dados e estabilidade para considerar expansão gradual.';
    } else if (roas >= 1.5) {
      status = 'ATENÇÃO';
      explanation = `Seu ROAS de ${formatMultiplier(roas)} gera retorno, mas exige atenção dependendo da margem de lucro dos produtos/serviços.`;
      recommendation = 'Otimize pontos de atrito na conversão do destino para melhorar o retorno financeiro.';
    } else {
      status = 'CRÍTICO';
      explanation = `Seu ROAS de ${formatMultiplier(roas)} está abaixo do parâmetro de referência de mercado (< 1,50x).`;
      recommendation = 'A receita gerada está comprimida. Avalie a oferta, preço, atração do anúncio e conversão na página.';
    }

    metrics.push({
      id: 'roas',
      label: 'ROAS (Retorno sobre Investimento em Anúncios)',
      valueFormatted: formatMultiplier(roas),
      unit: 'x',
      status,
      explanation,
      recommendation,
      benchmark: 'Referência de mercado (não absoluta): BOM ≥ 3,00x | ATENÇÃO 1,50x - 3,00x | CRÍTICO < 1,50x'
    });
  }

  // 7. Conversion Rate (Clique -> Venda)
  if (taxaConversao !== null) {
    let status: StatusType = 'BOM';
    let explanation = '';
    let recommendation = '';

    if (taxaConversao >= 2.0) {
      status = 'BOM';
      explanation = `Sua Taxa de Conversão no destino é de ${formatPercent(taxaConversao)}, demonstrando bom alinhamento entre anúncio e página.`;
      recommendation = 'Alinhamento saudável. Mantenha o direcionamento de tráfego qualificado.';
    } else if (taxaConversao >= 1.0) {
      status = 'ATENÇÃO';
      explanation = `Sua Taxa de Conversão de ${formatPercent(taxaConversao)} é aceitável, mas aponta potencial de otimização na página.`;
      recommendation = 'Verifique a velocidade de carregamento e insira elementos de prova social e clareza no destino.';
    } else {
      status = 'CRÍTICO';
      explanation = `Sua Taxa de Conversão de ${formatPercent(taxaConversao)} está baixa segundo as referências de mercado.`;
      recommendation = 'Há vazamento de tráfego no destino. Investigue se há problemas de usabilidade na página, frete/preço inesperado ou divergência entre anúncio e oferta.';
    }

    metrics.push({
      id: 'taxaConversao',
      label: 'Taxa de Conversão do Destino (Cliques → Compras)',
      valueFormatted: formatPercent(taxaConversao),
      unit: '%',
      status,
      explanation,
      recommendation,
      benchmark: 'Referência de mercado (não absoluta): BOM ≥ 2,00% | ATENÇÃO 1,00% - 2,00% | CRÍTICO < 1,00%'
    });
  }

  // -------------------------------------------------------------
  // NÍVEL DE CONFIANÇA DO DIAGNÓSTICO (Requirement 7)
  // -------------------------------------------------------------
  let nivelConfianca: NivelConfiancaType = 'Dados insuficientes';
  let justificativaConfianca = '';

  if (imp === 0 && clk === 0) {
    nivelConfianca = 'Dados insuficientes';
    justificativaConfianca = 'Nenhum dado de veiculação foi inserido. Preencha os campos para calcular a amostragem.';
  } else if (imp < 1000 || clk < 20) {
    nivelConfianca = 'Dados insuficientes';
    justificativaConfianca = `Amostragem atual muito reduzida (${imp.toLocaleString('pt-BR')} impressões e ${clk} cliques). Volume insuficiente para conclusões estatisticamente seguras; os resultados podem flutuar consideravelmente.`;
  } else if (imp < 10000 || clk < 100 || cmp < 5) {
    nivelConfianca = 'Diagnóstico preliminar';
    justificativaConfianca = `Amostragem em consolidação (${imp.toLocaleString('pt-BR')} impressões, ${clk} cliques e ${cmp} conversões). Fornece tendências táticas importantes, mas ainda sujeitas a oscilações normais do leilão.`;
  } else {
    nivelConfianca = 'Diagnóstico consistente';
    justificativaConfianca = `Amostragem estatística consistente (${imp.toLocaleString('pt-BR')} impressões, ${clk} cliques e ${cmp} conversões). Volume sólido que permite conclusões analíticas seguras sobre o desempenho da campanha.`;
  }

  // -------------------------------------------------------------
  // HOLISTIC DIAGNOSIS & DYNAMIC RECOMMENDATION (Requirements 4, 5, 6)
  // -------------------------------------------------------------
  const criticalCount = metrics.filter(m => m.status === 'CRÍTICO').length;
  const warningCount = metrics.filter(m => m.status === 'ATENÇÃO').length;

  let overallStatus: StatusType = 'BOM';
  let overallSummary = '';
  let diagnosticoTexto = '';
  let proximaAcaoRecomendada = '';

  if (metrics.length === 0) {
    overallStatus = 'N/A';
    overallSummary = 'Insira os dados da sua campanha no formulário para gerar uma auditoria técnica em tempo real.';
    diagnosticoTexto = 'Nenhum dado fornecido para análise.';
    proximaAcaoRecomendada = 'Preencha os campos do formulário para gerar a análise técnica.';
  } else {
    // Determine overall health based on metric combination
    if (criticalCount >= 2 || (roas !== null && roas < 1.2 && (imp >= 1000 || clk >= 20))) {
      overallStatus = 'CRÍTICO';
      overallSummary = `Análise do conjunto de métricas identifica ${criticalCount} indicador(es) crítico(s) e ${warningCount} em atenção. Recomenda-se cautela no investimento até solucionar os gargalos.`;
    } else if (criticalCount === 1 || warningCount >= 2) {
      overallStatus = 'ATENÇÃO';
      overallSummary = `Sua campanha opera em patamar intermediário com ${warningCount} ponto(s) de atenção. Existem oportunidades claras de otimização na jornada.`;
    } else {
      overallStatus = 'BOM';
      overallSummary = 'O conjunto dos indicadores analisados demonstra desempenho equilibrado e saudável dentro das referências de mercado.';
    }

    // Diagnostic text considering combination of metrics
    const parts: string[] = [];
    parts.push(`Análise integrada das métricas (${nivelConfianca.toUpperCase()}):`);

    if (ctr !== null && cpc !== null && ctr >= 1.5 && cpc > 2.5) {
      parts.push(`Seu anúncio apresenta alto poder de atração (CTR de ${formatPercent(ctr)}), porém o custo por clique está elevado (${formatMoney(cpc)}). Isso sinaliza concorrência no leilão ou público-alvo demasiadamente restrito.`);
    } else if (ctr !== null && ctr < 0.8) {
      parts.push(`A taxa de cliques (CTR de ${formatPercent(ctr)}) está abaixo da referência, indicando atrito no topo do funil (criativo/gancho visual não retém a atenção no feed).`);
    } else if (ctr !== null) {
      parts.push(`A atração do anúncio apresenta comportamento adequado (CTR de ${formatPercent(ctr)}).`);
    }

    if (clk >= 20 && taxaConversao !== null && taxaConversao < 1.0) {
      parts.push(`Há perda de eficiência na transição entre o anúncio e o destino: apesar de gerar cliques, a taxa de conversão na página está em ${formatPercent(taxaConversao)}.`);
    } else if (taxaConversao !== null && taxaConversao >= 2.0) {
      parts.push(`A taxa de conversão no destino (${formatPercent(taxaConversao)}) demonstra bom alinhamento entre a promessa do anúncio e a oferta da página.`);
    }

    if (roas !== null && roas >= 2.5) {
      parts.push(`O retorno financeiro bruto (ROAS de ${formatMultiplier(roas)}) indica viabilidade econômica e geração de receita sobre o investimento em anúncios.`);
    } else if (roas !== null && roas < 1.5) {
      parts.push(`O retorno sobre investimento (ROAS de ${formatMultiplier(roas)}) está comprimido, exigindo atenção para garantir sustentabilidade financeira.`);
    }

    parts.push(`*Nota de interpretação: Os indicadores BOM, ATENÇÃO e CRÍTICO representam parâmetros de referência de mercado baseados em médias de Meta Ads, devendo ser avaliados no contexto do seu nicho, ticket médio e margem comercial.`);

    diagnosticoTexto = parts.join(' ');

    // Dynamic "PRÓXIMA AÇÃO RECOMENDADA" based on decision hierarchy
    if (imp < 1000 || clk < 20) {
      proximaAcaoRecomendada = 'Coletar mais dados. O volume atual de veiculação ainda é reduzido para decisões drásticas de otimização. Mantenha a veiculação estável até acumular mais histórico de impressões e cliques.';
    } else if (ctr !== null && ctr < 0.8) {
      proximaAcaoRecomendada = 'Investigar criativo, mensagem e aderência ao público. Como o CTR está baixo, o foco deve ser a criação de 2 a 3 novas abordagens de anúncios com ganchos visuais e promessas mais diretas para recuperar a atenção no feed.';
    } else if (ctr !== null && ctr >= 1.5 && (cpc !== null && cpc > 2.5 || cpm !== null && cpm > 38)) {
      proximaAcaoRecomendada = 'Investigar público, posicionamento e leilão. O criativo gera interesse (CTR saudável), mas o clique custa caro. Teste segmentações mais amplas (como público aberto) e verifique se há sobreposição no leilão.';
    } else if (clk >= 30 && (taxaConversao !== null && taxaConversao < 1.0 || (cpa !== null && fat > 0 && cmp > 0 && (cpa / (fat / cmp)) > 0.45))) {
      proximaAcaoRecomendada = 'Investigar página de destino, oferta, checkout e evento de conversão. O tráfego chega ao destino, porém ocorrem desistências antes da conversão. Avalie velocidade de carregamento, clareza da proposta, valor de frete/preço e integração do pixel/CAPI.';
    } else if (cpa !== null && roas !== null && roas < 1.5) {
      proximaAcaoRecomendada = 'Investigar toda a cadeia entre o anúncio e a conversão final. O custo por aquisição está comprometendo a rentabilidade. Otimize a jornada e estude estratégias de aumento do ticket médio (como order bumps) para viabilizar a operação.';
    } else if (roas !== null && roas >= 2.5 && (nivelConfianca === 'Diagnóstico consistente' || nivelConfianca === 'Diagnóstico preliminar')) {
      proximaAcaoRecomendada = 'Considerar escala gradual como possibilidade. A campanha demonstra saúde e retorno positivo. Se os objetivos do negócio demandarem expansão, avalie testar aumentos graduais no orçamento ou novos públicos, acompanhando diariamente o ROAS.';
    } else {
      proximaAcaoRecomendada = 'Manter acompanhamento e realizar testes A/B pontuais. A campanha opera em patamar equilibrado. Acompanhe a estabilidade dos indicadores e introduza novos criativos periodicamente sem interromper os conjuntos performantes.';
    }
  }

  return {
    overallStatus,
    overallSummary,
    metrics,
    diagnosticoTexto,
    proximaAcaoRecomendada,
    nivelConfianca,
    justificativaConfianca,
    calculatedData: {
      cpm,
      ctr,
      cpc,
      frequencia,
      cpa,
      roas,
      taxaConversao,
      roi
    }
  };
}


