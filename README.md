# medconnect — Deployment & Docker Guide

This README documents the full lifecycle for the medconnect frontend project: from local development, to creating a production build, to Dockerizing the app with nginx, pushing the image to Azure Container Registry (ACR), and deploying to Azure App Service (Web App for Containers). It also includes CI/CD notes for GitHub Actions and troubleshooting tips.

Table of contents
- Overview
- Prerequisites
- Project layout (important files)
- Local development
- Production build (Vite)
- Dockerization (Dockerfile + nginx)
- Run locally with Docker
- Push image to Azure Container Registry (ACR)
- Create App Service (Web App for Containers) and deploy image
- CI/CD with GitHub Actions
- Service principal for CI
- Troubleshooting & verification
- Quick checklist

---

## Overview

This project is a Vite + React single-page application. Production flow:

1. Build static files with Vite (`npm run build`) into `dist/`.
2. Package `dist/` into a small nginx Docker image (multi-stage Dockerfile).
3. Push Docker image to Azure Container Registry (ACR).
4. Create an Azure App Service (Web App for Containers) that pulls the image and runs the container.
5. Optionally use GitHub Actions to automate build → push → deploy.

Notes specific to this repo:
- `vite.config.ts` uses `base: '/medconnect/'` so asset URLs and router base are under `/medconnect/`.
- `src/main.tsx` wraps the app with `<BrowserRouter basename="/medconnect">`.
- `nginx.conf` rewrites `/medconnect/*` to the container root so assets are found correctly.

---

## Prerequisites

- Node.js (v16+ recommended) and npm.
- Docker Desktop (Windows/macOS) or Docker Engine on Linux.
- Azure CLI (`az`) installed and `az login` performed for CLI steps.
- An Azure subscription with permission to create resources (Owner/Contributor).
- A GitHub repo for CI (optional).

---

## Project layout (important files)

- `src/` — React app sources.
- `vite.config.ts` — Vite config; `base` should match deployed subpath.
- `index.html` — HTML entry (uses `%BASE_URL%` for favicon in Vite builds).
- `src/main.tsx` — wraps app with BrowserRouter basename.
- `Dockerfile` — multi-stage Dockerfile that builds and serves via nginx.
- `nginx.conf` — nginx config with SPA fallback and `/medconnect` rewrite.
- `.dockerignore` — exclude unnecessary files from Docker context.
- `.github/workflows/azure-container-deploy.yml` — CI scaffold (edit to match secrets).

---

## Local development

Install deps and run dev server:

```powershell
npm install
npm run dev
# open the URL printed by Vite (e.g. http://localhost:5173)
```

Use the dev server for iterative development. The production build is different and created with `npm run build`.

---

## Production build (Vite)

```powershell
npm ci
npm run build
# dist/ will contain the production assets
```

Check `dist/index.html` to confirm asset URLs include the `/medconnect/` base if configured.

---

## Dockerization

Multi-stage `Dockerfile` (already in repo):

```dockerfile
# Stage 1: build
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

`nginx.conf` includes a `location ^~ /medconnect/` block that rewrites the prefix so built assets are served from the container root. It also includes `try_files $uri $uri/ /index.html;` for SPA routing.

---

## Run locally with Docker

Build the image locally:

```powershell
docker build -t medconnect:local .
```

Run it:

```powershell
docker run --rm -p 8080:80 medconnect:local
# then open http://localhost:8080/medconnect/  (or http://localhost:8080/)
```

If you get 404s for assets, inspect the container contents:

```powershell
docker run --rm --entrypoint "" medconnect:local ls -la /usr/share/nginx/html
docker run --rm --entrypoint "" medconnect:local sed -n '1,120p' /usr/share/nginx/html/index.html
```

---

## Push image to Azure Container Registry (ACR)

Two approaches:

- Push local image to ACR (recommended if you already built locally).
- Use `az acr build` (ACR Tasks) to build in Azure — some subscriptions block Tasks.

### Create resource group (if needed)

```powershell
$RG = "medconnect-rg"
$LOCATION = "centralindia"  # pick an allowed region
az group create --name $RG --location $LOCATION
```

Note: If your subscription has allowed-region policies, make sure to use one of the allowed regions.

### Create ACR

```powershell
$ACR = "medconnectacr123"   # must be globally unique
az acr create --resource-group $RG --name $ACR --sku Basic --admin-enabled true --location $LOCATION
```

If you see `MissingSubscriptionRegistration`, run:

```powershell
az provider register --namespace Microsoft.ContainerRegistry
```

### Push local image to ACR

Get login server and credentials:

```powershell
$LOGIN_SERVER = az acr show --name $ACR --query loginServer -o tsv
az acr login --name $ACR
# or retrieve admin creds
$creds = az acr credential show --name $ACR -o json | ConvertFrom-Json
```

Tag and push:

```powershell
docker tag medconnect:local $LOGIN_SERVER/medconnect:latest
docker push $LOGIN_SERVER/medconnect:latest
```

If `az acr build` is allowed in your subscription you can instead run:

```powershell
az acr build --registry $ACR --image medconnect:latest https://github.com/<owner>/<repo>.git#main
```

But if you receive `TasksOperationsNotAllowed`, use the local push or CI (GitHub Actions).

---

## Create App Service (Web App for Containers) and deploy image

### Portal (GUI) steps (easiest)

1. Portal → App Services → + Create
2. Publish: Docker Container; OS: Linux
3. Name: `medconnect-webapp`
4. Region: pick allowed region (same as ACR recommended)
5. App Service plan: create (B1 is fine for testing)
6. Container settings:
   - Image source: Azure Container Registry
   - Registry: select your `medconnectacr123`
   - Image: `medconnect`
   - Tag: `latest`
7. Create and then open the Default host name (https://<appname>.azurewebsites.net)

If necessary, configure credentials under Deployment Center or enable managed identity with `AcrPull` so App Service can pull images securely.

### CLI (PowerShell) example

```powershell
$PLAN = "medconnect-plan"
$WEBAPP = "medconnect-webapp"
$IMAGE = "$LOGIN_SERVER/medconnect:latest"

