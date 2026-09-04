'use client';

// Boton flotante de WhatsApp, visible en todas las paginas publicas de la
// tienda (se monta desde SiteChrome, igual que el carrito). Numero de
// contacto general del negocio — distinto del numero que usan el checkout
// y el CTA de "comprar por WhatsApp" en el home, que es el de confirmacion
// de pedidos.

import React from 'react';

const WHATSAPP_NUMBER = '573234220813';
const DEFAULT_MESSAGE = '¡Hola AMOLI! Tengo una pregunta.';

const WhatsAppFloatingButton = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed z-40 flex h-14 w-14 items-center justify-center rounded-full border-2 border-foreground bg-[#25D366] text-white shadow-[4px_4px_0px_0px_rgba(42,42,42,1)] transition-transform hover:scale-105 active:scale-95"
      style={{
        right: 'max(1.25rem, env(safe-area-inset-right))',
        bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.657 4.523 1.796 6.383L4 29l7.812-1.752A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.7 9.7 0 0 1-4.947-1.354l-.355-.21-4.636 1.04 1.02-4.522-.232-.37A9.69 9.69 0 0 1 5.25 15c0-5.93 4.824-10.75 10.754-10.75S26.75 9.07 26.75 15 21.934 24.75 16.004 24.75Zm5.61-7.36c-.307-.154-1.816-.897-2.098-1-.281-.103-.486-.154-.69.154-.204.307-.792 1-.972 1.205-.179.205-.358.23-.665.077-.307-.154-1.297-.478-2.47-1.523-.913-.814-1.529-1.82-1.708-2.128-.179-.307-.019-.473.135-.626.138-.138.307-.358.46-.538.154-.179.205-.307.307-.512.103-.205.051-.384-.026-.538-.077-.154-.69-1.663-.945-2.278-.249-.6-.502-.519-.69-.528l-.588-.01c-.205 0-.538.077-.82.384-.281.307-1.073 1.05-1.073 2.56 0 1.51 1.099 2.969 1.252 3.174.154.205 2.163 3.302 5.24 4.632.732.316 1.303.505 1.748.646.735.234 1.404.201 1.933.122.59-.088 1.816-.742 2.072-1.46.256-.717.256-1.332.18-1.46-.077-.128-.282-.205-.589-.359Z" />
      </svg>
    </a>
  );
};

export default WhatsAppFloatingButton;
