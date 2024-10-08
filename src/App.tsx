import React, { useState, useMemo } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface CompanyData {
  [key: string]: string[];
}

interface VendorPricing {
  [key: string]: number;
}

const companyData: CompanyData = {
  Acme: ['Acme System 1', 'Acme System 2', 'Acme System 3'],
  Bloomers: ['Bloomers System 1', 'Bloomers System 2', 'Bloomers System 3'],
  Constantine: [
    'Constantine System 1',
    'Constantine System 2',
    'Constantine System 3',
  ],
};

const vendorPricing: VendorPricing = {
  'Vendor A': 100,
  'Vendor B': 120,
  'Vendor C': 95,
  'Vendor D': 110,
};

function App() {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedSystem, setSelectedSystem] = useState<string>('');
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(event.target.value);
    setSelectedSystem('');
    setSelectedVendors([]);
  };

  const handleSystemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSystem(event.target.value);
    setSelectedVendors([]);
  };

  const handleVendorChange =
    (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newSelectedVendors = [...selectedVendors];
      newSelectedVendors[index] = event.target.value;
      setSelectedVendors(newSelectedVendors);
    };

  const handleNextClick = () => {
    // Handle the next action here
    console.log('Next button clicked');
  };

  const getCoatings = useMemo(() => {
    if (!selectedSystem) return [];
    const coatingCount = parseInt(selectedSystem.slice(-1));
    return Array.from(
      { length: coatingCount },
      (_, i) => `${selectedCompany} Coating ${i + 1}`
    );
  }, [selectedCompany, selectedSystem]);

  const totalPrice = useMemo(() => {
    return selectedVendors.reduce(
      (total, vendor) => total + (vendorPricing[vendor] || 0),
      0
    );
  }, [selectedVendors]);

  const allVendorsSelected = useMemo(() => {
    return (
      selectedVendors.length === getCoatings.length &&
      selectedVendors.every((vendor) => vendor !== '')
    );
  }, [selectedVendors, getCoatings]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Coating Selector
        </h1>

        <div className="mb-4">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Company
          </label>
          <div className="relative">
            <select
              id="company"
              value={selectedCompany}
              onChange={handleCompanyChange}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Choose a company</option>
              {Object.keys(companyData).map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        {selectedCompany && (
          <div className="mb-4">
            <label
              htmlFor="system"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select System
            </label>
            <div className="relative">
              <select
                id="system"
                value={selectedSystem}
                onChange={handleSystemChange}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Choose a system</option>
                {companyData[selectedCompany].map((system) => (
                  <option key={system} value={system}>
                    {system}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
        )}

        {selectedSystem && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Required Coatings:
            </h2>
            {getCoatings.map((coating, index) => (
              <div key={index} className="mb-3">
                <label
                  htmlFor={`vendor-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {coating}
                </label>
                <div className="relative">
                  <select
                    id={`vendor-${index}`}
                    value={selectedVendors[index] || ''}
                    onChange={handleVendorChange(index)}
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="">Choose a vendor</option>
                    {Object.entries(vendorPricing).map(([vendor, price]) => (
                      <option key={vendor} value={vendor}>
                        {vendor} - ${price}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {allVendorsSelected && (
          <div className="mt-4 mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Total Pricing:
            </h2>
            <p className="text-gray-700 font-bold">
              Total price for all coatings: ${totalPrice}
            </p>
          </div>
        )}

        <button
          onClick={handleNextClick}
          disabled={!allVendorsSelected}
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white ${
            allVendorsSelected
              ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
}

export default App;
