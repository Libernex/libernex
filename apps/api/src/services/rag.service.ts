import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import ChromaDbProvider from "../providers/chroma-db.provider.ts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { DocumentInterface } from "@langchain/core/documents";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const getRetrievedDocs = async (): Promise<
  DocumentInterface<Record<string, any>>[]
> => {
  // 데이터 불러오기
  // 여기서는 웹
  const loader: CheerioWebBaseLoader = new CheerioWebBaseLoader(
    "https://n.news.naver.com/mnews/article/003/0012317114?sid=105",
  );
  const docs = await loader.load();
  console.log(`docs len: ${docs.length}`);

  // 텍스트 스플릿
  const textSplitter: RecursiveCharacterTextSplitter =
    new RecursiveCharacterTextSplitter({ chunkSize: 300, chunkOverlap: 0 });
  const splits = await textSplitter.splitDocuments(docs);
  console.log(`splits len: ${splits.length}`);

  // VectorDB
  const modelName = "jhgan/ko-sbert-nli";
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: OPENAI_API_KEY,
  });

  const { client } = ChromaDbProvider();
  const vectorDB = await Chroma.fromDocuments(splits, embeddings, {
    index: client(),
  });

  const LLM = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: OPENAI_API_KEY,
  });

  const retrieverFromLLM = MultiQueryRetriever.fromLLM({
    retriever: vectorDB.asRetriever(),
    llm: LLM,
  });

  const question = "삼성전자 갤럭시 S24는 어떨 예정이야?";
  const retrievedDocs = await retrieverFromLLM.invoke(question);
  console.log(retrievedDocs.length);
  console.log(retrievedDocs);

  return retrievedDocs;
};
