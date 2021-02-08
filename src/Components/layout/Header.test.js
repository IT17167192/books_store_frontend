import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import {ROUTES} from "../../config";
import Store from "../website/Store";
import Home from "../website/Home";

it("Header expected names should be matched", () => {
    //mocking the history push method
    const historyMock = { push: jest.fn() };
    //Mocking header location to landing page which equal to "/"
    historyMock.location = {
        hash: "",
        pathname: ROUTES.landing_page,
        search: "",
        state: undefined
    };

    const wrapper = shallow(<Header history={historyMock}/>);
    const storeLink = wrapper.find('#storeLink');
    const result = storeLink.text();

    expect(result).toBe("Store");
});

it("After click on store in the header, layout title should be equal to Store", () => {
    //mocking the history push method of header
    const historyMockHeader = { push: jest.fn() };
    //Mocking header location to landing page which equal to "/"
    historyMockHeader.location = {
        hash: "",
        pathname: ROUTES.landing_page,
        search: "",
        state: undefined
    };

    const wrapperHeader = shallow(<Header history={historyMockHeader}/>);
    const storeLink = wrapperHeader.find('#storeLink');

    //simulate click
    storeLink.simulate("click");

    //mocking the history push method of web contaoner
    const historyMockContainer = { push: jest.fn() };
    //Mocking header location to store page which equal to "/store"
    historyMockContainer.location = {
        hash: "",
        pathname: ROUTES.store_page,
        search: "",
        state: undefined
    };

    const wrapperContainer = shallow(<Store history={historyMockContainer}/>);
    const title = wrapperContainer.find("#title");
    const result = title.text();

    expect(result).toBe("All Books");
})

// it("After click on store in the header, layout title should be equal to Store and test with Home title, so that this should be failed", () => {
//     //mocking the history push method of header
//     const historyMockHeader = { push: jest.fn() };
//     //Mocking header location to landing page which equal to "/"
//     historyMockHeader.location = {
//         hash: "",
//         pathname: ROUTES.landing_page,
//         search: "",
//         state: undefined
//     };
//
//     const wrapperHeader = shallow(<Header history={historyMockHeader}/>);
//     const storeLink = wrapperHeader.find('#storeLink');
//
//     //simulate click
//     storeLink.simulate("click");
//
//     //mocking the history push method of web contaoner
//     const historyMockContainer = { push: jest.fn() };
//     //Mocking header location to store page which equal to "/store"
//     historyMockContainer.location = {
//         hash: "",
//         pathname: ROUTES.store_page,
//         search: "",
//         state: undefined
//     };
//
//     const wrapperContainer = shallow(<Home history={historyMockContainer}/>);
//     const title = wrapperContainer.find("#title");
//     const result = title.text();
//
//     expect(result).toBe("All Booksx");
// })
