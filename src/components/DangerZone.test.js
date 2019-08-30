import React from "react"
import { shallow, mount, render } from "enzyme"
import DangerZone from "./DangerZone"

/**
 * Always ask yourself: what are the tests trying to prove?
 * @see https://www.youtube.com/watch?v=Af4M8GMoxi4
 * @see https://airbnb.io/enzyme/
 */
it("renders DangerZone with id (specific for update pages)", () => {
  const wrapper = shallow(<DangerZone id="1" />)
  expect(wrapper.text()).toContain("More settings")
})

it("does not render DangerZone without id (specific for create pages)", () => {
  const wrapper = shallow(<DangerZone />)
  expect(wrapper.text()).toBeFalsy()
})
