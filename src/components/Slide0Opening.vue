<template>
  <div class="slide slide-opening">
    <div class="opening-content">
      <div class="sharevalue-branding">
        <h2>Share<span class="value-text">Value</span></h2>
      </div>
      
      <h1>Persoonlijk Ontwikkelings Plan</h1>
      
      <div class="command-line">
        <span class="prefix">&lt;/&gt;</span>
        <span class="command">npm run start-conversation</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Slide0Opening',
  setup() {
    return {};
  }
});
</script>

<style scoped>
.slide {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f35 0%, #0f1419 100%);
  padding: 60px 40px;
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
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  top: -150px;
  right: -150px;
}

.slide::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  bottom: -100px;
  left: -100px;
}

.opening-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
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
  margin: 40px 0 80px;
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
  border: 1px solid rgba(59, 130, 246, 0.2);
  width: fit-content;
  margin: 0 auto;
}

.prefix {
  color: #f59e0b;
}

.command {
  color: #cbd5e1;
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
