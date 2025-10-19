// Mock CDU government periods data
export const cduPeriods = [
  {
    id: 1,
    startYear: 1949,
    endYear: 1969,
    duration: 20,
    chancellors: ['Konrad Adenauer (1949-1963)', 'Ludwig Erhard (1963-1966)', 'Kurt Georg Kiesinger (1966-1969)'],
    coalition: 'Various coalitions including CDU/CSU-FDP and Grand Coalition with SPD',
    description: 'Post-war reconstruction and Wirtschaftswunder (economic miracle)'
  },
  {
    id: 2,
    startYear: 1982,
    endYear: 1998,
    duration: 16,
    chancellors: ['Helmut Kohl (1982-1998)'],
    coalition: 'CDU/CSU-FDP Coalition',
    description: 'German reunification and European integration'
  },
  {
    id: 3,
    startYear: 2005,
    endYear: 2021,
    duration: 16,
    chancellors: ['Angela Merkel (2005-2021)'],
    coalition: 'Grand Coalition (CDU/CSU-SPD) and CDU/CSU-FDP (2009-2013)',
    description: 'Financial crisis management and refugee policy'
  },
  {
    id: 4,
    startYear: 2025,
    endYear: 2025,
    duration: 1,
    chancellors: ['Friedrich Merz (2025-present)'],
    coalition: 'Grand Coalition (CDU/CSU-SPD)',
    description: 'New CDU government following the end of the Ampel coalition'
  }
];

// Mock Die Grünen (Green Party) government periods data
export const gruenenPeriods = [
  {
    id: 1,
    startYear: 1998,
    endYear: 2005,
    duration: 7,
    chancellors: ['Gerhard Schröder (SPD, 1998-2005)'],
    coalition: 'Red-Green Coalition (SPD-Grüne)',
    description: 'First federal government participation, focus on renewable energy and environmental policy',
    viceChancellor: 'Joschka Fischer (Vice Chancellor and Foreign Minister)'
  },
  {
    id: 2,
    startYear: 2021,
    endYear: 2024,
    duration: 3,
    chancellors: ['Olaf Scholz (SPD, 2021-2024)'],
    coalition: 'Ampel Coalition (SPD-Grüne-FDP)',
    description: 'Second federal government participation, coalition collapsed in November 2024',
    viceChancellor: 'Robert Habeck (Vice Chancellor and Minister for Economic Affairs and Climate Action)'
  }
];

// Calculate years lived under CDU government
export const calculateCDUYears = (birthYear) => {
  // Current date is October 9, 2025
  const currentYear = 2025;
  
  if (birthYear > currentYear) {
    return { totalYears: 0, periods: [], percentage: 0, yearsAlive: 0 };
  }
  
  const yearsAlive = currentYear - birthYear;
  let totalYears = 0;
  const relevantPeriods = [];
  
  cduPeriods.forEach(period => {
    // Calculate overlap between user's life and CDU period
    const overlapStart = Math.max(birthYear, period.startYear);
    const overlapEnd = Math.min(currentYear, period.endYear);
    
    if (overlapStart <= overlapEnd) {
      const yearsInPeriod = overlapEnd - overlapStart + 1;
      totalYears += yearsInPeriod;
      relevantPeriods.push({
        ...period,
        yearsInPeriod,
        overlapStart,
        overlapEnd
      });
    }
  });
  
  const percentage = yearsAlive > 0 ? Math.round((totalYears / yearsAlive) * 100) : 0;
  
  return {
    totalYears,
    periods: relevantPeriods,
    percentage,
    yearsAlive
  };
};