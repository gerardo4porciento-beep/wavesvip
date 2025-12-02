# 🔄 Cómo Actualizar un Video en Cloudinary

## ⚠️ Problema Común

Cuando actualizas un video en Cloudinary con el mismo nombre, el navegador puede seguir mostrando la versión antigua en caché.

## ✅ Solución Rápida

### Paso 1: Obtener la Nueva URL de Cloudinary

1. Ve a tu [Dashboard de Cloudinary](https://console.cloudinary.com/)
2. Ve a **Media Library**
3. Encuentra tu video actualizado
4. **Haz clic en el video** para ver los detalles
5. **Copia la URL completa** que aparece

⚠️ **IMPORTANTE**: Cuando reemplazas un video en Cloudinary, la versión (`/v1/`, `/v2/`, etc.) puede cambiar. Asegúrate de copiar la URL completa con la nueva versión.

### Paso 2: Actualizar el Archivo `.env.local`

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Busca la línea `NEXT_PUBLIC_HERO_VIDEO_URL`
3. Reemplaza la URL con la nueva URL que copiaste de Cloudinary
4. Guarda el archivo

**Ejemplo:**
```env
# Antes
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/tu-cloud/video/upload/v1/tu-video

# Después (con nueva versión)
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/tu-cloud/video/upload/v2/tu-video
```

### Paso 3: Reiniciar el Servidor

**MUY IMPORTANTE**: Después de cambiar `.env.local`, debes reiniciar el servidor:

1. Detén el servidor (presiona `Ctrl+C` en la terminal)
2. Inicia de nuevo:
   ```bash
   npm run dev
   ```

### Paso 4: Limpiar la Caché del Navegador

Para asegurarte de ver el video nuevo:

1. **Opción A - Hard Refresh**:
   - Presiona `Ctrl + Shift + R` (Windows/Linux)
   - O `Cmd + Shift + R` (Mac)

2. **Opción B - Limpiar Caché del Navegador**:
   - Presiona `F12` para abrir DevTools
   - Haz clic derecho en el botón de recargar
   - Selecciona "Vaciar caché y recargar de forma forzada"

## 🔧 Solución Automática (Ya Implementada)

El código ya incluye cache-busting automático que fuerza la recarga del video. Sin embargo, es importante:

1. ✅ Actualizar la URL en `.env.local` con la nueva versión de Cloudinary
2. ✅ Reiniciar el servidor
3. ✅ Limpiar la caché del navegador

## 🆘 Si Aún No Funciona

### Verificar que la URL sea Correcta

1. Abre la URL del video directamente en el navegador
2. Deberías ver el video nuevo
3. Si ves el video antiguo, Cloudinary aún no ha procesado la actualización

### Forzar Actualización en Cloudinary

Si reemplazaste el video pero Cloudinary aún muestra el antiguo:

1. **Opción A**: Elimina el video antiguo y sube uno nuevo con un nombre diferente
2. **Opción B**: Espera unos minutos para que Cloudinary procese la actualización
3. **Opción C**: Usa "Upload Settings" → "Overwrite" en Cloudinary

### Verificar la Versión en la URL

Cloudinary usa versiones automáticas. Asegúrate de usar la URL con la versión más reciente:

- `v1/` = Primera versión
- `v2/` = Segunda versión (después de reemplazar)
- `v3/` = Tercera versión, etc.

**Tip**: Para obtener siempre la última versión automáticamente, puedes usar la URL sin versión específica, pero esto puede causar problemas de caché.

## 📝 Ejemplo de URL Optimizada

```env
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/tu-cloud/video/upload/f_auto,q_auto:best,w_1920,h_1080,c_fill/v2/tu-video
```

Donde `v2` es la nueva versión después de actualizar el video.

## ✅ Checklist

- [ ] Obtuve la nueva URL de Cloudinary
- [ ] Actualicé la URL en `.env.local`
- [ ] Reinicié el servidor (`npm run dev`)
- [ ] Limpié la caché del navegador (`Ctrl + Shift + R`)
- [ ] Verifiqué que la URL nueva funciona en el navegador

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para ver errores o problemas de carga.



