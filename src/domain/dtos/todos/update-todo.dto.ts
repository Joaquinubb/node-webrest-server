export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    const newCompletedAt = completedAt;

    if (!id || isNaN(Number(id)))
      return ["Id is required and must be a valid number", undefined];

    if (text && text.type !== "string")
      return ["Text must be a string", undefined];

    if (completedAt && completedAt.type !== "string")
      return ["CompletedAt must be a string", undefined];

    if (completedAt) {
      const newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === "Invalid Date")
        return ["CompletedAt must be a valid date", undefined];
    }

    return [undefined, new UpdateTodoDto(text, newCompletedAt)];
  }
}
