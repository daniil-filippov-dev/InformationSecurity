#include <iostream>
#include <fstream>
#include <string>;
#include <string_view>;
#include <map>;
#include <vector>;
#include <sstream>;
using namespace std;

string readFromFile(string fileName)
{
	ifstream fin;
	fin.open(fileName, ios_base::binary);
	string outStringLine;
	string resultOutString;

	if (fin.is_open())
	{
		while (!fin.eof())
		{
			getline(fin, outStringLine);
			resultOutString += outStringLine;
		}
		fin.close();
	}
	else
	{
		cout << "Problem with file :(\n";
	}
	return resultOutString;
}

void print_map(const map<char, size_t>& m)
{
	for (auto it = m.begin(); it != m.end(); ++it)
	{
		cout << (*it).first << " : " << (*it).second << endl;
	}
}

map<char, size_t> getFrequencyMap(string text)
{
	map<char, size_t> result;
	stringstream inputStringStream(text);
	
	char word;
	while (inputStringStream >> word)
		result[word]++;

	return result;
}

void writeToFile(string fileName, string text)
{
	ofstream out(fileName, ios::binary);
	if (!out.is_open())
	{
		cout << "Problem with open file :(" << endl;
	}
	out << text;
	out.close();
}

string dataEncryption(string text, size_t columns, const vector<int> keys) 
{
	string result{ "" };
	string resultDataString{ "" };
	size_t zCount = columns - text.size() % columns;
	size_t index{ 0 };

	for (size_t i = 0; i < text.size(); ++i)
	{
		result += text[i];
	}

	for (size_t i = 0; i < zCount; ++i)
	{
		result.append("z");
	}

	for (auto i : keys)
	{
		index = 0;
		while (i + index * columns - 1 < result.size())
		{
			resultDataString += result[i - 1 + index++ * columns];
		}
	}
	return resultDataString;
}

string dataDecryption(string text, size_t columns, const vector<int> keys )
{
	size_t rows = text.size() / columns;
	size_t indexVector{ 0 };
	string decryptionData{ "" };

	for (size_t i = 0; i < rows; i++)
	{
		for (size_t j = 0; j < columns; j++)
		{
			indexVector = find(keys.begin(), keys.end(), j + 1 )- keys.begin();
			decryptionData += text[i + (indexVector) * rows];
		}
	}
	return decryptionData;
}

int main()
{
	// 1
	string fileName = "Veni.docx";
	string textFromFile = readFromFile(fileName);
	cout << "Size of file: " << textFromFile.size() << endl;

	// 2
	map <char, size_t> BytsPull = getFrequencyMap(textFromFile);
	print_map(BytsPull);

	// 3
	const size_t columns = 5;
	string keyFileName = "key.txt";
	string phraseFileName = "phrase.txt";
	string writeEncryptionFileName = "code.txt";
	string writeDecryptionFileName = "decode.txt";
	string dataFromKeyFile = readFromFile(keyFileName);
	string dataFromPhraseFile = readFromFile(phraseFileName);

	string encryptionData{ "" };
	string decryptionData{ "" };

	stringstream iss(dataFromKeyFile);
	int number;
	vector <int> keys;
	while (iss >> number)
		keys.push_back(number);

	cout << "key: " << dataFromKeyFile << endl;

	encryptionData = dataEncryption(dataFromPhraseFile, columns, keys);
	writeToFile(writeEncryptionFileName, encryptionData);
	
	decryptionData = dataDecryption(encryptionData, columns, keys);
	writeToFile(writeDecryptionFileName, decryptionData);




	system("pause");
	return 0;
}