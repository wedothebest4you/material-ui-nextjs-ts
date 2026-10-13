import { Stack, Typography } from '@mui/material';
import MastersActionspace from '../masters-actionspace';

export default function TenantForm() {
  return (
    <MastersActionspace>
      <Typography variant="h3">Tenant Creation</Typography>
      <Form />
    </MastersActionspace>
  );
}

function Form() {
  return (
    <form>
      <Stack spacing={2}>
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
      </Stack>
    </form>
  );
}
