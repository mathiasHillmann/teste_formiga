export interface CorretoraModalProps {
  isOpen: boolean;
  data: CorretoraModalData | null;
  onModalClose: () => void;
}

export interface CorretoraModalData {
  cnpj: string;
  nome: string;
}
