export interface FipeForm {
  type: number;
  brand: number;
  model: number;
  year: number;
}

export interface FipeOption {
  codigo: number;
  nome: string;
}

export interface FipeModelResponse {
  modelos: FipeOption[];
  anos: FipeOption[];
}

export interface FipeData {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
}