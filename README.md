# 💬 Real‑Time Chat Application

Aplicação de **chat em tempo real** desenvolvida com **NestJS + Socket.IO no backend** e **React + TypeScript + TailwindCSS no frontend**. O projeto suporta **salas obrigatórias**, **emojis**, **animações sutis**, **scroll inteligente** e comunicação em tempo real via WebSockets.

---

## ✨ Funcionalidades

* 🔌 Comunicação em tempo real com **Socket.IO**
* 🏠 **Salas obrigatórias** (listar salas existentes ou criar novas)
* 😀 Suporte completo a **emojis** (Unicode + Emoji Picker)
* 🎬 **Animações sutis** para mensagens, entrada e saída de usuários
* 📜 **Scroll automático inteligente** (não quebra o scroll do usuário)
* 💬 Mensagens de sistema (entrada / saída)
* 🧱 Arquitetura organizada (hooks, components, gateway, services)

---

## 🛠️ Tecnologias Utilizadas

### Backend

* **NestJS**
* **Socket.IO**
* **TypeScript**

### Frontend

* **React**
* **TypeScript**
* **Socket.IO Client**
* **TailwindCSS**
* **emoji-picker-react**

---

## 📁 Estrutura de Pastas (Frontend)

```txt
src/
├── app/
│   └── App.tsx
├── components/
│   ├── Chat/
│   │   ├── ChatHeader.tsx
│   │   ├── ChatMessages.tsx
│   │   ├── ChatInput.tsx
│   └── Join/
│       └── JoinForm.tsx
├── hooks/
│   └── useSocket.ts
├── types/
│   └── chat.ts
│   └── socket-eventes.ts
├── index.css
└── main.tsx
├── App.css
└── App.tsx
```

---

## 📁 Estrutura de Pastas (Backend)

```txt
src/
├── chat/
│   ├── gateway/
│   │   └── chat.gateway.ts
│   ├── services/
│   │   └── chat.service.ts
│   ├── entities/
│   │   └── message.entity.ts
│   ├── enums/
│   │   └── type-message.enum.ts
│   ├── dto/
│   │   ├── join-chat.dto.ts
│   │   └── create-message.dto.ts
│   └── chat.module.ts
```

---

## 🚀 Como Executar o Projeto

### Pré‑requisitos

* Node.js >= 18
* npm ou yarn

---

### ▶️ Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

Servidor WebSocket disponível em:

```txt
http://localhost:3000
```

---

### ▶️ Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Aplicação disponível em:

```txt
http://localhost:5173
```

---
## 🧪 Comportamentos Importantes

* A **sala é obrigatória** para entrar no chat
* Emojis funcionam nativamente (UTF‑8)
* O scroll automático só ocorre se o usuário estiver no final

---
