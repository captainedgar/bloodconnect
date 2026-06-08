# BloodConnect - Modelo de Base de Datos

**Versión:** 1.0  
**Fecha:** Junio 2026  
**ORM:** Prisma  
**Base de datos:** PostgreSQL

---

## 1. Diagrama Entidad-Relación

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│      User        │       │    BloodBank     │       │     Hospital     │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │       │ id (PK)          │
│ email            │       │ name             │       │ name             │
│ password         │       │ address          │       │ address          │
│ firstName        │       │ latitude         │       │ latitude         │
│ lastName         │       │ longitude        │       │ longitude        │
│ phone            │       │ phone            │       │ phone            │
│ birthDate        │       │ email            │       │ email            │
│ sex              │       │ verified         │       │ verified         │
│ bloodType        │       │ createdAt        │       │ createdAt        │
│ weight           │       └────────┬─────────┘       └────────┬─────────┘
│ city             │                │                          │
│ province         │                │                          │
│ role             │                │                          │
│ avatarUrl        │                │                          │
│ level            │                │                          │
│ totalDonations   │                │                          │
│ lastDonationAt   │                │                          │
│ pushToken        │                │                          │
│ notifications    │                │                          │
│ createdAt        │                │                          │
│ updatedAt        │                │                          │
└────────┬─────────┘                │                          │
         │                          │                          │
         │                          │                          │
         │         ┌────────────────┘                          │
         │         │                                           │
         │         ▼                                           │
         │  ┌──────────────────┐                               │
         │  │    Inventory     │                               │
         │  ├──────────────────┤                               │
         │  │ id (PK)          │                               │
         │  │ bloodBankId (FK) │                               │
         │  │ bloodType        │                               │
         │  │ units            │                               │
         │  │ level            │                               │
         │  │ updatedAt        │                               │
         │  └──────────────────┘                               │
         │                                                     │
         │         ┌───────────────────────────────────────────┘
         │         │
         │         ▼
         │  ┌──────────────────┐       ┌──────────────────┐
         │  │  BloodRequest    │       │  RequestResponse │
         │  ├──────────────────┤       ├──────────────────┤
         │  │ id (PK)          │◄──────│ id (PK)          │
         │  │ hospitalId (FK)  │       │ requestId (FK)   │
         │  │ bloodType        │       │ donorId (FK)     │──┐
         │  │ unitsNeeded      │       │ status           │  │
         │  │ priority         │       │ respondedAt      │  │
         │  │ deadline         │       └──────────────────┘  │
         │  │ status           │                              │
         │  │ notes            │                              │
         │  │ createdAt        │                              │
         │  │ updatedAt        │                              │
         │  └──────────────────┘                              │
         │                                                    │
         │                                                    │
         │         ┌──────────────────┐                       │
         └────────>│     Donation     │◄──────────────────────┘
                   ├──────────────────┤
                   │ id (PK)          │
                   │ donorId (FK)     │
                   │ bloodBankId (FK) │
                   │ requestId (FK)?  │
                   │ bloodType        │
                   │ units            │
                   │ donationType     │
                   │ notes            │
                   │ donatedAt        │
                   │ createdAt        │
                   └──────────────────┘

         ┌──────────────────┐       ┌──────────────────┐
         │      Badge       │       │   UserBadge      │
         ├──────────────────┤       ├──────────────────┤
         │ id (PK)          │◄──────│ id (PK)          │
         │ name             │       │ badgeId (FK)     │
         │ description      │       │ userId (FK)      │──┐
         │ icon             │       │ earnedAt         │  │
         │ criteria         │       └──────────────────┘  │
         │ createdAt        │                              │
         └──────────────────┘                              │
                                                           │
         ┌──────────────────┐                              │
         │   Notification   │                              │
         ├──────────────────┤                              │
         │ id (PK)          │                              │
         │ userId (FK)      │──────────────────────────────┘
         │ type             │
         │ title            │
         │ body             │
         │ data             │
         │ read             │
         │ createdAt        │
         └──────────────────┘
