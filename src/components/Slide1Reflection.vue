<template>
  <div class="slide slide-1">
    <div class="slide-header">
      <div class="step-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      </div>
      <h1>Stap 1: Terugblik & Successen</h1>
    </div>
    
    <div class="bg-text" v-html="highlightedMarkdown"></div>

    <div class="slide-content">
      <div class="code-window">
        <div class="window-header">
          <span class="title">git-log.js</span>
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
  name: 'Slide1Reflection',
  setup() {
    const code = `// 1. Git Log (Terugblik & Successen)
const reflectieOpSucces = {
     trots: "Waar ben je oprecht trots op?",
     belangrijkeCommits: "Wat waren de belangrijkste 'commits'?",
     onverwachteCommits: "Zijn er onverwachte 'commits' geweest?"
 };
$ git log --oneline --graph`;

    const markdown = `## Successen & Reflectie
Terugkijken naar wat je oprecht trots op bent
en belangrijke commits.

### Vragen

- **Waar ben je oprecht trots op?**
- **Wat waren de belangrijkste 'commits'?**
- **Zijn er onverwachte 'commits' geweest?**`;

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
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
}
</style>
