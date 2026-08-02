import { ref, onUnmounted } from 'vue';

export interface SSEEvent {
  type: string;
  taskId?: string;
  batchId?: string;
  data: any;
  timestamp: string;
}

export function useSSE() {
  const latestEvent = ref<SSEEvent | null>(null);
  const events = ref<SSEEvent[]>([]);
  let eventSource: EventSource | null = null;

  function connect() {
    if (eventSource) return;

    eventSource = new EventSource('/api/events');

    eventSource.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data) as SSEEvent;
        latestEvent.value = event;
        events.value.push(event);
        if (events.value.length > 200) events.value.shift();

        // Auto-clear toast after 3s
        setTimeout(() => {
          if (latestEvent.value === event) latestEvent.value = null;
        }, 3000);
      } catch { /* ignore parse errors */ }
    };

    eventSource.onerror = () => {
      // Reconnect after 5s
      eventSource?.close();
      eventSource = null;
      setTimeout(connect, 5000);
    };
  }

  function disconnect() {
    eventSource?.close();
    eventSource = null;
  }

  onUnmounted(disconnect);

  return { latestEvent, events, connect, disconnect };
}
