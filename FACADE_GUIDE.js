/**
 * Guía de uso del Patrón Facade
 *
 * Este document explica cómo usar el Facade en tu aplicación React
 */

// ============================================================
// 1. FACADE PRINCIPAL - Acceso a todos los módulos
// ============================================================

import { useAppFacade } from './facade/appFacade';

function ComponenteCompleto() {
  const app = useAppFacade();

  // Acceso a todos los módulos
  const pacientes = app.pacientes;           // Gestión de Pacientes
  const listaEspera = app.listaEspera;       // Lista de Espera
  const notificaciones = app.notificaciones; // Notificaciones
  const optimizacion = app.optimizacion;     // Optimización

  return <div>{/* ... */}</div>;
}


// ============================================================
// 2. FACADES ESPECÍFICOS - Acceso a módulo individual
// ============================================================

// 2.1 Gestión de Pacientes
// -------
import { usePacientesFacade } from './facade/appFacade';

function MiComponentePacientes() {
  const {
    pacientes,           // Array de pacientes
    nuevoPaciente,       // Objeto con datos del formulario
    cargando,            // Boolean
    mensaje,             // String
    error,               // String
    formValido,          // Boolean
    actualizarCampo,     // (campo, valor) => void
    registrar,           // () => Promise
    agregarALista,       // (pacienteId) => Promise
    borrarPaciente,      // (pacienteId) => Promise
    recargarPacientes,   // () => Promise
  } = usePacientesFacade();

  return (
    <div>
      <button onClick={() => registrar()}>Registrar</button>
      <button onClick={() => agregarALista(1)}>Agregar a Lista</button>
      <button onClick={() => borrarPaciente(1)}>Eliminar</button>
    </div>
  );
}


// 2.2 Lista de Espera
// -------
import { useListaEsperaFacade } from './facade/appFacade';

function MiComponenteListaEspera() {
  const {
    listaEspera,           // Array de registros
    cargando,              // Boolean
    mensaje,               // String
    error,                 // String
    cargarListaEspera,     // () => Promise
    eliminarDeListaEspera, // (id) => Promise
    actualizarEstado,      // (id, nuevoEstado) => Promise
  } = useListaEsperaFacade();

  return (
    <div>
      {listaEspera.map(item => (
        <div key={item.id}>
          {item.pacienteId} - {item.estado}
          <button onClick={() => actualizarEstado(item.id, 'ATENDIDO')}>
            Marcar como Atendido
          </button>
        </div>
      ))}
    </div>
  );
}


// 2.3 Notificaciones
// -------
import { useNotificacionesFacade } from './facade/appFacade';

function MiComponenteNotificaciones() {
  const {
    notificaciones,        // Array de notificaciones
    canales,               // Array de canales disponibles
    estadoServicio,        // Objeto con estado del servicio
    cargando,              // Boolean
    mensaje,               // String
    error,                 // String
    cargarNotificaciones,  // () => Promise
    enviarNotificacion,    // (id) => Promise
    enviarPorCanal,        // (id, canal) => Promise
    enviarTodas,           // () => Promise
  } = useNotificacionesFacade();

  return (
    <div>
      <p>Canales: {canales.join(', ')}</p>
      {notificaciones.map(n => (
        <div key={n.id}>
          {n.mensaje}
          <button onClick={() => enviarNotificacion(n.id)}>Enviar</button>
          <button onClick={() => enviarPorCanal(n.id, 'EMAIL')}>Email</button>
        </div>
      ))}
      <button onClick={() => enviarTodas()}>Enviar Todas</button>
    </div>
  );
}


// 2.4 Optimización
// -------
import { useOptimizacionFacade } from './facade/appFacade';

function MiComponenteOptimizacion() {
  const {
    listaEspera,          // Array filtrado
    listaEsperaTotal,     // Todos los registros
    cargando,             // Boolean
    mensaje,              // String
    error,                // String
    filtroGravedad,       // String ('TODOS', 'ALTA', etc)
    filtroEstado,         // String ('TODOS', 'PENDIENTE', etc)
    setFiltroGravedad,    // (valor) => void
    setFiltroEstado,      // (valor) => void
    cargarListaEspera,    // () => Promise
    cancelarCita,         // (citaId, estrategia) => Promise
  } = useOptimizacionFacade();

  return (
    <div>
      <select onChange={(e) => setFiltroGravedad(e.target.value)}>
        <option>TODOS</option>
        <option>ALTA</option>
        <option>MEDIA</option>
        <option>BAJA</option>
        <option>NORMAL</option>
      </select>

      <select onChange={(e) => setFiltroEstado(e.target.value)}>
        <option>TODOS</option>
        <option>PENDIENTE</option>
        <option>ATENDIDO</option>
        <option>CANCELADO</option>
      </select>

      <button onClick={() => cancelarCita(123, 'fifo')}>
        Cancelar con FIFO
      </button>
    </div>
  );
}


// ============================================================
// 3. ESTILOS COMUNES
// ============================================================

