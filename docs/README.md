# BloodConnect - Documentación Técnica

**Versión:** 1.0  
**Fecha:** Junio 2026  
**Plataforma:** iOS, Android (React Native + Expo)

---

## Índice de Documentos

| # | Documento | Descripción |
|---|-----------|-------------|
| 01 | [PRD](./01-PRD.md) | Product Requirements Document - Visión, usuarios, funcionalidades y métricas de éxito |
| 02 | [Casos de Uso](./02-Casos-de-Uso.md) | Casos de uso detallados por actor (donante, hospital, admin, sistema) |
| 03 | [Arquitectura](./03-Arquitectura.md) | Arquitectura del sistema, estructura de carpetas, API endpoints, patrones de diseño |
| 04 | [Base de Datos](./04-Base-de-Datos.md) | Modelo de datos, esquema Prisma, descripción de tablas, índices |
| 05 | [Navegación y Flujos](./05-Navegacion-y-Flujos.md) | Estructura de navegación, flujos de usuario, deep links, estados |
| 06 | [Roadmap MVP](./06-Roadmap-MVP.md) | Plan de desarrollo por fases, tareas detalladas, criterios de aceptación |

---

## Resumen del Proyecto

**BloodConnect** es una plataforma móvil que conecta donantes de sangre, receptores, hospitales y bancos de sangre en un ecosistema unificado.

### Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | React Native + Expo SDK 54 + TypeScript |
| **Navegación** | Expo Router v6 |
| **Estado** | Zustand + React Query |
| **Backend** | Node.js + Express + TypeScript |
| **Base de Datos** | PostgreSQL + Prisma |
| **Autenticación** | JWT + Refresh Tokens |
| **Mapas** | React Native Maps + Expo Location |
| **Notificaciones** | Expo Notifications |
| **Tiempo Real** | Socket.io |
| **Despliegue** | Expo EAS (frontend) + Railway/Render (backend) |

### Funcionalidades del MVP

1. **Autenticación** - Registro, login, recuperación de contraseña
2. **Perfil** - Ver y editar perfil, estadísticas
3. **Mapa** - Bancos de sangre y hospitales cercanos con inventario
4. **Solicitudes** - Crear y responder solicitudes de sangre
5. **Inventario** - Gestión de stock con alertas de nivel crítico
6. **Notificaciones** - Push notifications para emergencias
7. **Historial** - Registro de donaciones y estadísticas
8. **Recompensas** - Gamificación con niveles e insignias

### Roles de Usuario

| Rol | Descripción |
|-----|-------------|
| **Donante** | Persona que dona sangre regularmente |
| **Receptor** | Paciente que necesita sangre |
| **Hospital** | Institución que crea solicitudes de sangre |
| **Banco de Sangre** | Centro que gestiona inventario |
| **Admin** | Administrador del sistema |

---

## Estructura del Proyecto

```
bloodconnect/
├── app/                        # Rutas de Expo Router
│   ├── (auth)/                 #   Login y registro
│   ├── (tabs)/                 #   Navegación principal
│   └── _layout.tsx             #   Layout raíz
├── features/                   # Lógica por dominio
│   ├── auth/                   #   Autenticación
│   ├── map/                    #   Mapa y geolocalización
│   ├── donations/              #   Donaciones
│   ├── requests/               #   Solicitudes
│   ├── profile/                #   Perfil
│   └── rewards/                #   Recompensas
├── components/                 # Componentes UI reutilizables
├── services/                   # Servicios globales (API, socket)
├── store/                      # Estado global (Zustand)
├── hooks/                      # Hooks globales
├── types/                      # Tipos TypeScript
├── utils/                      # Funciones utilitarias
├── constants/                  # Constantes (tema, colores)
└── assets/                     # Recursos estáticos
```

---

## Comandos

```bash
# Desarrollo
npm start                       # Iniciar servidor de desarrollo
npm run android                 # Ejecutar en Android
npm run ios                     # Ejecutar en iOS
npm run web                     # Ejecutar en web

# Calidad
npm run lint                    # Verificar ESLint
npx tsc --noEmit                # Verificar TypeScript

# Base de datos (backend)
npx prisma migrate dev          # Crear migración
npx prisma migrate deploy       # Aplicar migraciones
npx prisma generate             # Generar cliente
npx prisma studio               # Ver base de datos

# Build
eas build --platform android    # Build Android
eas build --platform ios        # Build iOS
```

---

## Convenciones

### Código

- **Idioma:** Inglés para código, español para UI
- **Estilo:** Prettier + ESLint (configuración de Expo)
- **Tipos:** TypeScript estricto
- **Componentes:** Funcionales con hooks
- **Estilos:** StyleSheet de React Native

### Git

- **Branches:** `feature/nombre`, `fix/nombre`, `hotfix/nombre`
- **Commits:** Convencional (feat:, fix:, docs:, etc.)
- **PRs:** Requieren review antes de merge

### Nombres

- **Archivos:** kebab-case (`blood-compatibility.ts`)
- **Componentes:** PascalCase (`BloodBankMap.tsx`)
- **Hooks:** camelCase con `use` (`useBloodBanks`)
- **Tipos:** PascalCase (`BloodType`, `UserRole`)
- **Constantes:** UPPER_SNAKE_CASE (`API_BASE_URL`)

---

## Estado del Proyecto

| Fase | Estado | Progreso |
|------|--------|----------|
| Fase 0: Documentación | ✅ Completada | 100% |
| Fase 1: Setup | 🔄 En progreso | 70% |
| Fase 2: Autenticación | ⏳ Pendiente | 0% |
| Fase 3: Mapa | ⏳ Pendiente | 0% |
| Fase 4: Solicitudes | ⏳ Pendiente | 0% |
| Fase 5: Inventario | ⏳ Pendiente | 0% |
| Fase 6: Notificaciones | ⏳ Pendiente | 0% |
| Fase 7: Historial y Recompensas | ⏳ Pendiente | 0% |
| Fase 8: Testing y Lanzamiento | ⏳ Pendiente | 0% |

**Progreso total:** ~10%

---

## Próximos Pasos

1. Completar Fase 1 (setup del backend)
2. Iniciar Fase 2 (autenticación)
3. Implementar backend de auth
4. Implementar frontend de auth
5. Probar flujo completo de registro/login

---

## Contacto

Para preguntas o sugerencias sobre esta documentación, contactar al equipo de desarrollo.
