# SearchPet (BACKEND)

Backend de la aplicación SearchPet usando express con mongoDB, con sistema de autenticación.

Poco a poco se irá agregando más puntos finales.

## Puntos finales - URI

Hasta el momento se desarrolló los siguientes puntos finales, 
la documentación la iré mejorando de a poco, lo pueden ver en el siguiente enlace [documentación](https://documenter.getpostman.com/view/11171580/Uze4viTq)

### /api/v1/users
    GET, POST, PUT, DELETE, PATCH

### /api/v1/departaments
    GET, POST, PUT, DELETE, PATCH

### /api/v1/provinces
    GET, POST, PUT, DELETE, PATCH

### /api/v1/districts
    GET, POST, PUT, DELETE, PATCH

### /api/auth/login
    POST

### /api/v1/pets
    GET, POST, PUT, DELETE, PATCH

## Dependencias Usadas

* "@joi/date": "^2.1.0",
* "bcrypt": "^5.0.1",
* "cloudinary": "^1.31.0",
* "cors": "^2.8.5",
* "express": "^4.18.1",
* "express-fileupload": "^1.4.0",
* "fs-extra": "^10.1.0",
* "joi": "^17.6.0",
* "jsonwebtoken": "^8.5.1",
* "mongoose": "^6.5.0",
* "morgan": "^1.10.0"

## Author

![Jerson Ramírez Ortiz](https://avatars.githubusercontent.com/u/43390194?v=4)

[Jerson Ramírez Ortiz](https://www.facebook.com/jersonomar.ramirezortiz/)

