# 100xengineer
An experimental repo that gives an agent access to compute and coding resources

Tech Stack
 - React frontend
 - Express Backend
 - LangchainJS agent library
 - gpt-3.5 as the model to start with
 - k8s for giving agent resources



# Agent Application


This is an experimental repository that gives an agent access to compute and coding resources. The current setup includes:

- A React frontend for interacting with the agent
- An Express backend integrated with the LangchainJS library
- Implementation of agent logic using the GPT-3.5 model
- Containerization of the frontend and backend using Docker

## Getting Started

### Prerequisites

- Node.js
- npm 
- Docker
- - Minikube (or a Kubernetes cluster)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/agent-application.git


# Install dependencies for the frontend and backend 

cd agent-application
npm install --prefix agent-frontend
npm install --prefix agent-backend

# With Docker Compose

docker build -t agent-frontend -f Dockerfile .
docker build -t agent-backend -f Dockerfile.backend .


# With Kubernetes
Start a Kubernetes cluster 
- minikube start


