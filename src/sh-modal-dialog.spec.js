var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react/lib/ReactTestUtils');
import * as _ from 'lodash';

var ShModalDialog = require('./sh-modal-dialog').default;

describe('root', function () {
    it('renders without problems', function () {
        let reset = _.noop;
        let value = true;
        var root = TestUtils.renderIntoDocument(<ShModalDialog shResetModal={reset} value={value}/>);
        expect(root).toBeTruthy();
    });
});
