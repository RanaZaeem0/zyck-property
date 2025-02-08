"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "@/components/ui/loader";
import PropertyCardsecond from "@/components/views/secondPropertyCard";
import { Property } from "@/lib/type";
import { SkeletonPropertyCard } from "@/components/custom/skeleton/SkeletonPropertyCard";
import { getLocalStorageWithTTL } from "@/lib/localStorage";
import { propertiesDataLocalStorage } from "@/lib/constant";

const ITEMS_PER_PAGE = 8; // Set items per page to 3

const PropertySalePage = () => {
  const [data, setData] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const [sortOption, setSortOption] = useState<string>("priceLowToHigh");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = getLocalStorageWithTTL(propertiesDataLocalStorage);
        if (cachedData) {
          console.log("Using cached data",cachedData);
          setData(cachedData.filter((property: Property) => Number(property.status.id) === 2));
          console.log(data,"after chage");
          
          return;
        }
        console.log("Not using",cachedData);
        setLoading(true);
        const response = await fetch(`/api/properties/list?statusId=2statusProperty=ACCEPTED`);
        if (!response.ok) {
          throw new Error(`Error Response ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
        setTotalPages(Math.ceil(result.length / ITEMS_PER_PAGE)); // Calculate total pages
      } catch (error) {
        console.error("Error Status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); // Include currentPage in the dependency array


  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginatedProperties = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="w-full">
        <div
          className="w-full  mb-8 flex items-center"
          style={{
            backgroundImage: "url(/about.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", // Ensures the background is fixed during scrolling
            backgroundSize: "cover", // Ensures the image covers the entire div
          }}
        >

          <div className="flex justify-center flex-col bg-neutral-900 bg-opacity-50 w-screen px-[10%] py-[3%] " >
            {/* Heading */}
            <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl sm:leading-tight">
              Properties for Sale – Find Your Perfect Investment
            </h1>
            {/* Paragraph */}
            <p className="my-6 mx-7 text-lg text-gray-200 leading-relaxed sm:text-xl max-w-xl">
              Looking to buy your dream home or make a smart real estate investment? ZYCK Property offers a wide selection of residential and commercial properties across Pakistan and beyond, carefully curated to meet your needs and budget.</p>
          </div>
        </div>
        <SkeletonPropertyCard count={8}/>
      </div>
    );
  }

  return (
    <>
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

          <div className="flex justify-center flex-col bg-neutral-900 bg-opacity-50 w-screen px-[10%] py-[3%] " >
            {/* Heading */}
            <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl sm:leading-tight">
              Properties for Sale – Find Your Perfect Investment
            </h1>
            {/* Paragraph */}
            <p className="my-6 mx-7 text-lg text-gray-200 leading-relaxed sm:text-xl max-w-xl">
              Looking to buy your dream home or make a smart real estate investment? ZYCK Property offers a wide selection of residential and commercial properties across Pakistan and beyond, carefully curated to meet your needs and budget.</p>
          </div>
        </div>

        <div className="mt-8 h-full mx-auto w-full">
          {/* Property Grid */}
          <div className="p-5 mx-auto w-[95%]">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {paginatedProperties.length > 0 ? (
                paginatedProperties.map((property, index) => (
                  <PropertyCardsecond
                  PropertType="buy"
                    key={index}
                    image={property.images[0]?.url || "/Peshawar.jpg"} // Use first image or placeholder
                    title={property.name}
                    price={property.price}
                    location={property.location}
                    status={property.status.value}
                    features={property.feature}
                    onContact={property.contact}
                    id={property.feature.propertyId}
                  />
                ))
              ) : (
                <p className="col-span-full text-center">No results found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 my-8">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => handlePageChange(index + 1)}
                className="w-10 h-10 p-0"
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default PropertySalePage;
