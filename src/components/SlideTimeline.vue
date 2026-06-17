<template>
  <div class="slide slide-timeline">
    <div class="timeline-header">
      <div class="header-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M2 12h4M18 12h4M12 2v4M12 18v4"></path>
          <path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"></path>
        </svg>
      </div>
      <h1>De Ontwikkelingstijdlijn</h1>
    </div>

    <div class="divider"></div>

    <div class="timeline">
      <div class="timeline-track">
        <div class="track-line"></div>
        <div
          v-for="step in steps"
          :key="step.id"
          class="timeline-step"
        >
          <div class="step-filename">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="file-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            {{ step.file }}
          </div>
          <div class="step-circle" :style="{ borderColor: step.color, color: step.color }">
            {{ step.id }}
          </div>
          <div class="step-label">{{ step.label }}</div>
        </div>
      </div>
    </div>

    <div class="cards">
      <div
        v-for="step in steps"
        :key="step.id"
        class="card"
        :style="{ borderLeftColor: step.color }"
      >
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SlideTimeline',
  setup() {
    const steps = [
      {
        id: 1,
        file: 'git-log.js',
        label: 'Reflection',
        color: '#3b82f6',
        title: 'Successen & Reflectie',
        description: 'Terugkijken naar wat je oprecht trots op bent en belangrijke commits.'
      },
      {
        id: 2,
        file: 'refactor-session.ts',
        label: 'Review',
        color: '#10b981',
        title: 'Code Review',
        description: 'Identificeer knelpunten, uitdagingen en huidige obstakels.'
      },
      {
        id: 3,
        file: 'next-sprint.js',
        label: 'Next Sprint',
        color: '#f59e0b',
        title: 'Next Sprint',
        description: 'Wat ga je de komende periode oppakken en leren begrijpen?'
      },
      {
        id: 4,
        file: 'career-compass.ts',
        label: 'Compass',
        color: '#ef4444',
        title: 'Het Kompas',
        description: 'De horizon over 3-5 jaar, jouw kerncompetenties en energiebronnen.'
      }
    ];

    return { steps };
  }
});
</script>

<style scoped>
.slide-timeline {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f35 0%, #16213e 100%);
  padding: 60px 60px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.header-icon {
  width: 52px;
  height: 52px;
  color: #f59e0b;
  flex-shrink: 0;
}

.header-icon svg {
  width: 100%;
  height: 100%;
}

.timeline-header h1 {
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -1px;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin-bottom: 60px;
}

/* Timeline track */
.timeline {
  margin-bottom: 60px;
  padding: 0 40px;
}

.timeline-track {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.track-line {
  position: absolute;
  top: 56px;
  left: calc(12.5% );
  right: calc(12.5%);
  height: 4px;
  background: linear-gradient(to right, #3b82f6, #10b981, #f59e0b, #ef4444);
  border-radius: 2px;
  z-index: 0;
}

.timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.step-filename {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 4px;
}

.file-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.step-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid;
  background: #1a1f35;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
}

.step-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-top: 4px;
}

/* Cards */
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 0 40px;
}

.card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid;
  border-radius: 8px;
  padding: 20px 22px;
}

.card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: #fff;
}

.card p {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
}
</style>
