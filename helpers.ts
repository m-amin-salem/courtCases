import { CaseDto } from './case.dto.';
import fs from 'fs';

const filePath = './cases.txt';

export const getCases = (path: string = filePath): CaseDto[] => {
  let cases: CaseDto[] = [];
  
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, 'utf8');
    cases = JSON.parse(data) as CaseDto[];
  }
  return cases
}

export const setCounter = (cases: CaseDto[]): number => {
  let counter = 0
  
  if (cases.length === 0) {
    counter = 1
  } else {
    const lastCase = cases[cases.length -1]
    const lastCaseCounter = +lastCase.fxFileId.slice(-2)
    counter = lastCaseCounter + 1
  }
  return counter
}

const convertNameToPascalCase = (name: string): string => {
  return name
  .replace(
    /(\w)(\w*)/g, //capture the first character of each word and the rest of the word
    (_, firstChar, restOfWord) => {
      return firstChar.toUpperCase() + restOfWord.toLowerCase();
    }
  )
  .replace(/\s+/g, ''); //remove the whitespaces
}

export const generateFxFileId = (customerName: string, year: string, counter: number): string => {
  const customerNameInPascalCase = convertNameToPascalCase(customerName)
  
  return `${customerNameInPascalCase}-${year}-${counter.toString().padStart(2, '0')}`;
}

export const addNewCase = (newCase: CaseDto, cases: CaseDto[], path:string = filePath): void => {
  cases.push(newCase)

  fs.writeFileSync(path, JSON.stringify(cases));
}