import { arrival, departure } from "../../defaults"

export default {
  name: "",
  type: "",
  gender: "",
  yob: "",
  federation: "",
  club: "",
  title: "",
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
    computed: 0,
    discount: 0,
    prepayment: 0,
    payed: 0,
    toPay: 0,
    method: "cash",
  },
}
