<script setup>
import { defineProps, defineEmits } from 'vue';
import { Send } from 'lucide-vue-next';

const props = defineProps({
  modelValue: { type: String, default: '' },
  isLoading: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'send']);

const onInput = (e) => emit('update:modelValue', e.target.value);
const onSend = () => emit('send');
</script>

<template>
  <div class="p-4 md:p-6 bg-zinc-50/80 backdrop-blur-sm sticky bottom-0">
    <div class="max-w-3xl mx-auto relative group">
      <input
        :value="modelValue"
        @input="onInput"
        @keydown.enter="onSend"
        type="text"
        placeholder="Type a message..."
        :disabled="isLoading"
        class="w-full pl-5 pr-12 py-4 rounded-xl border border-zinc-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-300 transition-all disabled:opacity-50 text-sm placeholder:text-zinc-400"
      />
      <button
        @click="onSend"
        :disabled="isLoading || !modelValue.trim()"
        class="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-300 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        <Send :size="16" />
      </button>
    </div>
    <p class="text-center text-[10px] text-zinc-400 mt-3">
      Powered by OpenRouter. AI can make mistakes.
    </p>
  </div>
</template>

<style scoped></style>
