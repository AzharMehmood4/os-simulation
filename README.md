# 🖥️ OS Simulation - CPU Scheduling Visualizer

![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.2-skyblue?logo=tailwind-css) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)

A **web-based CPU scheduling simulator** that allows users to **visualize process execution** using different CPU scheduling algorithms interactively. This project demonstrates **First-Come, First-Served (FCFS), Shortest Job Next (SJN/SJF), Round Robin (RR), and Priority Scheduling** with dynamic Gantt charts and metrics display.

---

## 🔥 Features

- **Interactive Process Input:** Add processes with arrival time, burst time, and priority.  
- **Dynamic Gantt Chart:** Visualizes process execution with cumulative start and end times.  
- **Metrics Display:** Shows **waiting time, turnaround time, and completion time** for each process.  
- **Responsive UI:** Built with **React.js** and **Tailwind CSS** for a smooth experience on any device.  
- **Equal-width bars:** All Gantt bars are uniform while still showing cumulative timing for clarity.  

---

## 💻 Tech Stack

- **UI:** React.js + Tailwind CSS  
- **Logic & Algorithms:** JavaScript  

---

## 🗂️ Project Structure

```

os-simulation/
├─ public/
├─ src/
│  ├─ algorithms/
│  │  ├─ fcfs.js
│  │  ├─ priority.js
│  │  ├─ roundRobin.js
│  │  └─ sjn.js
│  ├─ components/
│  │  ├─ AlgorithmSelector.jsx
│  │  ├─ GanttChart.jsx
│  │  ├─ MetricsCard.jsx
│  │  ├─ ProcessForm.jsx
│  │  └─ ResultsTable.jsx
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js

````

---

## ⚡ Screenshots

### Process Input & Algorithm Selection
<img width="1146" height="256" alt="Screenshot from 2026-03-04 23-45-11" src="https://github.com/user-attachments/assets/c875a9e1-e0a1-4291-8e1e-2292955dcbd0" />


### Gantt Chart Visualization
<img width="1146" height="256" alt="Screenshot from 2026-03-04 23-46-18" src="https://github.com/user-attachments/assets/cae5e378-d7ce-4e86-b1b7-5ca2ef8a157b" />


### Metrics Table
<img width="1147" height="342" alt="Screenshot from 2026-03-04 23-46-47" src="https://github.com/user-attachments/assets/245275f7-690d-4ba3-a686-c7f8a1d11ecf" />


---

## 🚀 Setup & Run

Follow these steps to run the project locally:

1. **Clone the repository**  
```bash
git clone  https://github.com/AzharMehmood4/os-simulation
````

2. **Go into the project directory**

```bash
cd os-simulation
```

3. **Install dependencies**

```bash
npm install
```

4. **Run the development server**

```bash
npm run dev
```

5. Open your browser at the URL shown in the terminal (usually `http://localhost:5173`) to see the simulator.

---

## 🎯 Usage

1. Select a **CPU scheduling algorithm** from the Algorithm Selector.
2. Add processes with **arrival time, burst time, and priority**.
3. Click **Run Simulation** to view the **Gantt chart and metrics**.
4. All process bars show **cumulative start and end times** for clarity.

---

## 📝 License

This project is for **educational purposes** only.

---

## 🌟 Acknowledgements

* Thanks to **React.js** and **Tailwind CSS** for making UI development smooth.
* Inspired by **Operating Systems coursework (OS_CS313)** to visualize CPU scheduling algorithms.
