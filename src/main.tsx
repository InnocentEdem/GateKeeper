import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from './theme/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>  </React.StrictMode>,
)
