
import { RetailItem } from './aprioriUtils';

// Sample data for demonstration purposes
export const sampleRetailData: RetailItem[] = [
  {
    InvoiceNo: "536365",
    StockCode: "85123A",
    Description: "WHITE HANGING HEART T-LIGHT HOLDER",
    Quantity: 6,
    InvoiceDate: "12/1/2010 8:26",
    UnitPrice: 2.55,
    CustomerID: 17850,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536365",
    StockCode: "71053",
    Description: "WHITE METAL LANTERN",
    Quantity: 6,
    InvoiceDate: "12/1/2010 8:26",
    UnitPrice: 3.39,
    CustomerID: 17850,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536365",
    StockCode: "84406B",
    Description: "CREAM CUPID HEARTS COAT HANGER",
    Quantity: 8,
    InvoiceDate: "12/1/2010 8:26",
    UnitPrice: 2.75,
    CustomerID: 17850,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536366",
    StockCode: "22728",
    Description: "ALARM CLOCK BAKELIKE PINK",
    Quantity: 24,
    InvoiceDate: "12/1/2010 8:28",
    UnitPrice: 3.75,
    CustomerID: 12583,
    Country: "France"
  },
  {
    InvoiceNo: "536366",
    StockCode: "22727",
    Description: "ALARM CLOCK BAKELIKE RED",
    Quantity: 24,
    InvoiceDate: "12/1/2010 8:28",
    UnitPrice: 3.75,
    CustomerID: 12583,
    Country: "France"
  },
  {
    InvoiceNo: "536367",
    StockCode: "84029G",
    Description: "KNITTED UNION FLAG HOT WATER BOTTLE",
    Quantity: 6,
    InvoiceDate: "12/1/2010 8:34",
    UnitPrice: 3.39,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536367",
    StockCode: "84029E",
    Description: "RED WOOLLY HOTTIE WHITE HEART",
    Quantity: 6,
    InvoiceDate: "12/1/2010 8:34",
    UnitPrice: 3.39,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536368",
    StockCode: "22633",
    Description: "HAND WARMER UNION JACK",
    Quantity: 6,
    InvoiceDate: "12/1/2010 8:34",
    UnitPrice: 1.85,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536368",
    StockCode: "22632",
    Description: "HAND WARMER RED POLKA DOT",
    Quantity: 6,
    InvoiceDate: "12/1/2010 8:34",
    UnitPrice: 1.85,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536369",
    StockCode: "22745",
    Description: "POPPY'S PLAYHOUSE BEDROOM",
    Quantity: 6,
    InvoiceDate: "12/1/2010 8:35",
    UnitPrice: 2.1,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536370",
    StockCode: "22745",
    Description: "POPPY'S PLAYHOUSE KITCHEN",
    Quantity: 6,
    InvoiceDate: "12/1/2010 8:35",
    UnitPrice: 2.1,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536370",
    StockCode: "22748",
    Description: "POPPY'S PLAYHOUSE LIVINGROOM",
    Quantity: 6,
    InvoiceDate: "12/1/2010 8:35",
    UnitPrice: 2.1,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536371",
    StockCode: "22749",
    Description: "FELTCRAFT PRINCESS CHARLOTTE DOLL",
    Quantity: 8,
    InvoiceDate: "12/1/2010 8:35",
    UnitPrice: 3.75,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536372",
    StockCode: "22310",
    Description: "IVORY KNITTED MUG COSY",
    Quantity: 1,
    InvoiceDate: "12/1/2010 8:39",
    UnitPrice: 1.65,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536372",
    StockCode: "22380",
    Description: "TOY TIDY PINK POLKADOT",
    Quantity: 5,
    InvoiceDate: "12/1/2010 8:39",
    UnitPrice: 2.1,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536373",
    StockCode: "21218",
    Description: "RED RETROSPOT PLATE",
    Quantity: 3,
    InvoiceDate: "12/1/2010 8:39",
    UnitPrice: 1.69,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536373",
    StockCode: "21220",
    Description: "RED RETROSPOT BOWL",
    Quantity: 3,
    InvoiceDate: "12/1/2010 8:39",
    UnitPrice: 1.69,
    CustomerID: 13047,
    Country: "United Kingdom"
  },
  {
    InvoiceNo: "536374",
    StockCode: "21226",
    Description: "BOYS CUTLERY SPACEBOY",
    Quantity: 2,
    InvoiceDate: "12/1/2010 8:40",
    UnitPrice: 1.65,
    CustomerID: 12058,
    Country: "France"
  },
  {
    InvoiceNo: "536374",
    StockCode: "21225",
    Description: "GIRLS CUTLERY POLKADOT",
    Quantity: 2,
    InvoiceDate: "12/1/2010 8:40",
    UnitPrice: 1.65,
    CustomerID: 12058,
    Country: "France"
  },
  {
    InvoiceNo: "536375",
    StockCode: "21218",
    Description: "RED RETROSPOT PLATE",
    Quantity: 2,
    InvoiceDate: "12/1/2010 8:41",
    UnitPrice: 1.69,
    CustomerID: 12058,
    Country: "France"
  },
  {
    InvoiceNo: "536375",
    StockCode: "21220",
    Description: "RED RETROSPOT BOWL",
    Quantity: 2,
    InvoiceDate: "12/1/2010 8:41",
    UnitPrice: 1.69,
    CustomerID: 12058,
    Country: "France"
  },
  {
    InvoiceNo: "536376",
    StockCode: "20930",
    Description: "WORLD WAR 2 GLIDERS ASSTD DESIGNS",
    Quantity: 24,
    InvoiceDate: "12/1/2010 8:42",
    UnitPrice: 0.73,
    CustomerID: null,
    Country: "Portugal"
  },
  {
    InvoiceNo: "536377",
    StockCode: "20897",
    Description: "SPOTTY BUNTING",
    Quantity: 5,
    InvoiceDate: "12/1/2010 8:42",
    UnitPrice: 4.95,
    CustomerID: 12063,
    Country: "Sweden"
  },
  {
    InvoiceNo: "536377",
    StockCode: "20952",
    Description: "WRAPPING PAPER RETROSPOT",
    Quantity: 5,
    InvoiceDate: "12/1/2010 8:42",
    UnitPrice: 0.42,
    CustomerID: 12063,
    Country: "Sweden"
  },
  {
    InvoiceNo: "536378",
    StockCode: "22384",
    Description: "MINI PAINT SET VINTAGE",
    Quantity: 3,
    InvoiceDate: "12/1/2010 8:42",
    UnitPrice: 0.65,
    CustomerID: 12063,
    Country: "Sweden"
  },
  {
    InvoiceNo: "536378",
    StockCode: "84077",
    Description: "SMALL CHINESE STYLE SCISSORS",
    Quantity: 1,
    InvoiceDate: "12/1/2010 8:42",
    UnitPrice: 0.85,
    CustomerID: 12063,
    Country: "Sweden"
  }
];

