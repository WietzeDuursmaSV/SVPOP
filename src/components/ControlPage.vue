<template>
  <div class="control-page">
    <div class="control-container">
      <div class="control-card">
        <h1>TODO Control Panel</h1>
        <p>
          Werk de inhoud bij voor TODO 1 t/m TODO 3. Deze verschijnt direct op de laatste
          presentatie-slide.
        </p>

        <div class="id-section">
          <label for="sessionId">Sessie ID</label>
          <div class="id-input-group">
            <input
              type="text"
              id="sessionId"
              placeholder="Voer sessie ID in (bijv: sprint-2026-06-21)"
              v-model="sessionId"
              @keyup.enter="handleIdInput"
              :disabled="idSet"
            />
            <button v-if="!idSet" @click="handleIdInput">ID Instellen</button>
            <button v-else @click="changeId" class="change-btn">Wijzigen</button>
          </div>
          <span v-if="idSet" class="id-status">✓ ID: {{ sessionId }}</span>
        </div>

        <div class="form-naw">
          <label for="name">Naam</label>
          <input type="text" placeholder="Naam" v-model="form.name" />

          <label for="aanwezig">Aanwezig</label>
          <input type="text" placeholder="Aanwezig" v-model="form.pressent" />

          <label for="name">Datum</label>
          <input type="text" placeholder="Datum" v-model="form.date" />
          <div class="actions">
            <button @click="saveTodos" :disabled="saving">
              {{ saving ? 'Opslaan...' : 'Opslaan' }}
            </button>
            <span class="status">{{ statusMessage }}</span>
          </div>
        </div>

        <label for="next">Next sprint</label>
        <textarea id="next" v-model="form.next" rows="6"></textarea>

        <label for="requirements">Requirements</label>
        <textarea id="requirements" v-model="form.requirements" rows="6"></textarea>

        <label for="compass">Compass</label>
        <textarea id="compass" v-model="form.compass" rows="6"></textarea>

        <div class="actions">
          <button @click="saveTodos" :disabled="saving">
            {{ saving ? 'Opslaan...' : 'Opslaan' }}
          </button>
          <span class="status">{{ statusMessage }}</span>
        </div>
      </div>

      <div class="agreements-panel">
        <h2>Afspraken</h2>
        <textarea
          id="afspraken"
          v-model="form.afspraken"
          placeholder="Voer hier eerder gemaakte afspraken in..."
          rows="20"
        ></textarea>
        <div class="actions">
          <button @click="saveTodos" :disabled="saving">
            {{ saving ? 'Opslaan...' : 'Opslaan' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';

const API_URL = 'http://localhost:3001/api/todos';
const STORAGE_ID_KEY = 'sv-pop-session-id';

export default defineComponent({
  name: 'ControlPage',
  setup() {
    const form = reactive({
      name: '',
      pressent: '',
      date: '',
      next: '',
      requirements: '',
      compass: '',
      afspraken: '',
    });

    const saving = ref(false);
    const statusMessage = ref('');
    const sessionId = ref('');
    const idSet = ref(false);

    const loadFromLocalStorage = (id) => {
      try {
        const stored = localStorage.getItem(`sv-pop-data-${id}`);
        if (stored) {
          const data = JSON.parse(stored);
          form.name = data.name ?? '';
          form.pressent = data.pressent ?? '';
          form.date = data.date ?? '';
          form.next = data.next ?? data.todo1 ?? '';
          form.requirements = data.requirements ?? data.todo2 ?? '';
          form.compass = data.compass ?? data.todo3 ?? '';
          form.afspraken = data.afspraken ?? '';
          statusMessage.value = `Gegevens geladen voor ID: ${id}`;
        } else {
          statusMessage.value = `Nieuw profiel aangemaakt voor ID: ${id}`;
        }
      } catch {
        statusMessage.value = 'Fout bij laden van lokale gegevens.';
      }
    };

    const handleIdInput = () => {
      if (!sessionId.value.trim()) {
        statusMessage.value = 'Voer alstublieft een ID in.';
        return;
      }

      const id = sessionId.value.trim();
      sessionId.value = id;
      localStorage.setItem(STORAGE_ID_KEY, id);
      idSet.value = true;
      loadFromLocalStorage(id);
    };

    const changeId = () => {
      idSet.value = false;
      sessionId.value = '';
      statusMessage.value = '';
    };

    const saveTodos = async () => {
      if (!idSet.value) {
        statusMessage.value = 'Voer eerst een Sessie ID in.';
        return;
      }

      saving.value = true;
      statusMessage.value = 'Bezig met opslaan...';

      try {
        const dataToSave = {
          name: form.name,
          pressent: form.pressent,
          date: form.date,
          next: form.next,
          requirements: form.requirements,
          compass: form.compass,
          // Legacy keys keep older API/server sessions in sync.
          todo1: form.next,
          todo2: form.requirements,
          todo3: form.compass,
          afspraken: form.afspraken,
        };

        const storageKey = `sv-pop-data-${sessionId.value}`;
        localStorage.setItem(storageKey, JSON.stringify(dataToSave));

        // Stuur ook naar todo-server voor presentatie
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSave),
        });

        statusMessage.value = '✓ Alles opgeslagen!';
      } catch (error) {
        console.error('Fout bij opslaan:', error);
        statusMessage.value = 'Fout bij opslaan - controleer console';
      } finally {
        saving.value = false;
      }
    };

    onMounted(() => {
      const savedId = localStorage.getItem(STORAGE_ID_KEY);
      if (savedId) {
        sessionId.value = savedId;
        idSet.value = true;
        loadFromLocalStorage(savedId);
      }
    });

    return {
      form,
      saving,
      statusMessage,
      sessionId,
      idSet,
      saveTodos,
      handleIdInput,
      changeId,
    };
  },
});
</script>

<style scoped>
.control-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #111827 100%);
  color: #e5e7eb;
  padding: 32px;
  overflow: auto;
}

.control-container {
  display: flex;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.control-card {
  flex: 1;
  min-width: 0;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 14px;
  padding: 24px;
  display: grid;
  gap: 10px;
}

.agreements-panel {
  width: 350px;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: sticky;
  top: 32px;
  height: fit-content;
  max-height: calc(100vh - 64px);
}

.agreements-panel h2 {
  margin: 0;
  font-size: 1.25rem;
}

.agreements-panel textarea {
  flex: 1;
  resize: none;
  overflow-y: auto;
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
  white-space: nowrap;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button.change-btn {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
}

.status {
  color: #22c55e;
  font-size: 0.95rem;
}

.form-naw {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

input {
  flex: 1;
  min-width: 150px;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #020617;
  color: #e2e8f0;
  padding: 8px 12px;
  font-size: 0.95rem;
}

input::placeholder {
  color: #64748b;
}

.id-section {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.id-section > label {
  display: block;
  margin-top: 0;
  margin-bottom: 8px;
}

.id-input-group {
  display: flex;
  gap: 8px;
}

.id-input-group input {
  flex: 1;
}

.id-input-group button {
  flex-shrink: 0;
}

.id-input-group input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.id-status {
  display: block;
  margin-top: 8px;
  color: #10b981;
  font-weight: 600;
  font-size: 0.9rem;
}

@media (max-width: 1200px) {
  .control-container {
    flex-direction: column;
  }

  .agreements-panel {
    width: 100%;
    position: static;
    max-height: none;
  }

  .agreements-panel textarea {
    resize: vertical;
    min-height: 200px;
  }
}
</style>
