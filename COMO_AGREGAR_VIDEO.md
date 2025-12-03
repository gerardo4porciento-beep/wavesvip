# Cómo Agregar Video a la Landing Page

## 📹 Estado Actual

Actualmente, la página muestra un **fondo elegante con gradientes** porque no hay video configurado. Esto es perfectamente funcional y se ve profesional.

## ✅ Opción 1: Usar un Fondo Elegante (Sin Video)

**Ventajas:**
- ✅ Carga instantánea
- ✅ No requiere configuración
- ✅ Perfecto para desarrollo y testing
- ✅ Diseño minimalista y elegante

La página ya está configurada para usar este fondo automáticamente cuando no hay video. **¡Ya está funcionando así!**

## 🎥 Opción 2: Agregar un Video Real

### Paso 1: Subir Video a Cloudinary o Mux

#### Opción A: Cloudinary (Recomendado)

1. **Crear cuenta en Cloudinary**:
   - Ve a [cloudinary.com](https://cloudinary.com/)
   - Crea una cuenta gratuita

2. **Subir el video**:
   - Ve al Dashboard → Media Library
   - Haz clic en "Upload" y selecciona tu video
   - Espera a que se procese

3. **Obtener la URL**:
   - Haz clic en el video subido
   - Copia la URL que aparece
   - Formato: `https://res.cloudinary.com/[tu-cloud-name]/video/upload/v1/[nombre-video]`

4. **Optimizar para web**:
   Puedes agregar transformaciones a la URL para optimizar:
   ```
   https://res.cloudinary.com/[cloud]/video/upload/f_auto,q_auto/v1/[video]
   ```

#### Opción B: Mux

1. **Crear cuenta en Mux**:
   - Ve a [mux.com](https://www.mux.com/)
   - Crea una cuenta

2. **Subir el video**:
   - Ve a "Assets" → "Upload"
   - Sube tu video (se procesará automáticamente)

3. **Obtener la URL de reproducción**:
   - Ve a "Playback IDs"
   - Copia el Playback ID
   - URL formato: `https://stream.mux.com/[playback-id].m3u8`

### Paso 2: Configurar Variables de Entorno

1. **Crear/editar `.env.local`** en la raíz del proyecto:

```env
# URL del video hero (Cloudinary)
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/tu-cloud/video/upload/v1/hero-video

# URL de la imagen poster (mientras carga el video)
NEXT_PUBLIC_HERO_POSTER_URL=https://res.cloudinary.com/tu-cloud/image/upload/v1/hero-poster.jpg
```

2. **Reiniciar el servidor de desarrollo**:
```bash
# Detener el servidor (Ctrl+C)
# Luego ejecutar de nuevo:
npm run dev
```

### Paso 3: Formato del Video Recomendado

Para mejor performance:

- **Formato**: MP4 (H.264) o WebM (VP9)
- **Resolución**: 1920x1080 (Full HD) o superior
- **Duración**: 30-60 segundos (ideal para loop)
- **Tamaño de archivo**: Intenta mantenerlo bajo 50MB
- **Aspecto**: 16:9 para pantallas estándar

### Paso 4: Crear Imagen Poster

La imagen poster se muestra mientras el video carga:

- **Formato**: JPG o WebP
- **Resolución**: 1920x1080
- **Tamaño**: Optimizado (< 200KB)
- **Contenido**: Un frame representativo del video o una imagen elegante

## 🎬 Opción 3: Usar un Video de Ejemplo (Temporal)

Si quieres probar rápidamente con un video de ejemplo, puedes usar:

```env
# En .env.local
NEXT_PUBLIC_HERO_VIDEO_URL=https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4
NEXT_PUBLIC_HERO_POSTER_URL=https://sample-videos.com/img/SampleVideo_1280x720_1mb.jpg
```

## 🔧 Opción 4: Usar Video Local (No Recomendado)

⚠️ **No recomendado para producción** porque:
- Aumenta el tamaño del bundle
- Ralentiza la carga inicial
- No es optimizado

Si necesitas hacerlo temporalmente:

1. Coloca el video en `public/videos/hero-video.mp4`
2. Actualiza `app/page.tsx`:

```typescript
const heroVideoUrl = "/videos/hero-video.mp4";
```

## 📊 Comparación de Opciones

| Opción | Velocidad | Calidad | Costo | Recomendado |
|--------|-----------|---------|-------|-------------|
| Fondo Elegante | ⚡⚡⚡ | ⭐⭐⭐ | Gratis | ✅ Desarrollo |
| Cloudinary | ⚡⚡ | ⭐⭐⭐⭐ | Plan gratuito | ✅ Producción |
| Mux | ⚡⚡ | ⭐⭐⭐⭐⭐ | Pago | ⚠️ Si necesitas streaming avanzado |
| Video Local | ⚡ | ⭐⭐⭐ | Gratis | ❌ Solo desarrollo |

## ✨ Estado Actual de tu Página

Tu página **ya está funcionando perfectamente** con:
- ✅ Diseño elegante y minimalista
- ✅ Fondo con gradientes sutiles
- ✅ Texto "Waves VIP" centrado
- ✅ Botón de llamada a la acción
- ✅ Scroll indicator
- ✅ Animaciones suaves

Cuando agregues un video real, el componente `HeroVideo` se activará automáticamente.

## 🚀 Siguiente Paso

**Para ahora**: Tu página ya está lista y funcional. El fondo elegante se ve profesional.

**Para después**: Cuando tengas tu video listo, simplemente:
1. Súbelo a Cloudinary
2. Agrega la URL en `.env.local`
3. Reinicia el servidor

---

**¿Necesitas ayuda con algo más?** El diseño actual es perfectamente funcional y elegante. El video es opcional y se puede agregar cuando estés listo.






