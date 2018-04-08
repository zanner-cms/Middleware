#!/usr/bin/env node

'use strict';


const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const mlog = require('mocha-logger');
const util = require('util');

const AsyncFunction = require('../AsyncFunction').AsyncFunction;
const Middleware = require('../Middleware').Middleware;


describe('AsyncFunction', () => {

	it('is async function class', () => {
		expect(async function () {}).to.be.instanceof(AsyncFunction);
	});

});

describe('Middleware', () => {

	describe('static', () => {

		it('Middleware is a function', (done) => {
			expect(Middleware).to.be.an.instanceof(Function);
			done();
		});

		it('Middleware.init is a function', (done) => {
			expect(Middleware.init).to.be.an.instanceof(Function);
			done();
		});

		it('Middleware.init creates instanceof Middleware', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = [];
			let dependencies_1 = 'some Middleware';
			let dependencies_2 = ['some Middleware 1', 'some Middleware 2'];
			let action = async function (x) { return 'abc' + x; };

			expect(Middleware.init(name, service, dependencies, action)).to.be.an.instanceof(Middleware);
			expect(Middleware.init(name, service, dependencies_1, action)).to.be.an.instanceof(Middleware);
			expect(Middleware.init(name, service, dependencies_2, action)).to.be.an.instanceof(Middleware);
			done();
		});

		it('Middleware.init don`t creates instanceof Middleware with wrong name', (done) => {
			let name = 1;
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };

			expect(() => Middleware.init(name, service, dependencies, action)).to.throw();
			done();
		});

		it('Middleware.init don`t creates instanceof Middleware with wrong service', (done) => {
			let name = 'name';
			let service = [];
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };

			expect(() => Middleware.init(name, service, dependencies, action)).to.throw();
			done();
		});

		it('Middleware.init don`t creates instanceof Middleware with wrong dependencies', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = 123;
			let action = async function (x) { return 'abc' + x; };

			expect(() => Middleware.init(name, service, dependencies, action)).to.throw();
			done();
		});

		it('Middleware.init don`t creates instanceof Middleware with wrong action', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = {};

			expect(() => Middleware.init(name, service, dependencies, action)).to.throw();
			done();
		});

	});
	
	describe('instance', () => {

		it('Middleware creates instanceof Middleware', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };

			expect(new Middleware(name, service, dependencies, action)).to.be.an.instanceof(Middleware);
			done();
		});

		it('Middleware.name get', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };

			expect(Middleware.init(name, service, dependencies, action).name).to.be.equal(name);
			done();
		});

		it('Middleware.service get', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };

			expect(Middleware.init(name, service, dependencies, action).service).to.be.equal(service);
			done();
		});

		it('Middleware.dependencies get', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };

			expect(Middleware.init(name, service, dependencies, action).dependencies).to.have.members(dependencies);
			done();
		});

		it('Middleware.action get', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };

			expect(Middleware.init(name, service, dependencies, action).action).to.be.equal(action);
			done();
		});

		it('Middleware.name don`t set', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };
			let a = Middleware.init(name, service, dependencies, action);
			let name_new = 'name_new';

			expect(() => a.name = name_new).to.throw();
			done();
		});

		it('Middleware.service don`t set', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };
			let a = Middleware.init(name, service, dependencies, action);
			let service_new = 'service_new';

			expect(() => a.service = service_new).to.throw();
			done();
		});

		it('Middleware.dependencies don`t set', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };
			let a = Middleware.init(name, service, dependencies, action);
			let dependencies_new = ['dependency new 4', 'dependency new 5'];

			expect(() => a.dependencies = dependencies_new).to.throw();
			done();
		});

		it('Middleware.action don`t set', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };
			let a = Middleware.init(name, service, dependencies, action);
			let action_new = function () {};

			expect(() => a.action = action_new).to.throw();
			done();
		});

		it('Middleware.apply exec', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x, y) { return x + y; };
			let a = Middleware.init(name, service, dependencies, action);

			expect(a.apply).to.be.an.instanceof(Function);
			expect(a.apply([13, 31])).to.eventually.equal(13 + 31).notify(done);
			//a.apply([13, 31]).should.eventually.equal(44).notify(done);
		});

		it('Middleware.apply exec with throw', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x, y) { throw new Error('Middleware.apply'); };
			let a = Middleware.init(name, service, dependencies, action);

			expect(a.apply([13, 31])).to.be.rejectedWith('Middleware.apply').notify(done);
		});

		it('Middleware.call exec', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x, y) { return x + y; };
			let a = Middleware.init(name, service, dependencies, action);

			expect(a.call).to.be.an.instanceof(Function);
			expect(a.call(13, 31)).to.eventually.equal(13 + 31).notify(done);
			//a.call(13, 31).should.eventually.equal(44).notify(done);
		});

		it('Middleware.call exec with throw', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x, y) { throw new Error('Middleware.call'); };
			let a = Middleware.init(name, service, dependencies, action);

			expect(a.apply(13, 31)).to.be.rejectedWith('Middleware.call').notify(done);
		});

		it('Middleware.clone creates copy of instanceof Middleware', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };
			let a = Middleware.init(name, service, dependencies, action);

			expect(a.clone).to.be.an.instanceof(Function);
			let a_copy = a.clone();
			expect(a_copy._name).to.be.equal(a._name);
			expect(a_copy._service).to.be.equal(a._service);
			expect(a_copy._dependencies).to.have.members(a._dependencies);
			expect(a_copy._action).to.be.equal(a._action);
			done();
		});

		it('Middleware.clone creates copy of instanceof Middleware with overwriting name', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };
			let a = Middleware.init(name, service, dependencies, action);
			let name_copy = 'name_copy';
			let a_copy = a.clone({ name: name_copy });

			expect(a_copy._name).to.be.equal(name_copy);
			expect(a_copy._service).to.be.equal(a._service);
			expect(a_copy._dependencies).to.have.members(a._dependencies);
			expect(a_copy._action).to.be.equal(a._action);
			done();
		});

		it('Middleware.clone creates copy of instanceof Middleware with overwriting service', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };
			let a = Middleware.init(name, service, dependencies, action);
			let service_copy = 'service_copy';
			let a_copy = a.clone({ service: service_copy });

			expect(a_copy._name).to.be.equal(a._name);
			expect(a_copy._service).to.be.equal(service_copy);
			expect(a_copy._dependencies).to.have.members(a._dependencies);
			expect(a_copy._action).to.be.equal(a._action);
			done();
		});

		it('Middleware.clone creates copy of instanceof Middleware with overwriting dependencies', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };
			let a = Middleware.init(name, service, dependencies, action);
			let dependencies_copy = ['dependency new 4', 'dependency new 5'];
			let a_copy = a.clone({ dependencies: dependencies_copy });

			expect(a_copy._name).to.be.equal(a._name);
			expect(a_copy._service).to.be.equal(a._service);
			expect(a_copy._dependencies).to.have.members(dependencies_copy);
			expect(a_copy._action).to.be.equal(a._action);
			done();
		});

		it('Middleware.clone creates copy of instanceof Middleware with overwriting action', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let action = async function (x) { return 'abc' + x; };
			let a = Middleware.init(name, service, dependencies, action);
			let action_copy = async function (x, y) { return 'abc' + x + y; };
			let a_copy = a.clone({ action: action_copy });

			expect(a_copy._name).to.be.equal(a._name);
			expect(a_copy._service).to.be.equal(a._service);
			expect(a_copy._dependencies).to.have.members(a._dependencies);
			expect(a_copy._action).to.be.equal(action_copy);
			done();
		});

	});

});
