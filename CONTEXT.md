# BloodConnect - Contexto Completo del Proyecto

**Fecha:** Junio 2026  
**Estado:** Fase 3 completada + Rediseño UI completado - Iniciando Fase 4 (Sistema SOS)  
**Última actualización:** Rediseño completo de interfaz con nueva paleta, componentes UI y 4 pantallas principales

---

## 1. Visión del Proyecto

BloodConnect es una plataforma móvil (iOS/Android) que conecta donantes de sangre, receptores, hospitales y bancos de sangre en tiempo real para reducir la escasez de sangre mediante geolocalización, notificaciones inteligentes y gestión centralizada de inventario.

**Funcionalidad diferenciadora:** Sistema inteligente que conecta donantes ↔ solicitudes ↔ hospitales ↔ bancos de sangre en tiempo real.

---

## 2. Stack Tecnológico

### Frontend
- **Framework:** React Native + Expo SDK 54
- **Lenguaje:** TypeScript
- **Navegación:** Expo Router v6
- **Estado:** Zustand + React Query
- **Formularios:** React Hook Form + Zod
- **Mapas:** react-native-maps (nativo) + iframe OpenStreetMap (web)
- **Ubicación:** expo-location
- **Notificaciones:** expo-notifications (pendiente)
- **Tiempo real:** socket.io-client (pendiente)
- **Almacenamiento:** expo-secure-store

### Backend
- **Runtime:** Node.js + Express
- **Lenguaje:** TypeScript
- **ORM:** Prisma
- **Base de datos:** PostgreSQL (Neon - serverless)
- **Autenticación:** JWT + bcrypt
- **Validación:** Zod
- **Puerto:** 3000

---

## 3. Roles del Sistema

| Rol | Descripción |
|-----|-------------|
| DONOR | Donante de sangre |
| RECIPIENT | Receptor que necesita sangre |
| HOSPITAL | Institución médica |
| BLOOD_BANK | Banco de sangre |
| ADMIN | Administrador del sistema |

---

## 4. Estado Actual del Proyecto

### ✅ Fase 0: Documentación y Diseño (Completada)
- PRD completo
- Casos de uso
- Arquitectura del sistema
- Modelo de base de datos
- Roadmap del MVP

### ✅ Fase 1: Setup y Estructura (Completada)
**Frontend:**
- Proyecto Expo SDK 54 configurado
- Estructura de carpetas (app/, components/, hooks/, services/, store/, types/, utils/)
- Navegación con tabs (index, profile, requests)
- Auth guard en app/_layout.tsx
- Alias de imports (@/)
- ESLint configurado

**Backend:**
- Proyecto Node.js + Express + TypeScript
- Prisma configurado
- Estructura de carpetas (src/controllers/, src/services/, src/routes/, src/middlewares/, src/config/, src/types/)
- CORS configurado
- Variables de entorno con validación Zod

### ✅ Fase 2: Autenticación + Modelo de Datos (Completada)
**Backend:**
- Auth con JWT (login, register, refresh)
- Middleware de autenticación
- Middleware de roles (requireRole)
- CRUD de usuarios
- Modelo de datos completo en Prisma:
  - User (con roles: DONOR, RECIPIENT, HOSPITAL, BLOOD_BANK, ADMIN)
  - Hospital
  - BloodBank
  - BloodInventory
  - BloodRequest
  - Donation
  - Appointment
- Base de datos Neon conectada y funcionando
- Seed inicial: 5 hospitales, 6 bancos de sangre, 48 registros de inventario
- Usuario de prueba: demo@bloodconnect.com / Demo1234

**Frontend:**
- Pantallas de login y registro
- Auth store con Zustand
- Interceptor de Axios con refresh automático
- Tokens persistidos en SecureStore
- Perfil básico funcional
- Logout funcional

### 🔄 Fase 3: API + Mapa Interactivo (Completada)
**Backend (Completado):**
- Endpoints CRUD para Hospitales
- Endpoints CRUD para BloodBanks
- Endpoints para BloodInventory
- Endpoint GET /blood-banks/nearby con geolocalización (Haversine)
- Filtros por radio y tipo de sangre
- Middleware requireRole para control de acceso
- Typecheck pasa sin errores

