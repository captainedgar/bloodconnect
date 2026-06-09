# BloodConnect - Roadmap del MVP

**Versión:** 1.0  
**Fecha:** Junio 2026  
**Duración estimada:** 13 semanas

---

## Resumen Ejecutivo

| Fase | Nombre | Duración | Estado |
|------|--------|----------|--------|
| 0 | Documentación y Diseño | 1 semana | ✅ Completada |
| 1 | Setup y Estructura | 1 semana | ✅ Completada |
| 2 | Autenticación + Modelo de Datos | 2 semanas | ✅ Completada |
| 3 | API + Mapa Interactivo | 2 semanas | 🔄 En progreso |
| 4 | Solicitudes de Sangre (SOS) | 2 semanas | ⏳ Pendiente |
| 5 | Inventario de Bancos | 1 semana | ⏳ Pendiente |
| 6 | Citas y Donaciones | 1 semana | ⏳ Pendiente |
| 7 | Notificaciones Push + Tiempo Real | 1 semana | ⏳ Pendiente |
| 8 | Historial, Recompensas y Perfil | 1 semana | ⏳ Pendiente |
| 9 | Dashboards por Rol | 2 semanas | ⏳ Pendiente |
| 10 | Testing, Optimización y Deploy | 2 semanas | ⏳ Pendiente |

---

## Fase 0: Documentación y Diseño ✅

**Duración:** 1 semana  
**Estado:** Completada

### Entregables

- [x] PRD (Product Requirements Document)
- [x] Casos de uso detallados
- [x] Arquitectura del sistema
- [x] Modelo de base de datos (Prisma schema)
- [x] Diagramas de navegación y flujos
- [x] Roadmap del MVP

### Decisiones tomadas

- Stack: React Native + Expo + TypeScript
- Backend: Node.js + Express + Prisma + PostgreSQL
- Estado: Zustand + React Query
- Navegación: Expo Router v6
- Autenticación: JWT + Refresh Tokens

---

## Fase 1: Setup y Estructura 🔄

**Duración:** 1 semana  
**Estado:** En progreso

### Objetivos

- Configurar proyecto frontend
- Configurar proyecto backend
- Establecer estructura de carpetas
- Configurar navegación básica

### Tareas Frontend

- [x] Crear proyecto con Expo SDK 54
- [x] Configurar TypeScript
- [x] Instalar dependencias base
- [x] Configurar Expo Router
- [x] Crear estructura de carpetas (feature-based)
- [x] Configurar navegación de tabs
- [x] Crear pantallas placeholder
- [ ] Configurar ESLint y Prettier
- [ ] Configurar alias de imports (@/)
- [ ] Crear componentes UI base (Button, Input, Card)

### Tareas Backend

- [ ] Crear proyecto Node.js + Express
- [ ] Configurar TypeScript
- [ ] Configurar Prisma
- [ ] Crear schema de base de datos
- [ ] Ejecutar migración inicial
- [ ] Crear estructura de carpetas (modules)
- [ ] Configurar ESLint y Prettier
- [ ] Crear servidor básico
- [ ] Configurar CORS
- [ ] Configurar variables de entorno

### Criterios de aceptación

- [ ] Frontend compila sin errores
- [ ] Backend inicia sin errores
- [ ] Navegación de tabs funciona
- [ ] Base de datos conectada
- [ ] Lint y typecheck pasan

---

## Fase 2: Autenticación ⏳

**Duración:** 2 semanas  
**Estado:** Pendiente

### Objetivos

- Implementar registro de usuarios
- Implementar login/logout
- Implementar recuperación de contraseña
- Implementar perfil de usuario
- Proteger rutas

### Semana 1: Backend

#### Tareas

- [ ] Crear módulo de auth
  - [ ] POST /auth/register
  - [ ] POST /auth/login
  - [ ] POST /auth/refresh
  - [ ] POST /auth/logout
- [ ] Implementar hash de contraseñas (bcrypt)
- [ ] Implementar generación de JWT
- [ ] Implementar refresh tokens
- [ ] Crear middleware de autenticación
- [ ] Crear módulo de usuarios
  - [ ] GET /users/me
  - [ ] PATCH /users/me
- [ ] Implementar validación con Zod
- [ ] Configurar envío de emails (SendGrid/Resend)
- [ ] Implementar verificación de email
- [ ] Implementar recuperación de contraseña
  - [ ] POST /auth/forgot-password
  - [ ] POST /auth/reset-password

