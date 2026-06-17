<template>
  <div class="control-page">
    <div class="control-card">
      <h1>TODO Control Panel</h1>
      <p>Werk de inhoud bij voor TODO 1 t/m TODO 3. Deze verschijnt direct op de laatste presentatie-slide.</p>

      <label for="todo1">TODO 1 - Wat ga je doen</label>
      <textarea id="todo1" v-model="form.todo1" rows="6"></textarea>

      <label for="todo2">TODO 2 - Wat heb je nodig</label>
      <textarea id="todo2" v-model="form.todo2" rows="6"></textarea>

      <label for="todo3">TODO 3 - Visie</label>
      <textarea id="todo3" v-model="form.todo3" rows="6"></textarea>

      <div class="actions">
        <button @click="saveTodos" :disabled="saving">
          {{ saving ? 'Opslaan...' : 'Opslaan' }}
        </button>
        <span class="status">{{ statusMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';

const API_URL = 'http://localhost:3001/api/todos';

export default defineComponent({
  name: 'ControlPage',
  setup() {
    const form = reactive({
      todo1: '',
      todo2: '',
      todo3: ''
    });

    const saving = ref(false);
    const statusMessage = ref('');

    const loadTodos = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        form.todo1 = data.todo1 ?? '';
        form.todo2 = data.todo2 ?? '';
        form.todo3 = data.todo3 ?? '';
      } catch {
        statusMessage.value = 'Kon TODO gegevens niet laden.';
      }
    };

    const saveTodos = async () => {
      saving.value = true;
      statusMessage.value = '';

      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            todo1: form.todo1,
            todo2: form.todo2,
            todo3: form.todo3
          })
        });

        statusMessage.value = 'Opgeslagen. Presentatie is bijgewerkt.';
      } catch {
        statusMessage.value = 'Opslaan mislukt.';
      } finally {
        saving.value = false;
      }
    };

    onMounted(loadTodos);

    return {
      form,
      saving,
      statusMessage,
      saveTodos
    };
  }
});
</script>

<style scoped>
.control-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #111827 100%);
  color: #e5e7eb;
  padding: 32px;
}

.control-card {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 14px;
  padding: 24px;
  display: grid;
  gap: 10px;
}

h1 {
  margin: 0;
  font-size: 2rem;
}

p {
  margin: 0 0 12px;
  color: #94a3b8;
}

label {
  margin-top: 8px;
  font-weight: 600;
}

textarea {
  width: 100%;
  resize: vertical;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #020617;
  color: #e2e8f0;
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
}

.actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 14px;
}

button {
  border: none;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status {
  color: #22c55e;
  font-size: 0.95rem;
}
</style>
