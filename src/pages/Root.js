import React from 'react';
import { Button } from 'react-lightning-design-system';

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Button
          onClick={() => {
            console.log('clicked');
          }}
        >
          Simple
        </Button>
        <Button
          type="neutral"
          onClick={() => {
            console.log('clicked');
          }}
        >
          Neutral
        </Button>
        <Button
          type="brand"
          onClick={() => {
            console.log('clicked');
          }}
        >
          Brand
        </Button>
        <Button
          type="neutral"
          icon="download"
          iconAlign="left"
          onClick={() => {
            console.log('clicked');
          }}
        >
          Icon #1
        </Button>
        <Button type="neutral" disabled>
          Disabled Neutral
        </Button>
        <Button type="brand" disabled>
          Disabled Brand
        </Button>
      </div>
    );
  }
}
