const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database(path.join(__dirname, 'project.db'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'PROJECT.html'));
});

// ─── SERVICES ──────────────────────────────────────────────────────────────────
app.get('/api/services', (req, res) => {
  db.all(`SELECT no, origin, destination, depot, reg, type, current_stop_index, men_count, women_count, student_count, departure_time, latitude, longitude FROM services`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows.length) return res.json([]);
    let done = 0;
    rows.forEach(svc => {
      db.all(`SELECT name, minutes_offset as m FROM stops WHERE service_no = ? ORDER BY minutes_offset`, [svc.no], (_e, stops) => {
        svc.stopDefs = stops || [];
        db.all(`SELECT id, type, from_stop_index as fromStop, to_stop_index as toStop, fare FROM tickets WHERE service_no = ?`, [svc.no], (_e2, tickets) => {
          svc.tickets = tickets || [];
          if (++done === rows.length) res.json(rows);
        });
      });
    });
  });
});

app.post('/api/services', (req, res) => {
  const { no, origin, destination, depot, reg, type, stops } = req.body;
  if (!no || !origin || !destination || !reg || !depot || !stops || !stops.length) {
    return res.status(400).json({ error: "Missing required fields or stops" });
  }

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    db.run(`INSERT INTO services (no, origin, destination, depot, reg, type) VALUES (?,?,?,?,?,?)`,
      [no, origin, destination, depot, reg, type], function(err) {
        if (err) {
          db.run("ROLLBACK");
          if (err.message.includes('UNIQUE')) return res.status(409).json({ error: "Service Number already exists" });
          return res.status(500).json({ error: err.message });
        }

        const stmtStop = db.prepare(`INSERT INTO stops (service_no, name, minutes_offset) VALUES (?,?,?)`);
        stops.forEach(s => stmtStop.run(no, s.name, s.m));
        stmtStop.finalize(() => {
          db.run("COMMIT", (err) => {
            if (err) {
              db.run("ROLLBACK");
              return res.status(500).json({ error: "Commit failed" });
            }
            res.json({ message: "Service and stops added successfully" });
          });
        });
      });
  });
});

app.patch('/api/services/:no/stop', (req, res) => {
  const { current_stop_index } = req.body;
  db.run(`UPDATE services SET current_stop_index = ? WHERE no = ?`, [current_stop_index, req.params.no], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Stop updated" });
  });
});

app.patch('/api/services/:no/gps', (req, res) => {
  const { latitude, longitude } = req.body;
  db.run(`UPDATE services SET latitude = ?, longitude = ? WHERE no = ?`, [latitude, longitude, req.params.no], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "GPS updated" });
  });
});

app.delete('/api/services/:no', (req, res) => {
  const no = req.params.no;
  db.run(`DELETE FROM service_assignments WHERE service_no=?`, [no], () => {
    db.run(`DELETE FROM tickets WHERE service_no=?`, [no], () => {
      db.run(`DELETE FROM stops WHERE service_no=?`, [no], () => {
        db.run(`DELETE FROM services WHERE no=?`, [no], function(err) {
          if (err) return res.status(500).json({ error: err.message });
          if (this.changes === 0) return res.status(404).json({ error: 'Service not found' });
          res.json({ message: 'Service deleted' });
        });
      });
    });
  });
});

app.patch('/api/services/:no/occupancy', (req, res) => {
  const { men, women, students } = req.body;
  db.run(`UPDATE services SET men_count=?, women_count=?, student_count=? WHERE no=?`,
    [men||0, women||0, students||0, req.params.no], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Occupancy updated" });
    });
});

// ─── TICKETS ───────────────────────────────────────────────────────────────────
app.post('/api/tickets', (req, res) => {
  const { service_no, type, from_stop_index, to_stop_index } = req.body;
  const fare = (type === 'men') ? 120.0 : 0.0;
  const fare_status = (type === 'men') ? 'Paid' : 'Free';
  db.run(`INSERT INTO tickets (service_no, type, from_stop_index, to_stop_index, fare, fare_status) VALUES (?,?,?,?,?,?)`,
    [service_no, type, from_stop_index, to_stop_index, fare, fare_status], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Ticket issued", id: this.lastID });
    });
});

