import Button from "ui/Button";
import Modal from "ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open
        opens="cabin-form"
        render={(openFunction) => <Button onClick={openFunction}>Add new cabin</Button>}
      />
      <Modal.Window
        name="cabin-form"
        render={(closeFunction) => <CreateCabinForm onCloseModal={closeFunction} />}
      />
    </Modal>
  );
}
