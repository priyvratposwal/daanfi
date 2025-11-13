import { Building2, CreditCard, FileText, Landmark, Package, Settings, TrendingUp, Users, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router'

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-lime-200 p-6">
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-8 h-8 text-lime-600" />
        <span className="font-bold text-xl text-gray-800">DAANFI</span>
      </div>

      <nav className="space-y-2">
        <Button onClick={()=>{ navigate('/dashboard') }} variant="ghost" className="w-full justify-start bg-lime-100 text-lime-900 hover:bg-lime-200">
          <Landmark className="mr-3 h-5 w-5" />
          Dashboard
        </Button>
        <Button onClick={()=>navigate('/campaigns')} variant="ghost" className="w-full justify-start bg-lime-100 text-lime-900 hover:bg-lime-200">
          <Users className="mr-3 h-5 w-5" />
          Campaigns
        </Button>
      </nav>

      {/* User Profile */}
      <div onClick={()=>{navigate("/profile")}}  className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center gap-3 p-3 hover:bg-lime-50 rounded-lg cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center relative">
            <span className="text-white font-semibold text-sm">TB</span>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-800">Tokyo Bam</div>
            <div className="text-xs text-gray-500">Metaverse, Inc.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
