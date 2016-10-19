var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react/lib/ReactTestUtils');
var ModelContent = require('./test-content');
import * as _ from 'lodash';

var Modal = require('./sh-modal-service').default;

describe('root', function () {
    it('renders without problems', function () {
        const dialog = new  Modal(<ModelContent />, 'Service Modal', 'OK')
        dialog.open()
    });
});
