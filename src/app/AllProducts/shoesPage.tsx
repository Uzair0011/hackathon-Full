import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export default async function ShoesPage2() {
  interface dataType {
    _id: string;
    title: string;
    price: string;
    image?: string;
    type?: string;
    typeC?: string;
  }

  // Fetch data from Sanity
  const postData = async () => {
    const data = await client.fetch(
      `*[_type == "product"]{
          _id,
          title,
          price,
          image,
          type,
          typeC
        }`
    );
    return data;
  };

  const receivedData: dataType[] = await postData();
  console.log(receivedData);
  return (
    <div>
      <div>
        <div className="h-auto flex flex-col items-center justify-between px-4 py-8 sm:py-11">
          <div className="w-full h-full bg-cover flex flex-wrap justify-center sm:justify-between gap-2">
            {/* Map over the received data */}
            {receivedData.length > 0 ? (
              receivedData.map((item) => (
                <div
                  key={item._id}
                  className="w-[250px] sm:w-[270px] md:w-[270px] flex flex-col items-center overflow-hidden my-4"
                >
                  {/* Image Section */}
                  <div className="w-[full] h-[270px] flex items-center justify-center bg-gray-100 duration-500 hover:scale-90 cursor-pointer">
                    <Link href={`/AllProducts/${item._id}`}>
                      {item.image ? (
                        <Image
                          src={urlFor(item.image).width(500).height(500).url()}
                          alt={item.title}
                          width={500}
                          height={500}
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-[500px] h-[500px] bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">No Image Available</p>
                        </div>
                      )}
                    </Link>
                  </div>

                  {/* Text Section */}
                  <div className="w-full py-3">
                    <p className="text-[15px] font-medium text-[#9E3500]">
                      Just In
                    </p>
                    <h3 className="text-[16px] font-medium">{item.title}</h3>
                    {item.type && (
                      <h3 className="text-[14px] text-gray-600">{item.type}</h3>
                    )}
                    {item.typeC && (
                      <h3 className="text-[14px] text-gray-600">
                        {item.typeC}
                      </h3>
                    )}
                    <h3 className="text-[16px] font-bold mt-1">
                      MRP: ₹{item.price}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products available.</p>
            )}
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}
