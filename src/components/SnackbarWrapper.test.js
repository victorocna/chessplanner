import React from "react"
import { shallow, mount, render } from "enzyme"
import SnackbarWrapper from "./SnackbarWrapper"

/**
 * Always ask yourself: what are the tests trying to prove?
 * @see https://www.youtube.com/watch?v=Af4M8GMoxi4
 * @see https://airbnb.io/enzyme/
 */
it("is hidden by default", () => {
  const wrapper = shallow(<SnackbarWrapper />)
  expect(wrapper.props().openSnackbar).toBeFalsy()
})

it("is shown on button click", () => {
  // TODO: the actual test
})
