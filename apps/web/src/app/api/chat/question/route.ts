// app/api/chat/question/route.ts
import { NextRequest } from 'next/server';
import EventSource from 'eventsource';

export async function GET(req: NextRequest) {
    try {
        // Next 서버에서 eventsource를 사용하여 외부 SSE 서버에 연결
        const eventSource = new EventSource('http://localhost:5050/question');

        const readableStream = new ReadableStream({
            start(controller) {
                eventSource.onmessage = (event) => {
                    // SSE 응답을 클라이언트로 스트리밍
                    controller.enqueue(`data: ${event.data}\n\n`);
                };

                eventSource.onerror = (error) => {
                    console.error('Error in EventSource from API server:', error);
                    controller.error(error);
                    eventSource.close();
                };

                req.signal.addEventListener('abort', () => {
                    controller.close();
                    eventSource.close();
                });
            },
        });

        // 클라이언트에 SSE 응답 릴레이
        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error('Error in Next.js API Route:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
