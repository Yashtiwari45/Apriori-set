
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RetailItem, getTopProducts } from '@/utils/aprioriUtils';

type ProductChartProps = {
  data: RetailItem[];
};

const ProductChart = ({ data }: ProductChartProps) => {
  const topProducts = getTopProducts(data, 8);
  
  // Format data for chart display
  const chartData = topProducts.map(item => ({
    name: item.product.length > 20 ? item.product.substring(0, 20) + '...' : item.product,
    value: item.count,
    fullName: item.product
  }));

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">Top Products</CardTitle>
        <CardDescription>
          Most frequently purchased items by quantity
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <div className="chart-container h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              barSize={24}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e0e0e0" />
              <XAxis 
                type="number" 
                axisLine={false}
                tickLine={false}
                tickCount={5}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={140} 
                axisLine={false}
                tickLine={false}
                style={{ fontSize: '12px', fill: '#666' }}
                tickMargin={8}
              />
              <Tooltip
                formatter={(value: any, name: any) => [value, 'Quantity']}
                labelFormatter={(label: any, items: any) => {
                  if (items && items.length > 0) {
                    return items[0].payload.fullName;
                  }
                  return label;
                }}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  borderRadius: '6px',
                  padding: '10px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f0f0f0'
                }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`hsl(${220 + index * 30}, 85%, 65%)`}
                    fillOpacity={0.85}
                    stroke={`hsl(${220 + index * 30}, 85%, 55%)`}
                    strokeWidth={1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductChart;
