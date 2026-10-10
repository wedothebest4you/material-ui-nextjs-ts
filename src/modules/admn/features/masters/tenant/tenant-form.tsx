import MastersLayout from '../masters-layout';

export default function TenantForm() {
  return (
    <MastersLayout>
      <Form />
    </MastersLayout>
  );
}

function Form() {
  return (
    <form>
      <div>
        <label>Name</label>
        <input />
      </div>

      <div>
        <label>Code</label>
        <input />
      </div>

      <div>
        <label>Plan</label>
        <select />
      </div>

      <div>
        <label>Status</label>
        <select />
      </div>

      <div>
        <label>User Limit</label>
        <input />
      </div>
    </form>
  );
}
