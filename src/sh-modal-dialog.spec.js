import React from 'react';
import ReactDOM from 'react-dom';
import * as _ from 'lodash';

import ModalContent from './test-content';
import Modal from './sh-modal-service';

import TestUtils from 'react/lib/ReactTestUtils';

describe('root', function () {
    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it('renders without problems, returns a promise', function () {
        const dialog = new Modal(<ModalContent />, 'Service Modal', 'OK');
        let promise = dialog.open();
        jasmine.clock().tick(5000);
        expect(promise.then).toBeTruthy();
        promise.catch(_.noop);
        dialog.close();
        jasmine.clock().tick(5000);
    });

    it('should fade out before closing', function (done) {
        const dialog = new Modal(<ModalContent />, 'Service Modal', 'OK');
        dialog.open().then(() => {
            jasmine.clock().tick(5000);
            expect(document.getElementById('sh-modal').classList).toContain('fade-in');
            dialog.fadeOut();
            expect(document.getElementById('sh-modal').classList).not.toContain('fade-in');
            done();
        }).catch((error)=> {
            fail(error);
            done();
        });

        const btnSuccess = document.getElementsByClassName('sh-btn-primary')[0];
        TestUtils.Simulate.click(btnSuccess);
    });

    it('should fade out before closing when canceled', function (done) {
        const dialog = new Modal(<ModalContent />, 'Service Modal', 'OK');
        dialog.open().then(() => {
            fail('Cancel was pressed, this should run through error code.');
            done();
        }).catch(()=> {
            // We will be hitting this code, which does not have a 'fail' in it.
            done();
        });

        const btnCancel = document.getElementsByClassName('sh-btn-default')[0];
        TestUtils.Simulate.click(btnCancel);
    });

    it('should remove the component', function (done) {
        const dialog = new Modal(<ModalContent />, 'Service Modal', 'OK');
        dialog.open().then(() => {
            dialog.close();
            jasmine.clock().tick(5000);
            expect(document.getElementById('sh-modal')).toBeFalsy();
            done();
        }).catch((error) => {
            fail(error);
            dialog.close();
            jasmine.clock().tick(5000);
            done();
        });

        const btnSuccess = document.getElementsByClassName('sh-btn-primary')[0];
        TestUtils.Simulate.click(btnSuccess);
    });

    it('set valid should validate the modal', function (done) {
        const dialog = new Modal(<ModalContent />, 'Service Modal', 'OK');
        dialog.open().then(() => {
            jasmine.clock().tick(5000);
            expect(document.getElementById('sh-modal').classList).not.toContain('sh-valid');
            dialog.setValid();
            expect(document.getElementById('sh-modal').classList).toContain('sh-valid');
            dialog.close();
            jasmine.clock().tick(5000);
            done();
        }).catch((error)=> {
            fail(error);
            done();
        });

        const btnSuccess = document.getElementsByClassName('sh-btn-primary')[0];
        TestUtils.Simulate.click(btnSuccess);
    });
    it('remove valid should invalidate the dialog', function (done) {
        const dialog = new Modal(<ModalContent />, 'Service Modal', 'OK');
        dialog.open().then(() => {
            jasmine.clock().tick(5000);
            expect(document.getElementById('sh-modal').classList).not.toContain('sh-valid');
            dialog.setValid();
            expect(document.getElementById('sh-modal').classList).toContain('sh-valid');
            dialog.removeValid();
            expect(document.getElementById('sh-modal').classList).not.toContain('sh-valid');
            dialog.close();
            jasmine.clock().tick(5000);
            done();
        }).catch((error)=> {
            fail(error);
            done();
        });

        const btnSuccess = document.getElementsByClassName('sh-btn-primary')[0];
        TestUtils.Simulate.click(btnSuccess);
    });
    it('set save button to default', function (done) {
        const dialog = new Modal(<ModalContent />, 'Service Modal');
        dialog.open().then(() => {
            jasmine.clock().tick(5000);
            expect(document.getElementById('sh-save-button')).toBeTruthy();
            dialog.close();
            jasmine.clock().tick(5000);
            done();
        }).catch((error)=> {
            fail(error);
            done();
        });

        const btnSuccess = document.getElementsByClassName('sh-btn-primary')[0];
        TestUtils.Simulate.click(btnSuccess);
    });
});
