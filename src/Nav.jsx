import React from "react";
import { styled } from "styled-components";

function Nav() {
  return <StyledNav>Nav</StyledNav>;
}

export default Nav;

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: #eeeeee;
  position: absolute;
  height: 2rem;
  width: 100%;
  margin-top: 5rem;
`;
