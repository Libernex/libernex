import { ChromaClient } from "chromadb";

export const ChromaDBClient = ({
  path,
  tenant,
  database,
}: TChromaClient): ChromaClient => {
  return new ChromaClient({
    path,
    tenant,
    database,
  });
};

type TChromaClient = {
  path?: string;
  tenant?: string;
  database?: string;
};
