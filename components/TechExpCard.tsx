import dataset from "../db/techexpdata.json";

export default function TechExpCard() {
  // return Array(4)
  //   .fill(0)
  //   .map((_, index) => {
  //     return (
  //     <div className="w-3/4 space-y-5 shadow-md shadow-oliveGreen px-4 py-2 rounded-md" key={index}>
  //       <h1 className="text-2xl py-2 px-2 font-bold pt-4">Backend</h1>
  //       <div className="flex flex-wrap gap-5 pb-8">
  //         <span className="bg-deepBrown py-2 px-4 rounded-md h-fit w-fit">API</span>
  //         <span className="bg-deepBrown py-2 px-4 rounded-md h-fit w-fit">REST</span>
  //         <span className="bg-deepBrown py-2 px-4 rounded-md h-fit w-fit">Django</span>
  //         <span className="bg-deepBrown py-2 px-4 rounded-md h-fit w-fit">API</span>
  //         <span className="bg-deepBrown py-2 px-4 rounded-md h-fit w-fit">API</span>
  //         <span className="bg-deepBrown py-2 px-4 rounded-md h-fit w-fit">API</span>
  //       </div>
  //     </div>
  //     );
  //   });

  return dataset.map((items, index) => {

    const keyname = Object.keys(items)
      
    return (
            <div className="w-3/4 space-y-5 shadow-md shadow-oliveGreen px-4 py-2 rounded-md" key={index}>
        <h1 className="text-2xl py-2 px-2 font-bold pt-4">{keyname}</h1>
        <div className="flex flex-wrap gap-5 pb-8">
          {
            items[keyname].map((value,index)=>  <span key={index} className="bg-deepBrown py-2 px-4 rounded-md h-fit w-fit">{value}</span> )
          }
        </div>
      </div>
    )
   
  });
}
