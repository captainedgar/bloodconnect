# BloodConnect - Arquitectura del Sistema

**Versión:** 1.0  
**Fecha:** Junio 2026

---

## 1. Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTES                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │ iOS App  │  │Android   │  │ Web App  │  (futuro)            │
│  │          │  │  App     │  │          │                      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                      │
│       │              │              │                            │
│       └──────────────┼──────────────┘                            │
│                      │                                           │
└──────────────────────┼───────────────────────────────────────────┘
                       │ HTTPS / WSS
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Node.js + Express)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Auth      │  │   REST API  │  │  WebSocket  │             │
│  │   Module    │  │   Routes    │  │   Server    │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          │                                       │
│  ┌───────────────────────┼───────────────────────┐              │
│  │              Business Logic Layer              │              │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐         │              │
│  │  │  Auth   │ │  Blood  │ │  Users  │  ...    │              │
│  │  │ Service │ │ Service │ │ Service │         │              │
│  │  └─────────┘ └─────────┘ └─────────┘         │              │
│  └───────────────────────┬───────────────────────┘              │
│                          │                                       │
│  ┌───────────────────────┼───────────────────────┐              │
│  │              Data Access Layer (Prisma)        │              │
│  └───────────────────────┬───────────────────────┘              │
│                          │                                       │
└──────────────────────────┼───────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BASE DE DATOS (PostgreSQL)                    │
└─────────────────────────────────────────────────────────────────┘
                           │
┌──────────────────────────┼───────────────────────────────────────┐
│              SERVICIOS EXTERNOS                                  │
├──────────────────────────┼───────────────────────────────────────┤
│  ┌─────────────┐  ┌──────┴──────┐  ┌─────────────┐             │
│  │   Expo      │  │   Expo      │  │   Email     │             │
│  │  Push Notif │  │  Location   │  │  (SendGrid) │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Arquitectura del Frontend (React Native + Expo)

### 2.1 Estructura de Carpetas

```
bloodconnect/
├── app/                        # Expo Router - Rutas de la app
│   ├── (auth)/                 #   Grupo de autenticación (sin tabs)
│   │   ├── _layout.tsx         #     Stack layout para auth
│   │   ├── login.tsx           #     Pantalla de login
│   │   └── register.tsx        #     Pantalla de registro
│   ├── (tabs)/                 #   Grupo de tabs (navegación principal)
│   │   ├── _layout.tsx         #     Tab layout (Mapa, Solicitudes, Perfil)
│   │   ├── index.tsx           #     Tab Mapa
│   │   ├── requests.tsx        #     Tab Solicitudes
│   │   └── profile.tsx         #     Tab Perfil
│   ├── _layout.tsx             #   Root layout (Stack principal)
│   └── modal.tsx               #   Modal global
│
├── features/                   # Lógica por dominio (feature-based)
│   ├── auth/                   #   Autenticación
│   │   ├── components/         #     Componentes de auth (LoginForm, RegisterForm)
│   │   ├── hooks/              #     Hooks de auth (useLogin, useRegister)
│   │   ├── services/           #     API calls de auth
│   │   └── schemas/            #     Zod schemas para validación
│   │
│   ├── map/                    #   Mapa y geolocalización
│   │   ├── components/         #     MapView, Markers, BottomSheet
│   │   ├── hooks/              #     useLocation, useBloodBanks
│   │   └── services/           #     API calls de bancos
│   │
│   ├── donations/              #   Donaciones
│   │   ├── components/         #     DonationCard, DonationHistory
│   │   ├── hooks/              #     useDonations, useDonationStats
│   │   └── services/           #     API calls de donaciones
│   │
│   ├── requests/               #   Solicitudes de sangre
│   │   ├── components/         #     RequestCard, RequestForm, RequestList
│   │   ├── hooks/              #     useRequests, useCreateRequest
│   │   └── services/           #     API calls de solicitudes
│   │
│   ├── profile/                #   Perfil de usuario
│   │   ├── components/         #     ProfileCard, EditProfileForm
│   │   ├── hooks/              #     useProfile, useUpdateProfile
│   │   └── services/           #     API calls de perfil
│   │
│   └── rewards/                #   Recompensas y gamificación
│       ├── components/         #     BadgeCard, LevelProgress
│       ├── hooks/              #     useRewards, useBadges
│       └── services/           #     API calls de recompensas
│
├── components/                 # Componentes UI reutilizables
│   ├── ui/                     #   Componentes base (Button, Input, Card)
│   ├── layout/                 #   Componentes de layout (Container, Header)
│   └── shared/                 #   Componentes compartidos (Loading, Error)
│
├── services/                   # Servicios globales
│   ├── api.ts                  #   Instancia de Axios
│   ├── socket.ts               #   Cliente de Socket.io
│   └── storage.ts              #   Wrapper de SecureStore
│
├── store/                      # Estado global (Zustand)
│   ├── auth-store.ts           #   Estado de autenticación
│   ├── map-store.ts            #   Estado del mapa
│   └── notification-store.ts   #   Estado de notificaciones
│
├── hooks/                      # Hooks globales
│   ├── use-color-scheme.ts     #   Detectar modo claro/oscuro
│   └── use-theme-color.ts      #   Obtener color del tema
│
├── types/                      # Tipos TypeScript globales
│   └── index.ts                #   User, BloodType, UserRole, etc.
│
├── utils/                      # Funciones utilitarias
│   ├── blood-compatibility.ts  #   Lógica de compatibilidad
│   ├── formatters.ts           #   Formateo de fechas, números
│   └── validators.ts           #   Validaciones compartidas
│
├── constants/                  # Constantes de la app
│   └── theme.ts                #   Colores, fuentes, espaciado
│
└── assets/                     # Recursos estáticos
    ├── images/                 #   Imágenes
    └── fonts/                  #   Fuentes personalizadas
```

