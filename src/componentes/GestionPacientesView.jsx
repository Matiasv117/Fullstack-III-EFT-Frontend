import { commonStyles } from '../styles/commonStyles';

// Reutilizar estilos comunes
const styles = commonStyles;

function GestionPacientesView({
  pacientes,
  nuevoPaciente,
  cargando,
  mensaje,
  error,
  formValido,
  actualizarCampo,
  registrar,
  agregarALista,
  borrarPaciente,
  recargarPacientes,
}) {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.title}>Gestión de Pacientes</h2>
        <p style={styles.subtitle}>
          Registro de pacientes y derivación a la lista de espera desde un único flujo UI.
        </p>
      </header>

      <section style={styles.panel} aria-live="polite">
        <div style={styles.toolbar}>
          <h3 style={styles.sectionTitle}>Pacientes registrados</h3>
          <button
            type="button"
            style={{ ...styles.button, ...styles.buttonSecondary }}
            onClick={recargarPacientes}
            disabled={cargando}
          >
            {cargando ? 'Actualizando…' : 'Actualizar lista'}
          </button>
        </div>

        <div style={styles.feedback}>
          {mensaje ? <div style={{ ...styles.alert, ...styles.alertSuccess }}>{mensaje}</div> : null}
          {error ? <div style={{ ...styles.alert, ...styles.alertError }}>{error}</div> : null}
        </div>

        {pacientes.length === 0 ? (
          <p style={styles.emptyState}>No hay pacientes registrados todavía.</p>
        ) : (
          <ul style={styles.list}>
             {pacientes.map((paciente) => (
               <li key={paciente.id} style={styles.listItem}>
                 <div style={styles.listDetails}>
                   <strong>
                     {paciente.nombre} {paciente.apellido}
                   </strong>
                   <span style={styles.meta}>DNI: {paciente.dni}</span>
                   <span style={styles.meta}>
                     Contacto: {paciente.telefono || 'Sin teléfono'} · {paciente.email || 'Sin email'}
                   </span>
                 </div>
                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                   <button
                     type="button"
                     style={{ ...styles.button, ...styles.buttonPrimary }}
                     onClick={() => agregarALista(paciente.id)}
                     disabled={cargando}
                   >
                     Agregar a lista
                   </button>
                    <button
                      type="button"
                      style={{
                        ...styles.button,
                        ...styles.buttonDanger,
                      }}
                      onClick={() => {
                        if (window.confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
                          borrarPaciente(paciente.id);
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

      <section style={styles.panel}>
        <h3 style={styles.sectionTitle}>Registrar nuevo paciente</h3>
        <div style={styles.form}>
          <div style={styles.formRow}>
            <input
              style={styles.input}
              value={nuevoPaciente.nombre}
              onChange={(event) => actualizarCampo('nombre', event.target.value)}
              placeholder="Nombre *"
              autoComplete="given-name"
            />
            <input
              style={styles.input}
              value={nuevoPaciente.apellido}
              onChange={(event) => actualizarCampo('apellido', event.target.value)}
              placeholder="Apellido *"
              autoComplete="family-name"
            />
            <input
              style={styles.input}
              value={nuevoPaciente.dni}
              onChange={(event) => actualizarCampo('dni', event.target.value)}
              placeholder="DNI *"
              autoComplete="off"
            />
          </div>
          <div style={styles.formRow}>
            <input
              style={styles.input}
              value={nuevoPaciente.telefono}
              onChange={(event) => actualizarCampo('telefono', event.target.value)}
              placeholder="Teléfono (opcional)"
              autoComplete="tel"
            />
            <input
              style={styles.input}
              type="email"
              value={nuevoPaciente.email}
              onChange={(event) => actualizarCampo('email', event.target.value)}
              placeholder="Correo electrónico (opcional)"
              autoComplete="email"
            />
          </div>
          <button
            type="button"
            style={{
              ...styles.button,
              ...styles.buttonPrimary,
              ...(formValido && !cargando ? {} : styles.disabledButton),
            }}
            onClick={registrar}
            disabled={!formValido || cargando}
          >
            {cargando ? 'Procesando…' : 'Registrar paciente'}
          </button>
        </div>
      </section>
    </div>
  );
}

export default GestionPacientesView;

