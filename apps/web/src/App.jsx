import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from './components/ui/toaster';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminBlogPage from './pages/AdminBlogPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <ScrollToTop />
                    <Routes>
                        {/* Rutas del panel de administrador (sin el header/carrito de la tienda) */}
                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
                        <Route path="/admin/orders" element={<ProtectedRoute><AdminOrdersPage /></ProtectedRoute>} />
                        <Route path="/admin/blog" element={<ProtectedRoute><AdminBlogPage /></ProtectedRoute>} />

                        {/* Rutas de la tienda pública */}
                        <Route path="*" element={
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/productos" element={<CatalogPage />} />
                                    <Route path="/marcas" element={<CatalogPage title="Sabores" kicker="Nuestros dos sabores" description="Limonudo y Picante — el mismo guacamole artesanal, con un toque distinto para cada antojo." />} />
                                    <Route path="/combos" element={<CatalogPage title="Combos" kicker="Packs para compartir" description="Combina Limonudo y Picante en packs con precio especial." />} />
                                    <Route path="/ofertas" element={<CatalogPage title="Ofertas" kicker="Promociones" description="Descuentos vigentes en nuestros frascos de guacamole artesanal." />} />
                                    <Route path="/blog" element={<BlogPage />} />
                                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                                    <Route path="/product/:id" element={<div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8"><ProductDetailPage /></div>} />
                                    <Route path="/checkout" element={<CheckoutPage />} />
                                    <Route path="/success" element={<OrderSuccessPage />} />
                                </Routes>
                            </Layout>
                        } />
                    </Routes>
                    <Toaster />
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
