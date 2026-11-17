import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { priceFormat } from "../utils";
import { toast } from "react-toastify";
import customAPI from "../api";

const CartProduct = ({ item, user }) => {
  const { revalidate } = useRevalidator();
  return (
    <>
      <div className="card bg-base-300 shadow-xl h-full flex flex-col justify-between" key={item._id}>
        <figure className="h-64 w-full overflow-hidden bg-base-200">
          <div className="relative w-full h-full">
            <img src={item.image} alt="Shoes" className="w-full h-full object-cover" />
            {item.stock < 1 && (
              <span className="absolute top-2 right-2 badge badge-error font-bold text-white">
                Sold Out
              </span>
            )}
          </div>
        </figure>
        <div className="card-body flex flex-col justify-between flex-grow">
          <div>
            {user && user.role === "owner" && (
              <div className="flex justify-end gap-x-3 mb-2">
                <FaTrash
                  onClick={async () => {
                    await customAPI.delete(`/product/${item._id}`);
                    toast.info("delete berhasil");
                    revalidate();
                  }}
                  className="text-red-500 cursor-pointer"
                />
                <Link to={`/product/${item._id}/edit`}>
                  <FaPencilAlt className="text-info cursor-pointer" />
                </Link>
              </div>
            )}

            <h2 className="card-title text-primary line-clamp-1">{item.name}</h2>
            <p className="font-bold text-blue-950 mt-1">{priceFormat(item.price)}</p>
            <p className="text-sm opacity-80 mt-2 line-clamp-2">{item.description}</p>
          </div>
          
          <div className="hover-3d card-actions justify-end mt-4">
            <Link to={`/Product/${item._id}`} className="btn btn-primary btn-sm md:btn-md">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
