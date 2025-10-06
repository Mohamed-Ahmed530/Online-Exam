export interface SubjectResponse {
  message: string;
  subjects: Subjects[];
}

export interface Subjects {
  _id: string;
  name: string;
  icon: string;
}