#### Criterios de aceptación

- [ ] Usuario puede registrarse
- [ ] Usuario puede iniciar sesión
- [ ] JWT se genera correctamente
- [ ] Refresh token funciona
- [ ] Middleware protege rutas
- [ ] Email de verificación se envía

### Semana 2: Frontend

#### Tareas

- [ ] Crear feature de auth
  - [ ] LoginForm component
  - [ ] RegisterForm component
  - [ ] useLogin hook
  - [ ] useRegister hook
  - [ ] auth-api service
  - [ ] Zod schemas
- [ ] Implementar pantalla de login
  - [ ] Formulario con validación
  - [ ] Manejo de errores
  - [ ] Loading state
- [ ] Implementar pantalla de registro
  - [ ] Formulario completo
  - [ ] Validación de campos
  - [ ] Selector de tipo de sangre
  - [ ] Selector de fecha
- [ ] Implementar auth store (Zustand)
  - [ ] Guardar tokens en SecureStore
  - [ ] Manejar estado de autenticación
- [ ] Implementar interceptor de Axios
  - [ ] Agregar token a requests
  - [ ] Refresh automático
- [ ] Proteger rutas
  - [ ] Redirigir a login si no autenticado
  - [ ] Redirigir a home si autenticado
- [ ] Implementar pantalla de perfil
  - [ ] Mostrar datos del usuario
  - [ ] Botón de editar
  - [ ] Botón de cerrar sesión
- [ ] Implementar edición de perfil
  - [ ] Formulario de edición
  - [ ] Actualizar datos
- [ ] Implementar recuperación de contraseña
  - [ ] Pantalla de solicitar recuperación
  - [ ] Pantalla de restablecer (deep link)

#### Criterios de aceptación

- [ ] Usuario puede registrarse desde la app
- [ ] Usuario puede iniciar sesión
- [ ] Sesión persiste al cerrar app
- [ ] Usuario puede cerrar sesión
- [ ] Usuario puede ver su perfil
- [ ] Usuario puede editar su perfil
- [ ] Rutas protegidas funcionan
- [ ] Recuperación de contraseña funciona

---

## Fase 3: Mapa Interactivo ⏳

**Duración:** 2 semanas  
**Estado:** Pendiente

### Objetivos

- Mostrar mapa con ubicación del usuario
- Mostrar bancos de sangre y hospitales
- Mostrar detalle al tocar marcador
- Filtrar por tipo de sangre

### Semana 1: Backend

#### Tareas

- [ ] Crear módulo de blood-banks
  - [ ] GET /blood-banks
  - [ ] GET /blood-banks/nearby
  - [ ] GET /blood-banks/:id
  - [ ] POST /blood-banks (admin)
  - [ ] PATCH /blood-banks/:id (admin)
- [ ] Implementar geolocalización
  - [ ] Calcular distancia entre puntos
  - [ ] Filtrar por radio
  - [ ] Ordenar por distancia
- [ ] Crear seed data
  - [ ] 10 bancos de sangre de ejemplo
  - [ ] 5 hospitales de ejemplo
  - [ ] Inventario inicial
- [ ] Crear módulo de inventario
  - [ ] GET /blood-banks/:id/inventory
  - [ ] PATCH /blood-banks/:id/inventory

#### Criterios de aceptación

- [ ] API retorna bancos cercanos
- [ ] Distancia se calcula correctamente
- [ ] Inventario se retorna con cada banco
- [ ] Seed data carga correctamente

### Semana 2: Frontend

#### Tareas

- [ ] Crear feature de map
  - [ ] BloodBankMap component
  - [ ] MapMarker component
  - [ ] BankDetailSheet component
  - [ ] useLocation hook
  - [ ] useBloodBanks hook
  - [ ] map-api service
- [ ] Implementar mapa
  - [ ] Solicitar permisos de ubicación
  - [ ] Obtener ubicación GPS
  - [ ] Renderizar mapa centrado en usuario
  - [ ] Mostrar marcador de usuario
- [ ] Implementar marcadores
  - [ ] Cargar bancos de sangre
  - [ ] Renderizar marcadores
  - [ ] Color según disponibilidad
  - [ ] Icono según tipo (banco/hospital)
- [ ] Implementar bottom sheet
  - [ ] Mostrar al tocar marcador
  - [ ] Información del banco
  - [ ] Inventario con indicadores
  - [ ] Botones de acción (llamar, navegar)
