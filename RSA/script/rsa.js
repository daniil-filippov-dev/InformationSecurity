
let alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890";

let p = 7;
let q = 13;
let n = p * q;

let phi = (p - 1) * (q - 1);
let e = 1;
do {
	e++;
} while (phi % e == 0);
let d;
let k = 1;
do {
	if ((k * phi + 1) % e == 0) {
		d = (k * phi + 1) / e;
		break;
	} else {
		k++;
	}
} while (true);

let isRight = true;
let data = "Secret message";

data = data.toUpperCase();
for (let char of data) {
	if (alph.indexOf(char) == -1) {
		isRight = false;
		break;
	}
}

if (!isRight) {
	console.log('No such char in alphabite');
} else {
	let cdata = [];

	for (let i = 0; i < data.length; i++) {
		cdata.push(1);
		index = alph.indexOf(data[i]) + 1;
		for (let j = 0; j < e; j++) {
			cdata[i] *= index;
			cdata[i] %= n;
		}
	}

	console.log(cdata);
	
	let decdata = '';

	for (let i = 0; i < data.length; i++) {
		let index = 1;
		for (let j = 0; j < d; j++ ) {
			index *= cdata[i];
			index %= n;
		}
		decdata += alph[index -1];
	}
	console.log(decdata);
} 
