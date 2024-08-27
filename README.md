<p style="text-align: center"><img src="https://conexa.ai/meta-logo.jpg"></p>

<h1 style="text-align: center">Test Ssr Backend Nest - Conexa </h1>

<p style="text-align: center"><img src="https://img.shields.io/badge/%20-20.17.0-%20?style=flat&logo=nodedotjs&logoColor=%235FA04E&color=%23000000">   <img src="https://img.shields.io/badge/%20-10.8.1-%20?style=flat&logo=npm&logoColor=%23E0234E&color=%23000000">   <img src="https://img.shields.io/badge/%20-20.17.0-%20?style=flat&logo=typescript&logoColor=%23007acc&color=%23000000">   <img src="https://img.shields.io/badge/%20-10.4.4-%20?style=flat&logo=nestjs&logoColor=%23E0234E&color=%23000000"></p>

## Autor

- [@MalenAlmendra](https://github.com/MalenAlmendra)

## Antes de comenzar

Para que el proyecto pueda funcionar correctamente, es necesario generar un archivo .env con las siguientes variables:

```bash
#PARAMS
PORT=8080
JWT_SECRET=429ac544998a1d6f42b50b487845cfdb
SWAGGER_PATH=/docs
HTTP_TIMEOUT=5000
HTTP_MAX_REDIRECTS=5

#DATABASE
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=moviesdb

#SERVICES
SW_API_URL=https://swapi.dev/api/

```

Las variables de base de datos deben ser configuradas de acuerdo con las configuraciones locales que se tengan (usuario, password, port, etc).
Además, se debe crear previamente la base de datos con el nombre establecido (por defecto es moviesdb).

## Instalación del proyecto

Para instalar las dependencias del proyecto, utilice npm y el siguiente comando:

```bash
  npm install
```

Recuerde fijarse en las versiones utilizadas para poder levantar bien el proyecto.

## Ejecución del proyecto

Para la ejecución, solo debe utilizar el siguiente comando:

```bash
  npm run start:dev
```

## Ejecución de tests unitarios

Para utilizar los test unitarios, puede introducir cualquiera de los siguientes comandos:

```bash
  npm run test:watch
```

## Ruta para swagger

La ruta es, al igual que otras variables, tambien es configurable desde las propiedades, pero por defecto tiene la ruta "/docs". Ejecutada localmente se veria como "http://localhost:8080/docs"