- [ ] Implementar filtros
  - [ ] Modal de filtros
  - [ ] Filtrar por tipo de sangre
  - [ ] Filtrar por tipo de centro
- [ ] Implementar "Cómo llegar"
  - [ ] Abrir Google Maps (Android)
  - [ ] Abrir Apple Maps (iOS)
- [ ] Implementar "Llamar"
  - [ ] Iniciar llamada telefónica

#### Criterios de aceptación

- [ ] Mapa carga con ubicación del usuario
- [ ] Marcadores se muestran correctamente
- [ ] Bottom sheet muestra información completa
- [ ] Filtros funcionan
- [ ] "Cómo llegar" abre app de mapas
- [ ] "Llamar" inicia llamada

---

## Fase 4: Solicitudes de Sangre ⏳

**Duración:** 2 semanas  
**Estado:** Pendiente

### Objetivos

- Hospitales pueden crear solicitudes
- Donantes ven solicitudes compatibles
- Donantes pueden responder
- Hospitales ven respuestas

### Semana 1: Backend

#### Tareas

- [ ] Crear módulo de requests
  - [ ] GET /requests
  - [ ] GET /requests/compatible
  - [ ] GET /requests/:id
  - [ ] POST /requests
  - [ ] PATCH /requests/:id
  - [ ] POST /requests/:id/respond
  - [ ] GET /requests/:id/responses
- [ ] Implementar lógica de compatibilidad
  - [ ] Filtrar solicitudes por tipo de sangre compatible
  - [ ] Ordenar por prioridad y distancia
- [ ] Implementar validaciones
  - [ ] Solo hospitales pueden crear
  - [ ] Solo donantes compatibles pueden responder
  - [ ] Un donante responde solo una vez
- [ ] Implementar estados
  - [ ] ACTIVE, COVERED, EXPIRED, CANCELLED
  - [ ] Transiciones de estado
- [ ] Configurar WebSocket
  - [ ] Evento: nueva solicitud
  - [ ] Evento: nueva respuesta
  - [ ] Rooms por ubicación

#### Criterios de aceptación

- [ ] Hospital puede crear solicitud
- [ ] Donante ve solo solicitudes compatibles
- [ ] Donante puede responder
- [ ] Hospital ve respuestas
- [ ] WebSocket envía eventos en tiempo real

### Semana 2: Frontend

#### Tareas

- [ ] Crear feature de requests
  - [ ] RequestCard component
  - [ ] RequestList component
  - [ ] RequestDetail component
  - [ ] RequestForm component (hospital)
  - [ ] useRequests hook
  - [ ] useCreateRequest hook
  - [ ] useRespondRequest hook
  - [ ] requests-api service
- [ ] Implementar lista de solicitudes (donante)
  - [ ] Tabs: Todas, Compatibles, Mis respuestas
  - [ ] Cards con información
  - [ ] Indicadores de prioridad
  - [ ] Pull to refresh
- [ ] Implementar detalle de solicitud
  - [ ] Información completa
  - [ ] Compatibilidad con usuario
  - [ ] Botón "Quiero donar"
  - [ ] Modal de confirmación
- [ ] Implementar creación de solicitud (hospital)
  - [ ] Formulario completo
  - [ ] Selector de prioridad
  - [ ] Selector de fecha límite
  - [ ] Validación
- [ ] Implementar vista de respuestas (hospital)
  - [ ] Lista de donantes que respondieron
  - [ ] Información de contacto
  - [ ] Botón de confirmar
- [ ] Implementar WebSocket
  - [ ] Conectar al servidor
  - [ ] Escuchar eventos
  - [ ] Actualizar UI en tiempo real

#### Criterios de aceptación

- [ ] Donante ve lista de solicitudes
- [ ] Donante puede responder
- [ ] Hospital puede crear solicitud
- [ ] Hospital ve respuestas en tiempo real
- [ ] UI se actualiza con WebSocket

---

## Fase 5: Inventario ⏳

**Duración:** 1 semana  
**Estado:** Pendiente

### Objetivos

- Bancos pueden actualizar inventario
- Sistema detecta stock crítico
- Enviar alertas automáticas

### Tareas Backend

- [ ] Implementar actualización de inventario
  - [ ] Validar cantidades
  - [ ] Calcular nivel (CRITICAL, LOW, SUFFICIENT)
  - [ ] Detectar cambios a crítico
