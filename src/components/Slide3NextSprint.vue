<template>
  <div class="slide slide-3">
    <div class="slide-header">
      <div class="step-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      </div>
      <h1>Stap 3: Next Sprint (Korte Termijn Planning)</h1>
    </div>
    
    <div class="bg-text" v-html="highlightedMarkdown"></div>

    <div class="slide-content">
      <div class="code-window">
        <div class="window-header">
          <span class="title">next-sprint.js</span>
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
  name: 'Slide3NextSprint',
  setup() {
    const code = `// 3. Next Sprint (Korte termijn planning)
const planning = {
     focus: "Logische next sprint?",
     backlog: "Wat wil je leren begrijpen?",
     userStories: "Wat zijn de 1 à 2 belangrijkste 'stories'?"
 };
$ git checkout -b feature/next-sprint`;

    const markdown = `## Next Sprint
Wat ga je de komende periode oppakken
en leren begrijpen?

### FOCUS
Wat is de meest logische en waardevolle
volgende stap in je projecten?

### BACKLOG
Welke technologieën, vaardigheden
of certificaten wil je doorgronden?

### USER STORIES
Wat zijn de concrete, tastbare doelen
waar je mee aan de slag gaat?`;

    const highlightedCode = ref('');
    const highlightedMarkdown = ref('');

    onMounted(() => {
      highlightedCode.value = hljs.highlight(code, { language: 'javascript' }).value;
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
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}
</style>
