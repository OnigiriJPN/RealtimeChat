<template>
  <div class="chat-container">
    <div class="message-list">
      <div v-for="(msg, i) in messages" :key="i" class="message-bubble">{{ msg.text }}</div>
    </div>
  </div>
  <div class="input-area">
    <input
      v-model="newMessage"
      @keyup.enter="handleSend"
      placeholder="メッセージを入力"
      class="win11-input"
      />
    <button @click="handleSend" class="win11-button">送信📤</button>
  </div>
</template>
<style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
    max-width: 600px;
    margin: 0 auto;
    background: #f3f3f3;
  }
  .message-list {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }
  .message-bubble {
    background: #ffffff;
    padding: 10px 15px;
    border-radius: 18px;
    margin-bottom: 10px;
    width: fit-content;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    font-size: 14px;
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
</style>

<script setup>
import { ref, onMounted } from 'vue';

const messages = ref([]);
const input = ref('');
let ws;

onMounted(() => {
  try {
    ws = new WebSocket('wss://chat-backend.onigiritv.workers.dev');
    ws.onmessage = (e) => {
      messages.value.push({ id: Date.now(), text: e.data });
    };
  } catch (error) {
    alert("WebSocket接続をしましたが、エラーのため確立されません。\n理由: " + error.Message);
    return;
  }
});

const send = () => {
  if (input.value){
    alert("送信されました。");
    ws.send(input.value);
    input.value = '';
  }
}
</script>
