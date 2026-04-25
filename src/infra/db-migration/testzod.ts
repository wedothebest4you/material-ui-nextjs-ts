const z = require('zod');

const User = z.object({
  name: z.string(),
});

console.log(User.def.shape);
const input = {
  name: '1',
  age: 1,
};
try {
  const validatedInput = User.parse(input);
  console.log(input);
} catch (err) {
  console.log(err);
}
