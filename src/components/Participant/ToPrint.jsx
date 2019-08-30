import React from "react"
import PropTypes from "prop-types"
import shouldShow from "../../utils/shouldShow"
import AppContext from "../../context/app-context"

function ToPrint({ subject }) {
  const { settings } = React.useContext(AppContext)

  /**
   * Shows date from given timestamp as "YY/mm/dd"
   * @param {number} timestamp
   */
  const showDate = (timestamp) => {
    if (typeof timestamp !== "number") {
      return false
    }
    return new Date(timestamp)
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .join("/")
  }

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
          <td>Type</td>
          <td>{subject.type || "N/A"}</td>
        </tr>
        {shouldShow("club").basedOn(settings) && (
          <tr>
            <td>Club</td>
            <td>{subject.club || "N/A"}</td>
          </tr>
        )}
        {shouldShow("group").basedOn(settings) && (
          <tr>
            <td>Group</td>
            <td>{subject.group || "N/A"}</td>
          </tr>
        )}
        {shouldShow("federation").basedOn(settings) && (
          <tr>
            <td>Federation</td>
            <td>{subject.federation || "N/A"}</td>
          </tr>
        )}
        {shouldShow("yob").basedOn(settings) && (
          <tr>
            <td>Birth year</td>
            <td>{subject.yob || "N/A"}</td>
          </tr>
        )}
        {shouldShow("gender").basedOn(settings) && (
          <tr>
            <td>Gender</td>
            <td>{gender(subject.gender)}</td>
          </tr>
        )}
        <tr className="section">
          <td>Main tournament</td>
          <td>
            {subject.tournaments && subject.tournaments.main && (
              <span>{subject.tournaments.main || "N/A"}</span>
            )}
          </td>
        </tr>
        {shouldShow("tournaments.side").basedOn(settings) && (
          <tr>
            <td>Side tournaments</td>
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
          <td>Hotel</td>
          <td>{subject.hotel.name || "N/A"}</td>
        </tr>
        <tr>
          <td>Room type</td>
          <td>{subject.hotel.room.type || "N/A"}</td>
        </tr>
        {shouldShow("hotel.room.number").basedOn(settings) && (
          <tr>
            <td>Room number</td>
            <td>{subject.hotel.room.number || "N/A"}</td>
          </tr>
        )}
        <tr className="section">
          <td>Arrival</td>
          <td>{showDate(subject.hotel.arrival) || "N/A"}</td>
        </tr>
        <tr>
          <td>Departure</td>
          <td>{showDate(subject.hotel.departure) || "N/A"}</td>
        </tr>
        <tr>
          <td>Nights</td>
          <td>{subject.hotel.nights || "N/A"}</td>
        </tr>
        <tr>
          <td>Room contribution</td>
          <td>{contribution(subject.hotel.room.contribution)}</td>
        </tr>
        <tr className="section">
          <td>Taxes</td>
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
          <td>Computed total</td>
          <td>{subject.payment.computed || "N/A"}</td>
        </tr>
        {shouldShow("payment.discount").basedOn(settings) && (
          <tr>
            <td>Discount</td>
            <td>{subject.payment.discount || "N/A"}</td>
          </tr>
        )}
        {shouldShow("payment.prepayment").basedOn(settings) && (
          <tr>
            <td>Payment in advance</td>
            <td>{subject.payment.prepayment || "N/A"}</td>
          </tr>
        )}
        <tr>
          <td>Total to pay</td>
          <td>{subject.payment.toPay || "N/A"}</td>
        </tr>
        <tr>
          <td>Total payed</td>
          <td>{subject.payment.toPay || "N/A"}</td>
        </tr>
        {shouldShow("payment.method").basedOn(settings) && (
          <tr>
            <td>Method of payment</td>
            <td>{subject.payment.method || "N/A"}</td>
          </tr>
        )}
        {shouldShow("notes").basedOn(settings) && (
          <tr className="section">
            <td>Notes</td>
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
