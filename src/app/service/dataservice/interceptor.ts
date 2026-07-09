import * as userList from "./mocks/user.json"
import * as mockUserList from "./mocks/mock-user.json"
import * as userMock from "./mocks/userMock.json"
import * as managerMock from "./mocks/managerMock.json"
import * as page0 from "./mocks/utentePag0.json"
import * as page1 from "./mocks/utentePag1.json"
import * as page2 from "./mocks/utentePag2.json"
export const urls = [
    {
        url: '/get-user-list',
        json: userList
    },
    {
        url:'/get-mock-user',
        json: mockUserList
    },
    {
        url:'/getTypeUser',
        json:userMock
    },
    {
        url:'/getTypeManager',
        json:managerMock

    },
    {
        url:'/getPage0',
        json:page0
    },
    {
        url:'/getPage1',
        json:page1
    },
    {
        url:'/getPage2',
        json:page2
    }

]