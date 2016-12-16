import { UiMessageService } from './ui-message.service';
import { UiMessage, UiMessageType } from '../model/ui-message';

describe('Service: UiMessage', () => {
    let service: UiMessageService;

    beforeEach(() => {
        service = new UiMessageService();
    });

    it('should emit info message', () => {
        let message: UiMessage;
        service.messages.subscribe((m: UiMessage) => {
            message = m;
        });
        service.emitInfo('test');
        expect(message).toBeDefined();
        expect(message.message).toEqual('test');
        expect(message.type).toEqual(UiMessageType.INFO);
    });

    it('should emit error message', () => {
        let message: UiMessage;
        service.messages.subscribe((m: UiMessage) => {
            message = m;
        });
        service.emitError('test');
        expect(message).toBeDefined();
        expect(message.message).toEqual('test');
        expect(message.type).toEqual(UiMessageType.ERROR);
    });

});
