import { Outlet } from 'react-router-dom'
import Navbar from '../components/public/Navbar'
import Footer from '../components/public/Footer'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
