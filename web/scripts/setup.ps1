Write-Host "Starting PostgreSQL..."
docker compose -f api/Portfolio.Starter.Api/docker-compose.yml up -d

Write-Host "Restoring API..."
cd api/Portfolio.Starter.Api
dotnet restore

Write-Host "Installing Angular dependencies..."
cd ../../web
npm install

Write-Host "Done."
