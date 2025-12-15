# Inicio Rápido - Waves VIP

## ⚠️ Requisito Previo: Instalar Node.js

Antes de continuar, necesitas tener Node.js instalado. Si ves el error `npm no se reconoce`, sigue la guía:

👉 **Ver `INSTALACION_NODEJS.md` para instalar Node.js**

## 🚀 Pasos Rápidos

### 1. Instalar Node.js (Si no lo tienes)

Sigue la guía completa en `INSTALACION_NODEJS.md` o:

1. Descarga desde: https://nodejs.org/ (versión LTS)
2. Instala el archivo `.msi`
3. **Importante**: Cierra y abre una nueva PowerShell

### 2. Verificar Instalación

Abre una nueva PowerShell y ejecuta:

```powershell
node --version
npm --version
```

Si ves las versiones, ¡perfecto! Si no, revisa `INSTALACION_NODEJS.md`.

### 3. Instalar Dependencias

Navega al directorio del proyecto:

```powershell
cd "C:\Users\Administrator\Desktop\WAVES VIP"
npm install
```

Esto puede tardar 2-5 minutos la primera vez.

### 4. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```powershell
# Copia el archivo de ejemplo
copy env.example.txt .env.local
```

Luego edita `.env.local` con tus credenciales (ver `SETUP_GUIDE.md`).

### 5. Ejecutar el Proyecto

```powershell
npm run dev
```

Abre tu navegador en: http://localhost:3000

## ✅ Checklist de Verificación

- [ ] Node.js instalado (`node --version` funciona)
- [ ] npm instalado (`npm --version` funciona)
- [ ] Dependencias instaladas (`npm install` completado)
- [ ] Variables de entorno configuradas (`.env.local` creado)
- [ ] Servidor ejecutándose (`npm run dev` funciona)

## 🆘 Si Tienes Problemas

1. **Error "npm no se reconoce"**: Ver `INSTALACION_NODEJS.md`
2. **Error de dependencias**: Elimina `node_modules` y ejecuta `npm install` de nuevo
3. **Error de puerto ocupado**: Cambia el puerto en `.env.local`: `PORT=3001`
4. **Error de variables de entorno**: Verifica que `.env.local` existe y tiene todas las variables

## 📚 Documentación Completa

- `INSTALACION_NODEJS.md` - Guía detallada de instalación de Node.js
- `SETUP_GUIDE.md` - Guía completa de configuración
- `SETUP_GOOGLE_CALENDAR.md` - Configuración de Google Calendar
- `README.md` - Documentación principal

---

**¡Una vez que Node.js esté instalado, el proyecto estará listo para ejecutarse!**













