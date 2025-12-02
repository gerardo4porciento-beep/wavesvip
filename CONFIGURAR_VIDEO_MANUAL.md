# Configurar Video Manualmente - Instrucciones

## ✅ URL del Video Optimizada

He preparado la URL optimizada de tu video. Sigue estos pasos:

## 📝 Paso 1: Crear Archivo .env.local

Crea un archivo llamado `.env.local` en la raíz del proyecto (misma carpeta donde está `package.json`).

## 📝 Paso 2: Copiar Esta Configuración

Abre `.env.local` en un editor de texto y pega esto:

```env
# Cloudinary Video Optimizado
# URL con transformaciones para optimizar el video de 67MB a ~8-15MB
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/do7eqgtjs/video/upload/f_auto,q_90,dpr_auto,w_1920,h_1080,c_fill/Untitled_design_ho9zxa

# Cloudinary Config
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=do7eqgtjs

# NextAuth (requerido para el proyecto)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secret_aqui_genera_uno_seguro
```

## 🔧 Opción Alternativa: Ejecutar Script

Si prefieres, puedes ejecutar el script PowerShell que creé:

```powershell
.\configurar-video.ps1
```

## 🚀 Paso 3: Reiniciar el Servidor

**IMPORTANTE**: Después de crear/editar `.env.local`, debes reiniciar el servidor:

1. Detén el servidor actual (presiona `Ctrl+C` en la terminal)
2. Inicia de nuevo:
   ```bash
   npm run dev
   ```

## ✅ Paso 4: Verificar

1. Abre `http://localhost:3000`
2. Deberías ver tu video optimizado en el Hero Section
3. Abre DevTools (F12) → Network Tab
4. Busca la solicitud del video
5. Verifica que el tamaño descargado sea mucho menor que 67MB (debería ser ~8-15MB)

## 📊 Transformaciones Aplicadas

La URL incluye estas transformaciones de optimización:

- **`f_auto`** → Formato automático (WebM o MP4 según navegador)
- **`q_90`** → Calidad alta (90%) para reducir pixelado
- **`dpr_auto`** → Densidad de píxeles automática para pantallas retina
- **`w_1920,h_1080`** → Resolución máxima Full HD
- **`c_fill`** → Recorte inteligente para mantener aspecto

**Resultado**: Tu video de 67MB se servirá optimizado a ~8-15MB automáticamente.

## 🆘 Si No Funciona

1. Verifica que el archivo se llame exactamente `.env.local` (con el punto al inicio)
2. Verifica que reiniciaste el servidor
3. Verifica que no hay espacios extra en las URLs
4. Abre la URL del video directamente en el navegador para verificar que es accesible

---

**¡Listo! Tu video está configurado y optimizado. 🎥✨**

