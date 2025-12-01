# Optimizar Video en Cloudinary - 67MB es Demasiado Grande

## ⚠️ Problema

Tu video pesa **67MB (67,000 KB)**, lo cual es demasiado grande para web:
- ❌ Carga muy lenta
- ❌ Consume mucha banda ancha del usuario
- ❌ Mala experiencia en móviles
- ❌ Afecta el SEO y performance

## ✅ Solución: Optimizar con Transformaciones de Cloudinary

Cloudinary puede optimizar automáticamente tu video **sin que tengas que subirlo de nuevo**. Solo necesitas usar transformaciones en la URL.

## 🎯 Opción 1: Transformaciones Automáticas (Recomendado)

### Paso 1: Obtén la URL Base

Desde tu Dashboard de Cloudinary:
1. Ve a Media Library
2. Haz clic en tu video
3. Copia la URL base (sin transformaciones)

Ejemplo:
```
https://res.cloudinary.com/tu-cloud/video/upload/v1234567890/tu-video.mp4
```

### Paso 2: Agrega Transformaciones de Optimización

Modifica la URL agregando transformaciones antes de `/v1234567890/`:

#### URL Optimizada Completa:
```
https://res.cloudinary.com/tu-cloud/video/upload/f_auto,q_auto:best,w_1920,h_1080,c_fill/v1234567890/tu-video.mp4
```

### Transformaciones Explicadas:

- **`f_auto`** - Formato automático (WebM o MP4 según el navegador)
- **`q_auto:best`** - Calidad optimizada automáticamente
- **`w_1920,h_1080`** - Tamaño máximo (Full HD)
- **`c_fill`** - Recortar para mantener aspecto

## 🎯 Opción 2: Re-subir Optimizado (Más Control)

Si quieres más control, puedes re-subir el video con estas configuraciones:

### Opciones de Subida en Cloudinary:

1. **Resolución Máxima**: 1920x1080 (Full HD)
   - Para hero videos, esto es más que suficiente
   - Reducirá significativamente el tamaño

2. **Calidad**: 70-80%
   - Balance perfecto entre calidad y tamaño
   - Imperceptible para la mayoría de usuarios

3. **Formato**: MP4 (H.264)
   - Mejor compatibilidad
   - Buena compresión

### Herramientas para Pre-compresión (Antes de Subir):

Si quieres comprimirlo antes de subirlo a Cloudinary:

#### Opción A: HandBrake (Gratis)
1. Descarga [HandBrake](https://handbrake.fr/)
2. Configuración recomendada:
   - **Format**: MP4
   - **Resolution**: 1920x1080
   - **Quality**: RF 23 (calidad alta)
   - **Frame Rate**: Original
   - **Encoder**: H.264 (x264)

#### Opción B: FFmpeg (Línea de comandos)
```bash
ffmpeg -i tu-video-original.mp4 -vf "scale=1920:1080" -crf 23 -preset slow -c:v libx264 -c:a aac -b:a 128k tu-video-optimizado.mp4
```

#### Opción C: Online (CloudConvert, etc.)
- Sube tu video
- Selecciona MP4
- Resolución: 1920x1080
- Calidad: 70-80%
- Descarga y re-sube a Cloudinary

## 📊 Tamaños Objetivo

Para un video hero web optimizado:

| Resolución | Tamaño Ideal | Tamaño Máximo |
|------------|--------------|---------------|
| 1920x1080 (Full HD) | 5-10 MB | 15 MB |
| 1280x720 (HD) | 3-5 MB | 10 MB |
| 1920x1080 con `q_auto` | Variable | Auto-optimizado |

Tu video de **67MB debería quedar en ~8-15MB** después de optimizar.

## 🚀 Configuración Recomendada para tu Caso

### URL con Transformaciones Automáticas:

```env
# En tu .env.local
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/tu-cloud/video/upload/f_auto,q_auto:best,w_1920,h_1080,c_fill/v1234567890/tu-video
```

### O con Más Agresivo (Menor Calidad):

```env
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/tu-cloud/video/upload/f_auto,q_70,w_1920,h_1080,c_fill/v1234567890/tu-video
```

## 🎬 Formato para Loop (Importante)

Para que el video se reproduzca en loop (recomendado para hero):

Agrega `loop` a los atributos del video (ya está en el componente HeroVideo).

### Duración Recomendada:
- **15-30 segundos** para hero videos
- Si tu video es más largo, considera editarlo a este rango

## 🔧 Configuración Paso a Paso

### 1. Obtén la URL del Video en Cloudinary

1. Ve a tu Dashboard
2. Media Library → Tu video
3. Copia la URL completa

### 2. Construye la URL Optimizada

Ejemplo si tu URL es:
```
https://res.cloudinary.com/mi-empresa/video/upload/v1234567890/hero-waves.mp4
```

URL Optimizada:
```
https://res.cloudinary.com/mi-empresa/video/upload/f_auto,q_auto:best,w_1920,h_1080,c_fill/v1234567890/hero-waves
```

### 3. Configura en `.env.local`

```env
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/mi-empresa/video/upload/f_auto,q_auto:best,w_1920,h_1080,c_fill/v1234567890/hero-waves
```

### 4. Reinicia el Servidor

```bash
# Detener (Ctrl+C)
npm run dev
```

## ⚡ Transformaciones Avanzadas

### Para Móviles (Calidad Adaptativa):

Cloudinary puede detectar el dispositivo y servir calidad apropiada:

```
https://res.cloudinary.com/tu-cloud/video/upload/f_auto,q_auto:best,w_auto:1920:1080,c_fill/v1234567890/tu-video
```

### Múltiples Formatos (WebM + MP4):

El componente HeroVideo ya maneja esto automáticamente, pero puedes forzarlo:

```
https://res.cloudinary.com/tu-cloud/video/upload/f_webm,q_auto/v1234567890/tu-video
https://res.cloudinary.com/tu-cloud/video/upload/f_mp4,q_auto/v1234567890/tu-video
```

## 📱 Pruebas de Performance

Después de configurar, verifica:

1. **Abre DevTools** (F12)
2. **Network Tab**
3. **Recarga la página**
4. **Busca el video**
5. **Verifica el tamaño descargado**

Debería mostrar el tamaño **optimizado**, no los 67MB originales.

## ✅ Checklist de Optimización

- [ ] Video original: 67MB ❌
- [ ] URL con transformaciones configurada ✅
- [ ] Tamaño esperado: 8-15MB ✅
- [ ] Resolución: 1920x1080 máximo ✅
- [ ] Formato: Auto (WebM/MP4) ✅
- [ ] Calidad: Auto-optimizada ✅
- [ ] Duración: 15-30 segundos ideal ✅

## 🎯 Resultado Final

Con estas transformaciones, tu video de **67MB se servirá optimizado a ~8-15MB** automáticamente, dependiendo del dispositivo y conexión del usuario.

**Cloudinary hace el trabajo pesado por ti! 🚀**

---

**¿Necesitas ayuda construyendo la URL optimizada? Solo dame la URL base de tu video y te ayudo a crearla.**

