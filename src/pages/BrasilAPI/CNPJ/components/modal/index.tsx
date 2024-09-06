import { Modal } from 'antd';
import { CnpjModalProps } from './interfaces';
import { useEffect } from 'react';

export const ModalCnpj: React.FC<CnpjModalProps> = ({ isOpen, data, onModalClose }: CnpjModalProps) => {
  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);

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
