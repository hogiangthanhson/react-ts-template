import Empty from "ui/Empty";
import Menus from "ui/Menus";
import Spinner from "ui/Spinner";
import Table from "ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

export default function CabinTable() {
  const { cabins, isLoading } = useCabins();

  if (isLoading) return <Spinner />;
  if (!cabins) return <Empty resource="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={cabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
      </Table>
    </Menus>
  );
}