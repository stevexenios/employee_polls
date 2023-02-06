import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import store from './redux/store';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

async function employeePollsStart() {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthProvider>
        </HashRouter>
      </Provider>
    </React.StrictMode>
  );
}

employeePollsStart();

