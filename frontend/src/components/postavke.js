import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useSWR from "swr";
import Checkbox from "@mui/material/Checkbox";

import { OsvjeziPostavke } from "./osvjeziPostavke";

function Postavke() {
  const { data } = useSWR("/api/postavke");
  const [ime, postaviIme] = React.useState("");
  const [adresa, postaviAdresu] = React.useState("");
  const [OIB, postaviOIB] = React.useState("");
  const [PDV, postaviPDV] = React.useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    postaviIme("");
    postaviAdresu("");
    postaviOIB("");
  };

  if (!data) return <div>loading...</div>;
  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      style={{ width: "100%", marginTop: "50px" }}
      direction="column"
    >
      <Stack alignItems="center" spacing={2} alignitems="center">
        <div>
          <TextField
            required
            id="ime"
            label="Ime"
            defaultValue={data.ime}
            onChange={(event) => {
              postaviIme(event.target.value);
            }}
          />
          <TextField
            required
            id="adresa"
            label="Adresa"
            defaultValue={data.adresa}
            onChange={(event) => {
              postaviAdresu(event.target.value);
            }}
          />
          <TextField
            required
            id="oib"
            label="OIB"
            defaultValue={data.OIB}
            onChange={(event) => {
              postaviOIB(event.target.value);
            }}
          />
          <br />
          PDV obveznik:{" "}
          <Checkbox
            defaultChecked={data.PDV}
            inputProps={{ "aria-label": "Checkbox demo" }}
            onChange={(event) => {
              postaviPDV(event.target.checked);
            }}
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          onClick={() =>
            OsvjeziPostavke({
              ime: ime || data.ime,
              adresa: adresa || data.adresa,
              OIB: OIB || data.OIB,
              PDV: PDV === undefined ? data.PDV : PDV,
            })
          }
        >
          Spremi
        </Button>
      </Stack>
    </form>
  );
}
export default Postavke;