- [ ] Implementar alertas de stock crítico
  - [ ] Identificar donantes compatibles cercanos
  - [ ] Enviar notificaciones push
  - [ ] Crear notificaciones en BD
- [ ] Crear endpoint de inventario crítico
  - [ ] GET /inventory/critical

### Tareas Frontend

- [ ] Crear feature de inventory
  - [ ] InventoryList component
  - [ ] InventoryItem component
  - [ ] InventoryForm component
  - [ ] useInventory hook
  - [ ] useUpdateInventory hook
  - [ ] inventory-api service
- [ ] Implementar vista de inventario (banco)
  - [ ] Lista de 8 tipos de sangre
  - [ ] Barras de cantidad
  - [ ] Indicadores de color
  - [ ] Botones +/- para ajustar
  - [ ] Botón guardar
- [ ] Implementar indicador de crítico en mapa
  - [ ] Marcador rojo pulsante
  - [ ] Badge de alerta

#### Criterios de aceptación

- [ ] Banco puede actualizar inventario
- [ ] Nivel se calcula automáticamente
- [ ] Alertas se envían cuando es crítico
- [ ] Marcador en mapa cambia a rojo

---

## Fase 6: Notificaciones Push ⏳

**Duración:** 1 semana  
**Estado:** Pendiente

### Objetivos

- Configurar Expo Notifications
- Enviar notificaciones push
- Manejar taps en notificaciones

### Tareas Backend

- [ ] Configurar Expo Push Notifications
  - [ ] Guardar push tokens
  - [ ] Función para enviar notificaciones
- [ ] Implementar envío de notificaciones
  - [ ] Al crear solicitud crítica
  - [ ] Al detectar stock crítico
  - [ ] Al recibir respuesta de donante
- [ ] Crear job de recordatorio de elegibilidad
  - [ ] Ejecutar diariamente
  - [ ] Identificar donantes elegibles (56+ días)
  - [ ] Enviar notificación

### Tareas Frontend

- [ ] Configurar Expo Notifications
  - [ ] Solicitar permisos
  - [ ] Obtener push token
  - [ ] Enviar token al backend
- [ ] Implementar manejo de notificaciones
  - [ ] Listener para notificaciones en foreground
  - [ ] Listener para taps en notificaciones
  - [ ] Navegar a pantalla correspondiente
- [ ] Implementar configuración de notificaciones
  - [ ] Pantalla de preferencias
  - [ ] Toggles por tipo de notificación
  - [ ] Guardar preferencias

#### Criterios de aceptación

- [ ] Notificaciones push se reciben
- [ ] Tap en notificación navega correctamente
- [ ] Usuario puede configurar preferencias
- [ ] Recordatorio de elegibilidad funciona

---

## Fase 7: Historial y Recompensas ⏳

**Duración:** 1 semana  
**Estado:** Pendiente

### Objetivos

- Mostrar historial de donaciones
- Calcular estadísticas
- Implementar sistema de insignias
- Calcular niveles de donante

### Tareas Backend

- [ ] Crear módulo de donations
  - [ ] GET /donations/me
  - [ ] POST /donations
  - [ ] GET /donations/stats
- [ ] Implementar cálculo de estadísticas
  - [ ] Total de donaciones
  - [ ] Total de sangre donada
  - [ ] Vidas estimadas salvadas
  - [ ] Donaciones por año
- [ ] Crear módulo de rewards
  - [ ] GET /rewards/me
  - [ ] GET /rewards/badges
- [ ] Implementar cálculo de nivel
  - [ ] Bronce: 1-4
  - [ ] Plata: 5-9
  - [ ] Oro: 10-24
  - [ ] Platino: 25-49
  - [ ] Diamante: 50-99
  - [ ] Héroe: 100+
- [ ] Implementar otorgamiento de insignias
  - [ ] Al registrar donación
  - [ ] Verificar criterios
  - [ ] Crear UserBadge
  - [ ] Enviar notificación
- [ ] Crear seed de insignias

### Tareas Frontend

- [ ] Crear feature de donations
  - [ ] DonationHistory component
  - [ ] DonationCard component
  - [ ] DonationStats component
  - [ ] useDonations hook
  - [ ] useDonationStats hook
- [ ] Implementar pantalla de historial
  - [ ] Lista de donaciones
  - [ ] Estadísticas
  - [ ] Gráfico de donaciones por año
