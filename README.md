# APSRTC Smart Public Transport Management System

A high-performance, real-time logistics and transit management platform designed for the **Andhra Pradesh State Road Transport Corporation (APSRTC)**. This system digitizes the bridge between passengers looking for live bus updates and conductors managing ground-truth occupancy.

---

##  Frontend (The User Interface)
The frontend is built as a **Single-Page Application (SPA)** that dynamically handles three distinct user flows:

###  Key Interfaces
*   **Passenger Portal**: Features an intuitive search engine with a real-time progress visualization for bus movement and a map view.
*   **Conductor Dashboard**: A high-density POS-style interface for issuing digital tickets and updating seat counts.
*   **Admin Command Center**: A statistical hub for monitoring revenue, staff performance, and service status.

###  Design System
*   **Aesthetics**: Modern Glassmorphism UI using APSRTC's official color palette (Transit Blue & APSRTC Red).
*   **User Experience**: Fully responsive design with smooth transitions between modules.
*   **Real-time Syncing**: Auto-polls the backend every 3 seconds to keep map data and seat charts accurate without page reloads.

---

##  Backend (The Engine)
The backend is a robust RESTful API built on **Node.js** and **Express.js**, designed for light-weight but scalable data transactions.

###  Core API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/services` | Fetches all active bus services with live stop offsets. |
| `POST` | `/api/tickets` | Generates a new digital ticket and calculates fare. |
| `PATCH` | `/api/services/:no/gps` | Updates the live coordinates for a bus. |
| `PATCH` | `/api/services/:no/occupancy` | Syncs the Men/Women/Student seat count. |
| `POST` | `/api/login/admin` | Authenticates depot managers. |

###  Data Architecture
The system uses **SQLite3** for ACID-compliant storage with the following schema:
*   **Services**: Routes, registration numbers, and current coordinates.
*   **Stops**: Geographic halts with time-offset calculations.
*   **Staff**: Secure credentials for conductors and admins.
*   **Transactions**: Historic data for revenue audits.

---

## Installation & Local Deployment

### 1. Requirements
*   **Node.js** (LTS version recommended)
*   **SQLite3** (Driver included in project)

### 2. Setup
```bash
# Clone the repo
git clone https://github.com/Y22ACS473/smart-public-transport-system.git

# Install dependencies
npm install

# Initialize Database (Runs schema setup & seeds initial data)
node database.js

# Start Server
node server.js
```

### 3. Usage
Access the app at `http://localhost:3000`. Use the following for testing:
*   **Admin**: `admin` / `admin123`
*   **Conductor**: `EID1001` / `1234`

---

##  Future Roadmap
*   **GPS Integration**: Integration with physical mobile GPS sensors for live tracking.
*   **Payment Gateway**: Integration with UPI for cashless ticketing.
*   **RFID Integration**: Smart tapping for seasonal bus passes.
*   **ML Prediction**: Predictive arrival times based on historical traffic data.

---

##  Project Authorship
This project showcases the modernization of public transit in Andhra Pradesh through web-based digital solutions. Designed for high efficiency and low maintenance for the APSRTC network.
