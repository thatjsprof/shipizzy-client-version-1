import Lf from "localforage";

Lf.config({
  name: "Shipizzy",
  storeName: "ShipizzyClient",
  description: "For data persistence where required",
});

export default Lf;
