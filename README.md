# Course Rating App 🌟

## Overview

Course Rating App is a full-stack Next.js application for rating and reviewing online courses. Originally designed as a learning project to explore the latest server-side rendering and static site generation capabilities, it evolved into a comprehensive full-stack application due to unexpected challenges.

## 📖 Project Story

This project was initially developed to explore Next.js 14+ features, particularly:

- Server-side rendering (SSR)
- Static site generation (SSG)
- App Router architecture
- Modern React patterns

However, during development, i discovered that the original API we planned to use was located in a territory that became inaccessible from Ukraine due to "geopolitical reasons". This challenge me to develop own "kindest" data migration tools and database infrastructure, ironically transforming what started as a frontend exploration into a full-featured full-stack application! 😄

## ✨ Features

- 📚 Browse courses by categories (Programming, Design, Marketing, etc.)
- ⭐ Rate courses with 1-5 star system
- 💬 Submit and read detailed reviews
- 🔍 Filter courses by popularity, price, and reviews
- 📱 Responsive design with mobile support
- 🌙 Theme switching support
- 🖼️ Automatic course image management
- 📊 Course statistics and ratings
- 🗄️ Full data migration toolkit

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Date Handling**: date-fns
- **Image Optimization**: Next.js Image component

### Backend
- **Database**: MongoDB with Mongoose
- **API**: Next.js API Routes
- **Data Migration**: Custom migration tools
- **Image Processing**: Custom download utilities

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── form/              # Review submission
│   │   ├── getImages/         # Image download utility
│   │   ├── menu/              # Menu data management
│   │   └── products/          # Product data management
│   ├── components/            # React components
│   │   ├── Advantages/        # Course advantages display
│   │   ├── Button/            # Reusable UI buttons
│   │   ├── Menu/              # Multi-level navigation
│   │   ├── Product/           # Product cards
│   │   ├── Review/            # Review display
│   │   ├── ReviewForm/        # Review submission form
│   │   └── ...               # Other UI components
│   ├── dbSchemas/             # MongoDB schemas
│   ├── helpers/               # Utility functions
│   ├── interfaces/            # TypeScript interfaces
│   ├── services/              # External services
│   ├── store/                 # Zustand state management
│   └── utils/                 # Data migration utilities
└── public/                    # Static assets
    ├── Images/                # Course images
    └── icons/                 # UI icons
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd course-rating
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGO_URI=mongodb://your-mongodb-connection-string
   NEXT_PUBLIC_DOMAIN_LOCAL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Deployment

### Local Docker Setup
```bash
# Build the image
docker build -t course-rating-app .

# Run the container
docker run -p 3000:3000 course-rating-app
```

### Production Build
```bash
npm run build
npm start
```

## 🔧 API Endpoints

### Products Management
- `GET /api/products?category=<category>` - Retrieve products by category
- `POST /api/products` - Create/update products for category

### Menu Management
- `GET /api/menu?category=<category>` - Retrieve menu by category
- `POST /api/menu` - Create/update menu for category

### Reviews System
- `POST /api/form` - Submit new review
- `GET /api/form?id=<productId>` - Get reviews for product

### Data Migration
- `GET /api/getImages` - Download and migrate course images


## 🎯 Key Features Implementation

### 🔄 State Management
- Zustand for global state management
- SessionStorage caching for performance
- Optimistic UI updates
- Error handling and loading states

### 🖼️ Image Management
- Automatic image downloading from external sources
- Local storage in `public/Images/products`
- Duplicate prevention and optimization
- Fallback image handling

### ⭐ Review System
- Real-time review submission
- Star rating with accessibility support
- Form validation with React Hook Form
- Automatic list updates after submission

### 🧭 Navigation
- Multi-level menu system (categories → subcategories → courses)
- Breadcrumb navigation
- Active state management
- Smooth animations with Framer Motion

### ⚡ Performance Optimizations
- Component memoization with `React.memo`
- Callback memoization with `useCallback`
- Next.js Image optimization
- Data caching strategies
- Server-side rendering for SEO

## 🔧 Data Migration Tools

Due to the original API accessibility issues, we developed comprehensive migration tools:

- **Menu Migration**: Transfers hierarchical menu structures
- **Product Migration**: Migrates course data with reviews
- **Image Migration**: Downloads and optimizes course images
- **Data Validation**: Ensures data integrity during migration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

### Code Quality
- TypeScript for type safety
- ESLint and Prettier for code formatting
- CSS Modules for component styling
- Accessibility considerations throughout

### Testing
- Component testing setup ready
- API endpoint validation
- Error boundary implementation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for reliable database solutions
- The open-source community for inspiration
- And a special thanks to geopolitical circumstances for making this a more interesting project than originally planned! 😅

---

**Built with ❤️ in Ukraine 🇺🇦**

*Sometimes the best projects come from unexpected challenges!*