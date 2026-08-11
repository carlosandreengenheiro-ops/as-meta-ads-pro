import React, { useState, useEffect } from 'react';
import { CHECKLIST_21_ERRORS } from '../src/data/checklistErrors';
import { ChecklistErrorItem } from '../types';
import { 
  CheckSquare, Square, Filter, RefreshCw, BookOpen, ChevronDown, 
  ChevronUp, CheckCircle, Award, Sparkles, Search, Layers 
} from 'lucide-react';

export const Checklist21: React.FC = () => {
  // Load initial checked items from localStorage if available
  const [checkedIds, setCheckedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('as_meta_ads_pro_checklist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<'todos' | 'pendentes' | 'revisados'>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('as_meta_ads_pro_checklist', JSON.stringify(checkedIds));
    } catch {
      // Ignore fallback
    }
  }, [checkedIds]);

  const toggleCheck = (id: number) => {
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleSelectAll = () => {
    setCheckedIds(CHECKLIST_21_ERRORS.map(e => e.id));
  };

  const handleClearAll = () => {
    setCheckedIds([]);
  };

  const reviewedCount = checkedIds.length;
  const totalCount = CHECKLIST_21_ERRORS.length;
  const progressPercent = Math.round((reviewedCount / totalCount) * 100);

  // Categories list
  const categories = ['todas', 'Estrutura & Pixel', 'Criativos & Copy', 'Públicos & Escala', 'Métricas & Análise'];

  // Filter items
  const filteredItems = CHECKLIST_21_ERRORS.filter(item => {
    const isChecked = checkedIds.includes(item.id);
    if (filter === 'pendentes' && isChecked) return false;
    if (filter === 'revisados' && !isChecked) return false;

    if (selectedCategory !== 'todas' && item.category !== selectedCategory) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchNumber = item.number.toString() === q;
      return matchTitle || matchDesc || matchNumber;
    }

    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Area 2 Intro Card */}
      <div className="bg-gradient-to-br from-[#12141c] via-[#171a26] to-[#0e0f16] p-6 sm:p-8 rounded-2xl border border-gold-subtle shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Área 2 — Manual de Sobrevivência
          </div>
          <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Checklist dos 21 Erros de Meta Ads
          </h2>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Antes de ativar qualquer campanha ou escalar orçamento no Meta Ads Manager, passe por este checklist de 21 pontos estratégicos extraídos do nosso E-book Oficial. Marque cada erro conforme sua auditoria.
          </p>
        </div>

        {/* Progress Bar Header */}
        <div className="mt-6 pt-6 border-t border-[#232736] space-y-3">
          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
            <span className="text-slate-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Seu progresso: <span className="text-gold-bright font-bold font-mono">{reviewedCount} de {totalCount}</span> erros revisados
            </span>
            <span className="text-amber-300 font-mono font-bold">{progressPercent}% Concluído</span>
          </div>

          <div className="w-full h-3 bg-[#181b26] rounded-full overflow-hidden border border-[#272b3c] p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 rounded-full transition-all duration-500 shadow-gold-glow"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="bg-[#11131a] p-4 rounded-xl border border-[#232736] flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'todos'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-[#181b26] text-slate-300 hover:bg-[#222638]'
            }`}
          >
            Todos ({totalCount})
          </button>
          <button
            onClick={() => setFilter('pendentes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'pendentes'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-[#181b26] text-slate-300 hover:bg-[#222638]'
            }`}
          >
            Pendentes ({totalCount - reviewedCount})
          </button>
          <button
            onClick={() => setFilter('revisados')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'revisados'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-[#181b26] text-slate-300 hover:bg-[#222638]'
            }`}
          >
            Revisados ({reviewedCount})
          </button>
        </div>

        {/* Category & Search Input */}
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto bg-[#181b26] border border-[#2b3044] text-xs text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-400"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'todas' ? 'Todas as Categorias' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar erro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181b26] border border-[#2b3044] text-xs text-slate-200 pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-amber-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>

          {/* Bulk Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleSelectAll}
              className="text-[11px] px-2.5 py-1.5 rounded bg-[#1e2230] text-slate-300 hover:text-white hover:bg-[#282d3f] transition-all cursor-pointer"
              title="Marcar Todos como Revisados"
            >
              Marcar Todos
            </button>
            <button
              onClick={handleClearAll}
              className="text-[11px] px-2.5 py-1.5 rounded bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-all cursor-pointer"
              title="Limpar Progresso"
            >
              Desmarcar
            </button>
          </div>
        </div>
      </div>

      {/* 21 Items Checklist Grid / List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center bg-[#11131a] rounded-2xl border border-[#232736] text-slate-400">
            Nenhum erro encontrado para o filtro selecionado.
          </div>
        ) : (
          filteredItems.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all ${
                  isChecked
                    ? 'bg-[#10131d]/80 border-emerald-500/30'
                    : 'bg-[#11131a] border-[#222636] hover:border-gold-subtle'
                }`}
              >
                <div className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
                  {/* Custom Checkbox Toggle */}
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className="mt-1 cursor-pointer shrink-0 focus:outline-none"
                    aria-label={`Marcar erro ${item.number}`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-6 h-6 text-emerald-400 fill-emerald-500/20 transition-transform scale-105" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-500 hover:text-amber-400 transition-colors" />
                    )}
                  </button>

                  {/* Number Badge */}
                  <div className={`w-8 h-8 rounded-xl font-syne font-bold text-xs flex items-center justify-center shrink-0 ${
                    isChecked
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-[#1a1e2b] text-amber-300 border border-amber-500/30'
                  }`}>
                    #{item.number}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1c202e] text-slate-300 border border-[#2b3044]">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-amber-400/80 font-mono hidden sm:inline">
                        {item.ebookChapter}
                      </span>
                    </div>

                    <h3 className={`font-syne font-bold text-base sm:text-lg transition-colors ${
                      isChecked ? 'line-through text-slate-400' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Expandable Fix Details */}
                    {isExpanded && (
                      <div className="mt-4 p-4 rounded-xl bg-[#161924] border border-amber-500/20 space-y-2 animate-fadeIn">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                          <BookOpen className="w-4 h-4 text-amber-400" />
                          Como corrigir no Gerenciador de Anúncios:
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                          {item.howToFix}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="text-slate-400 hover:text-amber-300 p-2 rounded-lg bg-[#181b26] border border-[#272b3d] transition-colors shrink-0 cursor-pointer text-xs flex items-center gap-1"
                    title="Ver detalhes de correção"
                  >
                    <span className="hidden md:inline">{isExpanded ? 'Ocultar' : 'Como Corrigir'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Progress Statement required by user specification */}
      <div className="bg-gradient-to-r from-[#17150c] via-[#242010] to-[#17150c] p-6 rounded-2xl border border-gold-subtle text-center space-y-2">
        <h3 className="font-syne text-lg font-bold text-white">
          Seu progresso: <span className="text-gold-bright">{reviewedCount} de {totalCount}</span> erros revisados.
        </h3>
        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          Revisando estes 21 pontos antes de subir sua próxima campanha, você elimina os maiores ralo de dinheiro e garante que cada real investido no Meta Ads trabalhe a favor do seu ROI.
        </p>
      </div>
    </div>
  );
};
