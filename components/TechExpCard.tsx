import dataset from "../db/techexpdata.json";

type TechExpItem = {
  Backend?: string[];
  Frontend?: string[];
  Database?: string[];
  Tools?: string[];
};

export default function TechExpCard() {
  return dataset.map((items: TechExpItem, index: number) => {
    const keyname: keyof TechExpItem = Object.keys(items)[0] as keyof TechExpItem; 
    
    return (
      <div
        className="w-3/4 space-y-5 shadow-md shadow-oliveGreen px-4 py-2 rounded-md"
        key={index}
      >
        <h1 className="text-2xl py-2 px-2 font-bold pt-4">{keyname}</h1>
        <div className="flex flex-wrap gap-5 pb-8">
          {
            items[keyname]?.map((value: string, index: number) => (
              <span key={index} className="bg-deepBrown py-2 px-4 rounded-md h-fit w-fit">
                {value}
              </span>
            ))
          }
        </div>
      </div>
    );
  });
}
