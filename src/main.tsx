import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';

import App from './App.tsx';
import './index.css';

const client = new QueryClient();

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

const element = (
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);

if (rootElement && rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, element);
} else {
  root.render(element);
}
