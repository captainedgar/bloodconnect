# BloodConnect - Navegación y Flujos de Usuario

**Versión:** 1.0  
**Fecha:** Junio 2026

---

## 1. Estructura de Navegación

### 1.1 Diagrama General

```
┌─────────────────────────────────────────────────────────────────┐
│                        APP INICIO                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │  ¿Autenticado?      │
              └──────────┬──────────┘
                         │
            ┌────────────┴────────────┐
            │ NO                      │ SÍ
            ▼                         ▼
   ┌─────────────────┐      ┌─────────────────┐
   │   AUTH STACK    │      │   TABS STACK    │
   │   (Sin tabs)    │      │   (Con tabs)    │
   └────────┬────────┘      └────────┬────────┘
            │                        │
   ┌────────┴────────┐      ┌────────┼────────┐
   │                 │      │        │        │
   ▼                 ▼      ▼        ▼        ▼
┌──────┐        ┌────────┐ ┌────┐ ┌────────┐ ┌───────┐
│Login │        │Register│ │Mapa│ │Solic.  │ │Perfil │
└──────┘        └────────┘ └────┘ └────────┘ └───────┘
```

### 1.2 Grupos de Rutas (Expo Router)

```
app/
├── _layout.tsx              → Root Stack (protección de rutas)
├── (auth)/                  → Auth Stack (sin autenticación)
│   ├── _layout.tsx          →   Stack navigator
│   ├── login.tsx            →   Pantalla de login
│   └── register.tsx         →   Pantalla de registro
├── (tabs)/                  → Tabs Stack (requiere autenticación)
│   ├── _layout.tsx          →   Tab navigator (3 tabs)
│   ├── index.tsx            →   Tab "Mapa"
│   ├── requests.tsx         →   Tab "Solicitudes"
│   └── profile.tsx          →   Tab "Perfil"
└── modal.tsx                → Modal global
```

---

## 2. Navegación Detallada

### 2.1 Auth Stack (Sin Autenticación)

```
┌─────────────────────────────────────────────────────────────┐
│                      AUTH STACK                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │    Login     │────────>│   Register   │                  │
│  │              │         │              │                  │
│  │ [Email]      │         │ [Formulario] │                  │
│  │ [Password]   │         │              │                  │
│  │ [Ingresar]   │         │ [Registrarse]│                  │
│  │              │         │              │                  │
│  │ ¿No tienes   │────────>│              │                  │
│  │ cuenta?      │         │              │                  │
│  │              │         │ ¿Ya tienes   │                  │
│  │ [Olvidé mi   │         │ cuenta?      │                  │
│  │  contraseña] │         │              │                  │
│  └──────────────┘         └──────────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Transiciones:**
- Login → Register: Push animation
- Register → Login: Pop animation
- Login/Register → Tabs: Replace (limpia el stack)

### 2.2 Tabs Stack (Con Autenticación)

```
┌─────────────────────────────────────────────────────────────┐
│                      TABS STACK                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────┐    ┌────────────┐    ┌─────────┐              │
│  │  Mapa   │    │ Solicitudes│    │ Perfil  │              │
│  │  🗺️     │    │   📋       │    │   👤    │              │
│  └────┬────┘    └──────┬─────┘    └────┬────┘              │
│       │                │               │                    │
│       ▼                ▼               ▼                    │
│  ┌─────────┐    ┌────────────┐    ┌─────────┐              │
│  │MapView  │    │RequestList │    │Profile  │              │
│  │         │    │            │    │View     │              │
│  │[Markers]│    │[Cards]     │    │         │              │
│  │         │    │            │    │[Stats]  │              │
│  │[Bottom  │    │[Filter]    │    │[Badges] │              │
│  │ Sheet]  │    │            │    │         │              │
│  └─────────┘    └────────────┘    └─────────┘              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Comportamiento de tabs:**
- Cada tab mantiene su propio stack de navegación
- Cambiar de tab no pierde el estado del tab anterior
- Tap en tab activo: scroll to top / refresh

### 2.3 Navegación Dentro de Cada Tab

#### Tab: Mapa

