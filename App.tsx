import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { DiagnosticForm } from './components/DiagnosticForm';
import { Checklist21 } from './components/Checklist21';
import { Calculators } from './components/Calculators';
import { MethodPro } from './components/MethodPro';
import { FutureArchitectureNotice } from './components/FutureArchitectureNotice';
import {
  ShieldCheck,
  LockKeyhole,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] =
    useState<ActiveTab>('diagnostico');

  const [isArchNoticeOpen, setIsArchNoticeOpen] =
    useState<boolean>(false);

  // Verifica se o usuário já liberou o acesso neste dispositivo
  const [hasAccess, setHasAccess] = useState<boolean>(() => {
    return localStorage.getItem('as_meta_ads_access') === 'granted';
  });

  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState(false);

  // CÓDIGO TEMPORÁRIO DE ACESSO
  // Depois vamos substituir por login individual dos compradores.
  const APP_ACCESS_CODE = 'META2026';

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();

    if (accessCode.trim().toUpperCase() === APP_ACCESS_CODE) {
      localStorage.setItem('as_meta_ads_access', 'granted');
      setHasAccess(true);
      setAccessError(false);
    } else {
      setAccessError(true);
    }
  };

  // =========================
  // TELA DE ACESSO
  // =========================

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex items-center justify-center px-4 relative overflow-hidden">

        {/* Efeito de fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_35%)]" />

        <div className="relative w-full max-w-md">

          <div className="bg-[#12141c] border border-[#2a2d3a] rounded-2xl p-6 sm:p-8 shadow-2xl">

            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <ShieldCheck
                  size={34}
                  className="text-amber-400"
                />
              </div>
            </div>

            {/* Título */}
            <div className="text-center mb-8">

              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles
                  size={16}
                  className="text-amber-400"
                />

                <span className="text-xs font-bold tracking-[0.2em] text-amber-400 uppercase">
                  Área exclusiva
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white">
                AS META ADS PRO
              </h1>

              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Insira seu código de acesso para utilizar todas as
                ferramentas, diagnósticos e análises estratégicas.
              </p>
            </div>

            {/* Formulário */}
            <form
              onSubmit={handleAccess}
              className="space-y-4"
            >

              <div>
                <label className="text-xs font-bold text-slate-300 mb-2 block">
                  CÓDIGO DE ACESSO
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                      setAccessError(false);
                    }}
                    placeholder="Digite seu código"
                    className="w-full bg-[#0b0c10] border border-[#303442] rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-amber-500 transition-colors"
                  />

                </div>

                {accessError && (
                  <p className="text-xs text-red-400 mt-2">
                    Código inválido. Verifique e tente novamente.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-[#0b0c10] font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                ACESSAR A PLATAFORMA

                <ArrowRight size={19} />
              </button>

            </form>

            {/* Rodapé */}
            <div className="border-t border-[#252834] mt-6 pt-5 text-center">

              <p className="text-xs text-slate-500">
                Comprou e ainda não recebeu seu acesso?
              </p>

              <p className="text-xs text-amber-400 font-semibold mt-1">
                Entre em contato com o suporte.
              </p>

            </div>

          </div>

          <p className="text-center text-xs text-slate-600 mt-5">
            © {new Date().getFullYear()} AS META ADS PRO
          </p>

        </div>
      </div>
    );
  }

  // =========================
  // APLICATIVO
  // =========================

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-300 flex flex-col justify-between">

      <div>

        {/* Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenArchNotice={() => setIsArchNoticeOpen(true)}
        />

        {/* Conteúdo */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

          {activeTab === 'diagnostico' && (
            <DiagnosticForm />
          )}

          {activeTab === 'checklist' && (
            <Checklist21 />
          )}

          {activeTab === 'calculadoras' && (
            <Calculators />
          )}

          {activeTab === 'metodo' && (
            <MethodPro
              onOpenArchNotice={() =>
                setIsArchNoticeOpen(true)
              }
            />
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
                Plataforma PRO
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

      {/* Modal */}
      <FutureArchitectureNotice
        isOpen={isArchNoticeOpen}
        onClose={() => setIsArchNoticeOpen(false)}
      />

    </div>
  );
}
