interface Repository<T> {
    create: (obj: T) => T;
    get: () => T;
    delete: (obj: T) => T;
    update: (obj: T) => T;
}

class User {
    username: string;
    age: number;
}

class UserRepo implements Repository<User> {
    create(): void {
        return undefined;
    }
    get(): void {
        return undefined;
    }
    delete(): void {
        return undefined;
    }
    update(): void {
        return undefined;
    }
}