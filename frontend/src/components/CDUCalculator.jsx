import React, { useState } from 'react';
import { Calculator, Calendar, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { calculateCDUYears, calculateGruenenYears } from '../mockData';
import Timeline from './Timeline';
import ResultCard from './ResultCard';
import GruenenReminder from './GruenenReminder';

const CDUCalculator = () => {
  const [birthYear, setBirthYear] = useState('');
  const [result, setResult] = useState(null);
  const [gruenenResult, setGruenenResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    const year = parseInt(birthYear);
    
    if (!birthYear || isNaN(year)) {
      setError('Bitte geben Sie ein gültiges Jahr ein');
      return;
    }
    
    if (year < 1900 || year > 2025) {
      setError('Bitte geben Sie ein Jahr zwischen 1900 und 2025 ein');
      return;
    }
    
    setError('');
    const calculationResult = calculateCDUYears(year);
    setResult(calculationResult);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="pt-16 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl mb-6 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            CDU Jahre Rechner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Entdecken Sie, wie viele Jahre Ihres Lebens unter einer CDU-Regierung stattfanden
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Input Card */}
          <Card className="mb-12 border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Ihr Geburtsjahr
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Geben Sie Ihr Geburtsjahr ein, um die Berechnung zu starten
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="number"
                    placeholder="z.B. 1990"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-11 h-14 text-lg border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all"
                    min="1900"
                    max="2025"
                  />
                </div>
                <Button
                  onClick={handleCalculate}
                  className="h-14 px-8 bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Berechnen
                </Button>
              </div>
              {error && (
                <p className="text-red-500 text-center text-sm animate-in fade-in duration-200">{error}</p>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ResultCard result={result} birthYear={birthYear} />
              <Timeline periods={result.periods} birthYear={parseInt(birthYear)} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-500 text-sm">
        <p>Datenquelle: Historische Regierungsperioden der Bundesrepublik Deutschland</p>
        <p className="mt-2">Stand: 2025</p>
      </footer>
    </div>
  );
};

export default CDUCalculator;