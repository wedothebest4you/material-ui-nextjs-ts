var z = require('zod');
var User = z.object({
    name: z.string(),
});
console.log(User.def.shape);
var input = {
    name: '1',
    age: 1,
};
try {
    var validatedInput = User.parse(input);
    console.log(input);
}
catch (err) {
    console.log(err);
}
