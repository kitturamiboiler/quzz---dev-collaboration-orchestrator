import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// CSS 파일을 여기서 불러와야 빌드 도구(Vite)가 정상적으로 인식합니다.
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);