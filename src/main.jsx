import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // ← Добавили
import App from './App.jsx'
import './index.css'

// 1. Создаем клиент (он будет управлять кэшем)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Чтобы данные не обновлялись при каждом клике на окно
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}> {/* ← Обернули */}
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)