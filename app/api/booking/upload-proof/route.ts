import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/booking/upload-proof
 * Sube un comprobante de pago a Cloudinary (o servicio similar) y devuelve la URL pública.
 *
 * Requiere variables de entorno:
 * - CLOUDINARY_CLOUD_NAME
 * - CLOUDINARY_UPLOAD_PRESET (para uploads sin firma) o CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET si se usa firma.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo" },
        { status: 400 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json(
        { error: "Cloudinary no está configurado correctamente" },
        { status: 500 }
      );
    }

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("upload_preset", uploadPreset);

    const uploadRes = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadForm,
    });

    const data = await uploadRes.json();

    if (!uploadRes.ok) {
      console.error("Error subiendo a Cloudinary:", data);
      return NextResponse.json(
        { error: "Error al subir el archivo" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        url: data.secure_url || data.url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en /api/booking/upload-proof:", error);
    return NextResponse.json(
      {
        error: "Error al subir el comprobante",
        message: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}


