// Tarjeta informativa de horario de entrega, para el checkout. Contenido
// PLACEHOLDER (ver aviso en el chat) — hay que confirmarlo con el horario
// real de AMOLI antes de dejarlo en producción; hoy el footer de
// SiteChrome dice "Entrega 24-72 h", lo cual no calza con "mismo día" de
// aquí abajo, así que hay que decidir cuál es la política real y dejar
// las dos consistentes.
import React from 'react';
import { Clock } from 'lucide-react';

const DeliveryHoursCard = () => (
  <div className="flex gap-3 rounded-2xl border-2 border-foreground bg-card p-4">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-accent">
      <Clock size={16} className="text-foreground" />
    </div>
    <div className="text-sm">
      <p className="mb-1 font-heading text-xs font-bold uppercase tracking-wide">Horario de entrega</p>
      <ul className="space-y-1 text-muted-foreground">
        <li>
          <span className="font-semibold text-foreground">Lunes a sábado</span>, de 9:00 a. m. a 4:00 p. m.
        </li>
        <li>Domingos y festivos no realizamos entregas: tu pedido se despacha el siguiente día hábil.</li>
        <li>
          Pedidos hechos en la mañana dentro del <span className="font-semibold text-foreground">Valle de Aburrá</span> se entregan el mismo día.
        </li>
      </ul>
    </div>
  </div>
);

export default DeliveryHoursCard;
