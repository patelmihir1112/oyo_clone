import axios from "axios";
import { useEffect, useState } from "react";

interface FiltersProps {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  handlePrice: () => void;
  checkedList: string[];
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filters: React.FC<FiltersProps> = ({
  price,
  setPrice,
  handlePrice,
  checkedList,
  setCheckedList,
}) => {
  const [list, setList] = useState<string[]>([]);

  const fetchFacilities = async () => {
    try {
      const { data } = await axios.get<{ facilities: string[] }>("/api/facilities");
      if (data?.facilities) {
        setList(data.facilities);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckList = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let newList: string[] = [];
    if (e.target.checked) {
      newList = [...checkedList, e.target.value];
    } else {
      newList = checkedList.filter((i) => i !== e.target.value);
    }
    setCheckedList(newList);
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <>
      <div className=" border-2 border-red-500 rounded-md m-5 h-auto py-10 px-3">
        <label htmlFor="price" className=" text-xl mr-3 font-bold">
          Price :{" "}
        </label>
        <input
          type="range"
          name="price"
          id="price"
          min={1000}
          max={3500}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          defaultValue={price ? price : 0}
        />
        <span className=" ml-10">&#8377; {price ? price : ""}</span>
        <div>
          <button
            className=" w-40 h-10 bg-green-300 cursor-pointer my-3"
            onClick={handlePrice}
          >
            Search
          </button>
        </div>
        <div className=" my-10 ">
          <h3 className=" text-xl font-bold my-3">Filter by Facilities : </h3>
          {list?.map((e) => {
            return (
              <p key={e} className="grid grid-cols-4 my-3">
                <label htmlFor="checkbox" className=" col-span-2">
                  {e}{" "}
                </label>
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  value={e}
                  className="w-5 h-5 ml-3 col-span-1"
                  onChange={handleCheckList}
                />
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Filters;
