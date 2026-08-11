import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogOut, Pencil, Plus, Trash2, X, ImageOff, Upload } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  formatCOP,
} from '@/api/products';
import { uploadProductImage } from '@/api/storage';
import AdminNav from '@/components/AdminNav';
import OrdersPanel from '@/pages/OrdersPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const emptyForm = {
  title: '',
  subtitle: '',
  description: '',
  ribbon_text: '',
  category: '',
  price: '',
  sale_price: '',
  stock: '',
  images: '', // se guarda como texto, una URL por línea
  is_active: true,
};

const productToForm = (product) => ({
  title: product.title || '',
  subtitle: product.subtitle || '',
  description: product.description || '',
  ribbon_text: product.ribbon_text || '',
  category: product.category || '',
  price: product.price ?? '',
  sale_price: product.sale_price ?? '',
  stock: product.stock ?? '',
  images: (product.images || []).join('\n'),
  is_active: product.is_active ?? true,
});

const formToPayload = (form) => ({
  title: form.title.trim(),
  subtitle: form.subtitle.trim() || null,
  description: form.description.trim() || null,
  ribbon_text: form.ribbon_text.trim() || null,
  category: form.category.trim() || null,
  price: Number(form.price) || 0,
  sale_price: form.sale_price === '' ? null : Number(form.sale_price),
  stock: Number(form.stock) || 0,
  images: form.images
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean),
  is_active: !!form.is_active,
});

const AdminDashboardPage = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef(null);
  const [activeTab, setActiveTab] = useState('productos'); // 'productos' | 'pedidos'

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllProductsAdmin();
      setProducts(data);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error al cargar productos', description: error.message });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const openNewForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingId(product.id);
    setForm(productToForm(product));
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const currentImages = form.images.split('\n').map((s) => s.trim()).filter(Boolean);

  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadProductImage(file);
        uploadedUrls.push(url);
      }
      setForm((f) => ({
        ...f,
        images: [...currentImages, ...uploadedUrls].join('\n'),
      }));
      toast({ title: `${uploadedUrls.length} imagen(es) subida(s)` });
    } catch (error) {
      toast({ variant: 'destructive', title: 'No se pudo subir la imagen', description: error.message });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImageAt = (index) => {
    const next = currentImages.filter((_, i) => i !== index);
    setForm((f) => ({ ...f, images: next.join('\n') }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast({ variant: 'destructive', title: 'Falta el nombre del producto' });
      return;
    }
    setSaving(true);
    try {
      const payload = formToPayload(form);
      if (editingId) {
        await updateProduct(editingId, payload);
        toast({ title: 'Producto actualizado' });
      } else {
        await createProduct(payload);
        toast({ title: 'Producto creado' });
      }
      closeForm();
      loadProducts();
    } catch (error) {
      toast({ variant: 'destructive', title: 'No se pudo guardar', description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Eliminar "${product.title}"? Esta acción no se puede deshacer.`)) return;
    setDeletingId(product.id);
    try {
      await deleteProduct(product.id);
      toast({ title: 'Producto eliminado' });
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (error) {
      toast({ variant: 'destructive', title: 'No se pudo eliminar', description: error.message });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin · Productos</title>
      </Helmet>
      <div className="mx-auto max-w-[90rem] px-4 py-10 sm:px-8">
        <AdminNav />
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold tracking-[0.3em] text-primary">ADMIN</p>
            <h1 className="mt-1 font-display text-3xl font-extrabold">Productos</h1>
            {user?.email && <p className="mt-1 text-sm text-muted-foreground">Sesión: {user.email}</p>}
          </div>
          <div className="flex gap-3">
            <Button onClick={openNewForm} className="gap-2">
              <Plus size={16} /> Nuevo producto
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut size={16} /> Salir
            </Button>
          </div>
        </div>

        {formOpen && (
          <div className="mb-10 rounded-sm border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">
                {editingId ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <Button variant="ghost" size="icon" onClick={closeForm}>
                <X size={18} />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">Nombre *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo / Marca</Label>
                <Input
                  id="subtitle"
                  value={form.subtitle}
                  onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="Proteínas, Creatina, Pre-entreno..."
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio (COP) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sale_price">Precio en oferta (opcional)</Label>
                <Input
                  id="sale_price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.sale_price}
                  onChange={(e) => setForm((f) => ({ ...f, sale_price: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock disponible *</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ribbon_text">Etiqueta (ej. "Nuevo", "Oferta")</Label>
                <Input
                  id="ribbon_text"
                  value={form.ribbon_text}
                  onChange={(e) => setForm((f) => ({ ...f, ribbon_text: e.target.value }))}
                />
              </div>
              <div className="space-y-3 sm:col-span-2">
                <Label>Imágenes del producto</Label>

                {currentImages.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {currentImages.map((url, index) => (
                      <div key={url + index} className="group relative h-20 w-20 overflow-hidden rounded-sm border border-border">
                        <img src={url} alt="" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImageAt(index)}
                          className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFilesSelected}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    {uploading ? 'Subiendo...' : 'Subir imagen'}
                  </Button>
                  <span className="text-xs text-muted-foreground">JPG, PNG o WEBP</span>
                </div>

                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer select-none">O pega URLs de imágenes manualmente</summary>
                  <Textarea
                    className="mt-2"
                    rows={3}
                    placeholder={'https://ejemplo.com/imagen1.jpg\nhttps://ejemplo.com/imagen2.jpg'}
                    value={form.images}
                    onChange={(e) => setForm((f) => ({ ...f, images: e.target.value }))}
                  />
                </details>
              </div>
              <div className="flex items-center gap-3 sm:col-span-2">
                <Switch
                  id="is_active"
                  checked={form.is_active}
                  onCheckedChange={(checked) => setForm((f) => ({ ...f, is_active: checked }))}
                />
                <Label htmlFor="is_active">Visible en la tienda</Label>
              </div>
              <div className="flex gap-3 sm:col-span-2">
                <Button type="submit" disabled={saving} className="gap-2">
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {editingId ? 'Guardar cambios' : 'Crear producto'}
                </Button>
                <Button type="button" variant="outline" onClick={closeForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-sm border border-border p-10 text-center text-muted-foreground">
            Aún no tienes productos. Crea el primero con el botón "Nuevo producto".
          </div>
        ) : (
          <div className="overflow-x-auto rounded-sm border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-border">
                    <td className="flex items-center gap-3 px-4 py-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-muted">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
                        ) : (
                          <ImageOff size={16} className="text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{product.title}</p>
                        {product.subtitle && <p className="text-xs text-muted-foreground">{product.subtitle}</p>}
                      </div>
                    </td>
                    <td className="px-4 py-3">{product.category || '—'}</td>
                    <td className="px-4 py-3">
                      {product.sale_price ? (
                        <span>
                          <span className="font-semibold text-primary">{formatCOP(product.sale_price)}</span>{' '}
                          <span className="text-xs text-muted-foreground line-through">{formatCOP(product.price)}</span>
                        </span>
                      ) : (
                        formatCOP(product.price)
                      )}
                    </td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-sm px-2 py-1 text-xs font-semibold ${
                          product.is_active ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {product.is_active ? 'Visible' : 'Oculto'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => openEditForm(product)}>
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(product)}
                          disabled={deletingId === product.id}
                          className="text-destructive hover:text-destructive"
                        >
                          {deletingId === product.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboardPage;
