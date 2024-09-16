import { DocumentInterface } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { LOGGER } from "@repo/logger";
import LLMFactory, { LLMType } from "./LLM/llm-factory.ts";
import DataIngestionService from "./DataIngestion/data-ingestion.service.ts";
import { LoaderType } from "./DataIngestion/loaders/loader-factory.ts";
import { SplitterType } from "./DataIngestion/splitters/splitter-factory.ts";
import RetrieverService from "./Retriever/retriever.service.ts";

class RAGService {}

const RAGChain = async ({
  query,
  source,
}: {
  query: string;
  source: string;
}): Promise<string> => {
  const retrievedDocs = await getRetrievedDocs(query, source);
  const formatDocs = RetrieverService.joinDocumentContents(retrievedDocs);

  const prompt = getPrompt();
  const LLM = LLMFactory.createLLM(LLMType.OPENAI);
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

  let result = "";
  const chunks = await ragChain.stream(formatDocs);
  for await (const chunk of chunks) {
    result += chunk;
    LOGGER(result);
  }

  return result;
};

const getRetrievedDocs = async (
  question: string,
  source: string,
): Promise<DocumentInterface<Record<string, any>>[]> => {
  const dataIngestionService = new DataIngestionService();
  const vectorDB = await dataIngestionService.ingest({
    loadOption: {
      source,
      type: LoaderType.WEB,
    },
    splitOption: {
      type: SplitterType.RECURSIVE_CHARACTER,
    },
    storeOption: {},
  });

  const retrieverService = new RetrieverService();
  const retrievedDocs = await retrieverService.retrieveDocuments({
    query: question,
    vectorDB,
  });

  return retrievedDocs;
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

export default RAGChain;
