import React from 'react';
import renderer from 'react-test-renderer';
import LineChart from '../components/Graphs/LineChart';

test('Data shows up for Line Charts', () => {
    const building = "Davies"

    const testRenderer  = renderer.create(<LineChart building={building} />);
    const testInstance = testRenderer.root;
    
    expect(testInstance.findByProps(LineChart).props.building).toBe(building);
});