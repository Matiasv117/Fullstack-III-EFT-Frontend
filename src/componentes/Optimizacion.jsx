import { useState } from 'react';
import { useOptimizacionFacade } from '../facade/appFacade';
import { commonStyles, colorMap } from '../styles/commonStyles';

/**
 * Componente de Optimización de Lista de Espera
 * Gestiona la cancelación de citas y reasignación automática
 */
function Optimizacion() {
  const {
    listaEspera: listaFiltrada,
    listaEsperaTotal,
    cargando,
    mensaje,
    error,
    filtroGravedad,
    filtroEstado,
    setFiltroGravedad,
    setFiltroEstado,
    cargarListaEspera,
    cancelarCita,
  } = useOptimizacionFacade();

  const [citaAnclarId, setCitaAnclarId] = useState(null);
  const [estrategia, setEstrategia] = useState('fifo');

  const manejarCancelacion = async () => {
    await cancelarCita(citaAnclarId, estrategia);
    setCitaAnclarId(null);
  };

  const getGravedadColor = (gravedad) => colorMap.gravedad[gravedad] || '#95a5a6';
  const getEstadoColor = (estado) => colorMap.estado[estado] || '#3498db';

  return (
    <div style={commonStyles.container}>
      <header style={commonStyles.header}>
        <h2 style={commonStyles.title}>Optimización de Lista de Espera</h2>
        <p style={commonStyles.subtitle}>
          Monitorea y optimiza la asignación de citas médicas mediante estrategias inteligentes.
        </p>
      </header>

      <div style={commonStyles.feedback}>
        {mensaje ? <div style={{ ...commonStyles.alert, ...commonStyles.alertSuccess }}>{mensaje}</div> : null}
        {error ? <div style={{ ...commonStyles.alert, ...commonStyles.alertError }}>{error}</div> : null}
      </div>

      {/* Sección de Control de Cancelaciones */}
      <section style={commonStyles.panel}>
        <h3 style={commonStyles.sectionTitle}>Simular Cancelación de Cita</h3>
        <div style={commonStyles.form}>
          <div style={commonStyles.formRow}>
            <div>
              <label style={commonStyles.label}>ID de Cita a Cancelar</label>
              <input
                type="number"
                style={commonStyles.input}
                value={citaAnclarId || ''}
                onChange={(e) => setCitaAnclarId(e.target.value ? parseInt(e.target.value) : null)}
                placeholder="Ingresa el ID de la cita"
                disabled={cargando}
              />
            </div>
            <div>
              <label style={commonStyles.label}>Estrategia de Reasignación</label>
              <select
                style={commonStyles.input}
                value={estrategia}
                onChange={(e) => setEstrategia(e.target.value)}
                disabled={cargando}
              >
                <option value="fifo">FIFO (Primera En Llegar)</option>
                <option value="lifo">LIFO (Última En Llegar)</option>
                <option value="gravedad">Por Gravedad</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                type="button"
                style={{
                  ...commonStyles.button,
                  ...commonStyles.buttonPrimary,
                }}
                onClick={manejarCancelacion}
                disabled={cargando || !citaAnclarId}
              >
                {cargando ? 'Procesando…' : 'Procesar Cancelación'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Filtros */}
      <section style={commonStyles.panel}>
        <h3 style={commonStyles.sectionTitle}>Filtros</h3>
        <div style={commonStyles.filterSection}>
          <div style={commonStyles.filterGroup}>
            <label style={commonStyles.label}>Gravedad</label>
            <select
              style={commonStyles.input}
              value={filtroGravedad}
              onChange={(e) => setFiltroGravedad(e.target.value)}
            >
              <option value="TODOS">Todos</option>
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Media</option>
              <option value="BAJA">Baja</option>
              <option value="NORMAL">Normal</option>
            </select>
          </div>
          <div style={commonStyles.filterGroup}>
            <label style={commonStyles.label}>Estado</label>
            <select
              style={commonStyles.input}
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="TODOS">Todos</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="ATENDIDO">Atendido</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
          <div style={{ ...commonStyles.filterGroup, display: 'flex', alignItems: 'flex-end' }}>
            <p style={commonStyles.statsText}>
              Total: <strong>{listaFiltrada.length}</strong> de{' '}
              <strong>{listaEsperaTotal.length}</strong> pacientes
            </p>
          </div>
        </div>
      </section>

      {/* Lista de Espera */}
      <section style={commonStyles.panel}>
        <div style={commonStyles.toolbar}>
          <h3 style={commonStyles.sectionTitle}>Lista de Espera Actual</h3>
          <button
            type="button"
            style={{ ...commonStyles.button, ...commonStyles.buttonSecondary }}
            onClick={cargarListaEspera}
            disabled={cargando}
          >
            {cargando ? 'Actualizando…' : 'Actualizar'}
          </button>
        </div>

        {cargando && listaFiltrada.length === 0 ? (
          <p style={commonStyles.emptyState}>Cargando lista de espera…</p>
        ) : listaFiltrada.length === 0 ? (
          <p style={commonStyles.emptyState}>No hay pacientes en la lista de espera con esos filtros.</p>
        ) : (
          <ul style={commonStyles.list}>
            {listaFiltrada.map((item) => (
              <li key={item.id} style={commonStyles.listItem}>
                <div style={commonStyles.listDetails}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <strong>Paciente ID: {item.pacienteId ?? 'N/A'}</strong>
                    <span style={{ ...commonStyles.badge, background: getGravedadColor(item.gravedad) }}>
                      {item.gravedad || 'NORMAL'}
                    </span>
                    <span style={{ ...commonStyles.badge, background: getEstadoColor(item.estado) }}>
                      {item.estado || 'PENDIENTE'}
                    </span>
                  </div>
                  <span style={commonStyles.meta}>
                    Interconsulta: {item.interconsulta || 'Sin especificar'}
                  </span>
                  <span style={commonStyles.meta}>ID Registro: {item.id}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Información sobre estrategias */}
      <section style={commonStyles.panel}>
        <h3 style={commonStyles.sectionTitle}>📋 Estrategias de Optimización</h3>
        <ul style={{ listStyle: 'none', padding: '1rem', display: 'grid', gap: '1rem' }}>
          <li>
            <strong>FIFO (Primera En Llegar):</strong> Reasigna la cita cancelada al paciente que
            lleva más tiempo esperando.
          </li>
          <li>
            <strong>LIFO (Última En Llegar):</strong> Reasigna la cita al paciente más reciente en
            la lista.
          </li>
          <li>
            <strong>Por Gravedad:</strong> Reasigna la cita al paciente con mayor gravedad de
            salud.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Optimizacion;
