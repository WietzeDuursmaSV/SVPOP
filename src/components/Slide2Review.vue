<template>
  <div class="slide slide-2">
    <div class="slide-header">
      <div class="step-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </div>
      <h1>Stap 2: Code Review & Huidige Status</h1>
    </div>
    
    <div class="bg-text" v-html="highlightedMarkdown"></div>

    <div class="slide-content">
      <div class="code-window">
        <div class="window-header">
          <div class="window-lights">
            <span class="light light-red"></span>
            <span class="light light-yellow"></span>
            <span class="light light-green"></span>
          </div>
          <span class="title">refactor-session.ts</span>
        </div>
        <pre><code v-html="highlightedCode"></code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import hljs from 'highlight.js';
import '../assets/slide.css';

export default defineComponent({
  name: 'Slide2Review',
  setup() {
    const code = `// 2. Code Review & Refactoring (Huidige status)
const huidigeStatus = () => {
     if (stuck) return "Waar loop je tegenaan?";
     if (needImprovement) return "Wat voelt als een TODO?";
     if (breakingBug) return "Wat voelt als een FIXME?";
 };
$ git diff --stat // Zoek de knelpunten`;

    const markdown = `## Code Review
Identificeer knelpunten, uitdagingen
en huidige obstakels.

### STUCK
Welke drempels of blokkades ervaar
je momenteel in je rol?

### TODO'S
Waar zie je kansen voor verbetering
in processen, tools of kennis?

### FIXME'S
Welke zaken kosten onnodig veel energie
en moeten we direct oplossen?`;

    const highlightedCode = ref('');
    const highlightedMarkdown = ref('');

    onMounted(() => {
      highlightedCode.value = hljs.highlight(code, { language: 'typescript' }).value;
      highlightedMarkdown.value = hljs.highlight(markdown, { language: 'markdown' }).value;
    });

    return {
      code,
      highlightedCode,
      highlightedMarkdown
    };
  }
});
</script>

<style scoped>
.step-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
</style>
