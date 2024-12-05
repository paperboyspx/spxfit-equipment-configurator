# SPXfit Interactive Wizard

An interactive product configuration tool for SPX Fitness equipment, featuring real-time 3D visualization and customization options. Built with Next.js 14 and modern web technologies.

## Features

- **Interactive Visualization**
  - Real-time product rendering
  - Multiple view angles
  - Smooth zoom and pan controls
  - High-quality WebP image format

- **Customization Options**
  - Multiple steel finishes
  - Various upholstery colors
  - Stitch pattern options
  - Real-time preview updates

- **User Experience**
  - Responsive design for all devices
  - Touch-enabled for mobile
  - Intuitive controls
  - Image export functionality

- **Performance**
  - Image preloading
  - Optimized asset delivery
  - Fast page loads
  - Smooth transitions

## Tech Stack

- **Framework**
  - [Next.js 14](https://nextjs.org/) - React framework with App Router
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [React 18](https://reactjs.org/) - UI library

- **UI Components**
  - [NextUI v2](https://nextui.org/) - Modern UI components
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
  - [Tailwind Variants](https://tailwind-variants.org) - Style variants

- **Tools**
  - [ESLint](https://eslint.org/) - Code quality
  - [Prettier](https://prettier.io/) - Code formatting
  - [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## Prerequisites

- Node.js 22.2.0
- Package manager: npm, yarn, pnpm, or bun

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd spxfit-interactive-wizard
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```plaintext
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── hero.tsx            # Main container
│   ├── ImageContainer.tsx  # Image display
│   ├── SidePanel.tsx       # Controls panel
│   └── ...                 # Other components
├── config/                 # Configuration
├── data/                   # Static data
├── public/                 # Static assets
│   ├── Metal/              # Steel finish images
│   └── Bench_*/            # Upholstery images
├── styles/                 # Global styles
└── types/                  # TypeScript types
```

## Available Scripts

- ```npm run dev```   - Development server
- ```npm run build``` - Production build
- ```npm run start``` - Production server
- ```npm run lint```  - Code linting

## Development Guidelines

1. **Code Style**
   - Follow ESLint configuration
   - Use TypeScript strictly
   - Follow component structure
   - Keep components focused

2. **Performance**
   - Optimize images
   - Implement lazy loading
   - Monitor bundle size
   - Use performance tools

3. **Responsive Design**
   - Mobile-first approach
   - Test all breakpoints
   - Touch-friendly controls
   - Accessible interface

4. **State Management**
   - Use React hooks
   - Keep state close to usage
   - Avoid prop drilling
   - Document state flow

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork repository
2. Create feature branch
3. Follow style guide
4. Test thoroughly
5. Submit pull request

## License

Licensed under the [MIT license](LICENSE).
