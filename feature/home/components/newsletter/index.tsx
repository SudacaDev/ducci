"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import Block from "@/components/content-block";

import "../../style/newsletter.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FacebookIcon from "@/components/icons/facebook";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const NewsletterHomeSection = () => {
  const refContentNewsletter = useRef(null);

  useEffect(() => {
    if (!refContentNewsletter.current) return;
    gsap.set(refContentNewsletter.current, {
      zIndex: 100,
      position: "relative",
      background: "white",
    });
  }, []);

  return (
    <section ref={refContentNewsletter} className="newsletter-home-wrapper">
      <div className="newsletter-home-content">
        <div className="newsletter-home-content__form">
          <div className="newsletter-home-content__image--content">
            <Image
              src="/images/MILSHAKE.png"
              style={{ objectFit: "cover" }}
              width={600}
              height={600}
              alt="Helados artesanales Ducci"
            />
          </div>
          <div className="newsletter-wrapper">
            <Block>
              <Block.Content className="flex items-center justify-center">
                <Block.Subtitle>Redes sociales</Block.Subtitle>
                <Block.Title>
                  <span>¡Seguinos!</span> Seamos amiduccis.
                </Block.Title>
              </Block.Content>
              <Block.Content className="newsletter-social">
                <div className=" newsletter-social__icons">
                  <Link
                    href="https://www.instagram.com/ducci.gelateria/"
                    target="_blank"
                  >
                    <FaFacebookF size={24} />
                  </Link>
                </div>
                <div className=" newsletter-social__icons">
                  <Link
                    href="https://www.instagram.com/ducci.gelateria/"
                    target="_blank"
                  >
                    <FaInstagram size={24} />
                  </Link>
                </div>
              </Block.Content>
            </Block>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterHomeSection;
