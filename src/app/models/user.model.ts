export class User {
    id: string;
    email: string;
    displayName?: string;
  
    constructor(id: string, email: string, displayName?: string) {
      this.id = id;
      this.email = email;
      this.displayName = displayName;
    }
  }
  