import GestionPacientesView from './GestionPacientesView';
import { usePacientesFacade } from '../facade/appFacade';

/**
 * Componente contenedor para Gestión de Pacientes
 * Usa el Facade para acceder a todos los datos y funciones
 */
function GestionPacientes() {
  const pacientesFacade = usePacientesFacade();

  return <GestionPacientesView {...pacientesFacade} />;
}

export default GestionPacientes;
