import Menus from "ui/Menus";
import Table from "ui/Table";
import { formatCurrency } from "utils/helpers";
import { HiSquare2Stack } from "react-icons/hi2";
import styled from "styled-components";
import { CabinType } from "types";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }: { cabin: CabinType }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: cabinId, name, image, regularPrice, discount, maxCapacity, description } = cabin;

  function handleClickDuplicate() {
    console.log("errror");
  }

  return (
    <Table.Row>
      <Img src={image || undefined} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleClickDuplicate}>
              Duplicate
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}
