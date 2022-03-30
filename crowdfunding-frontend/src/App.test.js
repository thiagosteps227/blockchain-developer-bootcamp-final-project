import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { jsonInterfaceMethodToString } from 'web3-utils';
import App from './App';
import { CreateProjectUseCase } from '../web3/createProject/CreateProjectUseCase';

it('renders the app', () => {
 
  jest.spyOn(CreateProjectUseCase, 'metamaskLogin').mockImplementation(() => {
    return true;
  });
  act(() => {
  render(<App />);
  
  });
  expect(screen.getByText('Crowdfunding')).toBeInTheDocument();
  //const linkElement = screen.getByText(/learn react/i);
  // expect().toBeInTheDocument();
});
