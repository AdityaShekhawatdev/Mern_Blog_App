# MERN Blog App — Kubernetes Deployment

I built this blog app with the MERN stack and deployed it on Kubernetes using Helm. 
The goal was to learn how real DevOps pipelines work — from writing code to 
running it in a container orchestration system.

---

## What's Inside

- **Frontend** — React + Vite, served via Nginx
- **Backend** — Node.js + Express REST API
- **Database** — MongoDB
- **Containerization** — Docker + Docker Compose
- **Orchestration** — Kubernetes (Minikube for local)
- **Deployment** — Helm charts
- **CI/CD** — GitHub Actions

---

## Why I Built This

I wanted to go beyond just deploying on EC2. I wanted to understand how 
teams actually ship applications in production — with proper container 
orchestration, health checks, and zero downtime deployments.

This project taught me a lot about debugging real Kubernetes errors, 
writing Helm charts from scratch, and understanding how services 
communicate inside a cluster.

---

## Project Structure
mern-blog/
├── frontend/                 # React app + Nginx config
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
├── backend/                  # Express API
│   ├── Dockerfile
│   └── src/
└── mern-blog-app/            # Helm Chart
├── Chart.yaml
├── values.yaml
└── templates/
├── mongodb-deployment.yaml
├── mongodb-service.yaml
├── backend-deployment.yaml
├── backend-service.yaml
├── frontend-deployment.yaml
└── frontend-service.yaml

---

## Running Locally with Docker Compose

If you just want to run the app quickly:

```bash
docker-compose up -d
```

That's it. App will be running on `http://localhost:3000`

---

## Deploying on Kubernetes with Helm

This is the more interesting part. Here's how to run it on Kubernetes:

**1. Start Minikube**
```bash
minikube start --driver=docker
```

**2. Deploy everything with one command**
```bash
helm install mern-blog-app ./mern-blog-app
```

**3. Check if everything is running**
```bash
kubectl get pods
```

You should see 3 pods running — MongoDB, backend, and frontend.

**4. Open the app**
```bash
kubectl port-forward service/frontend-service 8080:80
```

Then open `http://localhost:8080` in your browser.

---

## Helm Chart

Instead of managing 6 separate YAML files, everything is controlled 
from one `values.yaml` file. Want to scale the backend to 3 replicas? 
Just change one line:

```yaml
backend:
  replicaCount: 3
```

Then run:
```bash
helm upgrade mern-blog-app ./mern-blog-app
```

Done. No need to touch individual YAML files.

---

## How the App is Structured Inside Kubernetes
Browser
↓
Nginx (port 80)
↓
React Frontend Pod
↓
Node.js Backend Pod (port 5001)
↓
MongoDB Pod (port 27017)

Services handle all the internal communication between pods. 
Frontend talks to backend via `backend-service`, 
backend talks to MongoDB via `mongodb-service`.

---

## CI/CD Pipeline

Every push to main branch triggers a GitHub Actions workflow:
Push code to GitHub
↓
Build Docker images
↓
Push images to DockerHub
↓
Deploy updated pods to Kubernetes

---

## Errors I Hit and Fixed

Honestly this project involved a lot of debugging. Some issues I ran into:

- **Nginx couldn't find backend** — was using Docker Compose service 
  name instead of Kubernetes service name
- **MongoDB connection failing** — environment variable name mismatch 
  between Helm template and backend code
- **Frontend pod crashing** — wrong port defined in values.yaml, 
  Nginx runs on 80 not 3000

Each error taught me something new about how Kubernetes works internally.

---

## What I Learned

- How to write Helm charts the industry standard way
- How Kubernetes DNS works for service discovery
- How to debug pods using kubectl logs and describe
- How Nginx acts as a reverse proxy inside a container
- How environment variables flow from Helm to pods

---

## Author

**Aditya Shekhawat**
DevOps Trainee @ GRRAS Solutions

- GitHub: [@AdityaShekhawatdev](https://github.com/AdityaShekhawatdev)
- LinkedIn: (www.linkedin.com/in/aditya-shekhawat-9085ab392)
