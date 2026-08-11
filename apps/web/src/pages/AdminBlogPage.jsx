import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogOut, Pencil, Plus, Trash2, X, ImageOff, Upload } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { getAllPostsAdmin, createPost, updatePost, deletePost, slugify } from '@/api/posts';
import { uploadBlogImage } from '@/api/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import AdminNav from '@/components/AdminNav';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  is_published: true,
};

const postToForm = (post) => ({
  title: post.title || '',
  slug: post.slug || '',
  excerpt: post.excerpt || '',
  content: post.content || '',
  cover_image: post.cover_image || '',
  is_published: post.is_published ?? true,
});

const formToPayload = (form) => ({
  title: form.title.trim(),
  slug: slugify(form.slug || form.title),
  excerpt: form.excerpt.trim() || null,
  content: form.content.trim() || null,
  cover_image: form.cover_image.trim() || null,
  is_published: !!form.is_published,
});

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '';
  }
};

const AdminBlogPage = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllPostsAdmin();
      setPosts(data);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error al cargar el blog', description: error.message });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const openNewForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setSlugTouched(false);
    setFormOpen(true);
  };

  const openEditForm = (post) => {
    setEditingId(post.id);
    setForm(postToForm(post));
    setSlugTouched(true);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setSlugTouched(false);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((f) => ({
      ...f,
      title,
      slug: slugTouched ? f.slug : slugify(title),
    }));
  };

  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadBlogImage(file);
      setForm((f) => ({ ...f, cover_image: url }));
      toast({ title: 'Imagen subida' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'No se pudo subir la imagen', description: error.message });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast({ variant: 'destructive', title: 'Falta el título del artículo' });
      return;
    }
    setSaving(true);
    try {
      const payload = formToPayload(form);
      if (editingId) {
        await updatePost(editingId, payload);
        toast({ title: 'Artículo actualizado' });
      } else {
        await createPost(payload);
        toast({ title: 'Artículo creado' });
      }
      closeForm();
      loadPosts();
    } catch (error) {
      toast({ variant: 'destructive', title: 'No se pudo guardar', description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm(`¿Eliminar "${post.title}"? Esta acción no se puede deshacer.`)) return;
    setDeletingId(post.id);
    try {
      await deletePost(post.id);
      toast({ title: 'Artículo eliminado' });
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (error) {
      toast({ variant: 'destructive', title: 'No se pudo eliminar', description: error.message });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin · Blog</title>
      </Helmet>
      <div className="mx-auto max-w-[90rem] px-4 py-10 sm:px-8">
        <AdminNav />
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold tracking-[0.3em] text-primary">ADMIN</p>
            <h1 className="mt-1 font-display text-3xl font-extrabold">Blog</h1>
            {user?.email && <p className="mt-1 text-sm text-muted-foreground">Sesión: {user.email}</p>}
          </div>
          <div className="flex gap-3">
            <Button onClick={openNewForm} className="gap-2">
              <Plus size={16} /> Nuevo artículo
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
                {editingId ? 'Editar artículo' : 'Nuevo artículo'}
              </h2>
              <Button variant="ghost" size="icon" onClick={closeForm}>
                <X size={18} />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">Título *</Label>
                <Input id="title" value={form.title} onChange={handleTitleChange} required />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="slug">URL (slug)</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setForm((f) => ({ ...f, slug: e.target.value }));
                  }}
                  placeholder="se-genera-solo-desde-el-titulo"
                />
                <p className="text-xs text-muted-foreground">
                  Se verá en: tudominio.com/blog/{slugify(form.slug || form.title) || 'ejemplo'}
                </p>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="excerpt">Resumen corto</Label>
                <Textarea
                  id="excerpt"
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Aparece en la lista del blog y en buscadores."
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="content">Contenido</Label>
                <Textarea
                  id="content"
                  rows={10}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Escribe el artículo. Los saltos de línea se respetan tal cual."
                />
              </div>

              <div className="space-y-3 sm:col-span-2">
                <Label>Imagen de portada</Label>
                {form.cover_image && (
                  <div className="group relative h-32 w-full max-w-xs overflow-hidden rounded-sm border border-border">
                    <img src={form.cover_image} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, cover_image: '' }))}
                      className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelected}
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
              </div>

              <div className="flex items-center gap-3 sm:col-span-2">
                <Switch
                  id="is_published"
                  checked={form.is_published}
                  onCheckedChange={(checked) => setForm((f) => ({ ...f, is_published: checked }))}
                />
                <Label htmlFor="is_published">Publicado (visible en /blog)</Label>
              </div>

              <div className="flex gap-3 sm:col-span-2">
                <Button type="submit" disabled={saving} className="gap-2">
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {editingId ? 'Guardar cambios' : 'Crear artículo'}
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
        ) : posts.length === 0 ? (
          <div className="rounded-sm border border-border p-10 text-center text-muted-foreground">
            Aún no tienes artículos. Crea el primero con el botón "Nuevo artículo".
          </div>
        ) : (
          <div className="overflow-x-auto rounded-sm border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Artículo</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t border-border">
                    <td className="flex items-center gap-3 px-4 py-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-muted">
                        {post.cover_image ? (
                          <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" />
                        ) : (
                          <ImageOff size={16} className="text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{post.title}</p>
                        <p className="text-xs text-muted-foreground">/blog/{post.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{formatDate(post.published_at)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-sm px-2 py-1 text-xs font-semibold ${
                          post.is_published ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {post.is_published ? 'Publicado' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => openEditForm(post)}>
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(post)}
                          disabled={deletingId === post.id}
                          className="text-destructive hover:text-destructive"
                        >
                          {deletingId === post.id ? (
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

export default AdminBlogPage;
