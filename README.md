## Useful commands
### Access Mongosh
docker exec -it vaitoverse-backend-mongo-1 mongosh --username admin --password password --authenticationDatabase vaitoversedb
### Mongosh command
use vaitoversedb
db.events.insertOne({identifier: '1'})
db.events.updateOne({identifier: '2'}, { $pull: { subscribers: { nome: 'Vito2'}}})

## Information about the container
### Volumes
/usr/share/nginx/html/browser/assets/chapters/
/usr/share/nginx/html/browser/assets/images/

## Deploy instructions

* docker build . -t myriad-backend:1.0.0
* docker save myriad-backend:1.0.0 -o myriad_backend_image_1.0.0.tar.gz
* scp myriad_backend_image_1.0.0.tar.gz vdalena@vps-46a26e64.vps.ovh.net:/home/vdalena/