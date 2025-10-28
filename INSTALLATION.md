# Installation Handbook

## CDU Jahre Rechner - Complete Setup Guide

This handbook provides comprehensive instructions for installing, configuring, and deploying the CDU Jahre Rechner application.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Quick Start](#quick-start)
3. [Development Environment Setup](#development-environment-setup)
4. [Production Deployment](#production-deployment)
5. [Configuration](#configuration)
6. [Troubleshooting](#troubleshooting)
7. [Maintenance](#maintenance)

---

## System Requirements

### Minimum Requirements

**Hardware**:
- CPU: 2 cores
- RAM: 4GB
- Storage: 10GB free space
- Network: Stable internet connection

**Software**:
- Operating System: Linux (Ubuntu 20.04+), macOS (10.15+), or Windows 10/11
- Node.js: 18.x or higher
- Python: 3.10 or higher
- MongoDB: 4.4 or higher
- Git: 2.x or higher

### Recommended Requirements

**Hardware**:
- CPU: 4+ cores
- RAM: 8GB+
- Storage: 20GB+ SSD
- Network: High-speed internet

**Software**:
- Operating System: Linux (Ubuntu 22.04 LTS)
- Node.js: 20.x LTS
- Python: 3.11+
- MongoDB: 6.x
- Nginx: Latest stable (for production)

---

## Quick Start

### For Development (Existing Emergent Environment)

The application is already set up and running in the Emergent environment:

```bash
# Check frontend status
tail -f /var/log/supervisor/frontend.out.log

# Check backend status  
tail -f /var/log/supervisor/backend.out.log

# Restart services if needed
sudo supervisorctl restart all
```

Access the application:
- Frontend: `https://[your-domain].preview.emergentagent.com`
- Backend API: `https://[your-domain].preview.emergentagent.com/api`

---

## Development Environment Setup

### Step 1: Prerequisites Installation

#### Install Node.js and Yarn

**Ubuntu/Debian**:
```bash
# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

# Verify installation
node --version  # Should be v20.x.x
yarn --version  # Should be 1.22.x or higher
```

**macOS**:
```bash
# Using Homebrew
brew install node
brew install yarn

# Verify installation
node --version
yarn --version
```

**Windows**:
1. Download Node.js installer from https://nodejs.org/
2. Run installer and follow wizard
3. Install Yarn: `npm install -g yarn`
4. Verify in PowerShell/CMD: `node --version` and `yarn --version`

#### Install Python and pip

**Ubuntu/Debian**:
```bash
sudo apt-get update
sudo apt-get install -y python3.11 python3.11-venv python3-pip

# Verify installation
python3 --version  # Should be 3.11.x
pip3 --version
```

**macOS**:
```bash
brew install python@3.11

# Verify installation
python3 --version
pip3 --version
```

**Windows**:
1. Download Python from https://www.python.org/downloads/
2. Run installer (check "Add Python to PATH")
3. Verify in PowerShell: `python --version`

#### Install MongoDB

**Ubuntu/Debian**:
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installation
mongosh --version
```

**macOS**:
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0

# Start MongoDB
brew services start mongodb-community@6.0

# Verify
mongosh --version
```

**Windows**:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run installer and follow wizard
3. Install MongoDB as a Windows Service
4. Verify in PowerShell: `mongosh --version`

### Step 2: Clone Repository

```bash
# Clone the repository (replace with actual repo URL)
git clone <repository-url> cdu-jahre-rechner
cd cdu-jahre-rechner
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
yarn install

# Create environment file
cp .env.example .env

# Edit .env file
nano .env
```

**Frontend `.env` configuration**:
```bash
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Step 4: Backend Setup

```bash
# Navigate to backend directory
cd ../backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# Linux/macOS:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env file
nano .env
```

**Backend `.env` configuration**:
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=cdu_calculator
```

### Step 5: Database Setup

```bash
# Connect to MongoDB
mongosh

# Create database
use cdu_calculator

# Create collections (optional, will be created automatically)
db.createCollection("status_checks")

# Exit mongosh
exit
```

### Step 6: Running the Application

**Terminal 1 - Backend**:
```bash
cd backend
source venv/bin/activate  # Linux/macOS
# or venv\Scripts\activate for Windows

uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 2 - Frontend**:
```bash
cd frontend
yarn start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- API Documentation: http://localhost:8001/docs

---

## Production Deployment

### Option 1: Using Supervisor (Emergent Environment)

The application uses Supervisor for process management:

**Supervisor Configuration** (`/etc/supervisor/conf.d/`):

```ini
[program:frontend]
command=/usr/local/bin/yarn start
directory=/app/frontend
autostart=true
autorestart=true
stderr_logfile=/var/log/supervisor/frontend.err.log
stdout_logfile=/var/log/supervisor/frontend.out.log
environment=HOST="0.0.0.0",PORT="3000"

[program:backend]
command=/usr/bin/python3 -m uvicorn server:app --host 0.0.0.0 --port 8001
directory=/app/backend
autostart=true
autorestart=true
stderr_logfile=/var/log/supervisor/backend.err.log
stdout_logfile=/var/log/supervisor/backend.out.log
```

**Managing Services**:
```bash
# Check status
sudo supervisorctl status

# Start services
sudo supervisorctl start frontend
sudo supervisorctl start backend

# Stop services
sudo supervisorctl stop all

# Restart services
sudo supervisorctl restart all

# Reload configuration
sudo supervisorctl reread
sudo supervisorctl update
```

### Option 2: Using Docker

**Create `Dockerfile` for Frontend**:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
```

**Create `Dockerfile` for Backend**:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

**Create `docker-compose.yml`**:
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://backend:8001
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongo:27017
      - DB_NAME=cdu_calculator
    depends_on:
      - mongo

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

**Deploy with Docker Compose**:
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

### Option 3: Traditional Linux Server

#### Install Nginx

```bash
sudo apt-get install nginx
```

**Nginx Configuration** (`/etc/nginx/sites-available/cdu-rechner`):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8001/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable Site**:
```bash
sudo ln -s /etc/nginx/sites-available/cdu-rechner /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

#### Setup Systemd Services

**Frontend Service** (`/etc/systemd/system/cdu-frontend.service`):
```ini
[Unit]
Description=CDU Jahre Rechner Frontend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/app/frontend
Environment="NODE_ENV=production"
Environment="HOST=0.0.0.0"
Environment="PORT=3000"
ExecStart=/usr/bin/yarn start
Restart=always

[Install]
WantedBy=multi-user.target
```

**Backend Service** (`/etc/systemd/system/cdu-backend.service`):
```ini
[Unit]
Description=CDU Jahre Rechner Backend
After=network.target mongodb.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/app/backend
Environment="MONGO_URL=mongodb://localhost:27017"
Environment="DB_NAME=cdu_calculator"
ExecStart=/usr/bin/python3 -m uvicorn server:app --host 0.0.0.0 --port 8001
Restart=always

[Install]
WantedBy=multi-user.target
```

**Enable and Start Services**:
```bash
sudo systemctl daemon-reload
sudo systemctl enable cdu-frontend cdu-backend
sudo systemctl start cdu-frontend cdu-backend
sudo systemctl status cdu-frontend cdu-backend
```

---

## Configuration

### Environment Variables

#### Frontend (`frontend/.env`)
```bash
# Backend API URL
REACT_APP_BACKEND_URL=https://api.yourdomain.com

# Optional: Enable debugging
REACT_APP_DEBUG=false
```

#### Backend (`backend/.env`)
```bash
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=cdu_calculator

# Optional: Additional settings
LOG_LEVEL=INFO
ENVIRONMENT=production
```

### MongoDB Configuration

**Enable Authentication** (Recommended for production):
```bash
# Connect to MongoDB
mongosh

# Switch to admin database
use admin

# Create admin user
db.createUser({
  user: "admin",
  pwd: "your_secure_password",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})

# Create application user
use cdu_calculator
db.createUser({
  user: "cdu_app",
  pwd: "another_secure_password",
  roles: [ { role: "readWrite", db: "cdu_calculator" } ]
})
```

**Update Connection String**:
```bash
MONGO_URL=mongodb://cdu_app:another_secure_password@localhost:27017/cdu_calculator
```

---

## Troubleshooting

### Common Issues

#### 1. Frontend won't start

**Error**: "Port 3000 already in use"
```bash
# Find process using port 3000
lsof -i :3000
# or
netstat -nlp | grep 3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 yarn start
```

#### 2. Backend connection refused

**Error**: "Connection refused to MongoDB"
```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB if not running
sudo systemctl start mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

#### 3. Module not found errors

**Frontend**:
```bash
cd frontend
rm -rf node_modules yarn.lock
yarn install
```

**Backend**:
```bash
cd backend
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

#### 4. CORS errors

Check backend CORS configuration in `server.py`:
```python
allow_origins=["https://yourdomain.com", "http://localhost:3000"]
```

#### 5. Build failures

**Frontend**:
```bash
# Clear cache
rm -rf node_modules/.cache

# Reinstall
yarn install

# Build
yarn build
```

### Debug Mode

**Frontend Debug**:
```bash
REACT_APP_DEBUG=true yarn start
```

**Backend Debug**:
```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload --log-level debug
```

### Log Files

**Check Logs**:
```bash
# Frontend logs (Supervisor)
tail -f /var/log/supervisor/frontend.out.log
tail -f /var/log/supervisor/frontend.err.log

# Backend logs (Supervisor)
tail -f /var/log/supervisor/backend.out.log
tail -f /var/log/supervisor/backend.err.log

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# MongoDB logs
tail -f /var/log/mongodb/mongod.log
```

---

## Maintenance

### Regular Updates

**Update Frontend Dependencies**:
```bash
cd frontend
yarn upgrade-interactive --latest
yarn audit
yarn audit fix
```

**Update Backend Dependencies**:
```bash
cd backend
source venv/bin/activate
pip list --outdated
pip install --upgrade <package_name>
pip freeze > requirements.txt
```

### Backup Strategy

**MongoDB Backup**:
```bash
# Create backup
mongodump --db cdu_calculator --out /backup/$(date +%Y%m%d)

# Restore backup
mongorestore --db cdu_calculator /backup/20251009/cdu_calculator

# Automated daily backup (cron)
0 2 * * * /usr/bin/mongodump --db cdu_calculator --out /backup/$(date +\%Y\%m\%d) > /var/log/mongodb-backup.log 2>&1
```

### Performance Monitoring

**System Resources**:
```bash
# CPU and Memory
htop

# Disk usage
df -h
du -sh /app/*

# Network
netstat -tulpn
```

**Application Monitoring**:
```bash
# Check process status
sudo supervisorctl status

# Monitor logs in real-time
tail -f /var/log/supervisor/*.log
```

### Deployment Checklist

- [ ] All environment variables configured
- [ ] MongoDB authentication enabled
- [ ] SSL certificates installed and valid
- [ ] CORS properly configured for production
- [ ] Security headers configured in Nginx
- [ ] Firewall rules configured
- [ ] Backup strategy implemented
- [ ] Monitoring and logging configured
- [ ] Services set to auto-start
- [ ] Domain DNS configured
- [ ] Rate limiting configured (if applicable)
- [ ] Error tracking configured

---

## Support and Contact

For installation issues or questions:
- Check the README.md for application documentation
- Review SECURITY.md for security best practices
- Contact: [Add your contact information]

---

**Document Version**: 1.0  
**Last Updated**: October 2025  
**Next Review**: November 2025