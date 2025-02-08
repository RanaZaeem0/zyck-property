"use client"
import { SkeletonPropertyCard } from '@/components/custom/skeleton/SkeletonPropertyCard';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import PropertyCardsecond from '@/components/views/secondPropertyCard'
import { propertiesDataLocalStorage } from '@/lib/constant';
import { AreaType } from "@prisma/client";
import { getLocalStorageWithTTL } from '@/lib/localStorage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const ITEMS_PER_PAGE = 6;

const RentModule = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, _] = useState(0)


interface Contact {
  email: string;
  name: string;
  phone: string;
}

 interface Features {
  area: number;
  areaType:AreaType
  bathrooms: number;
  bedrooms: number;
  hasBalcony: boolean;
  hasGarage: boolean;
  hasGarden: boolean;
  hasPool: boolean;
  hasGardenYard: boolean;
  hasSwimmingPool: boolean;
  parkingSpots: number;
  propertyId: number;
}

interface Images {
  id: number;
  url: string;
  propertyId: number;
}

interface Location {
  city: {
    id: number;
    value: string;
    stateId: number;
  };
  stateId: number;
}

 interface Property {
  price: string;
  description: string;
  name: string;
  feature: Features;
  status: {
    value: string;
    id:number;
  };
  type: {
    value: string;
  };
  images: Images[];
  location: Location;
  contact: Contact;
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = getLocalStorageWithTTL(propertiesDataLocalStorage);
        if (cachedData) {
          console.log("Using cached data",cachedData);
          setProperties(cachedData.filter((property: Property) => Number(property.status.id) === 1));
          console.log(properties,"after chage");
          
          return;
        }
        console.log("Not using",cachedData);

        const response = await fetch('/api/properties/list?statusId=1statusProperty=ACCEPTED')
        if (!response.ok) {
          throw new Error(`Error Status ${response.statusText}`)
        }
        const result = await response.json()
        setProperties(result)
      } catch (error) {
        throw new Error(`Error Status ${error}`)
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const paginatedProperties = properties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  if (loading) {
    return <div className=''>
         <div
        className="w-full flex items-center mb-8"
        style={{
          backgroundImage: "url(/about.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Ensures the background is fixed during scrolling
          backgroundSize: "cover", // Ensures the image covers the entire div
        }}
      >

        <div className="flex justify-center flex-col bg-black w-screen bg-opacity-50 px-[10%] py-[3%] " >
          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl sm:leading-tight">
            Property for Rent – Find Your Ideal Space
          </h1>
          {/* Paragraph */}
          <p className="my-6 mx-7 text-lg text-gray-200 leading-relaxed sm:text-xl max-w-xl">
            We are looking for a house to rent that is perfect in every sense for our lifestyles and budget. Pakistan and other countries offer a wide range of residential and commercial properties available for rent. ZYCK Property has everything, from a cozy apartment to a spacious house or a prime office space.
          </p>
        </div>
      </div>
     <SkeletonPropertyCard  count={8}/>
     
    </div>
  }
  return (
    <div>
      <div
        className="w-full flex items-center"
        style={{
          backgroundImage: "url(/about.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Ensures the background is fixed during scrolling
          backgroundSize: "cover", // Ensures the image covers the entire div
        }}
      >

        <div className="flex justify-center flex-col bg-black w-screen bg-opacity-50 px-[10%] py-[3%] " >
          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl sm:leading-tight">
            Property for Rent – Find Your Ideal Space
          </h1>
          {/* Paragraph */}
          <p className="my-6 mx-7 text-lg text-gray-200 leading-relaxed sm:text-xl max-w-xl">
            We are looking for a house to rent that is perfect in every sense for our lifestyles and budget. Pakistan and other countries offer a wide range of residential and commercial properties available for rent. ZYCK Property has everything, from a cozy apartment to a spacious house or a prime office space.
          </p>
        </div>
      </div>

      <div className="mt-8 h-full mx-auto w-11/12 ">
        {/* Property Grid */}
        <div className="p-5 mx-auto">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProperties.length > 0
              ? (paginatedProperties.map((property, index) => (
                <PropertyCardsecond
                PropertType='rent'
                  key={index}
                  title={property.name}
                  id={property.feature.propertyId}
                  features={property.feature}
                  image={property.images[0].url}
                  location={property.location}
                  price={property.price}
                  status={property.status.value}
                  onContact={property.contact}
                />
              ))) : (
                <p className="col-span-full text-center">No results found.</p>
              )
            }
          </div>
        </div>
      </div>


      <div className="flex justify-center items-center gap-4 my-8">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='flex items-center gap-2'>
          Previous <ChevronLeft className="w-4 h-4" />
        </Button>

        <div>

          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(index + 1)}
              className='w-10 h-10 p-0'>
              {index + 1}
            </Button>
          ))
          }
        </div>

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='flex items-center gap-2'>
          Next <ChevronRight className="w-4 h-4" />
        </Button>

      </div>
    </div>
  )
}

export default RentModule