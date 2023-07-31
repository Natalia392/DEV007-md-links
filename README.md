# Markdown Links
<img src="https://github.com/Natalia392/DEV007-md-links/blob/main/imgsreadme/fotoReadme.png?raw=true" alter="backlog5" width="700">

***
## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Diagrama de Flujo](#2-diagrama-de-flujo)
* [3. Documentación técnica](#3-documentación-técnica)
* [4. Guía de uso](#4-guía-de-uso)
* [5. Backlog producto](#5-backlog-producto)
* [6. Tecnologías utilizadas](#6-tecnologías-utilizadas)

***
## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. 

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Este proyecto nace dentro de la propuesta dentro de una comunidad de código 
abierto de crear una herramienta de línea de comando (CLI)
usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan yreportar
estadísticas respecto de estos links.

## 2. Diagrama de Flujo

Para desarrollar esta aplicación, se creó un diagrama de flujo que sirviera
como guía del proceso de la función:

[Diagrama de flujo](https://github.com/Natalia392/DEV007-md-links/blob/main/imgsreadme/Diagrama-flujo-mdlinks-nati-FINAL.drawio.png?raw=true)

<img src="https://github.com/Natalia392/DEV007-md-links/blob/main/imgsreadme/Diagrama-flujo-mdlinks-nati-FINAL.drawio.png?raw=true" alter="diagrama" width="700">

## 3. Documentación técnica

Para instalar la librería en su computador, ingrese el siguiente comando en su terminal:

`npm i nati-md-links`

Tras ejectutar este comando, se instalará el programa y se podrá
llamar con el siguiente comando:

`npx mdl`

La herramienta ejecuta la función mdLinks, que recibe una ruta y puede
recibir también algunas opciones.

A continuación se explica cómo ejecutar con opciones:

#### `mdLinks(path, options)`

##### Argumentos

Los argumentos que recibe la función son dos:

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, debe resolverse como relativa al directorio
desde donde se invoca node - _current working directory_).
* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función retorna una promesa (`Promise`) que **se resueve en un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

Dependiendo de qué opciones se pasen en el segundo argumento, entregará 
estos distintos detalles. Esto se puede ver en más profundidad en la guía de uso
a continuación.

## 3. Guía de uso

La aplicación se ejectua de la siguiente manera a través de la **terminal**:

`mdL <path-to-file> [options]`

Siguiendo el paso de instalación indicado más arriba 
esto puede resolverse en los siguientes 4 modos de ejecución:

### 1. Sin indicar options

Este es el comportamiento por defecto, sin opciones.
Se usa ejecutando el siguiente comando:

`npx mdl`

Este no valida si las URLs responden ok o no, solo identifica el archivo markdown
(a partir de la ruta que recibe como argumento), analiza el archivo Markdown
e imprime los links que encuentra, junto con la ruta del archivo donde aparece
y el texto que hay dentro del link (truncado a 50 caracteres).

Aquí un ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

### 2. Pasando la opción `--validate`

Esto se haría ejecutando el siguiente comando:

`npx mdl --validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

El _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

### 3. Pasando la opción `--stats`

Esto se hace ejecutando el comando:

`npx mdl --stats`

En este caso el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

### 4. Pasando tanto la opción `--validate` como la opción `--stats`

Eso se haría ejecutando el comando:

`npx mdl --stats --validate` o bien `npx mdl --validate --stats`

Esto permite obtener las estadísticas de los links que funcionan
y los links que están rotos, además del total de links y links únicos.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
working: 2
```

Aquí, el orden de los comandos no cambia el resultado,
es decir, puede indicarse primero --validate y luego --stats y viceversa.

## 4. Backlog producto

A continuación se presentan las tareas asignadas para completar el proyecto:

<img src="https://github.com/Natalia392/DEV007-md-links/blob/main/imgsreadme/captura-board1.png?raw=true" alter="backlog1" width="900">
<img src="https://github.com/Natalia392/DEV007-md-links/blob/main/imgsreadme/captura-board2.png?raw=true" alter="backlog2" width="900">
<img src="https://github.com/Natalia392/DEV007-md-links/blob/main/imgsreadme/captura-board3.png?raw=true" alter="backlog3" width="900">
<img src="https://github.com/Natalia392/DEV007-md-links/blob/main/imgsreadme/captura-board4.png?raw=true" alter="backlog4" width="900">
<img src="https://github.com/Natalia392/DEV007-md-links/blob/main/imgsreadme/captura-board5.png?raw=true" alter="backlog5" width="900">


## 5. Tecnologías utilizadas

Javascript
- Manejo de arrays
- Manejo de objetos
- Condicionales
- Funciones
- Promesas
- Recursividad
- Callbacks

Node.js
- Configuració package.json
- Módulo process
- Fie System (fs, path)
- Instalar y usar módulos con npm

Axios
- get para consulta HTTP

Jest 
- Pruebas unitarias
- Mocks

Git
- Control de versiones (init, clone, add, commit, status, push, pull)
- Integración de cambios en ramas (branch, checkout, merge)

GitHub
- (branches | forks | pull requests)
- Organización en gitHub (projects | issues | labels | milestones)

Eslint

Npm para la publicación del proyecto

Visual Studio Code

Chalk

Babel
