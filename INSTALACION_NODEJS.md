# Guía de Instalación de Node.js en Windows

## 🚨 Problema

El comando `npm` no se reconoce porque Node.js no está instalado en tu sistema Windows.

## ✅ Solución: Instalar Node.js

### Opción 1: Instalación desde el Sitio Oficial (Recomendado)

1. **Descargar Node.js**:
   - Ve a [https://nodejs.org/](https://nodejs.org/)
   - Descarga la versión **LTS (Long Term Support)** - Recomendada para la mayoría de usuarios
   - Selecciona el instalador para Windows (`.msi`)

2. **Ejecutar el Instalador**:
   - Haz doble clic en el archivo descargado (ej: `node-v20.x.x-x64.msi`)
   - Sigue el asistente de instalación:
     - ✅ Acepta los términos y condiciones
     - ✅ **IMPORTANTE**: Deja marcada la opción "Automatically install the necessary tools" o "Add to PATH"
     - ✅ Haz clic en "Install"

3. **Verificar la Instalación**:
   - Abre una **nueva** ventana de PowerShell (cierra y abre de nuevo)
   - Ejecuta estos comandos:

```powershell
node --version
npm --version
```

Deberías ver las versiones instaladas (ej: `v20.11.0` y `10.2.4`)

### Opción 2: Instalación usando Winget (Windows 10/11)

Si tienes Windows 10 o 11 con Winget instalado:

```powershell
winget install OpenJS.NodeJS.LTS
```

Luego cierra y abre una nueva PowerShell.

### Opción 3: Instalación usando Chocolatey

Si tienes Chocolatey instalado:

```powershell
choco install nodejs-lts
```

Luego cierra y abre una nueva PowerShell.

## 🔄 Después de Instalar

### 1. Cerrar y Reabrir PowerShell

**MUY IMPORTANTE**: Después de instalar Node.js, debes:
- Cerrar completamente la ventana de PowerShell actual
- Abrir una nueva ventana de PowerShell
- Navegar nuevamente al directorio del proyecto:

```powershell
cd "C:\Users\Administrator\Desktop\WAVES VIP"
```

### 2. Verificar la Instalación

```powershell
node --version
npm --version
```

### 3. Instalar las Dependencias del Proyecto

Una vez que Node.js esté instalado correctamente:

```powershell
npm install
```

Este comando instalará todas las dependencias necesarias para el proyecto Waves VIP.

## 🐛 Solución de Problemas

### Problema: "npm no se reconoce" después de instalar

**Solución 1**: Reiniciar PowerShell
- Cierra completamente PowerShell
- Abre una nueva ventana
- Prueba nuevamente

**Solución 2**: Verificar Variables de Entorno
1. Presiona `Win + R`
2. Escribe: `sysdm.cpl` y presiona Enter
3. Ve a la pestaña "Opciones avanzadas"
4. Haz clic en "Variables de entorno"
5. En "Variables del sistema", busca `Path`
6. Verifica que contenga: `C:\Program Files\nodejs\`
7. Si no está, agrega esta ruta

**Solución 3**: Reinstalar Node.js
- Desinstala Node.js desde "Agregar o quitar programas"
- Descarga e instala nuevamente
- Asegúrate de marcar la opción "Add to PATH"

### Problema: Permisos de Administrador

Si tienes problemas de permisos, ejecuta PowerShell como Administrador:
1. Busca "PowerShell" en el menú de inicio
2. Haz clic derecho y selecciona "Ejecutar como administrador"

## 📋 Versión Recomendada

Para este proyecto, se recomienda:
- **Node.js**: Versión 18 o superior (LTS)
- **npm**: Se instala automáticamente con Node.js

## ✅ Verificación Final

Después de la instalación, ejecuta estos comandos para verificar:

```powershell
# Verificar Node.js
node --version
# Debería mostrar: v20.x.x o v18.x.x

# Verificar npm
npm --version
# Debería mostrar: 10.x.x o 9.x.x

# Verificar npx (incluido con npm)
npx --version
```

## 🚀 Siguiente Paso

Una vez que Node.js esté instalado correctamente:

```powershell
cd "C:\Users\Administrator\Desktop\WAVES VIP"
npm install
```

Esto instalará todas las dependencias del proyecto.

## 📚 Recursos Adicionales

- [Sitio Oficial de Node.js](https://nodejs.org/)
- [Documentación de npm](https://docs.npmjs.com/)
- [Guía de Instalación de Node.js](https://nodejs.org/en/download/package-manager/)

---

**Nota**: Si después de seguir estos pasos aún tienes problemas, verifica que la instalación se haya completado correctamente y que hayas reiniciado PowerShell.


