# Použití oficiálního Node.js obrazu jako základ
FROM node:14

# Nastavení pracovního adresáře uvnitř kontejneru
WORKDIR /app

# Kopírování package.json a package-lock.json (pokud je) do pracovního adresáře
COPY package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku souborů aplikace do pracovního adresáře
COPY . .

# Exponování portu 3000 (kde aplikace poběží)
EXPOSE 3000

# Definování výchozího příkazu pro spuštění aplikace
CMD ["npm", "start"]