```

---

## 2. Esquema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// ENUMS
// ============================================

enum BloodType {
  A_POSITIVE   @map("A+")
  A_NEGATIVE   @map("A-")
  B_POSITIVE   @map("B+")
  B_NEGATIVE   @map("B-")
  AB_POSITIVE  @map("AB+")
  AB_NEGATIVE  @map("AB-")
  O_POSITIVE   @map("O+")
  O_NEGATIVE   @map("O-")
}

enum Sex {
  MALE
  FEMALE
  OTHER
}

enum UserRole {
  DONOR
  RECIPIENT
  MEDICAL
  ADMIN
}

enum DonorLevel {
  BRONZE
  SILVER
  GOLD
  PLATINUM
  DIAMOND
  HERO
}

enum InventoryLevel {
  CRITICAL
  LOW
  SUFFICIENT
}

enum RequestPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum RequestStatus {
  ACTIVE
  COVERED
  EXPIRED
  CANCELLED
}

enum ResponseStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

enum DonationType {
  WHOLE_BLOOD
  PLATELETS
  PLASMA
  RED_CELLS
}

enum NotificationType {
  EMERGENCY_REQUEST
  LOW_STOCK
  ELIGIBILITY_REMINDER
  BADGE_EARNED
  LEVEL_UP
  REQUEST_RESPONSE
  SYSTEM
}

// ============================================
// MODELS
// ============================================

model User {
  id             String    @id @default(cuid())
  email          String    @unique
  password       String
  firstName      String
  lastName       String
  phone          String
  birthDate      DateTime
  sex            Sex
  bloodType      BloodType
  weight         Float
  city           String
  province       String
  role           UserRole  @default(DONOR)
  avatarUrl      String?
  level          DonorLevel @default(BRONZE)
  totalDonations Int       @default(0)
  lastDonationAt DateTime?
  pushToken      String?
  
  // Notification preferences
  notifyEmergency    Boolean @default(true)
  notifyLowStock     Boolean @default(true)
  notifyEligibility  Boolean @default(true)
  notifyNews         Boolean @default(false)
  
  emailVerified  Boolean   @default(false)
  emailVerifiedAt DateTime?
  
  isActive       Boolean   @default(true)
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  
  // Relations
  donations      Donation[]
  responses      RequestResponse[]
  badges         UserBadge[]
  notifications  Notification[]
  refreshTokens  RefreshToken[]
  
  @@map("users")
}

model RefreshToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
  
  @@map("refresh_tokens")
}

model BloodBank {
  id        String   @id @default(cuid())
  name      String
  address   String
  latitude  Float
  longitude Float
  phone     String
  email     String?
  website   String?
  
  // Operating hours (JSON for flexibility)
  // Format: { "monday": { "open": "08:00", "close": "18:00" }, ... }
  operatingHours Json?
  
  verified  Boolean  @default(false)
  verifiedAt DateTime?
  
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  inventory  Inventory[]
  donations  Donation[]
  
  @@map("blood_banks")
}

model Hospital {
  id        String   @id @default(cuid())
  name      String
  address   String
  latitude  Float
  longitude Float
  phone     String
  email     String
  
  verified  Boolean  @default(false)
  verifiedAt DateTime?
  
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  requests  BloodRequest[]
  
  @@map("hospitals")
}

model Inventory {
  id          String         @id @default(cuid())
  bloodBankId String
  bloodBank   BloodBank      @relation(fields: [bloodBankId], references: [id], onDelete: Cascade)
  bloodType   BloodType
  units       Int            @default(0)
  level       InventoryLevel @default(SUFFICIENT)
  updatedAt   DateTime       @updatedAt
  
  @@unique([bloodBankId, bloodType])
  @@map("inventory")
}

model BloodRequest {
  id          String          @id @default(cuid())
  hospitalId  String
  hospital    Hospital        @relation(fields: [hospitalId], references: [id], onDelete: Cascade)
  
  bloodType   BloodType
  unitsNeeded Int
  priority    RequestPriority @default(MEDIUM)
  deadline    DateTime
  status      RequestStatus   @default(ACTIVE)
  notes       String?
  
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  
  // Relations
  responses   RequestResponse[]
  donations   Donation[]
  
  @@index([status, bloodType, priority])
  @@index([hospitalId])
  @@map("blood_requests")
}

model RequestResponse {
  id          String         @id @default(cuid())
  requestId   String
  request     BloodRequest   @relation(fields: [requestId], references: [id], onDelete: Cascade)
  
  donorId     String
  donor       User           @relation(fields: [donorId], references: [id], onDelete: Cascade)
  
  status      ResponseStatus @default(PENDING)
  respondedAt DateTime       @default(now())
  confirmedAt DateTime?
  
  @@unique([requestId, donorId])
  @@index([requestId])
  @@index([donorId])
  @@map("request_responses")
}

model Donation {
  id           String       @id @default(cuid())
  donorId      String
  donor        User         @relation(fields: [donorId], references: [id], onDelete: Cascade)
  
  bloodBankId  String
  bloodBank    BloodBank    @relation(fields: [bloodBankId], references: [id], onDelete: Cascade)
  
  requestId    String?
  request      BloodRequest? @relation(fields: [requestId], references: [id], onDelete: SetNull)
  
  bloodType    BloodType
  units        Int          @default(1)
  donationType DonationType @default(WHOLE_BLOOD)
  notes        String?
  
  donatedAt    DateTime     @default(now())
  createdAt    DateTime     @default(now())
  
  @@index([donorId])
  @@index([bloodBankId])
  @@index([donatedAt])
  @@map("donations")
}

model Badge {
  id          String   @id @default(cuid())
  name        String   @unique
  description String
  icon        String
  criteria    Json     // { "type": "donations", "value": 5 }
  
  createdAt   DateTime @default(now())
  
  // Relations
  userBadges  UserBadge[]
  
  @@map("badges")
}

model UserBadge {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  badgeId   String
  badge     Badge    @relation(fields: [badgeId], references: [id], onDelete: Cascade)
  
  earnedAt  DateTime @default(now())
  
  @@unique([userId, badgeId])
  @@index([userId])
  @@map("user_badges")
}

model Notification {
  id        String           @id @default(cuid())
  userId    String
  user      User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type      NotificationType
  title     String
  body      String
  data      Json?            // Additional data (e.g., requestId, bloodBankId)
  
  read      Boolean          @default(false)
  readAt    DateTime?
  
  createdAt DateTime         @default(now())
  
  @@index([userId, read])
  @@index([createdAt])
  @@map("notifications")
}
```

