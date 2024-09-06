export interface CepForm {
  cep: string;
}

export interface CepData {
  cep: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  location: {
    type: string;
    coordinates: {
      longitude: string;
      latitude: string;
    }
  }
  service: string;
}

interface CepValidationError {
  message: string;
  service: string;
}

export interface CepErrorResponse {
  name: string;
  message: string;
  type: string;
  errors: CepValidationError[];
}