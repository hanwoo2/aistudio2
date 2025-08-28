
import React from 'react';

export const Loader: React.FC = () => {
    const messages = [
        "AI가 당신의 사진을 분석하고 있어요...",
        "피규어의 재질을 결정하는 중...",
        "섬세한 붓터치로 색을 입히고 있어요...",
        "스튜디오 조명을 설정하는 중입니다...",
        "거의 다 됐어요! 잠시만 기다려주세요."
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 3000); // Change message every 3 seconds

        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col justify-center items-center z-50 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
      <p className="mt-4 text-white text-lg font-medium transition-opacity duration-500">{message}</p>
    </div>
  );
};
