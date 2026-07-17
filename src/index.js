
export class ChatRoom {
    constructor(state) {
        this.state = state;
        this.sessions = new Set();
    }

    async fetch(request) {
        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);
        server.accept();

        this.sessions.add(server);

        server.addEventListener("message", (event) => {
            for (const session of this.sessions) {
                try {
                    session.send(event.data);
                } catch (e) {
                    this.sessions.delete(session);
                }
            }
        });

        server.addEventListener("close", () => this.sessions.delete(server));

        return new Response(null, { status: 101, webSocket: client });
    }
}

export default {
    async fetch(request, env) {
        const id = env.CHAT_ROOM.idFromName("global-chat");
        const stub = env.CHAT_ROOM.get(id);
        return stub.fetch(request);
    },
};