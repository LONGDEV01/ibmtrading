import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface Props {
  data: ChartDataPoint[];
  color?: string;
}

export const PriceChart: React.FC<Props> = ({ data, color = '#fcd535' }) => {
  if (data.length === 0) {
    return <div className="h-[400px] flex items-center justify-center text-trade-muted">Loading Chart Data...</div>;
  }

  // Calculate domain for Y-axis to make chart look dynamic
  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const domain = [minPrice - (minPrice * 0.02), maxPrice + (maxPrice * 0.02)];

  return (
    <div className="h-[400px] w-full bg-trade-card rounded-lg p-4 border border-trade-hover">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2b3139" vertical={false} />
          <XAxis 
            dataKey="time" 
            tickFormatter={(time) => new Date(time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            stroke="#848e9c"
            tick={{fontSize: 12}}
            minTickGap={30}
          />
          <YAxis 
            domain={domain}
            tickFormatter={(price) => `$${price.toLocaleString()}`}
            stroke="#848e9c"
            tick={{fontSize: 12}}
            orientation="right"
            width={60}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#181a20', borderColor: '#2b3139', color: '#eaecef' }}
            itemStyle={{ color: '#eaecef' }}
            labelFormatter={(label) => new Date(label).toLocaleString()}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};