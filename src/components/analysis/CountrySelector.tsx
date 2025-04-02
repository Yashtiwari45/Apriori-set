
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Flag } from 'lucide-react';
import { RetailItem, getCountryDistribution } from '@/utils/aprioriUtils';

type CountrySelectorProps = {
  data: RetailItem[];
  selectedCountry: string;
  onCountryChange: (country: string) => void;
};

const CountrySelector = ({ data, selectedCountry, onCountryChange }: CountrySelectorProps) => {
  const countryData = getCountryDistribution(data);
  
  // Get top 5 countries
  const topCountries = countryData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map(item => item.country);
  
  // Make sure selected country is in the list
  if (selectedCountry && !topCountries.includes(selectedCountry)) {
    topCountries.push(selectedCountry);
  }
  
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          <Globe className="h-5 w-5 mr-2 text-primary" />
          Country Analysis
        </CardTitle>
        <CardDescription>
          View association rules by country
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCountry || "All"} onValueChange={onCountryChange}>
          <TabsList className="w-full flex flex-wrap gap-1 h-auto p-1">
            <TabsTrigger value="All" className="flex-grow py-2 data-[state=active]:bg-primary/90">
              <Globe className="h-4 w-4 mr-1" />
              All Countries
            </TabsTrigger>
            {topCountries.map(country => (
              <TabsTrigger key={country} value={country} className="flex-grow py-2 data-[state=active]:bg-primary/90">
                <Flag className="h-4 w-4 mr-1" />
                {country}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CountrySelector;
