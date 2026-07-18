export default {
    async fetch(request, env) {
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }
        try {
            const url = new URL(request.url);
            const headers = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
            // メッセージを保存する
            if(request.method === "POST" && url.pathname === "/send") {
                const { message } = await request.json);
                const timestamp = Date.now).toString();
                // メッセージをKV(データベース)に保存💽💾
                await env.CHAT_DB.put(timestamp, message);
                return new Response("OK", { status: 200 });
            }
        }
    }
}