```
┌─────────────────────────────────────────────────────────────┐
│                        MAPA TAB                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    MAP VIEW                           │  │
│  │                                                       │  │
│  │  [📍 Banco 1]  [📍 Banco 2]  [📍 Hospital]           │  │
│  │                                                       │  │
│  │  [📍 Banco 3]                                         │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │           BOTTOM SHEET                       │     │  │
│  │  │  Nombre: Banco Central de Sangre            │     │  │
│  │  │  Dirección: Av. Principal 123               │     │  │
│  │  │  Horario: Lun-Vie 8:00-18:00                │     │  │
│  │  │  Teléfono: +1 234 567 890                   │     │  │
│  │  │  Distancia: 2.3 km                          │     │  │
│  │  │                                              │     │  │
│  │  │  Inventario:                                │     │  │
│  │  │  A+ [████████] 8 unidades                   │     │  │
│  │  │  O- [██] 2 unidades (CRÍTICO)               │     │  │
│  │  │  ...                                        │     │  │
│  │  │                                              │     │  │
│  │  │  [📞 Llamar]  [🗺️ Cómo llegar]              │     │  │
│  │  └─────────────────────────────────────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [🔍 Filtros]  [📍 Mi ubicación]                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Interacciones:**
- Tap en marcador → Abre bottom sheet con detalles
- Swipe up en bottom sheet → Expande a pantalla completa
- Tap en "Cómo llegar" → Abre Google Maps / Apple Maps
- Tap en "Llamar" → Inicia llamada telefónica
- Tap en filtros → Modal de filtros

#### Tab: Solicitudes

```
┌─────────────────────────────────────────────────────────────┐
│                    SOLICITUDES TAB                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Solicitudes de Sangre                               │  │
│  │                                                       │  │
│  │  [Todas] [Compatibles] [Mis respuestas]              │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │  🚨 CRÍTICO                                  │     │  │
│  │  │  Hospital General                            │     │  │
│  │  │  Necesita: 3 unidades de O-                  │     │  │
│  │  │  Deadline: Hoy 18:00                         │     │  │
│  │  │  Distancia: 5.2 km                           │     │  │
│  │  │                                              │     │  │
│  │  │  [Quiero donar]                              │     │  │
│  │  └─────────────────────────────────────────────┘     │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │  ⚠️ ALTO                                     │     │  │
│  │  │  Clínica Santa María                         │     │  │
│  │  │  Necesita: 2 unidades de A+                  │     │  │
│  │  │  Deadline: Mañana 12:00                      │     │  │
│  │  │  Distancia: 8.1 km                           │     │  │
│  │  │                                              │     │  │
│  │  │  [Quiero donar]                              │     │  │
│  │  └─────────────────────────────────────────────┘     │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Interacciones:**
- Tap en solicitud → Abre detalle completo
- Tap en "Quiero donar" → Modal de confirmación
- Pull to refresh → Actualiza lista
- Tabs de filtro → Cambia vista

**Detalle de solicitud:**

```
┌─────────────────────────────────────────────────────────────┐
│                    DETALLE SOLICITUD                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ← Volver                                                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  🚨 SOLICITUD CRÍTICA                                 │  │
│  │                                                       │  │
│  │  Hospital General                                     │  │
│  │  Av. de la Salud 456                                  │  │
│  │                                                       │  │
│  │  Tipo de sangre: O-                                   │  │
│  │  Unidades necesarias: 3                               │  │
│  │  Fecha límite: Hoy 18:00                              │  │
│  │                                                       │  │
│  │  Notas:                                               │  │
│  │  Paciente en cirugía, se necesita urgente             │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │  Compatibilidad con tu tipo (O-):            │     │  │
│  │  │  ✅ Eres donante universal                   │     │  │
│  │  │  ✅ Tu sangre es compatible                  │     │  │
│  │  └─────────────────────────────────────────────┘     │  │
│  │                                                       │  │
│  │  [📞 Contactar hospital]                             │  │
│  │  [🗺️ Ver en mapa]                                    │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │        [QUIERO DONAR]                        │     │  │
│  │  └─────────────────────────────────────────────┘     │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Tab: Perfil

```
┌─────────────────────────────────────────────────────────────┐
│                      PERFIL TAB                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │              [👤 Avatar]                              │  │
│  │                                                       │  │
│  │              Juan Pérez                               │  │
│  │              📍 Quito, Pichincha                      │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │           O-                                 │     │  │
│  │  │      Donante Universal                       │     │  │
│  │  └─────────────────────────────────────────────┘     │  │
│  │                                                       │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐              │  │
│  │  │   12    │  │  3.6L   │  │   36    │              │  │
│  │  │Donacion.│  │ Donada  │  │ Vidas   │              │  │
│  │  └─────────┘  └─────────┘  └─────────┘              │  │
│  │                                                       │  │
│  │  Nivel: PLATA ⭐⭐⭐⭐☆                               │  │
│  │  [████████████░░░░] 12/25 donaciones                 │  │
│  │                                                       │  │
│  │  Última donación: 15 Mayo 2026                       │  │
│  │  Próxima elegible: 12 Julio 2026                     │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  [📋 Historial de donaciones]                    →   │  │
│  │  [🏆 Insignias y logros]                         →   │  │
│  │  [⚙️ Configuración]                              →   │  │
│  │  [🔔 Notificaciones]                             →   │  │
│  │  [❓ Ayuda y soporte]                             →   │  │
│  │  [🚪 Cerrar sesión]                              →   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Navegación desde perfil:**
- Historial → Pantalla de historial (push)
- Insignias → Pantalla de insignias (push)
- Configuración → Pantalla de configuración (push)
- Cerrar sesión → Modal de confirmación → Auth stack

