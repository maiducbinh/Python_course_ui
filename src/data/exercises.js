// danh sách các bài, mỗi bài có id, title, content, example
const exercises = [
  {
    id: 'PY001',
    title: 'Hello World',
    content: `Viết chương trình in ra dòng "Hello, World!"`,
    example: `Input: (không có)
Output:
Hello, World!`,
testcases: [
  { input: '', expected_output: 'Hello, World!' },
]
  },
  {
    id: 'PY002',
    title: 'Tính tổng dãy số',
    content: `Cho một số nguyên n. Tính tổng các số từ 1 đến n.`,
    example: `Input:
5
Output:
15`,
testcases: [
  { input: '5', expected_output: '15' },
  { input: '3', expected_output: '6' },
]
  },
  {
    id: 'PY003',
    title: 'Kiểm tra số chính phương',
    content: `Cho một số nguyên n. Kiểm tra xem n có phải là số chính phương không.`,
    example: `Input:
16
Output:
True`,
testcases: [
  { input: '16', expected_output: 'True' },
  { input: '10', expected_output: 'False' },
]
  },
  {
    id: 'PY004',
    title: 'Tính giai thừa',
    content: `Cho một số nguyên n. Tính giai thừa của n`,
    example: `Input:
3
Output:
6`,
testcases: [
  { input: '3', expected_output: '6' },
  { input: '4', expected_output: '24' },
]
  },
  // ... bạn chỉ cần thêm object vào đây là đủ
];

export default exercises;
