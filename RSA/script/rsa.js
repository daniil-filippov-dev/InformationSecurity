function getAlphabet() {
	let str = ' ';
	function* generateSequence(start, end) {
		for (let i = start; i <= end; i++ ) yield i;
	}
	function* generateAlphabetCodes() {
		// A..Z
		yield* generateSequence(65, 90);
		// 0..9
		yield*  generateSequence(48, 57);
		// a..z
		//yield* generateSequence(97, 122);
	}
	
	for (let code of generateAlphabetCodes()) {
		str += String.fromCharCode(code);
	}
	return str;
}
function isPrime(num) {
	if (num <= 1) {
		return false;
	}
	for (i = 2; i*i <= num; i++) {
		if (num % i == 0) {
			return false;
		}
	}
	return true;
}
function takePrime(max) {
	while(true) {
		let num = Math.floor(Math.random() * max);
		if (isPrime(num)) {
			return num;
		}
	}
}

function code(data, n, e) {
	let cdata = [];

	for (let i = 0; i < data.length; i++) {
		cdata.push(1);
		index = alphabet.indexOf(data[i]) + 1;
		for (let j = 0; j < e; j++) {
			cdata[i] *= index;
			cdata[i] %= n;
		}
	}
	return cdata;
}
function decode(cdata, n, d) {
	let decdata = '';

	for (let i = 0; i < cdata.length; i++) {
		let index = 1;
		for (let j = 0; j < d; j++ ) {
			index *= cdata[i];
			index %= n;
		}
		decdata += alphabet[index - 1];
	}
	return decdata;
}
let alphabet = getAlphabet();


let p = takePrime(100);
let q = takePrime(100);
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
let data = "123 lol sda asdasd";
console.log(data.length);
data = data.toUpperCase();
for (let char of data) {
	if (alphabet.indexOf(char) == -1) {
		isRight = false;
		break;
	}
}

if (!isRight) {
	console.log('No such char in alphabite');
} else {
	let cdata = code(data, n, e);
	console.log(cdata);
	
	let decdata = decode(cdata, n, d);
	console.log(decdata);
} 