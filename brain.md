# Dev-Guru AI — Spiritual Intelligence SaaS Platform Blueprint & System Brain

## 1. Executive Summary & Platform Architecture

**Dev-Guru V3** is an enterprise-grade, multi-tenant Spiritual Intelligence Software-as-a-Service (SaaS) platform built on React 19, TypeScript, Express, Tailwind CSS, Google Maps Platform, and advanced Vedic algorithms.

The platform provides mathematically precise Vedic Astrology (Jyotish), Chaldean & Pythagorean Numerology, 78-Card Rider-Waite-Smith Tarot Readings, Live Astrologer Video Consultations, E-Commerce Gemstone & Remedy Marketplace, Operations CRM, and Super-Admin Infrastructure Telemetry.

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                DEV-GURU V3 CLIENT LAYER                          │
│                                                                                  │
│ ┌─────────────┐ ┌──────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │
│ │  Onboarding │ │ Kundli Engine│ │ Numerology  │ │ Tarot Deck  │ │ Astro Maps │ │
│ └──────┬──────┘ └──────┬───────┘ └──────┬──────┘ └──────┬──────┘ └─────┬──────┘ │
└────────┼───────────────┼────────────────┼───────────────┼──────────────┼─────────┘
         │               │                │               │              │
┌────────┴───────────────┴────────────────┴───────────────┴──────────────┴─────────┐
│                           EXPRESS SERVER & API GATEWAY                           │
│  - REST API Routes (/api/ai/*)                                                    │
│  - Vite Middleware (Development / SPA fallback)                                  │
│  - Server-Side Gemini API Proxy (@google/genai)                                  │
│  - Google Maps Platform Proxy & Geocoding Resolver                               │
└────────┬─────────────────────────────────────────────────────────────────────────┘
         │
┌────────┴─────────────────────────────────────────────────────────────────────────┐
│                           AI & EXTERNAL INTEGRATIONS                             │
│  - Google Gemini 3.6 Flash (Server-Side Key Security)                            │
│  - Google Maps Platform (@vis.gl/react-google-maps)                              │
│  - Swiss Ephemeris Astro Calculations                                            │
│  - Razorpay Payment Authorization Simulation                                     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Modules & Engine Specifications

### 2.1 Vedic Astrology Engine (Jyotish)
- **Birth Chart (D1 Rashi Chart)**: Precise house placement (1 to 12) using Whole Sign / Sripati system with Sidereal Ayanamsa (Lahiri).
- **Lagna (Ascendant)**: Calculated from birth time and location coordinates.
- **Moon Sign (Rashi) & Nakshatra**: Computes exact moon degree to determine Nakshatra (1-27), Nakshatra Lord, Pada (1-4), and Rashi.
- **Divisional Charts**:
  - `D1`: Primary Rashi Chart
  - `D9`: Navamsha Chart (Spouse & Soul Purpose)
  - `D10`: Dasamsha Chart (Career & Status)
  - `D60`: Shashtiamsha Chart (Past Karma)
- **Ashtakvarga Points**: 8-fold strength evaluation for all 7 classical planets across 12 houses.
- **Vimshottari Dasha**: 120-year planetary period cycle calculating current Mahadasha, Antardasha, and Pratyantardasha.
- **Yogas & Doshas**:
  - *Yogas*: Gaja Kesari, Raj Yoga, Dhan Yoga, Budhaditya.
  - *Doshas*: Manglik Dosha, Kaal Sarp Dosha, Sade Sati phase detection.

### 2.2 Kundli AI Explanation Engine (Google Gemini 3.6 Flash)
- **Server Endpoint**: `/api/ai/kundli-explain`
- **Functional Scope**: Explains Rashi, Nakshatra, Lagna, Moon Sign, house placements, and yogas in simple, comforting, user-friendly language.
- **Security**: Key kept 100% server-side via `process.env.GEMINI_API_KEY`.

### 2.3 Chaldean & Pythagorean Numerology Engine
- **Mulank (Birth Number)**: Reduced day of birth (1-9).
- **Bhagyank (Destiny Number)**: Sum of full Date of Birth.
- **Life Path**: Pythagorean calculation of full birth date sequence.
- **Chaldean Name Vibration**: Name sound frequency analysis (1-8 valuation mapping).
- **Lo Shu Grid**: 3x3 magic square matrix mapping birth date digits (3-1-9, 2-7-6, 4-5-8).

### 2.4 78-Card Tarot Deck & Spread System
- **Full Deck**: 22 Major Arcana + 56 Minor Arcana (Wands, Cups, Swords, Pentacles).
- **Spreads**:
  1. *1-Card Daily Guidance*
  2. *3-Card Past, Present, Future*
  3. *5-Card Cross of Truth*
  4. *6-Card Relationship Harmony*
  5. *10-Card Celtic Cross*
- **Reversal Probability**: 25% randomized orientation during shuffle with unique inverted interpretations.

### 2.5 Google Maps & Location Intelligence Agent
- **Integration**: `@vis.gl/react-google-maps`
- **Define Block**: `process.env.GOOGLE_MAPS_PLATFORM_KEY` exposed in `vite.config.ts`.
- **Capabilities**:
  - Real-time place search for temples, ashrams, meditation spots, and Vedic centers.
  - Birth place geocoding and exact latitude/longitude resolution.
  - Interactive direction routing and map marker overlays.

### 2.6 Daily Panchang, 24 Horas & Shubh Muhurats Engine
- **5 Core Elements of Panchang**: Tithi (Shukla/Krishna Paksha), Vara (Day of week & Lord), Nakshatra & Lord, Yoga, and Karana.
- **Auspicious & Inauspicious Timings**:
  - *Abhijit Muhurat* (Golden window of the day)
  - *Brahma Muhurat* (Pre-dawn meditation)
  - *Rahu Kalam* (Inauspicious start window)
  - *Yamaganda & Gulika Kalam*
- **24 Planetary Horas**: Full day & night planetary hours matrix (Surya, Chandra, Mangal, Budha, Guru, Shukra, Shani) with activity suitability tags.
- **Shubh Muhurats Finder**: Category-based event timing finder for:
  - 🚗 *Vehicle Buying (Car/Bike)*
  - 🏠 *Griha Pravesh & House Warming*
  - 💍 *Vivah (Marriage)*
  - 💼 *New Business / Job Start*
  - 🪙 *Gold & Gemstone Consecration*
  - 👶 *Namakaran (Baby Naming)*

### 2.7 Real-Time Moon Sign Transit Notification System
- **Real-Time Toast Alerts**: Notifies users of major planetary transits (Saturn Sade Sati aspect, Jupiter direct expansion, Rahu-Ketu axis shifts) affecting their specific Moon Sign.
- **Vedic Remedial Actions**: Direct action button to view remedies, chant mantras, and mitigate planetary doshas.

### 2.8 Luxury Branded PDF Report Export Service
- **PDF Generation Engine**: Uses `jspdf` to compile high-resolution, branded Kundli and Horoscope PDF documents.
- **Styling & Layout**: Navy and Amber Gold border framing, certified ephemeris header, full birth details matrix, planetary degrees/dignities table, and AI Kundli analysis.
- **1-Click Download**: Available across the Kundli Chart view and Customer Dashboard.

---

## 3. Guided Onboarding Flow

1. **Trigger Condition**: First-time visitors or users clicking "Setup Birth Profile".
2. **Form Steps**:
   - **Step 1**: Full Legal Name & Gender Selection.
   - **Step 2**: Date of Birth (YYYY-MM-DD).
   - **Step 3**: Exact Time of Birth (HH:MM AM/PM) — with clear explanation on why exact time is crucial for Lagna (Rising Sign) calculation.
   - **Step 4**: Place of Birth (City, Country) — resolves latitude and longitude for Swiss Ephemeris precision.
3. **Redirection**: On completion, updates the central `UserProfile` state and smoothly redirects to the personalized **Customer Dashboard**.

---

## 4. Personalized Daily Horoscope Feature

- **Chart-Aware Transit Mapping**: Evaluates the user's Rashi, Nakshatra, Lagna, and Moon Sign against today's real-time planetary transits.
- **Daily Focus Categories**:
  - *Career & Focus*
  - *Love & Relationships*
  - *Wealth & Opportunities*
  - *Health & Vitality*
  - *Lucky Color & Lucky Number of the Day*
- **Gemini Live AI Transit Generator**: Allows users to refresh today's transit horoscope in real-time powered by `gemini-3.6-flash`.

---

## 5. Security, Roles & Infrastructure Data Schema

### User Roles (RBAC)
- `visitor`: Unauthenticated guest browsing public marketplace and landing page.
- `customer`: Registered user with birth chart, daily horoscope, and order history.
- `manager`: Operations desk managing lead pipelines, CRM kanban, and dispatches.
- `admin` / `super_admin`: Platform superuser monitoring MRR, system audit logs, and Gemini token telemetry.

### Core Data Interfaces (`src/types.ts`)
- `UserProfile`
- `KundliReport`
- `NumerologyReport`
- `DrawnTarotCard`
- `AstrologerExpert`
- `Product`
- `Lead`
- `AuditLog`

---

## 6. Deployment & Environment Checklist

- Port: Binds strictly to `3000` on `0.0.0.0`.
- Environment Variables documented in `.env.example`:
  - `GEMINI_API_KEY`
  - `APP_URL`
  - `GOOGLE_MAPS_PLATFORM_KEY`
- Build Output: Compiled via `npm run build` to `dist/server.cjs`.
