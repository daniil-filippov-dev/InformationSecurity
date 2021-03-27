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
	
}

string dataDecryption()
{

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
	string writeReEncryptionFileName = "decode.txt";
	string dataFromKeyFile = readFromFile(keyFileName);
	string dataFromPhraseFile = readFromFile(phraseFileName);

	stringstream iss(dataFromKeyFile);
	int number;
	vector <int> keys;
	while (iss >> number)
		keys.push_back(number);

	cout << "key: " << dataFromKeyFile << endl;



	system("pause");
	return 0;
}