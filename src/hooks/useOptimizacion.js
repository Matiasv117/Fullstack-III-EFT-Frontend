import { useCallback, useEffect, useState } from 'react';
import {
  obtenerListaEsperaOptimizada,
  cancelarCitaConEstrategia,
} from '../api/optimizacionApi';

export function useOptimizacion() {
  const [listaEspera, setListaEspera] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [filtroGravedad, setFiltroGravedad] = useState('TODOS');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  const limpiarMensajes = useCallback(() => {
    setMensaje('');
    setError('');
  }, []);

  // Cargar lista de espera optimizada
  const cargarListaEspera = useCallback(async () => {
    setCargando(true);
    limpiarMensajes();

    try {
      const data = await obtenerListaEsperaOptimizada();
      setListaEspera(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'No fue posible cargar la lista de espera optimizada');
    } finally {
      setCargando(false);
    }
  }, [limpiarMensajes]);

  // Cargar datos al montar
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void cargarListaEspera();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [cargarListaEspera]);

  // Aplicar filtros
  useEffect(() => {
    let filtrada = [...listaEspera];

    if (filtroGravedad !== 'TODOS') {
      filtrada = filtrada.filter(
        (item) => (item.gravedad || 'NORMAL') === filtroGravedad
      );
    }

    if (filtroEstado !== 'TODOS') {
      filtrada = filtrada.filter(
        (item) => (item.estado || 'PENDIENTE') === filtroEstado
      );
    }

    setListaFiltrada(filtrada);
  }, [listaEspera, filtroGravedad, filtroEstado]);

  // Cancelar cita con estrategia
  const cancelarCita = useCallback(async (citaId, estrategia = 'fifo') => {
    if (!citaId) {
      setError('Debes seleccionar una cita para cancelar');
      return;
    }

    setCargando(true);
    limpiarMensajes();

    try {
      await cancelarCitaConEstrategia(citaId, estrategia);

      // Recargar la lista
      const data = await obtenerListaEsperaOptimizada();
      setListaEspera(Array.isArray(data) ? data : []);

      setMensaje(
        `Cita ${citaId} cancelada y reasignada con estrategia ${estrategia.toUpperCase()}`
      );
    } catch (err) {
      setError(
        err.message || 'No fue posible procesar la cancelación de la cita'
      );
    } finally {
      setCargando(false);
    }
  }, [limpiarMensajes]);

  return {
    listaEspera: listaFiltrada,
    listaEsperaTotal: listaEspera,
    cargando,
    mensaje,
    error,
    filtroGravedad,
    filtroEstado,
    setFiltroGravedad,
    setFiltroEstado,
    cargarListaEspera,
    cancelarCita,
  };
}

