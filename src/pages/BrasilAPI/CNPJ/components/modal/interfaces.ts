export interface CnpjModalProps {
  isOpen: boolean;
  data: Record<string, any> | null;
  onModalClose: () => void;
}