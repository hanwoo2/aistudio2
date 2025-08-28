
import { GoogleGenAI, Modality } from "@google/genai";
import { BASE_PROMPT, VIEWS } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove 'data:mime/type;base64,' prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });

const generateFigureView = async (base64Data: string, mimeType: string, viewPrompt: string): Promise<string> => {
  const model = 'gemini-2.5-flash-image-preview';

  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        {
          text: `${viewPrompt} ${BASE_PROMPT}`,
        },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error(`Image generation failed for view: ${viewPrompt}. No image data received.`);
};

export const generateAllFigureViews = async (file: File): Promise<string[]> => {
  const base64Data = await fileToBase64(file);
  const mimeType = file.type;

  const generationPromises = VIEWS.map(view => 
    generateFigureView(base64Data, mimeType, view.prompt)
  );

  return Promise.all(generationPromises);
};
