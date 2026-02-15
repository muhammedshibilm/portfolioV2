import dataset from "../db/techexpdata.json";

type SkillItem = {
  name: string;
  icon: string;
};

type TechExpItem = Record<string, SkillItem[]>;

// Cast dataset to the correct type since JSON import might be inferred loosely
const typedDataset = dataset as unknown as TechExpItem[];

export default function TechExpCard() {
  return typedDataset.map((items: TechExpItem, index: number) => {
    const keyname = Object.keys(items)[0];
    const skillItems = items[keyname] || [];

    return (
      <div
        className="w-3/4 space-y-5 shadow-md shadow-oliveGreen px-4 py-2 rounded-md"
        key={index}
      >
        <h1 className="text-2xl py-2 px-2 font-bold pt-4">{keyname}</h1>
        <div className="flex flex-wrap gap-5 pb-8">
          {
            skillItems.map((value: SkillItem, idx: number) => (
              <span key={idx} className="bg-deepBrown py-2 px-4 rounded-md h-fit w-fit">
                {value.name}
              </span>
            ))
          }
        </div>
      </div>
    );
  });
}
