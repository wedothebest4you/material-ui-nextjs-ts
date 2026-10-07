import MastersLayout from '../../masters-layout';
export default function Page() {
  return (
    <MastersLayout
      add={<AddForm />}
      edit={<EditForm />}
      delete={<DeleteForm />}
    >
      'Tenant workspace'
    </MastersLayout>
  );
}

function AddForm() {
  return 'Add Form';
}

function EditForm() {
  return 'Edit Form';
}

function DeleteForm() {
  return 'Delete Form';
}