### 2.2 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                        UI (Pantallas)                        │
│  app/(tabs)/index.tsx, app/(auth)/login.tsx, etc.           │
└────────────────────────┬────────────────────────────────────┘
                         │ usa
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Feature Components                         │
│  features/auth/components/LoginForm.tsx                     │
│  features/map/components/BloodBankMap.tsx                   │
└────────────────────────┬────────────────────────────────────┘
                         │ usa
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Feature Hooks                             │
│  features/auth/hooks/useLogin.ts                            │
│  features/map/hooks/useBloodBanks.ts                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  useQuery / useMutation (React Query)               │   │
│  │  - Maneja cache, loading, error                     │   │
│  │  - Refetch automático                               │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ llama a
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Feature Services                           │
│  features/auth/services/auth-api.ts                         │
│  features/map/services/map-api.ts                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  services/api.ts (Axios instance)                   │   │
│  │  - Interceptores para auth                          │   │
│  │  - Manejo de errores global                         │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP requests
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend API                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Estado Global (Zustand)

**¿Cuándo usar Zustand vs React Query?**

| Situación | Usar |
|-----------|------|
| Datos del servidor (API) | React Query |
| Estado de UI global (modales, toasts) | Zustand |
| Datos de autenticación (user, tokens) | Zustand |
| Cache de datos con refetch | React Query |
| Estado efímero de formularios | useState local |

**Stores definidos:**

```typescript
// store/auth-store.ts
interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setAuth: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
}

// store/map-store.ts (futuro)
interface MapState {
  selectedBank: BloodBank | null;
  filters: MapFilters;
  setSelectedBank: (bank: BloodBank | null) => void;
  setFilters: (filters: MapFilters) => void;
}

// store/notification-store.ts (futuro)
interface NotificationState {
  unreadCount: number;
  notifications: Notification[];
  addNotification: (notif: Notification) => void;
  markAsRead: (id: string) => void;
}
```

### 2.4 Navegación (Expo Router)

**Estructura de rutas:**

```
/                       → Redirige a /(tabs) o /(auth)/login
/(tabs)                 → Tab navigator (requiere auth)
  /(tabs)/              → Mapa (index)
  /(tabs)/requests      → Solicitudes
  /(tabs)/profile       → Perfil
/(auth)                 → Auth navigator (sin auth)
  /(auth)/login         → Login
  /(auth)/register      → Registro
/modal                  → Modal global
```

**Protección de rutas:**

