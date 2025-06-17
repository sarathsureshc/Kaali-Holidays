import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AddPackage from './pages/AddPackage';
import EditPackage from './pages/EditPackage';

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/add" element={<AddPackage />} />
      <Route path="/admin/edit/:id" element={<EditPackage />} />
    </Routes>
  );
}

export default App;
