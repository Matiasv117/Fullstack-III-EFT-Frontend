import { useNotificacionesFacade } from '../facade/appFacade';
import { commonStyles } from '../styles/commonStyles';

/**
 * Componente de Notificaciones
 * Gestiona el envío de notificaciones usando el Facade
 */
function Notificaciones() {
  const {
    notificaciones,
    cargando,
    mensaje,
    error,
    enviarNotificacion,
    enviarTodas,
  } = useNotificacionesFacade();

  return (
    <div style={commonStyles.container}>
      <header style={commonStyles.header}>
        <h2 style={commonStyles.title}>Notificaciones Pendientes</h2>
        <p style={commonStyles.subtitle}>
          Gestiona y envía notificaciones a pacientes registrados en el sistema.
        </p>
      </header>

      <section style={commonStyles.panel} aria-live="polite">
        <div style={commonStyles.toolbar}>
          <h3 style={commonStyles.sectionTitle}>Panel de Notificaciones</h3>
          {notificaciones.length > 0 && (
            <button
              type="button"
              style={{ ...commonStyles.button, ...commonStyles.buttonPrimary }}
              onClick={enviarTodas}
              disabled={cargando}
            >
              {cargando ? 'Enviando…' : `Enviar todas (${notificaciones.length})`}
            </button>
          )}
        </div>

        <div style={commonStyles.feedback}>
          {mensaje ? <div style={{ ...commonStyles.alert, ...commonStyles.alertSuccess }}>{mensaje}</div> : null}
          {error ? <div style={{ ...commonStyles.alert, ...commonStyles.alertError }}>{error}</div> : null}
        </div>

        {cargando && notificaciones.length === 0 ? (
          <p style={commonStyles.emptyState}>Cargando notificaciones…</p>
        ) : notificaciones.length === 0 ? (
          <p style={commonStyles.emptyState}>No hay notificaciones pendientes en este momento.</p>
        ) : (
          <ul style={commonStyles.list}>
            {notificaciones.map((notificacion) => (
              <li key={notificacion.id} style={commonStyles.listItem}>
                <div style={commonStyles.listDetails}>
                  <strong>ID: {notificacion.id}</strong>
                  <span style={commonStyles.meta}>Paciente ID: {notificacion.pacienteId ?? 'N/A'}</span>
                  <span style={commonStyles.meta}>Tipo: {notificacion.tipo ?? 'N/A'}</span>
                  <span style={commonStyles.meta}>Estado: {notificacion.estado ?? 'PENDIENTE'}</span>
                  <span style={commonStyles.meta}>
                    Mensaje: {notificacion.mensaje || 'Sin mensaje'}
                  </span>
                </div>
                <button
                  type="button"
                  style={{ ...commonStyles.button, ...commonStyles.buttonPrimary }}
                  onClick={() => enviarNotificacion(notificacion.id)}
                  disabled={cargando}
                >
                  {cargando ? 'Enviando…' : 'Enviar'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}


export default Notificaciones;
