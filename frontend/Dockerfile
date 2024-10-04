# 1. Použití oficiálního Node.js obrazu pro sestavení aplikace
FROM node:16 AS build

# 2. Nastavení pracovního adresáře
WORKDIR /app

# 3. Zkopírování souborů package.json a package-lock.json do pracovního adresáře
COPY package*.json ./

# 4. Instalace závislostí
RUN npm install

# 5. Zkopírování zbytku kódu aplikace do pracovního adresáře
COPY . .

# 6. Build aplikace pro produkční prostředí
RUN npm run build

# 7. Použití nginx serveru pro nasazení statických souborů
FROM nginx:alpine

# 8. Zkopírování build výstupu z předchozího kroku do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# 9. Exponování portu 80 pro spuštění aplikace
EXPOSE 80

# 10. Start Nginx serveru
CMD ["nginx", "-g", "daemon off;"]
