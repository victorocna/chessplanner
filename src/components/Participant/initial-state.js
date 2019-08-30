import { arrival, departure } from "../../defaults"

export default {
  name: "",
  type: "",
  gender: "",
  yob: "",
  club: "",
  federation: "",
  traits: {},
  mainTournament: "",
  sideTournaments: [],
  hotel: "",
  roomType: "",
  roomNumber: "",
  arrival: arrival || +new Date(),
  departure: departure || +new Date(),
  paymentType: "",
  notes: "",
  payment: {
    computed: "",
    discount: "",
    prepay: "",
    toPay: "",
    payed: "",
    method: "",
  }
}
