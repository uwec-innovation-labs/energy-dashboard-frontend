import React from 'react';
import renderer from 'react-test-renderer';
import LineChart from '../components/Graphs/LineChart';

test('Data does not show up for Line Charts', () => {
    const testRenderer  = renderer.create(<LineChart  />);
    const testInstance = testRenderer.root;
    
    expect(testInstance.findByProps(LineChart).props.building).toBeUndefined();
    expect(testInstance.findByProps(LineChart).props.energyType).toBeUndefined();
});