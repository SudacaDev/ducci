import Block from "@/components/content-block"
import { ArrowRight, Loader2, CheckCircle, XCircle } from "lucide-react";

import CTAButton from "@/components/cta-button";
import { Input } from "@/components/ui/input";
import { useNewsletter } from "@/hooks/useNewsletter";



export const FormNewsletter = () => {

    const { form, onSubmit, isLoading, isSuccess, isError, errorMessage } = useNewsletter();
      const { register, formState: { errors } } = form;

    return (
        <Block>
             <Block.Body>
              <p className="section-header__subtitle">
                Promociones especiales, lanzamientos de sabores únicos y
                descuentos exclusivos para suscriptores
              </p>
              <form onSubmit={onSubmit} className="newsletter-home-content__form--content">
                <div>
                  <Input
                    type="email"
                    placeholder="Ingresá tu email para suscribirte"
                    {...register("email")}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                {isSuccess && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={16} />
                    <span>¡Gracias por suscribirte!</span>
                  </div>
                )}

                {isError && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex">
                  <CTAButton
                    className="button__cta flex"

                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Suscribiendo...
                      </>
                    ) : (
                      <>
                        Suscribite al newsletter
                        <span>
                          <ArrowRight size={20} />
                        </span>
                      </>
                    )}
                  </CTAButton>
                </div>
              </form>
            </Block.Body>
        </Block>
    )
}