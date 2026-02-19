import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  subscribeToNewsletter,
  NewsletterData,
} from "@/services/newsletter.service";

const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().optional(),
});

export const useNewsletter = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", name: "" },
  });

  const onSubmit = async (data: NewsletterData) => {
    try {
      setStatus("loading");
      setErrorMessage(null);

      const response = await subscribeToNewsletter(data);

      if (response.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setErrorMessage(response.message);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error al suscribirse",
      );
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    errorMessage,
  };
};
