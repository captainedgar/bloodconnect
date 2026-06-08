# BloodConnect - Product Requirements Document (PRD)

**Versión:** 1.0  
**Fecha:** Junio 2026  
**Plataforma:** iOS, Android (React Native + Expo)

---

## 1. Visión del Producto

BloodConnect es una plataforma móvil que conecta donantes de sangre, receptores, hospitales y bancos de sangre en un ecosistema unificado. Su propósito es reducir la escasez de sangre mediante la coordinación inteligente de donaciones, solicitudes de emergencia y gestión de inventario en tiempo real.

### Problema que resuelve

- **Desconexión:** Donantes, hospitales y bancos de sangre operan de forma aislada
- **Emergencias críticas:** No hay forma rápida de notificar donantes compatibles cuando hay escasez
- **Falta de visibilidad:** Los hospitales no saben qué bancos tienen stock disponible
- **Baja retención:** Donantes no reciben seguimiento ni incentivos para donar regularmente

### Propuesta de valor

1. **Para donantes:** Recibir alertas cuando su tipo de sangre es necesario, ver su impacto en vidas salvadas
2. **Para hospitales:** Crear solicitudes urgentes y ver inventario disponible en tiempo real
3. **Para bancos de sangre:** Gestionar inventario y recibir notificaciones automáticas de stock crítico
4. **Para receptores:** Encontrar donantes compatibles rápidamente

---

## 2. Usuarios Objetivo

### 2.1 Donantes (Principal)

- **Perfil:** Personas entre 18-65 años, saludables, con disposición a donar
- **Motivación:** Altruismo, incentivos sociales, facilidad para encontrar centros
- **Necesidades:** Saber cuándo y dónde donar, ver su impacto, recibir recordatorios

### 2.2 Receptores

- **Perfil:** Pacientes que necesitan transfusiones o sus familiares
- **Motivación:** Encontrar donantes compatibles rápidamente
- **Necesidades:** Solicitar sangre, ver estado de su solicitud, comunicarse con hospitales

### 2.3 Personal Médico

- **Perfil:** Médicos, enfermeras, técnicos de bancos de sangre
- **Motivación:** Gestionar solicitudes de forma eficiente
- **Necesidades:** Crear solicitudes urgentes, ver inventario, comunicarse con bancos

### 2.4 Administradores

- **Perfil:** Personal de hospitales o bancos de sangre
- **Motivación:** Gestionar operaciones y métricas
- **Necesidades:** Ver dashboards, gestionar usuarios, configurar alertas

---

## 3. Funcionalidades del MVP

### 3.1 Autenticación y Registro

**Objetivo:** Permitir que usuarios se registren y mantengan sesión activa.

**Requisitos:**
- Registro con datos personales (nombre, email, teléfono, tipo de sangre, ubicación)
- Login con email y contraseña
- Recuperación de contraseña por email
- Sesión persistente (JWT + Refresh Token)
- Validación de email

**Criterios de aceptación:**
- [ ] Usuario puede registrarse con todos los campos requeridos
- [ ] Usuario puede iniciar sesión y mantener sesión activa
- [ ] Usuario puede recuperar contraseña
- [ ] Tokens se almacenan de forma segura (Expo Secure Store)

### 3.2 Perfil de Usuario

**Objetivo:** Mostrar información relevante del usuario y su historial.

**Requisitos:**
- Ver perfil con tipo de sangre, ciudad, provincia
- Ver estadísticas personales (total donaciones, última donación, próxima fecha elegible)
- Ver nivel de donante y recompensas obtenidas
- Editar información personal (excepto tipo de sangre)

**Criterios de aceptación:**
- [ ] Usuario ve su perfil completo
- [ ] Usuario ve estadísticas actualizadas
- [ ] Usuario puede editar su información

### 3.3 Mapa Interactivo

**Objetivo:** Mostrar bancos de sangre y hospitales cercanos con información en tiempo real.

**Requisitos:**
- Mapa con ubicación actual del usuario
- Marcadores para bancos de sangre, hospitales y centros de donación
- Al tocar un marcador: ver nombre, dirección, horario, teléfono, distancia
- Ver disponibilidad de sangre por tipo (con indicadores de color)
- Filtrar por tipo de sangre o por tipo de centro

**Criterios de aceptación:**
- [ ] Mapa carga con ubicación del usuario
- [ ] Marcadores muestran información completa al tocarlos
- [ ] Disponibilidad se actualiza en tiempo real
- [ ] Usuario puede filtrar por tipo de sangre

### 3.4 Solicitudes de Sangre

**Objetivo:** Permitir que hospitales creen solicitudes y donantes las vean.

**Requisitos:**
- Hospitales pueden crear solicitudes con: tipo de sangre, cantidad, prioridad, fecha límite
- Donantes ven solicitudes compatibles con su tipo de sangre
- Donantes pueden responder a solicitudes
- Hospitales ven lista de donantes que respondieron

**Criterios de aceptación:**
- [ ] Hospital puede crear solicitud con todos los campos
- [ ] Donante ve solo solicitudes compatibles
- [ ] Donante puede responder a una solicitud
- [ ] Hospital ve respuestas de donantes

### 3.5 Inventario de Sangre

**Objetivo:** Mostrar stock disponible en bancos de sangre.

**Requisitos:**
- Cada banco muestra los 8 tipos de sangre con cantidad disponible
- Indicadores visuales: verde (suficiente), amarillo (bajo), rojo (crítico)
- Bancos pueden actualizar su inventario
- Alertas automáticas cuando un tipo llega a nivel crítico

