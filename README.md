# APSRTC Smart Public Transport Management System (v2.0)
### Digital India Framework — Intelligent Transit Solutions

---

## **1. Project Overview**
The **Smart Public Transport Management System** is a real-time digital portal designed to bridge the gap between passengers, conductors, and depot managers. This platform mimics the actual logistics of **APSRTC (Andhra Pradesh State Road Transport Corporation)**, focusing on transparency, occupancy monitoring, and live bus tracking.

---

## **2. Key Modules & Functionality**

### **A. Passenger Module (Real-Time Inquiry)**
*   **Intelligent Search**: Passengers can search for buses between any two locations (Cities/Villages) across Andhra Pradesh.
*   **Live Bus Tracking**: Visualizes the current position of the bus on a linear route map with real-time progress updates based on departure time and stop offsets.
*   **Seat Availability**: Provides a real-time seat map showing vacant and occupied seats (Men, Women, Students) to help passengers plan their journeys.
*   **Unified Stop Search**: Search inputs are populated with every city and village available in the database, ensuring no stop is missed.

### **B. Conductor Module (Mobile POS & Management)**
*   **Secure Authentication**: Conductors log in using unique Employee IDs and PINs.
*   **Digital Ticketing**: Issues point-to-point tickets with automatic fare calculation (Paid for Men, Free for Women/Students per current state policies).
*   **Live Occupancy Updates**: Conductors can manually override and update the number of passengers to ensure the "Passenger Portal" stays accurate.
*   **Stop Reporting**: Monitors the bus's progress through scheduled stops.

### **C. Manager/Admin Module (Depot Operations)**
*   **Live Statistics Dashboard**: Real-time monitoring of total revenue, passenger count, active conductors, and pending assignments.
*   **Service Allocation**: Assigns specific bus routes to conductors for a given date.
*   **Database Management**: Managers can add new bus services, update routes, and manage the conductor roster.

---

## **3. Technical Architecture**

### **Frontend (The Single-Page Application)**
*   **Aesthetics**: Built with a modern "Transit Blue" and "APSRTC Red" palette, using glassmorphism and high-density UI cards.
*   **Dynamic UI**: The entire application is a single `PROJECT.html` file that switches views between Home, Passenger, Conductor, and Admin without reloading the page.
*   **Real-Time Sync**: Syncs with the server every 3 seconds to fetch the latest bus positions and occupancy data.

### **Backend (The Node.js API)**
*   **Server**: Powered by **Express.js**, handling RESTful API endpoints for all operations.
*   **Database**: Uses **SQLite3** (`project.db`) for lightweight but efficient data storage of services, tickets, assignments, and conductors.

### **Database Schema Highlights**:
*   `services`: Tracks registration numbers, start/end points, and current passenger status.
*   `stops`: Stores a list of every city/village along a route with time offsets.
*   `tickets`: Records every transaction, specifically marking passenger type and route taken.
*   `conductors`: Secure storage for staff credentials and status.

---

## **4. The "Real-Time Logic" Explained**
Unlike static apps, this system simulates bus movement based on the **Departure Time** defined in the database. 
*   **Movement Calculation**: If a bus departs at 07:00 AM, the system calculates its position at any given moment (e.g., 07:45 AM) by comparing the current clock with stop offsets.
*   **Round Trip Logic**: Buses automatically reverse their direction once they reach the destination, ensuring a continuous loop simulation.

---

## **5. Setup Instructions**

Ensure Node.js is installed, then run:

```bash
# 1. Initialize the Database with Cities & Villages
node database.js

# 2. Start the Express Server
node server.js
```

**Access the portal at**: `http://localhost:3000`

---

## **6. Demo Access**
*   **Manager**: `admin` / `admin123`
*   **Conductor**: `EID1001` / `1234`
