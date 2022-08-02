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

## Dependencias Usadas

* "@joi/date": "^2.1.0"
* "bcrypt": "^5.0.1"
* "cors": "^2.8.5"
* "express": "^4.18.1"
* "joi": "^17.6.0"
* "jsonwebtoken": "^8.5.1"
* "mongoose": "^6.5.0"
* "morgan": "^1.10.0"
* "dotenv": "^16.0.1"
* "nodemon": "^2.0.19"

## Author

![Jerson Ramírez Ortiz](https://scontent.flim9-1.fna.fbcdn.net/v/t39.30808-1/245151237_4337621846352898_8251633534375566001_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=d0ToMaZGS0AAX-6kjwh&_nc_oc=AQmFYHfnx-I0slu2cPmDvu2GF-z8ar90k_S_ZNeuArqwUoQy_iQ0ROoxbKNDEEMFa7k&_nc_ht=scontent.flim9-1.fna&oh=00_AT8SZENEhFu8GvCzrfARKD7Climb40EFBOISyzRU1Oum_g&oe=62EE7B0B)

[Jerson Ramírez Ortiz](https://www.facebook.com/jersonomar.ramirezortiz/)

