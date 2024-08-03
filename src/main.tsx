import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from './theme/theme.ts'
import { SnackbarProvider } from './contexts/SnackbarContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
      <CssBaseline />
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>  </React.StrictMode>,
)
