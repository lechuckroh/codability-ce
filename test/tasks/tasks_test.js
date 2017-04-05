"use strict";

const assert = require('assert');
const Task = require('../../app/tasks/task');
const helper = require('../helper');

describe('Task validation', () => {
    it('requires a name', () => {
        const task = new Task({name: undefined});
        const result = task.validateSync();
        const {path, kind} = result.errors.name;
        assert(path === 'name');
        assert(kind === 'required');
    });

    describe('name must be longer than 2 characters.', () => {
        it('2 characters', () => {
            const task = new Task({name: 'ab'});
            const result = task.validateSync();
            const {path} = result.errors.name;
            assert(path === 'name');
        });
        it('3 characters', () => {
            const task = new Task({name: 'abc'});
            const result = task.validateSync();
            assert(result === undefined);
        });

        it('2 characters save', async () => {
            const task = new Task({name: 'ab'});
            try {
                await task.save();
            } catch (result) {
                const {path} = result.errors.name;
                assert(path === 'name');
            }
        })
    });
});
