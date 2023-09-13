import React from "react";
import { styled } from "styled-components";

function Nav() {
  return <StyledNav>Nav</StyledNav>;
}

export default Nav;

const StyledNav = styled.nav`
  width: 100%;
  background: linear-gradient(90deg, #caf2ff 0%, #06ffee 100%);
`;
