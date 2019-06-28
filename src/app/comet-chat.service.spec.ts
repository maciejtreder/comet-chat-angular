import { TestBed } from '@angular/core/testing';

import { CometChatService } from './comet-chat.service';

describe('CometChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CometChatService = TestBed.get(CometChatService);
    expect(service).toBeTruthy();
  });
});
