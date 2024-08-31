const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib01TV0NsS0xETThSU3BnRTR5cjhGMEM5TzI0SlI1YkFzQlZNRkExaUkxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQkFXUFg0WmVhb0ZKQjdwOG5xL3FhaThBZ3RLa2M5eG9hdWxrYnNDK3VRQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvS01ocEZPeXlXSysrdEFMN2g3WUtGYmtxZVJ4SEpWMUtSdFZZRm51LzAwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTTjVrelNybmMxRFVSRzcyeGI1Z2JlMERVL3YzOWhKQnk0enVaVERtYlhnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdDbWtJMm83TzZWNkRQOWJLSTFQZjlzb0FnWGpnc0U3WVRTVDRuSG9iMkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlF3MW5KTmFXbkhZL2lCWUVUSVBJQWljZWR1TUJtbW5CRzEwMm1mOTNIaGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUJoRkhoMUJ0RHBia0NTT2pEQlR6T3hZdEVYNEF0ejV5UmRDTDdlQ1lGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRlZGU0s5ODc1T3lIZm10WmhRdnpOTlRmZlBiVTQwK1ZlOHJpaGZiM2oybz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZISUxnY2s0aEhHaFpubmlkejZHTUp1NWRCRk5tN0ovR21OL0pMaFVOR2g4eXZsSVFZZ2pzMm9xNDIxWmR6OVphdDRFU1RsN1RRMTZsMkpzNGhWZ2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM2LCJhZHZTZWNyZXRLZXkiOiJycndkTmc5MDdHMTBEYVdWUnlObytVSmpselA3OExIS0lDNURqNWJtMHBVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5N0J0TzFSdVNBeVFrWnpsYmpvNDFBIiwicGhvbmVJZCI6ImJkODczMWZmLTIwNGUtNGY0Yy05NTUwLWJjODQxODNkODkxNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFanJ6YkJUU2JtbXIxY2VOQ05kR0taZG55UDg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXhwdHBMU0hoUXIrbHRpaHNPV1RkRUM2ZEY4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjY1NFFEVzhXIiwibWUiOnsiaWQiOiIyMzQ5MDI2Njc4NzUxOjM5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkpvaG5tYXJrIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNONnRuandROCs3TnRnWVlCU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJLVHB4K0tuM01KWThJZW9PN2p1cWhCdEp1NVljQVFCMkk1ODQ0eHc5Y0hFPSIsImFjY291bnRTaWduYXR1cmUiOiIvVXZIQW5oQ1RVWGtGV0NaUTNNSlhhQms4WXVUOUxyM1VVYkRXdHZaWGZrMFBLOVIzVE9xM1Fkbkx6YTlOWnNvaDZkOURxRFJHYzFPeERBYU5FVjdCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiU1F2N1VkbVdGNUE2cnRRdGVIWFpuMWZhUXVvZjZZZS9JRkhwMzlVMW52UGFoMFJIODZ6Y0dZclliaXQzL1dKWkwwNUxvd2o2elF4WWRTTXg0dVRpakE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDI2Njc4NzUxOjM5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNrNmNmaXA5ekNXUENIcUR1NDdxb1FiU2J1V0hBRUFkaU9mT09NY1BYQngifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjUxMzQ3MjAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSkJJIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "johnmark",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2349026678751",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'KOBIS-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/fde4208c569a1dff81ae6.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yez',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yez',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