---

## 3. Descripción de Tablas

### 3.1 User (Usuarios)

Almacena todos los usuarios del sistema: donantes, receptores, personal médico y administradores.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `email` | String | Email único para login |
| `password` | String | Contraseña hasheada con bcrypt |
| `firstName` | String | Nombre |
| `lastName` | String | Apellido |
| `phone` | String | Teléfono de contacto |
| `birthDate` | DateTime | Fecha de nacimiento (para calcular edad) |
| `sex` | Enum | Sexo biológico (relevante para donación) |
| `bloodType` | Enum | Tipo de sangre (A+, A-, B+, B-, AB+, AB-, O+, O-) |
| `weight` | Float | Peso en kg (requisito para donar: >50kg) |
| `city` | String | Ciudad de residencia |
| `province` | String | Provincia/estado |
| `role` | Enum | Rol del usuario (DONOR, RECIPIENT, MEDICAL, ADMIN) |
| `avatarUrl` | String? | URL de foto de perfil |
| `level` | Enum | Nivel de donante (BRONZE a HERO) |
| `totalDonations` | Int | Total de donaciones realizadas |
| `lastDonationAt` | DateTime? | Fecha de última donación |
| `pushToken` | String? | Token para notificaciones push |
| `notifyEmergency` | Boolean | Recibir alertas de emergencia |
| `notifyLowStock` | Boolean | Recibir alertas de stock bajo |
| `notifyEligibility` | Boolean | Recibir recordatorio de elegibilidad |
| `notifyNews` | Boolean | Recibir noticias |
| `emailVerified` | Boolean | Email verificado |
| `isActive` | Boolean | Cuenta activa (no bloqueada) |

### 3.2 RefreshToken

Almacena refresh tokens para mantener sesiones activas.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `token` | String | Token JWT (hash) |
| `userId` | String (FK) | Usuario asociado |
| `expiresAt` | DateTime | Fecha de expiración |

### 3.3 BloodBank (Bancos de Sangre)

