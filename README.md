# Stoat Uploader

**Note: This project requires [Bun](https://bun.sh/) as its runtime.**

stoat.js doesn't offer the ability to upload attachments, so here is a utility package to allow easy file uploads.

## Installation

`npm install stoat-uploader`

## Usage

First, import the uploader library:

```javascript
const uploader = require("stoat-uploader");
```

You need to have a `bot` (client) object initialized and logged in. Then you can use the uploader methods to upload files.

### Uploading from disk

```javascript
const id = await uploader.file({ file: "/path/to/file.txt" }, bot);

message.channel.sendMessage({
  content: "Here is your file!",
  attachments: [id]
});
```

### Uploading from a URL

```javascript
const id = await uploader.url({ url: "https://example.com/image.png" }, bot);

message.channel.sendMessage({
  content: "Here is your image!",
  attachments: [id]
});
```

### Uploading raw data

```javascript
const buffer = Buffer.from("hello world");
const id = await uploader.raw({ file: buffer, name: "hello.txt", type: "text/plain" }, bot);

message.channel.sendMessage({
  content: "Here is your text file!",
  attachments: [id]
});
```

You can also specify a different tag for your upload (default is `attachments`). Available tags:

- `attachments`
- `avatars`
- `backgrounds`
- `icons`
- `banners`
- `emojis`

All of these have different configurations and limits. See [this file](https://github.com/revoltchat/autumn/blob/d5218727e56e986a4092ee635b10c3fd7c71e373/Autumn.toml#L7C2-L7C2) for the exact specifications.
