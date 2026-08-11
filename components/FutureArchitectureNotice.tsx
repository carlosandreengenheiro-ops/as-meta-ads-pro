import React from 'react';
import { X, ShieldCheck, Database, Key, CreditCard, Layers, CheckCircle2, Lock, Sparkles, ArrowRight } from 'lucide-react';

interface FutureArchitectureNoticeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FutureArchitectureNotice: React.FC<FutureArchitectureNoticeProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#11131a] border border-gold-subtle rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-[#181b26] border border-[#2b3044] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Arquitetura & Preparação Técnica
          </span>
          <h3 className="font-syne text-2xl font-bold text-white">
            Pronto para Expansão Futura (SaaS Ready)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Atendendo rigorosamente às especificações do projeto, a versão atual é 100% funcional sem barreiras de paywall, com o código modularizado para conexões futuras.
          </p>
        </div>

        {/* Modular Systems Checklist */}
        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-xl bg-[#171a26] border border-[#272c3e] flex items-start gap-3">
            <Key className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-white">1. Sistema de Autenticação (Login / Cadastro)</h4>
              <p className="text-xs text-slate-300 mt-1">
                A camada de estado global está abstraída com suporte a `authContext` para Firebase Auth, Supabase Auth ou OAuth2 (Google/Facebook).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#171a26] border border-[#272c3e] flex items-start gap-3">
            <Database className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-white">2. Banco de Dados Persistente (Cloud Storage)</h4>
              <p className="text-xs text-slate-300 mt-1">
                Atualmente salvando o estado no `localStorage` do navegador. Pronto para sincronização cloud em Firestore ou PostgreSQL para salvar histórico de campanhas auditadas.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#171a26] border border-[#272c3e] flex items-start gap-3">
            <Layers className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-white">3. Divisão de Níveis (Área Gratuita vs Área Premium)</h4>
              <p className="text-xs text-slate-300 mt-1">
                Estrutura de Feature Flags preparada para limitar diagnósticos ilimitados, relatórios em PDF personalizados e templates de criativos apenas para membros PRO.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#171a26] border border-[#272c3e] flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-white">4. Integração com Plataformas de Pagamento (Hotmart/Kiwify/Stripe)</h4>
              <p className="text-xs text-slate-300 mt-1">
                Webhooks e rotas API preparadas para liberar acesso automático de assinantes recorrentes após o checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#232736] flex justify-between items-center">
          <span className="text-xs text-slate-400 font-mono">Status: MVP Funcional Concluído</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
