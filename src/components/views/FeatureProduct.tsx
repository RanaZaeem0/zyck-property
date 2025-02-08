
"use client";
import { Property } from '@/lib/type';
import PropertyCardsecond from '@/components/views/secondPropertyCard';
import { SkeletonPropertyCard } from '../custom/skeleton/SkeletonPropertyCard';
import { useEffect, useState } from 'react';
import { getLocalStorageWithTTL, setLocalStorageWithTTL } from '@/lib/localStorage';
import { propertiesDataLocalStorage } from '@/lib/constant';

const FeatureProduct =  () => {


const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedProperties = getLocalStorageWithTTL(propertiesDataLocalStorage);
    if (storedProperties) {
      setProperties(storedProperties);
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/properties/list?statusProperty=ACCEPTED");
      if (!response.ok) {
        throw new Error(`Error Status ${response.statusText}`);
      }
      const result = await response.json();
      setProperties(result);
      setLocalStorageWithTTL(propertiesDataLocalStorage, result, 1000 * 60 * 1); // Store for 3 minutes
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div>
      {/* Featured Properties Section */}
      <div>
        <div className="px-6 py-8 lg:sm:px-8 lg:sm:py-8">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-bold ">
            Featured Properties
          </h2>
        </div>
        <div className="p-4 mx-auto">
       
        <SkeletonPropertyCard  count={4} />
        </div>
      </div>

      {/* Recent Properties for Rent Section */}
      <div>
        <div className="px-6 py-8 lg:sm:px-8 lg:sm:py-8">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-bold ">
            Recent Properties for Rent
          </h2>
        </div>
        <div className="p-4">
        <SkeletonPropertyCard  count={4} />
        </div>
      </div>

      {/* Recent Properties for Sale Section */}
      <div>
        <div className="px-6 py-8 lg:sm:px-8 lg:sm:py-8">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-bold ">
            Recent Properties for Sell
          </h2>
        </div>
        <div className="p-4">
       <SkeletonPropertyCard  count={4} />
        </div>
      </div>
    </div>
    );
  }

  // Filter and reverse the array once during processing
  const propertiesForRent = properties.filter(
    (item :any) => item.status.value === 'Rent'
  ).reverse().slice(0, 4);
  
  const propertiesForSale = properties
    .filter((item:any) => item.status.value === 'Sell')
    .reverse()
    .slice(0, 4);


  return (
    <div>
      <div>
        <div className="px-6 py-8 lg:sm:px-8 lg:sm:py-8">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-bold ">
            Featured Properties
          </h2>
        </div>
        <div className="p-4 mx-auto">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5">
            {properties.slice().reverse().slice(0, 4).map((property) => (
              <PropertyCardsecond
                key={property.feature.propertyId}
                image={property.images[0]?.url || "https://dummyimage.com/400x400"}
                title={property.name}
                price={property.price}
                location={property.location}
                status={property.status.value}
                features={property.feature}
                onContact={property.contact}
                id={property.feature.propertyId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Properties for Rent Section */}
      <div>
        <div className="px-6 py-8 lg:sm:px-8 lg:sm:py-8">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-bold ">
            Recent Properties for Rent
          </h2>
        </div>
        <div className="p-4">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5">
            {propertiesForRent.map((property) => (
              <PropertyCardsecond
                key={property.feature.propertyId}
                image={property.images[0]?.url || "https://dummyimage.com/400x400"}
                title={property.name}
                price={property.price}
                location={property.location}
                status={property.status.value}
                features={property.feature}
                onContact={property.contact}
                id={property.feature.propertyId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Properties for Sale Section */}
      <div>
        <div className="px-6 py-8 lg:sm:px-8 lg:sm:py-8">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-bold ">
            Recent Properties for Sell
          </h2>
        </div>
        <div className="p-4">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5">
            {propertiesForSale.map((property) => (
              <PropertyCardsecond
                key={property.feature.propertyId}
                image={property.images[0]?.url || "https://dummyimage.com/400x400"}
                title={property.name}
                price={property.price}
                location={property.location}
                status={property.status.value}
                features={property.feature}
                onContact={property.contact}
                id={property.feature.propertyId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
