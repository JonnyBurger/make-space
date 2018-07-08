/*
	Modified version of https://github.com/sindresorhus/p-progress
	that does not require values between 0 and 1

	License:

	MIT License

	Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict';
const pMap = require('p-map');

const sum = iterable => {
	let total = 0;

	for (const value of iterable.values()) {
		total += value;
	}

	return total;
};

class PProgress extends Promise {
	static fn(input) {
		return (...args) => {
			return new PProgress((resolve, reject, progress) => {
				args.push(progress);
				input(...args).then(resolve, reject);
			});
		};
	}

	constructor(executor) {
		const progressFn = progress => {
			// We run this in the next microtask tick so `super` is called before we use `this`
			Promise.resolve().then(() => {
				if (progress === this._progress) {
					return;
				}

				this._progress = progress;

				for (const listener of this._listeners) {
					listener(progress);
				}
			});
		};

		super((resolve, reject) => {
			executor(
				value => {
					resolve(value);
				},
				reject,
				progress => {
					progressFn(progress);
				}
			);
		});

		this._listeners = new Set();
		this._progressFn = progressFn;
		this._progress = 0;
	}

	get progress() {
		return this._progress;
	}

	onProgress(cb) {
		if (typeof cb !== 'function') {
			throw new TypeError(`Expected a \`Function\`, got \`${typeof cb}\``);
		}

		this._listeners.add(cb);
		return this;
	}
}

module.exports = PProgress;
