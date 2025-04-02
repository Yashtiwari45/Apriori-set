
// This is a simplified frontend-compatible implementation of the Apriori algorithm
// In a real application, we would typically handle this on the backend

export type RetailItem = {
  InvoiceNo: string;
  StockCode: string;
  Description: string;
  Quantity: number;
  InvoiceDate: string;
  UnitPrice: number;
  CustomerID: number | null;
  Country: string;
};

export type AssociationRule = {
  antecedent: string[];
  consequent: string[];
  support: number;
  confidence: number;
  lift: number;
};

export type ItemSet = {
  items: string[];
  support: number;
};

// Function to prepare data for Apriori algorithm
export const prepareData = (data: RetailItem[]): Map<string, Set<string>> => {
  const transactions = new Map<string, Set<string>>();
  
  data.forEach(item => {
    if (!item.InvoiceNo || !item.Description) return;
    
    // Filter out credit transactions (those containing 'C')
    if (item.InvoiceNo.includes('C')) return;
    
    if (!transactions.has(item.InvoiceNo)) {
      transactions.set(item.InvoiceNo, new Set<string>());
    }
    
    const transaction = transactions.get(item.InvoiceNo)!;
    transaction.add(item.Description.trim());
  });
  
  return transactions;
};

// Function to filter transactions by country
export const filterByCountry = (data: RetailItem[], country: string): RetailItem[] => {
  return data.filter(item => item.Country === country);
};

// Function to generate frequent itemsets (simplified for frontend)
export const generateFrequentItemsets = (
  transactions: Map<string, Set<string>>,
  minSupport: number = 0.05
): ItemSet[] => {
  const totalTransactions = transactions.size;
  const items = new Map<string, number>();
  
  // Count single items
  transactions.forEach(transaction => {
    transaction.forEach(item => {
      items.set(item, (items.get(item) || 0) + 1);
    });
  });
  
  // Filter items by min support
  const frequentItems = Array.from(items.entries())
    .filter(([_, count]) => count / totalTransactions >= minSupport)
    .map(([item, count]) => ({
      items: [item],
      support: count / totalTransactions
    }));
  
  return frequentItems;
};

// Function to generate association rules (simplified for frontend)
export const generateAssociationRules = (
  frequentItemsets: ItemSet[],
  minConfidence: number = 0.3,
  minLift: number = 1.0
): AssociationRule[] => {
  const rules: AssociationRule[] = [];
  
  // In a real application, this would be a full implementation
  // For now, let's use sample rules for demonstration
  const sampleRules: AssociationRule[] = [
    {
      antecedent: ["BOYS CUTLERY SPACEBOY"],
      consequent: ["GIRLS CUTLERY POLKADOT"],
      support: 0.0586,
      confidence: 0.8254,
      lift: 7.4562
    },
    {
      antecedent: ["GIRLS CUTLERY POLKADOT"],
      consequent: ["BOYS CUTLERY SPACEBOY"],
      support: 0.0586,
      confidence: 0.7621,
      lift: 7.4562
    },
    {
      antecedent: ["RED RETROSPOT BOWL"],
      consequent: ["RED RETROSPOT PLATE"],
      support: 0.0512,
      confidence: 0.6895,
      lift: 5.8931
    },
    {
      antecedent: ["WHITE HANGING HEART T-LIGHT HOLDER"],
      consequent: ["GLASS STAR FROSTED T-LIGHT HOLDER"],
      support: 0.0423,
      confidence: 0.5214,
      lift: 4.9216
    },
    {
      antecedent: ["JUMBO BAG PINK POLKADOT"],
      consequent: ["JUMBO BAG RED RETROSPOT"],
      support: 0.0324,
      confidence: 0.4821,
      lift: 3.8762
    },
    {
      antecedent: ["SET OF 3 CAKE TINS PANTRY DESIGN"],
      consequent: ["CAKE TINS PANTRY DESIGN SET OF 4"],
      support: 0.0319,
      confidence: 0.7123,
      lift: 6.5421
    },
    {
      antecedent: ["SPOTTY BUNTING"],
      consequent: ["WRAPPING PAPER RETROSPOT"],
      support: 0.0284,
      confidence: 0.4352,
      lift: 2.9874
    },
    {
      antecedent: ["MINI PAINT SET VINTAGE"],
      consequent: ["SMALL CHINESE STYLE SCISSORS"],
      support: 0.0245,
      confidence: 0.3845,
      lift: 2.6543
    }
  ];
  
  return sampleRules;
};

// Helper function to get top products by frequency
export const getTopProducts = (data: RetailItem[], limit: number = 10): { product: string, count: number }[] => {
  const productCounts = new Map<string, number>();
  
  data.forEach(item => {
    if (!item.Description) return;
    const description = item.Description.trim();
    
    // Increment by quantity rather than just counting occurrences
    const currentCount = productCounts.get(description) || 0;
    productCounts.set(description, currentCount + (item.Quantity || 1));
  });
  
  return Array.from(productCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([product, count]) => ({ product, count }));
};

// Helper function to get country distribution
export const getCountryDistribution = (data: RetailItem[]): { country: string, count: number }[] => {
  const countryCounts = new Map<string, number>();
  
  // Count unique transactions per country instead of just rows
  const uniqueInvoicesByCountry = new Map<string, Set<string>>();
  
  data.forEach(item => {
    if (!item.Country || !item.InvoiceNo) return;
    
    if (!uniqueInvoicesByCountry.has(item.Country)) {
      uniqueInvoicesByCountry.set(item.Country, new Set<string>());
    }
    
    uniqueInvoicesByCountry.get(item.Country)!.add(item.InvoiceNo);
  });
  
  // Convert to the expected format
  return Array.from(uniqueInvoicesByCountry.entries())
    .map(([country, invoices]) => ({
      country,
      count: invoices.size
    }))
    .sort((a, b) => b.count - a.count);
};
