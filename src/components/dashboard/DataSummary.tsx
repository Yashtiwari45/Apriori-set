
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RetailItem } from '@/utils/aprioriUtils';
import { ShoppingBasket, Users, Globe, Receipt } from 'lucide-react';

type DataSummaryProps = {
  data: RetailItem[];
};

const DataSummary = ({ data }: DataSummaryProps) => {
  // Calculate summary statistics based on the actual data
  const getUniqueCount = (key: keyof RetailItem) => {
    // Filter out null or undefined values before counting
    const validValues = data.filter(item => item[key] !== null && item[key] !== undefined);
    return new Set(validValues.map(item => item[key])).size;
  };

  // Get total number of unique transactions/invoices
  const totalTransactions = getUniqueCount('InvoiceNo');
  
  // Get unique products based on StockCode rather than Description
  // as multiple items might have the same description
  const totalProducts = getUniqueCount('StockCode');
  
  // Filter out null CustomerIDs before counting
  const validCustomers = data.filter(item => item.CustomerID !== null && item.CustomerID !== undefined);
  const totalCustomers = new Set(validCustomers.map(item => item.CustomerID)).size;
  
  // Count unique countries
  const totalCountries = getUniqueCount('Country');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Transactions
          </CardTitle>
          <CardDescription>Total unique invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalTransactions.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingBasket className="h-5 w-5 text-secondary" />
            Products
          </CardTitle>
          <CardDescription>Unique products</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalProducts.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-accent/10 to-accent/5 hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Customers
          </CardTitle>
          <CardDescription>Unique customers</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalCustomers.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-muted/50 to-muted/30 hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            Countries
          </CardTitle>
          <CardDescription>Regions represented</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalCountries}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSummary;
