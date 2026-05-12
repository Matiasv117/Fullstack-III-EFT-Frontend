import { useState } from 'react';
import { useListaEsperaFacade } from '../facade/appFacade';
import { commonStyles, colorMap } from '../styles/commonStyles';

function ListaEsperaView({
  listaEspera,
  cargando,
  mensaje,
  error,
  eliminarDeListaEspera,
  actualizarEstado,
  cargarListaEspera,
}) {
  const [filtroGravedad, setFiltroGravedad] = useState('TODOS');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  const listaFiltrada = listaEspera.filter((item) => {
    if (filtroGravedad !== 'TODOS' && (item.gravedad || 'NORMAL') !== filtroGravedad) {
      return false;
    }
    if (filtroEstado !== 'TODOS' && (item.estado || 'PENDIENTE') !== filtroEstado) {
      return false;
    }
    return true;
  });

  const getGravedadColor = (gravedad) => colorMap.gravedad[gravedad] || '#95a5a6';
  const getEstadoColor = (estado) => colorMap.estado[estado] || '#3498db';

  return (
    <div style={commonStyles.container}>
      <header style={commonStyles.header}>
        <h2 style={commonStyles.title}>Lista de Espera</h2>
        <p style={commonStyles.subtitle}>
          Monitorea y gestiona los pacientes que esperan atención médica.
        </p>
      </header>

      <section style={commonStyles.panel} aria-live="polite">
        <div style={commonStyles.toolbar}>
          <h3 style={commonStyles.sectionTitle}>Pacientes en lista de espera</h3>
          <button
            type="button"
            style={{ ...commonStyles.button, ...commonStyles.buttonSecondary }}
            onClick={cargarListaEspera}
            disabled={cargando}
          >
            {cargando ? 'Actualizando…' : 'Actualizar'}
          </button>
        </div>

        <div style={commonStyles.feedback}>
          {mensaje ? <div style={{ ...commonStyles.alert, ...commonStyles.alertSuccess }}>{mensaje}</div> : null}
          {error ? <div style={{ ...commonStyles.alert, ...commonStyles.alertError }}>{error}</div> : null}
        </div>

        {/* Filtros */}
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
            <span style={commonStyles.statsText}>
              Mostrando: <strong>{listaFiltrada.length}</strong> de{' '}
              <strong>{listaEspera.length}</strong>
            </span>
          </div>
        </div>

        {listaFiltrada.length === 0 ? (
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

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <select
                    style={{
                      ...commonStyles.button,
                      ...commonStyles.buttonSecondary,
                      padding: '0.6rem 0.8rem',
                      cursor: 'pointer',
                    }}
                    onChange={(e) => {
                      if (e.target.value) {
                        actualizarEstado(item.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                    disabled={cargando}
                  >
                    <option value="">Cambiar estado</option>
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="ATENDIDO">Atendido</option>
                    <option value="CANCELADO">Cancelado</option>
                  </select>
                  <button
                    type="button"
                    style={{
                      ...commonStyles.button,
                      ...commonStyles.buttonDanger,
                    }}
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
                        eliminarDeListaEspera(item.id);
                      }
                    }}
                    disabled={cargando}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function ListaEspera() {
  const listaEsperaFacade = useListaEsperaFacade();

  return (
    <ListaEsperaView
      listaEspera={listaEsperaFacade.listaEspera}
      cargando={listaEsperaFacade.cargando}
      mensaje={listaEsperaFacade.mensaje}
      error={listaEsperaFacade.error}
      eliminarDeListaEspera={listaEsperaFacade.eliminarDeListaEspera}
      actualizarEstado={listaEsperaFacade.actualizarEstado}
      cargarListaEspera={listaEsperaFacade.cargarListaEspera}
    />
  );
}

export default ListaEspera;

