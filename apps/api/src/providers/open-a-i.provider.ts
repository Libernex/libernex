// import OpenAI from "openai";
// import type { Thread } from "openai/resources/beta/threads/threads";
// import type { Assistant } from "openai/resources/beta/assistants";
//
// // 인터페이스 정의
// interface OpenAIProvider {
//     getAssistant: () => Promise<Assistant>;
//     getThread: () => Promise<Thread>;
//     sendMessage: (thread: Thread, content: string) => Promise<void>;
//     runOnStream: (thread: Thread, assistant: Assistant) => Promise<void>;
// }
//
// // 공용 openAi 인스턴스 생성
// const openAi = new OpenAI();
//
// // 함수형 OpenAiProvider 객체 생성 및 반환
// const OpenAIProvider = (): OpenAIProvider => {
//     return {
//         getAssistant: async (): Promise<Assistant> => {
//             const assistant = await openAi.beta.assistants.create({
//                 name: "Libernex",
//                 instructions:
//                     "You are the person in charge of the company's IT information team. You must respond diligently to employees' questions. Your responses should be in Korean.",
//                 tools: [{ type: "file_search" }],
//                 model: "gpt-4o",
//             });
//
//             return assistant;
//         },
//
//         getThread: async (): Promise<Thread> => {
//             const thread = await openAi.beta.threads.create();
//             return thread;
//         },
//
//         sendMessage: async (thread: Thread, content: string): Promise<void> => {
//             await openAi.beta.threads.messages.create(thread.id, {
//                 role: "user",
//                 content: content,
//             });
//         },
//
//         runOnStream: async (thread: Thread, assistant: Assistant): Promise<void> => {
//             openAi.beta.threads.runs
//                 .stream(thread.id, {
//                     assistant_id: assistant.id,
//                 })
//                 .on("textCreated", () => process.stdout.write("\nassistant > "))
//                 .on("textDelta", (textDelta) => process.stdout.write(textDelta.value))
//                 .on("toolCallCreated", (toolCall) =>
//                     process.stdout.write(`\nassistant > ${toolCall.type}\n\n`)
//                 )
//                 .on("toolCallDelta", (toolCallDelta) => {
//                     if (toolCallDelta.type === "code_interpreter") {
//                         if (toolCallDelta.code_interpreter.input) {
//                             process.stdout.write(toolCallDelta.code_interpreter.input);
//                         }
//                         if (toolCallDelta.code_interpreter.outputs) {
//                             process.stdout.write("\noutput >\n");
//                             toolCallDelta.code_interpreter.outputs.forEach((output) => {
//                                 if (output.type === "logs") {
//                                     process.stdout.write(`\n${output.logs}\n`);
//                                 }
//                             });
//                         }
//                     }
//                 });
//         },
//     };
// };
//
// export default OpenAIProvider;