import { commonStyles, colorMap } from './styles/commonStyles';

function MiComponento() {
  return (
    <div style={commonStyles.container}>
      <h2 style={commonStyles.title}>Mi Título</h2>
      <p style={commonStyles.subtitle}>Mi subtítulo</p>

      <section style={commonStyles.panel}>
        <h3 style={commonStyles.sectionTitle}>Sección</h3>

        <div style={commonStyles.feedback}>
          {/* Mensajes de éxito o error */}
          <div style={{
            ...commonStyles.alert,
            ...commonStyles.alertSuccess
          }}>
            ✅ Operación exitosa
          </div>
        </div>

        <ul style={commonStyles.list}>
          <li style={commonStyles.listItem}>
            <div style={commonStyles.listDetails}>
              <strong>Título</strong>
              <span style={commonStyles.meta}>Detalle</span>
            </div>
          </li>
        </ul>

        <form style={commonStyles.form}>
          <label style={commonStyles.label}>Campo</label>
          <input style={commonStyles.input} type="text" />

          <button style={{
            ...commonStyles.button,
            ...commonStyles.buttonPrimary
          }}>
            Enviar
          </button>
        </form>
      </section>

      {/* Colores */}
      <span style={{
        ...commonStyles.badge,
        background: colorMap.gravedad.ALTA
      }}>
        ALTA
      </span>

      <span style={{
        ...commonStyles.badge,
        background: colorMap.estado.PENDIENTE
      }}>
        PENDIENTE
      </span>
    </div>
  );
}


// ============================================================
// 4. PATRONES DE USO COMUNES
// ============================================================

// Cargar datos al montar componente (ya incluido en hooks)
function ComponenteConCarga() {
  const { notificaciones, cargarNotificaciones } = useNotificacionesFacade();

  // useEffect ya está en el hook - solo consume los datos
  return (
    <div>
      {notificaciones.length} notificaciones
    </div>
  );
}

// Manejar envío de formulario
function FormularioPacientes() {
  const {
    nuevoPaciente,
    formValido,
    cargando,
    error,
    registrar,
    actualizarCampo,
  } = usePacientesFacade();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registrar();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nuevoPaciente.nombre}
        onChange={(e) => actualizarCampo('nombre', e.target.value)}
      />
      <button disabled={!formValido || cargando}>
        {cargando ? 'Registrando...' : 'Registrar'}
      </button>
      {error && <span style={commonStyles.alertError}>{error}</span>}
    </form>
  );
}

// Confirmación antes de acción destructiva
function EliminarConConfirmacion() {
  const { borrarPaciente } = usePacientesFacade();

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro?')) {
      borrarPaciente(id);
    }
  };

  return <button onClick={() => handleDelete(123)}>Eliminar</button>;
}


// ============================================================
// 5. REFERENCIA RÁPIDA DE ESTILOS
// ============================================================

/**
 * Estilos disponibles en commonStyles:
 *
 * Layout:
 * - container: grid con gap
 * - header: para títulos y descripciones
 * - panel: sección con borde y sombra
 * - panel1.5rem gap
 * - toolbar: flex con botones
 * - filterSection: grid de filtros
 *
 * Tipografía:
 * - title: h2 grande (1.9rem)
 * - subtitle: descripción (color gris)
 * - sectionTitle: h3 en sección (1.2rem)
 * - label: para inputs
 * - meta: información pequeña
 *
 * Componentes:
 * - button, buttonPrimary, buttonSecondary, buttonDanger
 * - list, listItem: layout en grid
 * - listDetails: grupo de elementos
 * - input: campo de texto estilizado
 * - badge: etiqueta con color
 *
 * Feedback:
 * - feedback: contenedor de mensajes
 * - alert, alertSuccess, alertError
 *
 * Estados:
 * - emptyState: sin datos
 * - disabledButton: botón deshabilitado
 */


// ============================================================
// 6. REFERENCIA DE COLORES
// ============================================================

/**
 * colorMap.gravedad:
 * - ALTA: '#e74c3c' (rojo)
 * - MEDIA: '#f39c12' (naranja)
 * - BAJA: '#27ae60' (verde)
 * - NORMAL: '#3498db' (azul)
 *
 * colorMap.estado:
 * - PENDIENTE: '#e74c3c' (rojo)
 * - ATENDIDO: '#27ae60' (verde)
 * - CANCELADO: '#95a5a6' (gris)
 */


// ============================================================
// 7. ERRORES COMUNES Y SOLUCIONES
// ============================================================

/**
 * ❌ ERROR: Usar hook fuera de componente
 * ✅ SOLUCIÓN: Hooks solo dentro de componentes
 *
 * ❌ ERROR: Modificar estado directamente
 * ✅ SOLUCIÓN: Usar las funciones del facade
 *
 * ❌ ERROR: No esperar promesas
 * ✅ SOLUCIÓN: await cancelarCita() o .then()
 *
 * ❌ ERROR: Duplicar estilos
 * ✅ SOLUCIÓN: Importar de commonStyles
 */

