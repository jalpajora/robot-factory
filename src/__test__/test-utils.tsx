import React, { ReactElement, ComponentType } from 'react';
import { render as rtlRender } from '@testing-library/react';
// import { store } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
// Import your own reducer
import { store } from '../state';

interface IWrapperProps {
  children?: ComponentType;
}

function render(ui: ReactElement) {
  const Wrapper = ({ children }: IWrapperProps): ReactElement => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper as ComponentType });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