```typescript
// app/_layout.tsx
export default function RootLayout() {
  const { isAuthenticated } = useAuthStore();
  
  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  
  // Si está autenticado, mostrar tabs
  return <Stack />;
}
```

---

## 3. Arquitectura del Backend (Node.js + Express)

### 3.1 Estructura de Carpetas

```
backend/
├── src/
│   ├── config/                 # Configuración
│   │   ├── database.ts         #   Conexión a PostgreSQL
│   │   ├── env.ts              #   Variables de entorno
│   │   └── socket.ts           #   Configuración de Socket.io
│   │
│   ├── modules/                # Módulos por dominio
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.middleware.ts
│   │   │   └── auth.schemas.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.routes.ts
│   │   │   └── users.schemas.ts
│   │   │
│   │   ├── blood-banks/
│   │   │   ├── blood-banks.controller.ts
│   │   │   ├── blood-banks.service.ts
│   │   │   ├── blood-banks.routes.ts
│   │   │   └── blood-banks.schemas.ts
│   │   │
│   │   ├── requests/
│   │   │   ├── requests.controller.ts
│   │   │   ├── requests.service.ts
│   │   │   ├── requests.routes.ts
│   │   │   └── requests.schemas.ts
│   │   │
│   │   ├── donations/
│   │   │   ├── donations.controller.ts
│   │   │   ├── donations.service.ts
│   │   │   ├── donations.routes.ts
│   │   │   └── donations.schemas.ts
│   │   │
│   │   ├── inventory/
│   │   │   ├── inventory.controller.ts
│   │   │   ├── inventory.service.ts
│   │   │   ├── inventory.routes.ts
│   │   │   └── inventory.schemas.ts
│   │   │
│   │   └── notifications/
│   │       ├── notifications.controller.ts
│   │       ├── notifications.service.ts
│   │       ├── notifications.routes.ts
│   │       └── notifications.schemas.ts
│   │
│   ├── shared/                 # Código compartido
│   │   ├── middleware/
│   │   │   ├── auth.ts         #   Verificar JWT
│   │   │   ├── validate.ts     #   Validar requests con Zod
│   │   │   └── error-handler.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts          #   Generar/verificar tokens
│   │   │   ├── password.ts     #   Hash de contraseñas
│   │   │   └── blood.ts        #   Lógica de compatibilidad
│   │   └── types/
│   │       └── index.ts
│   │
│   ├── jobs/                   # Tareas programadas
│   │   ├── eligibility-reminder.ts
│   │   ├── expire-requests.ts
│   │   └── calculate-levels.ts
│   │
│   ├── app.ts                  # Configuración de Express
│   └── server.ts               # Inicio del servidor
│
├── prisma/
│   ├── schema.prisma           # Esquema de base de datos
│   ├── migrations/             # Migraciones
│   └── seed.ts                 # Datos de prueba
│
├── tests/                      # Tests
│   ├── unit/
│   └── integration/
│
├── package.json
├── tsconfig.json
└── .env
```

### 3.2 Capas de la Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                      Routes Layer                            │
│  Define endpoints HTTP                                       │
│  POST /api/auth/login                                       │
│  GET /api/blood-banks                                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Middleware Layer                           │
│  - auth.middleware: Verifica JWT                             │
│  - validate.middleware: Valida body con Zod                  │
│  - error-handler.middleware: Maneja errores globalmente      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Controller Layer                           │
│  - Recibe request, retorna response                          │
│  - Llama al service correspondiente                          │
│  - No contiene lógica de negocio                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                             │
│  - Contiene lógica de negocio                                │
│  - Orquesta múltiples operaciones                            │
│  - Llama al repository (Prisma)                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Data Access Layer                          │
│  - Prisma ORM                                                │
│  - Queries a base de datos                                   │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 API Endpoints

#### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | ❌ |
| POST | `/api/auth/login` | Iniciar sesión | ❌ |
| POST | `/api/auth/refresh` | Refrescar token | 🔄 |
| POST | `/api/auth/logout` | Cerrar sesión | ✅ |
| POST | `/api/auth/forgot-password` | Solicitar recuperación | ❌ |
| POST | `/api/auth/reset-password` | Restablecer contraseña | ❌ |
| POST | `/api/auth/verify-email` | Verificar email | ❌ |

