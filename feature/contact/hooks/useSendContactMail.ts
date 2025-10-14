// hooks/useSendContactMail.ts
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/lib/validations/contact.validation";
import { sendContactMessage } from "@/services/contact.service";
import type {
  ContactFormData,
  SendStatus,
  UseSendContactMailReturn,
} from "@/types/contact.type";

export const useSendContactMail = (): UseSendContactMailReturn => {
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form: UseFormReturn<ContactFormData> = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    try {
      setSendStatus("loading");
      setErrorMessage(null);

      // Llamar al servicio (función pura)
      const response = await sendContactMessage(data);

      if (response.success) {
        setSendStatus("success");
        form.reset();

        setTimeout(() => {
          setSendStatus("idle");
        }, 3000);
      } else {
        throw new Error(response.error || "Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("❌ Error en useSendContactMail:", error);
      setSendStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Error desconocido al enviar el mensaje",
      );
    }
  };

  const reset = (): void => {
    form.reset();
    setSendStatus("idle");
    setErrorMessage(null);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: sendStatus === "loading",
    isSuccess: sendStatus === "success",
    isError: sendStatus === "error",
    errorMessage,
    sendStatus,
    reset,
  };
};
