import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { customFetch } from "../api";
import { Link } from "react-router-dom";

function Registracija() {
  const [ime, postaviIme] = React.useState("");
  const [email, postaviEmail] = React.useState("");
  const [lozinka, postaviLozinku] = React.useState("");
  const enabled = ime.length > 0 && email.length > 0 && lozinka.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    postaviIme("");
    postaviEmail("");
    postaviLozinku("");
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        alignitems="center"
      >
        <TextField
          style={{ width: "100%" }}
          required
          type="text"
          id="ime"
          label="Ime"
          value={ime}
          onChange={(event) => {
            postaviIme(event.target.value);
          }}
        />

        <TextField
          style={{ width: "100%" }}
          required
          type="email"
          id="email"
          label="Email"
          value={email}
          onChange={(event) => {
            postaviEmail(event.target.value);
          }}
        />
        <TextField
          style={{ width: "100%" }}
          required
          type="password"
          id="lozinka"
          label="Lozinka"
          value={lozinka}
          onChange={(event) => {
            postaviLozinku(event.target.value);
          }}
        />
        <Button
          style={{ width: "100%" }}
          variant="contained"
          type="submit"
          disabled={!enabled}
          onClick={() =>
            RegistrirajSe({
              ime: ime,
              email: email,
              lozinka: lozinka,
            })
          }
        >
          Registriraj se
        </Button>
        <div>
          Već imate račun? <Link to="/prijava">Prijava</Link>
        </div>
      </Stack>
    </form>
  );
}

function RegistrirajSe(data) {
  customFetch(
    "/registracija",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
    false
  )
    .then((response) => {
      console.log(response.token);
      const token = response.token;
      localStorage.setItem("authToken", token);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default Registracija;
