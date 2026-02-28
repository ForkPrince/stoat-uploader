const { basename } = require("path");

async function raw({ file, name, type, tag = "attachments" }, bot) {
    if (file instanceof Uint8Array || file instanceof ArrayBuffer) file = new Blob([file], { type });

    const form = new FormData();

    form.append("file", file, name);

    const url = bot?.configuration?.features?.autumn?.url || "https://cdn.stoatusercontent.com";

    const { id } = await (await fetch(`${url}/${tag}`, {
        method: "POST",
        headers: bot.api.auth,
        body: form
    })).json();

    return id;
}

async function file({ file, name, tag = "attachments" }, bot) {
    const item = Bun.file(file);

    name ??= basename(file);

    return raw({
        file: await item.arrayBuffer(),
        name,
        type: item.type || "application/octet-stream",
        tag
    }, bot);
}

async function url({ url, name, tag = "attachments" }, bot) {
    const response = await fetch(url);

    const type = response.headers.get("content-type")?.split(";")[0] ?? "application/octet-stream";

    name ??= url.split("/").pop().split("?")[0] || "file";

    const file = await response.arrayBuffer();

    return raw({ file, name, type, tag }, bot);
}

module.exports = {
    raw,
    file,
    url
};