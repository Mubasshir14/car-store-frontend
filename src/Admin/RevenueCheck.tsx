
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DollarSign } from 'lucide-react';
import { useGetAllOrdersQuery } from '@/redux/features/Admin/orderManagementApi';

const RevenueCheck = () => {
  const { data: revenue } = useGetAllOrdersQuery(undefined);
  
  const totalRevenue = revenue?.data?.reduce(
    (acc, order) => acc + order.totalPrice, 
    0
  ) || 0;
  
  const chartData = revenue?.data?.map((order) => ({
    name: order.date,
    revenue: order.totalPrice
  }));

  return (
    <div className="p-6 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6">
      {/* Enhanced Revenue Card */}
      <Card className="lg:col-span-4">
        <div className="h-full flex flex-col items-center justify-center p-6">
          <div className="mb-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <CardHeader className="text-center p-0 space-y-2">
            <CardTitle className="text-xl font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <div className="text-4xl font-bold text-emerald-600">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Revenue Chart (keeping the rest of the component the same) */}
      <Card className="lg:col-span-8">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  className="stroke-gray-200"
                />
                <XAxis 
                  dataKey="name" 
                  className="text-xs"
                  tickLine={false}
                />
                <YAxis 
                  className="text-xs"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Bar 
                  dataKey="revenue"
                  fill="rgb(16 185 129)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueCheck;