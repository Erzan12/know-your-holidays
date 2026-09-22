# 🌴 Know Your Holiday (v1.0.0)

A high-performance mobile application designed to help users track statutory public holidays, monitor school breaks, spot long-weekend getaway opportunities, and plan vacations ahead.

Built with a **React Native (Expo)** frontend and a **NestJS + Prisma** cached backend architecture to ensure lightning-fast performance and offline-ready persistence.

---

## 🚀 Key Features in v1.0.0

* ** statutory Public & School Holidays:** Seamless switching between public holidays (via Nager.Date) and regional school vacation periods (via OpenHolidays API).
* **⚡ Smart Database Caching:** NestJS backend service intercepts API calls and persists records in Prisma/SQL to bypass upstream rate limits and speed up subsequent fetches.
* **🎉 Dynamic Festive Greetings:** Real-time checking on startup that shifts the dashboard banner to an energetic celebratory card if today is a public holiday.
* **🏖️ Getaway & Long-Weekend Visualizer:** Automatic chronological scanning to highlight upcoming long weekends, including live countdowns for travel planning.
* **🌍 Categorized Country & Region Selector:** Native modal lookup with quick-select region filters (Asia, Europe, Americas, Africa, Oceania) supporting over 70+ countries with native flag indicators.

---

## 🛠️ Tech Stack & Architecture

### **Backend (NestJS API)**
* **Framework:** NestJS
* **Database & ORM:** Prisma ORM with SQLite / PostgreSQL
* **HTTP Client:** `@nestjs/axios` (RxJS)
* **Upstream APIs:** Nager.Date API, OpenHolidays API

### **Frontend (Mobile App)**
* **Framework:** React Native / Expo
* **State & Query Management:** `@tanstack/react-query`
* **Navigation:** React Navigation (Native Stack)
* **Icons & Styling:** `lucide-react-native`, Design System Tokens

---

## 📂 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/prisma/      # Database service connection
│   │   └── holidays/           # Holidays module, service, and controller
│   └── prisma/
│       └── schema.prisma       # Database models for cached holiday records
│
└── frontend/
    └── src/
        ├── api/                # TanStack query hooks & fetchers
        ├── constants/          # Static datasets (e.g., countries.ts)
        ├── navigation/         # React Navigation routing
        ├── screens/            # HomeScreen, HolidayListScreen
        └── theme/              # Typography, layout spacing, and color palettes
```

---

## ⚙️ Getting Started
### 1. **Backend Setup(NestJS)**
```bash
cd backend

# Install dependencies
npm install

# Run Prisma database migrations
npx prisma migrate dev

# Start development server
npm run start:dev
Backend runs by default at http://localhost:3000.
```

### 2. **Frontend Setup(React Native/Expo)**
```bash
Bash
cd frontend

# Install dependencies
npm install

# Start the Expo developer bundle
npx expo start
Note for Physical Devices/Emulators: Update API_BASE_URL inside frontend/src/api/holidays.ts to point to your local machine IP address instead of localhost.
```

---

## 🗺️ Roadmap & Future Improvements
Here is the planned direction for future version releases:

### 🔮 v1.1.0 — Smart Travel & Leave Planner
* **Leave Optimizer ("Bridge Day" Engine):** Automatically suggest which single workdays to file for vacation to maximize consecutive days off (e.g., "File 1 day leave on Friday to get a 4-day long weekend").
* **Calendar Sync (iCal / Google Calendar / Apple Calendar):** One-tap button to export selected holidays directly into the user's native phone calendar.
### 🔔 v1.2.0 — Push Notifications & Reminders
* **Getaway Reminders:** Local background push notifications 7 days and 3 days before an upcoming long weekend.
* **Custom Flight/Hotel Booking Alerts:** Configurable reminders prompting users to book accommodation before holiday surge pricing kicks in.
### 🌐 v2.0.0 — Community & Multi-Region Customization
* **State/Province-Level Filtering:** Support regional and state-level holidays for multi-jurisdiction countries (e.g., US states, Australian territories, PH local city holidays).
* **Multi-Language Localization (i18n):** Full localization support for native language translations across Europe and Asia.
* **User Accounts & Favorite Destinations:** Allow users to bookmark multiple countries (e.g., home country vs. target vacation destination) for side-by-side comparison.

## 📄 License
Distributed under the MIT License. See LICENSE for more information.

### 👤 Author
**Erzan**
* **GitHub: https://github.com/Erzan12**
* **Portfolio: https://erzan-dev.vercel.app/**
