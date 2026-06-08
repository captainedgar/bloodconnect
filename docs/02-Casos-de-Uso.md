# BloodConnect - Casos de Uso

**Versión:** 1.0  
**Fecha:** Junio 2026

---

## Diagrama de Actores

```
┌─────────────────────────────────────────────────────────┐
│                    BloodConnect                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ Donante  │  │Receptor  │  │ Hospital │  │ Admin  │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Casos de Uso - Donante

### UC-01: Registro de Donante

**Actor:** Donante (no registrado)  
**Precondición:** Usuario no tiene cuenta  
**Postcondición:** Cuenta creada, sesión iniciada

**Flujo principal:**
1. Usuario abre la app
2. Toca "Registrarse"
3. Ingresa: nombre, apellido, email, teléfono, fecha de nacimiento, sexo, tipo de sangre, peso, ciudad, provincia, contraseña
4. Sistema valida datos
5. Sistema verifica que email no esté registrado
6. Sistema crea cuenta
7. Sistema envía email de verificación
8. Sistema inicia sesión automáticamente
9. Usuario ve pantalla principal (mapa)

**Flujos alternativos:**
- **3a.** Email ya registrado → Sistema muestra error, sugiere iniciar sesión
- **3b.** Datos inválidos → Sistema muestra errores de validación
- **7a.** Email no llega → Usuario puede reenviar desde perfil

---

### UC-02: Inicio de Sesión

**Actor:** Donante  
**Precondición:** Usuario tiene cuenta registrada  
**Postcondición:** Sesión iniciada

**Flujo principal:**
1. Usuario abre la app
2. Ingresa email y contraseña
3. Toca "Ingresar"
4. Sistema valida credenciales
5. Sistema genera JWT y Refresh Token
6. Sistema almacena tokens en Secure Store
7. Usuario ve pantalla principal

**Flujos alternativos:**
- **4a.** Credenciales inválidas → Sistema muestra error
- **4b.** Cuenta no verificada → Sistema solicita verificar email
- **4c.** Cuenta bloqueada → Sistema muestra mensaje de contacto a soporte

---

### UC-03: Ver Perfil

**Actor:** Donante  
**Precondición:** Sesión iniciada  
**Postcondición:** Perfil visible

**Flujo principal:**
1. Usuario toca tab "Perfil"
2. Sistema muestra:
   - Foto/avatar
   - Nombre completo
   - Tipo de sangre (destacado)
   - Ciudad y provincia
   - Estadísticas: total donaciones, última donación, próxima fecha elegible
   - Nivel de donante y progreso
   - Insignias obtenidas

---

### UC-04: Editar Perfil

**Actor:** Donante  
**Precondición:** Sesión iniciada  
**Postcondición:** Información actualizada

**Flujo principal:**
1. Usuario toca "Editar perfil"
2. Modifica campos permitidos (nombre, teléfono, ciudad, etc.)
3. Toca "Guardar"
4. Sistema valida cambios
5. Sistema actualiza información
6. Sistema muestra confirmación

**Restricciones:**
- No se puede cambiar tipo de sangre
- No se puede cambiar email (requiere flujo separado)

---

### UC-05: Ver Mapa de Bancos de Sangre

**Actor:** Donante  
**Precondición:** Sesión iniciada, permisos de ubicación otorgados  
**Postcondición:** Mapa visible con marcadores

**Flujo principal:**
1. Usuario toca tab "Mapa"
2. Sistema solicita permisos de ubicación (si no se han otorgado)
3. Sistema obtiene ubicación GPS
4. Sistema carga mapa centrado en ubicación del usuario
5. Sistema consulta bancos de sangre cercanos (radio 50km)
6. Sistema muestra marcadores con colores según disponibilidad
7. Usuario puede hacer zoom y desplazarse

**Flujos alternativos:**
- **2a.** Usuario deniega permisos → Sistema muestra mapa centrado en ciudad por defecto
- **5a.** Error de red → Sistema muestra error y botón de reintentar

---

### UC-06: Ver Detalle de Banco de Sangre

**Actor:** Donante  
**Precondición:** Mapa visible  
**Postcondición:** Detalle del banco visible

**Flujo principal:**
1. Usuario toca un marcador en el mapa
2. Sistema muestra modal/bottom sheet con:
   - Nombre del banco
   - Dirección completa
   - Horario de atención
   - Teléfono
   - Distancia desde ubicación actual
   - Inventario de sangre (8 tipos con indicadores de color)
3. Usuario puede:
   - Tocar "Cómo llegar" → abre Google Maps/Apple Maps
   - Tocar "Llamar" → inicia llamada
   - Tocar "Ver en lista" → navega a vista de lista

---

### UC-07: Ver Solicitudes de Sangre

**Actor:** Donante  
**Precondición:** Sesión iniciada  
**Postcondición:** Lista de solicitudes visibles

**Flujo principal:**
1. Usuario toca tab "Solicitudes"
2. Sistema consulta solicitudes activas
3. Sistema filtra solicitudes compatibles con tipo de sangre del donante
4. Sistema muestra lista ordenada por prioridad y distancia
5. Cada solicitud muestra:
   - Tipo de sangre necesario
   - Hospital solicitante
   - Cantidad requerida
   - Prioridad (baja, media, alta, crítica)
   - Fecha límite
   - Distancia al hospital

---

### UC-08: Responder a Solicitud de Sangre

**Actor:** Donante  
**Precondición:** Solicitud visible  
**Postcondición:** Respuesta registrada

**Flujo principal:**
1. Usuario toca una solicitud
2. Sistema muestra detalle completo
3. Usuario toca "Quiero donar"
4. Sistema solicita confirmación
5. Usuario confirma
6. Sistema registra respuesta
7. Sistema notifica al hospital
8. Sistema muestra mensaje de agradecimiento con instrucciones

**Flujos alternativos:**
- **4a.** Usuario cancela → Sistema no registra respuesta
- **6a.** Solicitud ya fue cubierta → Sistema muestra mensaje, actualiza lista

---

### UC-09: Ver Historial de Donaciones

**Actor:** Donante  
**Precondición:** Sesión iniciada, al menos 1 donación registrada  
**Postcondición:** Historial visible

**Flujo principal:**
1. Usuario navega a "Historial" desde perfil
2. Sistema muestra lista de donaciones:
   - Fecha
   - Centro de donación
   - Tipo de donación (sangre completa, plaquetas, etc.)
   - Cantidad
3. Sistema muestra estadísticas:
   - Total de donaciones
   - Total de sangre donada (en ml)
   - Vidas estimadas salvadas (1 donación ≈ 3 vidas)
   - Gráfico de donaciones por año

---

### UC-10: Recibir Notificación de Emergencia

**Actor:** Donante  
**Precondición:** Notificaciones activadas, tipo de sangre compatible con solicitud crítica  
**Postcondición:** Notificación recibida

**Flujo principal:**
1. Hospital crea solicitud con prioridad "crítica"
2. Sistema identifica donantes compatibles en radio de 30km
3. Sistema envía notificación push a donantes compatibles
4. Donante recibe notificación: "🚨 Se necesita sangre [TIPO] urgentemente en [HOSPITAL]"
5. Donante toca notificación
6. App abre directamente la solicitud
7. Donante puede responder inmediatamente

---

### UC-11: Ver Recompensas e Insignias

**Actor:** Donante  
**Precondición:** Sesión iniciada  
**Postcondición:** Recompensas visibles

**Flujo principal:**
1. Usuario navega a "Recompensas" desde perfil
2. Sistema muestra:
   - Nivel actual (Bronce, Plata, Oro, Platino, Diamante)
   - Progreso hacia siguiente nivel
   - Insignias obtenidas (con fecha)
   - Insignias bloqueadas (con criterios para desbloquear)

**Insignias:**
- 🥉 Primera donación
- 🥈 5 donaciones
- 🥇 10 donaciones
- 🏆 25 donaciones
- 💎 50 donaciones
- 🦸 Héroe de sangre (100 donaciones)
- ⭐ Donante frecuente (3 donaciones en 6 meses)
- 🆘 Respondió a emergencia
- 📅 Donante puntual (donó dentro de los primeros 7 días de ser elegible)

---

### UC-12: Configurar Notificaciones

**Actor:** Donante  
**Precondición:** Sesión iniciada  
**Postcondición:** Preferencias actualizadas

**Flujo principal:**
1. Usuario navega a "Configuración" desde perfil
2. Usuario ve opciones:
   - [x] Alertas de emergencia (solicitudes críticas)
   - [x] Stock bajo de mi tipo de sangre
   - [x] Recordatorio cuando sea elegible
   - [ ] Noticias y actualizaciones
3. Usuario activa/desactiva según preferencia
4. Sistema guarda preferencias

---

## 2. Casos de Uso - Hospital / Personal Médico

### UC-20: Registro de Hospital

**Actor:** Administrador del hospital  
**Precondición:** Hospital no está registrado  
**Postcondición:** Hospital registrado, pendiente de verificación

**Flujo principal:**
1. Usuario selecciona "Registrar hospital"
2. Ingresa datos del hospital: nombre, dirección, teléfono, email
3. Ingresa sus datos personales como administrador
4. Sistema crea cuenta con rol "admin" y hospital con estado "pendiente"
5. Sistema envía notificación a equipo de BloodConnect para verificación
6. Usuario ve mensaje: "Tu cuenta está pendiente de verificación"

---

### UC-21: Crear Solicitud de Sangre

**Actor:** Personal médico  
**Precondición:** Sesión iniciada, hospital verificado  
**Postcondición:** Solicitud creada y visible para donantes

**Flujo principal:**
1. Usuario toca "Nueva solicitud"
2. Ingresa:
   - Tipo de sangre
   - Cantidad (en unidades)
   - Prioridad (baja, media, alta, crítica)
   - Fecha límite
   - Notas adicionales (opcional)
3. Sistema valida datos
4. Sistema crea solicitud
5. Sistema notifica a donantes compatibles (si prioridad es alta o crítica)
6. Sistema muestra confirmación con ID de solicitud

---

### UC-22: Ver Respuestas de Donantes

**Actor:** Personal médico  
**Precondición:** Solicitud creada  
**Postcondición:** Lista de respuestas visible

**Flujo principal:**
1. Usuario toca una solicitud activa
2. Sistema muestra:
   - Detalle de la solicitud
   - Lista de donantes que respondieron:
     - Nombre
     - Tipo de sangre
     - Teléfono
     - Hora de respuesta
3. Usuario puede:
   - Contactar donante por teléfono
   - Marcar donante como "confirmado"
   - Marcar solicitud como "cubierta"

---

### UC-23: Actualizar Inventario de Sangre

**Actor:** Administrador del banco de sangre  
**Precondición:** Sesión iniciada  
**Postcondición:** Inventario actualizado

**Flujo principal:**
1. Usuario navega a "Inventario"
2. Sistema muestra los 8 tipos de sangre con cantidades actuales
3. Usuario modifica cantidades (agregar o restar)
4. Usuario toca "Guardar"
5. Sistema actualiza inventario
6. Si algún tipo queda en nivel crítico (< 5 unidades):
   - Sistema marca como "crítico"
   - Sistema envía alertas a donantes compatibles

---

### UC-24: Ver Dashboard de Hospital

**Actor:** Administrador del hospital  
**Precondición:** Sesión iniciada  
**Postcondición:** Dashboard visible

**Flujo principal:**
1. Usuario ve dashboard con:
   - Solicitudes activas (por prioridad)
   - Solicitudes completadas esta semana
   - Inventario actual (resumen)
   - Donantes que respondieron hoy
   - Gráficos de uso

---

## 3. Casos de Uso - Administrador del Sistema

### UC-30: Verificar Hospital

**Actor:** Administrador de BloodConnect  
**Precondición:** Hospital pendiente de verificación  
**Postcondición:** Hospital verificado o rechazado

**Flujo principal:**
1. Admin ve lista de hospitales pendientes
2. Revisa documentación (licencia, certificaciones)
3. Toca "Verificar" o "Rechazar"
4. Si verifica:
   - Sistema cambia estado a "verificado"
   - Sistema notifica al hospital
5. Si rechaza:
   - Sistema solicita motivo
   - Sistema notifica al hospital con motivo

---

### UC-31: Gestionar Usuarios

**Actor:** Administrador de BloodConnect  
**Precondición:** Sesión iniciada  
**Postcondición:** Usuarios gestionados

**Flujo principal:**
1. Admin busca usuario por nombre o email
2. Sistema muestra perfil del usuario
3. Admin puede:
   - Ver historial de actividad
   - Bloquear/desbloquear cuenta
   - Cambiar rol
   - Eliminar cuenta

---

### UC-32: Ver Métricas Globales

**Actor:** Administrador de BloodConnect  
**Precondición:** Sesión iniciada  
**Postcondición:** Métricas visibles

**Flujo principal:**
1. Admin navega a "Métricas"
2. Sistema muestra:
   - Total de usuarios registrados (por rol)
   - Donaciones coordinadas (por período)
   - Hospitales activos
   - Tiempo promedio de respuesta
   - Mapa de calor de actividad

---

## 4. Casos de Uso - Sistema (Automáticos)

### UC-40: Enviar Recordatorio de Elegibilidad

**Actor:** Sistema  
**Precondición:** Han pasado 56 días desde última donación  
**Postcondición:** Notificación enviada

**Flujo principal:**
1. Sistema ejecuta job diario a las 9:00 AM
2. Sistema identifica donantes elegibles (56+ días desde última donación)
3. Sistema envía notificación: "Ya puedes donar nuevamente. ¿Agendas una cita?"
4. Donante toca notificación
5. App muestra mapa de centros cercanos

---

### UC-41: Alertar Stock Crítico

**Actor:** Sistema  
**Precondición:** Banco actualiza inventario a nivel crítico  
**Postcondición:** Alertas enviadas

**Flujo principal:**
1. Banco actualiza inventario
2. Sistema detecta que un tipo de sangre tiene < 5 unidades
3. Sistema marca tipo como "crítico"
4. Sistema identifica donantes compatibles en radio de 30km
5. Sistema envía notificación push a donantes
6. Sistema muestra alerta en mapa (marcador rojo pulsante)

---

### UC-42: Cerrar Solicitudes Expiradas

**Actor:** Sistema  
**Precondición:** Solicitud ha pasado su fecha límite  
**Postcondición:** Solicitud cerrada

**Flujo principal:**
1. Sistema ejecuta job cada hora
2. Sistema identifica solicitudes expiradas
3. Sistema cambia estado a "expirada"
4. Sistema notifica al hospital
5. Sistema sugiere crear nueva solicitud si aún se necesita

---

### UC-43: Calcular Niveles de Donante

**Actor:** Sistema  
**Precondición:** Donación registrada  
**Postcondición:** Nivel actualizado

**Flujo principal:**
1. Sistema registra nueva donación
2. Sistema cuenta total de donaciones del usuario
3. Sistema calcula nivel:
   - Bronce: 1-4 donaciones
   - Plata: 5-9 donaciones
   - Oro: 10-24 donaciones
   - Platino: 25-49 donaciones
   - Diamante: 50-99 donaciones
   - Héroe: 100+ donaciones
4. Si nivel cambió:
   - Sistema actualiza nivel
   - Sistema otorga insignia
   - Sistema envía notificación de felicitación

---

## 5. Matriz de Permisos

| Acción | Donante | Receptor | Hospital | Admin |
|--------|---------|----------|----------|-------|
| Ver mapa | ✅ | ✅ | ✅ | ✅ |
| Ver solicitudes | ✅ (compatibles) | ✅ (todas) | ✅ (propias) | ✅ (todas) |
| Crear solicitud | ❌ | ❌ | ✅ | ❌ |
| Responder solicitud | ✅ | ❌ | ❌ | ❌ |
| Ver inventario | ✅ | ✅ | ✅ (propio) | ✅ (todos) |
| Actualizar inventario | ❌ | ❌ | ✅ (propio) | ✅ (todos) |
| Ver perfil propio | ✅ | ✅ | ✅ | ✅ |
| Editar perfil propio | ✅ | ✅ | ✅ | ✅ |
| Ver historial propio | ✅ | ❌ | ❌ | ✅ |
| Ver recompensas | ✅ | ❌ | ❌ | ❌ |
| Verificar hospitales | ❌ | ❌ | ❌ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ❌ | ✅ |
| Ver métricas globales | ❌ | ❌ | ✅ (propias) | ✅ |

---

## 6. Priorización de Casos de Uso para MVP

### Alta prioridad (MVP)

- UC-01: Registro de Donante
- UC-02: Inicio de Sesión
- UC-03: Ver Perfil
- UC-05: Ver Mapa de Bancos de Sangre
- UC-06: Ver Detalle de Banco de Sangre
- UC-07: Ver Solicitudes de Sangre
- UC-08: Responder a Solicitud de Sangre
- UC-21: Crear Solicitud de Sangre
- UC-23: Actualizar Inventario de Sangre
- UC-41: Alertar Stock Crítico

### Media prioridad (MVP)

- UC-04: Editar Perfil
- UC-09: Ver Historial de Donaciones
- UC-10: Recibir Notificación de Emergencia
- UC-11: Ver Recompensas e Insignias
- UC-22: Ver Respuestas de Donantes
- UC-40: Enviar Recordatorio de Elegibilidad
- UC-43: Calcular Niveles de Donante

### Baja prioridad (Post-MVP)

- UC-12: Configurar Notificaciones
- UC-20: Registro de Hospital
- UC-24: Ver Dashboard de Hospital
- UC-30: Verificar Hospital
- UC-31: Gestionar Usuarios
- UC-32: Ver Métricas Globales
- UC-42: Cerrar Solicitudes Expiradas