#### Usuarios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/me` | Obtener perfil propio | ✅ |
| PATCH | `/api/users/me` | Actualizar perfil propio | ✅ |
| GET | `/api/users/:id` | Obtener usuario por ID | ✅ |
| GET | `/api/users/donors` | Listar donantes (filtros) | ✅ |

#### Bancos de Sangre

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/blood-banks` | Listar bancos (con filtros) | ✅ |
| GET | `/api/blood-banks/nearby` | Bancos cercanos a ubicación | ✅ |
| GET | `/api/blood-banks/:id` | Detalle de banco | ✅ |
| POST | `/api/blood-banks` | Crear banco | 🏥 |
| PATCH | `/api/blood-banks/:id` | Actualizar banco | 🏥 |

#### Inventario

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/blood-banks/:id/inventory` | Ver inventario de banco | ✅ |
| PATCH | `/api/blood-banks/:id/inventory` | Actualizar inventario | 🏥 |
| GET | `/api/inventory/critical` | Bancos con stock crítico | ✅ |

#### Solicitudes

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/requests` | Listar solicitudes | ✅ |
| GET | `/api/requests/compatible` | Solicitudes compatibles conmigo | ✅ |
| GET | `/api/requests/:id` | Detalle de solicitud | ✅ |
| POST | `/api/requests` | Crear solicitud | 🏥 |
| PATCH | `/api/requests/:id` | Actualizar solicitud | 🏥 |
| POST | `/api/requests/:id/respond` | Responder a solicitud | ✅ |
| GET | `/api/requests/:id/responses` | Ver respuestas | 🏥 |

#### Donaciones

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/donations/me` | Mi historial de donaciones | ✅ |
| POST | `/api/donations` | Registrar donación | 🏥 |
| GET | `/api/donations/stats` | Mis estadísticas | ✅ |

#### Recompensas

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/rewards/me` | Mis recompensas | ✅ |
| GET | `/api/rewards/badges` | Lista de insignias | ✅ |

**Leyenda de Auth:**
- ❌ = No requiere autenticación
- ✅ = Requiere autenticación (JWT)
- 🔄 = Requiere refresh token
- 🏥 = Requiere rol de hospital/admin

### 3.4 Eventos WebSocket

```typescript
// Eventos del servidor al cliente
interface ServerToClientEvents {
  'request:new': (request: BloodRequest) => void;
  'request:updated': (request: BloodRequest) => void;
  'inventory:critical': (data: { bankId: string; bloodType: BloodType }) => void;
  'notification': (notification: Notification) => void;
}

// Eventos del cliente al servidor
interface ClientToServerEvents {
  'join:location': (data: { lat: number; lng: number }) => void;
  'leave:location': () => void;
}
```

---

## 4. Autenticación y Seguridad

### 4.1 Flujo de Autenticación

```
┌──────────┐                              ┌──────────┐
│  Cliente │                              │  Backend │
└────┬─────┘                              └────┬─────┘
     │                                         │
     │  POST /auth/login {email, password}     │
     │────────────────────────────────────────>│
     │                                         │
     │  {accessToken, refreshToken, user}      │
     │<────────────────────────────────────────│
     │                                         │
     │  Guardar tokens en SecureStore          │
     │  Guardar user en Zustand                │
     │                                         │
     │  GET /api/users/me                      │
     │  Authorization: Bearer <accessToken>    │
     │────────────────────────────────────────>│
     │                                         │
     │  {user}                                 │
     │<────────────────────────────────────────│
     │                                         │
     │  ... accessToken expira (15 min) ...    │
     │                                         │
     │  GET /api/users/me                      │
     │  Authorization: Bearer <expired>        │
     │────────────────────────────────────────>│
     │                                         │
     │  401 Unauthorized                       │
     │<────────────────────────────────────────│
     │                                         │
     │  POST /auth/refresh {refreshToken}      │
     │────────────────────────────────────────>│
     │                                         │
     │  {accessToken, refreshToken}            │
     │<────────────────────────────────────────│
     │                                         │
     │  Reintentar request original            │
     │────────────────────────────────────────>│
     │                                         │
     │  {user}                                 │
     │<────────────────────────────────────────│
