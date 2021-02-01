import { shallow } from 'enzyme';
import App from './App';
import Routes from './routers';

jest.mock('./routers', () => jest.fn());

describe('App', () => {
  it('has Routes', () => {
    expect(shallow(<App />).find(Routes)).toHaveLength(1);
  });
});
