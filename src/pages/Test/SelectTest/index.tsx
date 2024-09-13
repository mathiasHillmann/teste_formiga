import React from 'react';
import { CustomSelect } from './components/CustomSelect';

export const SelectTest: React.FC = () => {
  return (
    <CustomSelect
      route="clients/options"
      antProps={{ placeholder: 'Selecione um cliente', style: { width: '20em' } }}
    />
  );
};
