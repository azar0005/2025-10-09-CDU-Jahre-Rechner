import React from 'react';
import { Leaf, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const GruenenReminder = ({ result, birthYear }) => {
  if (result.totalYears === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-l-green-600">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              Hinweis: Die Grünen
              <Info className="w-4 h-4 text-gray-500" />
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Mitglied der Bundesregierung
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Total Years */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 mb-1">Grünen-Regierungsjahre</p>
              <p className="text-4xl font-bold text-green-700">{result.totalYears}</p>
              <p className="text-xs text-gray-500 mt-1">Jahre</p>
            </div>

            {/* Percentage */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 mb-1">Prozentsatz</p>
              <p className="text-4xl font-bold text-green-700">{result.percentage}%</p>
              <p className="text-xs text-gray-500 mt-1">Ihres Lebens</p>
            </div>

            {/* Periods */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 mb-1">Regierungsperioden</p>
              <p className="text-4xl font-bold text-green-700">{result.periods.length}</p>
              <p className="text-xs text-gray-500 mt-1">erlebt</p>
            </div>
          </div>

          {/* Periods Details */}
          <div className="space-y-4">
            {result.periods.map((period, index) => (
              <div
                key={period.id}
                className="bg-green-50 rounded-lg p-4 border border-green-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {period.startYear} - {period.endYear}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Sie erlebten <span className="font-semibold text-green-700">{period.yearsInPeriod} Jahre</span> dieser Periode
                    </p>
                  </div>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {period.duration} Jahre
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Bundeskanzler: </span>
                    <span className="text-gray-600">{period.chancellors[0]}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Vizekanzler: </span>
                    <span className="text-gray-600">{period.viceChancellor}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Koalition: </span>
                    <span className="text-gray-600">{period.coalition}</span>
                  </div>
                  <p className="text-gray-600 italic mt-2">{period.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GruenenReminder;
