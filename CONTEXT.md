# BloodConnect - Contexto Completo del Proyecto

**Fecha:** Junio 2026  
**Estado:** Fase 3 en progreso (API + Mapa Interactivo)  
**Última actualización:** Build de Android en progreso con react-native-screens actualizado

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

### 🔄 Fase 3: API + Mapa Interactivo (En Progreso)
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

**Build de Android (En Progreso):**
- Actualizado react-native-screens a 4.25.2
- Build en progreso con New Architecture habilitada
- Variables de entorno configuradas (JAVA_HOME, ANDROID_HOME)

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

### Fase 3: API + Mapa Interactivo (En Progreso)
**Backend:** ✅ Completado
**Frontend:** ✅ Completado
**Build Android:** 🔄 En progreso

### Fase 4: Solicitudes de Sangre (SOS)
- Backend: CRUD Solicitudes, filtro por compatibilidad, estados
- Frontend: Botón SOS, formulario de solicitud, lista de solicitudes compatibles, responder a solicitud

### Fase 5: Inventario de Bancos
- Backend: Actualizar stock, calcular niveles, alertas automáticas
- Frontend: Vista de inventario para bancos, indicadores de color

### Fase 6: Citas y Donaciones
- Backend: CRUD Citas, CRUD Donaciones, registro y verificación
- Frontend: Agendar cita, historial de donaciones, flujo de donación

### Fase 7: Notificaciones Push + Tiempo Real
- Backend: Expo Push Notifications, WebSocket (Socket.io)
- Frontend: Permisos, listeners, navegación desde notificación

### Fase 8: Historial, Recompensas y Perfil Completo
- Backend: Estadísticas, insignias, niveles de donante
- Frontend: Historial con gráficos, insignias, progreso de nivel, perfil editable

### Fase 9: Dashboards por Rol
- Dashboard de banco (inventario, donaciones, citas)
- Dashboard de hospital (solicitudes, respuestas, métricas)
- Dashboard de administrador (usuarios, hospitales, bancos, métricas globales)

### Fase 10: Testing, Optimización y Deploy
- Tests funcionales, rendimiento, seguridad
- EAS Build para iOS/Android
- Deploy backend (Railway/Render)
- Submit a App Store y Google Play

---

## 8. Estructura de Archivos

```
bloodconnect/
├── app/
│   ├── _layout.tsx              # Root layout con auth guard
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx            # Pantalla de login
│   │   └── register.tsx         # Pantalla de registro
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx            # Mapa interactivo
│   │   ├── profile.tsx          # Perfil de usuario
│   │   └── requests.tsx         # Solicitudes (placeholder)
│   └── modal.tsx
├── components/
│   ├── map/
│   │   ├── MobileMap.tsx        # Mapa nativo (react-native-maps)
│   │   └── WebMap.tsx           # Mapa web (iframe OpenStreetMap)
│   ├── haptic-tab.tsx
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui/
├── constants/
│   └── theme.ts
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

---

## 11. Próximos Pasos Inmediatos

1. **Completar build de Android** con react-native-screens actualizado
2. **Verificar que el mapa funcione** en el emulador con Google Maps API key
3. **Iniciar Fase 4: Solicitudes de Sangre (SOS)**
   - Backend: CRUD de BloodRequest con estados y filtros
   - Frontend: Botón SOS, formulario, lista de solicitudes compatibles

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
- ** react-native-maps NO funciona en web**, usar WebMap con iframe
- **New Architecture NO se puede desactivar** porque react-native-worklets la requiere
- **Código en inglés, UI strings en español**
