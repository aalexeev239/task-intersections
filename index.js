'use strict';

/*
 * По данным n отрезкам необходимо найти множество точек минимального размера,
 * для которого каждый из отрезков содержит хотя бы одну из точек.
 *
 * В первой строке дано число 1≤n≤100 отрезков.
 * Каждая из последующих nn строк содержит по два числа 0≤l≤r≤10**9,
 * задающих начало и конец отрезка. Выведите оптимальное число mm точек и сами mm точек.
 * Если таких множеств точек несколько, выведите любое из них.
 */

const FIXTURES_PATH = './fixtures1.txt';

const fs = require('fs');

// file
const inputs = fs.readFileSync(FIXTURES_PATH).toString().split('\n');

class Interval {
    constructor(start, end) {
        if (typeof start !== 'number' || typeof end !== 'number' || start < 0 || start > end || end > Math.pow(10, 9)) {
            console.error('Incorrect data');
            process.exit();
        }
        this.start = start;
        this.end = end;
    }

    getIntersection(anotherInterval) {
        let start = Math.max(this.start, anotherInterval.start);
        let end = Math.min(this.end, anotherInterval.end);
        if (start > end) {
            return null;
        } else {
            return new Interval(start, end);
        }
    }
}

let n;
let intervals;

// collecting data
try {
    n = parseInt(inputs[0], 10);
    intervals = [];
    for (let i = 1; i <= n; i++) {
        let lineNumbers = inputs[i].split(' ');
        intervals.push(new Interval(parseInt(lineNumbers[0]), parseInt(lineNumbers[1])));
    }
} catch (err) {
    console.error('Incorrect data');
    process.exit();
}

// sorting
// just for zen
intervals.sort((interval1, interval2)=>interval1.start > interval2.start);

let intersectionsSet = [];

intervals.forEach((interval)=> {
    let isInSet = false;

    for (let i = 0; i < intersectionsSet.length; i++) {
        let intervalSet = intersectionsSet[i];
        let intersection = interval.getIntersection(intervalSet);
        if (intersection) {
            intersectionsSet.splice(i, 1, intersection);
            isInSet = true;
            break;
        }
    }

    if (!isInSet) {
        intersectionsSet.push(interval);
    }
});

let response = `${intersectionsSet.length}
${intersectionsSet.map(i=>i.start).join(' ')}\n`;

process.stdout.write(response);
