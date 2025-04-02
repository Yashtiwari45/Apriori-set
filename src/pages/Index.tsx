import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import DataUploader from '../components/dashboard/DataUploader';
import DataSummary from '../components/dashboard/DataSummary';
import DataTable from '../components/dashboard/DataTable';
import ProductChart from '../components/dashboard/ProductChart';
import CountryChart from '../components/dashboard/CountryChart';
import AssociationRulesTable from '../components/analysis/AssociationRulesTable';
import AssociationRuleCard from '../components/analysis/AssociationRuleCard';
import CountrySelector from '../components/analysis/CountrySelector';
import { RetailItem, AssociationRule, filterByCountry, generateAssociationRules } from '../utils/aprioriUtils';
import { extendedSampleData } from '../utils/sampleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, FileText, Info, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Index = () => {
  const [data, setData] = useState<RetailItem[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  const generateRules = (): AssociationRule[] => {
    if (data.length === 0) return [];
    
    const filteredData = selectedCountry !== "All" 
      ? filterByCountry(data, selectedCountry)
      : data;
    
    return generateAssociationRules([], 0.3, 1.0); // Using mock rules for demonstration
  };
  
  const rules = generateRules();

  const handleDataLoaded = (loadedData: RetailItem[]) => {
    setData(loadedData);
  };

  const handleDemoLoad = () => {
    setData(extendedSampleData);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Retail Insights Explorer</h1>
            <p className="text-muted-foreground mt-1">
              Market basket analysis using the Apriori algorithm
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full md:w-[400px]"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="dashboard" className="text-sm px-4 py-2">Dashboard</TabsTrigger>
                <TabsTrigger value="analysis" className="text-sm px-4 py-2">Analysis</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {data.length === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DataUploader onDataLoaded={handleDataLoaded} />
            
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>
                  Get started quickly with sample data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Don't have a dataset ready? Use our sample retail transaction data to explore 
                  the market basket analysis capabilities of the Apriori algorithm.
                </p>
                
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Sample Dataset Information
                  </h3>
                  <p className="text-sm mt-1">
                    This dataset contains retail transactions with the following attributes: InvoiceNo, 
                    StockCode, Description, Quantity, InvoiceDate, UnitPrice, CustomerID, and Country.
                  </p>
                </div>
                
                <Button onClick={handleDemoLoad} className="w-full">
                  Load Demo Data
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        {data.length > 0 && activeTab === "dashboard" && (
          <div className="insights-section space-y-8">
            <DataSummary data={data} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProductChart data={data} />
              <CountryChart data={data} />
            </div>
            
            <DataTable data={data} />
          </div>
        )}
        
        {data.length > 0 && activeTab === "analysis" && (
          <div className="insights-section space-y-8">
            <CountrySelector 
              data={data} 
              selectedCountry={selectedCountry} 
              onCountryChange={setSelectedCountry} 
            />
            
            <Card className="bg-accent/5 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <Lightbulb className="h-5 w-5 mr-2 text-accent" />
                  Understanding Association Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Association rules show relationships between items in your transaction data. 
                  They reveal which products are frequently purchased together, enabling better 
                  cross-selling strategies, product placement, and promotional offers.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="bg-background p-4 rounded-md border shadow-sm">
                    <h4 className="font-semibold mb-1">Support</h4>
                    <p className="text-sm text-muted-foreground">
                      How often items appear together in the dataset, relative to all transactions.
                    </p>
                  </div>
                  <div className="bg-background p-4 rounded-md border shadow-sm">
                    <h4 className="font-semibold mb-1">Confidence</h4>
                    <p className="text-sm text-muted-foreground">
                      How often the rule is true when the antecedent is present in a transaction.
                    </p>
                  </div>
                  <div className="bg-background p-4 rounded-md border shadow-sm">
                    <h4 className="font-semibold mb-1">Lift</h4>
                    <p className="text-sm text-muted-foreground">
                      How much more likely items are bought together compared to by chance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {rules.length === 0 && (
              <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle>No association rules found</AlertTitle>
                <AlertDescription>
                  Try selecting a different country or adjusting the parameters.
                </AlertDescription>
              </Alert>
            )}
            
            {rules.length > 0 && (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Top Association Rules</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rules.slice(0, 6).map((rule, index) => (
                      <AssociationRuleCard key={index} rule={rule} />
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <AssociationRulesTable rules={rules} />
              </>
            )}
          </div>
        )}
        
        <footer className="mt-12 mb-4 text-center text-sm text-muted-foreground">
          <p>Retail Insights Explorer - Market Basket Analysis Tool</p>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