- [ ] Crear feature de rewards
  - [ ] BadgeCard component
  - [ ] BadgeGrid component
  - [ ] LevelProgress component
  - [ ] useBadges hook
- [ ] Implementar pantalla de insignias
  - [ ] Grid de insignias
  - [ ] Insignias obtenidas (color)
  - [ ] Insignias bloqueadas (gris)
  - [ ] Progreso hacia siguiente nivel
- [ ] Actualizar perfil
  - [ ] Mostrar nivel
  - [ ] Mostrar barra de progreso
  - [ ] Mostrar estadísticas resumidas

#### Criterios de aceptación

- [ ] Historial muestra todas las donaciones
- [ ] Estadísticas se calculan correctamente
- [ ] Insignias se otorgan automáticamente
- [ ] Nivel se actualiza
- [ ] UI muestra progreso

---

## Fase 8: Testing y Lanzamiento ⏳

**Duración:** 2 semanas  
**Estado:** Pendiente

### Objetivos

- Testing exhaustivo
- Corrección de bugs
- Optimización de rendimiento
- Preparación para lanzamiento
- Despliegue

### Semana 1: Testing y Optimización

#### Tareas

- [ ] Testing funcional
  - [ ] Probar todos los flujos de usuario
  - [ ] Probar en iOS y Android
  - [ ] Probar en diferentes tamaños de pantalla
  - [ ] Probar modo offline
  - [ ] Probar con datos reales
- [ ] Testing de rendimiento
  - [ ] Optimizar carga de imágenes
  - [ ] Implementar virtualización de listas
  - [ ] Optimizar queries de base de datos
  - [ ] Implementar paginación
  - [ ] Reducir bundle size
- [ ] Testing de seguridad
  - [ ] Verificar protección de rutas
  - [ ] Verificar validación de input
  - [ ] Verificar manejo de tokens
  - [ ] Verificar CORS
  - [ ] Verificar rate limiting
- [ ] Corrección de bugs
  - [ ] Priorizar bugs críticos
  - [ ] Corregir bugs de UI
  - [ ] Corregir bugs de funcionalidad
- [ ] Optimización de UX
  - [ ] Mejorar animaciones
  - [ ] Mejorar estados de carga
  - [ ] Mejorar mensajes de error
  - [ ] Mejorar accesibilidad

### Semana 2: Preparación y Lanzamiento

#### Tareas Frontend

- [ ] Configurar EAS Build
  - [ ] Crear perfiles de build
  - [ ] Configurar iconos y splash
  - [ ] Configurar variables de entorno
- [ ] Build de producción
  - [ ] Build para iOS
  - [ ] Build para Android
  - [ ] Probar builds en dispositivos reales
- [ ] Preparar assets para stores
  - [ ] Screenshots (iOS y Android)
  - [ ] Iconos de alta resolución
  - [ ] Feature graphic
  - [ ] Descripción de la app
  - [ ] Keywords
- [ ] Submit a stores
  - [ ] Submit a App Store
  - [ ] Submit a Google Play Store
  - [ ] Responder a revisiones

#### Tareas Backend

- [ ] Preparar para producción
  - [ ] Configurar base de datos de producción
  - [ ] Configurar variables de entorno
  - [ ] Configurar logs
  - [ ] Configurar monitoreo
  - [ ] Configurar backups
- [ ] Desplegar backend
  - [ ] Desplegar en Railway/Render
  - [ ] Configurar dominio
  - [ ] Configurar SSL
  - [ ] Configurar health checks
- [ ] Configurar monitoreo
  - [ ] Configurar Sentry
  - [ ] Configurar uptime monitoring
  - [ ] Configurar alertas

#### Criterios de aceptación

- [ ] Todos los tests pasan
- [ ] No hay bugs críticos
- [ ] Rendimiento es aceptable
- [ ] Builds se generan correctamente
- [ ] Backend está desplegado
- [ ] App está en revisión en stores

---

## Post-MVP (Futuro)

### Funcionalidades Prioritarias

1. **Chat en tiempo real**
   - Chat entre donantes y hospitales
   - Notificaciones de nuevos mensajes

2. **Sistema de citas**
   - Agendar cita para donar
   - Calendario de disponibilidad
   - Recordatorios de cita

3. **Dashboard avanzado**
   - Métricas detalladas para hospitales
   - Gráficos de tendencias
   - Exportación de reportes

