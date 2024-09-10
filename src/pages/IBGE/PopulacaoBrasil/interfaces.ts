interface IBGEClassificacao {
  id: string;
  nome: string;
  categoria: Record<string, any>;
}

interface IBDGESerie {
  localicade: {
    id: string;
    nivel: {
      id: string;
      nome: string;
    };
    nome: string;
  };
  serie: Record<string, any>;
}

interface IBGEResultados {
  classificacoes: IBGEClassificacao[];
  series: IBDGESerie[];
}

export interface IBGEData {
  id: string;
  variavel: string;
  unidade: string;
  resultados: IBGEResultados[];
}

export interface GraphSerie {
  year: string;
  value: number;
  category: string;
}
