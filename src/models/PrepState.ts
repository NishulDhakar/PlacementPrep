import { model, models, Schema } from "mongoose";

const mockResultSchema = new Schema(
  {
    score: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 1 },
    date: { type: String, required: true },
  },
  { _id: false }
);

const prepStateSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    profile: { type: Schema.Types.Mixed, default: null },
    mockHistory: { type: [mockResultSchema], default: [] },
  },
  { timestamps: true }
);

const PrepState = models.PrepState || model("PrepState", prepStateSchema);

export default PrepState;