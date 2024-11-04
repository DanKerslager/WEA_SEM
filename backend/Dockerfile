# Použití oficiálního Node.js obrazu jako základ
FROM node:21

# Nastavení pracovního adresáře uvnitř kontejneru
WORKDIR /app

# Kopírování package.json a package-lock.json (pokud je) do pracovního adresáře
COPY package*.json ./

# Instalace závislostí
RUN npm install

# Instalace PM2 globálně
RUN npm install -g pm2

# Kopírování zbytku souborů aplikace do pracovního adresáře
COPY . .

# Exponování portu 8002 (kde aplikace poběží)
EXPOSE 8002

# Definování výchozího příkazu pro spuštění aplikace pomocí PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
