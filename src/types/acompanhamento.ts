export type Acompanhamento = {
  id: number;
  paciente: string;
  convenio: number;
  clinica: string;
  medico: string;
  situacao_clinica: string;
  ultimo_acesso: string;
  tipo_de_acesso: string;
  ultimo_usv: string;
  lesao_50: string;
  alteracao_clinica: string;
  lesoes: string;
  tratamentos: string;
  observacao: string;
  qtd_lesoes_acompanhamento: number;
  qtd_tratamentos_acompanhamento: number;
};