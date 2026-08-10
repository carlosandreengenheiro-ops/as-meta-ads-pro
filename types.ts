export type StatusType = 'BOM' | 'ATENÇÃO' | 'CRÍTICO' | 'N/A';

export type NivelConfiancaType = 'Dados insuficientes' | 'Diagnóstico preliminar' | 'Diagnóstico consistente';

export interface CampaignMetricsInput {
  investimento: number | ''; // R$ Spend
  impressoes: number | ''; // Impressions
  alcance: number | ''; // Reach
  cliquesLink: number | ''; // Link Clicks
  compras: number | ''; // Conversions / Purchases / Leads
  faturamento: number | ''; // Revenue / Sales value (R$)
  custeioExtra?: number | ''; // Optional product/operational costs
}

export interface MetricAnalysisResult {
  id: string;
  label: string;
  valueFormatted: string;
  unit: string;
  status: StatusType;
  explanation: string;
  recommendation: string;
  benchmark: string;
}

export interface DiagnosticReport {
  overallStatus: StatusType;
  overallSummary: string;
  metrics: MetricAnalysisResult[];
  diagnosticoTexto: string;
  proximaAcaoRecomendada: string;
  nivelConfianca: NivelConfiancaType;
  justificativaConfianca: string;
  calculatedData: {
    cpm: number | null;
    ctr: number | null;
    cpc: number | null;
    frequencia: number | null;
    cpa: number | null;
    roas: number | null;
    taxaConversao: number | null;
    roi: number | null;
  };
}

export interface ChecklistErrorItem {
  id: number;
  number: number;
  title: string;
  category: 'Estrutura & Pixel' | 'Criativos & Copy' | 'Públicos & Escala' | 'Métricas & Análise';
  description: string;
  howToFix: string;
  ebookChapter: string;
}

export type ActiveTab = 'diagnostico' | 'checklist' | 'calculadoras' | 'metodo';