// Extended sample retail data with more records
export const generateExtendedSampleData = (count: number): RetailItem[] => {
  const baseData = [...sampleRetailData];
  const extendedData: RetailItem[] = [];
  
  const countries = ["United Kingdom", "France", "Germany", "Portugal", "Sweden", "Spain", "Italy", "Netherlands", "Belgium", "Australia"];
  const products = [
    "WHITE HANGING HEART T-LIGHT HOLDER",
    "WHITE METAL LANTERN",
    "CREAM CUPID HEARTS COAT HANGER",
    "ALARM CLOCK BAKELIKE PINK",
    "ALARM CLOCK BAKELIKE RED",
    "KNITTED UNION FLAG HOT WATER BOTTLE",
    "RED WOOLLY HOTTIE WHITE HEART",
    "HAND WARMER UNION JACK",
    "HAND WARMER RED POLKA DOT",
    "POPPY'S PLAYHOUSE BEDROOM",
    "POPPY'S PLAYHOUSE KITCHEN",
    "POPPY'S PLAYHOUSE LIVINGROOM",
    "FELTCRAFT PRINCESS CHARLOTTE DOLL",
    "IVORY KNITTED MUG COSY",
    "TOY TIDY PINK POLKADOT",
    "RED RETROSPOT PLATE",
    "RED RETROSPOT BOWL",
    "BOYS CUTLERY SPACEBOY",
    "GIRLS CUTLERY POLKADOT",
    "WORLD WAR 2 GLIDERS ASSTD DESIGNS",
    "SPOTTY BUNTING",
    "WRAPPING PAPER RETROSPOT",
    "MINI PAINT SET VINTAGE",
    "SMALL CHINESE STYLE SCISSORS",
    "GLASS STAR FROSTED T-LIGHT HOLDER",
    "JUMBO BAG PINK POLKADOT",
    "JUMBO BAG RED RETROSPOT",
    "SET OF 3 CAKE TINS PANTRY DESIGN",
    "CAKE TINS PANTRY DESIGN SET OF 4"
  ];
  
  // Copy base data
  extendedData.push(...baseData);
  
  // Generate additional data
  for (let i = 0; i < count - baseData.length; i++) {
    const baseItem = baseData[i % baseData.length];
    const invoiceNo = (536380 + Math.floor(i / 3)).toString();
    const stockCode = (parseInt(baseItem.StockCode) + i % 100).toString();
    const productIndex = Math.floor(Math.random() * products.length);
    const countryIndex = Math.floor(Math.random() * countries.length);
    
    extendedData.push({
      InvoiceNo: invoiceNo,
      StockCode: stockCode,
      Description: products[productIndex],
      Quantity: Math.floor(Math.random() * 10) + 1,
      InvoiceDate: baseItem.InvoiceDate,
      UnitPrice: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
      CustomerID: Math.random() > 0.1 ? Math.floor(Math.random() * 20000) + 10000 : null,
      Country: countries[countryIndex]
    });
  }
  
  return extendedData;
};

// Generate 500 sample records for demonstration
export const extendedSampleData = generateExtendedSampleData(500);
