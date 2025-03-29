
```markdown
# Weather Forecast App
A modern weather forecasting application built with Next.js, TypeScript, and Open-Meteo API, featuring real-time weather data
7-day forecasts,and location-based services.

## Features

- 🌦️ Current weather conditions with detailed metrics
- 📅 7-day weather forecast
- 📍 Location search with autocomplete
- 🎨 Responsive design with dark/light mode support
- ⚡ Optimized performance with React Query caching
- 📱 Mobile-friendly interface

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **State Management**: Jotai
- **Data Fetching**: React Query, Axios
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **API**: Open-Meteo Weather API
- **Geocoding**: Open-Meteo Geocoding API

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- API key (not required for Open-Meteo)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```
   (No API keys needed for Open-Meteo)

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/weather-app
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js page routes
│   ├── components/    # Reusable components
│   ├── utils/         # Utility functions
│   └── styles/        # Global styles
├── .env.example       # Environment variables template
├── next.config.js     # Next.js configuration
└── package.json
```

## API Usage

This app uses the following free APIs:

- **Weather Data**: [Open-Meteo Weather API](https://open-meteo.com/)
- **Geocoding**: [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

No API keys are required for basic usage.

## Customization

To customize the app:

1. **Change Theme**: Modify colors in `tailwind.config.js`
2. **Add Locations**: Edit the default locations in `src/app/atom.ts`
3. **Extend Features**: Add new API endpoints in `src/utils/api.ts`


Or build for production:
```bash
npm run build
npm start
