import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import TagManager from 'react-gtm-module';
import './index.css';
import { App } from './App.tsx';
import { store } from './store';
import './styles/global-ui-scale.scss';

const GTM_CONTAINER_ID = 'GTM-K9LNN8Q';

const bootstrap = async () => {
  TagManager.initialize({ gtmId: GTM_CONTAINER_ID });

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
};

bootstrap();
