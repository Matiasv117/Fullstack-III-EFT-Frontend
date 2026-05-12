import { useCallback, useEffect, useState } from 'react';
import {
  obtenerNotificacionesPendientes,
  enviarNotificacion as enviarNotificacionApi,
  enviarNotificacionPorCanal,
  enviarTodasLasNotificaciones,
  obtenerCanalesDisponibles,
  obtenerEstadoServicio,
} from '../api/notificacionesApi';

export function useNotificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [canales, setCanales] = useState([]);
  const [estadoServicio, setEstadoServicio] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const limpiarMensajes = useCallback(() => {
    setMensaje('');
    setError('');
  }, []);

  // Cargar notificaciones pendientes
  const cargarNotificaciones = useCallback(async () => {
    setCargando(true);
    limpiarMensajes();

    try {
      const data = await obtenerNotificacionesPendientes();
      setNotificaciones(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'No fue posible cargar las notificaciones');
    } finally {
      setCargando(false);
    }
  }, [limpiarMensajes]);

  // Cargar canales disponibles
  const cargarCanales = useCallback(async () => {
    try {
      const data = await obtenerCanalesDisponibles();
      setCanales(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al cargar canales:', err);
    }
  }, []);

  // Cargar estado del servicio
  const cargarEstadoServicio = useCallback(async () => {
    try {
      const data = await obtenerEstadoServicio();
      setEstadoServicio(data);
    } catch (err) {
      console.error('Error al cargar estado del servicio:', err);
    }
  }, []);

  // Efectos al montar
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void cargarNotificaciones();
      void cargarCanales();
      void cargarEstadoServicio();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [cargarNotificaciones, cargarCanales, cargarEstadoServicio]);

  // Enviar notificación individual
  const enviarNotificacion = useCallback(async (id) => {
    setCargando(true);
    limpiarMensajes();

    try {
      await enviarNotificacionApi(id);
      setNotificaciones((actual) => actual.filter((n) => n.id !== id));
      setMensaje(`Notificación ${id} enviada correctamente.`);
    } catch (err) {
      setError(err.message || 'No fue posible enviar la notificación');
    } finally {
      setCargando(false);
    }
  }, [limpiarMensajes]);

  // Enviar notificación por canal específico
  const enviarPorCanal = useCallback(async (id, canal) => {
    setCargando(true);
    limpiarMensajes();

    try {
      await enviarNotificacionPorCanal(id, canal);
      setNotificaciones((actual) => actual.filter((n) => n.id !== id));
      setMensaje(`Notificación ${id} enviada por ${canal}.`);
    } catch (err) {
      setError(err.message || 'No fue posible enviar la notificación');
    } finally {
      setCargando(false);
    }
  }, [limpiarMensajes]);

  // Enviar todas las notificaciones
  const enviarTodas = useCallback(async () => {
    setCargando(true);
    limpiarMensajes();

    try {
      await enviarTodasLasNotificaciones();
      setNotificaciones([]);
      setMensaje('Todas las notificaciones se han enviado correctamente.');
    } catch (err) {
      setError(err.message || 'Error al enviar todas las notificaciones');
    } finally {
      setCargando(false);
    }
  }, [limpiarMensajes]);

  return {
    notificaciones,
    canales,
    estadoServicio,
    cargando,
    mensaje,
    error,
    cargarNotificaciones,
    enviarNotificacion,
    enviarPorCanal,
    enviarTodas,
  };
}

