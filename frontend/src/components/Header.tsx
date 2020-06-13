import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px 36px;
  border-bottom: 5px solid rgba(255, 255, 255, 0.3);
`;

interface Props {
  logo: string;
}

export default ({ logo }: Props) => {
  return (
    <Container>
      <img src={logo}></img>
    </Container>
  );
};
