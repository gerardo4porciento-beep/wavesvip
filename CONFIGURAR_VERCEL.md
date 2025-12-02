# Configurar Variables de Entorno en Vercel para el Video

## 🔴 Problema

El video no se ve en Vercel porque las variables de entorno de `.env.local` solo funcionan localmente. Necesitas configurarlas en el dashboard de Vercel.

## ✅ Solución: Agregar Variables de Entorno en Vercel

### Paso 1: Acceder al Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Selecciona tu proyecto **wavesvip**
3. Ve a la pestaña **Settings** (Configuración)
4. En el menú lateral, haz clic en **Environment Variables** (Variables de Entorno)

### Paso 2: Agregar la Variable del Video

Haz clic en **Add New** (Agregar Nueva) y configura:

**Key (Clave)**:
```
NEXT_PUBLIC_HERO_VIDEO_URL
```

**Value (Valor)** - Copia exactamente esto:
```
https://res.cloudinary.com/do7eqgtjs/video/upload/f_auto,q_90,dpr_auto,w_1920,h_1080,c_fill/Untitled_design_ho9zxa
```

**Environment (Ambiente)** - Marca TODAS las opciones:
- ✅ Production (Producción)
- ✅ Preview (Vista Previa)
- ✅ Development (Desarrollo)

Haz clic en **Save** (Guardar)

### Paso 3: Opcional - Agregar Cloud Name

Si quieres, también agrega:

**Key**: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`  
**Value**: `do7eqgtjs`  
**Environment**: Todas las opciones

### Paso 4: Redesplegar el Proyecto

**IMPORTANTE**: Después de agregar las variables, debes redesplegar:

1. Ve a la pestaña **Deployments** (Despliegues)
2. Encuentra el último deployment
3. Haz clic en los **tres puntos** (...) al lado
4. Selecciona **Redeploy** (Redesplegar)
5. Espera a que termine el nuevo despliegue (1-2 minutos)

## 📋 Resumen de Variables a Agregar

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_HERO_VIDEO_URL` | `https://res.cloudinary.com/do7eqgtjs/video/upload/f_auto,q_90,dpr_auto,w_1920,h_1080,c_fill/Untitled_design_ho9zxa` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `do7eqgtjs` (opcional) |

## ✅ Verificar que Funciona

1. Después del redespliegue, visita tu URL de Vercel
2. El video debería aparecer en el Hero Section
3. Si no aparece, espera unos segundos y recarga la página

## 🆘 Si Aún No Funciona

### Verificar que la Variable está Configurada

1. Ve a Settings → Environment Variables en Vercel
2. Verifica que `NEXT_PUBLIC_HERO_VIDEO_URL` existe
3. Verifica que el valor sea exactamente igual (sin espacios extra)

### Verificar la URL del Video

Abre esta URL directamente en tu navegador:
```
https://res.cloudinary.com/do7eqgtjs/video/upload/f_auto,q_90,dpr_auto,w_1920,h_1080,c_fill/Untitled_design_ho9zxa
```

Si el video se descarga/reproduce, la URL está bien. Si da error 404, verifica:
1. Que el video sea público en Cloudinary
2. Que el nombre del video sea correcto

### Ver Logs de Build

1. Ve a Deployments en Vercel
2. Haz clic en el último deployment
3. Revisa los logs para ver si hay errores

## 🎯 Resultado Esperado

Después de configurar y redesplegar:
- ✅ El video aparecerá en el Hero Section
- ✅ Se reproducirá automáticamente en loop
- ✅ Estará optimizado para diferentes dispositivos

---

**Una vez que agregues las variables y redesplegues, el video debería aparecer en Vercel. 🎥**
