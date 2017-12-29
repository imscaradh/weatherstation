import {autoinject} from 'aurelia-framework';

@autoinject()
export class Alert {

    private entries: AlertEntry[] = [];

    public push(severity: string, title: string, content: string) {
        const entry = new AlertEntry();
        entry.severity = severity;
        entry.title = title;
        entry.content = content;
        this.entries.push(entry);
    }
}

class AlertEntry {
    public title: string;
    public content: string;
    public severity: string;
    public element: any;
}
