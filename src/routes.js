import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Products = React.lazy(() => import('./views/products/Products'))
const AddProduct = React.lazy(() => import('./views/products/AddProduct'))
const Orders = React.lazy(() => import('./views/orders/Orders'))
const OrderDetails = React.lazy(() => import('./views/orders/OrdersDetail'))
const Users = React.lazy(() => import('./views/users/Users'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/products', name: 'Products', component: Products },
  { path: '/add', name: 'Add Product', component: AddProduct },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/users', name: 'Users', component: Users },
  { path: '/details/:id', name: 'Details', component: OrderDetails, exact: false },
  // {
  //   path: '/orders',
  //   name: 'Orders',
  //   component: Orders,
  //   children: [{ path: '/orders/details', name: 'Details', component: OrderDetails }],
  // },
]

export default routes
