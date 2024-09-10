import { Chart, LineConfig } from '@ant-design/charts';
import { PropsWithoutRef, RefAttributes } from 'react';

export type AntLineConfig = PropsWithoutRef<LineConfig> & RefAttributes<Chart>;
