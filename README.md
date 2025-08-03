# HeadStarter Bot - AI-Powered Developer Assistant Frontend

A modern, responsive Next.js web application that provides an intuitive chat interface for AI-powered developer assistance. Built with TypeScript, Tailwind CSS, and Radix UI components, featuring real-time streaming, code syntax highlighting, and seamless integration with the HeadStarter backend API.

![HeadStarter Bot](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)

## 🚀 Live Demo

**Frontend**: [HeadStarter Bot Frontend](https://headstarter-bot.vercel.app)  
**Backend Repository**: [HeadStarter Bot Backend](https://github.com/aarav0180/HeadStarter-Back)

## ✨ Features

### 🎨 **Modern UI/UX Design**
- **Dark Theme**: Sophisticated dark blue-green gradient aesthetic
- **Glass Morphism**: Transparent, minimal glassy background effects
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: CSS transitions and micro-interactions
- **Custom Typography**: Poppins font with creative text styling

### 💬 **Advanced Chat Interface**
- **Real-time Streaming**: Server-Sent Events (SSE) for live responses
- **Interactive Progress Bar**: Continuous 2%/second progress with SSE updates
- **Code Syntax Highlighting**: Prism.js integration with multiple languages
- **Typewriter Effect**: Character-by-character AI response animation
- **Copy Code Blocks**: One-click code copying with visual feedback
- **Link Detection**: Automatic URL highlighting with hover tooltips

### 🔧 **Developer Experience**
- **Web Search Toggle**: Switch between basic chat and web search modes
- **Chat Persistence**: Local storage for conversation history
- **Dynamic Chat Management**: Create, select, and delete conversations
- **Markdown Support**: Bold, italic, lists, and code formatting
- **Error Handling**: Robust error handling with user-friendly messages

### 🎯 **AI Integration**
- **Dual API Endpoints**: 
  - `/quick` for basic queries (JSON responses)
  - `/query/stream` for web search (SSE streaming)
- **Smart Query Processing**: Automatic query refinement and analysis
- **Multi-source Results**: Web scraping from official docs, Stack Overflow, etc.
- **Source Attribution**: Direct links to original sources

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App  │───▶│  API Routes     │───▶│  Backend API    │───▶│  Gemini AI      │
│   (Frontend)   │    │  (/api/chat)    │    │  (FastAPI)      │    │  (Google AI)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │                       │
         ▼                       ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  React State    │    │  SSE Streaming  │    │  Web Scraping   │    │  Content        │
│  Management     │    │  (Real-time)    │    │  (Browserbase)  │    │  Analysis       │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │                       │
         ▼                       ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Local Storage  │    │  Progress Bar   │    │  Search APIs    │    │  Solution       │
│  (Chat History) │    │  (Interactive)  │    │  (Multi-source) │    │  Ranking        │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📱 Screenshots

### 🏠 **Landing Page**
![Landing Page](https://via.placeholder.com/800x400/0A0F1A/EAEAEA?text=HeadStarter+Bot+Landing+Page)

### 💬 **Chat Interface**
![Chat Interface](https://via.placeholder.com/800x400/0A0F1A/EAEAEA?text=Chat+Interface+with+Code+Highlighting)

### 🔍 **Web Search Mode**
![Web Search](https://via.placeholder.com/800x400/0A0F1A/EAEAEA?text=Interactive+Progress+Bar+with+SSE)

### 📱 **Mobile Responsive**
![Mobile View](https://via.placeholder.com/400x600/0A0F1A/EAEAEA?text=Mobile+Responsive+Design)

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 15.2.4**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Type-safe development

### **Styling & UI**
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Tailwind CSS Animate**: Smooth animations

### **Code Highlighting**
- **Prism.js 1.30.0**: Syntax highlighting for multiple languages
- **Custom Themes**: Dark theme matching the app aesthetic

### **State Management**
- **React Hooks**: useState, useEffect, useRef
- **Local Storage**: Chat persistence and history
- **Context API**: Theme and state management

### **Development Tools**
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📋 Prerequisites

- **Node.js 18+**: JavaScript runtime
- **npm/pnpm**: Package manager
- **Backend API**: HeadStarter Bot backend running on `http://localhost:8000`

## 🚀 Installation

### 1. **Clone the Repository**
```bash
git clone https://github.com/aarav0180/HeadStarter-Bot.git
cd HeadStarter-Bot
```

### 2. **Install Dependencies**
```bash
npm install
# or
pnpm install
```

### 3. **Environment Setup**
Create a `.env.local` file in the root directory:
```bash
# Backend API URL (default: http://localhost:8000)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. **Start the Backend**
Make sure the HeadStarter Bot backend is running:
```bash
# Clone and start the backend
git clone https://github.com/aarav0180/HeadStarter-Back.git
cd HeadStarter-Back
pip install -r requirements.txt
python main.py
```

### 5. **Start the Frontend**
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🏃‍♂️ Development

### **Available Scripts**
```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### **Project Structure**
```
HeadStarter-Bot/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── chat/          # Chat API proxy
│   ├── chat/              # Chat page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Radix UI components
│   ├── chat-window.tsx   # Main chat interface
│   ├── chat-sidebar.tsx  # Chat sidebar
│   ├── chat-message.tsx  # Message component
│   └── ...               # Other components
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
└── package.json          # Dependencies
```

## 🔧 Configuration

### **Backend Integration**
The frontend integrates with the HeadStarter Bot backend API:

#### **API Endpoints**
- **`POST /api/chat`**: Proxy to backend for basic queries
- **`POST http://localhost:8000/quick`**: Fast queries (JSON)
- **`POST http://localhost:8000/query/stream`**: Web search (SSE)

#### **Environment Variables**
```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: Custom API configuration
NEXT_PUBLIC_ENABLE_WEB_SEARCH=true
NEXT_PUBLIC_STREAM_TIMEOUT=30000
```

### **Chat Features Configuration**
```typescript
// Chat window configuration
const chatConfig = {
  maxMessages: 100,
  autoScroll: true,
  typewriterSpeed: 15, // ms per character
  progressUpdateInterval: 1000, // ms
  streamTimeout: 30000, // ms
}
```

## 🎨 Customization

### **Theme Colors**
The app uses a custom dark theme with green accents:

```css
/* Primary Colors */
--background: #0A0F1A
--foreground: #EAEAEA
--primary: #059669
--primary-foreground: #0A0F1A
--secondary: #0D9488
--accent: #10B981

/* Gradients */
--gradient-primary: linear-gradient(135deg, #059669 0%, #0D9488 100%)
--gradient-secondary: linear-gradient(135deg, #0A0F1A 0%, #1E293B 100%)
```

### **Component Styling**
All components use Tailwind CSS with custom classes:
```tsx
// Example: Chat message styling
<div className="bg-[#059669]/10 backdrop-blur-sm border border-[#059669]/20 rounded-lg p-4">
  {/* Message content */}
</div>
```

## 🧪 Testing

### **Manual Testing**
1. **Basic Chat**: Send simple messages without web search
2. **Web Search**: Enable web search and test complex queries
3. **Code Highlighting**: Send code blocks in various languages
4. **Responsive Design**: Test on different screen sizes
5. **Chat Persistence**: Create, switch, and delete conversations

### **API Testing**
```bash
# Test basic chat
curl -X POST "http://localhost:3000/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}], "webSearchEnabled": false}'

# Test web search (requires backend)
curl -X POST "http://localhost:8000/query/stream" \
  -H "Content-Type: application/json" \
  -d '{"question": "How to fix React hooks errors?"}'
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add `NEXT_PUBLIC_API_URL` in Vercel dashboard
3. **Deploy**: Automatic deployment on push to main branch

### **Environment Variables for Production**
```bash
# Production backend URL
NEXT_PUBLIC_API_URL=https://your-backend-api.com

# Optional: Analytics and monitoring
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔍 Performance

### **Optimizations**
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Built-in webpack bundle analyzer
- **Caching**: Static generation and ISR
- **Lazy Loading**: Component and route lazy loading

### **Lighthouse Scores**
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🤝 Contributing

### **Development Setup**
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### **Code Style**
- **TypeScript**: Strict type checking
- **ESLint**: Follow project linting rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standard commit message format

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### **Getting Help**
- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue in the repository
- **Discussions**: Use GitHub Discussions for questions
- **Backend Issues**: Check the [backend repository](https://github.com/aarav0180/HeadStarter-Back)

### **Common Issues**
1. **Backend Connection**: Ensure the backend is running on `http://localhost:8000`
2. **CORS Errors**: Backend should allow requests from `http://localhost:3000`
3. **SSE Issues**: Check browser console for streaming errors
4. **Build Errors**: Clear `.next` folder and reinstall dependencies

## 🔮 Roadmap

### **Planned Features**
- [ ] **Real-time Collaboration**: Multi-user chat rooms
- [ ] **File Upload**: Support for code files and images
- [ ] **Voice Input**: Speech-to-text integration
- [ ] **Export Chats**: PDF and markdown export
- [ ] **Advanced Analytics**: Usage statistics and insights
- [ ] **Plugin System**: Extensible chat functionality
- [ ] **Mobile App**: React Native companion app
- [ ] **Offline Support**: Service worker for offline chat

### **Technical Improvements**
- [ ] **Performance**: Further optimization and caching
- [ ] **Accessibility**: Enhanced screen reader support
- [ ] **Internationalization**: Multi-language support
- [ ] **Testing**: Comprehensive test suite
- [ ] **Monitoring**: Error tracking and performance monitoring

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Radix UI**: For accessible component primitives
- **Google AI**: For the Gemini AI models
- **Vercel**: For seamless deployment platform

---

**Built with ❤️ by Aarav**

For more information about the backend API, visit: [HeadStarter Bot Backend](https://github.com/aarav0180/HeadStarter-Back)