---

## 3. Flujos de Usuario Completos

### 3.1 Flujo: Primer Uso (Onboarding)

```
┌─────────┐
│  App    │
│  Open   │
└────┬────┘
     │
     ▼
┌─────────────┐
│  Splash     │
│  Screen     │
└────┬────────┘
     │
     ▼
┌─────────────┐     ┌─────────────┐
│  ¿Tiene     │─NO─>│   Login     │
│  cuenta?    │     │   Screen    │
└────┬────────┘     └──────┬──────┘
     │ SÍ                  │
     ▼                     │
┌─────────────┐            │
│  Register   │            │
│  Screen     │            │
└────┬────────┘            │
     │                     │
     ▼                     │
┌─────────────┐            │
│  Llenar     │            │
│  formulario │            │
└────┬────────┘            │
     │                     │
     ▼                     │
┌─────────────┐            │
│  Validar    │            │
│  y enviar   │            │
└────┬────────┘            │
     │                     │
     ▼                     │
┌─────────────┐            │
│  Verificar  │            │
│  email      │            │
└────┬────────┘            │
     │                     │
     └──────────┬──────────┘
                │
                ▼
         ┌─────────────┐
         │   Mapa      │
         │   (Home)    │
         └─────────────┘
```

### 3.2 Flujo: Donante Responde a Solicitud

```
┌─────────────┐
│  Push       │
│  Notif.     │
│  "Se neces. │
│  sangre O-" │
└────┬────────┘
     │ Tap
     ▼
┌─────────────┐
│  App Open   │
│  (deeplink) │
└────┬────────┘
     │
     ▼
┌─────────────┐
│  Detalle    │
│  Solicitud  │
└────┬────────┘
     │
     ▼
┌─────────────┐
│  "Quiero    │
│   donar"    │
└────┬────────┘
     │
     ▼
┌─────────────┐
│  Modal      │
│  Confirm.   │
│             │
│  ¿Confirmar │
│  que deseas │
│  donar?     │
│             │
│  [Cancelar] │
│  [Confirmar]│
└────┬────────┘
     │ Confirmar
     ▼
┌─────────────┐
│  Loading... │
└────┬────────┘
     │
     ▼
┌─────────────┐
│  ✅ Éxito   │
│             │
│  Gracias!   │
│  El hospital│
│  te         │
│  contactará │
│             │
│  [Aceptar]  │
└────┬────────┘
     │
     ▼
┌─────────────┐
│  Volver a   │
│  Solicitudes│
└─────────────┘
```

### 3.3 Flujo: Hospital Crea Solicitud

