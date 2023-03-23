# SearchPet (BACKEND)

Backend de la aplicación SearchPet usando express con mongoDB, con sistema de autenticación normal, google, facebook.

Poco a poco se irá agregando más puntos finales.

## Puntos finales - URI

Hasta el momento se desarrolló los siguientes puntos finales, la documentación la iré mejorando de a poco, lo pueden ver en el siguiente enlace [documentación](https://documenter.getpostman.com/view/11171580/Uze4viTq)

## Lo nuevo

* Chat en tiempo real, se pueden enviar mensajes de texto e imágenes, falta en adaptarlo 100% a móvil y arreglar algunas cosas.

### /api/v1/users

    GET, POST, DELETE
    
    /:idUser
    
      GET, PUT, PATCH, DELETE

    /:idUser/pets

      GET
    
    /:idUser/activities

      GET

### /api/v1/departaments

    GET, POST, DELETE
    
    /:idDepartament
    
      GET, PUT, PATCH, DELETE

### /api/v1/provinces

    GET, POST
    
    /:idProvince
    
      GET, PUT, PATCH, DELETE

### /api/v1/districts

    GET, POST, DELETE

    /:idDistrict

      GET, PUT, PATCH, DELETE

### /api/v1/auth/login

    POST
    
    /token

      GET, POST

### /api/v1/auth/google

    POST

### /api/v1/auth/facebook

    POST    

### /api/v1/pets

    GET, POST, DELETE

    /:idPet

      GET, PUT, PATCH, DELETE

    /:idPet/upload-profile

      PATCH

    /:idPet/images

      POST, DELETE

### /api/v1/typePets

    GET, POST, DELETE

    /:idTypePet

      GET, PUT, DELETE, PATCH

### /api/v1/breeds

    GET, POST, DELETE

    /:idBreed

      GET, PUT, DELETE, PATCH

### /api/v1/lostpet

    GET, POST

    /:idLostPet
    
      GET, DELETE 

    /:idLostPet/comments

      POST, GET

### /api/v1/lostpetcomments

    GET, POST
    
    /:idLostPetComment
    
    DELETE

### /api/v1/notifications

    GET, POST

## /api/v1/chats

    GET, POST

## /api/v1/chats/:idChat/messages

    GET

## /api/v1/messages

    POST

## Dependencias Usadas

* "@joi/date": "^2.1.0",
* "bcrypt": "^5.0.1",
* "cloudinary": "^1.31.0",
* "cors": "^2.8.5",
* "express": "^4.18.1",
* "express-fileupload": "^1.4.0",
* "fs-extra": "^10.1.0",
* "joi": "^17.6.0",
* "google-auth-library": "^8.6.0",
* "jsonwebtoken": "^8.5.1",
* "mongoose": "^6.5.0",
* "morgan": "^1.10.0"
* "nodemailer": "^6.8.0",
* "socket.io": "^4.6.0",
* "uuid": "^9.0.0"

### Dependencias de desarrollo

* "dotenv": "^16.0.1",
* "nodemon": "^2.0.19"

## Author

![Jerson Ramírez Ortiz](https://avatars.githubusercontent.com/u/43390194?v=4)

[Jerson Ramírez Ortiz](https://www.facebook.com/jersonomar.ramirezortiz/)

