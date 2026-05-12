/**
 * AppFacade - Centraliza el acceso a todos los servicios y hooks
 *
 * Proporciona una interfaz simplificada para los componentes,
 * desacoplándolos de la lógica de negocio y las APIs directas.
 */

import { useGestionPacientes } from '../hooks/useGestionPacientes';
import { useListaEspera } from '../hooks/useListaEspera';
import { useNotificaciones } from '../hooks/useNotificaciones';
import { useOptimizacion } from '../hooks/useOptimizacion';
import { obtenerResumenPortal } from '../api/portalApi';

/**
 * Hook Facade principal
 * Agrupa todos los módulos de la aplicación
 */
export function useAppFacade() {
  const gestionPacientes = useGestionPacientes();
  const listaEspera = useListaEspera();
  const notificaciones = useNotificaciones();
  const optimizacion = useOptimizacion();

  return {
    // Módulo de Gestión de Pacientes
    pacientes: gestionPacientes,

    // Módulo de Lista de Espera
    listaEspera,

    // Módulo de Notificaciones
    notificaciones,

    // Módulo de Optimización
    optimizacion,

    // API de Portal (datos globales)
    portal: {
      obtenerResumen: obtenerResumenPortal,
    },
  };
}

/**
 * Facade específico para Gestión de Pacientes
 */
export function usePacientesFacade() {
  return useGestionPacientes();
}

/**
 * Facade específico para Lista de Espera
 */
export function useListaEsperaFacade() {
  return useListaEspera();
}

/**
 * Facade específico para Notificaciones
 */
export function useNotificacionesFacade() {
  return useNotificaciones();
}

/**
 * Facade específico para Optimización
 */
export function useOptimizacionFacade() {
  return useOptimizacion();
}

