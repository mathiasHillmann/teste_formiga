import { Modal } from 'antd';
import { CnpjModalProps } from './interfaces';

export const ModalCnpj: React.FC<CnpjModalProps> = ({ isOpen, data, onModalClose }: CnpjModalProps) => {
  return (
    <Modal
      title="Dados CNPJ"
      open={isOpen}
      onCancel={onModalClose}
      width={'80em'}
      okButtonProps={{ style: { display: 'none' } }}
      cancelText={'Fechar'}
      styles={{ body: { overflowY: 'auto', maxHeight: 'calc(100vh - 25em)' } }}
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Modal>
  );
};
