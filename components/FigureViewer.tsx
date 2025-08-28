
import React from 'react';
import type { Figure } from '../types';

interface FigureViewerProps {
  figures: Figure[];
}

export const FigureViewer: React.FC<FigureViewerProps> = ({ figures }) => {
  return (
    <section>
      <h3 className="text-3xl font-bold text-center text-gray-800">생성된 피규어</h3>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {figures.map((figure) => (
          <div key={figure.id} className="group flex flex-col items-center">
             <div className="bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 w-full">
                <img
                    src={figure.imageUrl}
                    alt={`${figure.label} 피규어`}
                    className="w-full h-auto aspect-square object-contain rounded-xl"
                />
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-700">{figure.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
