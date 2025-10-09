import React from 'react';
import { Clock, Award, BarChart3 } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const ResultCard = ({ result, birthYear }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Years Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-800 to-gray-700 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <CardContent className="pt-8 pb-8 relative z-10">
          <Clock className="w-8 h-8 mb-4 text-gray-300" />
          <p className="text-sm font-medium text-gray-300 mb-2">CDU-Regierungsjahre</p>
          <p className="text-5xl font-bold mb-2">{result.totalYears}</p>
          <p className="text-sm text-gray-300">von {result.yearsAlive} Jahren gelebt</p>
        </CardContent>
      </Card>

      {/* Percentage Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <CardContent className="pt-8 pb-8 relative z-10">
          <BarChart3 className="w-8 h-8 mb-4 text-blue-200" />
          <p className="text-sm font-medium text-blue-100 mb-2">Prozentsatz</p>
          <p className="text-5xl font-bold mb-2">{result.percentage}%</p>
          <p className="text-sm text-blue-100">Ihres Lebens</p>
        </CardContent>
      </Card>

      {/* Periods Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <CardContent className="pt-8 pb-8 relative z-10">
          <Award className="w-8 h-8 mb-4 text-emerald-200" />
          <p className="text-sm font-medium text-emerald-100 mb-2">Regierungsperioden</p>
          <p className="text-5xl font-bold mb-2">{result.periods.length}</p>
          <p className="text-sm text-emerald-100">erlebt</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultCard;