<script setup>
import { ref } from 'vue';
import ChatMessages from './ChatMessages.vue';
import ChatInput from './ChatInput.vue';
import { createChatCompletion } from '../services/openrouter';
import { useAutoScroll } from '../composables/useAutoScroll';
import { Sparkles, Trash2, Settings2 } from 'lucide-vue-next';

const messages = ref([
  {
    role: 'system',
    content: 'Hello. I am ready to help. Select a model and start chatting.',
  },
]);
const input = ref('');
const isLoading = ref(false);
const model = ref('liquid/lfm-2.5-1.2b-thinking:free');

const { messagesEndRef, scrollToBottom } = useAutoScroll();

const clearChat = () => {
  messages.value = [{ role: 'system', content: 'Conversation cleared.' }];
};

const sendMessage = async () => {
  if (!input.value.trim() || isLoading.value) return;

  const userMsg = { role: 'user', content: input.value };
  messages.value.push(userMsg);
  const currentInput = input.value;
  input.value = '';
  isLoading.value = true;
  await scrollToBottom();

  try {
    const resp = await createChatCompletion(
      model.value,
      messages.value.filter(
        (m) =>
          m.role !== 'system' || !m.content.includes('Conversation cleared'),
      ),
    );

    const aiContent = resp.choices?.[0]?.message?.content || '';
    messages.value.push({ role: 'assistant', content: aiContent });
  } catch (err) {
    console.error(err);
    messages.value.push({
      role: 'system',
      content: `Error: ${err.message || 'Failed to connect to OpenRouter.'}`,
    });
  } finally {
    isLoading.value = false;
    await scrollToBottom();
  }
};
</script>

<template>
  <div
    class="flex h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200"
  >
    <aside
      class="w-72 border-r border-zinc-200 bg-white p-6 hidden md:flex flex-col gap-6"
    >
      <div
        class="flex items-center gap-3 font-medium tracking-tight text-zinc-900"
      >
        <div
          class="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center shadow-sm"
        >
          <Sparkles :size="16" />
        </div>
        <span>AI Playground</span>
      </div>

      <div class="flex flex-col gap-2">
        <label
          class="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"
          >Model</label
        >
        <input
          v-model="model"
          type="text"
          class="w-full p-2.5 text-sm border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-300 transition-all placeholder:text-zinc-400"
          placeholder="provider/model-name"
        />
        <div class="text-[11px] text-zinc-400 space-y-1">
          <p>Try these models:</p>
          <p
            class="font-mono text-zinc-500 cursor-pointer hover:text-zinc-800"
            @click="model = 'google/gemini-2.0-flash-001'"
          >
            google/gemini-2.0-flash-001
          </p>
          <p
            class="font-mono text-zinc-500 cursor-pointer hover:text-zinc-800"
            @click="model = 'deepseek/deepseek-r1'"
          >
            deepseek/deepseek-r1
          </p>
        </div>
      </div>

      <div class="mt-auto">
        <button
          @click="clearChat"
          class="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-red-600 transition-colors w-full p-2 hover:bg-red-50 rounded-md"
        >
          <Trash2 :size="14" />
          Clear History
        </button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col relative max-w-5xl mx-auto w-full">
      <header
        class="md:hidden p-4 border-b border-zinc-200 bg-white flex items-center justify-between sticky top-0 z-10"
      >
        <span class="font-semibold text-sm flex items-center gap-2"
          ><Sparkles :size="14" /> AI Playground</span
        >
        <Settings2 :size="18" class="text-zinc-400" />
      </header>

      <ChatMessages
        :messages="messages"
        :isLoading="isLoading"
        :messagesEndRef="messagesEndRef"
      />

      <ChatInput v-model="input" :isLoading="isLoading" @send="sendMessage" />
    </main>
  </div>
</template>

<style scoped>
/* Custom Scrollbar Minimalista */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e4e4e7;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #d4d4d8;
}
</style>
