'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * AdminChart Component
 * Displays a visual representation of sales data using Recharts.
 * Currently uses mock data for visualization structure, ready for API integration.
 */
export default function AdminChart() {
  // Mock data simulating daily revenue (We will replace this with real MongoDB aggregation later)
  const data = [
    { name: 'Mon', revenue: 400 },
    { name: 'Tue', revenue: 300 },
    { name: 'Wed', revenue: 200 },
    { name: 'Thu', revenue: 278 },
    { name: 'Fri', revenue: 189 },
    { name: 'Sat', revenue: 239 },
    { name: 'Sun', revenue: 349 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Analytics (Last 7 Days)</h3>
      
      {/* ResponsiveContainer ensures the chart adjusts to screen size */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              {/* Gradient definition for a modern look */}
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
              tickFormatter={(value) => `$${value}`} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#4F46E5" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}