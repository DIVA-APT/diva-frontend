module.exports = {
  jsxSingleQuote: true,
  singleQuote: true,
  printWidth: 80, // 코드 한 줄의 최대 길이를 80자로 제한
  tabWidth: 2, // 탭 대신 공백 사용하며, 들여쓰기는 2개의 공백
  useTabs: false, // 들여쓰기에 탭 대신 공백 사용
  semi: true, // 문장 끝에 세미콜론 사용
  trailingComma: 'es5', // 객체나 배열 키:값 뒤에 항상 쉼표 사용 (ES5 호환)
  bracketSpacing: true, // 객체 리터럴의 중괄호 내부에 공백 추가
  arrowParens: 'always', // 화살표 함수 인자가 하나일 경우 괄호 사용 (예: (x) => x)
  jsxBracketSameLine: false, // JSX에서 여러 줄의 속성을 사용할 때 마지막 속성 뒤에 항상 쉼표를 붙임
  endOfLine: 'lf', // 파일의 끝에 개행 추가
  htmlWhitespaceSensitivity: 'css', // HTML 파일과 같은 내용에 대해 "auto"로 자동 포맷
};
