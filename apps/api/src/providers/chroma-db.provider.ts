import { ChromaClient } from "chromadb";

const ChromaDbProvider = () => {
  const client = (): ChromaClient => {
    return new ChromaClient({
      path: process.env.CHROMA_DB_URL as string,
    });
  };

  return {
    client,
  };
};

export default ChromaDbProvider;
