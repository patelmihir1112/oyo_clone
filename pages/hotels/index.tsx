import { useEffect, useState } from "react";
import axios from "axios";
import Filters from "@/components/Filters";
import Header1 from "@/components/Header1";
import Hotel from "@/components/Hotel";
import { NextPage, GetServerSideProps } from "next";
import { IHotel } from "../../types"; // assuming you have a types file with HotelType defined

interface HotelsProps {
  hotels: IHotel[];

}

const Hotels: NextPage<HotelsProps> = ({  hotels:hotels }) => {
  const [price, setPrice] = useState<number>(3500);
  const [list, setList] = useState<IHotel[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const handleCheckList = async () => {
    const { data } = await axios.get(`/api/facilities/search?val=${checkedList}`);
    if (data?.hotels) {
      setList(data.hotels);
    }
  };

  useEffect(() => {
    if (checkedList.length > 0) {
      handleCheckList();
    }
  }, [checkedList]);

  const handlePrice = async () => {
    const { data } = await axios.get(`/api/facilities/range?price=${price}`);
    if (data?.hotels) {
      setList(data.hotels);
    }
  };

  return (
    <>
      <Header1 />
      <div className="grid grid-cols-12">
        <div className=" col-span-3">
          <Filters
            price={price}
            setPrice={setPrice}
            handlePrice={handlePrice}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </div>
        <div className="col-span-9">
          {list.length > 0
            ? list.map((e: IHotel) => {
                return (
                  <div className=" m-5 " key={e._id}>
                    <Hotel e={e} />
                  </div>
                );
              })
            : hotels
            ? hotels.map((e: IHotel) => {
                return (
                  <div className=" m-5 " key={e._id}>
                    <Hotel e={e} />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HotelsProps> = async (ctx) => {
  const res = await fetch(`${process.env.BASE_URL}/api/hotels?city=${ctx.query.city}`);
  const data = await res.json();

  return {
    props: {
      hotels: data.hotels ? data.hotels : data.allhotels,
    },
  };
};

export default Hotels;
