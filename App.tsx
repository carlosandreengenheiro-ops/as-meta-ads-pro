import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { DiagnosticForm } from './components/DiagnosticForm';
import { Checklist21 } from './components/Checklist21';
import { Calculators } from './components/Calculators';
import { MethodPro } from './components/MethodPro';
import { FutureArchitectureNotice } from './components/FutureArchitectureNotice';
import { ShieldCheck, Award, Sparkles, BookOpen, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('diagnostico');
  const [isArchNoticeOpen, setIsArchNoticeOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-300 flex flex-col justify-between">
      <div>
        {/* Sticky Header with Navigation Tabs */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenArchNotice={() => setIsArchNoticeOpen(true)}
        />

        {/* Main Application Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {activeTab === 'diagnostico' && <DiagnosticForm />}
          {activeTab === 'checklist' && <Checklist21 />}
          {activeTab === 'calculadoras' && <Calculators />}
          {activeTab === 'metodo' && (
            <MethodPro onOpenArchNotice={() => setIsArchNoticeOpen(true)} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-[#090a0e] border-t border-[#1a1c26] py-8 px-4 sm:px-6 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-syne font-black text-lg text-gold-bright tracking-tight">
                AS META ADS PRO
              </span>
              <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20 font-bold uppercase">
                Edição E-Book
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Ferramenta estratégica para empresários, gestores de tráfego e anunciantes operarem com inteligência de dados.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <button
              onClick={() => setActiveTab('diagnostico')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Diagnóstico
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => setActiveTab('checklist')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              21 Erros
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => setActiveTab('calculadoras')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Calculadoras
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => setActiveTab('metodo')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Método
            </button>
          </div>

          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} AS META ADS PRO. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Architecture Notice Modal */}
      <FutureArchitectureNotice
        isOpen={isArchNoticeOpen}
        onClose={() => setIsArchNoticeOpen(false)}
      />
    </div>
  );
}