Almacena información de bancos de sangre y centros de donación.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `name` | String | Nombre del banco |
| `address` | String | Dirección completa |
| `latitude` | Float | Latitud para mapa |
| `longitude` | Float | Longitud para mapa |
| `phone` | String | Teléfono de contacto |
| `email` | String? | Email de contacto |
| `website` | String? | Sitio web |
| `operatingHours` | Json? | Horarios de atención |
| `verified` | Boolean | Verificado por admin |
| `isActive` | Boolean | Banco activo |

### 3.4 Hospital

Almacena información de hospitales que pueden crear solicitudes.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `name` | String | Nombre del hospital |
| `address` | String | Dirección completa |
| `latitude` | Float | Latitud para mapa |
| `longitude` | Float | Longitud para mapa |
| `phone` | String | Teléfono de contacto |
| `email` | String | Email de contacto |
| `verified` | Boolean | Verificado por admin |
| `isActive` | Boolean | Hospital activo |

### 3.5 Inventory (Inventario)

Almacena el stock de sangre de cada banco, por tipo de sangre.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `bloodBankId` | String (FK) | Banco de sangre |
| `bloodType` | Enum | Tipo de sangre |
| `units` | Int | Unidades disponibles |
| `level` | Enum | Nivel (CRITICAL <5, LOW <10, SUFFICIENT >=10) |

**Restricción única:** Un banco solo puede tener un registro por tipo de sangre.

### 3.6 BloodRequest (Solicitudes de Sangre)

Almacena solicitudes de sangre creadas por hospitales.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `hospitalId` | String (FK) | Hospital solicitante |
| `bloodType` | Enum | Tipo de sangre necesario |
| `unitsNeeded` | Int | Unidades requeridas |
| `priority` | Enum | Prioridad (LOW, MEDIUM, HIGH, CRITICAL) |
| `deadline` | DateTime | Fecha límite |
| `status` | Enum | Estado (ACTIVE, COVERED, EXPIRED, CANCELLED) |
| `notes` | String? | Notas adicionales |

### 3.7 RequestResponse (Respuestas a Solicitudes)

Almacena respuestas de donantes a solicitudes de sangre.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `requestId` | String (FK) | Solicitud a la que responde |
| `donorId` | String (FK) | Donante que responde |
| `status` | Enum | Estado (PENDING, CONFIRMED, CANCELLED, COMPLETED) |
| `respondedAt` | DateTime | Fecha de respuesta |
| `confirmedAt` | DateTime? | Fecha de confirmación por hospital |

**Restricción única:** Un donante solo puede responder una vez a cada solicitud.

### 3.8 Donation (Donaciones)

Almacena historial de donaciones realizadas.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `donorId` | String (FK) | Donante |
| `bloodBankId` | String (FK) | Banco donde se donó |
| `requestId` | String? (FK) | Solicitud asociada (si aplica) |
| `bloodType` | Enum | Tipo de sangre donado |
| `units` | Int | Unidades donadas |
| `donationType` | Enum | Tipo de donación (sangre completa, plaquetas, etc.) |
| `notes` | String? | Notas |
| `donatedAt` | DateTime | Fecha de donación |

### 3.9 Badge (Insignias)

Catálogo de insignias disponibles en el sistema.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `name` | String | Nombre de la insignia |
| `description` | String | Descripción |
| `icon` | String | Icono/imagen |
| `criteria` | Json | Criterios para obtenerla |

**Ejemplo de criteria:**
```json
{ "type": "donations", "value": 5 }
{ "type": "emergency_response", "value": 1 }
{ "type": "streak", "value": 3 }
```

### 3.10 UserBadge (Insignias de Usuario)

Relación entre usuarios e insignias obtenidas.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `userId` | String (FK) | Usuario |
| `badgeId` | String (FK) | Insignia |
| `earnedAt` | DateTime | Fecha en que se obtuvo |

### 3.11 Notification (Notificaciones)

Almacena notificaciones enviadas a usuarios.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | Identificador único |
| `userId` | String (FK) | Usuario destinatario |
| `type` | Enum | Tipo de notificación |
| `title` | String | Título |
| `body` | String | Mensaje |
| `data` | Json? | Datos adicionales (IDs para navegación) |
| `read` | Boolean | Leída o no |
| `readAt` | DateTime? | Fecha de lectura |

---

