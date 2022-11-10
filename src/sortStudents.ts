export interface Student {
  name: string,
  surname: string,
  age: number,
  married: boolean,
  grades: number[],
}

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'grades',
}

export type SortOrder = 'asc' | 'desc';

export function getAverageGrade(grade: number[]): number {
  return grade
    .reduce((prev: number, el: number) => (prev + el), 0) / grade.length;
}

export function sortStudents(
  students: Student[], sortBy: SortType, order: SortOrder,
): object[] {
  const stArr: Student[] = students.map((el: Student) => ({ ...el }));

  switch (sortBy) {
    case 'name':
    case 'surname':
      return (order === 'asc')
        ? stArr
          .sort((a: Student, b: Student) => (
            a[sortBy].localeCompare(b[sortBy])))
        : stArr
          .sort((a: Student, b: Student) => (
            b[sortBy].localeCompare(a[sortBy])));

    case 'age':
    case 'married':
      return (order === 'asc')
        ? stArr
          .sort((a: Student, b: Student) => (
            Number(a[sortBy]) - Number(b[sortBy])))
        : stArr
          .sort((a: Student, b: Student) => (
            Number(b[sortBy]) - Number(a[sortBy])));

    case 'grades':
      return (order === 'asc')
        ? stArr
          .sort((a: Student, b: Student) => (
            getAverageGrade(a[sortBy]) - getAverageGrade(b[sortBy])))
        : stArr
          .sort((a: Student, b: Student) => (
            getAverageGrade(b[sortBy]) - getAverageGrade(a[sortBy])));

    default:
      throw new Error('invalid values!');
  }
}
