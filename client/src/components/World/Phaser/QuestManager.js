module.exports = QuestManager = function(self) {
	this.self = self;

	this.currentTalkStage = -1;
	this.avalableChoices = [];
	this.talkActive = false;
	this.canChoose = null;
	this.choiceIterator = 0;

	this.quests = [];
	this.assignedQuests = [];
	this.assignedObjectives = [];
	this.finishedQuests = [];
	this.downloadedQuestIds = [];
};

QuestManager.prototype.addDownloadedQuest = function(quest) {
	this.quests[quest._id] = quest;
	this.downloadedQuestIds.push(quest._id);
	console.info("Quest added: "+quest._id);
	// console.log(quest);
};

QuestManager.prototype.assignQuest = function(id) {
	var quests = this.quests.filter(function(e) {
		return e._id == id;
	});

	this.assignedQuests.concat(quests);
};

QuestManager.prototype.checkEntity = function(me, entity) {
	// console.log(me);
	// console.log(entity);
	// console.log(this.assignedObjectives);
	var objective = this.assignedObjectives.filter(function(e, i) {
		return e.entityId == entity.id;
	});

	if(!objective[0]){
		return;
	}

	this.assignedQuests.pop(objective[0].questId);
	this.assignedObjectives.pop(this.assignedObjectives.indexOf(objective[0]));
	if(objective[0].nextQuestId) this.startQuest(objective[0].nextQuestId);
};

QuestManager.prototype.startQuest = function(questId) {

	if(!this.quests[questId]) this.self.net.getQuest(questId);
	this.talkActive = true;
	this.self.dialogBox.show("", this.self.player.hero.body.x);
	this.currentTalkStage = 0;
	this.avalableChoices = [];
	this.canChoose = null;
	var self = this;

	if(!this.quests[questId]){
		setTimeout(function() {
			console.info("Starting quest: "+questId);
			console.info("Starting dialog");
			self.quest = self.quests[questId];
			self.showStage(self.currentTalkStage);
		}, 1000);
	} else {
		this.quest = this.quests[questId];
		this.showStage(this.currentTalkStage);
	}

};

QuestManager.prototype.showStage = function(stageNumber) {
	console.log("Quest stage " + stageNumber);
	this.currentTalkStage = stageNumber;
	this.choiceIterator = 0;
	this.avalableChoices = [];
	this.self.dialogBox.type(this.quest.dialog[stageNumber].text);

	if(this.quest.dialog[stageNumber].goto) {
		this.avalableChoices.push(this.quest.dialog[this.currentTalkStage].goto);
		this.canChoose = false;
	}
};

QuestManager.prototype.endDialog = function() {
	console.info("Dialog ended");
	// console.log(this.quest.obj);
	this.assignedObjectives = this.assignedObjectives.concat(this.quest.obj);
	// this.assignedObjectives[this.quest.questId] = this.quest.obj;
	console.log(this.assignedObjectives);
	if(this.quest.obj.nextQuestId) this.self.net.getQuest(this.quest.obj.nextQuestId);
	this.self.dialogBox.hide();
	this.talkActive = false;
};

QuestManager.prototype.increment = function() {
	if(this.choiceIterator === this.avalableChoices.length-1) return this.choiceIterator;
	this.choiceIterator++;
	return this.choiceIterator;
};

QuestManager.prototype.decrement = function() {
	if(this.choiceIterator === 0) return this.choiceIterator;
	this.choiceIterator--;
	return this.choiceIterator;
};

QuestManager.prototype.enter = function() {
	if(this.avalableChoices.length === 0) {
		this.endDialog();
		return;
	}
	// console.log(this.choiceIterator);
	// console.log(this.avalableChoices);
	this.showStage(this.avalableChoices[this.choiceIterator]);
};