## 4. Índices y Optimización

### Índices creados

```sql
-- Users
CREATE UNIQUE INDEX users_email_idx ON users(email);

-- Inventory
CREATE UNIQUE INDEX inventory_blood_bank_blood_type_idx ON inventory(blood_bank_id, blood_type);

-- Blood Requests
CREATE INDEX requests_status_blood_type_priority_idx ON blood_requests(status, blood_type, priority);
CREATE INDEX requests_hospital_idx ON blood_requests(hospital_id);

-- Request Responses
CREATE UNIQUE INDEX responses_request_donor_idx ON request_responses(request_id, donor_id);
CREATE INDEX responses_request_idx ON request_responses(request_id);
CREATE INDEX responses_donor_idx ON request_responses(donor_id);

-- Donations
CREATE INDEX donations_donor_idx ON donations(donor_id);
CREATE INDEX donations_blood_bank_idx ON donations(blood_bank_id);
CREATE INDEX donations_date_idx ON donations(donated_at);

-- Notifications
CREATE INDEX notifications_user_read_idx ON notifications(user_id, read);
CREATE INDEX notifications_date_idx ON notifications(created_at);
```

### Consultas frecuentes optimizadas

1. **Bancos cercanos:** Usar PostGIS o cálculo de distancia en aplicación
2. **Solicitudes compatibles:** Filtrar por `status=ACTIVE` y `bloodType IN (...)`
3. **Donantes para alerta:** Filtrar por `bloodType`, `isActive`, `notifyEmergency`
4. **Historial de donaciones:** Ordenar por `donatedAt DESC`

---

## 5. Seed Data (Datos de Prueba)

```typescript
// prisma/seed.ts

const badges = [
  {
    name: "Primera Donación",
    description: "Realizaste tu primera donación de sangre",
    icon: "🥉",
    criteria: { type: "donations", value: 1 },
  },
  {
    name: "5 Donaciones",
    description: "Has donado sangre 5 veces",
    icon: "🥈",
    criteria: { type: "donations", value: 5 },
  },
  {
    name: "10 Donaciones",
    description: "Has donado sangre 10 veces",
    icon: "🥇",
    criteria: { type: "donations", value: 10 },
  },
  {
    name: "25 Donaciones",
    description: "Has donado sangre 25 veces",
    icon: "🏆",
    criteria: { type: "donations", value: 25 },
  },
  {
    name: "50 Donaciones",
    description: "Has donado sangre 50 veces",
    icon: "💎",
    criteria: { type: "donations", value: 50 },
  },
  {
    name: "Héroe de Sangre",
    description: "Has donado sangre 100 veces",
    icon: "🦸",
    criteria: { type: "donations", value: 100 },
  },
  {
    name: "Donante Frecuente",
    description: "Has donado 3 veces en los últimos 6 meses",
    icon: "⭐",
    criteria: { type: "frequency", value: 3, period: "6months" },
  },
  {
    name: "Respondió a Emergencia",
    description: "Respondiste a una solicitud de emergencia",
    icon: "🆘",
    criteria: { type: "emergency_response", value: 1 },
  },
];
```

---

## 6. Migraciones

```bash
# Crear migración inicial
npx prisma migrate dev --name init

# Aplicar migraciones en producción
npx prisma migrate deploy

# Resetear base de datos (desarrollo)
npx prisma migrate reset

# Generar cliente de Prisma
npx prisma generate

# Ver base de datos
npx prisma studio
```

---

## 7. Consideraciones de Privacidad

### Datos sensibles

| Dato | Sensibilidad | Protección |
|------|--------------|------------|
| Contraseña | Alta | Hash con bcrypt |
| Email | Media | No expuesto en API pública |
| Teléfono | Media | Solo visible para hospitales con respuesta confirmada |
| Tipo de sangre | Baja | Visible en perfil público |
| Ubicación | Media | Solo se usa para calcular distancia, no se almacena historial |
| Historial médico | Alta | No se almacena, solo tipo de sangre y elegibilidad |

### GDPR / Protección de datos

- Usuario puede solicitar exportación de sus datos
- Usuario puede solicitar eliminación de su cuenta
- Datos se eliminan en cascada al eliminar usuario
- Logs de actividad se anonimizan después de 90 días
