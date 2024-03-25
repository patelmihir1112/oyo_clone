import { City } from "@/types"

function Header2() {
  const List : City[] = [
    {
        name :"Banglore"
    },
    {
        name :"calcuta"
    },
    {
        name :"ahmedabad"
    },
    {
        name :"dellii"
    },
    {
        name :"gandhinagr"
    },
  ]
  return (
    <div className='flex px-10 bg-gray-100 justify-between'>
        {List.map((item=>{
            return <span key={item.name}>{item.name}</span>
        }))}
    </div>
  )
}

export default Header2