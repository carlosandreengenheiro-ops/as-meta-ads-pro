import React from 'react';
import { ActiveTab } from '../types';
import { Activity, CheckSquare, Calculator, BookOpen, ShieldCheck, Sparkles, Share2 } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenArchNotice?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenArchNotice }) => {
  const tabs = [
    { id: 'diagnostico' as ActiveTab, label: '1. DIAGNÓSTICO DE CAMPANHA', icon: Activity, shortLabel: 'Diagnóstico' },
    { id: 'checklist' as ActiveTab, label: '2. CHECKLIST DOS 21 ERROS', icon: CheckSquare, shortLabel: '21 Erros' },
    { id: 'calculadoras' as ActiveTab, label: '3. CALCULADORAS', icon: Calculator, shortLabel: 'Calculadoras' },
    { id: 'metodo' as ActiveTab, label: '4. MÉTODO AS META ADS PRO', icon: BookOpen, shortLabel: 'Método' },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AS META ADS PRO',
        text: 'Analise suas campanhas de Meta Ads, encontre erros e tome decisões com mais segurança.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link do aplicativo copiado para a área de transferência!');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0e12]/95 backdrop-blur-md border-b border-[#232631] no-print">
      {/* Top Banner / Agency Badge */}
      <div className="bg-gradient-to-r from-[#17150c] via-[#2b2512] to-[#17150c] py-1.5 px-4 text-xs font-medium text-amber-300/90 border-b border-amber-500/20 flex justify-between items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <span className="flex items-center gap-1.5 tracking-wider uppercase text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Ferramenta Oficial Complementar ao E-Book Meta Ads
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 text-[11px]"
              title="Compartilhar App"
            >
              <Share2 className="w-3 h-3" />
              <span className="hidden sm:inline">Compartilhar</span>
            </button>
            <button
              onClick={onOpenArchNotice}
              className="text-amber-400/90 hover:text-amber-200 transition-colors flex items-center gap-1 text-[11px] bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30"
            >
              <Sparkles className="w-3 h-3" />
              <span>Sistemas & Expansão</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Brand Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="text-center sm:text-left flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-gold-glow flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#0b0c10] rounded-[10px] flex items-center justify-center">
              <span className="font-syne font-black text-lg text-gold-bright tracking-tighter">AS</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                AS META ADS <span className="text-gold-gradient font-black">PRO</span>
              </h1>
              <span className="bg-amber-500/15 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-widest">
                AGENCY GRADE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              "Pare de desperdiçar dinheiro com anúncios."
            </p>
          </div>
        </div>

        {/* Agency Tagline Notice */}
        <div className="hidden lg:block text-right">
          <p className="text-xs font-medium text-slate-300">Auditoria & Diagnóstico Estratégico</p>
          <p className="text-[11px] text-slate-500">Decisões baseadas em dados e ROI real</p>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 sm:space-x-2 border-t border-[#1e2230] pt-2 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-transparent text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#161822] border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
