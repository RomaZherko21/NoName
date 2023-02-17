class CodeManager {
  private codes: Map<string, string>

  constructor() {
    this.codes = new Map()
  }

  public addCode(key: string, code: string): void {
    this.codes.set(key, code)
  }

  public getCode(key: string): string | undefined {
    return this.codes.get(key)
  }

  public removeCode(key: string): void {
    this.codes.delete(key)
  }
}

export default CodeManager
