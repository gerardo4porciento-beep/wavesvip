
const fs = require('fs');
const path = require('path');

try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    // Simple parse valid for the specific format in this project
    const match = envContent.match(/GOOGLE_PRIVATE_KEY="([\s\S]*?)"/);
    if (match && match[1]) {
        fs.writeFileSync('temp_key.txt', match[1]);
        console.log("Key extracted to temp_key.txt");
    } else {
        console.log("Key not found");
    }
} catch (e) {
    console.error(e);
}
