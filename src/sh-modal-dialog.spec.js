var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react/lib/ReactTestUtils');
var ModelContent = require('./test-content');
import * as _ from 'lodash';

var Modal = require('./sh-modal-service').default;

describe('root', function () {
    it('renders without problems, returns a promise', function () {
        const dialog = new Modal(<ModelContent />, 'Service Modal', 'OK');
        let promise = dialog.open();
        expect(promise.then).toBeTruthy();
        promise.catch(_.noop);
    });

    it('should fade out before closing', function (done) {
        const dialog = new Modal(<ModelContent />, 'Service Modal', 'OK');
        let promise = dialog.open();
        promise.then(() => {
            console.log('in promise');
            expect(document.getElementById('sh-modal').classList).toContain('fade-in');
            log = document.getElementById('sh-modal').classList+ '-------------hi'
            dialog.fadeOut();
            expect(document.getElementById('sh-modal').classList).not.toContain('fade-in')
            console.log(log+'in promise')
            done()
        }).catch((error)=>{
            console.log('error', error);
            done();
        });

        dialog.resolve();
    });

    it('should remove the component', function () {
        const dialog = new  Modal(<ModelContent />, 'Service Modal', 'OK');
        dialog.open().then(() => {
            dialog.close();
            expect(document.getElementById('sh-modal')).toBeFalsy();
        }).catch(_.noop);
    });
});
