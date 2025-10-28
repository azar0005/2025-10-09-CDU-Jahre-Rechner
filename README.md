# CDU Jahre Rechner (CDU Years Calculator)

## Overview

The CDU Jahre Rechner is a web application that calculates how many years of a person's life were spent under a CDU-led government in Germany. The application also provides a complementary overview of years lived under governments that included Die Grünen (Green Party) as coalition partners.

## Purpose

This educational tool helps users understand the political history of the Federal Republic of Germany by:
- Calculating years lived under CDU governance based on birth year
- Showing detailed breakdowns of government periods with chancellors and coalitions
- Providing historical context for each government period
- Highlighting Die Grünen's participation in federal coalitions

## Features

### Core Functionality

1. **Birth Year Input**
   - Users enter their birth year (1900-2025)
   - Real-time validation and error handling
   - Responsive input design

2. **CDU Government Calculation**
   - Total years lived under CDU government
   - Percentage of life under CDU governance
   - Number of government periods experienced
   - Visual result cards with statistics

3. **Die Grünen Government Reminder**
   - Complementary information about Green Party coalition participation
   - Years lived under governments with Die Grünen
   - Detailed breakdown of Red-Green and Ampel coalitions
   - Only displays if user experienced Grünen government periods

4. **Historical Timeline**
   - Detailed overview of all CDU government periods
   - Chancellor names and terms
   - Coalition information
   - Historical context and achievements
   - Years experienced by the user in each period

### User Interface

- **Apple-Style Design**: Clean, minimalist interface with subtle gradients
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in and slide-in effects for result displays
- **Color-Coded Information**: 
  - Gray/Dark theme for CDU statistics
  - Blue for percentages
  - Emerald/Green for periods and Die Grünen information
- **Interactive Elements**: Hover effects and transitions

## Historical Data

### CDU Government Periods (1949-2025)

1. **1949-1969 (20 years)**
   - Chancellors: Konrad Adenauer, Ludwig Erhard, Kurt Georg Kiesinger
   - Various coalitions including CDU/CSU-FDP and Grand Coalition
   - Era: Post-war reconstruction and Wirtschaftswunder

2. **1982-1998 (16 years)**
   - Chancellor: Helmut Kohl
   - Coalition: CDU/CSU-FDP
   - Era: German reunification and European integration

3. **2005-2021 (16 years)**
   - Chancellor: Angela Merkel
   - Coalitions: Grand Coalition (CDU/CSU-SPD) and CDU/CSU-FDP (2009-2013)
   - Era: Financial crisis management and refugee policy

4. **2025-present (1 year)**
   - Chancellor: Friedrich Merz
   - Coalition: Grand Coalition (CDU/CSU-SPD)
   - Era: Post-Ampel government

### Die Grünen Coalition Periods

1. **1998-2005 (7 years)**
   - Red-Green Coalition with SPD
   - Chancellor: Gerhard Schröder (SPD)
   - Vice Chancellor: Joschka Fischer (Grüne)
   - Focus: Renewable energy and environmental policy

2. **2021-2024 (3 years)**
   - Ampel Coalition with SPD and FDP
   - Chancellor: Olaf Scholz (SPD)
   - Vice Chancellor: Robert Habeck (Grüne)
   - Coalition collapsed in November 2024

## Technology Stack

### Frontend
- **React 19.0.0**: Modern UI library
- **React Router DOM 7.5.1**: Client-side routing
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Shadcn/ui Components**: Pre-built accessible components
- **Lucide React**: Icon library
- **Axios 1.8.4**: HTTP client

### Backend
- **FastAPI 0.110.1**: Modern Python web framework
- **Motor 3.3.1**: Async MongoDB driver
- **Uvicorn 0.25.0**: ASGI server
- **PyMongo 4.5.0**: MongoDB integration
- **Pydantic 2.6.4+**: Data validation

### Database
- **MongoDB**: NoSQL database for storing calculation history (future implementation)

### Development Tools
- **ESLint**: JavaScript linting
- **Ruff**: Python linting
- **CRACO**: Create React App Configuration Override

## Project Structure

```
/app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                 # Shadcn UI components
│   │   │   ├── CDUCalculator.jsx   # Main calculator component
│   │   │   ├── ResultCard.jsx      # CDU results display
│   │   │   ├── Timeline.jsx        # Government periods timeline
│   │   │   └── GruenenReminder.jsx # Die Grünen information card
│   │   ├── hooks/
│   │   │   └── use-toast.js        # Toast notification hook
│   │   ├── mockData.js             # Historical government data
│   │   ├── App.js                  # Main app component
│   │   ├── App.css                 # Custom styles
│   │   └── index.css               # Global styles with Tailwind
│   ├── public/
│   ├── package.json
│   └── .env                        # Frontend environment variables
├── backend/
│   ├── server.py                   # FastAPI server
│   ├── requirements.txt            # Python dependencies
│   └── .env                        # Backend environment variables
├── README.md                       # This file
├── SECURITY.md                     # Security documentation
└── INSTALLATION.md                 # Installation guide
```

## API Endpoints (Backend)

The backend currently provides basic endpoints. Future implementation will include:

- `GET /api/` - Health check endpoint
- `POST /api/calculate` - Calculate CDU years (future)
- `GET /api/history` - Get calculation history (future)
- `POST /api/status` - Status check endpoint
- `GET /api/status` - Get status checks

## Data Privacy

- **No Personal Data Storage**: Currently, the app processes calculations client-side only
- **No User Tracking**: No analytics or tracking scripts are implemented
- **No Cookies**: The application does not use cookies
- **Local Processing**: Birth year calculations happen in the browser

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Opera (latest 2 versions)

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader friendly
- High contrast text and backgrounds
- Responsive font sizes

## Future Enhancements

1. **Backend Integration**
   - Store calculation history in MongoDB
   - User accounts and saved results
   - Statistics and analytics

2. **Additional Features**
   - Export results as PDF
   - Share results on social media
   - Compare with other political parties (SPD, FDP, etc.)
   - Interactive historical timeline visualization
   - Multi-language support (English, French)

3. **Performance**
   - Progressive Web App (PWA) support
   - Offline functionality
   - Caching strategies

## Contributing

Contributions are welcome! Please ensure:
- Code follows existing style guidelines
- All tests pass
- Documentation is updated
- Commit messages are descriptive

## License

This project is for educational purposes.

## Acknowledgments

- Historical data sourced from official German government records
- Built with Emergent Agent platform
- Design inspired by Apple's minimalist aesthetic

## Support

For issues, questions, or suggestions, please contact the development team.

## Version History

### v1.0.0 (Current)
- Initial release
- CDU years calculation
- Die Grünen reminder feature
- Responsive Apple-style design
- Historical timeline display
- Client-side only implementation

---

**Last Updated**: October 2025
**Status**: Active Development