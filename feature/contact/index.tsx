"use client";

import CenterContainer from "@/components/container/center";
import InnerLayout from "@/components/inner-layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Loader2,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";

import "./style/contact.css";
import { useSendContactMail } from "./hooks/useSendContactMail";
import Block from "@/components/content-block";

const ContactPageContent = () => {
  const { form, onSubmit, isLoading, isSuccess, isError, errorMessage } =
    useSendContactMail();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <InnerLayout id="contact" bannerTitle="Contacto">
      <CenterContainer center>
        <div id="contactWrapper" className="py-8">
          <Block className="text-center">
            <Block.Title>
              Ponte en <span>contacto</span> con nosotros
            </Block.Title>
            <Block.Body>
              <p>Escribinos y contanos cuales son tus inquietudes.</p>
              <p>Nuestro equipo se pondrá en contacto con vos.</p>
            </Block.Body>
          </Block>

          <div className="contact_form">
            <div className="contact_form-info">
              <div className="contact__box">
                <div className="contact__icon">
                  <MapPinIcon size={32} color="currentColor" />
                </div>
                <div className="contact__box--info">
                  <h3>direccion</h3>
                  <p>Vélez Sarsfield 1163 Rosario, Santa Fe</p>
                </div>
              </div>
              <div className="contact__box">
                <div className="contact__icon">
                  <PhoneIcon size={32} />
                </div>
                <div className="contact__box--info">
                  <h3>telefono</h3>
                  <p>+54 341 5222700</p>
                </div>
              </div>
              <div className="contact__box">
                <div className="contact__icon">
                  <MailIcon size={32} />
                </div>
                <div className="contact__box--info">
                  <h3>escribinos</h3>
                  <p>contacto@ducci.com</p>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} noValidate>
              <div className="contact_form-wrapper">
                <div className="contact_form-group">
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                    disabled={isLoading}
                    aria-invalid={errors.firstName ? "true" : "false"}
                    aria-describedby={
                      errors.firstName ? "firstName-error" : undefined
                    }
                  />
                  {errors.firstName && (
                    <p
                      id="firstName-error"
                      className="text-sm text-red-500 mt-1"
                    >
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="contact_form-group">
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                    disabled={isLoading}
                    aria-invalid={errors.lastName ? "true" : "false"}
                    aria-describedby={
                      errors.lastName ? "lastName-error" : undefined
                    }
                  />
                  {errors.lastName && (
                    <p
                      id="lastName-error"
                      className="text-sm text-red-500 mt-1"
                    >
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="contact_form-group">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    disabled={isLoading}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="contact_form-group">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    disabled={isLoading}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-sm text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="contact_form-group">
                <Label htmlFor="message">Mensaje *</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  disabled={isLoading}
                  rows={5}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {isSuccess && (
                <div
                  className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-md mb-4"
                  role="alert"
                >
                  <CheckCircle size={20} />
                  <p>¡Mensaje enviado con éxito! Te responderemos pronto.</p>
                </div>
              )}

              {isError && (
                <div
                  className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-md mb-4"
                  role="alert"
                >
                  <XCircle size={20} />
                  <p>{errorMessage || "Error al enviar el mensaje"}</p>
                </div>
              )}

              <div>
                <Button
                  type="submit"
                  className="button__cta"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <ArrowRight size={16} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CenterContainer>
    </InnerLayout>
  );
};

export default ContactPageContent;
