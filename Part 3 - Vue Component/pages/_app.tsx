import "../assets/styles/reset.scss";
import "../assets/styles/globals.scss";

import type { AppProps } from "next/app";
import { NextPage } from "next";
import { createContext, ReactElement, ReactNode, useRef } from "react";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type AppContextType = {
  rootRef: React.RefObject<HTMLDivElement> | null;
};

export const AppContext = createContext<AppContextType>({ rootRef: null });

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef}>
      <AppContext.Provider value={{ rootRef: rootRef }}>
        {getLayout(<Component {...pageProps} />)}
      </AppContext.Provider>
    </div>
  );
}

export default MyApp;
