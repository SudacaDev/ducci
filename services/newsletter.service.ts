import { supabase } from "@/lib/supabase";

export interface NewsletterData {
    email: string;
    name?: string;
}

export interface NewsletterResponse {
    success: boolean;
    message: string;
    error?: string;
}

export const subscribeToNewsletter = async (
    data: NewsletterData
): Promise<NewsletterResponse> => {
    try {
        const { error } = await supabase.from("newsletter_subscribers").insert({
            email: data.email,
            name: data.name || null,
        });

        if (error) {
            if (error.code === "23505") {
                return {
                    success: false,
                    message: "Este email ya está suscripto",
                    error: "duplicate",
                };
            }
            throw new Error(error.message);
        }

        return {
            success: true,
            message: "¡Gracias por suscribirte!",
        };
    } catch (error) {
        console.error("❌ Error newsletter:", error);
        throw new Error(
            error instanceof Error ? error.message : "Error al suscribirse"
        );
    }
};