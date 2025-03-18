import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <h1 className="text-xl font-bold">Weather Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="container flex min-h-screen gap-4 py-4">
        <aside className="w-64 shrink-0">
          {/* Sidebar content will go here */}
        </aside>
        
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

export default RootLayout