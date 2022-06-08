import { render, screen } from '@testing-library/react';
import Layout from '../../components/layout';

describe('<Layout />', () => {
  beforeEach(() => {
    render(
      <Layout pageTitle="Page Title" pageDescription="Page Description">
        <p data-testid="child">test</p>
      </Layout>,
    );
  });

  it('sets the meta info', async () => {
    expect(Array.from(document.head.getElementsByTagName('title')).find(m => m.innerText === 'Page Title')).not.toBeNull();
    expect(Array.from(document.head.getElementsByTagName('meta')).find(m => m.name === 'description' && m.content === 'Page Description')).not.toBeNull();
  });

  it('contains the provided children', () => {
    screen.getByTestId('child');
  });
});