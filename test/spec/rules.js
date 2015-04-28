'use strict';

var Quota = require('../../lib/index.js').Quota;

var _ = require('lodash');


describe('Rules', function () {

    describe('with node instance scope', function () {

        it('cutoff throttling, no backoff', function (done) {

            var quota = new Quota({
                cancelAfter: 1000,
                throttling: 'cutoff',
                backoff: 'none'
            });

            quota.addRule({
                slots: 10,
                every: 1000,
                queue: {
                    type: 'memory',
                    scopeAttr: []
                }
            });

            var deliveredSlots = 0;

            function slotDelivered() {
                deliveredSlots += 1;
            }

            _.times(11, function () {
                quota.requestSlot()
                    .then(slotDelivered);
            });

            expect(deliveredSlots).to.eql(0);

            setTimeout(function () {

                expect(deliveredSlots).to.eql(10);

                done();

                //clock.tick(998);
                //
                //expect(deliveredSlots).to.eql(10);
                //
                //clock.tick(1);
                //
                //expect(deliveredSlots).to.eql(11);
                //
                //clock.tick(100);
                //
                //quota.requestSlot()
                //    .then(function () {
                //        done();
                //    });

            });

        });

    });

});