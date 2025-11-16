# Configuración de Autenticación Multi-Provider

## 🎯 Características Implementadas

✅ **Autenticación con Google** (OAuth)
✅ **Autenticación con GitHub** (OAuth)
✅ **Autenticación con Credenciales** (Email/Password)
✅ **Sistema de Registro de Usuarios**
✅ **Cifrado de Contraseñas** con bcrypt
✅ **Bloqueo de Cuenta** después de 5 intentos fallidos (15 minutos)
✅ **Mock de Base de Datos** en memoria

---

## 📋 Pasos para Completar la Configuración

### 1. Instalar Dependencias

```bash
npm install bcryptjs @types/bcryptjs
```

### 2. Configurar GitHub OAuth

1. Ve a: https://github.com/settings/applications/new
2. Completa el formulario:
   - **Application name**: `Next Auth App`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Haz clic en "Register application"
4. Copia el **Client ID**
5. Genera un nuevo **Client Secret** y cópialo
6. Actualiza el archivo `.env.local`:

```env
GITHUB_ID=tu_github_client_id_aqui
GITHUB_SECRET=tu_github_client_secret_aqui
```

### 3. Reiniciar el Servidor

```bash
npm run dev
```

---

## 🔐 Usuario de Prueba (Credenciales)

Para probar el login con credenciales, usa:

- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## 📝 Rutas Disponibles

- `/login` - Página de inicio de sesión (Credenciales, Google, GitHub)
- `/register` - Página de registro de nuevos usuarios
- `/dashboard` - Dashboard (requiere autenticación)
- `/profile` - Perfil del usuario (requiere autenticación)

---

## 🛡️ Seguridad Implementada

### Cifrado de Contraseñas
- Contraseñas hasheadas con bcrypt (10 rounds)
- Las contraseñas nunca se almacenan en texto plano

### Bloqueo de Cuenta
- Después de 5 intentos fallidos de login
- Cuenta bloqueada por 15 minutos
- Contador de intentos se resetea después del login exitoso

### Validaciones
- Email y contraseña obligatorios
- Contraseña mínima de 6 caracteres
- Verificación de contraseñas coincidentes en registro
- Verificación de email único

---

## 🗂️ Estructura de Archivos Creados/Modificados

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts          # ✅ Configuración de proveedores
│   │   └── register/
│   │       └── route.ts          # ✅ API de registro
│   ├── login/
│   │   └── page.tsx              # ✅ Página de login
│   ├── register/
│   │   └── page.tsx              # ✅ Página de registro
│   └── layout.tsx                # ✅ Actualizado con links
├── lib/
│   └── users.ts                  # ✅ Mock de base de datos
└── middleware.ts                 # ✅ Protección de rutas
.env.local                        # ✅ Variables de entorno
```

---

## 🧪 Cómo Probar

### 1. Login con Credenciales
1. Ve a `http://localhost:3000/login`
2. Usa las credenciales de prueba
3. Intenta con contraseña incorrecta 5 veces para ver el bloqueo

### 2. Registro de Usuario
1. Ve a `http://localhost:3000/register`
2. Completa el formulario
3. Regístrate y luego inicia sesión

### 3. Login con Google
1. Ve a `http://localhost:3000/login`
2. Haz clic en "Google"
3. Autoriza la aplicación

### 4. Login con GitHub
1. Ve a `http://localhost:3000/login`
2. Haz clic en "GitHub"
3. Autoriza la aplicación

---

## 📚 Documentación de NextAuth.js

- [Providers](https://next-auth.js.org/providers)
- [Credentials Provider](https://next-auth.js.org/providers/credentials)
- [GitHub Provider](https://next-auth.js.org/providers/github)
- [Google Provider](https://next-auth.js.org/providers/google)

---

## ⚠️ Notas Importantes

1. **Base de Datos Mock**: Los datos solo persisten mientras el servidor está corriendo
2. **Producción**: En producción, reemplaza el mock con una base de datos real (MongoDB, PostgreSQL, etc.)
3. **Variables de Entorno**: Nunca subas el archivo `.env.local` a GitHub
4. **GitHub OAuth**: Necesitas crear una aplicación OAuth en GitHub para que funcione
