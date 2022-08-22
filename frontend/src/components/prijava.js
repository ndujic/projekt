import * as React from "react";
import { customFetch } from "../api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Link } from "react-router-dom";

function Prijava() {
  const [email, postaviEmail] = React.useState("");
  const [lozinka, postaviLozinku] = React.useState("");
  const enabled = email.length > 0 && lozinka.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
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
            PrijaviSe({
              email: email,
              lozinka: lozinka,
            })
          }
        >
          Prijavi se
        </Button>
        <div>
          Nemate račun? <Link to="/registracija">Registracija</Link>
        </div>
      </Stack>
    </form>
  );
}

function PrijaviSe(data) {
  customFetch(
    "/prijava",
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
      const token = response.token;
      localStorage.setItem("authToken", token);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default Prijava;
