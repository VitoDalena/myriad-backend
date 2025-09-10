docker exec -it vaitoverse-backend-mongo-1 mongosh --username admin --password password --authenticationDatabase vaitoversedb


use vaitoversedb
db.Event.insertOne({identifier: '1'})

volumes:
/usr/share/nginx/html/browser/assets/chapters/
/usr/share/nginx/html/browser/assets/images/