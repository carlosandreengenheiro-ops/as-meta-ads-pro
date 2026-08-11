import React from 'react';
import { BookOpen, ShieldCheck, Zap, Layers, CheckCircle, Download, ExternalLink, Lock, Sparkles, Award, Star } from 'lucide-react';

interface MethodProProps {
  onOpenArchNotice?: () => void;
}

export const MethodPro: React.FC<MethodProProps> = ({ onOpenArchNotice }) => {
  const pillars = [
    {
      number: '01',
      title: 'Pilar 1: Estrutura & Rastreamento',
      subtitle: 'Configuração correta do ecossistema do Meta Business Suite',
      description: 'Como instalar a API de Conversões (CAPI), configurar o Pixel sem perdas pelo iOS e alinhar os objetivos de campanha para forçar o algoritmo a buscar clientes pagantes.',
      highlights: [
        'Configuração do Gateway CAPI e Gerenciador de Eventos',
        'Atribuição GA4 e parâmetros UTM dinâmicos',
        'Evitar a armadilha do objetivo de "Tráfego" e "Engajamento"'
      ]
    },
    {
      number: '02',
      title: 'Pilar 2: Engenharia de Criativos & Copywriting',
      subtitle: 'A máquina de capturar atenção e gerar desejos de compra',
      description: 'Como estruturar anúncios que interrompem o scroll no feed com alto poder de atração nos primeiros segundos, retêm a atenção e conduzem ao clique com chamadas para ação persuasivas.',
      highlights: [
        'Fórmula AIDA e PAS adaptada para Vídeos Curtos (Reels/TikTok)',
        'Variação inteligente de formatos (Estático, Carrossel e Vídeo)',
        'Gatilhos de Prova Social e Quebra de Objeções'
      ]
    },
    {
      number: '03',
      title: 'Pilar 3: Públicos & Leilão Inteligente',
      subtitle: 'Como falar com as pessoas certas sem inflacionar o CPM',
      description: 'Método para dominar o leilão usando tanto Públicos Abertos (Broad) para escala, quanto estratégias de exclusão de compradores e estruturas de remarketing.',
      highlights: [
        'Prevenção de Sobreposição de Públicos (Audience Overlap)',
        'Escala com Público Aberto e criativos segmentados',
        'Remarketing estratégico por tempo de retenção'
      ]
    },
    {
      number: '04',
      title: 'Pilar 4: Rotina de Otimização & Escala Segura',
      subtitle: 'Decisões matemáticas sem ansiedade para multiplicar o ROI',
      description: 'O manual de bordo diário para interpretar métricas (CTR, CPC, CPM, ROAS), realizar aumentos graduais de orçamento e desativar anúncios sem matar a campanha.',
      highlights: [
        'Matriz de Decisão: O que fazer quando o CPA sobe',
        'Escala Vertical com aumentos graduais vs Escala Horizontal',
        'Fase de Aprendizado e Janelas de Atribuição'
      ]
    }
  ];

  const chapters = [
    'Capítulo 1: A Base Inquebrável de Rastreamento (Pixel & CAPI)',
    'Capítulo 2: Alinhamento Estratégico do Algoritmo',
    'Capítulo 3: Orçamentação e Fase de Aprendizado',
    'Capítulo 4: Engenharia de Públicos e Leilão',
    'Capítulo 5: Anatomia do Criativo de Alta Conversão',
    'Capítulo 6: Validação Estatística de Criativos',
    'Capítulo 7: Rotina de Otimização Sem Pânico',
    'Capítulo 8: O Dashboard Definitivo de Métricas',
    'Capítulo 9: Otimização da Taxa de Conversão da Página (CRO)',
    'Capítulo 10: Manual da Escala Segura de Tráfego'
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-gradient-to-br from-[#12141c] via-[#1b170c] to-[#0e0d08] p-6 sm:p-8 rounded-2xl border border-gold-subtle shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Área 4 — Aplicação Prática do E-Book
          </div>
          <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            OS 4 PILARES DO MÉTODO <span className="text-gold-gradient">AS META ADS PRO</span>
          </h2>
          <p className="text-amber-300/90 font-semibold text-sm">
            Uma aplicação prática dos princípios apresentados no E-book.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            O Método AS META ADS PRO foi construído para organizar de forma prática a execução diária de campanhas. Ele estrutura os conceitos do E-book em um fluxo direto para transformar tráfego pago em uma fonte previsível de vendas.
          </p>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="space-y-4">
        <div>
          <h3 className="font-syne text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Os 4 Pilares da Metodologia
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Organização tática para aplicação em campo dos princípios do E-book
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 rounded-2xl bg-[#11131a] border border-[#222636] hover:border-gold-subtle transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                    {pillar.number}
                  </span>
                  <span className="text-[11px] text-amber-400/80 font-semibold uppercase tracking-wider">Aplicação Prática</span>
                </div>

                <h4 className="font-syne font-bold text-base sm:text-lg text-white">
                  {pillar.title}
                </h4>

                <p className="text-xs font-medium text-amber-400/90">
                  {pillar.subtitle}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1d202e] space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Pontos Chave Mapeados:
                </span>
                {pillar.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* E-book Chapter Index */}
      <div className="bg-[#11131a] p-6 sm:p-8 rounded-2xl border border-[#232736] space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#232736]">
          <div>
            <h3 className="font-syne text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Estrutura Oficial do E-Book (10 Capítulos)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              O E-book possui sua própria estrutura oficial composta por 10 capítulos teóricos e práticos. Os 4 pilares acima organizam a aplicação tática desses capítulos.
            </p>
          </div>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-300 font-mono text-xs rounded-full border border-amber-500/30 font-bold">
            10 Capítulos Oficiais
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {chapters.map((chap, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#181b26] border border-[#252a3b] hover:border-amber-500/30 transition-all flex items-center gap-3 text-xs font-semibold text-slate-200"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-300 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                {idx + 1}
              </div>
              <span>{chap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Future Premium Notice / Next Steps */}
      <div className="bg-gradient-to-r from-[#17150c] via-[#242010] to-[#17150c] p-6 sm:p-8 rounded-2xl border border-gold-subtle flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5" />
            Estrutura Preparada para Integração de Membros
          </div>
          <h4 className="font-syne text-xl font-bold text-white">
            Futura Área Exclusiva de Assinantes & Downloads Pro
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Este aplicativo foi desenvolvido com arquitetura pronta para futura integração de login de membros, sincronização em nuvem, histórico de diagnósticos e assinatura mensal sem perder a versão gratuita.
          </p>
        </div>

        <button
          onClick={onOpenArchNotice}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ver Mapa de Expansão</span>
        </button>
      </div>
    </div>
  );
};
