# Task Tracker App

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS. The app features a clean interface with dark mode support and smooth animations.

![Task Tracker App](https://imgur.com/a/bYa2pMk)

![image](https://github.com/user-attachments/assets/6f926ff6-e8ab-4ae6-90d9-1cc88d5536d6)


https://splendorous-cobbler-180a4b.netlify.app/

## Features

- ✨ **Intuitive Task Management**
  - Add new tasks
  - Mark tasks as complete
  - Delete tasks with a single click
  - Visual feedback for task status

- 🌓 **Dark Mode Support**
  - Toggle between light and dark themes
  - Persists user preference

- 💾 **Data Persistence**
  - Tasks automatically saved to local storage
  - Preserves tasks between browser sessions

- 🎯 **Responsive Design**
  - Optimized for mobile, tablet, and desktop
  - Clean, modern interface

- ✨ **Smooth Animations**
  - Fade-in effects for new tasks
  - Smooth transitions between states

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React Icons
- Vite

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Usage

1. **Adding Tasks**
   - Type your task in the input field
   - Click "Add" or press Enter

2. **Completing Tasks**
   - Click the checkmark icon to toggle completion
   - Completed tasks show with a strikethrough

3. **Deleting Tasks**
   - Hover over a task to reveal the delete button
   - Click the trash icon to remove the task

4. **Dark Mode**
   - Click the sun/moon icon in the top right
   - Theme preference is automatically saved

## Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # Application entry point
├── index.css        # Global styles and Tailwind imports
└── vite-env.d.ts    # TypeScript declarations
```

