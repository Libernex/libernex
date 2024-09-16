import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { DocumentInterface } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { LOGGER } from "@repo/logger";
import LLMFactory, { LLMType } from "./LLM/llm-factory.ts";
import { ChromaClient } from "chromadb";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const RAGChain = async (): Promise<void> => {
  const question = "삼성전자 갤럭시 S24는 어떨 예정이야?";
  const retrievedDocs = await getRetrievedDocs(question);

  const formatDocs = joinContent(retrievedDocs);

  const prompt = getPrompt();
  const LLM = GPT_4O_MINI;
  const outputParser = new StringOutputParser();

  const ragChain = RunnableSequence.from([
    {
      question: new RunnablePassthrough(),
      context: new RunnablePassthrough(),
    },
    prompt,
    LLM,
    outputParser,
  ]);

  const result = await ragChain.stream(formatDocs);

  for await (const chunk of result) {
    LOGGER(chunk);
  }
};

const getRetrievedDocs = async (
  question: string,
): Promise<DocumentInterface<Record<string, any>>[]> => {
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

  const client = new ChromaClient({
    path: "http://localhost:8080",
  });
  const vectorDB = await Chroma.fromDocuments(splits, embeddings, {
    index: client,
  });

  // retriever
  const LLM = GPT_4O_MINI;

  const retrieverFromLLM = MultiQueryRetriever.fromLLM({
    retriever: vectorDB.asRetriever(),
    llm: LLM,
  });

  const retrievedDocs = await retrieverFromLLM.invoke(question);
  console.log(retrievedDocs.length);
  console.log(retrievedDocs);

  return retrievedDocs;
};

const joinContent = (
  docs: DocumentInterface<Record<string, any>>[],
): string => {
  return docs.map((doc) => doc.pageContent).join("\n\n");
};

const getPrompt = () => {
  const template = `
  당신은 질문-답변(Question-Answering)을 수행하는 친절한 AI 어시스턴트입니다. 당신의 임무는 주어진 문맥(context) 에서 주어진 질문(question) 에 답하는 것입니다.
  검색된 다음 문맥(context) 을 사용하여 질문(question) 에 답하세요.
  만약, 주어진 문맥(context) 에서 답을 찾을 수 없다면, 답을 모른다면 "주어진 정보에서 질문에 대한 정보를 찾을 수 없습니다" 라고 답하세요.
  한글로 답변해 주세요. 단, 기술적인 용어나 이름은 번역하지 않고 그대로 사용해 주세요.

  #Question:
  {question}

  #Context:
  {context}

  #Answer:
  `;
  const prompt = new PromptTemplate({
    template,
    inputVariables: ["question", "context"],
  });

  return prompt;
};

const GPT_4O_MINI = LLMFactory.createLLM(LLMType.OPENAI);

export default RAGChain;
