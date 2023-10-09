import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from '@descope/react-sdk';

const projectId = import.meta.env.VITE_DESCOPE_PROJECT_ID ? import.meta.env.VITE_DESCOPE_PROJECT_ID: " "
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <AuthProvider
            projectId={projectId}
        >
            <App />
        </AuthProvider>
  </React.StrictMode>,
)
