# Configurar Video de Cloudinary - Guía Rápida

## ✅ Video Cargado en Cloudinary

Perfecto, ya tienes el video en Cloudinary. Ahora solo necesitas configurarlo en la aplicación.

## 📋 Paso 1: Obtener la URL del Video

### Opción A: Desde el Dashboard de Cloudinary

1. Ve a tu [Dashboard de Cloudinary](https://console.cloudinary.com/)
2. Haz clic en **Media Library**
3. Encuentra tu video y haz clic en él
4. Copia la **URL** que aparece (algo como):
   ```
   https://res.cloudinary.com/tu-cloud-name/video/upload/v1234567890/hero-video.mp4
   ```

### Opción B: URL Optimizada (Recomendado)

Para mejor performance, usa esta estructura de URL con transformaciones:

```
https://res.cloudinary.com/[TU-CLOUD-NAME]/video/upload/f_auto,q_auto/v1/[NOMBRE-DEL-VIDEO]
```

Ejemplo:
```
https://res.cloudinary.com/mi-empresa/video/upload/f_auto,q_auto/v1/hero-video
```

**Parámetros de optimización:**
- `f_auto` - Formato automático (WebM, MP4 según soporte del navegador)
- `q_auto` - Calidad automática optimizada
- `v1` - Versión (ajusta según tu versión en Cloudinary)

## 📋 Paso 2: Crear Imagen Poster (Opcional pero Recomendado)

La imagen poster se muestra mientras el video carga:

1. Toma una captura de pantalla de tu video (frame representativo)
2. Sube la imagen a Cloudinary
3. Obtén la URL de la imagen

## 📋 Paso 3: Configurar Variables de Entorno

1. **Crea el archivo `.env.local`** en la raíz del proyecto (si no existe)

2. **Copia la plantilla:**
   ```bash
   copy env.example.txt .env.local
   ```

3. **Edita `.env.local`** y agrega tus URLs:

```env
# Cloudinary Video
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/tu-cloud-name/video/upload/f_auto,q_auto/v1/tu-video

# Cloudinary Poster (imagen mientras carga)
NEXT_PUBLIC_HERO_POSTER_URL=https://res.cloudinary.com/tu-cloud-name/image/upload/q_auto/v1/tu-poster.jpg

# Cloudinary Config (opcional, para futuras imágenes)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
```

## 📋 Paso 4: Reiniciar el Servidor

**IMPORTANTE**: Después de crear/editar `.env.local`, debes reiniciar el servidor:

1. Detén el servidor (presiona `Ctrl+C` en la terminal)
2. Inicia de nuevo:
   ```bash
   npm run dev
   ```

## ✅ Verificar

Una vez configurado, visita `http://localhost:3000` y deberías ver tu video en el Hero Section.

## 🎨 Consejos de Optimización

### Formatos Múltiples (Mejor Performance)

Para máxima compatibilidad, puedes configurar múltiples formatos en Cloudinary:

```
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/tu-cloud/video/upload/f_auto:format:webm|mp4,q_auto/v1/tu-video
```

### Calidad Adaptativa

```
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/tu-cloud/video/upload/q_auto:best,f_auto/v1/tu-video
```

### Tamaño Optimizado

```
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/tu-cloud/video/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1/tu-video
```

## 🆘 Solución de Problemas

### El video no se muestra

1. Verifica que la URL sea pública (no privada)
2. Verifica que no haya espacios o caracteres especiales en la URL
3. Revisa la consola del navegador para errores
4. Asegúrate de haber reiniciado el servidor después de cambiar `.env.local`

### El video carga muy lento

1. Usa las transformaciones de optimización (`f_auto,q_auto`)
2. Considera reducir la resolución del video
3. Verifica que estés usando la versión correcta en Cloudinary

## 📝 Ejemplo Completo de `.env.local`

```env
# Cloudinary Video Hero
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/wavesvip/video/upload/f_auto,q_auto/v1/hero-waves
NEXT_PUBLIC_HERO_POSTER_URL=https://res.cloudinary.com/wavesvip/image/upload/q_auto/v1/hero-poster
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=wavesvip
```

---

**¿Listo para configurar? Solo necesito que me digas la URL de tu video de Cloudinary y lo configuro por ti! 🎥**





