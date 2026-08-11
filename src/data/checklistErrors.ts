import { ChecklistErrorItem } from '../types';

export const CHECKLIST_21_ERRORS: ChecklistErrorItem[] = [
  {
    id: 1,
    number: 1,
    title: 'Anunciar sem Pixel e CAPI (API de Conversões) Validados',
    category: 'Estrutura & Pixel',
    description: 'Sem o Pixel e a API de Conversões do Meta configurados corretamente, você perde até 40% do rastreamento de dados por conta do bloqueio do iOS e navegadores com adblock.',
    howToFix: 'Acesse o Gerenciador de Eventos no Meta Business Suite, instale a API de Conversões via gateway ou servidor (Ex: Stape/Shopify/WordPress) e verifique o diagnóstico de sinal.',
    ebookChapter: 'Capítulo 1: A Base Inquebrável de Rastreamento'
  },
  {
    id: 2,
    number: 2,
    title: 'Otimizar para Objetivo Secundário (ex: Tráfego ao invés de Vendas)',
    category: 'Estrutura & Pixel',
    description: 'Usar o objetivo de "Tráfego" ou "Engajamento" esperando gerar vendas. O algoritmo do Meta entrega exatamente o que você pede: curiosos que clicam, mas não compram.',
    howToFix: 'Para e-commerce e vendas diretas, selecione SEMPRE o objetivo "Vendas" com evento "Comprar". Para captação, selecione "Cadastro" ou "Mensagens".',
    ebookChapter: 'Capítulo 2: Alinhamento Estratégico do Algoritmo'
  },
  {
    id: 3,
    number: 3,
    title: 'Sobreposição de Públicos (Audience Overlap)',
    category: 'Públicos & Escala',
    description: 'Criar múltiplos conjuntos de anúncios mirando os mesmos interesses ou Lookalikes. Isso faz seus próprios anúncios leiloarem entre si, encarecendo o CPM.',
    howToFix: 'Utilize a ferramenta de Inspeção do Conjunto de Anúncios no Meta Ads Manager ou monte uma estrutura com exclusões claras entre conjuntos.',
    ebookChapter: 'Capítulo 4: Engenharia de Públicos e Leilão'
  },
  {
    id: 4,
    number: 4,
    title: 'Orçamento Insuficiente para a Fase de Aprendizado',
    category: 'Estrutura & Pixel',
    description: 'Colocar R$ 10/dia em um conjunto com objetivo de conversão cujo produto custa R$ 200. O algoritmo exige cerca de 50 conversões por semana para sair do aprendizado limitado.',
    howToFix: 'Ajuste o orçamento para que a verba diária cubra pelo menos 1 a 2 conversões esperadas ao dia (Orçamento Diário ≈ 2x CPA Meta).',
    ebookChapter: 'Capítulo 3: Orçamentação e Fase de Aprendizado'
  },
  {
    id: 5,
    number: 5,
    title: 'Pausar ou Trocar Criativos Prematuramente',
    category: 'Criativos & Copy',
    description: 'Desativar um anúncio com apenas R$ 15 ou poucas impressões gastas, antes do Meta encontrar o público comprador certo e atingir significância estatística.',
    howToFix: 'Aguarde o anúncio gastar no mínimo de 1x a 2x o CPA meta (ou 1.000 impressões) antes de tomar qualquer decisão de pausa.',
    ebookChapter: 'Capítulo 6: Validação Estatística de Criativos'
  },
  {
    id: 6,
    number: 6,
    title: 'Fazer Alterações Constantes e Ansiosas na Campanha',
    category: 'Estrutura & Pixel',
    description: 'Mudar orçamento, público ou criativo todo dia. Cada alteração estrutural reinicia a Fase de Aprendizado do algoritmo e desestabiliza a entrega.',
    howToFix: 'Faça otimizações com intervalo mínimo de 48 a 72 horas e faça aumentos de orçamento graduais (no máximo 15% a 20% por dia em CBO/ABO).',
    ebookChapter: 'Capítulo 7: Rotina de Otimização Sem Pânico'
  },
  {
    id: 7,
    number: 7,
    title: 'Ignorar a Frequência e Causar Fadiga do Anúncio',
    category: 'Métricas & Análise',
    description: 'Deixar a frequência da campanha ultrapassar 3.0 a 4.0 no mesmo público em poucos dias. As pessoas começam a ignorar o anúncio e o CPM/CPA dispara.',
    howToFix: 'Aumente o tamanho do público, troque os criativos cansados por novas variações ou crie uma campanha de retargeting separada com frequência controlada.',
    ebookChapter: 'Capítulo 8: Combate à Fadiga de Anúncios'
  },
  {
    id: 8,
    number: 8,
    title: 'Criativos sem Chamada para Ação (CTA) Clara',
    category: 'Criativos & Copy',
    description: 'Vídeos ou artes bonitas que impressionam, mas não instruem o usuário sobre exatamente qual passo dar a seguir (Ex: "Clique no botão e baixe agora").',
    howToFix: 'Inclua CTA visual na imagem/vídeo, no texto do anúncio e selecione o botão de ação correto no Meta (ex: "Saiba Mais", "Comprar Agora").',
    ebookChapter: 'Capítulo 5: Anatomia do Criativo de Alta Conversão'
  },
  {
    id: 9,
    number: 9,
    title: 'Copy Genérica que Não Fala com a Dor do Cliente',
    category: 'Criativos & Copy',
    description: 'Anúncios que apenas descrevem características do produto ao invés de destacar a transformação, os benefícios e resolver objeções reais do comprador.',
    howToFix: 'Siga a estrutura AIDA (Atenção, Interesse, Desejo, Ação) ou PAS (Problema, Agitação, Solução) focando nos primeiros 3 segundos da mensagem.',
    ebookChapter: 'Capítulo 5: Copywriting Persuasivo para Anúncios'
  },
  {
    id: 10,
    number: 10,
    title: 'Página de Destino Lenta ou Não Responsiva no Celular',
    category: 'Criativos & Copy',
    description: 'Ter um anúncio excelente com CTR alto, mas a página demora mais de 3 segundos para carregar no 4G. Mais de 50% dos usuários desistem no carregamento.',
    howToFix: 'Otimize imagens, remova scripts pesados e teste sua página no Google PageSpeed Insights focando na pontuação mobile.',
    ebookChapter: 'Capítulo 9: Otimização da Taxa de Conversão da Página'
  },
  {
    id: 11,
    number: 11,
    title: 'Avaliar CTR Geral em Vez de CTR Único no Link',
    category: 'Métricas & Análise',
    description: 'Confundir CTR (Todos) — que inclui cliques em "ver mais", curtir e pausar vídeo — com o CTR (Clique no Link), que mede quem realmente vai para seu site.',
    howToFix: 'Nas colunas do Gerenciador de Anúncios, personalize a visualização e priorize a métrica "CTR (Taxa de cliques no link)". O ideal é manter acima de 1.2%.',
    ebookChapter: 'Capítulo 8: O Dashboard Definitivo de Métricas'
  },
  {
    id: 12,
    number: 12,
    title: 'Segmentação Excessivamente Afunilada no Topo de Funil',
    category: 'Públicos & Escala',
    description: 'Empilhar 10 interesses estreitos em campanhas frias, gerando um público minúsculo que encarece o CPM e impede o algoritmo de escalar.',
    howToFix: 'Para topo de funil (prospecção), teste públicos abertos (Broad) ou públicos com 1 a 2 interesses amplos e deixe o criativo fazer a segmentação.',
    ebookChapter: 'Capítulo 4: Escala com Público Aberto (Broad)'
  },
  {
    id: 13,
    number: 13,
    title: 'Não Negativar Públicos Convertidos (Compradores/Leads)',
    category: 'Públicos & Escala',
    description: 'Continuar mostrando anúncios de aquisição para quem já comprou seu produto recentemente, queimando verba de anúncio sem necessidade.',
    howToFix: 'Exclua o público personalizado de "Compradores - Últimos 30/60 dias" em todas as campanhas de topo e meio de funil.',
    ebookChapter: 'Capítulo 4: Higiene e Exclusão de Públicos'
  },
  {
    id: 14,
    number: 14,
    title: 'Focar Apenas em 1 Formato de Criativo (Negligenciar Reels/Carrossel)',
    category: 'Criativos & Copy',
    description: 'Rodar apenas imagens estáticas em 1080x1080. O leilão do Meta possui inventários mais baratos em posicionamentos verticais (Reels/Stories) e Carrosséis.',
    howToFix: 'Produza pelo menos 3 variações de formato para cada conceito: Vídeo Vertical 9:16, Imagem Quadrada 1:1 e Carrossel demonstrativo.',
    ebookChapter: 'Capítulo 5: Diversificação de Format e Posicionamentos'
  },
  {
    id: 15,
    number: 15,
    title: 'Focar Apenas no CPC e Esquecer o CPA e ROAS',
    category: 'Métricas & Análise',
    description: 'Ficar feliz com um CPC de R$ 0,30 em um anúncio que atrai tráfego desqualificado e não gera vendas, ignorando o Custo por Aquisição real.',
    howToFix: 'Entenda que CPC é métrica secundária. O veredito final do anúncio deve ser sempre o CPA (Custo por Aquisição) e o ROAS (Retorno sobre Investimento).',
    ebookChapter: 'Capítulo 8: Hierarquia de Métricas de Decisão'
  },
  {
    id: 16,
    number: 16,
    title: 'Misturar Públicos de Diferentes Etapas de Funil na Mesma Campanha',
    category: 'Públicos & Escala',
    description: 'Colocar público frio (interesses) e público quente (remarketing de quem visitou o site) no mesmo conjunto ou leilão desalinhado.',
    howToFix: 'Separe suas campanhas por nível de consciência: Prospecção (Topo/Frio) com criativos focados em dor/desejo, e Remarketing (Fundo/Quente) com quebra de objeções e ofertas.',
    ebookChapter: 'Capítulo 4: Arquitetura de Funil de Tráfego Pago'
  },
  {
    id: 17,
    number: 17,
    title: 'Anunciar Sem Rastreamento por Parâmetros UTM',
    category: 'Métricas & Análise',
    description: 'Não configurar parâmetros UTM nos links das campanhas, tornando impossível auditá-las no Google Analytics 4 e entender a atribuição real.',
    howToFix: 'Adicione parâmetros dinâmicos na URL do anúncio: utm_source=meta&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{ad.name}}.',
    ebookChapter: 'Capítulo 1: Atribuição GA4 e Rastreamento de URLs'
  },
  {
    id: 18,
    number: 18,
    title: 'Avaliar Resultados em Janelas de Tempo Muito Curtas',
    category: 'Métricas & Análise',
    description: 'Tomar decisões drásticas avaliando apenas o desempenho do dia atual. O atraso na atribuição do Meta e variações do dia a dia podem distorcer os dados.',
    howToFix: 'Analise janelas de 7 dias ou no mínimo 3 dias acumulados para tomar decisões de aumento de verba ou desativação.',
    ebookChapter: 'Capítulo 7: Janelas de Atribuição e Análise Temporal'
  },
  {
    id: 19,
    number: 19,
    title: 'Ignorar Métricas de Retenção de Vídeo (Hook Rate & Hold Rate)',
    category: 'Criativos & Copy',
    description: 'Não analisar quantos usuários assistem aos primeiros 3 segundos do vídeo (Hook Rate) e quantos chegam a 50% (Hold Rate).',
    howToFix: 'Se o Hook Rate for menor que 25%, mude o gancho dos primeiros 3 segundos. Se o Hold Rate for baixo, ajuste o ritmo do meio do vídeo.',
    ebookChapter: 'Capítulo 6: Diagnóstico Visual de Vídeo Ads'
  },
  {
    id: 20,
    number: 20,
    title: 'Anúncios Sem Prova Social e Validação de Clientes',
    category: 'Criativos & Copy',
    description: 'Lançar produtos ou ofertas sem apresentar depoimentos, avaliações, print de conversas reais de clientes ou cases de sucesso.',
    howToFix: 'Incorpore conteúdos gerados por usuários (UGC), avaliações em vídeo ou prints de resultados reais diretamente nos anúncios de alta conversão.',
    ebookChapter: 'Capítulo 5: Gatilhos de Confiança e Prova Social'
  },
  {
    id: 21,
    number: 21,
    title: 'Escalar Orçamento Abruptamente Sem Controle de Margem',
    category: 'Públicos & Escala',
    description: 'Duplicar o orçamento de R$ 100 para R$ 1000 da noite para o dia. O leilão busca impressões mais caras e o CPA dispara se a escala não for estruturada.',
    howToFix: 'Escale de forma vertical (aumentando 15-20% a cada 48h no conjunto vencedor) ou horizontal (duplicando o conjunto vencedor para novos públicos ou criativos).',
    ebookChapter: 'Capítulo 10: Manual da Escala Segura de Tráfego'
  }
];
