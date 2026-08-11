import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogOut, ChevronDown, ChevronUp, Phone, MapPin, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { getOrdersAdmin, updateOrderStatus } from '@/api/orders';
import { formatCOP } from '@/api/products';
import { Button } from '@/components/ui/button';
import AdminNav from '@/components/AdminNav';
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

const AdminOrdersPage = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('todos');

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

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleStatusChange = async (order, newStatus) => {
    setUpdatingId(order.id);
    try {
      await updateOrderStatus(order.id, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o)));
      toast({ title: 'Estado actualizado' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'No se pudo actualizar', description: error.message });
    } finally {
      setUpdatingId(null);
    }
  };

  const visibleOrders = statusFilter === 'todos' ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <>
      <Helmet>
        <title>Admin · Pedidos</title>
      </Helmet>
      <div className="mx-auto max-w-[90rem] px-4 py-10 sm:px-8">
        <AdminNav />
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold tracking-[0.3em] text-primary">ADMIN</p>
            <h1 className="mt-1 font-display text-3xl font-extrabold">Pedidos</h1>
            {user?.email && <p className="mt-1 text-sm text-muted-foreground">Sesión: {user.email}</p>}
          </div>
          <div className="flex items-center gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut size={16} /> Salir
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : visibleOrders.length === 0 ? (
          <div className="rounded-sm border border-border p-10 text-center text-muted-foreground">
            No hay pedidos {statusFilter !== 'todos' ? `en estado "${statusFilter}"` : 'todavía'}.
          </div>
        ) : (
          <div className="space-y-3">
            {visibleOrders.map((order) => {
              const isExpanded = expandedId === order.id;
              return (
                <div key={order.id} className="rounded-sm border border-border bg-card">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      <div>
                        <p className="font-semibold">{order.customer_name}</p>
                        <p className="text-xs text-muted-foreground">
                          #{order.id.slice(0, 8)} · {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-lg font-bold text-primary">{formatCOP(order.total)}</span>
                      <span className={`rounded-sm px-2 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[order.status] || ''}`}>
                        {order.status}
                      </span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border p-4">
                      <div className="mb-4 grid gap-3 text-sm sm:grid-cols-2">
                        <p className="flex items-center gap-2"><Phone size={14} className="text-muted-foreground" /> {order.customer_phone}</p>
                        {order.customer_email && (
                          <p className="flex items-center gap-2"><Mail size={14} className="text-muted-foreground" /> {order.customer_email}</p>
                        )}
                        {(order.customer_city || order.customer_address) && (
                          <p className="flex items-center gap-2 sm:col-span-2">
                            <MapPin size={14} className="text-muted-foreground" />
                            {[order.customer_city, order.customer_address].filter(Boolean).join(' — ')}
                          </p>
                        )}
                        {order.notes && (
                          <p className="text-muted-foreground sm:col-span-2">
                            <span className="font-semibold text-foreground">Notas: </span>{order.notes}
                          </p>
                        )}
                      </div>

                      <div className="mb-4 space-y-2 border-t border-border pt-4">
                        {(order.order_items || []).map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.quantity} x {item.product_title}</span>
                            <span className="font-semibold">{formatCOP(item.subtotal)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 border-t border-border pt-4">
                        <span className="text-sm text-muted-foreground">Cambiar estado:</span>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order, value)}
                          disabled={updatingId === order.id}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((s) => (
                              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {updatingId === order.id && <Loader2 size={14} className="animate-spin" />}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrdersPage;
