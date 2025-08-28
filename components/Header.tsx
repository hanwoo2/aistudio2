
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          짱승봇의 3D 피규어 생성기
        </span>
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
        AI와 함께 나만의 특별한 피규어를 만들어보세요.
      </p>
    </header>
  );
};