az appservice plan create --name $PLAN --resource-group $RG --is-linux --sku B1 --location $LOCATION
az webapp create --resource-group $RG --plan $PLAN --name $WEBAPP --deployment-container-image-name $IMAGE

# if needed set registry credentials
$creds = az acr credential show --name $ACR -o json | ConvertFrom-Json
az webapp config container set --name $WEBAPP --resource-group $RG --docker-custom-image-name "$IMAGE" --docker-registry-server-url "https://$LOGIN_SERVER" --docker-registry-server-user $creds.username --docker-registry-server-password $creds.passwords[0].value
az webapp restart --name $WEBAPP --resource-group $RG
az webapp show --name $WEBAPP --resource-group $RG --query defaultHostName -o tsv
```

Open the printed hostname in the browser and test `/medconnect/` if you used a `/medconnect/` base.

---

## CI/CD with GitHub Actions

Summary: Use GitHub Actions to build and push the image to ACR and then trigger App Service deployment.

Example workflow (place in `.github/workflows/ci-acr-deploy.yml`):

```yaml
name: CI Build and Deploy to Azure

on:
  push:
    branches: [ main ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Log in to ACR
        uses: azure/docker-login@v1
        with:
          login-server: ${{ secrets.ACR_LOGIN_SERVER }}
          username: ${{ secrets.ACR_USERNAME }}
          password: ${{ secrets.ACR_PASSWORD }}
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ secrets.ACR_LOGIN_SERVER }}/medconnect:latest

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      - name: Deploy to Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ secrets.AZURE_WEBAPP_NAME }}
          images: ${{ secrets.ACR_LOGIN_SERVER }}/medconnect:latest
```

Secrets to set in GitHub repo:
- `ACR_LOGIN_SERVER` (e.g. medconnectacr123.azurecr.io)
- `ACR_USERNAME` / `ACR_PASSWORD` (admin user or service principal creds)
- `AZURE_CREDENTIALS` (service principal JSON for `azure/login`)
- `AZURE_WEBAPP_NAME`

---

## Service principal for CI (recommended)

Create a service principal with `AcrPush` on the ACR resource (PowerShell):

```powershell
$SUB = az account show --query id -o tsv
$ACR_RESOURCE_ID = az acr show --name $ACR --resource-group $RG --query id -o tsv
az ad sp create-for-rbac --name "sp-medconnect-ci" --role AcrPush --scopes $ACR_RESOURCE_ID -o json
```

Store the returned `appId` (client id), `password` (client secret), and `tenant` in GitHub Secrets and/or construct an `AZURE_CREDENTIALS` JSON blob for the `azure/login` action.

---

## Troubleshooting & verification

- Tail logs:
  ```powershell
  az webapp log tail --name $WEBAPP --resource-group $RG
  ```
- If image pull fails: check App Service → Deployment Center → logs; verify ACR credentials or managed identity permissions.
- If assets 404: check nginx `try_files` and the `location ^~ /medconnect/` rewrite; inspect `/usr/share/nginx/html` in the running container.
- If ACR Tasks are blocked (`TasksOperationsNotAllowed`), push from local Docker or use GitHub Actions instead.

---

## Quick checklist

- [ ] Confirm allowed region for deployment.
- [ ] Create or reuse resource group.
- [x] Create ACR and push image (done).
- [ ] Create App Service and configure container.
- [ ] Test URL and fix any asset/routing issues.
- [ ] Set up GitHub Actions and service principal for automated deployments.

---

If you want, I can also:
- add this `README.md` to the repo (I just added it) and commit; then attempt to push the commit to `origin/main` from this environment. If the push fails due to credentials, I'll show the exact commands for you to run locally with your auth.
- generate the exact GitHub Actions workflow file and add it to `.github/workflows`.

Contact / notes: adapt region/resource names as needed. Good luck and ping me if you want me to run the App Service creation CLI commands for you.
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/63c970d7-e9d7-4896-a43f-29a7c5ea37d9

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/63c970d7-e9d7-4896-a43f-29a7c5ea37d9) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/63c970d7-e9d7-4896-a43f-29a7c5ea37d9) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
