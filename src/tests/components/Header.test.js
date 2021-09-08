//react-test-renderer library allows us to render react components virtually within the javascript code for testing
//react-test-renderer doesn't have too many features for advanced testing
//enzyme library provides lots of features to do all kinds of advanced stuff for testing components, like testing button clicks etc
//Shallow rendering is to render single component w/o any user interactions etc
//Full DOM rendering allows rendering child components and stuff too
import React from 'react'
import { shallow } from 'enzyme'
//import ReactShallowRenderer from 'react-test-renderer/shallow'
//import toJson from 'enzyme-to-json' //alternatively setup this in jest.config.json (this file is loaded by jest before it runs the test files)
import Header from '../../components/Header'

test('should render header correctly', () => {
    // const renderer = new ReactShallowRenderer()
    // renderer.render(<Header />)
    // expect(renderer.getRenderOutput()).toMatchSnapshot(); //ALWAYS passes for the first time because no previous snapshot exists to jest takes a new snapshot
    //snapshot => capturing the component at a certain point of time
    //snapshot testing => comparing any changes made to the component with the previous snapshot. You can accept the changes by pressing 'u' in console if the changes are intentional, which updates the snapshot
    //else go back and remove the unintentional change so that snapshot will match again with the component
    //all snapshots can be viewed under '__snapshots__' folder generated automatically by jest when toMatchSnapshot() is invoked
    //do not make manual changes to the above folder
    const wrapper = shallow(<Header />)
    //expect(wrapper.find('h1').text()).toBe('Expensify')
    //expect(toJson(wrapper)).toMatchSnapshot()
    expect(wrapper).toMatchSnapshot()
})