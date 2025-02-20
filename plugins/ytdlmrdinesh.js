const ytdl = require("ytdl-core");
const scdl = require("soundcloud-downloader").default;
const fs = require("fs");
const fetch = require("node-fetch");

// YouTube Download Function
async function downloadYouTube(url, outputPath) {
    if (!ytdl.validateURL(url)) {
        throw new Error("Invalid YouTube URL");
    }
    const stream = ytdl(url, { filter: "audioonly" });
    stream.pipe(fs.createWriteStream(outputPath));
    console.log(`Downloading YouTube song to ${outputPath}`);
}

// SoundCloud Download Function
async function downloadSoundCloud(url, outputPath, clientId) {
    if (!scdl.isValidUrl(url)) {
        throw new Error("Invalid SoundCloud URL");
    }
    const stream = await scdl.download(url, clientId);
    stream.pipe(fs.createWriteStream(outputPath));
    console.log(`Downloading SoundCloud song to ${outputPath}`);
}

// Generic MP3 Download Function
async function downloadMP3(url, outputPath) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download MP3: ${response.statusText}`);
    const fileStream = fs.createWriteStream(outputPath);
    response.body.pipe(fileStream);
    console.log(`Downloading MP3 song to ${outputPath}`);
}

// Example Usage
(async () => {
    try {
        await downloadYouTube("https://www.youtube.com/watch?v=EXAMPLE", "song.mp3");
        // await downloadSoundCloud("https://soundcloud.com/example-track", "song.mp3", "YOUR_SOUNDCLOUD_CLIENT_ID");
        // await downloadMP3("https://example.com/song.mp3", "song.mp3");
    } catch (error) {
        console.error("Error:", error);
    }
})();
