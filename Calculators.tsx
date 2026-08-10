import React, { useState } from 'react';
import { Calculator as CalcIcon, Percent, DollarSign, ArrowRight, Copy, Check, Info, Sparkles, HelpCircle } from 'lucide-react';

type CalcType = 'ctr' | 'cpc' | 'cpm' | 'roas' | 'roi' | 'orcamentoAlvo';

export const Calculators: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<CalcType>('ctr');
  const [copied, setCopied] = useState(false);

  // 1. CTR State
  const [ctrClicks, setCtrClicks] = useState<number | ''>(450);
  const [ctrImpressions, setCtrImpressions] = useState<number | ''>(25000);

  // 2. CPC State
  const [cpcSpend, setCpcSpend] = useState<number | ''>(800);
  const [cpcClicks, setCpcClicks] = useState<number | ''>(500);

  // 3. CPM State
  const [cpmSpend, setCpmSpend] = useState<number | ''>(1200);
  const [cpmImpressions, setCpmImpressions] = useState<number | ''>(50000);

  // 4. ROAS State
  const [roasRevenue, setRoasRevenue] = useState<number | ''>(9000);
  const [roasSpend, setRoasSpend] = useState<number | ''>(2500);

  // 5. ROI State
  const [roiRevenue, setRoiRevenue] = useState<number | ''>(15000);
  const [roiSpend, setRoiSpend] = useState<number | ''>(3500);
  const [roiOtherCosts, setRoiOtherCosts] = useState<number | ''>(4000);

  // 6. Target Revenue State
  const [targetRevenue, setTargetRevenue] = useState<number | ''>(20000);
  const [targetExpectedRoas, setTargetExpectedRoas] = useState<number | ''>(3.5);

  // Helper copy text
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculations
  const calcCtrResult = () => {
    const clk = typeof ctrClicks === 'number' ? ctrClicks : 0;
    const imp = typeof ctrImpressions === 'number' ? ctrImpressions : 0;
    if (imp <= 0) return null;
    return (clk / imp) * 100;
  };

  const calcCpcResult = () => {
    const spd = typeof cpcSpend === 'number' ? cpcSpend : 0;
    const clk = typeof cpcClicks === 'number' ? cpcClicks : 0;
    if (clk <= 0) return null;
    return spd / clk;
  };

  const calcCpmResult = () => {
    const spd = typeof cpmSpend === 'number' ? cpmSpend : 0;
    const imp = typeof cpmImpressions === 'number' ? cpmImpressions : 0;
    if (imp <= 0) return null;
    return (spd / imp) * 1000;
  };

  const calcRoasResult = () => {
    const rev = typeof roasRevenue === 'number' ? roasRevenue : 0;
    const spd = typeof roasSpend === 'number' ? roasSpend : 0;
    if (spd <= 0) return null;
    return rev / spd;
  };

  const calcRoiResult = () => {
    const rev = typeof roiRevenue === 'number' ? roiRevenue : 0;
    const spd = typeof roiSpend === 'number' ? roiSpend : 0;
    const cst = typeof roiOtherCosts === 'number' ? roiOtherCosts : 0;
    if (spd <= 0) return null;
    const profit = rev - spd - cst;
    return (profit / spd) * 100;
  };

  const calcTargetResult = () => {
    const rev = typeof targetRevenue === 'number' ? targetRevenue : 0;
    const roas = typeof targetExpectedRoas === 'number' ? targetExpectedRoas : 0;
    if (roas <= 0) return null;
    return rev / roas;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-gradient-to-br from-[#12141c] via-[#171a26] to-[#0e0f16] p-6 sm:p-8 rounded-2xl border border-gold-subtle shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Área 3 — Ferramentas Rápidas
          </div>
          <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Calculadoras de Métricas de Tráfego Pago
          </h2>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Calcule instantaneamente o desempenho dos seus anúncios. Interface projetada com foco total em velocidade e usabilidade no celular durante reuniões de tráfego.
          </p>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <button
          onClick={() => setActiveCalc('ctr')}
          className={`p-3 rounded-xl border text-center font-syne text-xs font-bold transition-all cursor-pointer ${
            activeCalc === 'ctr'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-gold-glow'
              : 'bg-[#11131a] text-slate-300 border-[#222636] hover:bg-[#181b26]'
          }`}
        >
          CTR
          <span className="block text-[10px] opacity-80 font-normal">Taxa de Cliques</span>
        </button>

        <button
          onClick={() => setActiveCalc('cpc')}
          className={`p-3 rounded-xl border text-center font-syne text-xs font-bold transition-all cursor-pointer ${
            activeCalc === 'cpc'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-gold-glow'
              : 'bg-[#11131a] text-slate-300 border-[#222636] hover:bg-[#181b26]'
          }`}
        >
          CPC
          <span className="block text-[10px] opacity-80 font-normal">Custo por Clique</span>
        </button>

        <button
          onClick={() => setActiveCalc('cpm')}
          className={`p-3 rounded-xl border text-center font-syne text-xs font-bold transition-all cursor-pointer ${
            activeCalc === 'cpm'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-gold-glow'
              : 'bg-[#11131a] text-slate-300 border-[#222636] hover:bg-[#181b26]'
          }`}
        >
          CPM
          <span className="block text-[10px] opacity-80 font-normal">Custo por 1.000</span>
        </button>

        <button
          onClick={() => setActiveCalc('roas')}
          className={`p-3 rounded-xl border text-center font-syne text-xs font-bold transition-all cursor-pointer ${
            activeCalc === 'roas'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-gold-glow'
              : 'bg-[#11131a] text-slate-300 border-[#222636] hover:bg-[#181b26]'
          }`}
        >
          ROAS
          <span className="block text-[10px] opacity-80 font-normal">Retorno em Anúncios</span>
        </button>

        <button
          onClick={() => setActiveCalc('roi')}
          className={`p-3 rounded-xl border text-center font-syne text-xs font-bold transition-all cursor-pointer ${
            activeCalc === 'roi'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-gold-glow'
              : 'bg-[#11131a] text-slate-300 border-[#222636] hover:bg-[#181b26]'
          }`}
        >
          ROI
          <span className="block text-[10px] opacity-80 font-normal">Retorno Líquido</span>
        </button>

        <button
          onClick={() => setActiveCalc('orcamentoAlvo')}
          className={`p-3 rounded-xl border text-center font-syne text-xs font-bold transition-all cursor-pointer ${
            activeCalc === 'orcamentoAlvo'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-gold-glow'
              : 'bg-[#11131a] text-slate-300 border-[#222636] hover:bg-[#181b26]'
          }`}
        >
          Verba Alvo
          <span className="block text-[10px] opacity-80 font-normal">Meta x Investimento</span>
        </button>
      </div>

      {/* Main Calculator Card Body */}
      <div className="bg-[#11131a] p-6 sm:p-8 rounded-2xl border border-[#232736]">
        {/* 1. CALCULADORA DE CTR */}
        {activeCalc === 'ctr' && (
          <div className="space-y-6">
            <div className="border-b border-[#232736] pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-syne text-xl font-bold text-white">Calculadora de CTR (Click-Through Rate)</h3>
                <p className="text-xs text-slate-400 mt-1">Fórmula: (Cliques no Link ÷ Impressões) × 100</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 font-mono text-xs rounded-full border border-amber-500/30 font-bold">
                Ideal: &gt; 1,5%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Cliques no Link</label>
                <input
                  type="number"
                  value={ctrClicks}
                  onChange={(e) => setCtrClicks(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="450"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-white text-base font-bold px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Impressões Totais</label>
                <input
                  type="number"
                  value={ctrImpressions}
                  onChange={(e) => setCtrImpressions(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="25000"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-white text-base font-bold px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Result Box */}
            {calcCtrResult() !== null && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#17150c] via-[#221e10] to-[#17150c] border border-gold-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase">Resultado do CTR</span>
                  <span className="font-syne font-black text-3xl sm:text-4xl text-gold-bright">
                    {calcCtrResult()?.toFixed(2)}%
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300 max-w-md">
                  <p className="font-semibold text-amber-300">
                    {calcCtrResult()! >= 1.5 ? '🔥 Excelente Taxa de Cliques!' : calcCtrResult()! >= 0.8 ? '⚠️ Atração Razoável' : '🚨 Criativo fraco / CTR Baixo'}
                  </p>
                  <p className="text-slate-400">
                    A cada 1.000 impressões no feed, cerca de {Math.round(calcCtrResult()! * 10)} pessoas clicam no seu link de anúncio.
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(`CTR Calculado: ${calcCtrResult()?.toFixed(2)}%`)}
                  className="px-4 py-2 rounded-xl bg-[#282414] hover:bg-[#38331d] text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 2. CALCULADORA DE CPC */}
        {activeCalc === 'cpc' && (
          <div className="space-y-6">
            <div className="border-b border-[#232736] pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-syne text-xl font-bold text-white">Calculadora de CPC (Custo por Clique)</h3>
                <p className="text-xs text-slate-400 mt-1">Fórmula: Investimento Total ÷ Cliques no Link</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 font-mono text-xs rounded-full border border-amber-500/30 font-bold">
                Ideal: &lt; R$ 1,80
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Investimento Total (R$)</label>
                <input
                  type="number"
                  value={cpcSpend}
                  onChange={(e) => setCpcSpend(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="800"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-white text-base font-bold px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Cliques no Link</label>
                <input
                  type="number"
                  value={cpcClicks}
                  onChange={(e) => setCpcClicks(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="500"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-white text-base font-bold px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Result Box */}
            {calcCpcResult() !== null && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#17150c] via-[#221e10] to-[#17150c] border border-gold-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase">Resultado do CPC</span>
                  <span className="font-syne font-black text-3xl sm:text-4xl text-gold-bright">
                    R$ {calcCpcResult()?.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300 max-w-md">
                  <p className="font-semibold text-amber-300">
                    {calcCpcResult()! <= 1.8 ? '✅ Custo por clique muito eficiente!' : calcCpcResult()! <= 3.5 ? '⚠️ Dentro da margem de mercado' : '🚨 Clique caro — Aumente a atratividade da arte'}
                  </p>
                  <p className="text-slate-400">
                    Cada visitante direcionado à sua landing page custa exatamente R$ {calcCpcResult()?.toFixed(2)}.
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(`CPC Calculado: R$ ${calcCpcResult()?.toFixed(2)}`)}
                  className="px-4 py-2 rounded-xl bg-[#282414] hover:bg-[#38331d] text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. CALCULADORA DE CPM */}
        {activeCalc === 'cpm' && (
          <div className="space-y-6">
            <div className="border-b border-[#232736] pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-syne text-xl font-bold text-white">Calculadora de CPM (Custo por Mil Impressões)</h3>
                <p className="text-xs text-slate-400 mt-1">Fórmula: (Investimento Total ÷ Impressões) × 1.000</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 font-mono text-xs rounded-full border border-amber-500/30 font-bold">
                Ideal: &lt; R$ 20,00
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Investimento Total (R$)</label>
                <input
                  type="number"
                  value={cpmSpend}
                  onChange={(e) => setCpmSpend(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="1200"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-white text-base font-bold px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Impressões Totais</label>
                <input
                  type="number"
                  value={cpmImpressions}
                  onChange={(e) => setCpmImpressions(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="50000"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-white text-base font-bold px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Result Box */}
            {calcCpmResult() !== null && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#17150c] via-[#221e10] to-[#17150c] border border-gold-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase">Resultado do CPM</span>
                  <span className="font-syne font-black text-3xl sm:text-4xl text-gold-bright">
                    R$ {calcCpmResult()?.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300 max-w-md">
                  <p className="font-semibold text-amber-300">
                    {calcCpmResult()! <= 20 ? '🔥 Custo de leilão excelente!' : calcCpmResult()! <= 38 ? '⚠️ Leilão competitivo padrão' : '🚨 Leilão caro — Amplie o público'}
                  </p>
                  <p className="text-slate-400">
                    O Meta cobra R$ {calcCpmResult()?.toFixed(2)} para exibir seu anúncio 1.000 vezes na tela dos usuários.
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(`CPM Calculado: R$ ${calcCpmResult()?.toFixed(2)}`)}
                  className="px-4 py-2 rounded-xl bg-[#282414] hover:bg-[#38331d] text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. CALCULADORA DE ROAS */}
        {activeCalc === 'roas' && (
          <div className="space-y-6">
            <div className="border-b border-[#232736] pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-syne text-xl font-bold text-white">Calculadora de ROAS (Return on Ad Spend)</h3>
                <p className="text-xs text-slate-400 mt-1">Fórmula: Faturamento Gerado ÷ Investimento em Anúncios</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 font-mono text-xs rounded-full border border-amber-500/30 font-bold">
                Ideal: &gt; 3,0x
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Faturamento Bruto (R$)</label>
                <input
                  type="number"
                  value={roasRevenue}
                  onChange={(e) => setRoasRevenue(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="9000"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-emerald-400 text-base font-bold px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Investimento em Anúncios (R$)</label>
                <input
                  type="number"
                  value={roasSpend}
                  onChange={(e) => setRoasSpend(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="2500"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-white text-base font-bold px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Result Box */}
            {calcRoasResult() !== null && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#17150c] via-[#221e10] to-[#17150c] border border-gold-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase">Resultado do ROAS</span>
                  <span className="font-syne font-black text-3xl sm:text-4xl text-emerald-400">
                    {calcRoasResult()?.toFixed(2)}x
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300 max-w-md">
                  <p className="font-semibold text-amber-300">
                    {calcRoasResult()! >= 3.0 ? '🚀 Retorno de Anúncios Forte!' : calcRoasResult()! >= 1.5 ? '⚠️ Lucro moderado — Monitore custos' : '🚨 ROAS Crítico — Prejuízo provável'}
                  </p>
                  <p className="text-slate-400">
                    Para cada R$ 1,00 colocado em anúncios no Meta, retornam R$ {calcRoasResult()?.toFixed(2)} em receita.
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(`ROAS Calculado: ${calcRoasResult()?.toFixed(2)}x`)}
                  className="px-4 py-2 rounded-xl bg-[#282414] hover:bg-[#38331d] text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. CALCULADORA DE ROI */}
        {activeCalc === 'roi' && (
          <div className="space-y-6">
            <div className="border-b border-[#232736] pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-syne text-xl font-bold text-white">Calculadora de ROI (Return on Investment)</h3>
                <p className="text-xs text-slate-400 mt-1">Fórmula: [(Faturamento - Investimento - Custos Operacionais) ÷ Investimento] × 100</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 font-mono text-xs rounded-full border border-amber-500/30 font-bold">
                Mede Lucro Líquido Real
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Faturamento Bruto (R$)</label>
                <input
                  type="number"
                  value={roiRevenue}
                  onChange={(e) => setRoiRevenue(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="15000"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-emerald-400 text-sm font-bold px-3 py-2.5 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Investimento em Anúncios (R$)</label>
                <input
                  type="number"
                  value={roiSpend}
                  onChange={(e) => setRoiSpend(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="3500"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-white text-sm font-bold px-3 py-2.5 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Outros Custos/COGS (R$)</label>
                <input
                  type="number"
                  value={roiOtherCosts}
                  onChange={(e) => setRoiOtherCosts(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="4000"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-slate-300 text-sm font-bold px-3 py-2.5 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Result Box */}
            {calcRoiResult() !== null && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#17150c] via-[#221e10] to-[#17150c] border border-gold-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase">ROI Líquido Porcentual</span>
                  <span className={`font-syne font-black text-3xl sm:text-4xl ${calcRoiResult()! >= 0 ? 'text-gold-bright' : 'text-rose-400'}`}>
                    {calcRoiResult()?.toFixed(1)}%
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300 max-w-md">
                  <p className="font-semibold text-amber-300">
                    Lucro Líquido Estimado: R$ {((roiRevenue as number || 0) - (roiSpend as number || 0) - (roiOtherCosts as number || 0)).toLocaleString('pt-BR')}
                  </p>
                  <p className="text-slate-400">
                    Diferente do ROAS (que olha só o faturamento), o ROI indica o lucro real que sobrou no seu bolso após pagar anúncios e custos da operação.
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(`ROI Calculado: ${calcRoiResult()?.toFixed(1)}%`)}
                  className="px-4 py-2 rounded-xl bg-[#282414] hover:bg-[#38331d] text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. CALCULADORA DE VERBA ALVO */}
        {activeCalc === 'orcamentoAlvo' && (
          <div className="space-y-6">
            <div className="border-b border-[#232736] pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-syne text-xl font-bold text-white">Calculadora de Verba Necessária (Meta x ROAS)</h3>
                <p className="text-xs text-slate-400 mt-1">Fórmula: Faturamento Alvo ÷ ROAS Esperado</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 font-mono text-xs rounded-full border border-amber-500/30 font-bold">
                Planejamento de Escala
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Meta de Faturamento (R$)</label>
                <input
                  type="number"
                  value={targetRevenue}
                  onChange={(e) => setTargetRevenue(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="20000"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-white text-base font-bold px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">ROAS Médio da Operação (ex: 3.5)</label>
                <input
                  type="number"
                  step="0.1"
                  value={targetExpectedRoas}
                  onChange={(e) => setTargetExpectedRoas(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="3.5"
                  className="w-full bg-[#181b26] border border-[#2e3348] text-white text-base font-bold px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Result Box */}
            {calcTargetResult() !== null && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#17150c] via-[#221e10] to-[#17150c] border border-gold-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase">Verba Recomendada em Anúncios</span>
                  <span className="font-syne font-black text-3xl sm:text-4xl text-gold-bright">
                    R$ {calcTargetResult()?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300 max-w-md">
                  <p className="font-semibold text-amber-300">
                    Orçamento Diário Estimado: R$ {(calcTargetResult()! / 30).toFixed(2)}/dia
                  </p>
                  <p className="text-slate-400">
                    Para faturar R$ {(targetRevenue as number || 0).toLocaleString('pt-BR')} mantendo o ROAS de {targetExpectedRoas}x, você precisará investir cerca de R$ {calcTargetResult()?.toFixed(2)} no mês.
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(`Verba Recomendada: R$ ${calcTargetResult()?.toFixed(2)}`)}
                  className="px-4 py-2 rounded-xl bg-[#282414] hover:bg-[#38331d] text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
