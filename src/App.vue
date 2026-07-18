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
