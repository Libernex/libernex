import { useState } from "react";
import axios from "axios";

interface FileUploadResponse {
  result: boolean;
  savedFileInfo: {
    id: string;
    storedPath: string;
    fileName: string;
    originalName: string;
    size: number;
  };
}

interface EmbeddingResponse {
  result: boolean;
}

const useUploadFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. 파일 업로드
      const formData = new FormData();
      formData.append("file", file);

      const fileUploadResponse = await axios.post<FileUploadResponse>(
        "/api/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (!fileUploadResponse.data.result) {
        throw new Error("File upload failed");
      }

      const fileId = fileUploadResponse.data.savedFileInfo.id;

      // 2. 임베딩 요청
      const embeddingResponse = await axios.post<EmbeddingResponse>(
        "/api/embedding/pdf",
        { source: fileId },
      );

      return embeddingResponse.data.result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadLink = async (url: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<EmbeddingResponse>(
        "/api/embedding/web",
        { source: url },
      );
      return response.data.result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadFile, uploadLink, isLoading, error };
};

export default useUploadFile;
