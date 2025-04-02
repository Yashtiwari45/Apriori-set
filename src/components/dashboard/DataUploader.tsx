
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RetailItem } from '@/utils/aprioriUtils';
import { useToast } from '@/hooks/use-toast';

type DataUploaderProps = {
  onDataLoaded: (data: RetailItem[]) => void;
};

const DataUploader = ({ onDataLoaded }: DataUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const parseCSV = (text: string): RetailItem[] => {
    // Split the CSV text into lines
    const lines = text.trim().split('\n');
    
    // If there's no data or just a header, return an empty array
    if (lines.length <= 1) return [];
    
    // Extract headers and remove quotes if present
    const headers = lines[0].split(',').map(header => 
      header.trim().replace(/^"(.*)"$/, '$1')
    );
    
    // Find the index of each column we need
    const invoiceNoIndex = headers.findIndex(h => h.toLowerCase().includes('invoice') || h.toLowerCase().includes('order'));
    const stockCodeIndex = headers.findIndex(h => h.toLowerCase().includes('stock') || h.toLowerCase().includes('product') || h.toLowerCase().includes('item'));
    const descriptionIndex = headers.findIndex(h => h.toLowerCase().includes('desc'));
    const quantityIndex = headers.findIndex(h => h.toLowerCase().includes('quant'));
    const dateIndex = headers.findIndex(h => h.toLowerCase().includes('date'));
    const priceIndex = headers.findIndex(h => h.toLowerCase().includes('price') || h.toLowerCase().includes('amount'));
    const customerIdIndex = headers.findIndex(h => h.toLowerCase().includes('customer'));
    const countryIndex = headers.findIndex(h => h.toLowerCase().includes('country'));
    
    // Process each line (skipping header)
    return lines.slice(1).map(line => {
      // Handle cases where commas might be inside quotes
      const values: string[] = [];
      let currentValue = "";
      let insideQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(currentValue);
          currentValue = "";
        } else {
          currentValue += char;
        }
      }
      
      // Add the last value
      values.push(currentValue);
      
      // Create the RetailItem object, using appropriate fallbacks for missing data
      return {
        InvoiceNo: invoiceNoIndex >= 0 ? values[invoiceNoIndex].replace(/"/g, '') : `Order-${Math.floor(Math.random() * 10000)}`,
        StockCode: stockCodeIndex >= 0 ? values[stockCodeIndex].replace(/"/g, '') : `SKU-${Math.floor(Math.random() * 10000)}`,
        Description: descriptionIndex >= 0 ? values[descriptionIndex].replace(/"/g, '') : 'Unknown Item',
        Quantity: quantityIndex >= 0 ? parseInt(values[quantityIndex]) || 1 : 1,
        InvoiceDate: dateIndex >= 0 ? values[dateIndex].replace(/"/g, '') : new Date().toISOString(),
        UnitPrice: priceIndex >= 0 ? parseFloat(values[priceIndex]) || 0 : 0,
        CustomerID: customerIdIndex >= 0 ? parseInt(values[customerIdIndex]) || null : null,
        Country: countryIndex >= 0 ? values[countryIndex].replace(/"/g, '') : 'Unknown'
      };
    }).filter(item => item.Description && item.Description.trim() !== '');
  };

  const handleFileUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        const parsedData = parseCSV(csvText);
        
        if (parsedData.length === 0) {
          toast({
            title: "No valid data found",
            description: "The CSV file doesn't contain valid data or is empty. Please check the format.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        onDataLoaded(parsedData);
        
        toast({
          title: "Data loaded successfully",
          description: `Processed ${parsedData.length} records from ${file.name}.`,
          variant: "default",
        });
      } catch (error) {
        console.error("Error parsing CSV:", error);
        toast({
          title: "Error loading data",
          description: "There was a problem processing your file. Please check the format and try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      toast({
        title: "Error reading file",
        description: "There was a problem reading your file. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Data</CardTitle>
        <CardDescription>
          Upload your retail transaction data in CSV format to analyze with the Apriori algorithm.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          {file && (
            <div className="flex items-center justify-between bg-muted p-2 rounded-md mt-2">
              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="h-7 w-7 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleFileUpload}
          disabled={!file || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload and Analyze
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataUploader;
