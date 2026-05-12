/**
 * Estilos comunes reutilizables
 * Centraliza todos los estilos para evitar duplicación
 */

export const commonStyles = {
  container: {
    display: 'grid',
    gap: '1.5rem',
  },
  header: {
    display: 'grid',
    gap: '0.5rem',
  },
  title: {
    fontSize: '1.9rem',
    color: '#0d4f5c',
  },
  subtitle: {
    color: '#4f6771',
    lineHeight: 1.5,
  },
  panel: {
    padding: '1.25rem',
    borderRadius: '16px',
    border: '1px solid #dce8ea',
    background: '#fbfefe',
    boxShadow: '0 10px 25px rgba(16, 61, 70, 0.05)',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    color: '#116a7b',
    marginBottom: '1rem',
  },
  feedback: {
    display: 'grid',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  alert: {
    padding: '0.9rem 1rem',
    borderRadius: '12px',
    fontWeight: 600,
  },
  alertSuccess: {
    background: '#e6f7f1',
    color: '#116149',
    border: '1px solid #9dd9c3',
  },
  alertError: {
    background: '#fff1f1',
    color: '#a13131',
    border: '1px solid #f1bbbb',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  button: {
    border: 'none',
    borderRadius: '10px',
    padding: '0.85rem 1rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px',
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #116a7b, #4db6ac)',
    color: '#fff',
  },
  buttonSecondary: {
    background: '#e5f2f1',
    color: '#0d4f5c',
  },
  buttonDanger: {
    background: '#e74c3c',
    color: '#fff',
  },
  disabledButton: {
    opacity: 0.65,
    cursor: 'not-allowed',
  },
  list: {
    listStyle: 'none',
    display: 'grid',
    gap: '0.85rem',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '14px',
    border: '1px solid #e3eaec',
    background: '#ffffff',
    flexWrap: 'wrap',
  },
  listDetails: {
    display: 'grid',
    gap: '0.25rem',
    flex: 1,
  },
  meta: {
    color: '#5f7480',
    fontSize: '0.95rem',
  },
  form: {
    display: 'grid',
    gap: '0.9rem',
  },
  formRow: {
    display: 'grid',
    gap: '0.9rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  },
  input: {
    width: '100%',
    padding: '0.9rem 1rem',
    borderRadius: '10px',
    border: '1px solid #cfe1e5',
    background: '#fff',
    fontSize: '14px',
    fontFamily: 'inherit',
  },
  label: {
    display: 'block',
    fontWeight: 600,
    color: '#116a7b',
    fontSize: '14px',
    marginBottom: '0.5rem',
  },
  emptyState: {
    color: '#5f7480',
    padding: '0.75rem 0',
    fontSize: '16px',
    fontStyle: 'italic',
  },
  badge: {
    padding: '2px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
  },
  filterSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    background: '#f0f7f8',
    borderRadius: '12px',
  },
  filterGroup: {
    display: 'grid',
    gap: '0.5rem',
  },
  statsText: {
    color: '#5f7480',
    fontSize: '14px',
    margin: 0,
  },
};

export const colorMap = {
  gravedad: {
    ALTA: '#e74c3c',
    MEDIA: '#f39c12',
    BAJA: '#27ae60',
    NORMAL: '#3498db',
  },
  estado: {
    PENDIENTE: '#e74c3c',
    ATENDIDO: '#27ae60',
    CANCELADO: '#95a5a6',
  },
};

