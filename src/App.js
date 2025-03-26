import { Route, Routes, Navigate } from 'react-router-dom'

import LoginForm from './Components/LoginForm'
import Home from './Components/Home'
import Products from './Components/Products'
import ProductItemDetails from './Components/ProductItemDetails'
import Cart from './Components/Cart'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'

import './App.css'

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="/products"
      element={
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      }
    />
    <Route
      path="/products/:id"
      element={
        <ProtectedRoute>
          <ProductItemDetails />
        </ProtectedRoute>
      }
    />
    <Route
      path="/cart"
      element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      }
    />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/not-found" />} />
  </Routes>
)

export default App
