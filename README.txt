start docker

image build:
docker build -t wea-app .

docker run: (nebo přes docker)
docker run -p 3000:3000 wea-app