4. **Integraciones**
   - Integración con sistemas hospitalarios
   - Integración con laboratorios
   - API pública para terceros

5. **Multi-idioma**
   - Inglés
   - Portugués
   - Sistema de traducción

6. **Modo offline mejorado**
   - Sincronización bidireccional
   - Cola de acciones offline
   - Conflict resolution

---

## Métricas de Éxito del MVP

### KPIs de Producto

| Métrica | Meta | Medición |
|---------|------|----------|
| Donantes registrados | 1,000 | Primer mes |
| Hospitales activos | 10 | Primer mes |
| Solicitudes creadas | 100 | Primer mes |
| Solicitudes respondidas | 50% | Tasa de respuesta |
| Tiempo de respuesta | < 1 hora | Para solicitudes críticas |
| Rating en stores | > 4.0 | Después de 100 reviews |

### KPIs Técnicos

| Métrica | Meta | Medición |
|---------|------|----------|
| Uptime | > 99.5% | Monitoreo continuo |
| Tiempo de carga | < 2s | Mapa y listas |
| Crash rate | < 1% | Sentry |
| API response time | < 500ms | P95 |
| Build success rate | > 95% | EAS Build |

---

## Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Retraso en desarrollo | Alta | Alto | Priorizar features críticas, reducir scope si es necesario |
| Bugs críticos en producción | Media | Alto | Testing exhaustivo, rollout gradual |
| Rechazo de App Store | Baja | Alto | Seguir guidelines, revisar antes de submit |
| Problemas de rendimiento | Media | Medio | Optimización continua, monitoreo |
| Baja adopción inicial | Alta | Alto | Marketing, partnerships con hospitales |
| Problemas de escalabilidad | Baja | Alto | Arquitectura cloud-native, auto-scaling |

---

## Equipo y Responsabilidades

| Rol | Responsabilidades |
|-----|-------------------|
| **Product Manager** | Definir requisitos, priorizar backlog, validar entregas |
| **Frontend Developer** | Implementar app móvil, integrar APIs, optimizar UX |
| **Backend Developer** | Implementar API, base de datos, integraciones |
| **UI/UX Designer** | Diseñar interfaces, crear prototipos, validar usabilidad |
| **QA Engineer** | Testing funcional, testing de rendimiento, reportar bugs |
| **DevOps** | Configurar CI/CD, desplegar infraestructura, monitoreo |

---

## Herramientas

### Desarrollo

- **IDE:** VS Code
- **Version Control:** Git + GitHub
- **Project Management:** GitHub Projects / Linear
- **Communication:** Slack / Discord

### Frontend

- **Framework:** React Native + Expo
- **Language:** TypeScript
- **Navigation:** Expo Router
- **State:** Zustand + React Query
- **Forms:** React Hook Form + Zod
- **Maps:** React Native Maps
- **Location:** Expo Location
- **Notifications:** Expo Notifications
- **Storage:** Expo Secure Store

### Backend

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Auth:** JWT + bcrypt
- **Validation:** Zod
- **Real-time:** Socket.io
- **Email:** SendGrid / Resend

### Infraestructura

- **Frontend Hosting:** Expo EAS
- **Backend Hosting:** Railway / Render
- **Database:** PostgreSQL (managed)
- **Monitoring:** Sentry
- **Analytics:** PostHog / Firebase Analytics
- **CI/CD:** GitHub Actions

---

## Checklist de Lanzamiento

### Pre-Lanzamiento

- [ ] Todos los features del MVP implementados
- [ ] Testing funcional completo
- [ ] Testing de rendimiento completado
- [ ] Bugs críticos corregidos
- [ ] Documentación actualizada
- [ ] Backend desplegado en producción
- [ ] Base de datos de producción configurada
- [ ] Monitoreo configurado
- [ ] Backups configurados

### Lanzamiento

- [ ] Build de iOS generado
- [ ] Build de Android generado
- [ ] App submitida a App Store
- [ ] App submitida a Google Play
- [ ] Screenshots y descripciones preparadas
- [ ] Marketing de lanzamiento preparado
- [ ] Soporte técnico listo

### Post-Lanzamiento

- [ ] Monitorear crashes y errores
- [ ] Responder reviews de usuarios
- [ ] Recopilar feedback
- [ ] Planear iteración 1.1
- [ ] Celebrar el lanzamiento 🎉
