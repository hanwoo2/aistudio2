
import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onFileChange: (file: File) => void;
  previewUrl: string | null;
}

const UploadIcon: React.FC = () => (
    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileChange, previewUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  }, [onFileChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };
  
  const handleLabelClick = () => {
    document.getElementById('file-upload')?.click();
  }

  return (
    <div className="flex justify-center">
      <div 
        className={`w-full max-w-lg mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300'} border-dashed rounded-xl transition-colors duration-200 relative overflow-hidden`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="업로드 미리보기" className="max-h-64 object-contain rounded-lg" />
            <button onClick={handleLabelClick} className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm text-gray-700 font-semibold py-1 px-3 rounded-full text-sm shadow-md hover:bg-white transition-all">
                사진 변경
            </button>
          </>
        ) : (
          <div className="space-y-1 text-center py-8">
            <UploadIcon />
            <div className="flex text-sm text-gray-600 justify-center">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                <span>파일 업로드</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileSelect} accept="image/*" />
              </label>
              <p className="pl-1">또는 파일을 끌어다 놓으세요</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};
