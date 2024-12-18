import CopyBtn from "../CopyBtn";
export interface FieldProps {
  name: string;
  value: React.ReactNode;
}

const UserField = ({ name, value }: FieldProps) => {
  return (
    <div className="flex flex-col font-medium hover:bg-gray-200 rounded p-2">
      <div className="text-slate-500 text-sm">{name}</div>
      <div className="text-slate-900 text-base grid grid-cols-8 gap-1 place-items-center">
        <div className={`col-span-7 text-wrap break-all`}>{value}</div>
        <CopyBtn data={value as string} className="col-span-1" />
      </div>
    </div>
  );
};

export default UserField;