app.get('/api/tickets/service/:service_no', (req, res) => {
  db.all(`SELECT * FROM tickets WHERE service_no = ? ORDER BY timestamp DESC`, [req.params.service_no], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

// ─── ADMIN AUTH ─────────────────────────────────────────────────────────────────
app.post('/api/login/admin', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM admins WHERE username=? AND password=?`, [username, password], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) res.json({ success: true, name: row.name });
    else res.status(401).json({ success: false, message: "Invalid credentials" });
  });
});

// ─── CONDUCTOR AUTH ─────────────────────────────────────────────────────────────
app.post('/api/login/conductor', (req, res) => {
  const { employee_id, pin } = req.body;
  db.get(`SELECT * FROM conductors WHERE employee_id=? AND pin=?`, [employee_id, pin], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) res.json({ success: true, name: row.name, employee_id: row.employee_id });
    else res.status(401).json({ success: false, message: "Invalid Employee ID or PIN" });
  });
});

// ─── CONDUCTOR MANAGEMENT (ADMIN) ───────────────────────────────────────────────
app.get('/api/conductors', (req, res) => {
  db.all(`SELECT employee_id, name, phone, depot, status FROM conductors ORDER BY employee_id`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/conductors', (req, res) => {
  const { employee_id, name, phone, depot, pin } = req.body;
  if (!employee_id || !name) return res.status(400).json({ error: "employee_id and name are required" });
  db.run(`INSERT INTO conductors (employee_id, name, phone, depot, pin, status) VALUES (?,?,?,?,?,'active')`,
    [employee_id, name, phone||'', depot||'', pin || '1234'], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) return res.status(409).json({ error: "Employee ID already exists" });
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Conductor added", employee_id });
    });
});

app.put('/api/conductors/:employee_id', (req, res) => {
  const { name, phone, depot, pin, status } = req.body;
  if (pin && pin.trim() !== '') {
    // Update PIN as well
    db.run(`UPDATE conductors SET name=?, phone=?, depot=?, pin=?, status=? WHERE employee_id=?`,
      [name, phone||'', depot||'', pin, status||'active', req.params.employee_id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Conductor not found" });
        res.json({ message: "Conductor updated" });
      });
  } else {
    // Keep existing PIN unchanged
    db.run(`UPDATE conductors SET name=?, phone=?, depot=?, status=? WHERE employee_id=?`,
      [name, phone||'', depot||'', status||'active', req.params.employee_id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Conductor not found" });
        res.json({ message: "Conductor updated" });
      });
  }
});

app.delete('/api/conductors/:employee_id', (req, res) => {
  const eid = req.params.employee_id;
  db.run(`DELETE FROM service_assignments WHERE employee_id=?`, [eid], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    db.run(`DELETE FROM conductors WHERE employee_id=?`, [eid], function(err2) {
      if (err2) return res.status(500).json({ error: err2.message });
      if (this.changes === 0) return res.status(404).json({ error: "Conductor not found" });
      res.json({ message: "Conductor deleted" });
    });
  });
});

app.patch('/api/conductor/:employee_id/pin', (req, res) => {
  const { old_pin, new_pin } = req.body;
  const eid = req.params.employee_id;
  db.get(`SELECT pin FROM conductors WHERE employee_id = ?`, [eid], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row || row.pin !== old_pin) return res.status(401).json({ error: "Current PIN is incorrect." });
    
    db.run(`UPDATE conductors SET pin = ? WHERE employee_id = ?`, [new_pin, eid], function(err2) {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ message: "PIN updated successfully" });
    });
  });
});

// ─── SERVICE ASSIGNMENTS (ADMIN) ────────────────────────────────────────────────
app.get('/api/assignments', (req, res) => {
  db.all(`SELECT sa.id, sa.employee_id, sa.service_no, sa.date, sa.status,
            c.name as conductor_name, s.origin, s.destination, s.type
          FROM service_assignments sa
          JOIN conductors c ON sa.employee_id = c.employee_id
          JOIN services s ON sa.service_no = s.no
          ORDER BY sa.id DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/assignments', (req, res) => {
  const { employee_id, service_no, date } = req.body;
  if (!employee_id || !service_no) return res.status(400).json({ error: "employee_id and service_no are required" });
  db.run(`INSERT INTO service_assignments (employee_id, service_no, date, status) VALUES (?,?,?,'pending')`,
    [employee_id, service_no, date || new Date().toISOString().slice(0,10)], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Service assigned", id: this.lastID });
    });
});



app.delete('/api/assignments/:id', (req, res) => {
  db.run(`DELETE FROM service_assignments WHERE id=?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Assignment not found" });
    res.json({ message: "Assignment removed" });
  });
});

// ─── CONDUCTOR ASSIGNMENTS (CONDUCTOR VIEW) ────────────────────────────────────
app.get('/api/conductor/:employee_id/services', (req, res) => {
  db.all(`SELECT sa.id, sa.service_no, sa.date, sa.status,
            s.origin, s.destination, s.type, s.reg, s.current_stop_index,
            s.men_count, s.women_count, s.student_count
          FROM service_assignments sa
          JOIN services s ON sa.service_no = s.no
          WHERE sa.employee_id = ?
          ORDER BY sa.id DESC`, [req.params.employee_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.patch('/api/assignments/:id/status', (req, res) => {
  const { status } = req.body;
  if (!['accepted','declined'].includes(status)) return res.status(400).json({ error: "Invalid status" });
  db.run(`UPDATE service_assignments SET status=? WHERE id=?`, [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Assignment not found" });
    res.json({ message: `Assignment ${status}` });
  });
});

// ─── ADMIN STATS DASHBOARD ──────────────────────────────────────────────────────
app.get('/api/admin/stats', (req, res) => {
  const stats = {};
  db.get(`SELECT COUNT(*) as total FROM services`, [], (e, r) => {
    stats.totalServices = r?.total || 0;
    db.get(`SELECT COUNT(*) as total FROM conductors WHERE status='active'`, [], (e2, r2) => {
      stats.activeConductors = r2?.total || 0;
      db.get(`SELECT COUNT(*) as total FROM service_assignments WHERE status='pending'`, [], (e3, r3) => {
        stats.pendingAssignments = r3?.total || 0;
        db.get(`SELECT COUNT(*) as total, SUM(fare) as revenue FROM tickets`, [], (e4, r4) => {
          stats.totalTickets = r4?.total || 0;
          stats.totalRevenue = r4?.revenue || 0;
          db.get(`SELECT SUM(men_count+women_count+student_count) as total FROM services`, [], (e5, r5) => {
            stats.totalPassengers = r5?.total || 0;
            res.json(stats);
          });
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
