export interface BrokerModalProps {
  isOpen: boolean;
  data: BrokerModalData | null;
  onModalClose: () => void;
}

export interface BrokerModalData {
  cnpj: string;
  nome: string;
}
