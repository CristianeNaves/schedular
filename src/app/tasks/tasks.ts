export interface Task {
    Id?: number;
    Title: string;
    Description: string;
    Completed: boolean;
    Deadline: any; //por enquanto
    UserId: string;
}