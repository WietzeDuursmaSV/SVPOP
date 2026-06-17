<template>
  <div class="slide slide-final">
    <div class="final-content">
      <div class="pdf-actions">
        <button class="pdf-button" :disabled="isExporting" @click="exportPdf">
          {{ isExporting ? 'PDF genereren...' : 'Download PDF' }}
        </button>
      </div>

      <div ref="pdfTarget" class="pdf-target">
      <div class="sharevalue-branding">
        <h2>Share<span class="value-text">Value</span></h2>
      </div>
      
      <h1>Klaar voor de start?</h1>

        <div class="command-line">
        <span class="prefix">➜</span>
        <span class="command">git commit -m "klaar-voor-de-volgende-stap"</span>
        </div>

      <div class="action-blocks">
          <div class="action-block">
              <h3 class="block-title">Wat ga je doen</h3>
              <div class="code-window">
                  <div class="window-header">
                      <div class="window-lights">
                        <span class="light light-red"></span>
                        <span class="light light-yellow"></span>
                        <span class="light light-green"></span>
                      </div>
                      <span class="title">todo-1.md</span>
                    </div>
              <pre><code>{{ todos.todo1 }}</code></pre>
                </div>
            </div>
            <div class="action-block">
                <h3 class="block-title">Wat heb je nodig</h3>
                <div class="code-window">
                    <div class="window-header">
                        <div class="window-lights">
                          <span class="light light-red"></span>
                          <span class="light light-yellow"></span>
                          <span class="light light-green"></span>
                        </div>
                        <span class="title">todo-2.md</span>
                    </div>
              <pre><code>{{ todos.todo2 }}</code></pre>
                </div>
            </div>
            <div class="action-block">
                <h3 class="block-title">Visie</h3>
                <div class="code-window">
                    <div class="window-header">
                        <div class="window-lights">
                          <span class="light light-red"></span>
                          <span class="light light-yellow"></span>
                          <span class="light light-green"></span>
                        </div>
                        <span class="title">todo-3.md</span>
                    </div>
              <pre><code>{{ todos.todo3 }}</code></pre>
                </div>
            </div>
        </div>
          </div>
    </div>
</div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue';
import html2pdf from 'html2pdf.js/dist/html2pdf.js';

export default defineComponent({
  name: 'SlideFinalReady',
  setup() {
    const pdfTarget = ref(null);
    const isExporting = ref(false);

    const todos = inject(
      'todos',
      ref({
        todo1: 'TODO 1',
        todo2: 'TODO 2',
        todo3: 'TODO 3'
      })
    );

    const exportPdf = async () => {
      if (!pdfTarget.value || isExporting.value) {
        return;
      }

      isExporting.value = true;

      try {
        await html2pdf()
          .set({
            margin: [8, 8, 8, 8],
            filename: 'SV-POP-final-slide.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
              scale: 2,
              useCORS: true,
              backgroundColor: '#0f1419'
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
          })
          .from(pdfTarget.value)
          .save();
      } catch (error) {
        console.error('PDF export mislukt:', error);
      } finally {
        isExporting.value = false;
      }
    };

    return {
      todos,
      pdfTarget,
      isExporting,
      exportPdf
    };
  }
});
</script>

<style scoped>
.slide {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f35 0%, #0f1419 100%);
  padding: 60px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.slide::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  top: -150px;
  right: -150px;
}

.slide::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  bottom: -100px;
  left: -100px;
}

.final-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 1100px;
  width: 100%;
}

.sharevalue-branding {
  margin-bottom: 40px;
}

.sharevalue-branding h2 {
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 2px;
  text-transform: capitalize;
}

.value-text {
  color: #f59e0b;
}

.slide h1 {
  font-size: 5rem;
  font-weight: 800;
  margin: 40px 0 40px;
  letter-spacing: -2px;
  line-height: 1.1;
}

.command-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: 'Courier New', monospace;
  font-size: 1.3rem;
  color: #94a3b8;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 30px;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  width: fit-content;
  margin: 0 auto 60px;
}

.prefix {
  color: #f59e0b;
}

.command {
  color: #cbd5e1;
}

.pdf-target {
  background: linear-gradient(135deg, #1a1f35 0%, #0f1419 100%);
  border-radius: 16px;
  padding: 24px;
  min-height: 520px;
}

.pdf-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.pdf-button {
  border: 1px solid rgba(59, 130, 246, 0.35);
  background: rgba(59, 130, 246, 0.18);
  color: #e2e8f0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pdf-button:hover {
  background: rgba(59, 130, 246, 0.28);
}

.pdf-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-blocks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: left;
}

.block-title {
  font-size: 1rem;
  font-weight: 600;
  color: #94a3b8;
  margin: 0 0 10px 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
}

.code-window {
  background: #0f1419;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.window-header {
  background: #1e293b;
  padding: 10px 14px;
  border-bottom: 1px solid #334155;
  display: flex;
  gap: 8px;
  align-items: center;
}

.window-lights {
  display: flex;
  align-items: center;
  gap: 10px;
}

.light {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.light-red {
  background: #ff5f56;
}

.light-yellow {
  background: #f59e0b;
}

.light-green {
  background: #10b981;
}

.title {
  flex: 1;
  color: #94a3b8;
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  margin-left: 6px;
}

pre {
  margin: 0;
  padding: 20px;
  background: #0f1419;
  min-height: 100px;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #4ade80;
  white-space: pre-wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .sharevalue-branding h2 {
    font-size: 2.5rem;
  }

  .slide h1 {
    font-size: 2.5rem;
    margin: 30px 0 50px;
  }

  .command-line {
    font-size: 1rem;
    padding: 15px 20px;
  }
}
</style>
