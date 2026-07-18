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
                const body = await request.json();

                if(!body.message || typeof body.message !== 'string' || body.message.length > 1000) {
                    return new Response(JSON.stringify({ error: "Invalid Message" }), { status: 400, headers });
                }
                
                const timestamp = Date.now().toString() + Math.random().toString(36).substring(2, 5);
                // メッセージをKV(データベース)に保存💽💾
                await env.CHAT_DB.put(timestamp, message);
                return new Response(JSON.stringify({ status: "success" }), { status: 200, headers });
            }
            if(request.method === "GET" && url.pathname === "/messages") {
                const list = await env.CHAT_DB.list);
                const sortedKeys = list.keys.sort((a, b) => a.name.localeCompare(b.name));
            }

        }
    }
}
