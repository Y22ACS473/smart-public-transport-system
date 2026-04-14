# Smart Public Transport System: APSRTC Digital Portal

### Authors
*   **[Your Name]** (Y22ACS473)
*   Department of Computer Science and Engineering
*   Bapatla Engineering College

---

### Implementation
**Node.js API Server, SQLite Database, and Real-Time Logistics implementation.**

🔗 [https://github.com/Y22ACS473/smart-public-transport-system](https://github.com/Y22ACS473/smart-public-transport-system)

---

### Overview
The **Smart Public Transport System** is a digital modernization project designed specifically for the **Andhra Pradesh State Road Transport Corporation (APSRTC)**. Traditional transport systems rely on static printed schedules, which often lead to uncertainty for passengers and inefficiency for staff. 

This system solves these issues by providing a synchronized platform where passengers can track live bus movements, conductors can issue digital tickets instantly, and depot managers can monitor real-time revenue and operations from a central dashboard.

---

### Project Components

#### 1. Backend API Server
*   Built using **Node.js** and **Express.js**.
*   Handles RESTful endpoints for real-time data sync.
*   Authenticates staff and manages role-based access for Admins and Conductors.

#### 2. Database Layer
*   Uses **SQLite3** for lightweight, reliable relational storage.
*   Stores services, live stops, staff credentials, and transaction logs.
*   Ensures ACID compliance for financial ticketing data.

#### 3. Frontend Web Application
*   A high-performance **Single-Page Application (SPA)**.
*   Features an intelligent search engine for all APSRTC stops across AP.
*   Visualizes real-time bus progression using time-offset logic.

---

### System Architecture
The system integrates a **Node.js Gateway**, a **Relational SQLite Database**, and a **Glassmorphism-styled Frontend**. These components work together to simulate live transit logistics, calculating bus positions every 3 seconds to ensure passengers wait less and transport authorities earn more efficiently.

---

### Technologies Used

#### Backend
*   **Node.js**
*   **Express.js**
*   **SQLite3**
*   **CORS**
*   **Path Management**

#### Frontend
*   **HTML5 & CSS3** (Vanilla implementation)
*   **JavaScript ES6+**
*   **Glassmorphism Design System**

#### Cloud & Services
*   **GitHub** (Version Control)
*   **Render** (Target Deployment)
*   **Leaflet.js** (Mapping Visualization)

---

### Key Features
*   **AI-ready Transit Logic**: Simulated live tracking based on departure offsets.
*   **Digital Point-of-Sale (POS)**: Conductor-side instant ticket generation.
*   **Real-time Occupancy Sync**: Monitors Men, Women, and Student counts for state audits.
*   **Dynamic Route Inquiry**: Intelligent stop filtering for any origin-destination pair.
*   **Administrative Telemetry**: Live stats on revenue, staff, and active bus services.

---

### Research Contribution
This project demonstrates how lightweight web technologies and robust backend logic can modernize a state-wide transit network. By providing a "Single Source of Truth" via a central database, the project proves that digital transparency can significantly improve public utility efficiency.

**Department of Computer Science and Engineering**
**Bapatla Engineering College**

---

### Future Work
*   **Physical GPS Integration**: Moving from simulation to real sensor hardware.
*   **UPI Payment Gateway**: Support for cashless digital payments.
*   **Multilingual Support**: Telugu interface for broader accessibility in rural AP.
*   **Mobile Application**: Flutter-based app for real-time passenger notifications.
*   **Predictive Analytics**: Using historical data to predict delays due to traffic.

---

### GitHub Repository
The source code for the Smart Public Transport System is available here:

🔗 [https://github.com/Y22ACS473/smart-public-transport-system](https://github.com/Y22ACS473/smart-public-transport-system)
