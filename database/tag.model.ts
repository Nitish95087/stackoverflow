import { Schema, Document, models, model } from "mongoose";

export interface ITag extends Document {
  name: string;
  questions: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  createdOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
