import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  

  h1 {
    color: grey;
    margin: 10px;
  }

  h1 {
    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 4rem;
`;
