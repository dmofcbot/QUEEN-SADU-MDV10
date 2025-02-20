const fs = require("fs");
const ytdl = require("ytdl-core");
const scdl = require("soundcloud-downloader").default;
const fetch = require("node-fetch");
const cliProgress = require("cli-progress");

// YouTube Downloader
async function downloadYouTube(url, outputPath) {
    if (!ytdl.validateURL(url)) {
        throw new Error("Invalid YouTube URL");
    }
    const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
    const file = fs.createWriteStream(outputPath);
    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    console.log(`⬇️ Downloading YouTube audio: ${url}`);
    let totalSize = 0;

    stream.on("response", (res) => {
        totalSize = parseInt(res.headers["content-length"], 10);
        bar.start(totalSize, 0);
    });

    stream.on("data", (chunk) => bar.increment(chunk.length));
    stream.on("end", () => {
        bar.stop();
        console.log(`✅ YouTube Download Completed: ${outputPath}`);
    });

    stream.pipe(file);
}

// SoundCloud Downloader
async function downloadSoundCloud(url, outputPath, clientId) {
    if (!scdl.isValidUrl(url)) {
        throw new Error("Invalid SoundCloud URL");
    }
    console.log(`⬇️ Downloading SoundCloud track: ${url}`);
    const stream = await scdl.download(url, clientId);
    const file = fs.createWriteStream(outputPath);

    stream.pipe(file);
    stream.on("finish", () => console.log(`✅ SoundCloud Download Completed: ${outputPath}`));
}

// MP3 Direct Downloader
async function downloadMP3(url, outputPath) {
    console.log(`⬇️ Downloading MP3 file: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`❌ Failed to download MP3: ${response.statusText}`);

    const file = fs.createWriteStream(outputPath);
    response.body.pipe(file);
    response.body.on("end", () => console.log(`✅ MP3 Download Completed: ${outputPath}`));
}

// CLI Support
const args = process.argv.slice(2);
if (args.length > 1) {
    const url = args[0];
    const output = args[1];

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        downloadYouTube(url, output);
    } else if (url.includes("soundcloud.com")) {
        downloadSoundCloud(url, output, "YOUR_SOUNDCLOUD_CLIENT_ID");
    } else if (url.endsWith(".mp3")) {
        downloadMP3(url, output);
    } else {
        console.error("❌ Unsupported URL format!");
    }
}

module.exports = { downloadYouTube, downloadSoundCloud, downloadMP3 };
