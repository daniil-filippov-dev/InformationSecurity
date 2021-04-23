const bmp = require("bmp-js"),
	fs = require('fs'),
	MainBytes = 54;


function* generateImageBMP(start, end) {
	for (let i = start; i <= end; i++) yield `./imgTasks/${i}.bmp`
}
function getArrayImage() {
	let arr = [];
	for (let url of generateImageBMP(1, 10)) {
		arr.push(url);
	}
	return arr;
}

function getBytesBufferFromBMP(imgUrl) {
	const bmpBuffer = fs.readFileSync(imgUrl);
		bmpData = bmp.decode(bmpBuffer),
		bytes = [...bmpBuffer];
	return bytes;
}

function decodeImgFromURL(imgURL) {
	const encBytes = getBytesBufferFromBMP(imgURL);
	const bytesDecArray = [];

	for (let i = MainBytes; i < encBytes.length; i += 4) {
		let tempBite = (
			((encBytes[i + 0] & 0x03) << 6) |
			((encBytes[i + 1] & 0x03) << 4) |
			((encBytes[i + 2] & 0x03) << 2) |
			((encBytes[i + 3] & 0x03))
		);
		if (tempBite == 0xFF) {
			break;
		}
		bytesDecArray.push(tempBite);
	}
	return Buffer.from(bytesDecArray);
}

function unpack(str) {
    const bytes = [];
    for(let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);

        bytes.push(char & 0xFF);
    }
    return bytes;
}

function encodeText(imgURL, textURL) {
	const imageArrayBytes = getBytesBufferFromBMP(imgURL),
		encodeTextBytes = fs.readFileSync(textURL, "utf8"),
		text = [...unpack(encodeTextBytes), 0xFF];

	for (let i = MainBytes, j = 0; i < MainBytes + text.length * 4; i += 4, j++) {
		imageArrayBytes[i + 0] &= (0xFC);
		imageArrayBytes[i + 0] |= ((text[j] >> 6));
		imageArrayBytes[i + 1] &= (0xFC);
		imageArrayBytes[i + 1] |= ((text[j] >> 4) & 0x3);
		imageArrayBytes[i + 2] &= (0xFC);
		imageArrayBytes[i + 2] |= ((text[j] >> 2) & 0x3);
		imageArrayBytes[i + 3] &= (0xFC);
		imageArrayBytes[i + 3] |= ((text[j]) & 0x3);
	}
	
	fs.writeFileSync(`./result/imageTask2.bmp`, new Buffer.from(imageArrayBytes));
	console.log('File task 2 written successfully\n');
}

getArrayImage().forEach( (item, i) => {
	fs.writeFileSync(`./result/image${i + 1}.txt`, decodeImgFromURL(item));
	console.log('File written successfully\n');
	console.log("The written has the following contents:");
	console.log(fs.readFileSync(`./result/image${i + 1}.txt`, "utf8"));
})

const imgURL = './task2/task2test.bmp',
	textURL = './task2/task2text.txt';
encodeText(imgURL, textURL);
fs.writeFileSync(`./result/imagetask2.txt`, decodeImgFromURL('./result/imageTask2.bmp'));
console.log(fs.readFileSync(`./result/imagetask2.txt`, "utf8"));