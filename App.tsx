
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { FigureViewer } from './components/FigureViewer';
import { Loader } from './components/Loader';
import { generateAllFigureViews } from './services/geminiService';
import type { Figure } from './types';
import { VIEWS } from './constants';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedFigures, setGeneratedFigures] = useState<Figure[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setGeneratedFigures([]);
      setError(null);
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!selectedFile) {
      setError('먼저 사진을 업로드해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedFigures([]);

    try {
      const images = await generateAllFigureViews(selectedFile);
      const figureData: Figure[] = VIEWS.map((view, index) => ({
        id: view.id,
        label: view.label,
        imageUrl: images[index],
      }));
      setGeneratedFigures(figureData);
    } catch (err) {
      console.error(err);
      setError('피규어 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <main className="mt-12">
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-700">
              세상에 단 하나뿐인 당신의 피규어
            </h2>
            <p className="mt-2 text-center text-gray-500">
              사진 한 장을 업로드하면 AI가 4가지 각도의 피규어를 만들어 드립니다.
            </p>

            <div className="mt-8">
              <ImageUploader onFileChange={handleFileChange} previewUrl={previewUrl} />
            </div>

            {error && (
              <div className="mt-6 text-center text-red-500 bg-red-100 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleGenerateClick}
                disabled={!selectedFile || isLoading}
                className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
              >
                {isLoading ? '생성 중...' : '피규어 생성하기'}
              </button>
            </div>
          </div>

          {isLoading && <Loader />}

          {!isLoading && generatedFigures.length > 0 && (
            <div className="mt-12">
              <FigureViewer figures={generatedFigures} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
