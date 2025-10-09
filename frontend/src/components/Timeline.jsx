import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, Users } from 'lucide-react';

const Timeline = ({ periods, birthYear }) => {
  if (periods.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="py-12 text-center">
          <p className="text-gray-600 text-lg">
            Sie wurden nach allen CDU-Regierungsperioden geboren oder es gibt keine Überschneidungen.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Detaillierte Übersicht der Regierungsperioden
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {periods.map((period, index) => (
          <div
            key={period.id}
            className="relative pl-8 pb-8 last:pb-0 border-l-2 border-gray-200 hover:border-gray-400 transition-colors duration-300"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 w-4 h-4 bg-gray-800 rounded-full -ml-[9px] shadow-lg" />
            
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300">
              {/* Period Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {period.startYear} - {period.endYear}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Sie erlebten <span className="font-semibold text-gray-700">{period.yearsInPeriod} Jahre</span> dieser Periode
                  </p>
                </div>
                <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold">
                  {period.duration} Jahre
                </div>
              </div>

              {/* Chancellors */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <h4 className="font-semibold text-gray-700">Bundeskanzler:</h4>
                </div>
                <ul className="space-y-1 ml-6">
                  {period.chancellors.map((chancellor, idx) => (
                    <li key={idx} className="text-gray-600">
                      {chancellor}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coalition */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <h4 className="font-semibold text-gray-700">Koalition:</h4>
                </div>
                <p className="text-gray-600 ml-6">{period.coalition}</p>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {period.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Timeline;