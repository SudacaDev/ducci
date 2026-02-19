import { ContactFormData, ContactFormResponse } from "@/types/contact.type";
import { supabase } from "@/lib/supabase";

export const sendContactMessage = async (
  data: ContactFormData,
): Promise<ContactFormResponse> => {
  try {
    const { error } = await supabase.from("contact_messages").insert({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    if (error) {
      console.error("❌ Error Supabase:", error);
      throw new Error(error.message);
    }

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
