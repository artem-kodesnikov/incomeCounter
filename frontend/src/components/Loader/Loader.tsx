import { CircularProgress } from '@mui/material';
import React, { FC } from 'react';
import { StyledBackDrop } from './Loader.style';

type Props = {
  isLoading: boolean
}

export const Loader: FC<Props> = ({ isLoading }) => {
  return (
    <StyledBackDrop open={isLoading}>
      <CircularProgress color='inherit' />
    </StyledBackDrop>
  );
};
