import express from "express";
import { messagevalidate } from "../middlewares/messagevalidate.js";
import { messagecontrol } from "../controllers/messagecontroller.js";
import { getmessages } from "../controllers/messagecontroller.js";
import { deletemessage } from "../controllers/messagecontroller.js";
import { doctormessages } from "../controllers/messagecontroller.js";
import { modifymessage } from "../controllers/messagecontroller.js";

const messagerouter=express.Router()

messagerouter.post('/newmessage',messagevalidate,messagecontrol);
messagerouter.post('/getmessages',getmessages);
messagerouter.post('/delmessage',deletemessage);
messagerouter.post('/doctormessages',doctormessages);
messagerouter.post('/modifymessage',modifymessage);

export default messagerouter;  