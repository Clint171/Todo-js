class Task{
    id;
    title;
    description;
    date;
    completed;
    overdue;
    constructor(id , title , description , date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        let now = new Date();
        if(now.getTimezoneOffset < 0){
            now.setTime( now.getTime() + now.getTimezoneOffset()*60*1000 );
        }
        else{
            now.setTime( now.getTime() - now.getTimezoneOffset()*60*1000 );
        }

        if(this.date.getTime() < now.getTime()){
            this.overdue = true;
        }
        else{
            this.overdue = false;
        }
        this.completed = false;
    }
}
export default Task;