```

### 4.2 Configuración de Tokens

```typescript
// JWT Access Token
{
  expiresIn: '15m',           // Corta duración por seguridad
  payload: { userId, role }
}

// Refresh Token
{
  expiresIn: '7d',            // Larga duración para UX
  payload: { userId, tokenVersion }
}
```

### 4.3 Interceptor de Axios para Refresh Automático

```typescript
// services/api.ts
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = await getRefreshToken();
        const { accessToken } = await refreshAccessToken(refreshToken);
        
        await saveAccessToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh falló, cerrar sesión
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

---

## 5. Patrones de Diseño

### 5.1 Feature-Based Architecture

**Principio:** Cada feature (auth, map, donations) es autocontenida.

**Beneficios:**
- Fácil de encontrar código relacionado
- Fácil de eliminar features sin romper otras
- Escalable a múltiples desarrolladores

**Estructura de una feature:**

```
features/auth/
├── components/          # UI específica de auth
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── hooks/               # Hooks específicos de auth
│   ├── useLogin.ts
│   └── useRegister.ts
├── services/            # API calls de auth
│   └── auth-api.ts
├── schemas/             # Validaciones Zod
│   └── auth.schemas.ts
└── index.ts             # Export público
```

### 5.2 Custom Hooks con React Query

```typescript
// features/requests/hooks/useRequests.ts
export function useRequests() {
  return useQuery({
    queryKey: ['requests'],
    queryFn: () => requestsApi.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: requestsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
}
```

### 5.3 Repository Pattern (Backend)

```typescript
// modules/users/users.repository.ts
export class UsersRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
  
  async create(data: CreateUserInput): Promise<User> {
    return prisma.user.create({ data });
  }
}
```

---

## 6. Consideraciones de Rendimiento

### 6.1 Frontend

| Técnica | Implementación |
|---------|----------------|
| Lazy loading de imágenes | `expo-image` con placeholder |
| Memoización | `React.memo`, `useMemo`, `useCallback` |
| Virtualización de listas | `FlashList` en lugar de `FlatList` |
| Cache de datos | React Query con `staleTime` |
| Reducción de re-renders | Zustand con selectors |

### 6.2 Backend

| Técnica | Implementación |
|---------|----------------|
| Índices de BD | En campos de búsqueda frecuente |
| Paginación | Cursor-based para listas largas |
| Rate limiting | `express-rate-limit` |
| Compresión | `compression` middleware |
| Connection pooling | Prisma con pool configurado |

---

## 7. Despliegue

### 7.1 Frontend (Expo EAS)

```bash
# Build para producción
eas build --platform android --profile production
eas build --platform ios --profile production

# Submit a stores
eas submit --platform android
eas submit --platform ios
```

### 7.2 Backend (Railway/Render)

```yaml
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
healthcheckPath = "/health"
restartPolicyType = "ON_FAILURE"
```

### 7.3 Base de Datos (PostgreSQL)

- **Desarrollo:** PostgreSQL local con Docker
- **Producción:** PostgreSQL managed (Railway, Supabase, o Neon)
- **Backups:** Automáticos diarios

---

## 8. Monitoreo y Logging

### 8.1 Frontend

- **Crash reporting:** Sentry
- **Analytics:** Firebase Analytics o PostHog
- **Performance:** Expo Application Services

### 8.2 Backend

- **Logging:** Winston + Logtail
- **APM:** New Relic o Datadog
- **Uptime:** UptimeRobot

---

## 9. Seguridad

### 9.1 Checklist

- [ ] HTTPS en todos los endpoints
- [ ] Contraseñas hasheadas con bcrypt (cost 12)
- [ ] JWT con expiración corta (15 min)
- [ ] Refresh tokens en SecureStore
- [ ] Validación de input con Zod
- [ ] Rate limiting en endpoints sensibles
- [ ] CORS configurado correctamente
- [ ] Variables de entorno en `.env` (no en código)
- [ ] Sanitización de queries SQL (Prisma lo hace automáticamente)
- [ ] Headers de seguridad (Helmet)
