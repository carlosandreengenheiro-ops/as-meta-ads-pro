import React, { useState } from 'react';
import { CampaignMetricsInput, DiagnosticReport, NivelConfiancaType, StatusType } from '../types';
import { INDUSTRY_PRESETS, runDiagnosticEngine } from '../data/diagnosticBenchmarks';
import { 
  DollarSign, Eye, Users, MousePointer, ShoppingCart, TrendingUp, 
  CheckCircle2, AlertTriangle, AlertCircle, RotateCcw, Copy, Printer, 
  ArrowRight, ShieldAlert, Sparkles, HelpCircle, Activity, Lightbulb, BarChart3, Info
} from 'lucide-react';

export const DiagnosticForm: React.FC = () => {
  // Manual input as primary focus, default initialized empty or with neutral starting values
  const [formValues, setFormValues] = useState<CampaignMetricsInput>({
    investimento: '',
    impressoes: '',
    alcance: '',
    cliquesLink: '',
    compras: '',
    faturamento: '',
  });

  const [campaignName, setCampaignName] = useState<string>('');
  const [activePreset, setActivePreset] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Calculate report using diagnostic engine
  const report: DiagnosticReport = runDiagnosticEngine(formValues);

  const handleInputChange = (field: keyof CampaignMetricsInput, value: string) => {
    setActivePreset(''); // User is entering manually
    if (value === '') {
      setFormValues(prev => ({ ...prev, [field]: '' }));
      return;
    }
    const num = parseFloat(value);
    setFormValues(prev => ({ ...prev, [field]: isNaN(num) ? '' : Math.max(0, num) }));
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = INDUSTRY_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setFormValues(preset.sample);
      setActivePreset(presetId);
      if (!campaignName) {
        setCampaignName(`Campanha Exemplo - ${preset.label}`);
      }
    }
  };

  const handleReset = () => {
    setFormValues({
      investimento: '',
      impressoes: '',
      alcance: '',
      cliquesLink: '',
      compras: '',
      faturamento: '',
    });
    setCampaignName('');
    setActivePreset('');
  };

  const handleCopyReport = () => {
    let text = `📊 DIAGNÓSTICO DA CAMPANHA - AS META ADS PRO\n`;
    if (campaignName) text += `Campanha: ${campaignName}\n`;
    text += `Status Geral: ${report.overallStatus}\n`;
    text += `Nível de Confiança: ${report.nivelConfianca}\n\n`;
    text += `--- MÉTRICAS E INDICADORES ---\n`;
    
    report.metrics.forEach(m => {
      text += `• ${m.label}: ${m.valueFormatted} [Status: ${m.status}]\n`;
      text += `  Explicação: ${m.explanation}\n`;
      text += `  Recomendação: ${m.recommendation}\n\n`;
    });

    text += `--- DIAGNÓSTICO DA CAMPANHA ---\n${report.diagnosticoTexto}\n\n`;
    text += `--- PRÓXIMA AÇÃO RECOMENDADA ---\n${report.proximaAcaoRecomendada}\n\n`;
    text += `--- NÍVEL DE CONFIANÇA DO DIAGNÓSTICO ---\n${report.nivelConfianca}: ${report.justificativaConfianca}\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const renderStatusBadge = (status: StatusType) => {
    switch (status) {
      case 'BOM':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            BOM
          </span>
        );
      case 'ATENÇÃO':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            ATENÇÃO
          </span>
        );
      case 'CRÍTICO':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/40 shadow-sm">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            CRÍTICO
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
            N/A
          </span>
        );
    }
  };

  const renderConfidenceBadge = (nivel: NivelConfiancaType) => {
    switch (nivel) {
      case 'Diagnóstico consistente':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Diagnóstico Consistente
          </span>
        );
      case 'Diagnóstico preliminar':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Diagnóstico Preliminar
          </span>
        );
      case 'Dados insuficientes':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            Dados Insuficientes
          </span>
        );
    }
  };

  const hasData = typeof formValues.investimento === 'number' && formValues.investimento > 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Area Header */}
      <div className="bg-gradient-to-br from-[#12131a] via-[#171924] to-[#0a0b10] p-6 sm:p-8 rounded-2xl border border-gold-subtle/50 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Ferramenta de Auditoria de Tráfego
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              1. Diagnóstico de Campanha
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Insira os dados reais extraídos do seu Gerenciador de Anúncios. A ferramenta calculará com precisão matemática as métricas essenciais e apresentará um diagnóstico técnico baseado em referências de mercado.
            </p>
          </div>

          {/* Preset Helper Dropdown/Buttons (Secondary Option) */}
          <div className="bg-[#181b28] p-4 rounded-xl border border-[#2e3348] space-y-2 shrink-0 md:w-80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Dados de Exemplo (Secundário)
              </span>
              {hasData && (
                <button
                  onClick={handleReset}
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                  title="Limpar formulário"
                >
                  <RotateCcw className="w-3 h-3" />
                  Limpar
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Quer testar a ferramenta antes? Carregue um cenário de referência:
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {INDUSTRY_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs text-left font-medium transition-all cursor-pointer flex items-center justify-between ${
                    activePreset === preset.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-gold-glow'
                      : 'bg-[#10121a] text-slate-300 hover:bg-[#202536] hover:text-white border border-[#252a3d]'
                  }`}
                >
                  <span className="truncate">{preset.label}</span>
                  <ArrowRight className="w-3 h-3 shrink-0 ml-1 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STEP 1: FORMULÁRIO DE ENTRADA DE DADOS MANUAIS */}
      <div className="bg-[#11131a] p-6 sm:p-8 rounded-2xl border border-[#222638] shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#222638]">
          <div>
            <h3 className="font-syne text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-gold-glow" />
              Inserção de Dados da Campanha
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Preencha os valores acumulados do período analisado (ex: últimos 7 ou 14 dias).
            </p>
          </div>
          <div className="text-xs text-amber-300/80 font-mono bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 self-start sm:self-auto">
            Cálculo exato instantâneo
          </div>
        </div>

        {/* Campaign Name Field */}
        <div className="max-w-md">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Nome da Campanha (Opcional)
          </label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Ex: [Meta Ads] - Vendas Diretas - Brasil"
            className="w-full bg-[#181a26] border border-[#2b3045] focus:border-amber-400 focus:outline-none text-sm text-white px-3.5 py-2.5 rounded-xl transition-colors placeholder:text-slate-600"
          />
        </div>

        {/* 6 Required Manual Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* 1. Investimento */}
          <div className="space-y-1.5 bg-[#161824] p-4 rounded-xl border border-[#252a3d] focus-within:border-amber-400 transition-colors">
            <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>Investimento (R$)</span>
              <span className="text-amber-400 text-[11px]">Meta Ads</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-2.5 text-slate-500 font-bold text-sm">R$</div>
              <input
                type="number"
                min="0"
                step="any"
                value={formValues.investimento}
                onChange={(e) => handleInputChange('investimento', e.target.value)}
                placeholder="Ex: 100.00"
                className="w-full bg-[#10121a] border border-[#2b3045] focus:border-amber-400 focus:outline-none text-base font-bold text-amber-300 pl-10 pr-3 py-2 rounded-lg transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-400">Total gasto em anúncios no período.</p>
          </div>

          {/* 2. Impressões */}
          <div className="space-y-1.5 bg-[#161824] p-4 rounded-xl border border-[#252a3d] focus-within:border-amber-400 transition-colors">
            <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>Impressões</span>
              <Eye className="w-3.5 h-3.5 text-slate-400" />
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={formValues.impressoes}
                onChange={(e) => handleInputChange('impressoes', e.target.value)}
                placeholder="Ex: 10000"
                className="w-full bg-[#10121a] border border-[#2b3045] focus:border-amber-400 focus:outline-none text-base font-bold text-white px-3 py-2 rounded-lg transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-400">Total de vezes que os anúncios foram exibidos.</p>
          </div>

          {/* 3. Alcance */}
          <div className="space-y-1.5 bg-[#161824] p-4 rounded-xl border border-[#252a3d] focus-within:border-amber-400 transition-colors">
            <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>Alcance</span>
              <Users className="w-3.5 h-3.5 text-slate-400" />
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={formValues.alcance}
                onChange={(e) => handleInputChange('alcance', e.target.value)}
                placeholder="Ex: 8000"
                className="w-full bg-[#10121a] border border-[#2b3045] focus:border-amber-400 focus:outline-none text-base font-bold text-white px-3 py-2 rounded-lg transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-400">Número de pessoas únicas alcançadas.</p>
          </div>

          {/* 4. Cliques no link */}
          <div className="space-y-1.5 bg-[#161824] p-4 rounded-xl border border-[#252a3d] focus-within:border-amber-400 transition-colors">
            <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>Cliques no Link</span>
              <MousePointer className="w-3.5 h-3.5 text-slate-400" />
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={formValues.cliquesLink}
                onChange={(e) => handleInputChange('cliquesLink', e.target.value)}
                placeholder="Ex: 200"
                className="w-full bg-[#10121a] border border-[#2b3045] focus:border-amber-400 focus:outline-none text-base font-bold text-white px-3 py-2 rounded-lg transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-400">Cliques reais direcionando para a página.</p>
          </div>

          {/* 5. Compras */}
          <div className="space-y-1.5 bg-[#161824] p-4 rounded-xl border border-[#252a3d] focus-within:border-amber-400 transition-colors">
            <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>Compras / Conversões</span>
              <ShoppingCart className="w-3.5 h-3.5 text-slate-400" />
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={formValues.compras}
                onChange={(e) => handleInputChange('compras', e.target.value)}
                placeholder="Ex: 5"
                className="w-full bg-[#10121a] border border-[#2b3045] focus:border-amber-400 focus:outline-none text-base font-bold text-white px-3 py-2 rounded-lg transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-400">Número de vendas, cadastros ou mensagens.</p>
          </div>

          {/* 6. Faturamento */}
          <div className="space-y-1.5 bg-[#161824] p-4 rounded-xl border border-[#252a3d] focus-within:border-amber-400 transition-colors">
            <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>Faturamento Total (R$)</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </label>
            <div className="relative">
              <div className="absolute left-3 top-2.5 text-slate-500 font-bold text-sm">R$</div>
              <input
                type="number"
                min="0"
                step="any"
                value={formValues.faturamento}
                onChange={(e) => handleInputChange('faturamento', e.target.value)}
                placeholder="Ex: 500.00"
                className="w-full bg-[#10121a] border border-[#2b3045] focus:border-amber-400 focus:outline-none text-base font-bold text-emerald-400 pl-10 pr-3 py-2 rounded-lg transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-400">Receita bruta das conversões no período.</p>
          </div>

        </div>
      </div>

      {/* STEP 2: MÉTRICAS CALCULADAS AUTOMATICAMENTE COM STATUS VISUAL */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-syne text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Métricas Calculadas e Indicadores de Desempenho
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cálculos realizados estritamente com base nas fórmulas matemáticas padrão de tráfego pago.
            </p>
          </div>

          {hasData && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyReport}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#181c2b] hover:bg-[#22283d] text-slate-200 border border-[#2e3550] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>{copied ? 'Relatório Copiado!' : 'Copiar Diagnóstico'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#181c2b] hover:bg-[#22283d] text-slate-200 border border-[#2e3550] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Imprimir</span>
              </button>
            </div>
          )}
        </div>

        {!hasData ? (
          <div className="p-8 sm:p-12 text-center bg-[#11131a] rounded-2xl border border-[#222638] text-slate-400 space-y-3">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto" />
            <h4 className="font-syne text-base font-bold text-white">Aguardando inserção de dados</h4>
            <p className="text-sm max-w-md mx-auto text-slate-400">
              Preencha os campos de Investimento, Impressões, Alcance, Cliques, Compras e Faturamento para visualizar os cálculos exatos de CPM, CTR, CPC, Frequência, CPA e ROAS.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {report.metrics.map((m) => (
              <div
                key={m.id}
                className="bg-[#11131a] p-5 rounded-2xl border border-[#222638] hover:border-gold-subtle transition-all space-y-3 shadow-md relative overflow-hidden"
              >
                {/* Visual Accent bar depending on status */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  m.status === 'BOM' ? 'bg-emerald-500' :
                  m.status === 'ATENÇÃO' ? 'bg-amber-400' : 'bg-rose-500'
                }`} />

                <div className="flex items-start justify-between gap-2 pt-1">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      {m.label}
                    </span>
                    <span className="font-syne text-2xl font-black text-gold-bright mt-1 block tracking-tight">
                      {m.valueFormatted}
                    </span>
                  </div>
                  <div>{renderStatusBadge(m.status)}</div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-[#1d2130]">
                  {m.explanation}
                </p>

                <div className="p-3 rounded-xl bg-[#171a26] border border-[#252a3e] text-xs text-amber-200/90 space-y-1">
                  <span className="font-bold text-amber-300 block text-[11px] uppercase tracking-wider">
                    Análise Tática:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {m.recommendation}
                  </p>
                </div>

                <div className="text-[10px] text-slate-500 font-mono pt-1">
                  {m.benchmark}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STEP 3: NÍVEL DE CONFIANÇA DO DIAGNÓSTICO (Requirement 7) */}
      {hasData && (
        <div className="bg-[#11131a] p-6 rounded-2xl border border-[#222638] shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1f2333]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="font-syne text-base font-bold text-white uppercase tracking-wide">
                NÍVEL DE CONFIANÇA DO DIAGNÓSTICO
              </h3>
            </div>
            {renderConfidenceBadge(report.nivelConfianca)}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {report.justificativaConfianca}
          </p>
        </div>
      )}

      {/* STEP 4 & 5: DIAGNÓSTICO DA CAMPANHA E PRÓXIMA AÇÃO RECOMENDADA */}
      {hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Seção: DIAGNÓSTICO DA CAMPANHA (Holistic Analysis) */}
          <div className="bg-gradient-to-br from-[#12141d] via-[#161826] to-[#0e1017] p-6 sm:p-7 rounded-2xl border border-[#2e344a] shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-3 pb-3 border-b border-[#252b3e]">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-syne text-lg font-extrabold text-white">
                  DIAGNÓSTICO DA CAMPANHA
                </h3>
                <span className="text-xs text-amber-300/80 font-medium">
                  Análise integrada e contextualizada dos indicadores
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {report.diagnosticoTexto}
            </p>

            <div className="p-3.5 rounded-xl bg-[#0b0c12] border border-[#212638] text-xs text-slate-400 space-y-1">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                Resumo Técnico de Desempenho:
              </span>
              <p className="text-slate-300">
                {report.overallSummary}
              </p>
            </div>
          </div>

          {/* Seção: PRÓXIMA AÇÃO RECOMENDADA (Dynamic Action) */}
          <div className="bg-gradient-to-br from-[#18140c] via-[#1f1b10] to-[#120f09] p-6 sm:p-7 rounded-2xl border border-amber-500/40 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-3 pb-3 border-b border-amber-500/20">
              <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold shadow-gold-glow">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-syne text-lg font-extrabold text-amber-300">
                  PRÓXIMA AÇÃO RECOMENDADA
                </h3>
                <span className="text-xs text-slate-400 font-medium">
                  Orientação tática dinâmica baseada no gargalo prioritário
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm font-semibold leading-relaxed">
              {report.proximaAcaoRecomendada}
            </div>

            <div className="text-xs text-slate-400 leading-relaxed space-y-2 pt-1">
              <p>
                <strong>Nota Metodológica:</strong> As classificações de referência (BOM / ATENÇÃO / CRÍTICO) servem como diretrizes estimadas de mercado para o Meta Ads e não devem ser interpretadas como regras universais absolutas. O desempenho ideal varia conforme seu nicho, ticket médio, objetivo de campanha e margem operacional.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

