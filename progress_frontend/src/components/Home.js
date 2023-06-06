import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faGraduationCap, faBook } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('./components/assets/wallpaper_full.jpg');
`;

const Title = styled.h1`
  font-size: 8.5rem;
  position: absolute;
  bottom: 60%;
  color: #fff;
  z-index: 50;
`;

const Button = styled(Link)`
  background-color: #ffffff;
  color: #000;
  border: none;
  border-radius: 10rem;
  font-size: 2rem;
  padding: 1rem 2rem;
  text-decoration: none;
  margin-top: 2rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

// const IconContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 50%;
//   margin-top: 3rem;
//   position: absolute;
//   left: 25%;
// `;

// const Icon = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   font-size: 3rem;
//   color: #fff;
//   padding: 10px;
//   background: black;
//   opacity: 0.7;
//   border-radius: 10px;
//   width: 80px;
  
// `;

// const IconLabel = styled.span`
//   font-size: 1.5rem;
//   margin-top: 1rem;
//   color: #fff;
// `;

function Home() {
  return (
    <Container>
      <div className='overlay'></div>
      <Title>Welcome to Earth's #1 Academic Analyzer</Title>
      <div className='buttIcons'>
      <span>
        <Button to="/student">Get GPA</Button>
        <> </>
        <Button to="/marks">Get Marks</Button>
      </span>
      {/* <IconContainer>
        <Icon>
          <FontAwesomeIcon icon={faGraduationCap} />
          <IconLabel>Education</IconLabel>
        </Icon>
        <div style={{opacity:'0.001'}}>.....</div>
        <Icon>
          <FontAwesomeIcon icon={faBook} />
          <IconLabel>Reading</IconLabel>
        </Icon>
      </IconContainer> */}
      </div>
    </Container>
  );
}

export default Home;