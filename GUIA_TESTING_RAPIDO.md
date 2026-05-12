# 🧪 GUÍA DE TESTING RÁPIDO - FRONTEND + BACKEND

**Objetivo:** Verificar que todas las funcionalidades del frontend están conectadas correctamente al backend.

**Tiempo estimado:** 10 minutos

---

## 📋 PRE-REQUISITOS

- [x] Frontend corriendo: `http://localhost:5173`
- [x] Backend/BFF corriendo: `http://localhost:8080`
- [x] Base de datos Insforge conectada
- [x] DevTools abiertos (F12) para ver Network

---

## 🚀 TEST SUITE

### TEST 1: Cargar Portal (2 min)
**Objetivo:** Verificar que el portal carga datos iniciales

#### Pasos:
1. Abre `http://localhost:5173` en el navegador
2. Espera 2-3 segundos

#### Qué deberías ver:
```
✅ Header: "Portal RedNorte"
✅ Tarjeta: "Pacientes registrados: X"
✅ Tarjeta: "Notificaciones pendientes: Y"
✅ Botones de navegación: Pacientes, Lista de Espera, Notificaciones, Optimización
✅ Footer: "2026 RedNorte"
```

#### Si NO funciona:
- Abre DevTools → Network
- Busca petición: `GET /api/portal/resumen`
- Verifica status code (debe ser 200)
- Si error: verifica que el BFF está corriendo en puerto 8080

---

### TEST 2: Crear Paciente (3 min)
**Objetivo:** Crear un paciente nuevo y verificar que se guarda en la BD

#### Pasos:
1. Click en botón "Pacientes"
2. Rellena formulario:
   ```
   Nombre:     Juan
   Apellido:   Pérez
   DNI:        12345678
   Teléfono:   555-0123
   Email:      juan@example.com
   ```
3. Click "Registrar paciente"

#### Qué deberías ver:
```
✅ Alerta VERDE: "Paciente registrado correctamente."
✅ Campos del formulario se limpian
✅ Paciente aparece en lista arriba (nombre completeto: "Juan Pérez")
✅ Muestra DNI y contacto
```

#### DevTools - Network:
```
POST /pacientes
Headers: Content-Type: application/json
Body: {
  "nombre": "Juan",
  "apellido": "Pérez",
  "dni": "12345678",
  "telefono": "555-0123",
  "email": "juan@example.com"
}
Response: 200 OK
```

#### Si NO funciona:
- Verifica que `/pacientes` endpoint responde en BFF
- Revisa logs del BFF por errores de conexión a BD
- Comprueba que estés usando las credenciales correctas de Insforge

---

### TEST 3: Agregar a Lista de Espera (2 min)
**Objetivo:** Transferir paciente a lista de espera

#### Pasos:
1. Desde la lista de pacientes (Pacientes tab)
2. Localiza a "Juan Pérez"
3. Click botón "Agregar a lista"

#### Qué deberías ver:
```
✅ Alerta VERDE: "Paciente 1 agregado a lista de espera."
```

#### Verificación:
1. Click en tab "Lista de Espera"
2. Deberías ver a "Juan Pérez" en la lista
3. Estado por defecto: PENDIENTE (achurita roja)
4. Gravedad por defecto: NORMAL (azul)

---

### TEST 4: Filtrar Lista de Espera (2 min)
**Objetivo:** Verificar que los filtros funcionan

#### Pasos:
1. Desde "Lista de Espera"
2. Cambia filtro "Gravedad" a "ALTA"
3. La lista se vacía o cambia (depende de los datos)

#### Prueba:
- Cambia "Gravedad" a "TODOS"
- La lista se repopula

#### Qué deberías ver:
```
✅ "Mostrando: X de Y" se actualiza
✅ Los badges reflejan el filtro aplicado
```

---

### TEST 5: Cambiar Estado en Lista (2 min)
**Objetivo:** Actualizar el estado de un paciente

#### Pasos:
1. Desde "Lista de Espera"
2. Selecciona el dropdown "Cambiar estado"
3. Elige "ATENDIDO"

#### Qué deberías ver:
```
✅ Alerta VERDE: "Estado actualizado a ATENDIDO"
✅ Badge del paciente cambia de ROJO a VERDE
✅ Estado persiste si recargas la página (F5)
```

---

### TEST 6: Ver Notificaciones (2 min)
**Objetivo:** Listar notificaciones pendientes

#### Pasos:
1. Click en tab "Notificaciones"
2. Espera que cargue la lista

#### Qué deberías ver:
- Si hay notificaciones:
  ```
  ✅ Lista con ID, Paciente ID, Tipo, Estado, Mensaje
  ✅ Botón "Enviar" para cada una
  ✅ Botón "Enviar todas (N)" si hay múltiples
  ```