**Criterios de aceptación:**
- [ ] Inventario se muestra con indicadores de color
- [ ] Banco puede actualizar cantidades
- [ ] Alertas se envían cuando stock es crítico

### 3.6 Notificaciones Push

**Objetivo:** Notificar a donantes cuando su tipo de sangre es necesario.

**Requisitos:**
- Notificación cuando un banco tiene stock crítico del tipo del donante
- Notificación cuando hay una solicitud urgente compatible
- Notificación de recordatorio cuando el donante es elegible nuevamente
- Configuración para activar/desactivar notificaciones

**Criterios de aceptación:**
- [ ] Donante recibe notificaciones relevantes
- [ ] Donante puede configurar qué notificaciones recibir
- [ ] Tocar notificación lleva a la pantalla correspondiente

### 3.7 Historial de Donaciones

**Objetivo:** Registrar y mostrar el historial de donaciones del usuario.

**Requisitos:**
- Ver lista de donaciones pasadas (fecha, centro, cantidad)
- Ver estadísticas: total donaciones, sangre donada, vidas estimadas salvadas
- Ver próxima fecha elegible para donar

**Criterios de aceptación:**
- [ ] Historial muestra todas las donaciones
- [ ] Estadísticas se calculan correctamente
- [ ] Próxima fecha elegible se muestra (56 días después de última donación)

### 3.8 Sistema de Recompensas

**Objetivo:** Incentivar donaciones recurrentes mediante gamificación.

**Requisitos:**
- Niveles de donante basados en cantidad de donaciones
- Insignias por logros (primera donación, 5 donaciones, 10 donaciones, etc.)
- Ver progreso hacia siguiente nivel
- Compartir logros en redes sociales (opcional)

**Criterios de aceptación:**
- [ ] Nivel se actualiza automáticamente
- [ ] Insignias se otorgan al cumplir criterios
- [ ] Usuario ve su progreso

---

## 4. Funcionalidades Futuras (Post-MVP)

- Chat en tiempo real entre donantes y hospitales
- Sistema de citas programadas
- Integración con wearables para monitoreo de salud
- Donaciones de plaquetas y plasma
- Certificados digitales de donación
- Integración con sistemas hospitalarios existentes
- Modo offline para zonas con baja conectividad
- Multi-idioma (inglés, portugués)

---

## 5. Métricas de Éxito

### KPIs principales

1. **Donantes registrados:** Meta 10,000 en primeros 6 meses
2. **Donaciones coordinadas:** Meta 1,000 en primeros 3 meses
3. **Tiempo de respuesta a solicitudes:** Meta < 30 minutos para solicitudes críticas
4. **Retención de donantes:** Meta 60% donan al menos 2 veces al año
5. **Hospitales activos:** Meta 50 en primera ciudad

### Métricas técnicas

- Tiempo de carga de mapa < 2 segundos
- Disponibilidad del backend > 99.5%
- Notificaciones entregadas < 5 segundos

---

## 6. Restricciones y Consideraciones

### Legales

- Cumplimiento con regulaciones de salud locales
- Protección de datos médicos (HIPAA si aplica)
- Términos de servicio y política de privacidad

### Técnicas

- Soporte para iOS 13+ y Android 8+
- Funcionamiento en zonas con conectividad limitada
- Consumo de batería optimizado para uso de GPS

### Operativas

- Verificación de hospitales y bancos de sangre
- Moderación de contenido y usuarios
- Soporte técnico 24/7 para emergencias

---

## 7. Equipo y Roles

- **Product Manager:** Define roadmap y prioridades
- **Diseñador UX/UI:** Crea interfaces y flujos de usuario
- **Frontend Developer:** Implementa app móvil
- **Backend Developer:** Implementa API y base de datos
- **QA Engineer:** Pruebas y aseguramiento de calidad
- **DevOps:** Infraestructura y despliegue

---

## 8. Cronograma Estimado

| Fase | Duración | Entregables |
|------|----------|-------------|
| Fase 0: Documentación | 1 semana | PRD, arquitectura, diseño |
| Fase 1: Setup | 1 semana | Proyecto, navegación, estructura |
| Fase 2: Autenticación | 2 semanas | Login, registro, perfil |
| Fase 3: Mapa | 2 semanas | Mapa interactivo, geolocalización |
| Fase 4: Solicitudes | 2 semanas | Crear y responder solicitudes |
| Fase 5: Inventario | 1 semana | Gestión de stock |
| Fase 6: Notificaciones | 1 semana | Push notifications |
| Fase 7: Historial y Recompensas | 1 semana | Gamificación |
| Fase 8: Testing y Lanzamiento | 2 semanas | QA, fixes, deploy |

**Total estimado:** 13 semanas (~3 meses)

---

## 9. Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Baja adopción de donantes | Alta | Alto | Campañas de marketing, incentivos |
| Problemas de conectividad | Media | Alto | Modo offline, sincronización |
| Datos médicos incorrectos | Media | Crítico | Validaciones, verificación manual |
| Escalabilidad del backend | Baja | Alto | Arquitectura cloud-native, auto-scaling |
| Rechazo de hospitales | Media | Alto | Piloto con hospitales aliados |

---

## 10. Definición de Éxito del MVP

El MVP se considera exitoso cuando:

1. ✅ 1,000 donantes registrados en primera ciudad
2. ✅ 10 hospitales activos usando la plataforma
3. ✅ 100 solicitudes de sangre coordinadas
4. ✅ Rating promedio > 4.0 estrellas en app stores
5. ✅ Tiempo promedio de respuesta a solicitudes críticas < 1 hora
