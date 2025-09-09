export interface GraphqlResponse<T> {
  data?: T;
  errors?: any[];
}