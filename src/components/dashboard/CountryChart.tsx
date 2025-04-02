
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { RetailItem, getCountryDistribution } from '@/utils/aprioriUtils';

type CountryChartProps = {
  data: RetailItem[];
};

const COLORS = [
  '#4361ee', '#3a0ca3', '#7209b7', '#f72585', 
  '#4cc9f0', '#4895ef', '#560bad', '#b5179e',
  '#3f37c9', '#4361ee', '#4895ef', '#4cc9f0'
];

const CountryChart = ({ data }: CountryChartProps) => {
  const countryData = getCountryDistribution(data);
  
  // Format data for the chart
  const chartData = countryData.map(item => ({
    name: item.country,
    value: item.count
  }));

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="#666"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">Country Distribution</CardTitle>
        <CardDescription>
          Transaction distribution by country
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 p-2">
        <div className="chart-container h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth={1.5}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [value, 'Transactions']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  borderRadius: '6px',
                  padding: '10px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f0f0f0'
                }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                wrapperStyle={{
                  paddingTop: '15px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryChart;
