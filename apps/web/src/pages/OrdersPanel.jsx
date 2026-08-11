import React, { useCallback, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Loader2, MessageCircle, RefreshCw } from 'lucide-react';
import { getOrdersAdmin, updateOrderStatus } from '@/api/orders';
import { formatCOP } from '@/api/products';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const STATUS_OPTIONS = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'cancelado', label: 'Cancelado' },
];

const STATUS_STYLES = {
  pendiente: 'bg-yellow-500/15 text-yellow-500',
  confirmado: 'bg-blue-500/15 text-blue-400',
  enviado: 'bg-primary/15 text-primary',
  cancelado: 'bg-destructive/15 text-destructive',
};

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleString('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
};

const OrdersPanel = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getOrdersAdmin();
      setOrders(data);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error al cargar pedidos', description: error.message });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = async (order, status) => {
    setUpdatingId(order.id);
    try {
      await updateOrderStatus(order.id, status);
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)));
      toast({ title: 'Estado actualizado' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'No se pudo actualizar', description: error.message });
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleExpand = (id) => setExpandedId((prev) => (prev === id ? null : id));

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{orders.length} pedido(s)</p>
        <Button variant="outline" size="sm" onClick={loadOrders} className="gap-2">
          <RefreshCw size={14} /> Actualizar
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-sm border border-border p-10 text-center text-muted-foreground">
          Aún no hay pedidos.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const isExpanded = expandedId === order.id;
            const whatsappHref = order.customer_phone
              ? `https://wa.me/${order.customer_phone.replace(/\D/g, '')}`
              : null;

            return (
              <div key={order.id} className="rounded-sm border border-border bg-card">
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left"
                >
                  <div>
                    <p className="font-semibold">{order.customer_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customer_phone} {order.customer_city ? `· ${order.customer_city}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">{formatDate(order.created_at)}</span>
                    <span className="font-display font-bold text-primary">{formatCOP(order.total)}</span>
                    <span className={`rounded-sm px-2 py-1 text-xs font-semibold ${STATUS_STYLES[order.status] || ''}`}>
                      {STATUS_OPTIONS.find((s) => s.value === order.status)?.label || order.status}
                    </span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border p-4">
                    <div className="mb-4 grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1 text-sm">
                        {order.customer_email && <p><span className="text-muted-foreground">Correo:</span> {order.customer_email}</p>}
                        {order.customer_address && <p><span className="text-muted-foreground">Dirección:</span> {order.customer_address}</p>}
                        {order.notes && <p><span className="text-muted-foreground">Notas:</span> {order.notes}</p>}
                      </div>
                      <div className="flex flex-col items-start gap-3 sm:items-end">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Estado:</span>
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleStatusChange(order, value)}
                            disabled={updatingId === order.id}
                          >
                            <SelectTrigger className="h-9 w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {whatsappHref && (
                          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="gap-2">
                              <MessageCircle size={14} /> Escribir por WhatsApp
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="rounded-sm border border-border">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
                          <tr>
                            <th className="px-3 py-2">Producto</th>
                            <th className="px-3 py-2">Cant.</th>
                            <th className="px-3 py-2">Precio</th>
                            <th className="px-3 py-2">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(order.order_items || []).map((item) => (
                            <tr key={item.id} className="border-t border-border">
                              <td className="px-3 py-2">{item.product_title}</td>
                              <td className="px-3 py-2">{item.quantity}</td>
                              <td className="px-3 py-2">{formatCOP(item.unit_price)}</td>
                              <td className="px-3 py-2">{formatCOP(item.subtotal)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPanel;
