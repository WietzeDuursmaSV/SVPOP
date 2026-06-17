# ShareValue - Persoonlijk Ontwikkelings Plan (POP)

Een interactieve presentatie gebaseerd op de git-geïnspireerde workflow voor persoonlijke ontwikkeling en reflectie.

## 🎯 Over dit Project

Dit project implementeert de **Persoonlijk Ontwikkelings Plan** presentatie met 4 interactieve stappen:

1. **Stap 1: Terugblik & Successen** - Reflectie op wat je hebt bereikt
2. **Stap 2: Code Review & Huidige Status** - Analyse van huidige uitdagingen  
3. **Stap 3: Next Sprint** - Planning voor de komende periode
4. **Stap 4: Het Kompas & De Horizon** - Langetermijn doelstelling

## 🚀 Features

- ✨ **Interactieve Slides** - Volledig afbeeldingen met syntax highlighting
- 🎨 **Modern Design** - Dark theme met kleurgecodeerde stappen
- ⌨️ **Keyboard Navigation** - Pijltjestoetsen en spatie voor navigatie
- 🖱️ **Mouse Navigation** - Knoppen en punten voor doelgericht navigatie
- 📱 **Responsive** - Werkt op desktop en tablet
- 🔤 **Syntax Highlighting** - Code snippets met highlight.js

## 📋 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation build tool
- **highlight.js** - Syntax highlighting
- **CSS** - Modern responsive styling

## 🏃 Quick Start

### Installatie

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in je browser.

### Build voor Production

```bash
npm run build
```

## 📖 Navigatie

- **Volgende Knop** - Naar volgende slide
- **Vorige Knop** - Naar vorige slide
- **Puntjes/Dots** - Klik op een punt om naar een specifieke slide te gaan
- **Pijltjestoetsen** - Rechts/Links pijl toets
- **Spatiebalk** - Naar volgende slide

## 🎨 Kleurenschema

- **Slide 1** - Blauw (#3b82f6)
- **Slide 2** - Groen (#10b981)
- **Slide 3** - Oranje (#f59e0b)
- **Slide 4** - Rood (#ef4444)

## 📁 Project Structuur

```
src/
├── components/
│   ├── Slide1Reflection.vue    # Terugblik & Successen
│   ├── Slide2Review.vue         # Code Review
│   ├── Slide3NextSprint.vue     # Next Sprint
│   └── Slide4Compass.vue        # Het Kompas
├── App.vue                       # Main presentation component
├── main.js                       # Entry point
└── style.css                     # Global styles
```

## 🛠️ Aanpassingen

Om de content aan te passen, edit de volgende files:

- **Code snippets**: In elk `Slide*.vue` bestand, update de `code` property
- **Teksten**: Verander de description boxes in de templates
- **Kleuren**: Update de gradient colors in de component styles
- **Vragen**: Wijzig de reflection-questions div

## 📄 Licentie

MIT
