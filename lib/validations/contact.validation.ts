import * as z from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" })
    .trim(),

  lastName: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
    .max(50, { message: "El apellido no puede exceder 50 caracteres" })
    .trim(),

  email: z
    .string()
    .email({ message: "Email inválido" })
    .min(1, { message: "El email es requerido" })
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .min(10, { message: "El teléfono debe tener al menos 10 dígitos" })
    .max(15, { message: "El teléfono no puede exceder 15 dígitos" })
    .regex(/^[0-9+\s-()]+$/, { message: "Teléfono inválido" })
    .trim(),

  message: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres" })
    .max(1000, { message: "El mensaje no puede exceder 1000 caracteres" })
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
