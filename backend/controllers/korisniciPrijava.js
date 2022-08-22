const loginRouter = require("express").Router();
const Korisnik = require("../models/korisnik");
const bcrypt = require("bcrypt");
const jwtSimple = require("jwt-simple");

loginRouter.post("/", async (req, res) => {
  const sadrzaj = req.body;
  try {
    const postojeciKorisnik = await Korisnik.findOne({ email: sadrzaj.email });

    if (!postojeciKorisnik) {
      res.status(404).json({ meassage: "Korisnik ne postoji!" });
    }

    const lozinkaOk = await bcrypt.compare(
      sadrzaj.lozinka,
      postojeciKorisnik.lozinka
    );

    if (!lozinkaOk) {
      res.status(400).json({ meassage: "Neispravna lozinka!" });
    }

    const token = jwtSimple.encode(
      { email: postojeciKorisnik.email },
      process.env.SECRET
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = loginRouter;
