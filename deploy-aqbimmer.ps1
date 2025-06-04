# Step 1: Initialize Git and push to GitHub
git init
git add .
git commit -m "Initial commit - AQbimmer Vite React project"
git branch -M main
git remote add origin https://github.com/cctv-security/AQbimmer.git
git push -u origin main

# Step 2: Install gh-pages
npm install --save-dev gh-pages

# Step 3: Overwrite vite.config.js with base config
@"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/AQbimmer/',
  plugins: [react()],
})
"@ | Out-File -Encoding utf8 vite.config.js

# Step 4: Modify package.json - inject homepage and deploy scripts
$json = Get-Content package.json | Out-String | ConvertFrom-Json
$json.homepage = "https://cctv-security.github.io/AQbimmer"
$json.scripts.predeploy = "npm run build"
$json.scripts.deploy = "gh-pages -d dist"
$json | ConvertTo-Json -Depth 10 | Set-Content -Encoding utf8 package.json

# Step 5: Build and deploy
npm run deploy

Write-Host "`n✅ Deployment complete! Visit: https://cctv-security.github.io/AQbimmer" -ForegroundColor Green