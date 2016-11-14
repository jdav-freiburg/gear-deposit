export enum UiMessageType {
    INFO, ERROR
}

export interface UiMessage {
    message: string;
    type: UiMessageType;
}
