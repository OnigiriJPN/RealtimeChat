<template>
  <div class="chat-container">
    <div class="message-list">
      <div v-for="(msg, i) in messages" :key="i" class="message-bubble">
        {{ msg.text }}
      </div>
      <div v-if="isProcessing" class="status-indicator">送信中...</div>
    </div>
  </div>
  <div class="input-area">
    <input
      v-model="newMessage"
      @keyup.enter="handleSend"
      placeholder="メッセージを入力"
      class="win11-input"
      />
    <button @click="handleSend" class="win11-button" :disabled="isProcessing">
      送信📤
    </button>
  </div>
</template>
<style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    background: #f0f0f0;
  }
  .message-list {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }
  .message-bubble {
    background: #ffffff;
    padding: 10px 16px;
    border-radius: 18px;
    margin-bottom: 12px;
    width: fit-content;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    font-size: 15px;
    color: #333;
  }
  .status-indicator {
    font-size: 12px;
    color: #888;
    margin-left: 10px;
  }
/* 本格的マイカ風効果を実装*/
  .input-area {
    padding: 16px;
    background: rgba(243,243,243,0.75);
    border-top: 1px solid rgba(255,255,255,0.6);
    backdrop-filter: blur(20px) saturate(180%);
    display: flex;
    gap: 12px;
    position: sticky;
    bottom: 0;
  }
  .win11-input {
    flex: 1;
    padding: 10px 14px;
    background: rgba(255,255,255,0.6);
    border-radius: 8px;
    outline: none;
    transition: all 0.2s;
  }

  .win11-input:focus {
    background: #fff;
    border-color: #0078d4;
    box-shadow: 0 0 0 2px rgba(0,120,212,0.2);
  }

  .win11-button {
    padding: 8px 20px;
    background: #0078d4;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  .win11-button:disabled {
    background: #cccccc;
  }
</style>

<script setup>
import { ref, onMounted } from 'vue';

const messages = ref([]);
const newMessage = ref('');
let ws;

onMounted(() => {
  try {
    ws = new WebSocket('wss://chat-backend.onigiritv.workers.dev');
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      messages.value.push({ text: data.message });
    };
    ws.onopen = () => console.log("接続が正常に確立しました。");
    ws.onclose = () => console.log("接続が切断されました。");

  } catch (error) {
    alert("WebSocket接続をしましたが、エラーのため確立されません。\n理由: " + error.Message);
    return;
  }
});

const HandleSend = () => {
  if (!newMessage.value.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;

  ws.send(JSON.stringify({ message: newMessage.value }));

  messages.value.push({ text: newMessage.value });
  newMessage.value = "";
}

  onUnmounted(() => {
    if (ws) ws.close();
  });
</script>
