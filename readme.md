# CounterX - Simple Counter Application

A beautiful, modern counter application built with React and Vite. Features increment/decrement functionality with a clean, intuitive interface and persistent state management.

## ✨ Features

- **Increment/Decrement**: Simple buttons to increase or decrease the counter
- **Balance Display**: Large, prominent display of the current balance
- **Visual Feedback**: Color-coded balance indicators (positive/negative/neutral)
- **Persistent Storage**: Counter value is saved to localStorage and persists across page refreshes
- **Reset Functionality**: One-click reset to zero
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd notCounterX
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## 🔒 Environment Variables Protection

The `.env` file is protected and will not be committed to version control. The `.gitignore` file includes:

- `.env`
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`

If you need to use environment variables, copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

## 📁 Project Structure

```
notCounterX/
├── src/
│   ├── components/
│   │   ├── Counter.jsx      # Main counter component
│   │   └── Counter.css      # Counter component styles
│   ├── App.jsx              # Root app component
│   ├── App.css              # App component styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── .gitignore              # Git ignore rules (protects .env)
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🎨 Code Clarity

The codebase is designed with clarity in mind:

- **Comprehensive Comments**: All components include JSDoc-style comments explaining their purpose
- **Clear Function Names**: Functions use descriptive, self-documenting names
- **Organized Structure**: Components are separated into logical files
- **Consistent Styling**: CSS follows a consistent naming convention
- **Type Safety**: Ready for TypeScript migration if needed

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern CSS with gradients, animations, and flexbox
- **localStorage**: Client-side persistence

## 📝 Usage

1. **Increment**: Click the green "Increment" button to increase the counter
2. **Decrement**: Click the red "Decrement" button to decrease the counter
3. **Reset**: Click the purple "Reset" button to set the counter back to zero
4. **View Balance**: The current balance is displayed prominently at the top

The counter value is automatically saved to your browser's localStorage, so it will persist even after closing the browser.

## 🎯 Future Enhancements

Potential features that could be added:

- Custom increment/decrement values
- Counter history/undo functionality
- Multiple counters
- Export/import counter data
- Dark/light theme toggle
- Sound effects for button clicks

## 📄 License

This project is open source and available for use in the Stacks program.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

---

**Built with ❤️ for the Stacks Program**

