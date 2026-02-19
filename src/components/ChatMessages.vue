<script setup>
import { defineProps } from 'vue';
import { Bot, User, Settings2, Loader2 } from 'lucide-vue-next';

const props = defineProps({
  messages: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false },
  messagesEndRef: { type: Object, default: null },
});
</script>

<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 scroll-smooth">
    <div
      v-for="(msg, index) in messages"
      :key="index"
      :class="[
        'flex gap-4 max-w-3xl mx-auto group',
        msg.role === 'user' ? 'justify-end' : 'justify-start',
      ]"
    >
      <div
        v-if="msg.role !== 'user'"
        class="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center flex-shrink-0 shadow-sm mt-1"
      >
        <Settings2
          v-if="msg.role === 'system'"
          :size="14"
          class="text-zinc-400"
        />
        <Bot v-else :size="16" class="text-zinc-700" />
      </div>

      <div
        :class="[
          'px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm max-w-[85%] transition-all',
          msg.role === 'user'
            ? 'bg-zinc-900 text-white rounded-tr-sm'
            : msg.role === 'system'
              ? 'bg-transparent border border-dashed border-zinc-300 text-zinc-500 w-full text-center text-xs py-2 shadow-none'
              : 'bg-white border border-zinc-200 text-zinc-700 rounded-tl-sm',
        ]"
      >
        <p class="whitespace-pre-wrap">{{ msg.content }}</p>
      </div>

      <div
        v-if="msg.role === 'user'"
        class="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center flex-shrink-0 mt-1"
      >
        <User :size="16" class="text-zinc-600" />
      </div>
    </div>

    <div v-if="isLoading" class="flex gap-4 max-w-3xl mx-auto">
      <div
        class="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm"
      >
        <Loader2 :size="16" class="animate-spin text-zinc-400" />
      </div>
      <div
        class="px-5 py-4 bg-white border border-zinc-200 rounded-2xl rounded-tl-sm w-32 h-12 animate-pulse shadow-sm"
      ></div>
    </div>

    <div ref="messagesEndRef" class="h-4"></div>
  </div>
</template>

<style scoped></style>
