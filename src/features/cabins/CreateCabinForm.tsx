import Button from "ui/Button";
import Form from "ui/Form";
import FormRow from "ui/FormRow";
import Input from "ui/Input";

type CreateCabinFormProps = {
  onCloseModal?: () => void;
};

export default function CreateCabinForm({ onCloseModal }: CreateCabinFormProps) {
  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={"error"}>
        <Input type="text" id="name" />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button>Cabin</Button>
      </FormRow>
    </Form>
  );
}
