# SPXfit Interactive Wizard Knowledge Base

## Project Overview
Interactive product configurator for SPX Fitness equipment. Allows users to customize equipment colors and materials with real-time visualization.

## Component Documentation

### Hero (hero.tsx)
Main container component orchestrating the product configurator.

State:
- `activeSteelImage`: Current steel finish image path
- `activeBenchImage`: Current upholstery image path
- `view2`: Toggle for alternate view angle

Functions:
- `handleViewButtonClick`: Switches between primary/secondary view angles
- `handleSaveButtonClick`: Exports composite image of current configuration
- `loadImage`: Preloads image and returns promise
- `getImageName`: Extracts readable name from image path

### ImageContainer (ImageContainer.tsx)
Handles image display with zoom/pan functionality.

State:
- `zoomLevel`: Current zoom magnification
- `isDragging`: Tracks active drag state
- `imagePosition`: Current pan position
- `transformStyle`: CSS transform string

Functions:
- `updateTransform`: Updates CSS transform based on zoom/pan
- `handleMouseDown/Move/Up`: Mouse interaction handlers
- `clampImagePosition`: Constrains pan within bounds
- `handleKeyDown`: Keyboard navigation support

### OverlayImages (overlayImages.tsx)
Manages layered display of product images.

State:
- `currentImages`: Tracks loaded steel/bench images

Functions:
- `preloadImage`: Loads single image with promise
- Image preloading effect with cleanup

### SidePanel (SidePanel.tsx)
Controls panel for product customization.

State:
- `isMobileView`: Tracks viewport size for responsive layout

Functions:
- Resize handler for mobile/desktop view switching
- Conditional rendering of mobile/desktop layouts

### DisclosurePanel (disclosurePanel.tsx)
Manages customization option panels.

State:
- `currentItemIndex`: Active item in mobile carousel
- `activeButtonColors`: Selected colors per panel
- `activeButtonIds`: Selected button IDs
- `upholsteryStitch`: Stitch pattern toggle

Functions:
- `handleSetActiveButtonColor`: Updates active color selection
- `handlePrev/Next`: Carousel navigation
- Conditional rendering for mobile/desktop

### Item (item.tsx)
Individual customization button component.

State:
- `localActiveButtonId`: Tracks local button selection

Functions:
- `handleButtonClick`: Handles color/option selection
- Updates parent components via callbacks
- Manages stitch toggle functionality

### ZoomSlider (zoomSlider.tsx)
Zoom control interface.

State:
- `maxZoom`: Maximum zoom level based on viewport

Functions:
- Viewport-based zoom limit adjustment
- Event propagation control for slider interaction

## Key Architecture Decisions
- Next.js 14 with App Router
- Client-side state management with React hooks
- Image preloading for smooth transitions
- Mobile-first responsive design
- Modular component structure

## Style Guidelines
- Tailwind for utility-first CSS
- Mobile-first breakpoints
- Custom color palette matching SPX brand
- Consistent spacing using Tailwind classes

## Development Workflow
1. Run development server: `npm run dev`
2. Check linting: `npm run lint`
3. Build production: `npm run build`

## Links
- [Next.js Documentation](https://nextjs.org/docs)
- [NextUI Components](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
