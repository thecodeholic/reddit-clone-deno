export default class User {
  constructor(
    public id: number | undefined,
    public username: string,
    public email: string,
    public karma: number,
    public create_date: Date | string,
    public password: string | undefined = undefined,
  ) {}
}
