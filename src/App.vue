<script>
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, provide } from 'vue';
import Slide0Opening from './components/Slide0Opening.vue';
import SlideTimeline from './components/SlideTimeline.vue';
import Slide1Reflection from './components/Slide1Reflection.vue';
import Slide2Review from './components/Slide2Review.vue';
import Slide3NextSprint from './components/Slide3NextSprint.vue';
import Slide4Compass from './components/Slide4Compass.vue';
import SlideFinalReady from './components/SlideFinalReady.vue';
import ControlPage from './components/ControlPage.vue';

const TODO_API_URL = 'http://localhost:3001/api/todos';

export default defineComponent({
  name: 'App',
  components: {
    Slide0Opening,
    SlideTimeline,
    Slide1Reflection,
    Slide2Review,
    Slide3NextSprint,
    Slide4Compass,
    SlideFinalReady,
    ControlPage,
  },
  setup() {
    const currentSlide = ref(0);
    const todos = ref({
      name: '',
      pressent: '',
      date: '',
      next: 'TODO 1',
      requirements: 'TODO 2',
      compass: 'TODO 3',
    });

    const isControlPage = computed(() => window.location.pathname.startsWith('/control'));

    let pollTimer = null;

    const loadTodos = async () => {
      try {
        const response = await fetch(TODO_API_URL);
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        todos.value = {
          name: data.name ?? '',
          pressent: data.pressent ?? '',
          date: data.date ?? '',
          next: data.next ?? data.todo1 ?? 'TODO 1',
          requirements: data.requirements ?? data.todo2 ?? 'TODO 2',
          compass: data.compass ?? data.todo3 ?? 'TODO 3',
        };
      } catch {
        // Keep existing values when API is temporarily unavailable.
      }
    };

    provide('todos', todos);

    onMounted(() => {
      loadTodos();
      pollTimer = window.setInterval(loadTodos, 1500);
    });

    onBeforeUnmount(() => {
      if (pollTimer) {
        window.clearInterval(pollTimer);
      }
    });

    const slides = [
      { component: Slide0Opening, name: 'Opening' },
      { component: SlideTimeline, name: 'Timeline' },
      { component: Slide1Reflection, name: 'Reflection' },
      { component: Slide2Review, name: 'Review' },
      { component: Slide3NextSprint, name: 'Next Sprint' },
      { component: Slide4Compass, name: 'Compass' },
      { component: SlideFinalReady, name: 'Ready' },
    ];

    const nextSlide = () => {
      if (currentSlide.value < slides.length - 1) {
        currentSlide.value++;
      }
    };

    const prevSlide = () => {
      if (currentSlide.value > 0) {
        currentSlide.value--;
      }
    };

    const goToSlide = (index) => {
      currentSlide.value = index;
    };

    const handleKeydown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    return {
      isControlPage,
      currentSlide,
      slides,
      nextSlide,
      prevSlide,
      goToSlide,
      handleKeydown,
    };
  },
});
</script>

<template>
  <div ref="pdfTarget" class="pdf-target">
    <ControlPage v-if="isControlPage" />

    <div v-else class="presentation-container" @keydown="handleKeydown" tabindex="0">
      <!-- Title Slide -->
      <div v-if="currentSlide === -1" class="title-slide">
        <div class="title-content">
          <div class="sharevalue-logo">Share<span>Value</span></div>
          <h1>Persoonlijk Ontwikkelings Plan</h1>
          <p class="subtitle">Een interactieve reis door reflectie, planning en groei</p>
          <div class="start-button" @click="goToSlide(0)">
            <span>Start →</span>
          </div>
        </div>
      </div>

      <!-- Slides -->
      <transition name="slide-fade" mode="out-in">
        <div :key="currentSlide" class="slide-wrapper">
          <component :is="slides[currentSlide].component" />
        </div>
      </transition>

      <!-- Navigation -->
      <div class="navigation">
        <button
          v-if="currentSlide > 0"
          @click="prevSlide"
          class="nav-button prev-button"
          title="Vorige slide (← of ←)"
        >
          ← Vorige
        </button>

        <div class="slide-indicator">
          <div class="dots">
            <span
              v-for="(slide, index) in slides"
              :key="index"
              :class="['dot', { active: currentSlide === index }]"
              @click="goToSlide(index)"
            ></span>
          </div>
          <span class="slide-count">{{ currentSlide + 1 }} / {{ slides.length }}</span>
        </div>

        <button
          v-if="currentSlide < slides.length - 1"
          @click="nextSlide"
          class="nav-button next-button"
          title="Volgende slide (→ of Spatie)"
        >
          Volgende →
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.presentation-container {
  position: relative;
  width: 100%;
  /* overflow: hidden; */
  focus-visible: none;
  outline: none;
}

/* Title Slide */
.title-slide {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f35 0%, #0f1419 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.title-slide::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  top: -100px;
  right: -100px;
}

.title-slide::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  bottom: -50px;
  left: -50px;
}

.title-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.sharevalue-logo {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.sharevalue-logo span {
  color: #f59e0b;
}

.title-slide h1 {
  font-size: 4.5rem;
  margin: 30px 0;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.3rem;
  color: #cbd5e1;
  margin-bottom: 50px;
}

.start-button {
  display: inline-block;
  padding: 15px 50px;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
}

.start-button:active {
  transform: translateY(0);
}

/* Slide Transitions */
.slide-wrapper {
  position: relative;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
}

/* Navigation */
.navigation {
  position: fixed;
  bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  z-index: 100;
  pointer-events: none;
}

.navigation > * {
  pointer-events: auto;
}

.nav-button {
  background: rgba(59, 130, 246, 0.9);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-button:hover {
  background: rgba(59, 130, 246, 1);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
}

.nav-button:active {
  transform: translateY(0);
}

.prev-button {
  order: 1;
}

.next-button {
  order: 3;
}

.slide-indicator {
  order: 2;
  display: flex;
  align-items: center;
  gap: 30px;
  flex-direction: column;
}

.dots {
  display: flex;
  gap: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.2);
}

.dot.active {
  background: #3b82f6;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
}

.slide-count {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .navigation {
    bottom: 20px;
    padding: 0 20px;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
  }

  .slide-indicator {
    order: 3;
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }

  .nav-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .title-slide h1 {
    font-size: 2.5rem;
  }
}
</style>
