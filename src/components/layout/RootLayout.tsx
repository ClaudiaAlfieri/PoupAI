import { Outlet } from 'react-router-dom'

import { Header } from '../shared/Header'

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-(--border) bg-card px-6 py-4 text-center text-sm text-muted-foreground">
        Code with ❤️ © 2026 by Cláudia Alfieri
      </footer>
    </div>
  )
}