# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Progetto Finale - Comparatore Destinazioni Viaggio - ViaggiApp

Questa applicazione è una SPA realizzata con React e Vite che permette di:

- Sfogliare, cercare, filtrare e ordinare destinazioni di viaggio
- Visualizzare i dettagli di ogni destinazione
- Salvare destinazioni tra i preferiti in locale
- Confrontare due o più destinazioni tra loro

## Tecnologie utilizzate

- React
- Vite
- Bootstrap e custom css per lo stile

## Come avviare il progetto

1. Installa le dipendenze:
   ```
   npm install
   ```
2. Avvia il server di sviluppo:
   ```
   npm run dev
   ```

## Note per la consegna

- La cartella `/database` e il file `types.ts` sono stati copiati dal backend come richiesto dalla consegna, per mostrare la struttura dei dati e permettere i test funzionali.
- Il backend deve essere avviato separatamente per far funzionare correttamente le chiamate API.

## Autore

Michele Longo
