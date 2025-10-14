import { ContactFormData, ContactFormResponse } from "@/types/contact.type";

const API_ENDPOINT = "/api/contact";

/**
 * Envía un mensaje de contacto
 */
export const sendContactMessage = async (
  data: ContactFormData,
): Promise<ContactFormResponse> => {
  try {
    // Log estructurado para desarrollo
    console.log("📧 Enviando mensaje de contacto:", {
      timestamp: new Date().toISOString(),
      from: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      messagePreview: data.message.substring(0, 50) + "...",
    });

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // TODO: Reemplazar con llamada real a la API
    // const response = await fetch(API_ENDPOINT, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    //
    // if (!response.ok) {
    //   const error = await response.json();
    //   throw new Error(error.message || 'Error al enviar el mensaje');
    // }
    //
    // return await response.json();

    // Respuesta simulada
    return {
      success: true,
      message: "Mensaje enviado correctamente",
    };
  } catch (error) {
    console.error("❌ Error al enviar mensaje:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al enviar el mensaje",
    );
  }
};

/**
 * Valida que el email tenga formato correcto
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Formatea el teléfono eliminando caracteres no numéricos
 */
export const formatPhone = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

/**
 * Sanitiza el mensaje eliminando HTML/scripts
 */
export const sanitizeMessage = (message: string): string => {
  return message
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .trim();
};
