import { arrival, departure } from "../../defaults"

export default {
  name: "",
  type: "",
  gender: "",
  yob: "",
  federation: "",
  club: "",
  traits: [],
  taxes: [],
  notes: "",
  tournaments: {
    main: "",
    side: [],
  },
  hotel: {
    name: "",
    room: {
      type: "",
      number: "",
      price: "",
      capacity: "",
      contribution: "default",
    },
    arrival,
    departure,
    nights: "",
  },
  payment: {
    computed: "",
    discount: "",
    prepayment: "",
    payed: "",
    toPay: "",
    method: "cash",
  },
}
