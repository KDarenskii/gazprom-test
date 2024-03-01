import { FC, PropsWithChildren } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Theme className="theme-provider" preset={presetGpnDefault}>
      {children}
    </Theme>
  );
};