- Si NO hay:
  ```
  ✅ Mensaje: "No hay notificaciones pendientes en este momento."
  ```

#### Prueba de envío:
1. Si hay notificaciones, click "Enviar todas"
2. Deberías ver:
   ```
   ✅ Alerta VERDE: "Todas las notificaciones se han enviado correctamente."
   ✅ Lista se vacía
   ```

---

### TEST 7: Optimización de Citas (3 min)
**Objetivo:** Simular cancelación con estrategia de reasignación

#### Pasos:
1. Click en tab "Optimización"
2. Ve que hay una lista de pacientes
3. Ingresa un ID de cita válido (ej: 1)
4. Selecciona estrategia: "FIFO (Primera En Llegar)"
5. Click "Procesar Cancelación"

#### Qué deberías ver:
```
✅ Alerta VERDE: "Cita X cancelada y reasignada con estrategia FIFO"
✅ La lista se recarga
```

#### Nota sobre estrategias:
- **FIFO:** Va al que lleva más tiempo esperando
- **LIFO:** Va al que entró más recientemente
- **Por Gravedad:** Va al que tiene más urgencia médica

---

## 🔍 VALIDACIÓN EN DEVTOOLS

### Network Tab
```
Todos estos endpoints deben responder 200:

✅ GET /api/portal/resumen
✅ GET /pacientes
✅ POST /pacientes
✅ POST /lista-espera
✅ GET /lista-espera
✅ PUT /lista-espera/{id}/estado/{estado}
✅ GET /api/notificaciones/pendientes
✅ POST /api/notificaciones/{id}/enviar
✅ GET /optimizacion/lista-espera
✅ POST /optimizacion/cancelar/{id}
```

### Console Tab
```
❌ No debería haber errores (puede haber warnings)
✅ Deberías ver logs normales de React
```

---

## 🆘 TROUBLESHOOTING

### Síntoma: "Network Error" en todas las peticiones
**Causa:** BFF no está corriendo o no escucha en puerto 8080

**Solución:**
```powershell
# Desde E:\codigos\fullstack\Fullstack-III-EFT-Backend

# 1. Cargar variables de entorno
. .\scripts\load-insforge-env.ps1

# 2. Iniciar BFF
cd bff
.\mvnw.cmd spring-boot:run

# 3. Espera a ver:
# "Tomcat started on port 8080"
```

---

### Síntoma: "Connection refused" en BFF
**Causa:** BFF no puede conectar a la base de datos

**Solución:**
```
1. Verifica credenciales en config/local-insforge.env
2. Prueba conexión directamente:
   psql -h avfg5eh3.us-east.database.insforge.app -U postgres -d insforge
3. Ingresa password: 21bff92d6978f5493fa5b29b30ffe84a
4. Si conecta: \dt (lista de tablas) - debe mostrar las migraciones
```

---

### Síntoma: "CORS Error" en navegador
**Causa:** BFF no está configurado para aceptar requests del frontend

**Solución:**
Edita en BFF:
```java
// application.yml
cors:
  allowed-origins: http://localhost:5173, http://localhost:3000
```

---

### Síntoma: Formulario se envía pero No aparece paciente
**Causa:** API respondió OK pero el estado local no se actualiza

**Solución:**
1. Abre DevTools → Network
2. Verifica que POST devolvió el paciente con ID
3. Recarga la página (F5) - ¿aparece el paciente?
4. Si sí: hay un problema con la actualización del estado React
5. Si no: el registro no llegó a la BD

---

## ✅ CHECKLIST FINAL

Marca cada item conforme valides:

- [ ] Portal carga y muestra métricas
- [ ] Puedes crear un paciente nuevo
- [ ] El paciente aparece en la lista
- [ ] Puedes agregarlo a lista de espera
- [ ] Lo ves en la pestaña "Lista de Espera"
- [ ] Puedes cambiar su estado
- [ ] Los filtros funcionan en lista de espera
- [ ] Ves notificaciones (si hay pendientes)
- [ ] Puedes enviar notificaciones
- [ ] Puedes simular cancelación de citas
- [ ] No hay errores en DevTools Console

**Si todo esto ✅**, tu sistema está **100% FUNCIONAL**.

---

## 🎉 ¡LISTO!

Tu frontend está completamente integrado con el backend. Puedes:

1. Crear pacientes
2. Gestionar lista de espera
3. Enviar notificaciones
4. Optimizar asignación de citas

**Documento creado:** 2026-05-12  
**Versión:** 1.0 Final

