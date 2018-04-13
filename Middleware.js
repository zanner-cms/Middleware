#!/usr/bin/env node

'use strict';


const AsyncFunction = require('zanner-cms-asyncfunction').AsyncFunction;
const GeneratorFunction = require('zanner-cms-generatorfunction').GeneratorFunction;


class Middleware {

	static init (...args) {
		return Object.freeze(new Middleware(...args));
	}


	get action () {
		return this._action;
	}

	get dependencies () {
		return [].concat(this._dependencies);
	}

	get name () {
		return this._name;
	}

	get service () {
		return this._service;
	}


	set action (action) {
		if (action instanceof AsyncFunction) {
			this._action = action;
			return this;
		}
		if (action instanceof GeneratorFunction) {
			this._action = async function (...args) { return [...action(...args)]; };
			return this;
		}
		if (action instanceof Function) {
			this._action = async function (...args) { return action(...args); };
			return this;
		}
		throw new Error('Middleware.action set with wrong type');
	}

	set dependencies (dependencies) {
		this._dependencies = [].concat(dependencies).map(dependency => {
			if (String(dependency)!==dependency) throw new Error('Middleware.dependencies set with wrong type');
			if (dependency.trim().length<1) throw new Error('Middleware.dependencies set with wrong length');
			return dependency;
		});
		return this;
	}

	set name (name) {
		if (String(name)!==name) throw new Error('Middleware.name set with wrong type');
		if (name.trim().length<1) throw new Error('Middleware.name set with wrong length');
		this._name = name;
		return this;
	}

	set service (service) {
		if (String(service)!==service) throw new Error('Middleware.service set with wrong type');
		if (service.trim().length<1) throw new Error('Middleware.service set with wrong length');
		this._service = service;
		return this;
	}
	

	apply (args) {
		let A = [].concat(args);
		return this._action(...A);
	}

	call (...args) {
		return this._action(...args);
	}

	clone (cloneOverwrite) {
		let p = cloneOverwrite || {};
		let name = p.name || this.name;
		let service = p.service || this.service;
		let dependencies = p.dependencies || this.dependencies;
		let action = p.action || this.action;
		return Middleware.init(name, service, dependencies, action);
	}

	constructor (name, service, dependencies, action) {
		if (arguments.length!=4) {
			throw new Error('Middleware creating with wrong arguments count');
		}

		this.name = name;
		this.service = service;
		this.dependencies = dependencies;
		this.action = action;
	}

}

exports.Middleware = Middleware;
