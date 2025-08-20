import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

// Data Interfaces
interface Supplier {
  id: string;
  name: string;
  logo?: string;
  logoText?: string;
  overallScore: number;
  categoryScores: {
    cost: number;
    quality: number;
    speed: number;
  };
  financials: {
    totalPrice: number;
    pricePerKwp: number;
    omCostsPerYear: number;
    materialsCost: number;
    estimatedPayback: number;
  };
}

interface TenderResults {
  projectName: string;
  projectLocation: string;
  suppliers: Supplier[];
  activeFilter: 'price' | 'quality' | 'speed';
}

// Sample Data
const tenderData: TenderResults = {
  projectName: "Solar PV - Schenkendorfstraße",
  projectLocation: "Schenkendorfstraße, Berlin",
  activeFilter: 'price',
  suppliers: [
    {
      id: "1",
      name: "Bayern Solar GmbH",
      logo: "/logos/supplier's logo/Bayern Solar.png",
      logoText: "LOW CARBON ENERGY",
      overallScore: 4.67,
      categoryScores: {
        cost: 4,
        quality: 5,
        speed: 4
      },
      financials: {
        totalPrice: 675000,
        pricePerKwp: 750,
        omCostsPerYear: 4500,
        materialsCost: 495000,
        estimatedPayback: 7.2
      }
    },
    {
      id: "2",
      name: "Hamburg Solartechnik GmbH KG",
      logo: "/logos/supplier's logo/Hamburg Solartechnik.png",
      logoText: "EFC SOLAR",
      overallScore: 4.2,
      categoryScores: {
        cost: 4,
        quality: 4,
        speed: 5
      },
      financials: {
        totalPrice: 729000,
        pricePerKwp: 810,
        omCostsPerYear: 3800,
        materialsCost: 540000,
        estimatedPayback: 7.8
      }
    },
    {
      id: "3",
      name: "Süddeutsche Energietechnik",
      logo: "/logos/supplier's logo/Suddeutsche.png",
      logoText: "solarVoltaics",
      overallScore: 3.2,
      categoryScores: {
        cost: 3,
        quality: 3,
        speed: 4
      },
      financials: {
        totalPrice: 612000,
        pricePerKwp: 680,
        omCostsPerYear: 5200,
        materialsCost: 428000,
        estimatedPayback: 6.5
      }
    }
  ]
};

// Filter Tabs Component
const FilterTabs: React.FC<{ 
  activeFilter: string; 
  onFilterChange: (filter: 'price' | 'quality' | 'speed') => void 
}> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-[14px] text-[var(--text-secondary)]">Filter by:</div>
      <div className="flex gap-2">
        <button
          onClick={() => onFilterChange('price')}
          className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-colors ${
            activeFilter === 'price'
              ? 'bg-white text-[#29b273] border border-[#29b273]'
              : 'bg-[var(--Colours-ContainerBgGrey,#F9FAFB)] text-[var(--text-primary)] border border-[var(--Colours-BorderDark,#D3D7DC)]'
          }`}
        >
          PRICE
        </button>
        <button
          onClick={() => onFilterChange('quality')}
          className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-colors ${
            activeFilter === 'quality'
              ? 'bg-white text-[#29b273] border border-[#29b273]'
              : 'bg-[var(--Colours-ContainerBgGrey,#F9FAFB)] text-[var(--text-primary)] border border-[var(--Colours-BorderDark,#D3D7DC)]'
          }`}
        >
          Quality
        </button>
        <button
          onClick={() => onFilterChange('speed')}
          className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-colors ${
            activeFilter === 'speed'
              ? 'bg-white text-[#29b273] border border-[#29b273]'
              : 'bg-[var(--Colours-ContainerBgGrey,#F9FAFB)] text-[var(--text-primary)] border border-[var(--Colours-BorderDark,#D3D7DC)]'
          }`}
        >
          Speed
        </button>
      </div>
    </div>
  );
};

// Supplier Card Component
const SupplierCard: React.FC<{ supplier: Supplier }> = ({ supplier }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--Colours-BorderLight,#F3F4F6)]">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          {supplier.logo ? (
            <img
              src={supplier.logo}
              alt={`${supplier.name} logo`}
              className="h-[56px] w-auto object-contain"
              onError={(e) => {
                // Fallback to text if logo fails to load
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-[14px] font-bold text-[var(--text-primary)] text-center leading-tight">${supplier.logoText}</span>`;
                }
              }}
            />
          ) : (
            <span className="text-[14px] font-bold text-[var(--text-primary)] text-center leading-tight">
              {supplier.logoText}
            </span>
          )}
        </div>
        
        {/* Company Name */}
        <div className="text-center mb-4">
          <div className="text-[14px] font-bold text-[var(--text-primary)]">
            {supplier.name}
          </div>
        </div>
        
        {/* Score */}
        <div className="text-center mb-6">
          <div className="text-[24px] font-bold text-[var(--text-primary)]">
            {supplier.overallScore}
          </div>
          <div className="text-[12px] text-[var(--text-secondary)]">
            Overall Score
          </div>
        </div>
        
        {/* Contact Button */}
        <div className="mt-auto">
          <button className="w-full inline-flex items-center justify-center rounded-md text-[14px] font-bold leading-[20px] transition-colors px-4 h-10 text-[14px] bg-[var(--Colours-ContainerBgGrey,#F9FAFB)] text-[var(--text-primary)] border border-[var(--Colours-BorderDark,#D3D7DC)] hover:bg-[#eceff3]">
            Contact Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format currency with decimals
const formatCurrencyWithDecimals = (amount: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Main Tender Results Component
const TenderResultsView: React.FC = () => {
  const [data, setData] = useState<TenderResults>(tenderData);

  const handleFilterChange = (filter: 'price' | 'quality' | 'speed') => {
    setData(prev => ({ ...prev, activeFilter: filter }));
  };

  return (
    <div className="space-y-6" style={{ marginTop: "32px" }}>
      {/* Header Container */}
      <div className="flex items-center justify-between">
        {/* Name + Address */}
        <div>
          <h1 className="text-[24px] font-extrabold text-[var(--text-primary)] mb-2">
            {data.projectName}
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)]">
            {data.projectLocation}
          </p>
        </div>
        
        {/* Filters */}
        <div>
          <FilterTabs 
            activeFilter={data.activeFilter} 
            onFilterChange={handleFilterChange} 
          />
        </div>
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {data.suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-lg border border-[var(--Colours-BorderLight,#F3F4F6)] p-6">
        <h2 className="text-[18px] font-bold text-[#29b273] mb-6">
          Cost & Financial Considerations
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <th className="text-left py-3 px-4 font-bold text-[var(--text-primary)]">
                  Category
                </th>
                {data.suppliers.map((supplier) => (
                  <th key={supplier.id} className="text-right py-3 px-4 font-bold text-[var(--text-primary)]">
                    {supplier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  Category Score
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right">
                    <span className="text-[14px] font-bold text-[#29b273]">
                      {supplier.categoryScores.cost}/5
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  Price
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]">
                    {formatCurrency(supplier.financials.totalPrice)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  Price per kWp
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]">
                    {formatCurrency(supplier.financials.pricePerKwp)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  O&M costs per year
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]">
                    {formatCurrencyWithDecimals(supplier.financials.omCostsPerYear)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  Materials Cost
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]">
                    {formatCurrencyWithDecimals(supplier.financials.materialsCost)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  Estimated Payback (years)
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]">
                    {supplier.financials.estimatedPayback}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenderResultsView;