**Frontend (Completado):**
- Hook useLocation para obtener ubicación GPS
- Hooks useBloodBanks, useNearbyBloodBanks, useHospitals
- Servicios de API para hospitales y bancos
- Mapa interactivo con componentes separados:
  - components/map/MobileMap.tsx (react-native-maps nativo)
  - components/map/WebMap.tsx (iframe OpenStreetMap)
- Filtros por tipo de sangre
- Bottom sheet con información del banco
- Botones "Cómo llegar" y "Llamar"
- Indicadores de color por stock (verde/amarillo/rojo)
- Typecheck y lint pasan sin errores

**Build de Android (Completado):**
- Actualizado react-native-screens a 4.25.2
- Build en progreso con New Architecture habilitada
- Variables de entorno configuradas (JAVA_HOME, ANDROID_HOME)

### ✅ Fase 3.5: Rediseño de UI/UX (Completada)
**Nuevo Sistema de Diseño:**
- Paleta de colores actualizada:
  - Primario: Rojo vibrante (#E52B2B) para acciones y urgencia
  - Modo claro: Fondo blanco (#FFFFFF) con sombras suaves
  - Modo oscuro SOS: Azul marino profundo (#081026) para emergencias
  - Indicadores: Verde (#27AE60), Amarillo (#F2994A), Rojo (#EB5757)
- Sistema de espaciado basado en grid de 8px (xs, sm, md, lg, xl, xxl)
- Border radius consistente (8px, 12px, 16px, 24px, full)
- Sombras sutiles para profundidad (sm, md, lg)
- Tipografía: Inter/Poppins con pesos bien definidos

**Componentes UI Reutilizables (components/ui/):**
- `button.tsx` - Botones con variantes (primary, secondary, outline, ghost) y tamaños (sm, md, lg)
- `card.tsx` - Tarjetas con sombras y modo oscuro
- `badge.tsx` - Badges de estado (success, warning, danger, info)
- `progress-bar.tsx` - Barras de progreso con colores automáticos
- `search-bar.tsx` - Barra de búsqueda con botón de filtro
- `blood-drop-icon.tsx` - Icono de gota de sangre con estados
- `index.ts` - Exports centralizados

**Nueva Navegación:**
- Bottom navigation con 4 tabs: Home, Map, SOS, Profile
- Barra de navegación azul oscuro (#081026)
- Iconos minimalistas con estado activo en rojo
- Tab SOS con icono destacado en círculo rojo

**Pantallas Rediseñadas:**

1. **Home (app/(tabs)/home.tsx):**
   - Logo BloodConnect con eslogan "Every Drop Makes a Difference"
   - Selector de tipo de sangre en grid 2x4 con estados visuales
   - Banner de perfil con invitación a completar
   - Stats cards: Donaciones del mes, Donantes activos
   - CTA principal: "Ready to Save Lives"

2. **Map (app/(tabs)/map.tsx):**
   - Barra de búsqueda superior con botón de filtro
   - Filtros rápidos horizontales por tipo de sangre
   - Placeholder de mapa con pines de preview
   - Leyenda de colores (Low Stock / Good Stock)
   - Lista de bancos cercanos con estado de stock

3. **SOS (app/(tabs)/sos.tsx):**
   - Modo oscuro completo (#081026)
   - Botón de pánico central con efecto pulsante (animación)
   - Contador de donantes respondiendo con avatares superpuestos
   - Lista de solicitudes urgentes con:
     - Icono de gota con tipo de sangre
     - Nombre del hospital y tiempo transcurrido
     - Unidades necesarias y badge "Urgent"
     - Distancia al banco

4. **Bank Details (app/bank-details.tsx):**
   - Cabecera con botón de retroceso y favoritos
   - Tarjeta del hospital con imagen placeholder
   - Inventario en tiempo real con barras de progreso
   - Cada tipo de sangre muestra: gota de color, tipo, barra, unidades, estado
   - Botones de acción: "Get Directions" y "Call Hospital"

---

## 5. Problemas Técnicos Encontrados y Soluciones

### Problema 1: Metro bundler crash en web
**Error:** `Cannot read properties of undefined (reading 'map')` en LogContext.tsx  
**Causa:** Bug de @expo/metro-runtime con React 19 en web  
**Solución:** Desactivar LogBox en web con `LogBox.ignoreAllLogs(true)` en app/_layout.tsx

### Problema 2: node_modules no instalado
**Error:** GET http://localhost:8081/ 500 (Internal Server Error)  
**Causa:** Metro no podía resolver dependencias porque node_modules no existía  
**Solución:** Ejecutar `npm install` en la raíz del proyecto

### Problema 3: react-native-maps en web
**Error:** `Importing native-only module react-native/Libraries/Utilities/codegenNativeCommands on web`  
**Causa:** react-native-maps usa módulos nativos que no existen en web  
**Solución:** Separar en componentes independientes:
- components/map/WebMap.tsx (usa iframe, NO importa react-native-maps)
- components/map/MobileMap.tsx (usa react-native-maps)
- app/(tabs)/index.tsx decide qué cargar según Platform.OS

### Problema 4: Login no funciona desde Android
**Error:** Error de conexión al intentar login  
**Causa:** API apuntaba a localhost:3000, pero desde Android localhost es el propio dispositivo  
**Solución:** Crear .env en raíz con `EXPO_PUBLIC_API_URL=http://10.0.2.2:3000` (IP especial del emulador)

### Problema 5: CORS bloquea peticiones
**Error:** CORS policy bloquea peticiones desde el emulador  
**Causa:** CORS solo aceptaba localhost:8081  
**Solución:** Actualizar CORS para aceptar múltiples orígenes:
- http://localhost:8081
- http://10.0.2.2:8081
- http://localhost:8082
- http://10.0.2.2:8082

### Problema 6: Mapa negro en Android
**Error:** Mapa se renderiza en negro  
**Causa:** Falta API key de Google Maps  
**Solución:** Agregar configuración en app.json:
```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "TU_API_KEY"
    }
  }
}
```

### Problema 7: react-native-maps plugin error
**Error:** `Unable to resolve a valid config plugin for react-native-maps`  
**Causa:** react-native-maps no tiene config plugin de Expo  
**Solución:** Remover del array de plugins en app.json, dejar solo configuración directa

### Problema 8: Gradle no encuentra JDK
**Error:** `No Java compiler found, please ensure you are running Gradle with a JDK`  
**Causa:** JAVA_HOME no configurado o apuntaba a Java 8  
**Solución:** Configurar JAVA_HOME al JDK de Android Studio:
```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
```

### Problema 9: Gradle no encuentra Android SDK
**Error:** `SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable`  
**Causa:** ANDROID_HOME no configurado  
**Solución:**
```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
```

### Problema 10: react-native-screens linker error
**Error:** Undefined symbols en buildCMakeDebug[arm64-v8a]  
**Causa:** Incompatibilidad de react-native-screens 4.16.0 con New Architecture  
**Solución:** Actualizar a react-native-screens@4.25.2 con --legacy-peer-deps

### Problema 11: react-native-worklets requiere New Architecture
**Error:** `Worklets require new architecture to be enabled`  
**Causa:** react-native-worklets no funciona sin New Architecture  
**Solución:** Mantener newArchEnabled: true en app.json (no desactivar)

---

## 6. Configuración de Entorno

### Variables de Entorno del Frontend (.env en raíz)
```
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

### Variables de Entorno del Backend (backend/.env)
```
DATABASE_URL="postgresql://neondb_owner:npg_LkWd0sA3lBgh@ep-calm-rice-apb3tq06-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require"
JWT_SECRET="your-super-secret-key-change-in-production"
JWT_REFRESH_SECRET="your-refresh-secret-key-change-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=3000
NODE_ENV=development
CORS_ORIGIN="http://localhost:8081,http://10.0.2.2:8081,http://localhost:8082,http://10.0.2.2:8082"
```

### Variables de Entorno para Build de Android
```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
```

### Comandos Importantes
```bash
# Frontend
npm start                    # Iniciar Expo
npx expo start --clear       # Iniciar con caché limpio
npx expo run:android         # Build Android nativo
npx tsc --noEmit             # Typecheck
npm run lint                 # Lint

# Backend
cd backend
npm run dev                  # Iniciar servidor
npm run typecheck            # Typecheck
npm run db:push              # Sincronizar schema con Neon
npm run db:seed              # Ejecutar seed
npm run db:studio            # Abrir Prisma Studio
```

---

## 7. Roadmap Completo

### ✅ Fase 0: Documentación y Diseño (Completada)
### ✅ Fase 1: Setup y Estructura (Completada)
### ✅ Fase 2: Autenticación + Modelo de Datos (Completada)
### ✅ Fase 3: API + Mapa Interactivo (Completada)
### ✅ Fase 3.5: Rediseño de UI/UX (Completada)

### 🔄 Fase 4: Sistema SOS Completo (PRÓXIMA - En Progreso)
**Backend (Pendiente):**
- Modelo `BloodRequest` con estados: PENDING, ACCEPTED, IN_PROGRESS, COMPLETED, CANCELLED
- Modelo `RequestResponse` para tracking de donantes que responden
- Endpoint `POST /requests/sos` - Crear solicitud de emergencia
- Endpoint `GET /requests/urgent` - Listar solicitudes urgentes cercanas (filtro por radio)
- Endpoint `POST /requests/:id/respond` - Donante acepta responder
- Endpoint `GET /requests/:id/responders` - Listar donantes respondiendo
- Endpoint `PATCH /requests/:id/status` - Actualizar estado de solicitud
- Validación de compatibilidad sanguínea automática
- Cálculo de distancia con Haversine

**Frontend (Completado - UI lista, falta integración):**
- Pantalla SOS con botón pulsante y animación
- Lista de solicitudes urgentes con datos mock
- Contador de donantes respondiendo
- Falta: Conectar con API real, WebSocket para actualizaciones en tiempo real

### 🔜 Fase 5: Estadísticas y Dashboard (Pendiente)
**Backend:**
- Endpoint `GET /stats/dashboard` - Estadísticas generales
  - Donaciones del mes
  - Donantes activos
  - Bancos registrados
  - Solicitudes completadas
- Agregar campos al modelo User: `phone`, `address`, `dateOfBirth`, `profileImage`
- Endpoint `PATCH /users/profile` - Actualizar perfil extendido

**Frontend:**
- Conectar stats cards de Home con API real
- Formulario de perfil extendido
- Validación de campos opcionales

### 🔜 Fase 6: Notificaciones y Favoritos (Pendiente)
**Backend:**
- Modelo `Notification` con tipos: SOS_ALERT, REQUEST_UPDATE, DONATION_REMINDER
- Modelo `Favorite` para bancos favoritos
- Endpoints de notificaciones:
  - `GET /notifications` - Listar notificaciones del usuario
  - `GET /notifications/unread-count` - Contador de no leídas
  - `PATCH /notifications/:id/read` - Marcar como leída
  - `PATCH /notifications/read-all` - Marcar todas como leídas
- Endpoints de favoritos:
  - `POST /favorites/:bankId` - Agregar banco a favoritos
  - `DELETE /favorites/:bankId` - Quitar de favoritos
  - `GET /favorites` - Listar favoritos del usuario
- Integración con Expo Push Notifications

**Frontend:**
- Badge de notificaciones en SOS (UI lista, falta integración)
- Botón de favoritos en Bank Details (UI lista, falta integración)
- Pantalla de lista de notificaciones
- Pantalla de bancos favoritos
- Permisos de notificaciones push

### 🔜 Fase 7: Inventario Avanzado (Pendiente)
- Backend: Alertas automáticas de stock bajo, predicción de demanda
- Frontend: Dashboard de inventario para bancos de sangre
- Gráficos de tendencias de inventario

### 🔜 Fase 8: Citas y Donaciones (Pendiente)
- Backend: CRUD Citas, CRUD Donaciones, registro y verificación
- Frontend: Agendar cita, historial de donaciones, flujo de donación
- Sistema de recordatorios

### 🔜 Fase 9: Gamificación y Recompensas (Pendiente)
- Backend: Sistema de insignias, niveles de donante, puntos
- Frontend: Historial con gráficos, insignias, progreso de nivel
- Logros desbloqueables (primera donación, 5 donaciones, etc.)

### 🔜 Fase 10: Dashboards por Rol - Móvil (Pendiente)
- Dashboard de banco (inventario, donaciones, citas)
- Dashboard de hospital (solicitudes, respuestas, métricas)
- Dashboard de administrador (usuarios, hospitales, bancos, métricas globales)

### 🔜 Fase 11: Tiempo Real con WebSocket (Pendiente)
- Backend: Socket.io para actualizaciones en tiempo real
- Frontend: Listeners para solicitudes SOS, respuestas, cambios de inventario
- Indicadores de "en línea" y "escribiendo"

### 🔜 Fase 12: Versión Web - Sección Pública (Pendiente)
**Objetivo:** Landing pública accesible desde navegador sin necesidad de instalar la app.

**Páginas públicas:**
- Landing page con información de BloodConnect y CTA para descargar la app
- Mapa web interactivo (OpenStreetMap/Leaflet) para buscar bancos de sangre cercanos
- Vista de detalles de banco (inventario público, ubicación, horarios)
- Información sobre tipos de sangre y compatibilidad
- Blog/recursos sobre donación de sangre

**Tecnología:**
- React Native Web (ya configurada en el proyecto)
- Leaflet o Mapbox GL JS para mapas web (reemplazar iframe actual)
- SEO optimizado para buscadores

### 🔜 Fase 13: Versión Web - Dashboard Administrativo (Pendiente)
**Objetivo:** Panel de gestión web para bancos de sangre, hospitales y administradores.

**Dashboard de Banco de Sangre:**
- Gestión de inventario en tiempo real (CRUD completo)
- Vista de solicitudes SOS recibidas y estado de respuestas
- Gestión de citas programadas
- Métricas: donaciones por período, tipos más solicitados, tendencias
- Exportación de reportes (PDF/Excel)

**Dashboard de Hospital:**
- Crear y gestionar solicitudes de sangre (SOS)
- Ver donantes que respondieron a sus solicitudes
- Historial de solicitudes y donaciones recibidas
- Métricas de tiempo de respuesta

**Dashboard de Administrador:**
- Gestión de usuarios (ver, bloquear, cambiar roles)
- Gestión de hospitales y bancos de sangre (CRUD)
- Métricas globales del sistema
- Logs de actividad
- Configuración del sistema

**Tecnología:**
- React Native Web + componentes web-specific
- Gráficos: Victory Native o react-chartjs-2
- Tablas: TanStack Table para datos complejos
- Autenticación con roles (middleware requireRole ya existe)

### 🔜 Fase 14: Testing, Optimización y Deploy (Pendiente)
- Tests unitarios, integración y E2E
- Optimización de rendimiento y bundle size
- EAS Build para iOS/Android
- Deploy backend (Railway/Render)
- Deploy web (Vercel/Netlify)
- Submit a App Store y Google Play
- Monitoreo y analytics

---

## 8. Estructura de Archivos

```
bloodconnect/
├── app/
│   ├── _layout.tsx              # Root layout con auth guard
│   ├── bank-details.tsx         # Detalles del banco de sangre (nuevo)
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx            # Pantalla de login
│   │   └── register.tsx         # Pantalla de registro
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation con 4 tabs (actualizado)
│   │   ├── index.tsx            # Redirige a Home
│   │   ├── home.tsx             # Pantalla Home/Onboarding (nuevo)
│   │   ├── map.tsx              # Mapa y búsqueda de bancos (nuevo)
│   │   ├── sos.tsx              # SOS de emergencia modo oscuro (nuevo)
│   │   ├── profile.tsx          # Perfil de usuario
│   │   └── requests.tsx         # Solicitudes (placeholder - oculto)
│   └── modal.tsx
├── components/
│   ├── map/
│   │   ├── MobileMap.tsx        # Mapa nativo (react-native-maps)
│   │   └── WebMap.tsx           # Mapa web (iframe OpenStreetMap)
│   ├── ui/                      # Componentes UI reutilizables (nuevo)
│   │   ├── index.ts             # Exports centralizados
│   │   ├── button.tsx           # Botones con variantes
│   │   ├── card.tsx             # Tarjetas con sombras
│   │   ├── badge.tsx            # Badges de estado
│   │   ├── progress-bar.tsx     # Barras de progreso
│   │   ├── search-bar.tsx       # Barra de búsqueda
│   │   └── blood-drop-icon.tsx  # Icono de gota de sangre
│   ├── haptic-tab.tsx
│   ├── themed-text.tsx
│   └── themed-view.tsx
├── constants/
│   └── theme.ts                 # Paleta de colores actualizada (nuevo)
├── hooks/
│   ├── use-location.ts          # Hook para ubicación GPS
│   ├── use-blood-banks.ts       # Hooks para bancos de sangre
│   ├── use-hospitals.ts         # Hooks para hospitales
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── services/
│   ├── api.ts                   # Cliente Axios con interceptor
│   ├── auth-service.ts          # API de autenticación
│   ├── blood-bank-service.ts    # API de bancos de sangre
│   ├── hospital-service.ts      # API de hospitales
│   └── secure-store.ts          # Manejo de tokens
├── store/
│   └── auth-store.ts            # Zustand store de autenticación
├── types/
│   └── index.ts                 # Tipos TypeScript compartidos
├── utils/
│   └── blood-compatibility.ts   # Lógica de compatibilidad sanguínea
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Schema de base de datos
│   │   ├── seed.ts              # Datos iniciales
│   │   └── migrations/
│   ├── src/
│   │   ├── app.ts               # Configuración de Express
│   │   ├── server.ts            # Inicio del servidor
│   │   ├── config/
│   │   │   ├── env.ts           # Validación de variables de entorno
│   │   │   └── prisma.ts        # Cliente Prisma
│   │   ├── controllers/
│   │   │   ├── auth-controller.ts
│   │   │   ├── user-controller.ts
│   │   │   ├── hospital-controller.ts
│   │   │   ├── blood-bank-controller.ts
│   │   │   └── blood-inventory-controller.ts
│   │   ├── services/
│   │   │   ├── auth-service.ts
│   │   │   ├── user-service.ts
│   │   │   ├── hospital-service.ts
│   │   │   ├── blood-bank-service.ts
│   │   │   └── blood-inventory-service.ts
│   │   ├── routes/
│   │   │   ├── auth-routes.ts
│   │   │   ├── user-routes.ts
│   │   │   ├── hospital-routes.ts
│   │   │   ├── blood-bank-routes.ts
│   │   │   └── blood-inventory-routes.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts          # Middleware de autenticación + requireRole
│   │   │   ├── error-handler.ts
│   │   │   └── validate.ts      # Validación con Zod
│   │   └── types/
│   │       └── index.ts         # Tipos TypeScript del backend
│   ├── .env                     # Variables de entorno del backend
│   └── package.json
├── docs/
│   ├── 01-PRD.md
│   ├── 02-Casos-de-Uso.md
│   ├── 03-Arquitectura.md
│   ├── 04-Base-de-Datos.md
│   ├── 05-Navegacion-y-Flujos.md
│   └── 06-Roadmap-MVP.md
├── .env                         # Variables de entorno del frontend
├── app.json                     # Configuración de Expo
├── package.json
└── tsconfig.json
```

---

## 9. Endpoints de API Implementados

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión
- `POST /auth/refresh` - Refrescar token

### Usuarios
- `GET /users/me` - Obtener usuario actual (requiere auth)

### Hospitales
- `GET /hospitals` - Listar todos los hospitales
- `GET /hospitals/:id` - Obtener hospital por ID
- `POST /hospitals` - Crear hospital (ADMIN)
- `PATCH /hospitals/:id` - Actualizar hospital (ADMIN, HOSPITAL)
- `DELETE /hospitals/:id` - Eliminar hospital (ADMIN)

### Bancos de Sangre
- `GET /blood-banks` - Listar todos los bancos
- `GET /blood-banks/nearby` - Bancos cercanos (query: latitude, longitude, radius, bloodType)
- `GET /blood-banks/:id` - Obtener banco por ID
- `POST /blood-banks` - Crear banco (ADMIN)
- `PATCH /blood-banks/:id` - Actualizar banco (ADMIN, BLOOD_BANK)
- `DELETE /blood-banks/:id` - Eliminar banco (ADMIN)

### Inventario
- `GET /inventory/critical` - Inventario crítico (<10 unidades)
- `GET /inventory/:bloodBankId` - Inventario de un banco
- `PATCH /inventory/:bloodBankId/:bloodType` - Actualizar stock (ADMIN, BLOOD_BANK)

### Endpoints Pendientes (Fase 4 - SOS)
- `POST /requests/sos` - Crear solicitud de emergencia
- `GET /requests/urgent` - Listar solicitudes urgentes cercanas (query: latitude, longitude, radius, bloodType)
- `GET /requests/:id` - Obtener solicitud por ID
- `POST /requests/:id/respond` - Donante acepta responder a solicitud
- `GET /requests/:id/responders` - Listar donantes que respondieron
- `PATCH /requests/:id/status` - Actualizar estado de solicitud
- `GET /requests/my-requests` - Mis solicitudes creadas
- `GET /requests/my-responses` - Solicitudes a las que respondí

### Endpoints Pendientes (Fase 5 - Estadísticas)
- `GET /stats/dashboard` - Estadísticas generales (donaciones del mes, donantes activos, etc.)
- `PATCH /users/profile` - Actualizar perfil extendido (phone, address, dateOfBirth, profileImage)

### Endpoints Pendientes (Fase 6 - Notificaciones y Favoritos)
- `GET /notifications` - Listar notificaciones del usuario
- `GET /notifications/unread-count` - Contador de notificaciones no leídas
- `PATCH /notifications/:id/read` - Marcar notificación como leída
- `PATCH /notifications/read-all` - Marcar todas como leídas
- `POST /favorites/:bankId` - Agregar banco a favoritos
- `DELETE /favorites/:bankId` - Quitar banco de favoritos
- `GET /favorites` - Listar bancos favoritos del usuario

---

## 10. Decisiones Arquitectónicas Clave

1. **Separación de mapas por plataforma:** WebMap y MobileMap en archivos separados para evitar que react-native-maps se cargue en web
2. **Conditional import con require():** Para cargar MobileMap solo en plataformas nativas
3. **CORS con múltiples orígenes:** Para soportar web, emulador Android y dispositivos físicos
4. **IP especial del emulador:** 10.0.2.2 para acceder a localhost desde Android Studio
5. **New Architecture habilitada:** Requerida por react-native-worklets
6. **Base de datos serverless:** Neon PostgreSQL para evitar mantener servidor local
7. **Tokens en SecureStore:** Para persistencia segura de sesión
8. **Interceptor de Axios:** Para refresh automático de tokens en 401
9. **Sistema de diseño modular:** Componentes UI reutilizables con variantes y tamaños
10. **Modo oscuro contextual:** Solo la pantalla SOS usa modo oscuro para crear contraste de urgencia
11. **Animaciones nativas:** Uso de Animated API para efectos de pulso en botón SOS
12. **Navegación de 4 tabs:** Home, Map, SOS, Profile para flujo intuitivo de usuario
13. **Estrategia web dual:** La versión web tendrá dos propósitos:
    - **Sección pública:** Landing + mapa para visitantes sin necesidad de app
    - **Dashboard administrativo:** Panel de gestión para bancos, hospitales y admins
    - Esto permite maximizar el alcance (SEO + accesibilidad) mientras se mantiene la app móvil como experiencia principal para donantes

---

## 11. Próximos Pasos Inmediatos

1. **Fase 4: Sistema SOS Completo**
   - Backend: Crear modelos BloodRequest y RequestResponse en Prisma
   - Backend: Implementar endpoints CRUD de solicitudes SOS
   - Backend: Agregar validación de compatibilidad sanguínea
   - Frontend: Crear servicio API para solicitudes (request-service.ts)
   - Frontend: Crear hook useBloodRequests
   - Frontend: Conectar pantalla SOS con API real
   - Frontend: Reemplazar datos mock con datos reales

2. **Fase 5: Estadísticas y Dashboard**
   - Backend: Crear endpoint de estadísticas agregadas
   - Backend: Agregar campos opcionales al modelo User
   - Frontend: Conectar stats cards de Home con API
   - Frontend: Crear formulario de perfil extendido

3. **Fase 6: Notificaciones y Favoritos**
   - Backend: Crear modelos Notification y Favorite
   - Backend: Implementar endpoints de notificaciones y favoritos
   - Backend: Integrar Expo Push Notifications
   - Frontend: Conectar badge de notificaciones
   - Frontend: Conectar botón de favoritos
   - Frontend: Crear pantallas de notificaciones y favoritos

---

## 12. Credenciales de Prueba

```
Email: demo@bloodconnect.com
Password: Demo1234
Tipo de sangre: O+
Rol: Donante
```

---

## 13. Notas Importantes para IA

- **Siempre ejecutar typecheck y lint** después de cambios
- **Backend y frontend tienen node_modules separados**
- **Para build de Android, configurar JAVA_HOME y ANDROID_HOME en cada sesión de PowerShell**
- **Neon puede pausar la base de datos** si está inactiva, verificar en console.neon.tech
- **El firewall del trabajo puede bloquear** conexiones a dispositivos móviles
- **react-native-maps NO funciona en web**, usar WebMap con iframe
- **New Architecture NO se puede desactivar** porque react-native-worklets la requiere
- **Código en inglés, UI strings en español**
- **Componentes UI son reutilizables** - usar siempre los de components/ui/ en lugar de crear nuevos
- **La paleta de colores está centralizada** en constants/theme.ts - no usar colores hardcoded
- **El sistema de espaciado es de 8px** - usar Spacing.xs (4), sm (8), md (16), lg (24), xl (32), xxl (48)

---

## 14. Sistema de Diseño UI

### Paleta de Colores
```typescript
// Colores principales
primary: '#E52B2B'        // Rojo vibrante - acciones y urgencia
primaryDark: '#C41E1E'    // Rojo oscuro - hover/pressed
primaryLight: '#FF5252'   // Rojo claro - acentos

// Colores de estado
success: '#27AE60'        // Verde - stock bueno
warning: '#F2994A'        // Naranja - stock bajo
danger: '#EB5757'         // Rojo - stock crítico

// Modo oscuro SOS
sosBackground: '#081026'  // Azul marino profundo
sosSurface: '#1A2342'     // Azul marino claro para tarjetas
```

### Componentes UI Disponibles
- **Button**: variant (primary|secondary|outline|ghost), size (sm|md|lg), fullWidth, loading, icon
- **Card**: elevated, dark (para modo SOS)
- **Badge**: variant (success|warning|danger|info|default), size (sm|md)
- **ProgressBar**: value, maxValue, color automático según porcentaje
- **SearchBar**: value, onChangeText, placeholder, onFilterPress
- **BloodDropIcon**: label, size (sm|md|lg), color, selected

### Niveles de Stock y Colores
- **Good Stock** (≥20 unidades): Verde (#27AE60)
- **Low Stock** (10-19 unidades): Naranja (#F2994A)
- **Critical** (<10 unidades): Rojo (#EB5757)

### Espaciado (Grid de 8px)
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

### Border Radius
- sm: 8px (botones pequeños, badges)
- md: 12px (cards pequeñas)
- lg: 16px (cards principales)
- xl: 24px (bottom sheets, modales)
- full: 9999px (botones redondeados, avatares)

### Sombras
- sm: Elevación sutil (search bars, chips)
- md: Elevación media (cards, botones principales)
- lg: Elevación alta (bottom sheets, modales)
