import { useBoolean } from 'ahooks';
import { useState } from 'react';

const useModal = <T>() => {
  const [isOpen, { setTrue, setFalse }] = useBoolean();
  const [data, setData] = useState<T | null>(null);

  const handleOpen = (data?: T) => {
    if (data) {
      setData(data);
    }

    setTrue();
  };

  const handleClose = () => {
    setData(null);

    setFalse();
  };

  return {
    isOpen,
    handleOpen,
    handleClose,
    data,
  };
};

export default useModal;
