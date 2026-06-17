<template>
  <div class="slide slide-4">
    <div class="slide-header">
      <div class="step-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <h1>Stap 4: Het Kompas & De Horizon</h1>
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
          <span class="title">career-compass.ts</span>
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
  name: 'Slide4Compass',
  setup() {
    const code = `// 4. Het Kompas (De Architectuur / Lange termijn)
export const kompas = {
     horizon: "Wat doe je over 3-5 jaar?",
     coreCompetence: "Waar sta je om bekend?",
     energySource: "Waar krijg je energie van?"
 };
$ git remote show origin // Waar beweeeg je naartoe?`;

    const markdown = `## Het Kompas
De horizon over 3-5 jaar, jouw kern-
competenties en energiebronnen.

### HORIZON
Welke rol of welk type expert wil je
over 3-5 jaar zijn binnen ShareValue?

### CORE COMPETENCE
Wat is jouw ultieme specialisme of
'superkracht' waar collega's je voor
opzoeken?

### ENERGY SOURCE
Wat zijn de specifieke opdrachten of
werkzaamheden die jouw batterij opladen?`;

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
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}
</style>