```
┌─────────────┐
│  Hospital   │
│  Dashboard  │
└────┬────────┘
     │
     ▼
┌─────────────┐
│  [+ Nueva   │
│   Solicitud]│
└────┬────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  Formulario de Solicitud            │
│                                     │
│  Tipo de sangre: [O- ▼]            │
│                                     │
│  Unidades: [3]                      │
│                                     │
│  Prioridad:                         │
│  ○ Baja                             │
│  ○ Media                            │
│  ● Alta                             │
│  ○ Crítica                          │
│                                     │
│  Fecha límite: [Hoy 18:00]         │
│                                     │
│  Notas:                             │
│  [Paciente en cirugía...]          │
│                                     │
│  [Cancelar]        [Crear]         │
└────┬────────────────────────────────┘
     │ Crear
     ▼
┌─────────────┐
│  Validar    │
│  datos      │
└────┬────────┘
     │
     ▼
┌─────────────┐
│  Crear en   │
│  backend    │
└────┬────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  Sistema:                           │
│                                     │
│  1. Guarda solicitud                │
│  2. Busca donantes O- cercanos      │
│  3. Envía push notifications        │
│  4. Envía evento WebSocket          │
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────┐
│  ✅ Éxito   │
│             │
│  Solicitud  │
│  creada     │
│  ID: #1234  │
│             │
│  Donantes   │
│  notificados│
│  : 15       │
│             │
│  [Ver       │
│   solicitud]│
└────┬────────┘
     │
     ▼
┌─────────────┐
│  Detalle    │
│  Solicitud  │
│  (con       │
│   respuestas│
│   en vivo)  │
└─────────────┘
```

### 3.4 Flujo: Banco Actualiza Inventario

```
┌─────────────┐
│  Banco      │
│  Dashboard  │
└────┬────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  Inventario                         │
│                                     │
│  A+  [████████] 8 unidades         │
│      [-] [+]                        │
│                                     │
│  A-  [████] 4 unidades             │
│      [-] [+]                        │
│                                     │
│  B+  [██████] 6 unidades           │
│      [-] [+]                        │
│                                     │
│  B-  [██] 2 unidades ⚠️            │
│      [-] [+]                        │
│                                     │
│  AB+ [████] 4 unidades             │
│      [-] [+]                        │
│                                     │
│  AB- [██] 2 unidades ⚠️            │
│      [-] [+]                        │
│                                     │
│  O+  [██████████] 10 unidades      │
│      [-] [+]                        │
│                                     │
│  O-  [█] 1 unidad 🚨               │
│      [-] [+]                        │
│                                     │
│  [Guardar cambios]                  │
└────┬────────────────────────────────┘
     │ Guardar
     ▼
┌─────────────────────────────────────┐
│  Sistema:                           │
│                                     │
│  1. Actualiza inventario            │
│  2. Detecta O- en nivel CRÍTICO     │
│  3. Marca como crítico              │
│  4. Busca donantes O- cercanos      │
│  5. Envía alertas push              │
│  6. Actualiza mapa (marcador rojo)  │
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────┐
│  ✅ Éxito   │
│             │
│  Inventario │
│  actualizado│
│             │
│  ⚠️ Alerta  │
│  enviada a  │
│  23 donantes│
└─────────────┘
```

### 3.5 Flujo: Recuperación de Contraseña

```
┌─────────────┐
│  Login      │
│  Screen     │
└────┬────────┘
     │
     ▼
┌─────────────┐
│  "Olvidé mi │
│  contraseña"│
└────┬────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  Recuperar Contraseña               │
│                                     │
│  Ingresa tu email:                  │
│  [juan@email.com]                  │
│                                     │
│  [Enviar enlace]                    │
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────┐
│  Enviar     │
│  email con  │
│  token      │
└────┬────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  ✅ Email enviado                   │
│                                     │
│  Revisa tu bandeja de entrada       │
│  y sigue el enlace para             │
│  restablecer tu contraseña.         │
│                                     │
│  [Volver a login]                   │
└─────────────────────────────────────┘

     ... Usuario abre email y hace click en enlace ...

┌─────────────────────────────────────┐
│  Restablecer Contraseña             │
│                                     │
│  Nueva contraseña:                  │
│  [••••••••]                         │
│                                     │
│  Confirmar contraseña:              │
│  [••••••••]                         │
│                                     │
│  [Restablecer]                      │
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────┐
│  Validar    │
│  y guardar  │
└────┬────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  ✅ Contraseña restablecida         │
│                                     │
│  Ya puedes iniciar sesión con       │
│  tu nueva contraseña.               │
│                                     │
│  [Ir a login]                       │
└─────────────────────────────────────┘
```

---

## 4. Deep Links y Navegación por Notificaciones

### 4.1 Estructura de Deep Links

```
bloodconnect://map                    → Tab Mapa
bloodconnect://map/bank/:id           → Detalle de banco
bloodconnect://requests               → Tab Solicitudes
bloodconnect://requests/:id           → Detalle de solicitud
bloodconnect://profile                → Tab Perfil
bloodconnect://profile/history        → Historial de donaciones
bloodconnect://profile/badges         → Insignias
```

### 4.2 Navegación desde Notificaciones

