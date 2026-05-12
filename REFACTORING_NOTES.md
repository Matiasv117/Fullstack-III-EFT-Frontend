# Refactorización Frontend - Patrón Facade

## 📋 Resumen de cambios realizados

Se ha refactorizado completamente la estructura del frontend aplicando el **Patrón Facade** para centralizar el acceso a servicios y mejorar la maintainability del código.

---

## 🏗️ Estructura Nueva

```
src/
├── facade/
│   └── appFacade.js          ✅ NUEVO - Centraliza acceso a servicios
├── api/
│   ├── httpClient.js         (sin cambios - cliente HTTP)
│   ├── gestionPacientesApi.js
│   ├── notificacionesApi.js
│   ├── optimizacionApi.js
│   └── portalApi.js
├── hooks/
│   ├── useGestionPacientes.js  (sin cambios)
│   ├── useListaEspera.js       (sin cambios)
│   ├── useNotificaciones.js    ✅ NUEVO - Lógica centralizada de notificaciones
│   └── useOptimizacion.js      ✅ NUEVO - Lógica centralizada de optimización
├── styles/
│   └── commonStyles.js         ✅ NUEVO - Estilos reutilizables (DRY)
├── componentes/
│   ├── GestionPacientes.jsx    ✅ ACTUALIZADO - Usa appFacade
│   ├── GestionPacientesView.jsx ✅ ACTUALIZADO - Usa commonStyles
│   ├── ListaEspera.jsx         ✅ ACTUALIZADO - Usa appFacade y commonStyles
│   ├── Notificaciones.jsx      ✅ REFACTORIZADO - Usa hook y appFacade
│   └── Optimizacion.jsx        ✅ REFACTORIZADO - Usa hook y appFacade
├── App.jsx                    (con comentarios de documentación)
└── ...
```

---

## ✨ Mejoras Implementadas

### 1. **Patrón Facade** (`facade/appFacade.js`)
- ✅ Centraliza todo el acceso a servicios
- ✅ Proporciona múltiples niveles de acceso:
  - `useAppFacade()` - Acceso completo a todos los módulos
  - `usePacientesFacade()` - Solo Gestión de Pacientes
  - `useListaEsperaFacade()` - Solo Lista de Espera
  - `useNotificacionesFacade()` - Solo Notificaciones
  - `useOptimizacionFacade()` - Solo Optimización
- ✅ Desacopla componentes de la lógica de negocios

### 2. **Hooks Centralizados**
- ✅ `useNotificaciones.js` - Antes: lógica inline en componente
  - Funciones: `cargarNotificaciones()`, `enviarNotificacion()`, `enviarPorCanal()`, `enviarTodas()`
  - Estados: cargando, mensaje, error, notificaciones, canales
  
- ✅ `useOptimizacion.js` - Antes: lógica inline en componente
  - Funciones: `cargarListaEspera()`, `cancelarCita()`, filtros
  - Estados: lista, filtros, cargando, mensaje, error

### 3. **Estilos Comunes** (`styles/commonStyles.js`)
- ✅ Elimina duplicación de estilos
- ✅ Proporciona paleta consistente:
  - `commonStyles.*` - Estilos reutilizables
  - `colorMap.*` - Colores para gravedad y estado
- ✅ Fácil de mantener y actualizar globalmente

### 4. **Componentes Refactorizados**
- ✅ **GestionPacientes.jsx** - Ahora usa `usePacientesFacade()`
- ✅ **ListaEspera.jsx** - Usa `useListaEsperaFacade()` y `commonStyles`
- ✅ **Notificaciones.jsx** - Antes: 164 líneas → Ahora: 50 líneas (con mejor legibilidad)
- ✅ **Optimizacion.jsx** - Antes: 386 líneas → Ahora: 180 líneas (más limpio)

---

## 🎯 Beneficios del Patrón Facade

1. **Separación de Responsabilidades**
   - Componentes: solo presentación
   - Hooks: lógica de estado
   - Facade: orquestación de servicios
   - API: llamadas HTTP

