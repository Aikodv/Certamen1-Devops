# Instrucciones de Despliegue - Certamen 1

Este documento contiene los comandos exactos para construir y desplegar cada uno de los 3 ejercicios del certamen por separado.

---

## Ejercicio 1: API Node.js (Código inmutable)
**Requisitos cumplidos:** Código inmutable, expuesto en puerto 8087, imagen nombrada `cert1:1.0`.

1. Posicionarse en el directorio del ejercicio:
   ```bash
   cd /home/usm/Certamen1/Ejercicio1
   ```
2. Construir la imagen de Docker:
   ```bash
   docker build -t cert1:1.0 .
   ```
3. Levantar el contenedor:
   ```bash
   docker run -d -p 8087:8080 --name cert1_container cert1:1.0
   ```
*Para probar:* `curl http://localhost:8087/verSolicitudes`

---

## Ejercicio 2: API Spring Boot (Volumen Bind Mount)
**Requisitos cumplidos:** Ejecución a partir del fuente (inyectado), expuesto en puerto 9090, uso de bind mount y paso de variables de entorno.

1. Posicionarse en el directorio del ejercicio:
   ```bash
   cd /home/usm/Certamen1/Ejercicio2
   ```
2. Construir la imagen base de Java:
   ```bash
   docker build -t app_ej2:1.0 .
   ```
3. Levantar el contenedor inyectando el artefacto compilado (`.jar`):
   ```bash
   docker run -d -p 9090:9090 --name contenedor_ej2 -v "$(pwd)/target/ej2_certamen1_2026-1.0.0.jar:/app/app.jar" -e SERVER_PORT=9090 app_ej2:1.0
   ```
*Para probar:* Abre tu navegador en `http://localhost:9090` (verifica la ruta exacta en tu `Controller`).

---

## Ejercicio 3: Node.js + MongoDB (Docker Compose)
**Requisitos cumplidos:** Código inmutable, puertos 9090 y 9093, política unless-stopped, contenedores de base de datos con volúmenes.

1. Posicionarse en el directorio del ejercicio:
   ```bash
   cd /home/usm/Certamen1/Ejercicio3
   ```
2. Construir y levantar toda la orquestación (API + Base de Datos):
   ```bash
   docker compose up -d --build
   ```
*Para probar:* `curl http://localhost:9090/students` o `curl http://localhost:9093/students`