```typescript
// Ejemplo de payload de notificación
{
  type: "EMERGENCY_REQUEST",
  title: "🚨 Se necesita sangre O-",
  body: "Hospital General necesita 3 unidades",
  data: {
    requestId: "req_123",
    bloodType: "O-",
    hospitalId: "hosp_456"
  }
}

// Manejo en la app
function handleNotification(notification) {
  const { type, data } = notification;
  
  switch (type) {
    case "EMERGENCY_REQUEST":
    case "REQUEST_RESPONSE":
      router.push(`/requests/${data.requestId}`);
      break;
    case "LOW_STOCK":
      router.push(`/map/bank/${data.bloodBankId}`);
      break;
    case "BADGE_EARNED":
      router.push("/profile/badges");
      break;
    case "ELIGIBILITY_REMINDER":
      router.push("/map");
      break;
  }
}
```

---

## 5. Estados de Carga y Error

### 5.1 Estados por Pantalla

| Pantalla | Loading | Empty | Error |
|----------|---------|-------|-------|
| Mapa | Skeleton del mapa | "No hay bancos cerca" | "Error al cargar mapa" + Retry |
| Solicitudes | Skeleton de cards | "No hay solicitudes activas" | "Error al cargar" + Retry |
| Perfil | Skeleton de perfil | N/A | "Error al cargar perfil" + Retry |
| Historial | Skeleton de lista | "Aún no has donado" | "Error al cargar" + Retry |

### 5.2 Componentes de Estado

```typescript
// Loading
<LoadingScreen message="Cargando..." />
<SkeletonCard />

// Empty
<EmptyState 
  icon="🩸"
  title="No hay solicitudes"
  message="No hay solicitudes de sangre compatibles contigo en este momento"
/>

// Error
<ErrorState
  message="Error al cargar los datos"
  onRetry={() => refetch()}
/>
```

---

## 6. Animaciones y Transiciones

### 6.1 Transiciones de Navegación

| Transición | Animación |
|------------|-----------|
| Push (nueva pantalla) | Slide from right |
| Pop (volver) | Slide to right |
| Modal | Slide from bottom |
| Tab change | Fade (instantáneo) |

### 6.2 Micro-interacciones

| Elemento | Animación |
|----------|-----------|
| Botón tap | Scale down 0.95 |
| Card tap | Elevation increase |
| Pull to refresh | Custom spinner |
| Bottom sheet | Spring animation |
| Marcador seleccionado | Bounce + scale |
| Like/Favorite | Heart burst |

---

## 7. Accesibilidad

### 7.1 Requisitos

- [ ] Todos los botones tienen `accessibilityLabel`
- [ ] Contraste de colores cumple WCAG AA (4.5:1)
- [ ] Tamaños de fuente escalables
- [ ] Soporte para lectores de pantalla
- [ ] Áreas táctiles mínimas de 44x44px
- [ ] No depender solo de color para transmitir información

### 7.2 Ejemplos

```typescript
<TouchableOpacity
  accessibilityLabel="Donar sangre"
  accessibilityHint="Te lleva al formulario para ofrecer tu sangre"
  accessibilityRole="button"
>
  <Text>Quiero donar</Text>
</TouchableOpacity>

<View
  accessibilityLabel="Nivel de sangre crítico"
  accessibilityHint="Quedan menos de 5 unidades"
>
  <Text style={{ color: 'red' }}>Crítico</Text>
</View>
```

---

## 8. Modo Offline

### 8.1 Datos Cacheados

| Dato | Estrategia | Duración |
|------|------------|----------|
| Perfil de usuario | Cache + Sync | Hasta logout |
| Lista de bancos | Stale-while-revalidate | 24 horas |
| Solicitudes | Cache first | 5 minutos |
| Inventario | Network only | N/A |

### 8.2 Comportamiento Offline

```
┌─────────────┐
│  Sin        │
│  conexión   │
└────┬────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  Banner: "Sin conexión a internet"  │
│                                     │
│  - Ver mapa: ✅ (datos cacheados)   │
│  - Ver solicitudes: ✅ (cacheadas)  │
│  - Responder solicitud: ❌          │
│  - Ver perfil: ✅ (cacheado)        │
│  - Editar perfil: ❌                │
│                                     │
│  Las acciones se encolan y se       │
│  sincronizan al recuperar conexión  │
└─────────────────────────────────────┘
```
