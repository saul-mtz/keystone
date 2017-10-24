var demand = require('must');
var LocationType = require('../LocationType');

exports.initList = function (List) {
	List.add({
		loc: LocationType,
	});
};

exports.getTestItems = function () {
	return [
		{},
		{ loc: {
			number: 66,
			street_address: 'Hofburg',
			municipality: 'Schweizer Trakt',
			city: 'Vienna',
			postcode: '1010',
			country: 'Austria',
		} },
		{ loc: {
			number: 191,
			street_address: 'Clarence St',
			state: 'NSW',
			neighborhood: 'Sydney',
			postcode: 2000,
			country: 'Australia',
		} },
		{ loc: {
			number: 61,
			street_address: 'Albion Street',
			state: 'NSW',
			neighborhood: 'Surry Hills',
			postcode: '2010',
			country: 'Australia',
		} },
		{ loc: {
			number: 1799,
			street_address: 'McAllister St',
			state: 'CA',
			city: 'San Francisco',
			postcode: '94117',
			country: 'USA',
		} },
	];
};

exports.testFilters = function (List, filter) {
	it('should filter by state', function (done) {
		filter({
			loc: {
				state: 'NSW',
			},
		}, 'loc', function (results) {
			demand(results.length).be(2);

			demand(results[0].number).eql('191');
			demand(results[0].street_address).eql('Clarence St');
			demand(results[0].state).eql('NSW');
			demand(results[0].neighborhood).eql('Sydney');
			demand(results[0].postcode).eql('2000');
			demand(results[0].country).eql('Australia');

			demand(results[1].number).eql('61');
			demand(results[1].street_address).eql('Albion Street');
			demand(results[1].state).eql('NSW');
			demand(results[1].neighborhood).eql('Surry Hills');
			demand(results[1].postcode).eql('2010');
			demand(results[1].country).eql('Australia');

			done();
		});
	});

	it('should filter by country', function (done) {
		filter({
			loc: {
				country: 'Australia',
			},
		}, 'loc', function (results) {
			demand(results.length).be(2);
			done();
		});
	});

	it('should filter by street', function (done) {
		filter({
			loc: {
				street: 'Clarence St',
			},
		}, 'loc', function (results) {
			demand(results.length).be(1);
			done();
		});
	});

	it('should filter by city', function (done) {
		filter({
			loc: {
				city: 'Sydney',
			},
		}, 'loc', function (results) {
			demand(results.length).be(1);
			done();
		});
	});

	it('should filter by postcode', function (done) {
		filter({
			loc: {
				code: 1010,
			},
		}, 'loc', function (results) {
			demand(results.length).be(1);
			done();
		});
	});

	it('should filter by postcode string', function (done) {
		filter({
			loc: {
				code: '1010',
			},
		}, 'loc', function (results) {
			demand(results.length).be(1);
			done();
		});
	});

	it('should find all elements', function (done) {
		filter({
			loc: {},
		}, 'loc', function (results) {
			demand(results.length).be(5);
			done();
		});
	});
};
