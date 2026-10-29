import { DataList } from "./ui/data-list";
import { DataListItem } from "./ui/data-list-item";
import { DataListLabel } from "./ui/data-list-label";
import { DataListValue } from "./ui/data-list-value";

type Item = {
  name: string;
  value: React.ReactNode;
};

export type ListProps = {
  items: Item[];
};

export const List = ({ items }: ListProps) => {
  const itemsEl = items.map((el, idx) => {
    return (
      <DataListItem key={idx}>
        <DataListLabel>{el.name}</DataListLabel>
        <DataListValue>{el.value}</DataListValue>
      </DataListItem>
    );
  });

  return <DataList>{itemsEl}</DataList>;
};
