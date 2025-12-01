# Script para configurar el video de Cloudinary
# Ejecuta este script en PowerShell

$envContent = @"
# Cloudinary Video Optimizado
# URL con transformaciones para optimizar el video de 67MB a ~8-15MB
NEXT_PUBLIC_HERO_VIDEO_URL=https://res.cloudinary.com/do7eqgtjs/video/upload/f_auto,q_auto:best,w_1920,h_1080,c_fill/Untitled_design_ho9zxa

# Cloudinary Config
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=do7eqgtjs

# NextAuth (requerido para el proyecto)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secret_aqui_genera_uno_seguro
"@

# Verificar si existe .env.local
if (Test-Path ".env.local") {
    Write-Host "⚠️  El archivo .env.local ya existe. ¿Deseas sobrescribirlo? (S/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -ne "S" -and $response -ne "s") {
        Write-Host "Operación cancelada." -ForegroundColor Red
        exit
    }
}

# Crear o actualizar .env.local
$envContent | Out-File -FilePath ".env.local" -Encoding UTF8
Write-Host "✅ Archivo .env.local creado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📹 URL del video optimizado configurada:" -ForegroundColor Cyan
Write-Host "https://res.cloudinary.com/do7eqgtjs/video/upload/f_auto,q_auto:best,w_1920,h_1080,c_fill/Untitled_design_ho9zxa" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Próximo paso: Reinicia el servidor (Ctrl+C y luego npm run dev)" -ForegroundColor Yellow

