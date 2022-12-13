export class SingletonClass {
  boolMusic: Boolean = true;
  boolSound: Boolean = false;
  private static _instance: SingletonClass = new SingletonClass();
  public static getInstance(): SingletonClass {
    return SingletonClass._instance;
  }

  onSound() {
    this.boolSound = true;
  }
  offsound() {
    this.boolSound = false;
  }

  onMusic() {
    this.boolMusic = true;
  }
  offMusic() {
    this.boolMusic = false;
  }
}
