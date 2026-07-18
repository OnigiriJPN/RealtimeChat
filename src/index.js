export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // メッセージを保存する
        if(request.method === "POST" && url.pathname === "/send") {

        }
    }
}
