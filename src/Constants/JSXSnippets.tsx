import { regExp } from "./General";
import { Address } from "Interfaces/Address";
import MenuItem from "@mui/material/MenuItem";

export const mapAddress = (addresses: Address[]) => {
  return addresses.map((address) => {
    const { _id, name, phoneNumber, country, state } = address;

    return (
      <MenuItem key={_id} value={_id}>
        {`${name}, ${phoneNumber}, ${country
          .replace(regExp, "")
          .trim()}, ${state.replace(regExp, "").trim()}`}
      </MenuItem>
    );
  });
};
