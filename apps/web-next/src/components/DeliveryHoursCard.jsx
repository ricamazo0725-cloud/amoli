// Tarjeta informativa de horario de entrega, para el checkout.
//
// Lógica real de reparto (confirmada 2026-09-18): dos cortes al día.
//   - Pedidos de la noche anterior + la mañana → salen a reparto a las
//     12:00 m. (mediodía).
//   - Pedidos de la tarde + la noche → se entregan la mañana siguiente.
// Solo aplica dentro de la zona sur del Valle de Aburrá hasta Laureles
// (ver src/lib/deliveryZone.js); fuera de esa zona no se hacen entregas
// a domicilio (ver el aviso en CheckoutClient.jsx).
//
// El footer de SiteChrome usa el mismo mensaje resumido ("Entrega el mismo
// día o al siguiente") para que no quede inconsistente con este horario.
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
          Zona sur del Valle de Aburrá (hasta Laureles), <span className="font-semibold text-foreground">lunes a sábado</span>.
        </li>
        <li>
          Pedidos de la <span className="font-semibold text-foreground">noche anterior y la mañana</span> salen a reparto a las <span className="font-semibold text-foreground">12:00 m.</span>
        </li>
        <li>
          Pedidos de la <span className="font-semibold text-foreground">tarde y la noche</span> se entregan a la mañana siguiente.
        </li>
        <li>Domingos y festivos no realizamos entregas: tu pedido se despacha el siguiente día hábil.</li>
      </ul>
    </div>
  </div>
);

export default DeliveryHoursCard;
