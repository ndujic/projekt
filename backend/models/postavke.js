const mongoose = require("mongoose");

const postavkeSchema = new mongoose.Schema(
  {
    ime: String,
    adresa: String,
    OIB: {
      type: String,
      unique: true,
    },
    PDV: Boolean,
    korisnik: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

postavkeSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Postavke", postavkeSchema, "Postavke");
