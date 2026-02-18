
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  step?: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, step }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">Q</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Quzz</span>
          </div>
          {step !== undefined && step > 0 && (
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${step >= i ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                    {i}
                  </div>
                  {i < 4 && <div className={`w-8 h-1 ${step > i ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
      <main className="flex-grow flex flex-col max-w-6xl mx-auto w-full p-6 md:p-12">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm">
        &copy; 2024 Quzz - All rights reserved for Bootcamp Dreamers.
      </footer>
    </div>
  );
};