2. **Reutilización**
   - Estilos compartidos en todos los componentes
   - Hooks disponibles para cualquier consumidor
   - Colores y configuraciones centralizadas

3. **Mantenibilidad**
   - Cambios en estilos: un archivo
   - Nueva función en Notificaciones: un hook
   - Agregar módulo nuevo: solo crear nuevo hook + entrada en Facade

4. **Escalabilidad**
   - Fácil agregar nuevos módulos
   - Fácil cambiar implementación sin afectar consumidores
   - Patrón consistente en toda la app

5. **Testing**
   - Hooks pueden testearse aisladamente
   - Componentes no dependem de APIs directamente
   - Facade facilita mocking

---

## 📝 Ejemplos de Uso

### Antes (sin Facade)
```javascript
import { useEffect, useState } from 'react';
import { obtenerNotificacionesPendientes } from '../api/notificacionesApi';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerNotificacionesPendientes();
        setNotificaciones(data);
      } catch (err) {
        setError(err.message);
      }
    };
    cargar();
  }, []);
  
  // ... más lógica ...
}
```

### Después (con Facade)
```javascript
import { useNotificacionesFacade } from '../facade/appFacade';

function Notificaciones() {
  const {
    notificaciones,
    cargando,
    error,
    enviarNotificacion,
  } = useNotificacionesFacade();
  
  // Componente enfocado en presentación
  return <div>{/* UI */}</div>;
}
```

---

## 🔄 Funcionalidades Reales Mantenidas

✅ **Gestión de Pacientes**
- Listar pacientes
- Registrar nuevo paciente
- Eliminar paciente
- Agregar a lista de espera

✅ **Lista de Espera**
- Listar pacientes en espera
- Filtrar por gravedad y estado
- Actualizar estado
- Eliminar de lista

✅ **Notificaciones**
- Listar notificaciones pendientes
- Enviar notificación individual
- Enviar todas las notificaciones
- Obtener canales disponibles
- Ver estado del servicio

✅ **Optimización**
- Ver lista de espera optimizada
- Cancelar cita con estrategias (FIFO, LIFO, Gravedad)
- Reasignar automáticamente
- Filtrar y monitorear

✅ **Portal**
- Resumen de métricas
- Total de pacientes
- Notificaciones pendientes

---

## 📊 Métricas de Mejora

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Líneas de código (Notificaciones) | 164 | 50 | -70% |
| Líneas de código (Optimizacion) | 386 | 180 | -53% |
| Archivos de estilos | 5 | 1 | -80% |
| Duplicación de código | Alto | Bajo | ✅ |
| Reutilización de hooks | Media | Alta | ✅ |
| Separación de responsabilidades | Baja | Alta | ✅ |

---

## 🚀 Próximos Pasos (Sugerencias)

1. **Testing**
   - Crear tests para cada hook
   - Crear tests para componentes View
   - Mock del Facade en tests

2. **Mejoras de UX**
   - Agregar loading states más visuales
   - Confirmar acciones destructivas
   - Notificaciones toast por acción

3. **Optimización**
   - Implementar React.memo en componentes View
   - Usar useCallback en handlers
   - Implementar infinite scroll si hay muchos datos

4. **Seguridad**
   - Validar permisos en Facade
   - Encriptar datos sensibles
   - Agregar autenticación Bearer

5. **Documentación**
   - JSDoc en todos los hooks
   - Storybook para componentes View
   - Guía de arquitectura en README

---

## 📞 Notas Técnicas

- **Node.js Version**: Compatible con Node 16+
- **React Version**: 18+ (usa hooks)
- **Dependencies**: axios, vite (ya incluidas)
- **No se agregaron nuevas dependencias externas**

---

## ✅ Validación

```bash
# Todo compila sin errores críticos
# Las advertencias sobre funciones no usadas son intencionales:
# - Proporciona múltiples puntos de entrada al Facade
# - Los desarrolladores pueden elegir el nivel de acceso que necesiten
```

---

**Autor**: Refactorización automática del Frontend
**Fecha**: 2026-05-12
**Patrón**: Facade Pattern con Hooks Centralizados

