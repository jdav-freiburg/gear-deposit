export enum UiMessageType {
    INFO, WARNING, ERROR
}

export interface UiMessage {
    message: string;
    type: UiMessageType;
}
