<img width="500" height="500" alt="Os Simulation Tool Logo" src="https://github.com/user-attachments/assets/a0e04a51-5b60-4a3f-a197-e4cdbd64746b" />


# 🖥️ Operating System Simulation Tool

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-skyblue?logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple?logo=vite)

A comprehensive **web-based Operating System Simulation Tool** developed for the course **CS313 – Operating System Concepts**.  
The project integrates major operating system concepts into one unified simulation platform including:

- CPU Scheduling
- Process Synchronization
- Deadlock Management
- Memory Management
- File System Simulation

The simulator allows users to interactively visualize how operating system components work together in real-time.


---

# 🌐 Live Demo

🔗 Live Project:  
[https://os-simulation-tau.vercel.app/](https://os-simulation-tau.vercel.app/)

Note: This website is not responsive on small screens. On mobile devices, please use Desktop View for the best experience.

---

# 💻 GitHub Repository

🔗 Repository Link:  
[https://github.com/AzharMehmood4/os-simulation](https://github.com/AzharMehmood4/os-simulation/)

---

# 🚀 Project Overview

This Operating System Simulation Tool was developed to simulate core operating system functionalities in a visual and interactive way.

The project combines all assignments into one integrated system where:

- Processes are created and scheduled
- Memory is dynamically allocated
- Shared resources are synchronized
- Deadlocks are detected and resolved
- Files are created, read, written, and deleted
- Disk allocation techniques are visualized

The simulator demonstrates how multiple OS components interact together in a real operating system environment.

---

# 🔥 Features

# ⚙️ Assignment 1 – Process Scheduling

Implemented CPU Scheduling Algorithms:

- FCFS (First Come First Serve)
- SJN / SJF (Shortest Job Next)
- Round Robin
- Priority Scheduling

### Features

- Add dynamic processes
- Arrival Time, Burst Time, Priority input
- Gantt Chart Visualization
- Waiting Time Calculation
- Turnaround Time Calculation
- Completion Time Calculation
- Throughput Calculation
- Process-to-file linking

---

# 🔒 Assignment 2 – Synchronization & Deadlock

### Features

- Mutex Simulation
- Critical Section Handling
- Process Synchronization
- Banker’s Algorithm
- Deadlock Detection

---

# 🧠 Assignment 3 – Memory Management

### Features

- Paging
- Segmentation
- Virtual Memory
- First Fit Allocation
- Best Fit Allocation
- Worst Fit Allocation
- FIFO Page Replacement
- LRU Page Replacement
- OPT Page Replacement

---

# 📂 Assignment 4 – File System Simulation

### Features

- File Creation
- File Deletion
- File Reading
- File Writing
- Disk Block Visualization
- File Access by Processes
- File Locking
- Deadlock Risk Detection
- File Access Logs
- Disk Usage Monitoring
- Fragmentation Tracking

### File Allocation Techniques

- Contiguous Allocation
- Linked Allocation
- Indexed Allocation

---

# 🔗 Full System Integration

The final project integrates all assignments into one cohesive system.

### Integration Features

- Processes created in Scheduling module are used in File System module
- Processes can access shared files
- File conflicts trigger deadlock conditions
- Memory is allocated dynamically to processes
- Deadlock handling integrates with synchronization system
- Real-time visualization of OS operations

---

# 🖼️ System Modules

| Module | Description |
|---|---|
| Scheduling | CPU Scheduling Algorithms |
| Synchronization | Mutex & Deadlock Management |
| Memory Management | Paging & Allocation |
| File System | File Operations & Disk Allocation |

---

# 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend Development |
| Tailwind CSS | UI Design |
| JavaScript | Algorithm Implementation |
| Vite | Development Environment |

---


# 📁 Project Structure

```bash
os-simulation/
├── src/
│   ├── algorithms/
│   │   ├── fileSystemA4.js
│   │   ├── memory.js
│   │   ├── paging.js
│   │   ├── processSchedulingA1.js
│   │   ├── synchronizationA2.js
│   │
│   ├── components/
│   │   ├── DeadlockSimulatorA2.jsx
│   │   ├── FileSystemSimulatorA4.jsx
│   │   ├── MemoryManager.jsx
│   │   ├── MemoryVisualizer.jsx
│   │   └── PagingSimulator.jsx
│   │   ├──ProcessSchedulingA1.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
````

---

# ⚡ Screenshots

## 🖥️ Main Dashboard

<img width="1284" height="563" alt="Screenshot from 2026-05-13 23-59-35" src="https://github.com/user-attachments/assets/f98bedab-7dea-47c0-a97c-b056e91170f1" />


---

## 📊 Gantt Chart

<img width="1156" height="446" alt="Screenshot from 2026-05-13 23-58-15" src="https://github.com/user-attachments/assets/0aaaa812-123a-49a8-9457-50c2c3467d2e" />


---

## 🔒 Deadlock Detection

<img width="1363" height="256" alt="image" src="https://github.com/user-attachments/assets/0dcadecc-4d95-4fac-bd77-8475070853d0" />


---

## 🧠 Memory Management
### Process size

<img width="1356" height="740" alt="image" src="https://github.com/user-attachments/assets/f69eba0c-a152-462d-bc08-57a182ce93f9" />

### First Fit 
<img width="1356" height="740" alt="image" src="https://github.com/user-attachments/assets/dc15a4e3-2279-41a6-8263-c8d138398a34" />


---

## 📂 File System Simulation

<img width="1363" height="720" alt="image" src="https://github.com/user-attachments/assets/1337c2d2-8331-4833-8e48-73f9288974f9" />

and all others you can check in website 


---

## 💽 Disk Blocks Visualization

<img width="1297" height="724" alt="image" src="https://github.com/user-attachments/assets/6584153a-b375-45ce-84d5-d10ce164e24a" />


---

# 📈 Performance Metrics

The simulator calculates and visualizes:

* Waiting Time
* Turnaround Time
* Throughput
* Disk Usage
* Memory Utilization
* Fragmentation
* Page Faults
* Deadlock Statistics
* File Access Statistics

---

# 🎯 How the System Works

## Process Scheduling

Processes are created and linked with files from the File System module.
Scheduling algorithms like FCFS, SJN, Round Robin, and Priority visualize process execution using Gantt Charts.

## Synchronization & Deadlock Management

The created processes are passed into the Synchronization module for shared resource access simulation.
Mutexes and Banker’s Algorithm help detect and prevent unsafe states and deadlocks.

## Memory Management

The same processes are used in the Memory Management module for memory allocation.
Users assign memory sizes, and the simulator demonstrates paging, segmentation, and page replacement algorithms.

## File System

Users first create files and assign sizes using different allocation techniques like Contiguous, Linked, and Indexed Allocation.
The system allocates disk blocks dynamically and tracks fragmentation and disk usage.
Processes access shared files using different allocation techniques while synchronization prevents conflicts and deadlocks.

---

# ▶️ Setup & Installation

## 1 Clone Repository

```bash
git clone https://github.com/AzharMehmood4/os-simulation
```

---

## 2 Move into Project Folder

```bash
cd os-simulation
```

---

## 3 Install Dependencies

```bash
npm install
```

---

## 4 Run Development Server

```bash
npm run dev
```


---

# 🎓 Educational Objectives

This project helps students understand:

* CPU Scheduling
* Synchronization
* Deadlocks
* Memory Allocation
* Paging
* Virtual Memory
* File Allocation
* Fragmentation
* Operating System Integration

through interactive visualization and simulation.

---

# 🔮 Future Improvements

* Multi-user simulation
* Database integration
* Process analytics dashboard
* Authentication system
* Advanced file permissions
* More scheduling algorithms
* Real-time charts and graphs
* Responsive For small Screens

---

# 👨‍💻 Developed By

Azhar Mehmood - 8397

Alyan Asghar - 8651

Moeez Khan - 8774

Salik Bashir - 5620

Software Engineering Students
Abasyn University Islamabad

---

# 📄 License

This project is developed for educational purposes only.

---

#  Acknowledgements

Special thanks to:

* Ms. Naveen Ahmed

for guidance and learning resources throughout Course.

```
```
