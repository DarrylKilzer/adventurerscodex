"use strict";

function PartyChatViewModel(parent) {
	var self = this;
	
	self.parent = parent;
	self.messenger = self.parent.messenger;
	self.log = ko.observableArray([]);
	self.message = ko.observable('');
	self.id = uuid.v4();
	
	self.init = function() {
		self.messenger.subscribe('data', 'chat', self.handleMessage);
	};
		
	//UI Methods
	
	self.sendMessage = function(formElement) {
		var message = self.message().trim();
		if (message !== '') {
			var msg = new ChatMessage();
			msg.fromId(self.id);
			msg.toId('all');
			msg.from(self.parent.parent.playerTitle());
			msg.to('');
			msg.text(message);
			self.messenger.sendDataMsg(self.mainRoomId(), 'chat', msg.exportValues());
			self.message('');
		}
	};

	self.handleMessage = function(msg) {
		var message = new ChatMessage();
		message.importValues(msg);
		self.log.push(message);
	};
	
	//Private Methods
	
	self.mainRoomId = function() {
		return self.parent.parent.defaultRoomId();
	};
};
