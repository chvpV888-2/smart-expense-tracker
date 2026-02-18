# ✨ Smart Expense Tracker Pro

A modern, full-stack expense management dashboard built with **Spring Boot 3**, **Java 21**, and **Chart.js**. This application provides a clean, "eye-soothing" interface for tracking daily spending with persistent local storage.

## 🚀 Live Demo
[View Live Project on Render](https://smart-expense-tracker-8q2u.onrender.com/) 
*(Note: Initial load may take 30-60 seconds on free tier as the server spins up.)*

## 🛠️ Tech Stack
* **Backend:** Java 21, Spring Boot 4.0.2, Spring Data JPA.
* **Database:** H2 Database (File-based for persistence).
* **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3 (Custom Gradients).
* **UI Framework:** Bootstrap 5.
* **Data Visualization:** Chart.js (Doughnut Charts).
* **Deployment:** Docker, Render.

## 🌟 Key Features
* **Real-time Dashboard:** Instant updates for Total Expenses, Top Spending Category, and total entries.
* **Data Visualization:** Interactive doughnut chart that categorizes expenses (Food, Rent, Transport, etc.) automatically.
* **Persistence:** Uses a file-based H2 database to ensure your data stays saved even after the application restarts.
* **Responsive Design:** Fully mobile-friendly UI using Bootstrap 5 and custom CSS gradients.
* **RESTful API:** Clean separation of concerns between the Java backend and JavaScript frontend.

## 📸 Screenshots


## ⚙️ Local Setup

### Prerequisites
* **Java 21** or higher.
* **Maven 3.6+**.

### Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/chvpV888-2/smart-expense-tracker.git](https://github.com/chvpV888-2/smart-expense-tracker.git)
    cd smart-expense-tracker
    ```

2.  **Build the project:**
    ```bash
    ./mvnw clean package -DskipTests
    ```

3.  **Run the application:**
    ```bash
    java -jar target/app.jar
    ```

4.  **Access the Dashboard:**
    Open [http://localhost:8080](http://localhost:8080) in your browser.

## 🐳 Docker Deployment
This project includes a `Dockerfile` for easy deployment to cloud platforms like Render or AWS:
```dockerfile
# Build and run using Docker
docker build -t expense-tracker .
docker run -p 8080:8080 expense-tracker

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

Developed with ❤️ by Chavi Bhatia
