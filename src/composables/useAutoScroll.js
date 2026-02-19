import { ref, nextTick } from 'vue';

export function useAutoScroll() {
  const messagesEndRef = ref(null);

  const scrollToBottom = async () => {
    await nextTick();
    messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' });
  };

  return { messagesEndRef, scrollToBottom };
}
