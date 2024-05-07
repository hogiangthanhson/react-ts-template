import AddCabin from "features/cabins/AddCabin";
import CabinTable from "features/cabins/CabinTable";
import Heading from "ui/Heading";
import Row from "ui/Row";

export default function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading>All cabins</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}