# Katalog Knih

Tento projekt je jednoduchá aplikace pro správu knihového katalogu. Umožňuje přidávat, upravovat a prohlížet knihy prostřednictvím REST API.

## Obsah

- [Technologie](#technologie)
- [Spuštění Dockeru](#spuštění-dockeru)
- [Port](#port)


## Technologie
- Docker
- Docker Compose

### Backend
- Node.js
- Express

### Databáze
- MongoDB
- Mongoose

### Frontend
- React

## Spuštění Dockeru

1. Ujistěte se, že máte nainstalovaný a spuštěný Docker a Docker Compose.
2. Pokud není vytvořen network:

   ```bash
   docker network create cdb-network

3. V kořenovém adresáři projektu spusťte následující příkaz pro sestavení a spuštění kontejnerů:

   ```bash
   docker-compose up --build

## Port pro příjem dat knih

   Adresa portu: http://localhost:8002/data
   
   ### Ukázkový request (upraven pro windows): 

   curl -X POST http://localhost:8002/data -H "Content-Type: application/json" -d "[{\"isbn13\": \"9780131103627\", \"isbn10\": \"0131103628\", \"title\": \"The C Programming Language\"}]"
   
   ### Ukázkový request ze složky (bash musí být ve složce s books.json):    
   
   curl -X POST http://localhost:8002/data -H "Content-Type: application/json" --data-binary @books.json