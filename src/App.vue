<template>
  <div class="chat">
    <div class="log" ref="log">
      <div v-for="m in messages" :key="m.id">{{ m.text }}</div>
    </div>
    <input v-model="input" @keyup.enter="send" placeholder="メッセージを入力" />
    <button @click="send">送信</button>
  </div>
</template>
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