const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./project.db');

const ALL_SERVICES = [
  {no:"101",from:"Hyderabad", to:"Vijayawada", depot:"Miyapur", reg:"TS09Z1234", type:"Express", depTime:"07:00",
   stopDefs:[{name:"MGBS",m:0},{name:"LB Nagar",m:20},{name:"Hayathnagar",m:45},{name:"Choutuppal",m:90},{name:"Suryapet",m:180},{name:"Kodad",m:240},{name:"Nandigama",m:300},{name:"Kanchikacherla",m:330},{name:"Vijayawada",m:360}]},
  {no:"102",from:"Guntur", to:"Vizag", depot:"GNT-1", reg:"AP07V5678", type:"Super Luxury", depTime:"10:30",
   stopDefs:[{name:"Guntur NTR",m:0},{name:"Tenali",m:60},{name:"Vijayawada",m:120},{name:"Eluru",m:180},{name:"Tadepalligudem",m:240},{name:"Tanuku",m:270},{name:"Rajahmundry",m:330},{name:"Annavaram",m:420},{name:"Ananakapalle",m:510},{name:"Vizag",m:560}]},
  {no:"103",from:"Nellore", to:"Tirupati", depot:"NLR", reg:"AP26U1111", type:"Ordinary", depTime:"12:30",
   stopDefs:[{name:"Nellore BS",m:0},{name:"Vedayapalem",m:15},{name:"Gudur",m:60},{name:"Venkatagiri",m:120},{name:"Srikalahasti",m:180},{name:"Renigunta",m:225},{name:"Tirupati",m:240}]},
  {no:"104",from:"Anantapur", to:"Hyderabad", depot:"ATP", reg:"AP02B9999", type:"Express", depTime:"06:00",
   stopDefs:[{name:"Anantapur BS",m:0},{name:"Gooty",m:90},{name:"Dhone",m:150},{name:"Kurnool",m:210},{name:"Pebbair",m:270},{name:"Kothakota",m:300},{name:"Mahabubnagar",m:360},{name:"Jadcherla",m:390},{name:"Hyderabad",m:510}]},
  {no:"105",from:"Kakinada", to:"Vijayawada", depot:"KKD", reg:"AP05K4444", type:"Super Luxury", depTime:"11:45",
   stopDefs:[{name:"Kakinada Port",m:0},{name:"Samalkot",m:30},{name:"Rajahmundry",m:120},{name:"Ravulapalem",m:165},{name:"Tanuku",m:210},{name:"Tadepalligudem",m:250},{name:"Eluru",m:310},{name:"Hanuman Junction",m:360},{name:"Vijayawada",m:420}]},
  {no:"106",from:"Kadapa", to:"Nellore", depot:"KDP", reg:"AP04L1010", type:"Ordinary", depTime:"08:15",
   stopDefs:[{name:"Kadapa BS",m:0},{name:"Vontimitta",m:45},{name:"Rajampet",m:90},{name:"Kodur",m:135},{name:"Renigunta",m:210},{name:"Srikalahasti",m:240},{name:"Nellore",m:330}]},
  {no:"107",from:"Ongole", to:"Guntur", depot:"OGL", reg:"AP27M2222", type:"Express", depTime:"13:15",
   stopDefs:[{name:"Ongole BS",m:0},{name:"Singarayakonda",m:30},{name:"Addanki",m:90},{name:"Narasaraopet",m:180},{name:"Chilakaluripet",m:225},{name:"Guntur",m:270}]},
  {no:"108",from:"Warangal", to:"Nizamabad", depot:"WGL", reg:"TS11C3333", type:"Ordinary", depTime:"09:00",
   stopDefs:[{name:"Warangal BS",m:0},{name:"Hanamkonda",m:15},{name:"Kazipet",m:30},{name:"Ghanpur",m:90},{name:"Jangaon",m:150},{name:"Siddipet",m:240},{name:"Kamareddy",m:360},{name:"Nizamabad",m:450}]},
  {no:"109",from:"Khammam", to:"Hyderabad", depot:"KMM", reg:"TS04N7777", type:"Express", depTime:"12:15",
   stopDefs:[{name:"Khammam BS",m:0},{name:"Wyra",m:45},{name:"Tallada",m:90},{name:"Suryapet",m:165},{name:"Narkatpalli",m:240},{name:"Choutuppal",m:300},{name:"Hyderabad",m:390}]},
  {no:"110",from:"Chittoor", to:"Bangalore", depot:"CTR", reg:"AP03P8888", type:"Super Luxury", depTime:"10:00",
   stopDefs:[{name:"Chittoor BS",m:0},{name:"Palamaner",m:60},{name:"Mulbagal",m:120},{name:"Kolar",m:180},{name:"Hoskote",m:240},{name:"Bangalore KR Puram",m:300},{name:"Bangalore BS",m:330}]},
  {no:"111",from:"Tirupati", to:"Hyderabad", depot:"TPT", reg:"AP03YZ1234", type:"Express", depTime:"05:30",
   stopDefs:[{name:"Tirupati BS",m:0},{name:"Renigunta",m:20},{name:"Srikalahasti",m:60},{name:"Pileru",m:150},{name:"Kadapa",m:240},{name:"Nandyal",m:390},{name:"Kurnool",m:450},{name:"Hyderabad",m:630}]},
  {no:"112",from:"Vizag", to:"Srikakulam", depot:"VSP", reg:"AP31ST8888", type:"Ordinary", depTime:"07:45",
   stopDefs:[{name:"Vizag BS",m:0},{name:"Anakapalle",m:45},{name:"Sabbavaram",m:75},{name:"Pendurthi",m:105},{name:"Vizianagaram",m:180},{name:"Srikakulam",m:270}]},
  {no:"113",from:"Karimnagar", to:"Hyderabad", depot:"KRM", reg:"TS02D5555", type:"Express", depTime:"11:30",
   stopDefs:[{name:"Karimnagar BS",m:0},{name:"Sircilla",m:60},{name:"Kamareddy",m:150},{name:"Siddipet",m:210},{name:"Gajwel",m:270},{name:"Hyderabad",m:360}]},
  {no:"114",from:"Mahabubnagar", to:"Kurnool", depot:"MBNR", reg:"TS06K1122", type:"Ordinary", depTime:"12:45",
   stopDefs:[{name:"MBNR BS",m:0},{name:"Jadcherla",m:30},{name:"Nagarkurnool",m:90},{name:"Wanaparthy",m:150},{name:"Kurnool",m:210}]},
  {no:"115",from:"Proddatur", to:"Vijayawada", depot:"PDT", reg:"AP04F6677", type:"Super Luxury", depTime:"04:00",
   stopDefs:[{name:"Proddatur BS",m:0},{name:"Mydukur",m:30},{name:"Badvel",m:90},{name:"Markapur",m:210},{name:"Podili",m:270},{name:"Narasaraopet",m:360},{name:"Guntur",m:420},{name:"Vijayawada",m:450}]},
  {no:"116",from:"Eluru", to:"Rajahmundry", depot:"ELR", reg:"AP07J9900", type:"Express", depTime:"08:00",
   stopDefs:[{name:"Eluru BS",m:0},{name:"Hanuman Junction",m:45},{name:"Vijayawada",m:105},{name:"Guntur",m:165},{name:"Rajahmundry",m:405}]},
  {no:"117",from:"Madanapalle", to:"Tirupati", depot:"MPL", reg:"AP03X4433", type:"Ordinary", depTime:"12:00",
   stopDefs:[{name:"MPL BS",m:0},{name:"Pileru",m:90},{name:"Tirupati",m:180}]},
  {no:"118",from:"Ramagundam", to:"Hyderabad", depot:"RGD", reg:"TS01Y1122", type:"Express", depTime:"06:30",
   stopDefs:[{name:"Ramagundam",m:0},{name:"Godavarikhani",m:15},{name:"Sultanabad",m:45},{name:"Karimnagar",m:90},{name:"Siddipet",m:180},{name:"Hyderabad",m:300}]},
  {no:"119",from:"Suryapet", to:"Vijayawada", depot:"SRPT", reg:"TS04L8899", type:"Ordinary", depTime:"13:30",
   stopDefs:[{name:"Suryapet BS",m:0},{name:"Kodad",m:45},{name:"Jaggaiahpet",m:90},{name:"Nandigama",m:150},{name:"Vijayawada",m:210}]},
  {no:"120",from:"Adoni", to:"Kurnool", depot:"ADN", reg:"AP21C7766", type:"Express", depTime:"11:55",
   stopDefs:[{name:"Adoni",m:0},{name:"Yemmiganur",m:60},{name:"Kurnool",m:180}]},
  {no:"501",from:"Tirupati", to:"Bangalore", depot:"TPT-2", reg:"AP03X8888", type:"Super Luxury", depTime:"06:30", 
   stopDefs:[{name:"Tirupati BS",m:0},{name:"Chandragiri",m:20},{name:"Pileru",m:80},{name:"Madanapalle",m:140},{name:"Chintamani",m:220},{name:"Hoskote",m:260},{name:"Bangalore",m:300}]},
  {no:"502",from:"Srisailam", to:"Hyderabad", depot:"SRM", reg:"AP21Y7777", type:"Ordinary", depTime:"05:00",
   stopDefs:[{name:"Srisailam",m:0},{name:"Sunnipenta",m:15},{name:"Dornala",m:60},{name:"Mallepalli",m:120},{name:"Kalwakurthy",m:180},{name:"Kadthal",m:220},{name:"Amanagal",m:240},{name:"Tukkuguda",m:260},{name:"MGBS",m:290}]},
  {no:"503",from:"Vijayawada", to:"Amaravati", depot:"VJA-C", reg:"AP16Z1122", type:"City Ordinary", depTime:"08:00",
   stopDefs:[{name:"PNBS",m:0},{name:"Benz Circle",m:15},{name:"Ramavarappadu",m:30},{name:"Gollapudi",m:60},{name:"Ibrahimpatnam",m:80},{name:"Amaravati",m:120}]},
  {no:"504",from:"Kurnool", to:"Srisailam", depot:"KNL-1", reg:"AP02K9988", type:"Express", depTime:"09:15",
   stopDefs:[{name:"Kurnool BS",m:0},{name:"Nandyal Checkpost",m:15},{name:"Atmakur",m:90},{name:"Dornala",m:150},{name:"Sunnipenta",m:210},{name:"Srisailam",m:225}]},
  {no:"505",from:"Vizag", to:"Bhimavaram", depot:"VSP-N", reg:"AP31V4455", type:"Super Luxury", depTime:"22:00",
   stopDefs:[{name:"Vizag BS",m:0},{name:"Anakapalle",m:40},{name:"Tuni",m:100},{name:"Annavaram",m:120},{name:"Rajahmundry",m:200},{name:"Tanuku",m:240},{name:"Bhimavaram",m:280}]},
  {no:"506",from:"Nellore", to:"Chennai", depot:"NLR-1", reg:"AP26N3344", type:"Express", depTime:"07:30",
   stopDefs:[{name:"Nellore BS",m:0},{name:"Gudur",m:45},{name:"Naidupeta",m:100},{name:"Sullurpeta",m:140},{name:"Tada",m:160},{name:"Chennai Madhavaram",m:220},{name:"Chennai Koyambedu",m:250}]},
  {no:"P001",from:"Vijayawada", to:"Tenali", depot:"VJA-1", reg:"AP16TV1001", type:"Palle Velugu", depTime:"06:00",
   stopDefs:[{name:"Vijayawada",m:0},{name:"Kankipadu",m:20},{name:"Vuyyuru",m:45},{name:"Pamarru",m:70},{name:"Tenali",m:100}]},
  {no:"P002",from:"Guntur", to:"Bapatla", depot:"GNT-C", reg:"AP07PV2002", type:"Palle Velugu", depTime:"07:30",
   stopDefs:[{name:"Guntur NTR",m:0},{name:"Chebrolu",m:30},{name:"Ponnur",m:60},{name:"Kodavaluru",m:80},{name:"Appikatla",m:100},{name:"Bapatla",m:120}]},
  {no:"V003",from:"Tirupati", to:"Kalahasti", depot:"TPT-3", reg:"AP03PV3003", type:"Palle Velugu", depTime:"09:00",
   stopDefs:[{name:"Tirupati BS",m:0},{name:"Renigunta",m:20},{name:"Gajulamandyam",m:35},{name:"Erravaripalem",m:50},{name:"Srikalahasti",m:70}]},
  {no:"V004",from:"Kurnool", to:"Orvakal", depot:"KNL-2", reg:"AP21PV4004", type:"Palle Velugu", depTime:"10:15",
   stopDefs:[{name:"Kurnool BS",m:0},{name:"Gargeyapuram",m:30},{name:"Nannur",m:50},{name:"Orvakal Airport",m:70},{name:"Orvakal Village",m:85}]},
  {no:"V005",from:"Vizag", to:"Bheemli", depot:"VSP-4", reg:"AP31PV5005", type:"Palle Velugu", depTime:"08:45",
   stopDefs:[{name:"Vizag BS",m:0},{name:"Rushikonda",m:30},{name:"Ins Hamla",m:45},{name:"Thotlakonda",m:60},{name:"Bheemili Beach",m:80}]},
  {no:"L001",from:"Hyderabad", to:"Vijayawada", depot:"Miyapur", reg:"TS09Z9999", type:"Indra (A/C)", depTime:"21:00",
   stopDefs:[{name:"MGBS",m:0},{name:"Suryapet",m:150},{name:"Vijayawada",m:300}]},
  {no:"L002",from:"Vizag", to:"Hyderabad", depot:"VSP-1", reg:"AP31X1111", type:"Garuda (A/C)", depTime:"20:15",
   stopDefs:[{name:"Vizag",m:0},{name:"Annavaram",m:120},{name:"Rajahmundry",m:200},{name:"Vijayawada",m:400},{name:"Hyderabad",m:750}]},
  {no:"R001",from:"Rajahmundry", to:"Kakinada", depot:"RJY", reg:"AP05PV6006", type:"Ordinary", depTime:"06:15",
   stopDefs:[{name:"Rajahmundry",m:0},{name:"Morampudi",m:15},{name:"Dowleswaram",m:30},{name:"Bomuru",m:45},{name:"Rajanagaram",m:70},{name:"Kakinada BS",m:120}]},
  {no:"R002",from:"Ongole", to:"Chirala", depot:"OGL-2", reg:"AP27PV7007", type:"Ordinary", depTime:"11:00",
   stopDefs:[{name:"Ongole BS",m:0},{name:"Kothapatnam",m:25},{name:"Etimoga",m:45},{name:"Chirala BS",m:90}]},
  {no:"K001",from:"Kadapa", to:"Proddatur", depot:"KDP-1", reg:"AP04PV8008", type:"Ordinary", depTime:"14:30",
   stopDefs:[{name:"Kadapa BS",m:0},{name:"Khajipeta",m:30},{name:"Chennur",m:50},{name:"Proddatur BS",m:90}]},
  {no:"A001",from:"Anantapur", to:"Dharmavaram", depot:"ATP-1", reg:"AP02PV9009", type:"Ordinary", depTime:"07:00",
   stopDefs:[{name:"Anantapur BS",m:0},{name:"Rudrampeta",m:15},{name:"Kothacheruvu",m:45},{name:"Dharmavaram BS",m:90}]},
  {no:"S101",from:"Srikakulam", to:"Palasa", depot:"SKL", reg:"AP30PV1111", type:"Ordinary", depTime:"05:30",
   stopDefs:[{name:"Srikakulam BS",m:0},{name:"Arasavalli",m:15},{name:"Narasannapeta",m:45},{name:"Tekkali",m:90},{name:"Palasa BS",m:150}]},
  {no:"C101",from:"Chittoor", to:"Tirupati", depot:"CTR-C", reg:"AP03PV2222", type:"Ordinary", depTime:"13:00",
   stopDefs:[{name:"Chittoor BS",m:0},{name:"Palamaner Circle",m:20},{name:"GD Nellore",m:45},{name:"Puthalapattu",m:75},{name:"Tirupati BS",m:120}]},
  {no:"W101",from:"West Godavari", to:"Eluru", depot:"ELR-C", reg:"AP07PV3333", type:"Ordinary", depTime:"08:15",
   stopDefs:[{name:"Bhimavaram",m:0},{name:"Undi",m:25},{name:"Akividu",m:50},{name:"Kaikaluru",m:80},{name:"Eluru BS",m:150}]},
  {no:"E101",from:"East Godavari", to:"Amalapuram", depot:"RJY-E", reg:"AP05PV4444", type:"Ordinary", depTime:"10:00",
   stopDefs:[{name:"Rajahmundry",m:0},{name:"Ravulapalem",m:45},{name:"Kothapeta",m:75},{name:"Amalapuram BS",m:120}]},
  {no:"M101",from:"Machilipatnam", to:"Vijayawada", depot:"MTM", reg:"AP16PV5555", type:"Ordinary", depTime:"06:45",
   stopDefs:[{name:"Machilipatnam",m:0},{name:"Challapalli",m:30},{name:"Pamarru",m:60},{name:"Vijayawada PNBS",m:120}]},
];

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS service_assignments`);
  db.run(`DROP TABLE IF EXISTS tickets`);
  db.run(`DROP TABLE IF EXISTS stops`);
  db.run(`DROP TABLE IF EXISTS services`);
  db.run(`DROP TABLE IF EXISTS conductors`);
  db.run(`DROP TABLE IF EXISTS admins`);

  db.run(`CREATE TABLE services (
    no TEXT PRIMARY KEY,
    origin TEXT,
    destination TEXT,
    depot TEXT,
    reg TEXT,
    type TEXT,
    current_stop_index INTEGER DEFAULT 0,
    men_count INTEGER DEFAULT 0,
    women_count INTEGER DEFAULT 0,
    student_count INTEGER DEFAULT 0,
    departure_time TEXT,
    latitude REAL,
    longitude REAL
  )`);

  db.run(`CREATE TABLE stops (
    service_no TEXT,
    name TEXT,
    minutes_offset INTEGER,
    FOREIGN KEY(service_no) REFERENCES services(no)
  )`);

  db.run(`CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    name TEXT
  )`);

  db.run(`CREATE TABLE conductors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id TEXT UNIQUE,
    name TEXT,
    phone TEXT,
    depot TEXT,
    pin TEXT,
    status TEXT DEFAULT 'active'
  )`);

  db.run(`CREATE TABLE service_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id TEXT,
    service_no TEXT,
    date TEXT,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY(employee_id) REFERENCES conductors(employee_id),
    FOREIGN KEY(service_no) REFERENCES services(no)
  )`);

  db.run(`CREATE TABLE tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_no TEXT,
    type TEXT,
    from_stop_index INTEGER,
    to_stop_index INTEGER,
    fare REAL,
    fare_status TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(service_no) REFERENCES services(no)
  )`);

  const stmtSvc = db.prepare(`INSERT OR IGNORE INTO services (no, origin, destination, depot, reg, type, departure_time) VALUES (?,?,?,?,?,?,?)`);
  const stmtStop = db.prepare(`INSERT INTO stops (service_no, name, minutes_offset) VALUES (?,?,?)`);
  ALL_SERVICES.forEach(s => {
    stmtSvc.run(s.no, s.from, s.to, s.depot, s.reg, s.type, s.depTime);
    s.stopDefs.forEach(sd => stmtStop.run(s.no, sd.name, sd.m));
  });
  stmtSvc.finalize();
  stmtStop.finalize();

  db.run(`INSERT INTO admins (username, password, name) VALUES ('admin','admin123','Depot Manager')`);

  const conductors = [
    ['EID1001','Ravi Kumar','9876543210','Miyapur','1234'],
    ['EID1002','Suresh Babu','9876543211','GNT-1','1234'],
    ['EID1003','Anil Varma','9876543212','NLR','1234'],
    ['EID1004','Balu Yadav','9876543213','ATP','1234'],
  ];
  const stmtCond = db.prepare(`INSERT INTO conductors (employee_id, name, phone, depot, pin) VALUES (?,?,?,?,?)`);
  conductors.forEach(c => stmtCond.run(c));
  stmtCond.finalize();

  const assignments = [
    ['EID1001','101','2024-05-20','accepted'],
    ['EID1002','102','2024-05-20','accepted'],
    ['EID1003','103','2024-05-20','pending'],
  ];
  const stmtAsgn = db.prepare(`INSERT INTO service_assignments (employee_id, service_no, date, status) VALUES (?,?,?,?)`);
  assignments.forEach(a => stmtAsgn.run(a));
  stmtAsgn.finalize();

  db.run("SELECT 1", () => {
    console.log("Database initialized with routes and starting times.");
    db.close((err) => {
      if (err) console.error(err.message);
      process.exit(0);
    });
  });
});
