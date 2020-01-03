import React from "react"
import PropTypes from "prop-types"
import { format } from "date-fns"
import shouldShow from "../../utils/shouldShow"
import AppContext from "../../context/app-context"
import { i18n } from "../../locale"

function ToPrint({ subject }) {
  const { settings } = React.useContext(AppContext)

  const gender = (key) => {
    const options = {
      M: "Male",
      F: "Female",
      O: "Others",
    }
    return options[key] || "N/A"
  }

  const contribution = (key) => {
    const options = {
      default: "Bed in room",
      full: "100%",
      empty: "0%",
    }
    return options[key] || "N/A"
  }

  // hide everything when no subject is present
  if (Object.keys(subject).length === 0) {
    return null
  }

  return (
    <table id="section-to-print">
      <tbody>
        <tr>
          <td colSpan="2">
            <h3>{subject.name}</h3>
          </td>
        </tr>
        <tr>
          <td>{i18n("Type")}</td>
          <td>{subject.type || "N/A"}</td>
        </tr>
        {shouldShow("club").basedOn(settings) && (
          <tr>
            <td>{i18n("Club")}</td>
            <td>{subject.club || "N/A"}</td>
          </tr>
        )}
        {shouldShow("group").basedOn(settings) && (
          <tr>
            <td>{i18n("Group")}</td>
            <td>{subject.group || "N/A"}</td>
          </tr>
        )}
        {shouldShow("federation").basedOn(settings) && (
          <tr>
            <td>{i18n("Federation")}</td>
            <td>{subject.federation || "N/A"}</td>
          </tr>
        )}
        {shouldShow("yob").basedOn(settings) && (
          <tr>
            <td>{i18n("Year of birth")}</td>
            <td>{subject.yob || "N/A"}</td>
          </tr>
        )}
        {shouldShow("title").basedOn(settings) && (
          <tr>
            <td>{i18n("Title")}</td>
            <td>{subject.title || "N/A"}</td>
          </tr>
        )}
        {shouldShow("gender").basedOn(settings) && (
          <tr>
            <td>{i18n("Gender")}</td>
            <td>{gender(subject.gender)}</td>
          </tr>
        )}
        <tr className="section">
          <td>{i18n("Main tournament")}</td>
          <td>
            {subject.tournaments && subject.tournaments.main && (
              <span>{subject.tournaments.main || "N/A"}</span>
            )}
          </td>
        </tr>
        {shouldShow("tournaments.side").basedOn(settings) && (
          <tr>
            <td>{i18n("Side tournaments")}</td>
            <td>
              {subject.tournaments &&
                subject.tournaments.side &&
                subject.tournaments.side.map((item, index) => (
                  <div key={index} className="leading-loose">
                    {item}
                  </div>
                ))}
            </td>
          </tr>
        )}
        <tr className="section">
          <td>{i18n("Hotel")}</td>
          <td>{subject.hotel.name || "N/A"}</td>
        </tr>
        <tr>
          <td>{i18n("Room type")}</td>
          <td>{subject.hotel.room.type || "N/A"}</td>
        </tr>
        {shouldShow("hotel.room.number").basedOn(settings) && (
          <tr>
            <td>{i18n("Room number")}</td>
            <td>{subject.hotel.room.number || "N/A"}</td>
          </tr>
        )}
        <tr className="section">
          <td>{i18n("Arrival")}</td>
          <td>{format(subject.hotel.arrival, "yyyy/MM/dd") || "N/A"}</td>
        </tr>
        <tr>
          <td>{i18n("Departure")}</td>
          <td>{format(subject.hotel.departure, "yyyy/MM/dd") || "N/A"}</td>
        </tr>
        <tr>
          <td>{i18n("Total nights")}</td>
          <td>{subject.hotel.nights || "N/A"}</td>
        </tr>
        <tr>
          <td>{i18n("Room contribution")}</td>
          <td>{contribution(subject.hotel.room.contribution)}</td>
        </tr>
        <tr className="section">
          <td>{i18n("Taxes")}</td>
          <td>
            {subject.taxes &&
              subject.taxes.map((item, index) => (
                <div key={index} className="leading-loose">
                  {item.name}
                </div>
              ))}
          </td>
        </tr>
        <tr>
          <td>{i18n("Computed total")}</td>
          <td>{subject.payment.computed || "N/A"}</td>
        </tr>
        {shouldShow("payment.discount").basedOn(settings) && (
          <tr>
            <td>{i18n("Discount")}</td>
            <td>{subject.payment.discount || "N/A"}</td>
          </tr>
        )}
        {shouldShow("payment.prepayment").basedOn(settings) && (
          <tr>
            <td>{i18n("Payment in advance")}</td>
            <td>{subject.payment.prepayment || "N/A"}</td>
          </tr>
        )}
        <tr>
          <td>{i18n("TOTAL to pay")}</td>
          <td>{subject.payment.toPay || "N/A"}</td>
        </tr>
        <tr>
          <td>{i18n("TOTAL payed")}</td>
          <td>{subject.payment.toPay || "N/A"}</td>
        </tr>
        {shouldShow("payment.method").basedOn(settings) && (
          <tr>
            <td>{i18n("Payment method")}</td>
            <td>{subject.payment.method || "N/A"}</td>
          </tr>
        )}
        {shouldShow("notes").basedOn(settings) && (
          <tr className="section">
            <td>{i18n("Notes")}</td>
            <td>{subject.notes || "N/A"}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

ToPrint.propTypes = {
  subject: PropTypes.object,
}

ToPrint.defaultProps = {
  subject: {},
}

export default ToPrint
