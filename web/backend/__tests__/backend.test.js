const room = require("../src/main/room");
const talk = require("../src/main/talk");

jest.setTimeout(40000);


describe("Testing backend", () => {

    it("Clear Everything", async () => {
        await room.clearRooms().then((result) => {
            expect(result.code).toEqual(200);
        });
        await talk.clearTalks().then((result) => {
            expect(result.code).toEqual(200);
        });
        await room.listAllRooms().then((result) => {
            expect(result.length).toEqual(0);
        });
    });
    it("Clear Rooms", async () => {
        await room.clearRooms().then((result) => {
            expect(result.code).toEqual(200);
        });
        await room.listAllRooms().then((result) => {
            expect(result.length).toEqual(0);
        });
    });
    it("Create Rooms", async () => {
        await room.createRoom('B350', 300).then((result) => {
            expect(result.maxOccupation).toEqual(300);
            expect(result.name).toEqual('B350');
        });
        await room.findRoomByName('B350').then((result) => {
            expect(result[0].maxOccupation).toEqual(300);
            expect(result[0].name).toEqual('B350');
        });
        await room.listAllRooms().then((result) => {
            expect(result.length).toEqual(1);
        });
        await room.clearRooms().then((result) => {
            expect(result.code).toEqual(200);
        });
    });
    it("Update Room occupation", async () => {
        await room.createRoom('B351', 300).then((result) => {
            expect(result.maxOccupation).toEqual(300);
            expect(result.name).toEqual('B351');
        });
        await room.findRoomByName('B351').then((result) => {
            expect(result[0].maxOccupation).toEqual(300);
            expect(result[0].name).toEqual('B351');
        });
        await talk.createTalk('talk2', 'speaker2', 'B351', Date.now(), Date.now() + 99999).then((result) => {
            expect(result.code).toEqual(200)
            expect(result.talk.talk.length).toEqual(1)
        });
        await talk.listAll().then((result) => {
            expect(result.talk.length).toEqual(1);
        });
        await room.updateRoomOccupation('B351', 5).then((result) => {
            expect(result.code).toEqual(200)
        })
        await talk.clearTalks().then((result) => {
            expect(result.code).toEqual(200);
        });
        await room.clearRooms().then((result) => {
            expect(result.code).toEqual(200);
        });
    });

    it("Clear Talks", async () => {
        await talk.clearTalks().then((result) => {
            expect(result.code).toEqual(200);
        });
        await talk.listAll().then((result) => {
            expect(result.talk.length).toEqual(0);
        });
    });
    it("Create Talks", async () => {
        await room.createRoom('B350', 300).then((result) => {
            expect(result.maxOccupation).toEqual(300);
            expect(result.name).toEqual('B350');
        });
        await room.findRoomByName('B350').then((result) => {
            expect(result[0].maxOccupation).toEqual(300);
            expect(result[0].name).toEqual('B350');
        });
        await talk.createTalk('talk1', 'speaker1', 'B350', new Date(), new Date()+100000).then((result) => {
            expect(result.code).toEqual(200)
            expect(result.talk.talk.length).toEqual(1)
        });
        await talk.listAll().then((result) => {
            expect(result.talk.length).toEqual(1);
        });
        await talk.clearTalks().then((result) => {
            expect(result.code).toEqual(200);
        });
        await room.clearRooms().then((result) => {
            expect(result.code).toEqual(200);
        });
    });
    it("Delete Talk", async () => {
        await room.createRoom('B350', 300).then((result) => {
            expect(result.maxOccupation).toEqual(300);
            expect(result.name).toEqual('B350');
        });
        await room.findRoomByName('B350').then((result) => {
            expect(result[0].maxOccupation).toEqual(300);
            expect(result[0].name).toEqual('B350');
        });
        await talk.createTalk('talk1', 'speaker1', 'B350', new Date(), new Date()+100000).then((result) => {
            expect(result.code).toEqual(200)
            expect(result.talk.talk.length).toEqual(1)
        });
        let talkId;
        await talk.listAll().then((result) => {
            expect(result.talk.length).toEqual(1);
            talkId = result.talk[0].id
        });

        await talk.deleteTalk(talkId).then((result) => {
            expect(result.code).toEqual(200);
        })

        await room.clearRooms().then((result) => {
            expect(result.code).toEqual(200);
        });
    });
});





