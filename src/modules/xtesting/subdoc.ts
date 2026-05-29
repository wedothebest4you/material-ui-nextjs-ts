// Setup
import { Schema, Types, model, Model } from 'mongoose';

// Subdocument definition
interface Names extends Types.Subdocument {
  // _id: Types.ObjectId;
  firstName: string;
}

// Document definition
interface User {
  names: Names;
}

// Models and schemas
type UserModelType = Model<User>;
const userSchema = new Schema<User, UserModelType>({
  names: new Schema<Names>({ firstName: String }),
});

const UserModel = model<User, UserModelType>('User', userSchema);

// Create a new document:
const doc = new UserModel({ names: { firstName: 'foo' } });

// "Property 'ownerDocument' does not exist on type 'Names'."
// Means that `doc.names` is not a subdocument!
doc.names._id;
